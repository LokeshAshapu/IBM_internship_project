// Storage API
const STORAGE_KEY = 'emergency_profiles';

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

function updateProfile(id, updatedData) {
    const allProfiles = loadAllProfiles();

    if (!allProfiles[id.toUpperCase()]) return false;

    allProfiles[id.toUpperCase()] = {
        ...allProfiles[id.toUpperCase()],
        ...updatedData,
        updatedAt: new Date().toISOString()
    };

    saveAllProfiles(allProfiles);
    return true;
}

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

// Application logic
document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission on index.html
    if (document.getElementById('medicalForm')) {
        const medicalForm = document.getElementById('medicalForm');
        const addContactBtn = document.getElementById('addContactBtn');
        const contactsContainer = document.getElementById('contactsContainer');
        let contactCount = 1;

        // Add new contact field
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

        // Remove contact field
        contactsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-contact')) {
                e.target.closest('.contact-entry').remove();
                // Renumber contacts
                const contacts = contactsContainer.querySelectorAll('.contact-entry');
                contacts.forEach((contact, index) => {
                    contact.querySelector('h3').textContent = `Contact ${index + 1}`;
                });
                contactCount = contacts.length;
            }
        });

        // Form submission
        medicalForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Gather all contact information
            const contacts = Array.from(document.querySelectorAll('.contact-entry')).map(entry => ({
                name: entry.querySelector('.contact-name').value,
                phone: entry.querySelector('.contact-phone').value,
                relationship: entry.querySelector('.contact-relationship').value
            }));

            // Prepare profile data
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
                // Save to storage
                const uniqueId = saveProfile(profileData);

                // Show success message
                document.getElementById('medicalForm').classList.add('hidden');
                document.getElementById('uniqueCode').textContent = uniqueId;
                document.getElementById('successMessage').classList.remove('hidden');
            } catch (error) {
                alert('Error saving profile. Please try again.');
                console.error(error);
            }
        });
    }

    // Handle search on search.html
    if (document.getElementById('searchBtn')) {
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');

        searchBtn.addEventListener('click', () => {
            performSearch();
        });

        // Allow search on Enter key press
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
                    // Display the profile information
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
                    searchResults.classList.add('hidden');
                    errorMessage.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Search error:', error);
                alert('Error searching for profile. Please try again.');
            }
        }
    }
});