// MongoDB Atlas Data API Configuration
const MONGODB_API_URL = 'https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1';
const API_KEY = 'YOUR_API_KEY';
const DATABASE = 'emergencyDB';
const COLLECTION = 'profiles';

// Generate a unique ID (8-character alphanumeric)
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 10);
}

// Save profile to MongoDB Atlas
async function saveProfileToMongo(profileData) {
    const uniqueId = generateUniqueId();
    const dataWithId = { ...profileData, _id: uniqueId, createdAt: new Date() };

    try {
        const response = await fetch(`${MONGODB_API_URL}/action/insertOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: DATABASE,
                collection: COLLECTION,
                document: dataWithId
            })
        });

        const result = await response.json();
        if (result.insertedId) {
            return uniqueId;
        } else {
            throw new Error('Failed to save to database');
        }
    } catch (error) {
        console.error('Error saving to MongoDB:', error);
        throw error;
    }
}

// Find profile by ID
async function findProfileById(id) {
    try {
        const response = await fetch(`${MONGODB_API_URL}/action/findOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: DATABASE,
                collection: COLLECTION,
                filter: { _id: id }
            })
        });

        const result = await response.json();
        return result.document;
    } catch (error) {
        console.error('Error fetching from MongoDB:', error);
        throw error;
    }
}

export { saveProfileToMongo, findProfileById };
