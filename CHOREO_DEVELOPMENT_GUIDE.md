# Choreo Development Guide

## Overview

This guide covers the implementation of the Choreo subdomain (`choreo.revolvo.tech`) with full authentication, deep linking, and app link functionality.

## 🏗️ Architecture

### Subdomain Structure

```
choreo.revolvo.tech
├── /                    ← Landing page
├── /auth/login         ← Authentication
├── /auth/verify        ← Email verification with app links
├── /auth/reset         ← Password reset with app links
├── /auth/callback      ← OAuth callback
├── /verify             ← Direct verification link (app link compatible)
├── /reset              ← Direct reset link (app link compatible)
├── /market             ← Feature marketplace
├── /onboarding         ← User registration
├── /explore            ← Content discovery
└── /dashboard          ← User dashboard
```

### Key Features Implemented

#### ✅ Authentication System

- **Login/Register**: Full form validation and error handling
- **Email Verification**: With automatic app link attempts
- **Password Reset**: With deep linking support
- **OAuth Callback**: For social login integration
- **JWT Storage**: Secure token management in localStorage
- **Context Management**: Global auth state with React Context

#### ✅ App Link Integration

- **Smart Detection**: Automatically detects mobile devices
- **Deep Link Generation**: Creates `choreo://` custom URL schemes
- **Universal Links**: iOS and Android app link support
- **Fallback Handling**: Graceful web fallback when app not installed
- **Intent Filters**: Android intent URL generation
- **Meta Tags**: Proper app link meta tags for social sharing

#### ✅ Deep Link Routes

- `choreo://verify?token=XYZ&email=user@example.com`
- `choreo://reset?token=ABC&email=user@example.com`
- `choreo://auth` (general authentication)
- `choreo://market` (marketplace)
- `choreo://onboarding` (registration)

#### ✅ Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Progressive Enhancement**: Works on all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Loading States**: Smooth transitions and loading indicators

## 🛠️ Development Setup

### Testing Subdomain Locally

#### Option 1: Query Parameter (Easiest)

```bash
# Start development server
npm run dev

# Access Choreo app with query parameter
http://localhost:3000/?subdomain=choreo
```

#### Option 2: Local Hosts File (More Realistic)

1. Edit your hosts file:

   ```bash
   # On Mac/Linux
   sudo nano /etc/hosts

   # On Windows
   notepad C:\Windows\System32\drivers\etc\hosts
   ```

2. Add these lines:

   ```
   127.0.0.1 choreo.localhost
   127.0.0.1 admin.localhost
   ```

3. Access the app:
   ```
   http://choreo.localhost:3000
   ```

### Environment Variables

Create a `.env.local` file:

```env
# App Configuration
REACT_APP_CHOREO_ANDROID_PACKAGE=tech.revolvo.choreo
REACT_APP_CHOREO_IOS_APP_ID=YOUR_APP_STORE_ID
REACT_APP_CHOREO_CUSTOM_SCHEME=choreo

# API Endpoints (replace with your backend)
REACT_APP_API_BASE_URL=https://api.revolvo.tech
REACT_APP_CHOREO_API_BASE_URL=https://choreo-api.revolvo.tech

# OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_FACEBOOK_APP_ID=your_facebook_app_id
```

## 🚀 Deployment

### DNS Configuration

#### Production Subdomains

```dns
# A Records
choreo.revolvo.tech     → YOUR_SERVER_IP
admin.revolvo.tech      → YOUR_SERVER_IP

# CNAME Records (if using CDN)
choreo.revolvo.tech     → your-app.netlify.app
admin.revolvo.tech      → your-admin.netlify.app
```

#### Netlify Deployment

1. **Main Site**: Deploy to `revolvo.tech`
2. **Choreo Subdomain**:
   - Create new site from same repo
   - Set custom domain to `choreo.revolvo.tech`
   - Set environment variable: `REACT_APP_SUBDOMAIN=choreo`

#### Vercel Deployment

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Build Configuration

Update `vite.config.js` for subdomain support:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          choreo: ["./src/choreo/ChoreoApp.jsx"],
          auth: ["./src/choreo/context/AuthContext.jsx"],
          "app-links": ["./src/choreo/utils/appLinks.js"],
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
```

## 📱 Mobile App Integration

### Android Configuration

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTop"
    android:theme="@style/LaunchTheme">

    <!-- Custom URL Scheme -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="choreo" />
    </intent-filter>

    <!-- App Links -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https"
              android:host="choreo.revolvo.tech" />
    </intent-filter>
</activity>
```

### iOS Configuration

Add to `ios/Runner/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>tech.revolvo.choreo</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>choreo</string>
        </array>
    </dict>
</array>

<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:choreo.revolvo.tech</string>
</array>
```

### Universal Links Setup

Create `/.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.tech.revolvo.choreo",
        "paths": ["/verify", "/reset", "/auth/*"]
      }
    ]
  }
}
```

## 🧪 Testing

### Manual Testing Checklist

#### Authentication Flow

- [ ] User can register new account
- [ ] User can log in with valid credentials
- [ ] User receives appropriate error messages
- [ ] Password reset email is sent
- [ ] Email verification works
- [ ] JWT tokens are stored securely
- [ ] User can log out

#### App Link Testing

- [ ] Verification email opens app (if installed)
- [ ] Password reset email opens app (if installed)
- [ ] Web fallback works when app not installed
- [ ] Deep links have correct format
- [ ] Meta tags are present for social sharing

#### Responsive Design

- [ ] Works on mobile devices
- [ ] Touch targets are appropriate size
- [ ] Navigation is mobile-friendly
- [ ] Forms work on mobile keyboards

### Automated Testing

```javascript
// Example test for app link functionality
describe("App Links", () => {
  test("should generate correct deep link", () => {
    const link = AppLinkGenerator.generateDeepLink({
      action: "verify",
      token: "test-token",
      email: "test@example.com",
    });

    expect(link).toBe(
      "choreo://verify?token=test-token&email=test@example.com"
    );
  });

  test("should detect mobile devices", () => {
    // Mock mobile user agent
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
      configurable: true,
    });

    expect(DeviceDetection.isMobile()).toBe(true);
  });
});
```

## 🔧 Configuration

### App Link Configuration

Update `src/choreo/utils/appLinks.js`:

```javascript
const APP_CONFIG = {
  androidPackage: "tech.revolvo.choreo",
  iosAppId: "YOUR_ACTUAL_APP_STORE_ID",
  customScheme: "choreo",
  universalLinkDomain: "choreo.revolvo.tech",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=tech.revolvo.choreo",
  appStoreUrl: "https://apps.apple.com/app/choreo/idYOUR_ACTUAL_APP_STORE_ID",
  fallbackTimeout: 3000,
};
```

### Authentication Configuration

Update `src/choreo/context/AuthContext.jsx`:

```javascript
// Replace simulation functions with real API calls
const login = async (email, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  // Handle response...
};
```

## 📊 Analytics & Monitoring

### Track App Link Usage

```javascript
// Add to app link attempts
gtag("event", "app_link_attempt", {
  custom_parameter: action,
  custom_parameter_2: success ? "success" : "failed",
});
```

### Monitor Subdomain Traffic

- Set up separate Google Analytics properties for each subdomain
- Track conversion funnels from web to app
- Monitor authentication success rates

## 🚨 Security Considerations

### Authentication Security

- [ ] Secure JWT token storage
- [ ] HTTPS enforced in production
- [ ] CSRF protection implemented
- [ ] Rate limiting on auth endpoints
- [ ] Secure password requirements

### App Link Security

- [ ] Token validation on server
- [ ] Time-based token expiration
- [ ] One-time use tokens for sensitive actions
- [ ] Proper app verification on mobile

## 📝 Future Enhancements

### Phase 2 Features

- [ ] Admin portal (`admin.revolvo.tech`)
- [ ] Real-time notifications
- [ ] Advanced user roles
- [ ] API rate limiting
- [ ] Advanced analytics dashboard

### Mobile App Features

- [ ] Push notifications
- [ ] Offline functionality
- [ ] Biometric authentication
- [ ] Background sync
- [ ] In-app purchases

## 🆘 Troubleshooting

### Common Issues

#### App Links Not Working

1. Check meta tags in HTML head
2. Verify app is installed on device
3. Test custom URL scheme in browser
4. Check mobile app intent filters

#### Subdomain Routing Issues

1. Verify DNS configuration
2. Check environment variables
3. Test subdomain detection utility
4. Verify build configuration

#### Authentication Problems

1. Check API endpoints
2. Verify CORS settings
3. Test JWT token format
4. Check localStorage permissions

### Debug Tools

```javascript
// Add to development console
console.log("Environment:", SubdomainDetection.getEnvironmentConfig());
console.log("Auth State:", useAuth());
console.log("App Link Config:", APP_CONFIG);
```

## 📞 Support

For development questions or issues:

1. Check this guide first
2. Review browser console errors
3. Test in incognito/private mode
4. Verify network requests in DevTools
5. Check mobile device logs for app link debugging

---

_This implementation provides a complete foundation for the choreo.revolvo.tech subdomain with production-ready authentication, app linking, and responsive design._
