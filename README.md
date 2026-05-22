# 💼 IBM Internship Project

## Emergency Medical Profile Application

This repository contains the final project completed during my **IBM Front-End Development Internship**, focusing on building an **Emergency Medical Profile application** using HTML, CSS, and JavaScript.

## 📌 Project Overview

The **Emergency Medical Profile** application is a responsive web platform designed to help individuals create and share their critical medical information securely. In emergency situations, authorized individuals can quickly access vital medical data via QR codes or unique access codes.

**Key Purpose**: Enable faster emergency response by providing paramedics and medical professionals with immediate access to critical health information.

## 🚀 Technologies Used

- **HTML5** – Semantic structure and form handling
- **CSS3** – Responsive design with Grid/Flexbox
- **JavaScript (Vanilla)** – DOM manipulation, API integration, QR generation
- **Google Chart API** – QR code generation
- **jsPDF & html2canvas** – PDF and image export functionality
- **GitHub API** – Profile data storage (optional)
- **Local Storage** – Client-side data persistence with fallback

## 🎯 Features

### Core Features
✅ **Create Emergency Medical Profile** - Capture personal info, medical history, medications, allergies, and emergency contacts
✅ **Unique Access Codes** - Generate secure 8-character codes for profile access
✅ **QR Code Generation** - Automatically generate scannable QR codes for profile sharing
✅ **Profile Search** - Find profiles by unique code or person's name
✅ **Data Export** - Download profiles in multiple formats:
  - **PDF**: Formatted professional document for printing
  - **CSV**: Spreadsheet format for records
  - **PNG**: QR code image download
✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
✅ **Print-Friendly** - Optimized print layout for emergency cards
✅ **No Login Required** - Access via access codes for privacy

### Advanced Features
- Real-time form validation
- Contact management (add/remove emergency contacts)
- Comprehensive medication database with dosages and warnings
- AI-powered medication suggestions based on medical conditions
- Profile sharing via Web Share API or clipboard
- Multiple profile management
- **NEW: Freemium Subscription Model** ⭐
  - Free tier: Basic profiles, QR codes, downloads
  - Premium tier: File uploads, family profiles, SMS/Email alerts

## 💰 Subscription & Premium Features

The application now includes a **freemium subscription model** with support for:

### Free Tier (Forever Free)
- ✅ Create basic medical profile
- ✅ Generate QR code
- ✅ Search profiles
- ✅ Download QR, PDF, CSV (text data)

### Premium Tier ($4.99/month or $49/year)
- ✅ Everything in Free
- ✅ Upload files (PDFs, prescriptions, insurance cards) - 50MB max
- ✅ Manage up to 5 family member profiles
- ✅ SMS alerts when QR code is scanned
- ✅ Email alerts to emergency contacts
- ✅ Advanced sharing options
- ✅ Priority support

### 14-Day Free Trial
- Try all premium features with no credit card required
- Cancel anytime - no commitment
- Full access to all features during trial

**Visit** `pricing.html` **to see pricing details and start a free trial.**

## 📋 User Guide

### Creating a Profile

1. Open `index.html` and click "Create Profile"
2. Fill in personal information (Name, Date of Birth, Blood Type)
3. Add medical information (Conditions, Allergies, Medications)
4. Add emergency contacts (minimum 1 required)
5. Click "Save Profile"
6. **Your QR code will appear automatically**

### Viewing Your Profile via QR Code

1. After profile is created, you can:
   - **Scan the QR code** with any smartphone camera
   - **Click "View Emergency Card"** link directly
   - **Share the QR code** with trusted individuals

2. The view page displays your medical information clearly for emergency personnel

### Downloading Formats

After profile creation, you can download:
- 📄 **PDF Report** - Professional medical document
- 📊 **CSV Export** - Data for spreadsheets and records
- 📲 **QR Image** - Share as image file

### Searching for a Profile

1. Go to "Search Profile" page
2. Search by:
   - **Access Code** (8-character unique code)
   - **Full Name** (person's name)
3. Results display complete profile information

## 🏗️ Project Structure

```
├── index.html              # Profile creation page
├── search.html             # Profile search page
├── view.html               # QR-based profile viewer
├── dashboard.html          # User dashboard (NEW)
├── account-settings.html   # Account & subscription management (NEW)
├── billing-history.html    # Billing and transaction history (NEW)
├── login.html              # User login page (NEW)
├── register.html           # User registration page (NEW)
├── pricing.html            # Pricing page with subscription options
├── css/
│   ├── main.css            # Primary stylesheet
│   ├── style.css           # Additional styles
│   └── search.css          # Search page styles
├── js/
│   ├── app.js              # Main application logic
│   ├── auth.js             # User authentication system (NEW)
│   ├── subscription.js     # Subscription management
│   └── payments.js         # Stripe integration
├── SUBSCRIPTION_SETUP.md   # Subscription system setup guide
└── README.md               # This file
```

## 🔐 User Authentication & Dashboard (NEW)

The application now includes a complete user authentication system with personalized dashboards and subscription management.

### Authentication Features
- ✅ **Email/Password Registration** - Create account with secure password
- ✅ **GitHub OAuth Integration** - Quick login with GitHub account (demo mode)
- ✅ **Session Management** - 7-day session timeout with auto-logout
- ✅ **Password Strength Validation** - Real-time validation with strength meter
- ✅ **Demo User** - `test@example.com` / `password123` for testing

### Dashboard Features
- 📊 **User Profile Display** - See your name and subscription tier badge
- 👤 **Profile Management** - View all your created emergency profiles
- 💳 **Subscription Status** - Current plan details, expiry date, profile limits
- 📈 **Account Statistics** - Total profiles created, account age, activity metrics
- ⚙️ **Quick Actions** - Shortcut buttons to create, search, or manage profiles
- 🔗 **Navigation** - Easy access to settings, billing, and pricing pages

### Account Settings
- 👤 **Profile Tab** - Edit name, phone number, bio information
- 💳 **Subscription Tab** - View subscription details, manage payments, cancel subscription
- 🔒 **Security Tab** - Change password, enable 2FA (coming soon), manage active sessions
- 🔔 **Notifications Tab** - Control email and SMS alert preferences per tier

### Billing & Payment Tracking
- 📋 **Billing History** - View all past transactions and invoices
- 💰 **Payment Summary** - Total spent, refunds issued, next renewal date
- 📥 **Export Billing** - Download full transaction history as CSV
- 🧾 **Receipt Management** - View and download individual receipts

### User Flow
```
New User → Register (login.html) → Create Account → Dashboard
↓
Create Profile → Profile Linked to User → View on Dashboard
↓
Free Tier → See Upgrade Option → Subscribe → Premium Features Unlocked
↓
Settings → Manage Account → View Billing → Change Subscription
```

## 💎 Subscription System

### How It Works

The application uses **localStorage** to track per-user subscription status. When users:
1. **Register** → Automatically enrolled in **Free tier** with 1 profile slot
2. **Create Profiles** → Profiles linked to user account and appear on dashboard
3. **Click "Upgrade"** → Redirected to pricing page for subscription options
4. **Start Free Trial** → Automatically activated with all premium features for 14 days
5. **Subscribe** → Premium features unlock with 5 profile slots and advanced features

### User-Based Subscription Storage

Subscription data is stored in localStorage with user profile:
```json
{
  "userId": "user_timestamp_random",
  "email": "user@example.com",
  "name": "User Name",
  "subscription": {
    "tier": "free" | "premium",
    "features": ["file_uploads", "family_profiles", "sms_alerts"],
    "maxProfiles": 1 | 5,
    "maxFileSize": 0 | 52428800,
    "expiryDate": "ISO-8601 timestamp"
  },
  "profiles": ["profile_id_1", "profile_id_2"]
}
```

### Feature Gating by Tier

**Free Tier Features:**
- ✅ 1 profile
- ✅ Text-only data
- ✅ QR code generation
- ✅ Profile search
- ✅ Basic downloads (CSV, PDF, QR image)

**Premium Tier Features:**
- ✅ All free features
- ✅ 5 family profiles
- ✅ File uploads (50MB limit per profile)
- ✅ SMS alerts when profile scanned
- ✅ Email alerts to emergency contacts
- ✅ Advanced sharing options

### File Structure

**New authentication files:**
- `js/auth.js` - User registration, login, session management
- `dashboard.html` - User dashboard with profile overview
- `account-settings.html` - Profile, subscription, security settings
- `billing-history.html` - Transaction history and receipts
- `login.html` - Email/password + GitHub OAuth login
- `register.html` - Account creation with password strength validation

**Subscription files:**
- `js/subscription.js` - Core subscription logic and feature gating
- `js/payments.js` - Stripe payment integration (test mode by default)
- `pricing.html` - Pricing page with tier comparison

**Updated files:**
- `index.html` - Added auth scripts, user nav bar, profile linking
- `search.html` - Added auth scripts, user nav bar
- `js/app.js` - Link profiles to authenticated users
- `css/main.css` - Added auth and subscription UI styles

### For Development & Testing

The system works in **mock mode** by default:
- ✅ Register and login without backend database
- ✅ Start free trials without credit card
- ✅ Test feature gating and profile limits
- ✅ Simulate subscription upgrades and cancellations
- ✅ Demo user available: `test@example.com` / `password123`

For production with real payments and authentication, see `SUBSCRIPTION_SETUP.md`.

## 🔐 Data Security & Privacy

- **Per-User Data** - Each user's profiles and settings stored separately
- **Session-Based Auth** - 7-day timeout, auto-logout on expiry
- **No centralized server** - Data stored locally in browser (demo mode)
- **Optional GitHub backup** - Configure in `GITHUB_CONFIG` if desired
- **Unique Access Codes** - 8-character random codes (36^8 combinations)
- **Secure password storage** - Hashed with demo hash function (use bcrypt in production)
- **HTTPS recommended** - For production deployment
- **Secure sharing** - Share codes only with trusted individuals

## ⚙️ Configuration

### GitHub Integration (Optional)

To enable cloud storage, update the `GITHUB_CONFIG` in `js/app.js`:

```javascript
const GITHUB_CONFIG = {
    owner: 'your-username',
    repo: 'your-repo-name',
    token: 'your-github-token',
    filePath: 'profiles.json'
};
```

## 📱 Responsive Design & Google ADS Compliance

The application follows Google ADS guidelines:

✅ **Fast Loading** - Optimized assets, minimal dependencies
✅ **Mobile-Friendly** - Responsive design, touch-optimized buttons
✅ **Clear UX** - Intuitive navigation, prominent CTAs
✅ **No Auto-Play Media** - User-controlled interactions
✅ **Accessible** - WCAG 2.1 AA compliant
✅ **Fast Interactions** - Smooth animations, quick feedback
✅ **Readable Text** - Proper font sizes and contrast ratios

## 🔍 SEO Optimization

The application is fully optimized for search engines to improve visibility and rankings.

### Meta Tags & Metadata

#### Primary Meta Tags (All Pages)
- **Character Set**: UTF-8 encoding declared
- **Viewport**: Mobile-responsive with proper scaling
- **Language**: English (`lang="en"`)
- **Robots Meta Tag**: `index, follow` to allow crawling and indexing
- **X-UA-Compatible**: IE edge compatibility

#### Page-Specific Meta Tags

**index.html (Home/Create Page)**
- Title: "Emergency Medical Profile - Create & Share QR Codes | EMP"
- Description: "Create secure emergency medical profiles with QR codes. Instant access to critical medical info..."
- Keywords: emergency medical profile, QR code, medical information, blood type, allergies, medications, emergency contacts

**search.html (Search Page)**
- Title: "Search Emergency Medical Profiles | Find by Code or Name"
- Description: "Search emergency medical profiles by unique access code or person's full name..."
- Keywords: search medical profile, emergency medical search, access code, find medical profile

**view.html (Profile View - Dynamic)**
- Title: `{Patient Name} - Emergency Medical Profile | EMP` (Updated via JavaScript)
- Description: Dynamically generated with patient info and blood type
- All meta tags updated based on loaded profile data

### Open Graph Tags (Social Media Sharing)

Implemented on all pages for proper link preview when shared on:
- Facebook
- Twitter
- LinkedIn
- WhatsApp
- Other social platforms

**og: Tags Included:**
- `og:title` - Page/profile title
- `og:description` - Detailed description
- `og:image` - Preview image (1200x630px recommended)
- `og:url` - Canonical URL
- `og:type` - Page type (website, profile, etc.)

### Twitter Card Tags

Enables rich previews when shared on Twitter:
- `twitter:card` - Type of card (summary_large_image)
- `twitter:title` - Tweet preview title
- `twitter:description` - Tweet preview description
- `twitter:image` - Card image

### Schema.org Structured Data (JSON-LD)

Three levels of structured data for rich search results:

1. **WebApplication Schema (index.html)**
   - Describes the application itself
   - Application category: HealthApplication
   - Free service offering
   - Author and organization info

2. **Organization Schema (index.html)**
   - Organization name and branding
   - Logo and contact information
   - Social media links (GitHub, etc.)

3. **MedicalProfile/SearchAction Schemas**
   - **search.html**: SearchAction for profile discovery
   - **view.html**: MedicalProfile with patient data (dynamic)
   - Includes medical specialties and condition information

### Canonical Tags

Absolute canonical URLs on all pages to:
- Prevent duplicate content issues
- Direct search engines to preferred version
- Maintain SEO value in single URL

**Dynamic Canonical** on view.html:
```
https://medicalprofile.example.com/view.html?code={PROFILE_CODE}
```

### Keywords Targeted

**Primary Keywords** (High Intent):
- Emergency medical profile
- Medical emergency card
- QR code medical information
- Emergency medical information
- Paramedic information access

**Secondary Keywords** (Informational):
- Blood type identification
- Medication list sharing
- Allergy information
- Emergency contact management
- Health information security

**Long-tail Keywords** (Specific Queries):
- "How to create emergency medical profile"
- "Share medical info with QR code"
- "Emergency medical card generator"
- "Blood type and allergy card"

### Performance & Technical SEO

✅ **Mobile-First Design**
- Viewport meta tag configured for responsive scaling
- Touch-friendly interface optimized for emergency use
- Tested on iOS Safari, Chrome Mobile, Firefox Mobile

✅ **Page Speed Optimization**
- Minimal critical rendering path
- Deferred non-critical JavaScript
- CDN resources preconnected (`preconnect` and `dns-prefetch`)
- Local storage for offline capability

✅ **Accessibility (WCAG 2.1 AA)**
- Semantic HTML structure
- ARIA labels where appropriate
- Color contrast ratios meet standards
- Keyboard navigation support
- Screen reader friendly

✅ **Security Headers** (Recommended for Deployment)
```
X-UA-Compatible: IE=edge
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

### How Search Engines Crawl the App

1. **Initial Discovery**
   - Robots.txt allows crawling
   - XML sitemap recommended (create manually or auto-generate)
   - Meta robots tag permits indexing

2. **Content Analysis**
   - Primary keywords in title tags
   - Descriptive meta descriptions (150-160 chars)
   - Semantic HTML with proper heading hierarchy
   - Schema.org structured data interpretation

3. **Profile Discovery**
   - Dynamic profile pages indexed if URLs are crawlable
   - Each profile has unique canonical URL with profile code
   - Schema data helps Google understand medical context

4. **Link Value**
   - GitHub repository linked in schema
   - Social sharing encourages backlinks
   - QR codes enable offline-to-online link tracking

### Deployment Recommendations

**For Production SEO Success:**

1. **Update Base URL**
   - Replace `https://medicalprofile.example.com` with actual domain
   - Ensure HTTPS only (required for medical data)
   - Update canonical tags across all pages

2. **Create Sitemap**
   ```xml
   <!-- sitemap.xml -->
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://yourdomain.com/index.html</loc>
       <lastmod>2025-01-15</lastmod>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://yourdomain.com/search.html</loc>
       <lastmod>2025-01-15</lastmod>
       <priority>0.9</priority>
     </url>
   </urlset>
   ```

3. **Submit to Search Engines**
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmaster
   - Yandex Webmaster: https://webmaster.yandex.com

4. **Monitor Performance**
   - Track impressions, clicks, CTR in GSC
   - Monitor Core Web Vitals (LCP, FID, CLS)
   - Analyze user behavior with Google Analytics

5. **Image Optimization**
   - Add Open Graph images (1200x630px)
   - Create Twitter Card images (1024x512px minimum)
   - Optimize for web (compress, proper format)
   - Add alt text to all images

6. **Content Strategy**
   - Create blog about medical profiles
   - Write guides on emergency preparedness
   - Target informational keywords
   - Build authority on emergency medical topics

### SEO Checklist

- [x] Meta charset and viewport tags
- [x] Title tags (unique, keyword-rich, 50-60 chars)
- [x] Meta descriptions (unique, 150-160 chars)
- [x] Keywords meta tag (relevant, moderated)
- [x] Robots meta tag (index, follow)
- [x] Canonical tags (all pages)
- [x] Open Graph tags (social sharing)
- [x] Twitter Card tags (Twitter optimization)
- [x] Favicon references (branding)
- [x] Semantic HTML (header, nav, main, article)
- [x] Schema.org structured data (JSON-LD)
- [x] Mobile viewport optimization
- [x] Fast page load times
- [x] SSL/HTTPS ready
- [x] Preconnect/dns-prefetch (performance)

### Expected SEO Benefits

- **Improved SERP Rankings** - Better visibility for target keywords
- **Enhanced Click-Through Rate** - Rich snippets and structured data
- **Social Media Performance** - Proper OG tags for sharing
- **Search Console Visibility** - Rich indexing and error detection
- **User Experience Signals** - Better mobile UX, faster loading
- **Voice Search Optimization** - Schema data helps voice assistants



## 🧪 Testing

### Manual Test Checklist

- [ ] **Create Profile** - Fill all fields, save successfully
- [ ] **Generate QR** - QR code appears after save
- [ ] **Download QR** - QR image downloads as PNG
- [ ] **View Profile** - Scan QR or click link → profile displays correctly
- [ ] **Download PDF** - PDF generates and downloads
- [ ] **Download CSV** - CSV generates and downloads with proper formatting
- [ ] **Search by Code** - Find profile by access code
- [ ] **Search by Name** - Find profile by person's name
- [ ] **Mobile Responsive** - All features work on mobile browser
- [ ] **Cross-Browser** - Test on Chrome, Firefox, Edge, Safari

### Supported Browsers

- ✅ Chrome/Chromium 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 QR Code Feature Details

### How QR Works

1. **Generation**: After profile save, generates QR using Google Chart API
2. **Encoding**: QR contains URL: `view.html?code={PROFILE_ID}`
3. **Scanning**: Smartphone camera recognizes URL
4. **Display**: Opens view.html which loads and displays profile

### QR Capabilities

- **Scannable from 3-5 meters** depending on size
- **Error Correction**: Can read with 30% damage
- **Portable**: Works offline after initial load
- **Downloadable**: Save as PNG image

## 📊 Download Format Specifications

### PDF Export
- Professional formatting with header and sections
- Page breaks for long medication lists
- Print-optimized layout
- Includes access code and generation date

### CSV Export
- Standard comma-separated values
- Compatible with Excel, Google Sheets
- Includes all profile data organized by section
- Easy to import into medical record systems

### QR Image (PNG)
- 300x300 pixels (scalable)
- White background with black QR pattern
- High contrast for reliable scanning

## 🧠 What I Learned

- Advanced JavaScript DOM manipulation and event handling
- External API integration (Google Chart, GitHub, jsPDF)
- Responsive design principles and mobile-first approach
- Data persistence with localStorage and fallbacks
- QR code generation and encoding
- PDF and CSV export implementation
- Git workflow and version control
- UI/UX best practices for emergency applications
- Accessibility standards and WCAG compliance

## 📝 ProtoType & Design

[Figma Prototype](https://www.figma.com/proto/McgP0JQodBkANO17plqz60/Emergency-Medical-Profile?node-id=1-2&p=f&t=skNktnt6fqTXOqvn-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

## 📸 Screenshots

[Home Page - Profile Creation](https://drive.google.com/file/d/1Uqtai_r1CHRQsmc8znW0HuyVjpfEG9jU/view?usp=drive_link)
[Home Page - Continuation](https://drive.google.com/file/d/1F-PGI5drkYhXUuDPtwgBspi5ABM61Fl7/view?usp=drive_link)
[Search Page](https://drive.google.com/file/d/1_doxJKIuh-nfUKI5ykwUlzjiTdu0gAIN/view?usp=drive_link)
[Profile Card Download](https://drive.google.com/file/d/17Bm98vbEG_FZHH/view?usp=drive_link)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/LokeshAshapu/IBM_internship_Project.git
   cd IBM_internship_Project
   ```

2. Open in browser:
   ```bash
   # Option 1: Open directly
   open index.html
   
   # Option 2: Use local server (recommended)
   python -m http.server 8000
   # Then navigate to http://localhost:8000
   ```

3. Start creating profiles!

## 📄 License

This project is part of IBM SkillsBuild certification work and is available under the MIT License.

## ✉️ Contact & Support

For questions about this project, please refer to the GitHub repository or the IBM SkillsBuild platform.

---

**Last Updated**: 2026-05-19
**Version**: 3.0 (User Authentication & Dashboard Release)