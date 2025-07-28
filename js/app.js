// GitHub Configuration
const GITHUB_CONFIG = {
    owner: 'your-username', // Replace with your GitHub username
    repo: 'your-repo-name', // Replace with your repository name
    token: 'your-github-token', // Replace with your GitHub personal access token
    filePath: 'profiles.json'
};

// Storage API - Enhanced with GitHub integration
const STORAGE_KEY = 'emergency_profiles';
const PROFILES_FILE_URL = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.filePath}`;

// AI API Configuration
const AI_API_CONFIG = {
    url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    headers: {
        'Content-Type': 'application/json',
        // Add your API key here if using a paid service
        // 'Authorization': 'Bearer YOUR_API_KEY'
    }
};

// Enhanced AI responses with more comprehensive medication database
const ENHANCED_AI_RESPONSES = {
    diabetes: [
        {
            name: "Metformin",
            purpose: "First-line treatment for Type 2 diabetes",
            dosage: "500mg twice daily with meals, may increase to 1000mg twice daily",
            warning: "Monitor for signs of lactic acidosis. Take with food to reduce GI upset. Check kidney function regularly.",
            contraindications: "Severe kidney disease, liver disease, heart failure"
        },
        {
            name: "Insulin (if Type 1 or advanced Type 2)",
            purpose: "Blood glucose control",
            dosage: "Varies by type and individual needs",
            warning: "Monitor blood glucose frequently. Risk of hypoglycemia. Rotate injection sites.",
            contraindications: "Hypoglycemia, hypersensitivity to insulin"
        },
        {
            name: "Glipizide",
            purpose: "Stimulates insulin release",
            dosage: "5mg once daily, may increase to 10mg twice daily",
            warning: "Risk of hypoglycemia, especially with irregular meals. Take 30 minutes before meals.",
            contraindications: "Type 1 diabetes, diabetic ketoacidosis"
        }
    ],
    hypertension: [
        {
            name: "Lisinopril (ACE Inhibitor)",
            purpose: "First-line treatment for high blood pressure",
            dosage: "10mg once daily, may increase to 20-40mg daily",
            warning: "Monitor blood pressure and kidney function. May cause dry cough in 10-15% of patients.",
            contraindications: "Pregnancy, angioedema, bilateral renal artery stenosis"
        },
        {
            name: "Amlodipine (Calcium Channel Blocker)",
            purpose: "Vasodilation to reduce blood pressure",
            dosage: "5mg once daily, may increase to 10mg daily",
            warning: "May cause ankle swelling, dizziness. Take at same time daily.",
            contraindications: "Severe aortic stenosis, cardiogenic shock"
        },
        {
            name: "Hydrochlorothiazide (Diuretic)",
            purpose: "Reduces fluid retention and blood pressure",
            dosage: "25mg once daily",
            warning: "Monitor electrolytes, especially potassium. May increase urination.",
            contraindications: "Anuria, severe kidney/liver disease"
        }
    ],
    asthma: [
        {
            name: "Albuterol Inhaler (ProAir, Ventolin)",
            purpose: "Quick-relief bronchodilator for acute symptoms",
            dosage: "2 puffs every 4-6 hours as needed for symptoms",
            warning: "Rinse mouth after use. If using >2 times per week, see doctor. May cause tremors.",
            contraindications: "Hypersensitivity to albuterol"
        },
        {
            name: "Fluticasone Inhaler (Flovent)",
            purpose: "Long-term control of asthma inflammation",
            dosage: "88-220mcg twice daily",
            warning: "Not for acute attacks. Rinse mouth after use to prevent thrush. Takes 1-2 weeks for full effect.",
            contraindications: "Primary treatment for status asthmaticus"
        },
        {
            name: "Montelukast (Singulair)",
            purpose: "Leukotriene modifier for asthma control",
            dosage: "10mg once daily in evening",
            warning: "Monitor for mood changes, depression. May take several days to weeks for effect.",
            contraindications: "Hypersensitivity to montelukast"
        }
    ],
    depression: [
        {
            name: "Sertraline (Zoloft)",
            purpose: "SSRI antidepressant",
            dosage: "50mg once daily, may increase to 200mg daily",
            warning: "Takes 4-6 weeks for full effect. Monitor for suicidal thoughts, especially in young adults.",
            contraindications: "MAOI use within 14 days, pimozide use"
        },
        {
            name: "Escitalopram (Lexapro)",
            purpose: "SSRI antidepressant with fewer side effects",
            dosage: "10mg once daily, may increase to 20mg daily",
            warning: "May cause initial anxiety, sexual side effects. Don't stop abruptly.",
            contraindications: "MAOI use, QT prolongation"
        },
        {
            name: "Bupropion (Wellbutrin)",
            purpose: "Atypical antidepressant, less sexual side effects",
            dosage: "150mg once daily, may increase to 300mg daily",
            warning: "Lowers seizure threshold. May cause dry mouth, insomnia. Don't use with eating disorders.",
            contraindications: "Seizure disorder, eating disorders, MAOI use"
        }
    ],
    anxiety: [
        {
            name: "Lorazepam (Ativan)",
            purpose: "Short-term anxiety relief",
            dosage: "0.5-2mg as needed, maximum 6mg daily",
            warning: "Habit-forming. Avoid alcohol. May cause drowsiness. Don't drive.",
            contraindications: "Severe respiratory depression, sleep apnea"
        },
        {
            name: "Buspirone (BuSpar)",
            purpose: "Non-addictive anxiety treatment",
            dosage: "15mg twice daily, may increase to 30mg twice daily",
            warning: "Takes 2-4 weeks for effect. May cause dizziness, nausea initially.",
            contraindications: "MAOI use within 14 days"
        },
        {
            name: "Propranolol",
            purpose: "Beta-blocker for performance anxiety",
            dosage: "10-40mg as needed 1 hour before anxiety-provoking event",
            warning: "May lower heart rate and blood pressure. Don't use with asthma.",
            contraindications: "Asthma, severe heart failure, severe bradycardia"
        }
    ],
    heartdisease: [
        {
            name: "Atorvastatin (Lipitor)",
            purpose: "Cholesterol reduction and cardiovascular protection",
            dosage: "20-80mg once daily in evening",
            warning: "Monitor liver function and muscle pain. May interact with grapefruit juice.",
            contraindications: "Active liver disease, pregnancy"
        },
        {
            name: "Aspirin",
            purpose: "Antiplatelet therapy for heart disease prevention",
            dosage: "81mg once daily",
            warning: "Risk of bleeding. Take with food. Monitor for GI bleeding.",
            contraindications: "Active bleeding, severe liver disease"
        }
    ],
    arthritis: [
        {
            name: "Ibuprofen",
            purpose: "Anti-inflammatory pain relief",
            dosage: "400-800mg three times daily with food",
            warning: "May cause stomach upset, kidney problems. Monitor blood pressure.",
            contraindications: "Peptic ulcer disease, severe kidney disease"
        },
        {
            name: "Methotrexate",
            purpose: "Disease-modifying antirheumatic drug (DMARD)",
            dosage: "7.5-25mg once weekly with folic acid",
            warning: "Requires regular blood monitoring. May cause liver toxicity, bone marrow suppression.",
            contraindications: "Pregnancy, severe liver/kidney disease"
        }
    ],
    migraine: [
        {
            name: "Sumatriptan (Imitrex)",
            purpose: "Triptan for acute migraine treatment",
            dosage: "25-100mg at onset, may repeat once after 2 hours",
            warning: "Don't use for basilar or hemiplegic migraines. May cause chest tightness.",
            contraindications: "Coronary artery disease, uncontrolled hypertension"
        },
        {
            name: "Propranolol",
            purpose: "Migraine prevention",
            dosage: "80-240mg daily in divided doses",
            warning: "Don't stop abruptly. Monitor heart rate and blood pressure.",
            contraindications: "Asthma, severe heart failure"
        }
    ]
};

// GitHub API Functions
async function fetchProfilesFromGitHub() {
    try {
        const response = await fetch(PROFILES_FILE_URL, {
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (response.status === 404) {
            // File doesn't exist, return empty object
            console.log('profiles.json not found on GitHub, will create new file');
            return {};
        }

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const content = atob(data.content);
        return JSON.parse(content);
    } catch (error) {
        console.error('Error fetching from GitHub:', error);
        // Fallback to localStorage
        return loadFromLocalStorage();
    }
}

async function saveProfilesToGitHub(profiles) {
    try {
        const content = JSON.stringify(profiles, null, 2);
        const encodedContent = btoa(content);

        // First, try to get the current file to get its SHA
        let sha = null;
        try {
            const existingFile = await fetch(PROFILES_FILE_URL, {
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (existingFile.ok) {
                const fileData = await existingFile.json();
                sha = fileData.sha;
            }
        } catch (error) {
            console.log('File does not exist yet, will create new file');
        }

        const requestBody = {
            message: `Update emergency profiles - ${new Date().toISOString()}`,
            content: encodedContent,
            branch: 'main' // or 'master' depending on your default branch
        };

        if (sha) {
            requestBody.sha = sha;
        }

        const response = await fetch(PROFILES_FILE_URL, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        console.log('Successfully saved to GitHub');
        return true;
    } catch (error) {
        console.error('Error saving to GitHub:', error);
        // Fallback to localStorage
        saveToLocalStorage(profiles);
        return false;
    }
}

// Local Storage Functions (fallback)
function loadFromLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

function saveToLocalStorage(profiles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

// Enhanced Profile Management Functions
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

async function loadAllProfiles() {
    try {
        // Try GitHub first, fallback to localStorage
        return await fetchProfilesFromGitHub();
    } catch (error) {
        console.error('Error loading profiles:', error);
        return loadFromLocalStorage();
    }
}

async function saveAllProfiles(profiles) {
    try {
        // Try to save to GitHub first
        const githubSuccess = await saveProfilesToGitHub(profiles);
        if (!githubSuccess) {
            // Fallback to localStorage
            saveToLocalStorage(profiles);
        }
        return true;
    } catch (error) {
        console.error('Error saving profiles:', error);
        saveToLocalStorage(profiles);
        return false;
    }
}

async function saveProfile(profileData) {
    const id = generateUniqueId();
    const allProfiles = await loadAllProfiles();

    const document = {
        _id: id,
        ...profileData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    allProfiles[id] = document;
    await saveAllProfiles(allProfiles);

    return id;
}

async function findProfileById(id) {
    const allProfiles = await loadAllProfiles();
    return allProfiles[id.toUpperCase()] || null;
}

async function updateProfile(id, updatedData) {
    const allProfiles = await loadAllProfiles();

    if (!allProfiles[id.toUpperCase()]) return false;

    allProfiles[id.toUpperCase()] = {
        ...allProfiles[id.toUpperCase()],
        ...updatedData,
        updatedAt: new Date().toISOString()
    };

    await saveAllProfiles(allProfiles);
    return true;
}

async function deleteProfile(id) {
    const allProfiles = await loadAllProfiles();

    if (!allProfiles[id.toUpperCase()]) return false;

    delete allProfiles[id.toUpperCase()];
    await saveAllProfiles(allProfiles);
    return true;
}

async function downloadAllProfilesAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const profiles = await loadAllProfiles();

  let y = 10;

  profiles.forEach((profile, index) => {
    doc.setFontSize(14);
    doc.text(`Emergency Profile ${index + 1}`, 10, y);
    y += 10;

    doc.setFontSize(11);
    doc.text(`Full Name: ${profile.personal.fullName}`, 10, y); y += 7;
    doc.text(`Age: ${profile.personal.age}`, 10, y); y += 7;
    doc.text(`Location: ${profile.personal.location}`, 10, y); y += 7;

    doc.text(`Emergency Contact: ${profile.emergency.contact}`, 10, y); y += 7;
    doc.text(`Phone: ${profile.emergency.phone}`, 10, y); y += 12;

    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("emergency_profiles.pdf");
}

async function downloadAllProfilesAsImage() {
  const profiles = await loadAllProfiles();
  const container = document.getElementById("profileContainer");
  container.innerHTML = "";

  profiles.forEach((profile, index) => {
    const section = document.createElement("div");
    section.style.marginBottom = "20px";
    section.innerHTML = `
      <h3>Emergency Profile ${index + 1}</h3>
      <p><strong>Full Name:</strong> ${profile.personal.fullName}</p>
      <p><strong>Age:</strong> ${profile.personal.age}</p>
      <p><strong>Location:</strong> ${profile.personal.location}</p>
      <p><strong>Emergency Contact:</strong> ${profile.emergency.contact}</p>
      <p><strong>Phone:</strong> ${profile.emergency.phone}</p>
    `;
    container.appendChild(section);
  });

  container.style.display = "block";

  await html2canvas(container).then(canvas => {
    const link = document.createElement("a");
    link.download = "emergency_profiles.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  container.style.display = "none";
}


// Enhanced Profile Management UI Functions
function showUpdateProfileModal(profile) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;

    modalContent.innerHTML = `
        <h2>✏️ Update Emergency Profile</h2>
        <form id="updateProfileForm">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="updateFullName" value="${profile.personal.fullName}" required>
            </div>
            
            <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" id="updateDob" value="${profile.personal.dob}" required>
            </div>
            
            <div class="form-group">
                <label>Blood Type</label>
                <select id="updateBloodType" required>
                    <option value="">Select Blood Type</option>
                    <option value="A+" ${profile.personal.bloodType === 'A+' ? 'selected' : ''}>A+</option>
                    <option value="A-" ${profile.personal.bloodType === 'A-' ? 'selected' : ''}>A-</option>
                    <option value="B+" ${profile.personal.bloodType === 'B+' ? 'selected' : ''}>B+</option>
                    <option value="B-" ${profile.personal.bloodType === 'B-' ? 'selected' : ''}>B-</option>
                    <option value="AB+" ${profile.personal.bloodType === 'AB+' ? 'selected' : ''}>AB+</option>
                    <option value="AB-" ${profile.personal.bloodType === 'AB-' ? 'selected' : ''}>AB-</option>
                    <option value="O+" ${profile.personal.bloodType === 'O+' ? 'selected' : ''}>O+</option>
                    <option value="O-" ${profile.personal.bloodType === 'O-' ? 'selected' : ''}>O-</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Medical Conditions (separate with commas)</label>
                <textarea id="updateConditions" rows="3">${profile.medical.conditions.join(', ')}</textarea>
            </div>
            
            <div class="form-group">
                <label>Allergies (separate with commas)</label>
                <textarea id="updateAllergies" rows="2">${profile.medical.allergies.join(', ')}</textarea>
            </div>
            
            <div class="form-group">
                <label>Current Medications (one per line)</label>
                <textarea id="updateMedications" rows="4">${profile.medical.medications.join('\n')}</textarea>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">💾 Save Changes</button>
                <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">❌ Cancel</button>
            </div>
        </form>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Handle form submission
    document.getElementById('updateProfileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '🔄 Updating...';
        submitBtn.disabled = true;

        try {
            const updatedData = {
                personal: {
                    fullName: document.getElementById('updateFullName').value,
                    dob: document.getElementById('updateDob').value,
                    bloodType: document.getElementById('updateBloodType').value
                },
                medical: {
                    conditions: document.getElementById('updateConditions').value.split(',').map(item => item.trim()).filter(item => item),
                    allergies: document.getElementById('updateAllergies').value.split(',').map(item => item.trim()).filter(item => item),
                    medications: document.getElementById('updateMedications').value.split('\n').map(item => item.trim()).filter(item => item)
                },
                emergencyContacts: profile.emergencyContacts // Keep existing contacts for now
            };

            const success = await updateProfile(profile._id, updatedData);
            
            if (success) {
                alert('Profile updated successfully! 🎉');
                modalOverlay.remove();
                // Refresh the displayed profile
                const refreshedProfile = await findProfileById(profile._id);
                if (refreshedProfile) {
                    currentProfile = refreshedProfile;
                    // Trigger a re-render of the profile display
                    document.getElementById('searchBtn').click();
                }
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Error updating profile. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

async function showDeleteConfirmation(profile) {
    // Create confirmation modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;

    modalContent.innerHTML = `
        <div style="color: #dc3545; font-size: 48px; margin-bottom: 20px;">⚠️</div>
        <h2 style="color: #dc3545; margin-bottom: 20px;">Delete Profile</h2>
        <p style="margin-bottom: 20px;">
            Are you sure you want to permanently delete the profile for:<br>
            <strong>${profile.personal.fullName}</strong>?
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
            This action cannot be undone. All medical information and emergency contacts will be permanently removed.
        </p>
        <div class="form-actions">
            <button id="confirmDelete" class="btn btn-danger">🗑️ Yes, Delete Profile</button>
            <button id="cancelDelete" class="btn btn-secondary">❌ Cancel</button>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Handle delete confirmation
    document.getElementById('confirmDelete').addEventListener('click', async () => {
        const deleteBtn = document.getElementById('confirmDelete');
        const originalText = deleteBtn.innerHTML;
        deleteBtn.innerHTML = '🔄 Deleting...';
        deleteBtn.disabled = true;

        try {
            const success = await deleteProfile(profile._id);
            
            if (success) {
                alert('Profile deleted successfully.');
                modalOverlay.remove();
                
                // Clear the search results
                currentProfile = null;
                document.getElementById('searchResults').classList.add('hidden');
                document.getElementById('searchInput').value = '';
                
                // Hide action buttons
                const downloadBtn = document.getElementById('downloadProfileBtn');
                const updateBtn = document.getElementById('updateProfileBtn');
                const deleteBtn = document.getElementById('deleteProfileBtn');
                
                if (downloadBtn) downloadBtn.style.display = 'none';
                if (updateBtn) updateBtn.style.display = 'none';
                if (deleteBtn) deleteBtn.style.display = 'none';
            } else {
                throw new Error('Failed to delete profile');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Error deleting profile. Please try again.');
        } finally {
            deleteBtn.innerHTML = originalText;
            deleteBtn.disabled = false;
        }
    });

    // Handle cancel
    document.getElementById('cancelDelete').addEventListener('click', () => {
        modalOverlay.remove();
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Enhanced AI Medicine Suggestion Functions
async function getMedicineSuggestions(conditions, allergies = [], currentMedications = []) {
    try {
        return await getEnhancedAISuggestions(conditions, allergies, currentMedications);
    } catch (error) {
        console.error('AI API Error:', error);
        throw new Error('Unable to get AI suggestions at this time');
    }
}

async function getEnhancedAISuggestions(conditions, allergies, currentMedications) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suggestions = [];
    const processedConditions = conditions.map(c => c.toLowerCase().replace(/\s+/g, ''));
    const processedAllergies = allergies.map(a => a.toLowerCase());
    const processedCurrentMeds = currentMedications.map(m => m.toLowerCase());
    
    // Enhanced condition matching
    processedConditions.forEach(condition => {
        // Direct matches
        Object.keys(ENHANCED_AI_RESPONSES).forEach(key => {
            if (condition.includes(key) || key.includes(condition) || 
                condition.includes(key.replace(/\s+/g, '')) ||
                (key === 'heartdisease' && (condition.includes('heart') || condition.includes('cardiac') || condition.includes('coronary'))) ||
                (key === 'arthritis' && (condition.includes('joint') || condition.includes('rheumat'))) ||
                (condition.includes('high') && condition.includes('pressure') && key === 'hypertension') ||
                (condition.includes('sugar') && condition.includes('diabetes')) ||
                (condition.includes('headache') && key === 'migraine')) {
                
                suggestions.push(...ENHANCED_AI_RESPONSES[key]);
            }
        });
    });
    
    // Remove duplicates
    const uniqueSuggestions = suggestions.filter((med, index, self) => 
        index === self.findIndex(m => m.name === med.name)
    );
    
    // Filter out medications the patient is allergic to or already taking
    const filteredSuggestions = uniqueSuggestions.filter(med => {
        const medNameLower = med.name.toLowerCase();
        
        // Check allergies
        const hasAllergy = processedAllergies.some(allergy => 
            medNameLower.includes(allergy) || allergy.includes(medNameLower.split(' ')[0])
        );
        
        // Check current medications
        const alreadyTaking = processedCurrentMeds.some(currentMed =>
            currentMed.includes(medNameLower.split(' ')[0]) || medNameLower.includes(currentMed.split(' ')[0])
        );
        
        return !hasAllergy && !alreadyTaking;
    });
    
    // If no specific matches, provide general health guidance
    if (filteredSuggestions.length === 0 && conditions.length > 0) {
        return [{
            name: "Comprehensive Medical Evaluation Recommended",
            purpose: "Professional assessment for reported conditions",
            dosage: "Schedule appointment with healthcare provider",
            warning: "The reported conditions require professional medical evaluation and personalized treatment planning.",
            contraindications: "Self-medication is not recommended for undiagnosed conditions"
        }];
    }
    
    return filteredSuggestions.length > 0 ? filteredSuggestions : [];
}

function displayMedicineSuggestions(suggestions, patientProfile = null) {
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
            <div class="medicine-purpose"><strong>Purpose:</strong> ${med.purpose}</div>
            <div class="medicine-dosage">
                <strong>Typical Dosage:</strong> ${med.dosage}
            </div>
            <div class="medicine-warning">
                <strong>⚠️ Important Warnings:</strong> ${med.warning}
            </div>
            ${med.contraindications ? `
                <div class="medicine-contraindications">
                    <strong>🚫 Contraindications:</strong> ${med.contraindications}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    const patientSummary = patientProfile ? `
        <div class="patient-summary">
            <h4>Patient Summary</h4>
            <p><strong>Conditions:</strong> ${patientProfile.medical.conditions.join(', ') || 'None reported'}</p>
            <p><strong>Allergies:</strong> ${patientProfile.medical.allergies.join(', ') || 'None reported'}</p>
            <p><strong>Current Medications:</strong> ${patientProfile.medical.medications.join(', ') || 'None reported'}</p>
        </div>
    ` : '';
    
    aiResults.innerHTML = `
        ${patientSummary}
        <h4>AI-Generated Medication Suggestions</h4>
        ${suggestionsHTML}
        <div class="ai-disclaimer">
            <strong>⚠️ IMPORTANT MEDICAL DISCLAIMER:</strong><br>
            • These suggestions are AI-generated for informational purposes only<br>
            • Always consult a qualified healthcare professional before starting any medication<br>
            • Your doctor should evaluate your complete medical history and current health status<br>
            • Never stop or change prescribed medications without medical supervision<br>
            • Call emergency services immediately for life-threatening conditions<br>
            • This system does not replace professional medical diagnosis or treatment
        </div>
    `;
}

// Enhanced Event Listeners
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

            const submitBtn = document.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;

            try {
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

                const uniqueId = await saveProfile(profileData);

                document.getElementById('medicalForm').classList.add('hidden');
                document.getElementById('uniqueCode').textContent = uniqueId;
                document.getElementById('successMessage').classList.remove('hidden');
            } catch (error) {
                alert('Error saving profile. Please try again.');
                console.error(error);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    if (document.getElementById('searchBtn')) {
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        let currentProfile = null;

        searchBtn.addEventListener('click', async () => {
            await performSearch();
        });

        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                await performSearch();
            }
        });

        async function performSearch() {
            const searchResults = document.getElementById('searchResults');
            const errorMessage = document.getElementById('errorMessage');
            const profileData = document.getElementById('profileData');

            const id = searchInput.value.trim();
            if (!id) return;

            searchBtn.textContent = 'Searching...';
            searchBtn.disabled = true;

            try {
                const profile = await findProfileById(id);

                if (profile) {
                    currentProfile = profile;
                    
                    // Show action buttons
                    const downloadBtn = document.getElementById('downloadProfileBtn');
                    const updateBtn = document.getElementById('updateProfileBtn');
                    const deleteBtn = document.getElementById('deleteProfileBtn');
                    
                    if (downloadBtn) downloadBtn.style.display = 'inline-block';
                    if (updateBtn) updateBtn.style.display = 'inline-block';
                    if (deleteBtn) deleteBtn.style.display = 'inline-block';
                    
                    profileData.innerHTML = `
                        <div class="profile-display">
                            <div class="profile-header">
                                <h2>${profile.personal.fullName}</h2>
                                <p>Emergency Medical Information</p>
                                <small>Last updated: ${new Date(profile.updatedAt).toLocaleString()}</small>
                            </div>

                            <div class="info-grid">
                                <div class="info-card">
                                    <h3>Personal Details</h3>
                                    <ul class="info-list">
                                        <li><strong>Date of Birth:</strong> ${new Date(profile.personal.dob).toLocaleDateString()}</li>
                                        <li><strong>Blood Type:</strong> <span style="color: #ff6b6b; font-weight: bold; font-size: 1.2em;">${profile.personal.bloodType}</span></li>
                                    </ul>
                                </div>

                                <div class="info-card">
                                    <h3>Medical Conditions</h3>
                                    <ul class="info-list">
                                        ${profile.medical.conditions.length > 0 ? 
                                            profile.medical.conditions.map(c => `<li>• ${c}</li>`).join('') : 
                                            '<li style="color: #666; font-style: italic;">None reported</li>'
                                        }
                                    </ul>
                                </div>

                                <div class="info-card">
                                    <h3>⚠️ Allergies</h3>
                                    <ul class="info-list">
                                        ${profile.medical.allergies.length > 0 ? 
                                            profile.medical.allergies.map(a => `<li style="color: #dc3545; font-weight: 600; background: #fff5f5; padding: 4px 8px; border-radius: 4px; margin: 2px 0;">🚫 ${a}</li>`).join('') : 
                                            '<li style="color: #666; font-style: italic;">None reported</li>'
                                        }
                                    </ul>
                                </div>

                                <div class="info-card">
                                    <h3>Current Medications</h3>
                                    <ul class="info-list">
                                        ${profile.medical.medications.length > 0 ? 
                                            profile.medical.medications.map(m => `<li>💊 ${m}</li>`).join('') : 
                                            '<li style="color: #666; font-style: italic;">None reported</li>'
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div class="info-card">
                                <h3>🚨 Emergency Contacts</h3>
                                <div class="contacts-grid">
                                    ${profile.emergencyContacts.map(contact => `
                                        <div class="contact-card">
                                            <h4>${contact.name}</h4>
                                            <div class="relationship">${contact.relationship}</div>
                                            <div class="phone"><a href="tel:${contact.phone}" style="color: #007bff; font-weight: bold;">📞 ${contact.phone}</a></div>
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
                    
                    // Hide action buttons
                    const downloadBtn = document.getElementById('downloadProfileBtn');
                    const updateBtn = document.getElementById('updateProfileBtn');
                    const deleteBtn = document.getElementById('deleteProfileBtn');
                    
                    if (downloadBtn) downloadBtn.style.display = 'none';
                    if (updateBtn) updateBtn.style.display = 'none';
                    if (deleteBtn) deleteBtn.style.display = 'none';
                    
                    searchResults.classList.add('hidden');
                    errorMessage.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Search error:', error);
                alert('Error searching for profile. Please try again.');
            } finally {
                searchBtn.textContent = 'Search';
                searchBtn.disabled = false;
            }
        }

        // Profile Action Buttons Setup
        setupProfileActionButtons();

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
                        currentProfile.medical.allergies,
                        currentProfile.medical.medications
                    );
                    
                    displayMedicineSuggestions(suggestions, currentProfile);
                    aiResults.classList.remove('hidden');
                } catch (error) {
                    console.error('AI Suggestion Error:', error);
                    aiResults.innerHTML = `
                        <div class="ai-disclaimer">
                            <strong>⚠️ Service Temporarily Unavailable</strong><br>
                            Unable to get AI suggestions at this time. Please try again later or consult with a healthcare professional immediately for emergency situations.
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

        // Profile action buttons setup function
        function setupProfileActionButtons() {
            // Download Profile Button
            const downloadProfileDiv = document.getElementById('downloadProfile');
            if (downloadProfileDiv) {
                downloadProfileDiv.innerHTML = `
                    <button id="downloadProfileBtn" class="btn btn-success" style="display: none;">
                        📥 Download Profile
                    </button>
                `;

                document.getElementById('downloadProfileBtn').addEventListener('click', () => {
                    if (currentProfile) {
                        downloadProfile(currentProfile);
                    } else {
                        alert('No profile loaded to download');
                    }
                });
            }

            // Update Profile Button
            const updateProfileDiv = document.getElementById('updateProfile');
            if (updateProfileDiv) {
                updateProfileDiv.innerHTML = `
                    <button id="updateProfileBtn" class="btn btn-warning" style="display: none;">
                        ✏️ Update Profile
                    </button>
                `;

                document.getElementById('updateProfileBtn').addEventListener('click', () => {
                    if (currentProfile) {
                        showUpdateProfileModal(currentProfile);
                    } else {
                        alert('No profile loaded to update');
                    }
                });
            }

            // Delete Profile Button
            const deleteProfileDiv = document.getElementById('deleteProfile');
            if (deleteProfileDiv) {
                deleteProfileDiv.innerHTML = `
                    <button id="deleteProfileBtn" class="btn btn-danger" style="display: none;">
                        🗑️ Delete Profile
                    </button>
                `;

                document.getElementById('deleteProfileBtn').addEventListener('click', async () => {
                    if (currentProfile) {
                        await showDeleteConfirmation(currentProfile);
                    } else {
                        alert('No profile loaded to delete');
                    }
                });
            }
        }
    }
});