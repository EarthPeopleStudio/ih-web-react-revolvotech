# Subdomain Architecture Documentation

## Overview

This document explains the subdomain architecture implemented for the Revolvo ecosystem, designed to support multiple applications under different subdomains while maintaining a consistent and scalable architecture.

## Current Architecture

### Main Structure

```
revolvo.tech (main website)
├── choreo.revolvo.tech (Choreo app)
└── admin.revolvo.tech (future admin portal)
```

### File Organization

```
src/
├── App.jsx (main router with subdomain detection)
├── utils/
│   └── subdomainDetection.js (subdomain detection utility)
├── choreo/ (Choreo app directory)
│   ├── ChoreoApp.jsx (main Choreo app component)
│   ├── components/
│   │   ├── ChoreoNavbar.jsx
│   │   └── ChoreoFooter.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── MarketPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── ExplorePage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── auth/
│   │       ├── LoginPage.jsx
│   │       ├── VerifyPage.jsx
│   │       ├── ResetPage.jsx
│   │       └── AuthCallbackPage.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   └── utils/
│       └── appLinks.js
└── admin/ (future admin app directory)
    └── AdminApp.jsx
```

## How It Works

### 1. Subdomain Detection (`src/utils/subdomainDetection.js`)

The subdomain detection utility automatically determines which app to load based on the current subdomain:

```javascript
export const getSubdomain = () => {
  const hostname = window.location.hostname;

  // Development mode - check for query parameter
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    const params = new URLSearchParams(window.location.search);
    return params.get("subdomain") || "main";
  }

  // Production mode - extract subdomain
  const parts = hostname.split(".");
  if (parts.length >= 3) {
    return parts[0]; // choreo.revolvo.tech -> 'choreo'
  }

  return "main";
};
```

### 2. Main App Router (`src/App.jsx`)

The main App.jsx file uses the subdomain detection to render the appropriate app:

```javascript
function App() {
  const subdomain = getSubdomain();

  switch (subdomain) {
    case "choreo":
      return <ChoreoApp />;
    case "admin":
      return <AdminApp />; // Future implementation
    default:
      return <MainApp />; // Your existing main website
  }
}
```

### 3. Individual App Structure

Each subdomain app (like Choreo) is a complete React application with its own:

- **Router setup** with React Router
- **Authentication system** with context providers
- **UI components** (Navbar, Footer, etc.)
- **Pages and routing** specific to that app
- **Utilities and helpers** for app-specific functionality

## Development Setup

### Testing Subdomains Locally

#### Option 1: Query Parameter (Recommended)

```bash
# Start development server
npm run dev

# Access different apps
http://localhost:3000                    # Main site
http://localhost:3000/?subdomain=choreo  # Choreo app
http://localhost:3000/?subdomain=admin   # Admin app (future)
```

#### Option 2: Local Hosts File

1. Edit your hosts file:

   - **Windows**: `C:\Windows\System32\drivers\etc\hosts`
   - **Mac/Linux**: `/etc/hosts`

2. Add entries:

   ```
   127.0.0.1 choreo.localhost
   127.0.0.1 admin.localhost
   ```

3. Access apps:
   ```
   http://localhost:3000           # Main site
   http://choreo.localhost:3000    # Choreo app
   http://admin.localhost:3000     # Admin app (future)
   ```

## Production Deployment

### DNS Configuration

Set up DNS records for each subdomain:

```
A     @               -> Your server IP
A     choreo          -> Your server IP
A     admin           -> Your server IP
CNAME www             -> revolvo.tech
```

### Deployment Platforms

#### Netlify

```javascript
// netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Host = ["choreo.revolvo.tech"]}

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Host = ["admin.revolvo.tech"]}
```

#### Vercel

```javascript
// vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html",
      "has": [
        {
          "type": "host",
          "value": "choreo.revolvo.tech"
        }
      ]
    },
    {
      "source": "/(.*)",
      "destination": "/index.html",
      "has": [
        {
          "type": "host",
          "value": "admin.revolvo.tech"
        }
      ]
    }
  ]
}
```

## Adding New Subdomain Apps

### Step 1: Create App Directory

```bash
mkdir src/newapp
cd src/newapp
```

### Step 2: Create App Structure

```
src/newapp/
├── NewApp.jsx (main app component)
├── components/
├── pages/
├── context/
└── utils/
```

### Step 3: Update Main Router

```javascript
// src/App.jsx
function App() {
  const subdomain = getSubdomain();

  switch (subdomain) {
    case "choreo":
      return <ChoreoApp />;
    case "admin":
      return <AdminApp />;
    case "newapp":
      return <NewApp />; // Add new app
    default:
      return <MainApp />;
  }
}
```

### Step 4: Update DNS and Deployment

- Add DNS record for `newapp.revolvo.tech`
- Update deployment configuration
- Test locally with `?subdomain=newapp`

## Benefits of This Architecture

### 1. **Scalability**

- Each app is independent and can be developed separately
- Easy to add new subdomains without affecting existing apps
- Clean separation of concerns

### 2. **Maintainability**

- Clear file organization
- Independent routing and state management
- Easier debugging and testing

### 3. **Performance**

- Code splitting at the app level
- Lazy loading of subdomain-specific code
- Reduced bundle size for each app

### 4. **Development Experience**

- Easy local testing with query parameters
- Consistent development patterns across apps
- Clear deployment strategies

## Security Considerations

### 1. **Authentication**

- Each app manages its own authentication
- Shared authentication possible through main domain cookies
- Secure token storage and validation

### 2. **CORS Configuration**

```javascript
// Example CORS setup for API
const corsOptions = {
  origin: [
    "https://revolvo.tech",
    "https://choreo.revolvo.tech",
    "https://admin.revolvo.tech",
  ],
  credentials: true,
};
```

### 3. **Environment Variables**

```javascript
// Different configs per subdomain
const getApiUrl = () => {
  const subdomain = getSubdomain();
  switch (subdomain) {
    case "choreo":
      return process.env.REACT_APP_CHOREO_API_URL;
    case "admin":
      return process.env.REACT_APP_ADMIN_API_URL;
    default:
      return process.env.REACT_APP_API_URL;
  }
};
```

## Future Enhancements

### 1. **Shared Components Library**

Create a shared components library that can be used across all subdomain apps:

```
src/shared/
├── components/
├── utils/
├── hooks/
└── styles/
```

### 2. **Micro-Frontend Architecture**

Consider migrating to a micro-frontend architecture for even better separation:

- Independent deployment of each app
- Different tech stacks per app if needed
- Module federation for shared dependencies

### 3. **Analytics and Monitoring**

- Subdomain-specific analytics tracking
- Error monitoring per app
- Performance metrics per subdomain

## Troubleshooting

### Common Issues

1. **Subdomain not detected locally**

   - Check query parameter: `?subdomain=choreo`
   - Verify hosts file configuration
   - Clear browser cache

2. **Routing issues**

   - Ensure React Router basename is set correctly
   - Check deployment configuration
   - Verify DNS records

3. **Authentication problems**
   - Check cookie domain settings
   - Verify CORS configuration
   - Ensure token storage is accessible

### Debug Commands

```bash
# Check DNS resolution
nslookup choreo.revolvo.tech

# Test local subdomain
curl -H "Host: choreo.localhost" http://localhost:3000

# Check deployment
curl -I https://choreo.revolvo.tech
```

## Conclusion

This subdomain architecture provides a solid foundation for building multiple applications under the Revolvo ecosystem. It's designed to be scalable, maintainable, and developer-friendly while ensuring each app can operate independently when needed.

The current implementation with Choreo serves as a template for future subdomain applications, and the architecture can easily accommodate new apps as the ecosystem grows.
