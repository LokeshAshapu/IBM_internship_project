import { saveProfileToMongo, findProfileById } from './mongodb-api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission on index.html
    if (document.getElementById('medicalForm')) {
        const medicalForm = document.getElementById('medicalForm');
        const addContactBtn = document.getElementById('addContactBtn');
        const contactsContainer = document.getElementById('contactsContainer');

        // Add new contact field
        addContactBtn.addEventListener('click', () => {
            const newContact = document.createElement('div');
            newContact.className = 'contact-entry';
            newContact.innerHTML = `
                <input type="text" placeholder="Name" class="contact-name" required>
                <input type="tel" placeholder="Phone" class="contact-phone" required>
                <input type="text" placeholder="Relationship" class="contact-relationship" required>
                <button type="button" class="remove-contact">Remove</button>
            `;
            contactsContainer.appendChild(newContact);
        });

        // Remove contact field
        contactsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-contact')) {
                e.target.parentElement.remove();
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
                    conditions: document.getElementById('conditions').value.split(',').map(item => item.trim()),
                    allergies: document.getElementById('allergies').value.split(',').map(item => item.trim()),
                    medications: document.getElementById('medications').value.split('\n').map(item => item.trim())
                },
                emergencyContacts: contacts
            };

            try {
                // Save to MongoDB
                const uniqueId = await saveProfileToMongo(profileData);
                
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
        document.getElementById('searchBtn').addEventListener('click', async () => {
            const searchInput = document.getElementById('searchInput');
            const searchResults = document.getElementById('searchResults');
            const errorMessage = document.getElementById('errorMessage');
            const profileData = document.getElementById('profileData');

            const id = searchInput.value.trim();
            if (!id) return;

            try {
                const profile = await findProfileById(id);
                
                if (profile) {
                    // Display the profile information
                    profileData.innerHTML = `
                        <h3>${profile.personal.fullName}</h3>
                        <p><strong>Date of Birth:</strong> ${new Date(profile.personal.dob).toLocaleDateString()}</p>
                        <p><strong>Blood Type:</strong> ${profile.personal.bloodType}</p>
                        
                        <h4>Medical Conditions</h4>
                        <ul>${profile.medical.conditions.map(c => c ? `<li>${c}</li>` : '').join('')}</ul>
                        
                        <h4>Allergies</h4>
                        <ul>${profile.medical.allergies.map(a => a ? `<li>${a}</li>` : '').join('')}</ul>
                        
                        <h4>Medications</h4>
                        <ul>${profile.medical.medications.map(m => m ? `<li>${m}</li>` : '').join('')}</ul>
                        
                        <h4>Emergency Contacts</h4>
                        <div class="contacts-grid">
                            ${profile.emergencyContacts.map(contact => `
                                <div class="contact-card">
                                    <h5>${contact.name}</h5>
                                    <p>${contact.relationship}</p>
                                    <p><a href="tel:${contact.phone}">${contact.phone}</a></p>
                                </div>
                            `).join('')}
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
        });
    }
});
