# Cloudflare Turnstile Captcha Implementation

This guide covers the complete Cloudflare Turnstile captcha implementation for the Revolvo React website.

## 🏗️ Architecture Overview

### Components Created

1. **`TurnstileWidget.jsx`** - Core captcha widget component
2. **`CaptchaPage.jsx`** - Standalone captcha verification page
3. **`useApiWithCaptcha.js`** - Hook for API calls with automatic captcha integration
4. **`EnhancedAuthForm.jsx`** - Example form demonstrating captcha integration

### URL Structure

- **Widget URL**: `https://revolvo.tech/auth/captcha`
- **API Base**: `https://choreo.revolvo.tech`
- **Config Endpoint**: `https://choreo.revolvo.tech/api/v1/captcha/widget-config`

## 🎯 Key Features

### ✅ Automatic Error 428 Handling

- Detects when backend returns HTTP 428 (Precondition Required)
- Automatically opens captcha verification
- Retries original request with captcha token

### ✅ Flexible Integration Options

- **Popup Mode**: Opens captcha in a popup window
- **Redirect Mode**: Redirects to captcha page if popup blocked
- **Inline Mode**: Embed captcha directly in forms

### ✅ Smart Token Management

- Caches valid tokens for 5 minutes
- Automatically clears expired tokens
- Handles token refresh and retry logic

### ✅ Multiple Theme Support

- Auto, light, and dark themes
- Responsive design for mobile devices
- Consistent styling with your brand

## 🚀 Quick Start

### 1. Basic Usage with Hook

```javascript
import { useApiWithCaptcha } from "../hooks/useApiWithCaptcha";

function MyComponent() {
  const { post, isLoading, error } = useApiWithCaptcha();

  const handleLogin = async () => {
    try {
      // This will automatically handle error 428 and show captcha
      const result = await post("/api/v1/auth/login", {
        email: "user@example.com",
        password: "password123",
      });
      console.log("Success:", result);
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? "Signing In..." : "Sign In"}
    </button>
  );
}
```

### 2. Manual Captcha Integration

```javascript
import TurnstileWidget from "./TurnstileWidget";

function MyForm() {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async () => {
    const data = {
      email: "user@example.com",
      password: "password123",
    };

    // Include captcha token if available
    if (captchaToken) {
      data.captchaToken = captchaToken;
    }

    try {
      const response = await fetch(
        "https://choreo.revolvo.tech/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.status === 428) {
        // Show captcha widget
        setShowCaptcha(true);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}

      <TurnstileWidget
        show={showCaptcha}
        onSuccess={(token) => {
          setCaptchaToken(token);
          setShowCaptcha(false);
          // Automatically retry submission
          handleSubmit();
        }}
        onError={(error) => console.error("Captcha error:", error)}
        theme="auto"
        size="normal"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## 📋 API Integration Examples

### Backend API Call Format

```javascript
// Example API call with captcha token
fetch("https://choreo.revolvo.tech/api/v1/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
    captchaToken: "token-from-widget", // Include when captcha is solved
  }),
});
```

### Error 428 Response Format

Your backend should return this format when captcha is required:

```json
{
  "error": "Captcha verification required",
  "message": "Additional security verification needed",
  "action": "login",
  "code": 428
}
```

## 🔧 Component Props

### TurnstileWidget Props

```javascript
<TurnstileWidget
  show={boolean}              // Whether to show the widget
  onSuccess={function}        // Called when captcha is solved
  onError={function}          // Called on captcha errors
  onExpire={function}         // Called when captcha expires
  theme="auto|light|dark"     // Visual theme
  size="normal|compact"       // Widget size
  resetTrigger={any}          // Trigger to reset widget
/>
```

### useApiWithCaptcha Hook Returns

```javascript
const {
  isLoading,           // boolean - Request in progress
  error,               // string - Last error message
  clearError,          // function - Clear error state
  clearCaptchaToken,   // function - Clear stored token
  apiCall,             // function - Generic API call
  get,                 // function - GET request
  post,                // function - POST request
  put,                 // function - PUT request
  delete,              // function - DELETE request
} = useApiWithCaptcha();
```

## 🎨 Customization

### Styling the Widget

The TurnstileWidget uses styled-components and CSS variables:

```css
/* Customize in your CSS */
:root {
  --primary-color: #4a90e2;
  --secondary-color: #7b68ee;
  --text-primary: #333;
  --text-secondary: #666;
}
```

### Custom Error Messages

```javascript
const getTurnstileErrorMessage = (errorCode) => {
  const customMessages = {
    "network-error": "Check your internet connection",
    "invalid-input-response": "Please try the captcha again",
    // Add your custom messages
  };
  return customMessages[errorCode] || `Error: ${errorCode}`;
};
```

## 🔐 Security Considerations

### Token Validation

- Captcha tokens are validated on the backend
- Tokens expire after 5 minutes client-side
- Backend should also validate token expiration

### Rate Limiting

- The system works with your existing rate limiting
- Error 428 triggers when rate limits are exceeded
- Captcha verification allows proceeding

### Privacy

- No personal data stored in captcha tokens
- Session storage used for temporary token caching
- Tokens automatically cleared on expiration

## 🐛 Troubleshooting

### Common Issues

1. **Script Loading Fails**

   ```javascript
   // Check network connectivity and CDN availability
   // Fallback: Use different CDN or local script
   ```

2. **Popup Blocked**

   ```javascript
   // The system automatically falls back to redirect mode
   // Users will be redirected to /auth/captcha
   ```

3. **Token Not Included**

   ```javascript
   // Ensure useApiWithCaptcha hook is used correctly
   // Check that captchaToken is added to request body
   ```

4. **Configuration Error**
   ```javascript
   // Verify API endpoint is accessible
   // Check that widget-config endpoint returns valid siteKey
   ```

### Debug Mode

Enable debug logging in development:

```javascript
// Add to your component
{
  import.meta.env.DEV && (
    <div>Debug: {JSON.stringify({ captchaToken, showWidget, isLoading })}</div>
  );
}
```

## 📱 Mobile Support

### Responsive Design

- Widget automatically adapts to mobile screens
- Touch-friendly interface elements
- Optimized popup sizing for mobile devices

### App Integration

- Supports deep linking for mobile apps
- PostMessage API for popup communication
- Graceful fallback for WebView environments

## 🔄 Testing

### Development Testing

1. **Test Error 428 Flow**

   ```javascript
   // Temporarily modify your API to always return 428
   // Verify captcha widget appears and functions correctly
   ```

2. **Test Token Persistence**

   ```javascript
   // Complete captcha, check sessionStorage
   // Verify token is reused for subsequent requests
   ```

3. **Test Popup Blocking**
   ```javascript
   // Disable popups in browser settings
   // Verify redirect fallback works
   ```

### Production Monitoring

- Monitor captcha completion rates
- Track error 428 frequency
- Log captcha verification failures

## 📦 Files Structure

```
src/
├── Components/
│   ├── TurnstileWidget.jsx      # Core captcha widget
│   ├── CaptchaPage.jsx          # Standalone captcha page
│   ├── EnhancedAuthForm.jsx     # Example implementation
│   └── README_CAPTCHA.md        # This documentation
├── hooks/
│   └── useApiWithCaptcha.js     # API hook with captcha
└── App.jsx                      # Added /auth/captcha route
```

## 🚀 Deployment Checklist

- [ ] Backend implements widget-config endpoint
- [ ] Backend handles captcha token validation
- [ ] Backend returns error 428 when appropriate
- [ ] Frontend captcha route is accessible
- [ ] Cloudflare Turnstile is configured
- [ ] Site key is properly configured
- [ ] CORS settings allow widget domain
- [ ] Rate limiting triggers error 428
- [ ] Mobile responsiveness tested
- [ ] Popup fallback tested

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify backend configuration
4. Test with different browsers and devices

---

This implementation provides a complete, production-ready Cloudflare Turnstile integration for your React website with automatic error 428 handling and seamless user experience.
