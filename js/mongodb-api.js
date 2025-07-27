const STORAGE_KEY = 'profiles_json_store';

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 10);
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
    return allProfiles[id] || null;
}

function updateProfile(id, updatedData) {
    const allProfiles = loadAllProfiles();

    if (!allProfiles[id]) return false;

    allProfiles[id] = {
        ...allProfiles[id],
        ...updatedData,
        updatedAt: new Date().toISOString()
    };

    saveAllProfiles(allProfiles);
    return true;
}

function deleteProfile(id) {
    const allProfiles = loadAllProfiles();

    if (!allProfiles[id]) return false;

    delete allProfiles[id];
    saveAllProfiles(allProfiles);
    return true;
}

function downloadAllProfiles() {
    const profiles = loadAllProfiles();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "profiles.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

function downloadProfile(profileData) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profileData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "profile.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

export {
    saveProfile,
    findProfileById,
    updateProfile,
    deleteProfile,
    downloadProfile,
    downloadAllProfiles
};
