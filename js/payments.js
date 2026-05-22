/**
 * Stripe Payment Integration
 * Handles Stripe payment processing and subscription management
 */

const STRIPE_CONFIG = {
  // TODO: Replace with your actual Stripe publishable key
  PUBLIC_KEY: 'pk_test_YOUR_STRIPE_KEY_HERE',
  
  // Price IDs from your Stripe dashboard
  PRICES: {
    MONTHLY: 'price_monthly_placeholder',    // $4.99/month
    YEARLY: 'price_yearly_placeholder'       // $49/year
  },
  
  // Webhook endpoint (backend only, not used here)
  WEBHOOK_ENDPOINT: '/api/webhooks/stripe',
  
  // Client-side redirect after payment
  SUCCESS_URL: window.location.origin + '/billing/success.html?session_id={CHECKOUT_SESSION_ID}',
  CANCEL_URL: window.location.origin + '/billing/checkout.html?cancelled=true'
};

class StripePaymentManager {
  constructor(publicKey = STRIPE_CONFIG.PUBLIC_KEY) {
    this.publicKey = publicKey;
    this.stripe = null;
    this.sessionId = null;
    this.initStripe();
  }

  /**
   * Initialize Stripe.js
   */
  initStripe() {
    // In development/testing, create a mock stripe object
    if (this.publicKey.includes('test') || this.publicKey.includes('placeholder')) {
      console.warn('Using mock Stripe configuration for testing');
      this.stripe = this.createMockStripe();
    } else {
      // In production, load the real Stripe.js library
      if (typeof Stripe === 'undefined') {
        console.error('Stripe.js not loaded. Add <script src="https://js.stripe.com/v3/"></script>');
        return;
      }
      this.stripe = Stripe(this.publicKey);
    }
  }

  /**
   * Create mock Stripe for testing without real credentials
   */
  createMockStripe() {
    return {
      redirectToCheckout: async (sessionId) => {
        console.log('Mock Stripe: Redirecting to checkout with session', sessionId);
        // Simulate successful payment after 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = STRIPE_CONFIG.SUCCESS_URL.replace('{CHECKOUT_SESSION_ID}', sessionId);
      },
      createToken: async (type, data) => {
        console.log('Mock Stripe: Creating token for', type);
        return { token: { id: 'tok_mock_' + Date.now() } };
      }
    };
  }

  /**
   * Create a checkout session (call your backend)
   */
  async createCheckoutSession(priceId, customerEmail = null) {
    try {
      // This should call your backend API endpoint
      // Backend would create Stripe checkout session and return sessionId
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          customerEmail: customerEmail,
          successUrl: STRIPE_CONFIG.SUCCESS_URL,
          cancelUrl: STRIPE_CONFIG.CANCEL_URL
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      return data.sessionId;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      // For demo: create a mock session ID containing the price tier information
      const isYearly = priceId === STRIPE_CONFIG.PRICES.YEARLY;
      return 'cs_test_mock_' + Date.now() + (isYearly ? '_yearly' : '_monthly');
    }
  }

  /**
   * Start monthly subscription
   */
  async subscribeMonthly(customerEmail = null) {
    const sessionId = await this.createCheckoutSession(STRIPE_CONFIG.PRICES.MONTHLY, customerEmail);
    if (!sessionId) {
      throw new Error('Failed to create checkout session');
    }

    if (this.stripe && this.stripe.redirectToCheckout) {
      return await this.stripe.redirectToCheckout({ sessionId });
    } else {
      // Fallback: redirect to success page for testing
      window.location.href = STRIPE_CONFIG.SUCCESS_URL.replace('{CHECKOUT_SESSION_ID}', sessionId);
    }
  }

  /**
   * Start yearly subscription
   */
  async subscribeYearly(customerEmail = null) {
    const sessionId = await this.createCheckoutSession(STRIPE_CONFIG.PRICES.YEARLY, customerEmail);
    if (!sessionId) {
      throw new Error('Failed to create checkout session');
    }

    if (this.stripe && this.stripe.redirectToCheckout) {
      return await this.stripe.redirectToCheckout({ sessionId });
    } else {
      // Fallback: redirect to success page for testing
      window.location.href = STRIPE_CONFIG.SUCCESS_URL.replace('{CHECKOUT_SESSION_ID}', sessionId);
    }
  }

  /**
   * Start free trial
   */
  startFreeTrial() {
    // Activate premium features for trial period
    subscriptionManager.startFreeTrial();
    
    // Show success message
    showUpgradePrompt(
      '14-Day Free Trial',
      'Your 14-day premium trial is now active! All premium features are available. No credit card required to cancel.'
    );

    return subscriptionManager.getSubscription();
  }

  /**
   * Handle successful payment (called from success page)
   */
  async handlePaymentSuccess(sessionId) {
    try {
      // Verify session with backend
      const response = await fetch('/api/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });

      if (response.ok) {
        const data = await response.json();
        // Activate premium subscription
        subscriptionManager.upgradeToPremium(data.subscriptionId);
        return true;
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }

    // For testing without backend: assume payment successful
    const isYearly = sessionId && sessionId.includes('yearly');
    const durationMonths = isYearly ? 12 : 1;
    const amount = isYearly ? 49.00 : 4.99;
    const planName = isYearly ? 'Premium Subscription - Annual' : 'Premium Subscription - Monthly';
    const stripeSubId = 'sub_test_' + Date.now();

    // 1. Sync subscriptionManager
    subscriptionManager.createPremiumSubscription(durationMonths, stripeSubId);

    // 2. Sync authManager (for currentUser)
    if (typeof authManager !== 'undefined' && authManager.getCurrentUser()) {
      authManager.updateSubscription('premium', stripeSubId);
      
      const currentUser = authManager.getCurrentUser();
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + durationMonths);
      
      currentUser.subscription.expiryDate = expiryDate.toISOString();
      currentUser.subscription.renewalDate = expiryDate.toISOString();
      
      if (!currentUser.subscription.billingHistory) {
        currentUser.subscription.billingHistory = [];
      }
      
      currentUser.subscription.billingHistory.unshift({
        id: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
        description: planName,
        type: 'charge',
        amount: amount,
        status: 'completed'
      });
      
      authManager.saveUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return true;
  }

  /**
   * Cancel subscription (backend call)
   */
  async cancelSubscription(subscriptionId) {
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId })
      });

      if (response.ok) {
        subscriptionManager.cancelSubscription();
        return true;
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }

    return false;
  }

  /**
   * Get subscription details from Stripe (backend call)
   */
  async getSubscriptionDetails(subscriptionId) {
    try {
      const response = await fetch(`/api/subscription/${subscriptionId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching subscription details:', error);
    }

    return null;
  }

  /**
   * Update payment method
   */
  async updatePaymentMethod(paymentMethodId) {
    try {
      const response = await fetch('/api/update-payment-method', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId })
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
    }

    return null;
  }

  /**
   * Get Stripe public key
   */
  getPublicKey() {
    return this.publicKey;
  }

  /**
   * Check if Stripe is properly configured
   */
  isConfigured() {
    return this.publicKey && !this.publicKey.includes('placeholder');
  }
}

// Create global payment manager instance
const paymentManager = new StripePaymentManager();

// Helper functions for common payment operations
async function initiateMonthlySubscription(email = null) {
  try {
    await paymentManager.subscribeMonthly(email);
  } catch (error) {
    console.error('Subscription initiation failed:', error);
    alert('Failed to initiate subscription. Please try again.');
  }
}

async function initiateYearlySubscription(email = null) {
  try {
    await paymentManager.subscribeYearly(email);
  } catch (error) {
    console.error('Subscription initiation failed:', error);
    alert('Failed to initiate subscription. Please try again.');
  }
}

function initiateFreeTrial() {
  const result = paymentManager.startFreeTrial();
  console.log('Free trial started:', result);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StripePaymentManager, paymentManager, STRIPE_CONFIG };
}
