
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

// Enhanced search functions - supports both ID and name search
async function findProfileById(id) {
    if (!id) return null;
    
    const allProfiles = await loadAllProfiles();
    return allProfiles[id.toUpperCase()] || null;
}

async function findProfileByName(name) {
    if (!name) return null;
    
    const allProfiles = await loadAllProfiles();
    const searchName = name.toLowerCase().trim();
    
    // Search through all profiles for matching names
    for (const profile of Object.values(allProfiles)) {
        if (profile.personal && profile.personal.fullName) {
            const profileName = profile.personal.fullName.toLowerCase().trim();
            if (profileName.includes(searchName) || searchName.includes(profileName)) {
                return profile;
            }
        }
    }
    return null;
}

// Combined search function
async function searchProfile(searchTerm) {
    if (!searchTerm) return null;
    
    const trimmed = searchTerm.trim();
    
    // If the search term looks like an ID (short alphanumeric), try ID search first
    if (/^[A-Za-z0-9]{6,10}$/.test(trimmed)) {
        const profileById = await findProfileById(trimmed);
        if (profileById) return profileById;
    }
    
    // Try name search
    const profileByName = await findProfileByName(trimmed);
    if (profileByName) return profileByName;
    
    // If no exact matches, try ID search as fallback
    return await findProfileById(trimmed);
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

// Enhanced download functions
async function downloadProfileAsPDF(profile) {
    try {
        // Create PDF content using a simple approach
        const content = generateProfileContent(profile);
        
        // Create a temporary element to trigger download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${profile.personal.fullName.replace(/\s+/g, '_')}_Emergency_Profile.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('Profile downloaded as text file (PDF library not available)');
    } catch (error) {
        console.error('Error downloading profile:', error);
        alert('Error downloading profile. Please try again.');
    }
}

async function downloadProfileAsImage(profile) {
    try {
        // Create a temporary container for the profile
        const container = document.createElement('div');
        container.style.cssText = `
            width: 800px;
            padding: 40px;
            background: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            position: fixed;
            top: -9999px;
            left: -9999px;
        `;
        
        container.innerHTML = generateProfileHTML(profile);
        document.body.appendChild(container);
        
        // Use html2canvas if available, otherwise fallback
        if (typeof html2canvas !== 'undefined') {
            const canvas = await html2canvas(container, {
                backgroundColor: '#ffffff',
                scale: 2
            });
            
            const link = document.createElement('a');
            link.download = `${profile.personal.fullName.replace(/\s+/g, '_')}_Emergency_Profile.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } else {
            // Fallback to text download
            await downloadProfileAsPDF(profile);
        }
        
        document.body.removeChild(container);
    } catch (error) {
        console.error('Error downloading profile as image:', error);
        alert('Error downloading profile as image. Please try again.');
    }
}

function generateProfileContent(profile) {
    const age = calculateAge(profile.personal.dob);
    return `
EMERGENCY MEDICAL PROFILE
========================

Personal Information:
- Full Name: ${profile.personal.fullName}
- Date of Birth: ${new Date(profile.personal.dob).toLocaleDateString()}
- Age: ${age} years
- Blood Type: ${profile.personal.bloodType}

Medical Conditions:
${profile.medical.conditions.length > 0 ? 
    profile.medical.conditions.map(c => `- ${c}`).join('\n') : 
    '- None reported'
}

Allergies:
${profile.medical.allergies.length > 0 ? 
    profile.medical.allergies.map(a => `- ${a}`).join('\n') : 
    '- None reported'
}

Current Medications:
${profile.medical.medications.length > 0 ? 
    profile.medical.medications.map(m => `- ${m}`).join('\n') : 
    '- None reported'
}

Emergency Contacts:
${profile.emergencyContacts.map(contact => 
    `- ${contact.name} (${contact.relationship}): ${contact.phone}`
).join('\n')}

Profile ID: ${profile._id}
Last Updated: ${new Date(profile.updatedAt).toLocaleString()}

⚠️ IMPORTANT: This is emergency medical information. 
Please contact emergency services immediately for life-threatening situations.
    `.trim();
}

function generateProfileHTML(profile) {
    const age = calculateAge(profile.personal.dob);
    return `
        <div style="border: 3px solid #dc3545; border-radius: 12px; padding: 30px;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #dc3545; padding-bottom: 20px;">
                <h1 style="color: #dc3545; margin: 0; font-size: 28px;">🚨 EMERGENCY MEDICAL PROFILE</h1>
                <h2 style="margin: 10px 0; font-size: 24px;">${profile.personal.fullName}</h2>
                <p style="margin: 5px 0; font-size: 14px; color: #666;">Profile ID: ${profile._id}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                <div>
                    <h3 style="color: #dc3545; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Personal Details</h3>
                    <p><strong>Date of Birth:</strong> ${new Date(profile.personal.dob).toLocaleDateString()}</p>
                    <p><strong>Age:</strong> ${age} years</p>
                    <p><strong>Blood Type:</strong> <span style="color: #dc3545; font-weight: bold; font-size: 18px;">${profile.personal.bloodType}</span></p>
                </div>
                
                <div>
                    <h3 style="color: #dc3545; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Medical Conditions</h3>
                    ${profile.medical.conditions.length > 0 ? 
                        profile.medical.conditions.map(c => `<p>• ${c}</p>`).join('') : 
                        '<p style="color: #666; font-style: italic;">None reported</p>'
                    }
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                <div>
                    <h3 style="color: #dc3545; border-bottom: 1px solid #ddd; padding-bottom: 5px;">⚠️ Allergies</h3>
                    ${profile.medical.allergies.length > 0 ? 
                        profile.medical.allergies.map(a => `<p style="color: #dc3545; font-weight: 600;">🚫 ${a}</p>`).join('') : 
                        '<p style="color: #666; font-style: italic;">None reported</p>'
                    }
                </div>
                
                <div>
                    <h3 style="color: #dc3545; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Current Medications</h3>
                    ${profile.medical.medications.length > 0 ? 
                        profile.medical.medications.map(m => `<p>💊 ${m}</p>`).join('') : 
                        '<p style="color: #666; font-style: italic;">None reported</p>'
                    }
                </div>
            </div>
            
            <div>
                <h3 style="color: #dc3545; border-bottom: 1px solid #ddd; padding-bottom: 5px;">🚨 Emergency Contacts</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                    ${profile.emergencyContacts.map(contact => `
                        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #f8f9fa;">
                            <h4 style="margin: 0 0 5px 0;">${contact.name}</h4>
                            <p style="margin: 5px 0; color: #666;">${contact.relationship}</p>
                            <p style="margin: 5px 0; font-weight: bold; color: #007bff;">📞 ${contact.phone}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #dc3545; text-align: center;">
                <p style="font-size: 12px; color: #666;">Last Updated: ${new Date(profile.updatedAt).toLocaleString()}</p>
                <p style="font-size: 14px; color: #dc3545; font-weight: bold;">⚠️ For emergencies, call your local emergency number immediately</p>
            </div>
        </div>
    `;
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Profile download function (unified)
function downloadProfile(profile) {
    // Create download options modal
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
        max-width: 400px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;

    modalContent.innerHTML = `
        <h2>📥 Download Profile</h2>
        <p>Choose download format for <strong>${profile.personal.fullName}</strong>'s profile:</p>
        <div style="margin: 20px 0;">
            <button id="downloadPDF" class="btn btn-primary" style="margin: 10px; width: 120px;">
                📄 PDF/Text
            </button>
            <button id="downloadImage" class="btn btn-success" style="margin: 10px; width: 120px;">
                🖼️ Image
            </button>
        </div>
        <button id="cancelDownload" class="btn btn-secondary">Cancel</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Handle download options
    document.getElementById('downloadPDF').addEventListener('click', async () => {
        modalOverlay.remove();
        await downloadProfileAsPDF(profile);
    });

    document.getElementById('downloadImage').addEventListener('click', async () => {
        modalOverlay.remove();
        await downloadProfileAsImage(profile);
    });

    document.getElementById('cancelDownload').addEventListener('click', () => {
        modalOverlay.remove();
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

async function downloadAllProfilesAsPDF() {
    try {
        const profiles = await loadAllProfiles();
        const profileArray = Object.values(profiles);
        
        if (profileArray.length === 0) {
            alert('No profiles found to download.');
            return;
        }
        
        let allContent = 'EMERGENCY MEDICAL PROFILES - COMPLETE DATABASE\n';
        allContent += '='.repeat(60) + '\n\n';
        
        profileArray.forEach((profile, index) => {
            allContent += `PROFILE ${index + 1}\n`;
            allContent += '-'.repeat(20) + '\n';
            allContent += generateProfileContent(profile);
            allContent += '\n\n' + '='.repeat(60) + '\n\n';
        });
        
        const blob = new Blob([allContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `All_Emergency_Profiles_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('All profiles downloaded successfully');
    } catch (error) {
        console.error('Error downloading all profiles:', error);
        alert('Error downloading profiles. Please try again.');
    }
}

async function downloadAllProfilesAsImage() {
    try {
        const profiles = await loadAllProfiles();
        const profileArray = Object.values(profiles);
        
        if (profileArray.length === 0) {
            alert('No profiles found to download.');
            return;
        }
        
        // For multiple profiles, create a summary image
        const container = document.createElement('div');
        container.style.cssText = `
            width: 1200px;
            padding: 40px;
            background: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            position: fixed;
            top: -9999px;
            left: -9999px;
        `;
        
        let summaryHTML = `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #dc3545; padding-bottom: 20px;">
                <h1 style="color: #dc3545; margin: 0; font-size: 32px;">🚨 EMERGENCY PROFILES DATABASE</h1>
                <p style="font-size: 16px; color: #666;">Total Profiles: ${profileArray.length}</p>
                <p style="font-size: 14px; color: #666;">Generated: ${new Date().toLocaleString()}</p>
            </div>
        `;
        
        profileArray.forEach((profile, index) => {
            const age = calculateAge(profile.personal.dob);
            summaryHTML += `
                <div style="border: 2px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #f8f9fa;">
                    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px;">
                        <div>
                            <h3 style="color: #dc3545; margin: 0 0 10px 0;">${index + 1}. ${profile.personal.fullName}</h3>
                            <p><strong>ID:</strong> ${profile._id}</p>
                            <p><strong>Age:</strong> ${age} years | <strong>Blood Type:</strong> <span style="color: #dc3545; font-weight: bold;">${profile.personal.bloodType}</span></p>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: #dc3545;">Conditions</h4>
                            ${profile.medical.conditions.length > 0 ? 
                                profile.medical.conditions.map(c => `<p style="font-size: 12px; margin: 2px 0;">• ${c}</p>`).join('') : 
                                '<p style="font-size: 12px; color: #666;">None</p>'
                            }
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: #dc3545;">Emergency Contact</h4>
                            ${profile.emergencyContacts.length > 0 ? 
                                `<p style="font-size: 12px; margin: 2px 0;"><strong>${profile.emergencyContacts[0].name}</strong></p>
                                 <p style="font-size: 12px; margin: 2px 0;">${profile.emergencyContacts[0].phone}</p>` :
                                '<p style="font-size: 12px; color: #666;">None</p>'
                            }
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = summaryHTML;
        document.body.appendChild(container);
        
        if (typeof html2canvas !== 'undefined') {
            const canvas = await html2canvas(container, {
                backgroundColor: '#ffffff',
                scale: 1.5,
                width: 1200,
                height: container.scrollHeight
            });
            
            const link = document.createElement('a');
            link.download = `All_Emergency_Profiles_${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } else {
            // Fallback to text download
            await downloadAllProfilesAsPDF();
        }
        
        document.body.removeChild(container);
    } catch (error) {
        console.error('Error downloading all profiles as image:', error);
        alert('Error downloading profiles as image. Please try again.');
    }
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
                    window.currentProfile = refreshedProfile;
                    // Trigger a re-render of the profile display
                    const searchBtn = document.getElementById('searchBtn');
                    if (searchBtn) searchBtn.click();
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
                window.currentProfile = null;
                const searchResults = document.getElementById('searchResults');
                if (searchResults) searchResults.classList.add('hidden');
                
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.value = '';
                
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
    // Initialize global variable for current profile
    window.currentProfile = null;
    
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
        const searchByCode = document.getElementById('searchByCode');
        const searchByName = document.getElementById('searchByName');

        searchBtn.addEventListener('click', async () => {
            const code = searchByCode.value.trim();
            const name = searchByName.value.trim();
            let searchTerm = code || name;
            if (!searchTerm) return;
            await performSearch(searchTerm);
        });

        [searchByCode, searchByName].forEach(input => {
            input.addEventListener('keypress', async (e) => {
                if (e.key === 'Enter') {
                    const code = searchByCode.value.trim();
                    const name = searchByName.value.trim();
                    let searchTerm = code || name;
                    if (!searchTerm) return;
                    await performSearch(searchTerm);
                }
            });
        });

        async function performSearch(searchTerm) {
            const searchResults = document.getElementById('searchResults');
            const errorMessage = document.getElementById('errorMessage');
            const profileData = document.getElementById('profileData');

            searchBtn.textContent = 'Searching...';
            searchBtn.disabled = true;

            try {
                const profile = await searchProfile(searchTerm);

                if (profile) {
                    window.currentProfile = profile;

                    const downloadBtn = document.getElementById('downloadProfileBtn');
                    const updateBtn = document.getElementById('updateProfileBtn');
                    const deleteBtn = document.getElementById('deleteProfileBtn');

                    if (downloadBtn) downloadBtn.style.display = 'inline-block';
                    if (updateBtn) updateBtn.style.display = 'inline-block';
                    if (deleteBtn) deleteBtn.style.display = 'inline-block';

                    const age = calculateAge(profile.personal.dob);

                    profileData.innerHTML = `
                        <div class="profile-display" id="profileDisplayContainer">
                            <div class="profile-header">
                                <h2>${profile.personal.fullName}</h2>
                                <p>Emergency Medical Information</p>
                                <p><strong>Profile ID:</strong> ${profile._id}</p>
                                <small>Last updated: ${new Date(profile.updatedAt).toLocaleString()}</small>
                            </div>

                            <div class="info-grid">
                                <div class="info-card">
                                    <h3>Personal Details</h3>
                                    <ul class="info-list">
                                        <li><strong>Date of Birth:</strong> ${new Date(profile.personal.dob).toLocaleDateString()}</li>
                                        <li><strong>Age:</strong> ${age} years</li>
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
                    window.currentProfile = null;

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
    }

    // Profile Action Buttons Setup
    setupProfileActionButtons();

    if (document.getElementById('getAiSuggestions')) {
        document.getElementById('getAiSuggestions').addEventListener('click', async () => {
            if (!window.currentProfile) {
                alert('Please search for a profile first');
                return;
            }

            const button = document.getElementById('getAiSuggestions');
            const btnText = button.querySelector('.btn-text');
            const btnLoading = button.querySelector('.btn-loading');
            const aiResults = document.getElementById('aiResults');

            button.disabled = true;
            if (btnText) btnText.classList.add('hidden');
            if (btnLoading) btnLoading.classList.remove('hidden');
            if (aiResults) aiResults.classList.add('hidden');

            try {
                const suggestions = await getMedicineSuggestions(
                    window.currentProfile.medical.conditions,
                    window.currentProfile.medical.allergies,
                    window.currentProfile.medical.medications
                );
                
                displayMedicineSuggestions(suggestions, window.currentProfile);
                if (aiResults) aiResults.classList.remove('hidden');
            } catch (error) {
                console.error('AI Suggestion Error:', error);
                if (aiResults) {
                    aiResults.innerHTML = `
                        <div class="ai-disclaimer">
                            <strong>⚠️ Service Temporarily Unavailable</strong><br>
                            Unable to get AI suggestions at this time. Please try again later or consult with a healthcare professional immediately for emergency situations.
                        </div>
                    `;
                    aiResults.classList.remove('hidden');
                }
            } finally {
                button.disabled = false;
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoading) btnLoading.classList.add('hidden');
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
                if (window.currentProfile) {
                    downloadProfile(window.currentProfile);
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
                if (window.currentProfile) {
                    showUpdateProfileModal(window.currentProfile);
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
                if (window.currentProfile) {
                    await showDeleteConfirmation(window.currentProfile);
                } else {
                    alert('No profile loaded to delete');
                }
            });
        }
    }

    // Bulk download buttons setup
    const downloadAllPDFBtn = document.getElementById('downloadAllPDF');
    if (downloadAllPDFBtn) {
        downloadAllPDFBtn.addEventListener('click', async () => {
            await downloadAllProfilesAsPDF();
        });
    }

    const downloadAllImageBtn = document.getElementById('downloadAllImage');
    if (downloadAllImageBtn) {
        downloadAllImageBtn.addEventListener('click', async () => {
            await downloadAllProfilesAsImage();
        });
    }
});

// Additional utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: opacity 0.3s ease;
    `;
    
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            notification.innerHTML = `✅ ${message}`;
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            notification.innerHTML = `❌ ${message}`;
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#000';
            notification.innerHTML = `⚠️ ${message}`;
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
            notification.innerHTML = `ℹ️ ${message}`;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for external use
window.EmergencyProfileSystem = {
    saveProfile,
    searchProfile,
    findProfileById,
    findProfileByName,
    updateProfile,
    deleteProfile,
    downloadProfile,
    downloadAllProfilesAsPDF,
    downloadAllProfilesAsImage,
    getMedicineSuggestions,
    loadAllProfiles,
    showNotification
};

// Error handling for GitHub API
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (event.reason && event.reason.message && event.reason.message.includes('GitHub API')) {
        showNotification('GitHub sync failed, using local storage', 'warning');
    }
});

// Periodic sync check (optional)
let syncInterval;
function startPeriodicSync(intervalMinutes = 30) {
    if (syncInterval) clearInterval(syncInterval);
    
    syncInterval = setInterval(async () => {
        try {
            const profiles = await loadAllProfiles();
            console.log(`Periodic sync check: ${Object.keys(profiles).length} profiles loaded`);
        } catch (error) {
            console.warn('Periodic sync failed:', error.message);
        }
    }, intervalMinutes * 60 * 1000);
}

// Auto-start periodic sync if GitHub is configured
if (GITHUB_CONFIG.token && GITHUB_CONFIG.token !== 'your-github-token') {
    startPeriodicSync();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        if (searchInput && searchResults) {
            searchInput.value = '';
            searchResults.classList.add('hidden');
            window.currentProfile = null;
            
            // Hide action buttons
            const buttons = ['downloadProfileBtn', 'updateProfileBtn', 'deleteProfileBtn'];
            buttons.forEach(btnId => {
                const btn = document.getElementById(btnId);
                if (btn) btn.style.display = 'none';
            });
        }
    }
});

// Print profile function
function printProfile(profile) {
    if (!profile) {
        alert('No profile loaded to print');
        return;
    }
    
    const printWindow = window.open('', '_blank');
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Emergency Profile - ${profile.personal.fullName}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 20px;
                    color: #333;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #dc3545;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #dc3545;
                    margin: 0;
                }
                .section {
                    margin-bottom: 25px;
                    page-break-inside: avoid;
                }
                .section h3 {
                    color: #dc3545;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                }
                .contact-card {
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 5px;
                }
                .blood-type {
                    color: #dc3545;
                    font-weight: bold;
                    font-size: 1.2em;
                }
                .allergy {
                    color: #dc3545;
                    font-weight: bold;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🚨 EMERGENCY MEDICAL PROFILE</h1>
                <h2>${profile.personal.fullName}</h2>
                <p>Profile ID: ${profile._id}</p>
            </div>
            
            <div class="section">
                <h3>Personal Information</h3>
                <p><strong>Date of Birth:</strong> ${new Date(profile.personal.dob).toLocaleDateString()}</p>
                <p><strong>Age:</strong> ${calculateAge(profile.personal.dob)} years</p>
                <p><strong>Blood Type:</strong> <span class="blood-type">${profile.personal.bloodType}</span></p>
            </div>
            
            <div class="section">
                <h3>Medical Conditions</h3>
                ${profile.medical.conditions.length > 0 ? 
                    '<ul>' + profile.medical.conditions.map(c => `<li>${c}</li>`).join('') + '</ul>' : 
                    '<p><em>None reported</em></p>'
                }
            </div>
            
            <div class="section">
                <h3>⚠️ Allergies</h3>
                ${profile.medical.allergies.length > 0 ? 
                    '<ul>' + profile.medical.allergies.map(a => `<li class="allergy">🚫 ${a}</li>`).join('') + '</ul>' : 
                    '<p><em>None reported</em></p>'
                }
            </div>
            
            <div class="section">
                <h3>Current Medications</h3>
                ${profile.medical.medications.length > 0 ? 
                    '<ul>' + profile.medical.medications.map(m => `<li>💊 ${m}</li>`).join('') + '</ul>' : 
                    '<p><em>None reported</em></p>'
                }
            </div>
            
            <div class="section">
                <h3>🚨 Emergency Contacts</h3>
                <div class="contact-grid">
                    ${profile.emergencyContacts.map(contact => `
                        <div class="contact-card">
                            <h4>${contact.name}</h4>
                            <p><strong>Relationship:</strong> ${contact.relationship}</p>
                            <p><strong>Phone:</strong> ${contact.phone}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <p style="text-align: center; font-size: 12px; color: #666; margin-top: 30px;">
                    Last Updated: ${new Date(profile.updatedAt).toLocaleString()}<br>
                    <strong>⚠️ For emergencies, call your local emergency number immediately</strong>
                </p>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                    // Close window after printing (optional)
                    // window.onafterprint = function() { window.close(); };
                }
            </script>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Add print functionality to profile actions
function setupPrintButton() {
    const printProfileDiv = document.getElementById('printProfile');
    if (printProfileDiv) {
        printProfileDiv.innerHTML = `
            <button id="printProfileBtn" class="btn btn-info" style="display: none;">
                🖨️ Print Profile
            </button>
        `;

        document.getElementById('printProfileBtn').addEventListener('click', () => {
            if (window.currentProfile) {
                printProfile(window.currentProfile);
            } else {
                alert('No profile loaded to print');
            }
        });
    }
}

// Call setup function when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPrintButton);
} else {
    setupPrintButton();
}

// Debug function to list all profiles
async function debugListProfiles() {
    const profiles = await loadAllProfiles();
    console.log('All profiles in database:');
    Object.entries(profiles).forEach(([id, profile]) => {
        console.log(`ID: ${id}, Name: ${profile.personal?.fullName || 'Unknown'}`);
    });
    return profiles;
}