/**
 * Subscription Management System
 * Handles user subscription tiers, feature gating, and premium access
 */

const SUBSCRIPTION_CONFIG = {
  FREE_TIER: 'free',
  PREMIUM_TIER: 'premium',
  FREE_FEATURES: [
    'basic_profile',
    'qr_code',
    'profile_search',
    'text_data_only',
    'download_qr',
    'download_pdf_text',
    'download_csv'
  ],
  PREMIUM_FEATURES: [
    'file_uploads',
    'multiple_profiles',
    'sms_alerts',
    'email_alerts',
    'advanced_sharing',
    'priority_support'
  ],
  STORAGE_KEY: 'userSubscription',
  TRIAL_DAYS: 14
};

class SubscriptionManager {
  constructor() {
    this.subscription = this.loadSubscription();
  }

  /**
   * Load subscription from localStorage
   */
  loadSubscription() {
    const stored = localStorage.getItem(SUBSCRIPTION_CONFIG.STORAGE_KEY);
    if (stored) {
      const subscription = JSON.parse(stored);
      // Check if subscription expired
      if (subscription.tier === SUBSCRIPTION_CONFIG.PREMIUM_TIER && subscription.expiryDate) {
        if (new Date(subscription.expiryDate) < new Date()) {
          // Subscription expired, revert to free
          return this.createFreeSubscription();
        }
      }
      return subscription;
    }
    return this.createFreeSubscription();
  }

  /**
   * Create a new free subscription
   */
  createFreeSubscription() {
    return {
      tier: SUBSCRIPTION_CONFIG.FREE_TIER,
      createdDate: new Date().toISOString(),
      features: SUBSCRIPTION_CONFIG.FREE_FEATURES,
      maxProfiles: 1,
      maxFileSize: 0
    };
  }

  /**
   * Create a premium subscription
   * @param {number} durationMonths - Duration of subscription in months
   * @param {string} stripeSubscriptionId - Stripe subscription ID for server verification
   */
  createPremiumSubscription(durationMonths = 1, stripeSubscriptionId = null) {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths);

    const subscription = {
      tier: SUBSCRIPTION_CONFIG.PREMIUM_TIER,
      createdDate: new Date().toISOString(),
      expiryDate: expiryDate.toISOString(),
      features: [...SUBSCRIPTION_CONFIG.FREE_FEATURES, ...SUBSCRIPTION_CONFIG.PREMIUM_FEATURES],
      maxProfiles: 5,
      maxFileSize: 50 * 1024 * 1024, // 50MB
      stripeSubscriptionId: stripeSubscriptionId || null,
      renewalDate: expiryDate.toISOString()
    };

    this.saveSubscription(subscription);
    return subscription;
  }

  /**
   * Save subscription to localStorage
   */
  saveSubscription(subscription) {
    localStorage.setItem(SUBSCRIPTION_CONFIG.STORAGE_KEY, JSON.stringify(subscription));
    this.subscription = subscription;
  }

  /**
   * Get current subscription tier
   */
  getTier() {
    return this.subscription.tier;
  }

  /**
   * Check if user has a specific feature
   */
  hasFeature(featureName) {
    return this.subscription.features && this.subscription.features.includes(featureName);
  }

  /**
   * Check if user is premium
   */
  isPremium() {
    return this.getTier() === SUBSCRIPTION_CONFIG.PREMIUM_TIER;
  }

  /**
   * Get subscription details
   */
  getSubscription() {
    return { ...this.subscription };
  }

  /**
   * Get days remaining on premium subscription
   */
  getDaysRemaining() {
    if (!this.isPremium() || !this.subscription.expiryDate) {
      return 0;
    }
    const expiry = new Date(this.subscription.expiryDate);
    const today = new Date();
    const daysRemaining = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysRemaining);
  }

  /**
   * Start free trial
   */
  startFreeTrial() {
    const subscription = this.createPremiumSubscription(SUBSCRIPTION_CONFIG.TRIAL_DAYS / 30, null);
    subscription.isTrialPeriod = true;
    this.saveSubscription(subscription);
    return subscription;
  }

  /**
   * Check if user is in trial period
   */
  isInTrialPeriod() {
    return this.subscription.isTrialPeriod === true;
  }

  /**
   * Upgrade to premium
   */
  upgradeToPremium(stripeSubscriptionId) {
    return this.createPremiumSubscription(1, stripeSubscriptionId);
  }

  /**
   * Cancel premium subscription (revert to free)
   */
  cancelSubscription() {
    const freeSubscription = this.createFreeSubscription();
    this.saveSubscription(freeSubscription);
    return freeSubscription;
  }

  /**
   * Get maximum number of profiles allowed
   */
  getMaxProfiles() {
    return this.subscription.maxProfiles || 1;
  }

  /**
   * Get maximum file size in bytes
   */
  getMaxFileSize() {
    return this.subscription.maxFileSize || 0;
  }

  /**
   * Format subscription expiry date
   */
  getFormattedExpiryDate() {
    if (!this.subscription.expiryDate) {
      return 'Never';
    }
    const date = new Date(this.subscription.expiryDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

// Create global subscription manager instance
const subscriptionManager = new SubscriptionManager();

// Feature gating helper functions
function requiresPremium(featureName) {
  return SUBSCRIPTION_CONFIG.PREMIUM_FEATURES.includes(featureName);
}

function isFeatureAvailable(featureName) {
  return subscriptionManager.hasFeature(featureName);
}

function checkFeatureAccess(featureName) {
  if (!isFeatureAvailable(featureName)) {
    return {
      hasAccess: false,
      requiresUpgrade: requiresPremium(featureName),
      message: `This feature requires a Premium subscription. Please upgrade to access ${featureName}.`
    };
  }
  return { hasAccess: true };
}

// UI Helper: Show upgrade prompt modal
function showUpgradePrompt(featureName, message = null) {
  const defaultMessage = `Unlock ${featureName} with Premium`;
  const modal = document.createElement('div');
  modal.className = 'upgrade-modal-overlay';
  modal.innerHTML = `
    <div class="upgrade-modal">
      <button class="modal-close" onclick="this.closest('.upgrade-modal-overlay').remove()">×</button>
      <div class="modal-content">
        <h2>🔒 Premium Feature</h2>
        <p>${message || defaultMessage}</p>
        <div class="modal-actions">
          <button class="btn btn-primary" onclick="window.location.href='pricing.html'">
            Upgrade Now
          </button>
          <button class="btn btn-secondary" onclick="this.closest('.upgrade-modal-overlay').remove()">
            Remind Later
          </button>
        </div>
        <p class="modal-hint">Enjoy a 14-day free trial to test all premium features!</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// UI Helper: Add premium badge to element
function addPremiumBadge(element) {
  const badge = document.createElement('span');
  badge.className = 'premium-badge';
  badge.textContent = '⭐ Premium';
  badge.title = 'This feature is available in Premium';
  element.appendChild(badge);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SubscriptionManager, subscriptionManager, SUBSCRIPTION_CONFIG };
}
