// mongodb-api.js - Frontend connection to MongoDB Atlas Data API

const MONGODB_DATA_API_URL = 'https://data.mongodb-api.com/app/data-abcde/endpoint/data/v1';
const API_KEY = 'your-api-key-here'; // Replace with your actual API key
const DATABASE_NAME = 'emergencyDB';
const COLLECTION_NAME = 'profiles';

// Generate a short unique ID (8 characters)
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 10);
}

// Save profile data to MongoDB Atlas
async function saveProfileToMongo(profileData) {
    const uniqueId = generateUniqueId();
    const document = {
        _id: uniqueId,
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    try {
        const response = await fetch(`${MONGODB_DATA_API_URL}/action/insertOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                dataSource: 'Cluster0', // Your cluster name
                database: DATABASE_NAME,
                collection: COLLECTION_NAME,
                document: document
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.insertedId) {
            return uniqueId;
        } else {
            throw new Error('Failed to save document');
        }
    } catch (error) {
        console.error('Error saving to MongoDB Atlas:', error);
        throw error;
    }
}

// Find profile by ID in MongoDB Atlas
async function findProfileById(id) {
    try {
        const response = await fetch(`${MONGODB_DATA_API_URL}/action/findOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: DATABASE_NAME,
                collection: COLLECTION_NAME,
                filter: { _id: id }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.document;
    } catch (error) {
        console.error('Error fetching from MongoDB Atlas:', error);
        throw error;
    }
}

// Update profile data
async function updateProfile(id, updatedData) {
    try {
        const response = await fetch(`${MONGODB_DATA_API_URL}/action/updateOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: DATABASE_NAME,
                collection: COLLECTION_NAME,
                filter: { _id: id },
                update: {
                    $set: {
                        ...updatedData,
                        updatedAt: new Date()
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.modifiedCount === 1;
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

// Delete profile
async function deleteProfile(id) {
    try {
        const response = await fetch(`${MONGODB_DATA_API_URL}/action/deleteOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                dataSource: 'Cluster0',
                database: DATABASE_NAME,
                collection: COLLECTION_NAME,
                filter: { _id: id }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.deletedCount === 1;
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

export { 
    saveProfileToMongo, 
    findProfileById, 
    updateProfile, 
    deleteProfile 
};
