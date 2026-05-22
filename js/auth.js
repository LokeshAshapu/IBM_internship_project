/**
 * User Authentication System
 * Handles user registration, login, and session management
 * Supports: Email/Password and GitHub OAuth
 */

const AUTH_CONFIG = {
  STORAGE_KEY_USER: 'currentUser',
  STORAGE_KEY_USERS: 'registeredUsers',
  STORAGE_KEY_SESSION: 'authSession',
  SESSION_TIMEOUT: 7 * 24 * 60 * 60 * 1000, // 7 days
  GITHUB_CLIENT_ID: 'YOUR_GITHUB_CLIENT_ID',
  GITHUB_REDIRECT_URI: window.location.origin + '/callback.html'
};

class AuthenticationManager {
  constructor() {
    this.currentUser = this.loadCurrentUser();
    this.validateSession();
  }

  /**
   * Register new user with email and password
   */
  registerWithEmail(email, password, name) {
    // Validation
    if (!this.validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }
    if (!this.validatePassword(password)) {
      return { success: false, error: 'Password must be at least 8 characters' };
    }
    if (this.userExists(email)) {
      return { success: false, error: 'User already exists with this email' };
    }

    // Create user
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const user = {
      userId,
      email,
      name: name || email.split('@')[0],
      authMethod: 'email',
      passwordHash: this.hashPassword(password),
      subscription: {
        tier: 'free',
        features: [],
        maxProfiles: 1,
        createdAt: new Date().toISOString()
      },
      profiles: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store user
    this.saveUser(user);
    
    // Create session
    this.createSession(user);

    return { success: true, user, message: 'Registration successful!' };
  }

  /**
   * Login with email and password
   */
  loginWithEmail(email, password) {
    const user = this.getUserByEmail(email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (!this.verifyPassword(password, user.passwordHash)) {
      return { success: false, error: 'Incorrect password' };
    }

    this.createSession(user);
    return { success: true, user, message: 'Login successful!' };
  }

  /**
   * GitHub OAuth Login
   * Stores user with GitHub ID
   */
  loginWithGitHub(githubUser) {
    let user = this.getUserByGithubId(githubUser.id);

    if (!user) {
      // Create new user from GitHub data
      const userId = 'user_github_' + githubUser.id;
      user = {
        userId,
        email: githubUser.email,
        name: githubUser.name || githubUser.login,
        authMethod: 'github',
        githubId: githubUser.id,
        githubUsername: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        subscription: {
          tier: 'free',
          features: [],
          maxProfiles: 1,
          createdAt: new Date().toISOString()
        },
        profiles: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.saveUser(user);
    }

    this.createSession(user);
    return { success: true, user, message: 'GitHub login successful!' };
  }

  /**
   * Create user session
   */
  createSession(user) {
    const session = {
      userId: user.userId,
      token: this.generateToken(),
      createdAt: Date.now(),
      expiresAt: Date.now() + AUTH_CONFIG.SESSION_TIMEOUT,
      userAgent: navigator.userAgent
    };

    sessionStorage.setItem(AUTH_CONFIG.STORAGE_KEY_SESSION, JSON.stringify(session));
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEY_USER, JSON.stringify(user));
    
    this.currentUser = user;
    this.dispatchAuthEvent('login', user);
  }

  /**
   * Logout current user
   */
  logout() {
    sessionStorage.removeItem(AUTH_CONFIG.STORAGE_KEY_SESSION);
    localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY_USER);
    this.currentUser = null;
    this.dispatchAuthEvent('logout');
    window.location.href = 'login.html';
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.currentUser !== null && this.isSessionValid();
  }

  /**
   * Check if user is premium
   */
  isPremium() {
    return this.currentUser && this.currentUser.subscription.tier === 'premium';
  }

  /**
   * Update user subscription
   */
  updateSubscription(tier, stripeId = null) {
    if (!this.currentUser) return false;

    this.currentUser.subscription = {
      ...this.currentUser.subscription,
      tier: tier,
      stripeId: stripeId,
      updatedAt: new Date().toISOString()
    };

    if (tier === 'premium') {
      this.currentUser.subscription.maxProfiles = 5;
      this.currentUser.subscription.features = [
        'file_uploads',
        'multiple_profiles',
        'sms_alerts',
        'email_alerts'
      ];
    } else {
      this.currentUser.subscription.maxProfiles = 1;
      this.currentUser.subscription.features = [];
    }

    this.saveUser(this.currentUser);
    return true;
  }

  /**
   * Update user profile information
   */
  updateUserProfile(updates) {
    if (!this.currentUser) return false;

    this.currentUser = {
      ...this.currentUser,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveUser(this.currentUser);
    return true;
  }

  /**
   * Add profile to user
   */
  addProfileToUser(profileId) {
    if (!this.currentUser) return false;

    if (!this.currentUser.profiles.includes(profileId)) {
      this.currentUser.profiles.push(profileId);
      this.saveUser(this.currentUser);
    }

    return true;
  }

  /**
   * Private Helper Methods
   */

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validatePassword(password) {
    return password && password.length >= 8;
  }

  hashPassword(password) {
    // Simple hash for demo (use bcryptjs in production)
    // In production: const bcrypt = require('bcryptjs');
    // return bcrypt.hashSync(password, 10);
    
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return 'hash_' + Math.abs(hash).toString(36);
  }

  verifyPassword(password, hash) {
    // Simple verification for demo
    // In production: return bcrypt.compareSync(password, hash);
    return this.hashPassword(password) === hash;
  }

  generateToken() {
    return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2);
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  userExists(email) {
    const users = JSON.parse(localStorage.getItem(AUTH_CONFIG.STORAGE_KEY_USERS) || '{}');
    return Object.values(users).some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem(AUTH_CONFIG.STORAGE_KEY_USERS) || '{}');
    return Object.values(users).find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserByGithubId(githubId) {
    const users = JSON.parse(localStorage.getItem(AUTH_CONFIG.STORAGE_KEY_USERS) || '{}');
    return Object.values(users).find(u => u.githubId === githubId);
  }

  saveUser(user) {
    const users = JSON.parse(localStorage.getItem(AUTH_CONFIG.STORAGE_KEY_USERS) || '{}');
    users[user.userId] = user;
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEY_USERS, JSON.stringify(users));
  }

  loadCurrentUser() {
    const userStr = localStorage.getItem(AUTH_CONFIG.STORAGE_KEY_USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  isSessionValid() {
    const sessionStr = sessionStorage.getItem(AUTH_CONFIG.STORAGE_KEY_SESSION);
    if (!sessionStr) return false;

    const session = JSON.parse(sessionStr);
    return session.expiresAt > Date.now();
  }

  validateSession() {
    if (!this.isSessionValid()) {
      this.currentUser = null;
      sessionStorage.removeItem(AUTH_CONFIG.STORAGE_KEY_SESSION);
    }
  }

  dispatchAuthEvent(eventName, user = null) {
    const event = new CustomEvent('auth:' + eventName, {
      detail: { user }
    });
    document.dispatchEvent(event);
  }

  /**
   * Get GitHub OAuth URL
   */
  getGitHubAuthURL() {
    const params = new URLSearchParams({
      client_id: AUTH_CONFIG.GITHUB_CLIENT_ID,
      redirect_uri: AUTH_CONFIG.GITHUB_REDIRECT_URI,
      scope: 'user:email',
      state: this.generateToken()
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  /**
   * Require authentication - redirect to login if not authenticated
   */
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
  }

  /**
   * Get user statistics
   */
  getUserStats() {
    if (!this.currentUser) return null;

    return {
      totalProfiles: this.currentUser.profiles.length,
      subscriptionTier: this.currentUser.subscription.tier,
      isPremium: this.isPremium(),
      maxProfiles: this.currentUser.subscription.maxProfiles,
      accountAge: this.getAccountAge(this.currentUser.createdAt),
      lastUpdated: this.currentUser.updatedAt
    };
  }

  getAccountAge(createdAt) {
    const created = new Date(createdAt);
    const today = new Date();
    const days = Math.floor((today - created) / (1000 * 60 * 60 * 24));
    return days;
  }

  /**
   * Update user profile with new data
   */
  updateUserProfile(updates) {
    if (!this.currentUser) return false;

    // Update current user
    Object.assign(this.currentUser, updates);
    this.currentUser.updatedAt = new Date().toISOString();

    // Save to localStorage
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEY_USER, JSON.stringify(this.currentUser));
    
    // Save to registered users
    this.saveUser(this.currentUser);

    return true;
  }

  /**
   * Verify password for password change
   */
  verifyPassword(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) return false;
    return this.hashPassword(password) === user.passwordHash;
  }

  /**
   * Get active sessions
   */
  getActiveSessions() {
    // Return current session only (simplified for demo)
    if (!this.isSessionValid()) return [];
    
    return [{
      id: 'session_current',
      device: 'Current Browser',
      createdAt: new Date(),
      lastActive: new Date()
    }];
  }
}

// Create global auth manager
const authManager = new AuthenticationManager();

// Listen for auth events
document.addEventListener('auth:login', (e) => {
  console.log('User logged in:', e.detail.user.email);
  updateUIAfterAuth();
});

document.addEventListener('auth:logout', () => {
  console.log('User logged out');
  updateUIAfterAuth();
});

// Update UI based on auth status
function updateUIAfterAuth() {
  const user = authManager.getCurrentUser();
  
  if (user) {
    // User is logged in
    console.log('Authenticated as:', user.email);
  } else {
    // User not logged in
    console.log('Not authenticated');
  }
}

// Auto-validate session on page load
window.addEventListener('load', () => {
  authManager.validateSession();
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AuthenticationManager, authManager, AUTH_CONFIG };
}
