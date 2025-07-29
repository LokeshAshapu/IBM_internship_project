// Storage API
const STORAGE_KEY = 'emergency_profiles';

// AI API Configuration
const AI_API_CONFIG = {
    // Using Hugging Face's free medical AI model
    url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    // You can also use OpenAI API (requires API key)
    // url: 'https://api.openai.com/v1/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        // Add your API key here if using a paid service
        // 'Authorization': 'Bearer YOUR_API_KEY'
    }
};

// Mock AI responses for demonstration (use when API is not available)
const MOCK_AI_RESPONSES = {
    diabetes: [
        {
            name: "Metformin",
            purpose: "Blood sugar control",
            dosage: "500mg twice daily with meals",
            warning: "Monitor for signs of lactic acidosis. Take with food to reduce stomach upset."
        }
    ],
    hypertension: [
        {
            name: "Lisinopril",
            purpose: "Blood pressure control",
            dosage: "10mg once daily",
            warning: "Monitor blood pressure regularly. May cause dry cough in some patients."
        }
    ],
    asthma: [
        {
            name: "Albuterol Inhaler",
            purpose: "Bronchodilator for acute symptoms",
            dosage: "1-2 puffs every 4-6 hours as needed",
            warning: "Rinse mouth after use. Seek immediate medical attention if symptoms worsen."
        }
    ],
    depression: [
        {
            name: "Sertraline",
            purpose: "Antidepressant (SSRI)",
            dosage: "50mg once daily, preferably in morning",
            warning: "May take 4-6 weeks to show full effect. Monitor for mood changes."
        }
    ],
    anxiety: [
        {
            name: "Lorazepam",
            purpose: "Short-term anxiety relief",
            dosage: "0.5-1mg as needed, maximum 3 times daily",
            warning: "Can be habit-forming. Avoid alcohol. Do not drive while taking."
        }
    ]
};

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function loadAllProfiles() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

function saveAllProfiles(profiles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function saveProfile(profileData) {
    const id = generateUniqueId();
    const allProfiles = loadAllProfiles();

    const document = {
        _id: id,
        ...profileData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    allProfiles[id] = document;
    saveAllProfiles(allProfiles);

    return id;
}

function findProfileById(id) {
    const allProfiles = loadAllProfiles();
    return allProfiles[id.toUpperCase()] || null;
}

// function updateProfile(id, updatedData) {
//     const allProfiles = loadAllProfiles();

//     if (!allProfiles[id.toUpperCase()]) return false;

//     allProfiles[id.toUpperCase()] = {
//         ...allProfiles[id.toUpperCase()],
//         ...updatedData,
//         updatedAt: new Date().toISOString()
//     };

//     saveAllProfiles(allProfiles);
//     return true;
// }

function deleteProfile(id) {
    const allProfiles = loadAllProfiles();

    if (!allProfiles[id.toUpperCase()]) return false;

    delete allProfiles[id.toUpperCase()];
    saveAllProfiles(allProfiles);
    return true;
}

function downloadAllProfiles() {
    const profiles = loadAllProfiles();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "emergency_profiles.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

function downloadProfile(profileData) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profileData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "emergency_profile.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

// AI Medicine Suggestion Functions
async function getMedicineSuggestions(conditions, allergies = []) {
    try {
        return await getMockAISuggestions(conditions, allergies);
    } catch (error) {
        console.error('AI API Error:', error);
        throw new Error('Unable to get AI suggestions at this time');
    }
}

async function getMockAISuggestions(conditions, allergies) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suggestions = [];
    const processedConditions = conditions.map(c => c.toLowerCase());
    
    processedConditions.forEach(condition => {
        Object.keys(MOCK_AI_RESPONSES).forEach(key => {
            if (condition.includes(key) || key.includes(condition)) {
                suggestions.push(...MOCK_AI_RESPONSES[key]);
            }
        });
    });
    
    if (suggestions.length === 0) {
        suggestions.push({
            name: "General Health Assessment Needed",
            purpose: "Comprehensive medical evaluation",
            dosage: "Consult healthcare provider",
            warning: "Please consult with a healthcare professional for proper diagnosis and treatment."
        });
    }
    
    const filteredSuggestions = suggestions.filter(med => {
        return !allergies.some(allergy => 
            med.name.toLowerCase().includes(allergy.toLowerCase())
        );
    });
    
    return filteredSuggestions.length > 0 ? filteredSuggestions : suggestions;
}

async function getRealAISuggestions(conditions, allergies) {
    const prompt = `As a medical AI assistant, suggest appropriate medications for the following conditions: ${conditions.join(', ')}. 
    Patient allergies: ${allergies.join(', ') || 'None reported'}. 
    Please provide medication name, purpose, typical dosage, and important warnings. 
    Format as JSON array with objects containing: name, purpose, dosage, warning.`;
    
    const response = await fetch(AI_API_CONFIG.url, {
        method: 'POST',
        headers: AI_API_CONFIG.headers,
        body: JSON.stringify({
            inputs: prompt,
            parameters: {
                max_length: 500,
                temperature: 0.7
            }
        })
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return parseAIResponse(data);
}

function parseAIResponse(aiResponse) {
    return MOCK_AI_RESPONSES.diabetes;
}

function displayMedicineSuggestions(suggestions) {
    const aiResults = document.getElementById('aiResults');
    
    if (!suggestions || suggestions.length === 0) {
        aiResults.innerHTML = `
            <div class="ai-disclaimer">
                <strong>⚠️ No specific suggestions available</strong><br>
                Please consult with a healthcare professional for proper medical advice.
            </div>
        `;
        return;
    }
    
    const suggestionsHTML = suggestions.map(med => `
        <div class="medicine-suggestion">
            <div class="medicine-name">${med.name}</div>
            <div class="medicine-purpose">Purpose: ${med.purpose}</div>
            <div class="medicine-dosage">
                <strong>Typical Dosage:</strong> ${med.dosage}
            </div>
            <div class="medicine-warning">
                <strong>⚠️ Important:</strong> ${med.warning}
            </div>
        </div>
    `).join('');
    
    aiResults.innerHTML = `
        <h4>AI-Suggested Medications</h4>
        ${suggestionsHTML}
        <div class="ai-disclaimer">
            <strong>⚠️ Medical Disclaimer:</strong> These suggestions are AI-generated and for informational purposes only. 
            Always consult with a qualified healthcare professional before starting, stopping, or changing any medication. 
            Your doctor should evaluate your complete medical history, current medications, and individual health needs.
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('medicalForm')) {
        const medicalForm = document.getElementById('medicalForm');
        const addContactBtn = document.getElementById('addContactBtn');
        const contactsContainer = document.getElementById('contactsContainer');
        let contactCount = 1;

        addContactBtn.addEventListener('click', () => {
            contactCount++;
            const newContact = document.createElement('div');
            newContact.className = 'contact-entry';
            newContact.innerHTML = `
                <h3>Contact ${contactCount}</h3>
                <div class="contact-row">
                    <div>
                        <label>Name</label>
                        <input type="text" class="contact-name" required>
                    </div>
                    <div>
                        <label>Phone</label>
                        <input type="tel" class="contact-phone" required>
                    </div>
                    <div>
                        <label>Relationship</label>
                        <input type="text" class="contact-relationship" required>
                    </div>
                    <div>
                        <button type="button" class="btn btn-danger remove-contact">Remove</button>
                    </div>
                </div>
            `;
            contactsContainer.appendChild(newContact);
        });

        contactsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-contact')) {
                e.target.closest('.contact-entry').remove();
                const contacts = contactsContainer.querySelectorAll('.contact-entry');
                contacts.forEach((contact, index) => {
                    contact.querySelector('h3').textContent = `Contact ${index + 1}`;
                });
                contactCount = contacts.length;
            }
        });

        medicalForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const contacts = Array.from(document.querySelectorAll('.contact-entry')).map(entry => ({
                name: entry.querySelector('.contact-name').value,
                phone: entry.querySelector('.contact-phone').value,
                relationship: entry.querySelector('.contact-relationship').value
            }));

            const profileData = {
                personal: {
                    fullName: document.getElementById('fullName').value,
                    dob: document.getElementById('dob').value,
                    bloodType: document.getElementById('bloodType').value
                },
                medical: {
                    conditions: document.getElementById('conditions').value.split(',').map(item => item.trim()).filter(item => item),
                    allergies: document.getElementById('allergies').value.split(',').map(item => item.trim()).filter(item => item),
                    medications: document.getElementById('medications').value.split('\n').map(item => item.trim()).filter(item => item)
                },
                emergencyContacts: contacts
            };

            try {
                const uniqueId = saveProfile(profileData);

                document.getElementById('medicalForm').classList.add('hidden');
                document.getElementById('uniqueCode').textContent = uniqueId;
                document.getElementById('successMessage').classList.remove('hidden');
            } catch (error) {
                alert('Error saving profile. Please try again.');
                console.error(error);
            }
        });
    }

    if (document.getElementById('searchBtn')) {
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        let currentProfile = null;

        searchBtn.addEventListener('click', () => {
            performSearch();
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const searchResults = document.getElementById('searchResults');
            const errorMessage = document.getElementById('errorMessage');
            const profileData = document.getElementById('profileData');

            const id = searchInput.value.trim();
            if (!id) return;

            try {
                const profile = findProfileById(id);

                if (profile) {
                    currentProfile = profile;
                    
                    profileData.innerHTML = `
                        <div class="profile-display">
                            <div class="profile-header">
                                <h2>${profile.personal.fullName}</h2>
                                <p>Emergency Medical Information</p>
                            </div>

                            <div class="info-grid">
                                <div class="info-card">
                                    <h3>Personal Details</h3>
                                    <ul class="info-list">
                                        <li><strong>Date of Birth:</strong> ${new Date(profile.personal.dob).toLocaleDateString()}</li>
                                        <li><strong>Blood Type:</strong> <span style="color: #ff6b6b; font-weight: bold;">${profile.personal.bloodType}</span></li>
                                    </ul>
                                </div>

                                <div class="info-card">
                                    <h3>Medical Conditions</h3>
                                    <ul class="info-list">
                                        ${profile.medical.conditions.length > 0 ? 
                                            profile.medical.conditions.map(c => `<li>${c}</li>`).join('') : 
                                            '<li style="color: #666; font-style: italic;">None reported</li>'
                                        }
                                    </ul>
                                </div>

                                <div class="info-card">
                                    <h3>Allergies</h3>
                                    <ul class="info-list">
                                        ${profile.medical.allergies.length > 0 ? 
                                            profile.medical.allergies.map(a => `<li style="color: #dc3545; font-weight: 600;">${a}</li>`).join('') : 
                                            '<li style="color: #666; font-style: italic;">None reported</li>'
                                        }
                                    </ul>
                                </div>

                                <div class="info-card">
                                    <h3>Current Medications</h3>
                                    <ul class="info-list">
                                        ${profile.medical.medications.length > 0 ? 
                                            profile.medical.medications.map(m => `<li>${m}</li>`).join('') : 
                                            '<li style="color: #666; font-style: italic;">None reported</li>'
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div class="info-card">
                                <h3>Emergency Contacts</h3>
                                <div class="contacts-grid">
                                    ${profile.emergencyContacts.map(contact => `
                                        <div class="contact-card">
                                            <h4>${contact.name}</h4>
                                            <div class="relationship">${contact.relationship}</div>
                                            <div class="phone"><a href="tel:${contact.phone}">${contact.phone}</a></div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;

                    searchResults.classList.remove('hidden');
                    errorMessage.classList.add('hidden');
                } else {
                    currentProfile = null;
                    searchResults.classList.add('hidden');
                    errorMessage.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Search error:', error);
                alert('Error searching for profile. Please try again.');
            }
        }

        if (document.getElementById('getAiSuggestions')) {
            document.getElementById('getAiSuggestions').addEventListener('click', async () => {
                if (!currentProfile) {
                    alert('Please search for a profile first');
                    return;
                }

                const button = document.getElementById('getAiSuggestions');
                const btnText = button.querySelector('.btn-text');
                const btnLoading = button.querySelector('.btn-loading');
                const aiResults = document.getElementById('aiResults');

                button.disabled = true;
                btnText.classList.add('hidden');
                btnLoading.classList.remove('hidden');
                aiResults.classList.add('hidden');

                try {
                    const suggestions = await getMedicineSuggestions(
                        currentProfile.medical.conditions,
                        currentProfile.medical.allergies
                    );
                    
                    displayMedicineSuggestions(suggestions);
                    aiResults.classList.remove('hidden');
                } catch (error) {
                    console.error('AI Suggestion Error:', error);
                    aiResults.innerHTML = `
                        <div class="ai-disclaimer">
                            <strong>⚠️ Service Temporarily Unavailable</strong><br>
                            Unable to get AI suggestions at this time. Please try again later or consult with a healthcare professional.
                        </div>
                    `;
                    aiResults.classList.remove('hidden');
                } finally {
                    button.disabled = false;
                    btnText.classList.remove('hidden');
                    btnLoading.classList.add('hidden');
                }
            });
        }
    }
});