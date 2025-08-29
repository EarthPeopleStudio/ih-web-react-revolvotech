# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Choreo Platform Backend** - Express.js API for a neighborhood chore marketplace connecting young helpers (13-17) with adults needing tasks completed. Features real-time bidding, payment processing, comprehensive safety systems, and multi-role user management.

## Quick Start Commands

### Development & Testing
```bash
npm install                           # Install dependencies
cp .env.example .env                  # Configure environment variables
npm run dev                          # Start development server (port 5000)
npm test                             # Run all tests
npm run test:watch                   # TDD watch mode
npm run test:coverage                # Generate coverage report
jest tests/unit/auth/auth.controller.test.js  # Run specific test file
```

### Database Operations
```bash
npm run setup:database               # Initialize DB with indexes and defaults
npm run query:users                  # Query user data
npm run query:db-health              # Check database health
npm run production:check             # Verify production environment
npm run check:raw-connection         # Test MongoDB connection
```

## Architecture Overview

### Entry Points & Flow
```
App.js → Express server initialization
  ├── Middleware chain (Helmet, CORS, rate limiting, auth)
  ├── src/routes.js → Route registration
  ├── WebSocket service initialization
  └── Error handling middleware
```

### Directory Structure
```
src/
├── Controllers/         # Business logic (30+ controllers)
│   ├── badges/         # Badge system controllers
│   └── verification/   # Multi-level verification
├── Models/             # MongoDB schemas (20+ models)
├── Services/           # External integrations & utilities
│   ├── websocket/      # Real-time handlers
│   ├── emergency/      # Safety systems
│   └── verification/   # Identity verification
├── Middleware/         # Auth, security, validation
└── routes/            # API endpoint definitions
```

### API Endpoints Structure
```
Base: /api/v1

Core Routes:
/auth                   # JWT auth with refresh tokens
/users                  # User management & profiles
/chores                 # Marketplace listings
/bids                   # Bidding system
/live-bidding          # WebSocket real-time bidding

Payment & Financial:
/payments              # Stripe payment processing
/escrow                # Secure payment holding
/tremendous            # Gift card rewards

Safety & Security:
/emergency             # Alert system & check-ins
/verification          # Identity & background checks
/security              # Device tracking, rate limiting

Communication:
/messages              # In-app messaging
/websocket             # Real-time events
```

### WebSocket Events
```javascript
// Live Bidding
socket.emit('join-bidding-room', { choreId, userId })
socket.on('new-bid', (bidData) => {})
socket.on('bid-accepted', (winner) => {})
socket.on('bidding-timer-update', (timeLeft) => {})

// Communication
socket.emit('send-message', messageData)
socket.on('receive-message', (message) => {})

// WebRTC Signaling
socket.emit('webrtc-offer', offerData)
socket.emit('webrtc-answer', answerData)
```

## Key Services & Integrations

### External Service Map
```
AWS Services:
├── S3: File storage with presigned URLs
├── SES: Email delivery
├── Comprehend: Content moderation
├── Rekognition: Image analysis
└── Textract: Document processing

Payment & Rewards:
├── Stripe: Payment processing & escrow
└── Tremendous: Gift card API

Communication:
├── Twilio: SMS verification & alerts
└── Cloudinary: Image optimization

Location:
└── Mapbox: Geocoding & proximity (referenced)
```

### Core Service Patterns
```javascript
// Service initialization pattern
class ServiceName {
  constructor() {
    this.client = new ExternalClient(config);
  }
  
  async operation(params) {
    try {
      // Validate input
      // Execute operation
      // Log to AuditLog if security-relevant
      return result;
    } catch (error) {
      // Structured error handling
      throw new ServiceError(error);
    }
  }
}
```

## Authentication & Security Architecture

### JWT Token Flow
```
1. Login → Generate access (15m) & refresh (7d) tokens
2. Request → Verify JWT → Check device fingerprint
3. Sensitive action → Progressive auth check
4. Token refresh → Rotate refresh token
```

### Security Middleware Chain
```javascript
app.use(helmet())                    // Security headers
app.use(corsMiddleware)              // Dynamic CORS
app.use(rateLimiter)                // IP-based limiting
app.use(authenticateToken)          // JWT validation
app.use(authorizeRoles)             // Role-based access
app.use(progressiveAuth)            // Additional verification
app.use(auditLogger)                // Security event logging
```

### Multi-Role System
| Role | Age | Key Features | Security Level |
|------|-----|-------------|----------------|
| Young Helper | 13-17 | Badge system, gift cards only | Guardian oversight |
| Adult Helper | 18+ | Full payments, background checks | Professional verification |
| Chore Poster | Any | Post chores, manage payments | Standard auth |
| Guardian | Adult | Monitor young helpers | Full access |
| Business | Enterprise | Team management, bulk ops | Enhanced auth |

## Testing Strategy

### Test Organization
```
tests/
├── unit/
│   ├── auth/          # Authentication unit tests
│   ├── controllers/   # Controller logic tests
│   ├── services/      # Service layer tests
│   └── websocket/     # WebSocket handler tests
├── integration/
│   ├── bidding/       # Bidding workflow tests
│   ├── safety/        # Emergency system tests
│   └── verification/  # Verification flow tests
└── utils/
    └── testHelpers.js # Shared test utilities
```

### Testing Patterns
```javascript
// MongoDB Memory Server auto-setup
beforeAll(async () => {
  // Automatically handled by tests/setup.js
});

// Controller test pattern
describe('ControllerName', () => {
  it('should handle operation', async () => {
    const mockService = { method: jest.fn() };
    const req = { body: testData };
    const res = { json: jest.fn(), status: jest.fn() };
    
    await controller.operation(req, res);
    
    expect(mockService.method).toHaveBeenCalledWith(testData);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
  });
});
```

## Database Schema Patterns

### User Model Structure
```javascript
User: {
  email, phone, role,
  profile: { nested document },
  verification: { 
    email, phone, identity, background 
  },
  security: {
    devices[], loginAttempts, suspiciousActivity
  },
  settings: { preferences }
}
```

### Common Model Features
- Timestamps (createdAt, updatedAt)
- Soft deletes (isDeleted flag)
- Audit fields (createdBy, modifiedBy)
- Status enums with workflows

## Environment Configuration

### Required Environment Variables
```bash
# Core
NODE_ENV=development|production
PORT=5000
MONGO_URI=mongodb://...

# Authentication
JWT_SECRET=...
JWT_REFRESH_SECRET=...
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# AWS Services
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=...

# Payment
STRIPE_SECRET_KEY=...
TREMENDOUS_API_KEY=...

# Communication
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
CLOUDINARY_CLOUD_NAME=...

# Security
CAPTCHA_SECRET_KEY=...
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Production Deployment Checklist

### Pre-deployment
```bash
npm run production:check    # Verify environment
npm run setup:database     # Create indexes
npm test                   # Run test suite
```

### Configuration Verification
- [ ] Environment variables set
- [ ] Database indexes created
- [ ] CORS origins configured
- [ ] Rate limiting enabled
- [ ] SSL certificates valid
- [ ] Monitoring configured
- [ ] Backup strategy implemented

## Common Development Patterns

### Error Response Format
```javascript
res.status(statusCode).json({
  success: false,
  message: 'User-friendly message',
  error: process.env.NODE_ENV === 'development' ? details : undefined
});
```

### Audit Logging
```javascript
// Automatically logged routes: /auth/*, /security/*, /admin/*
await AuditLog.create({
  user: userId,
  action: 'ACTION_NAME',
  resource: 'Resource',
  details: { ...relevantData },
  ip: req.ip
});
```

### Progressive Authentication
```javascript
// For sensitive operations
if (requiresProgressiveAuth(action)) {
  await verifyAdditionalAuth(user, { 
    method: 'sms|email|biometric' 
  });
}
```

## WebSocket Implementation

### Connection Management
```javascript
// Socket.IO with namespace separation
io.of('/bidding').on('connection', (socket) => {
  // Room-based bidding
});

io.of('/chat').on('connection', (socket) => {
  // Direct messaging
});
```

### Real-time Event Patterns
- Use rooms for group events (bidding)
- Implement acknowledgments for critical events
- Handle reconnection with state recovery
- Rate limit socket emissions

## Performance Optimizations

### Database
- Connection pooling (default: 10)
- Compound indexes on frequently queried fields
- Lean queries for read-only operations
- Aggregation pipelines for complex queries

### API
- Response compression (gzip)
- Static file caching
- Query result caching (Redis ready)
- Pagination on list endpoints

## Debugging Commands

```bash
# Check specific service connections
npm run check:raw-connection     # MongoDB direct connection
npm run query:db-health          # Database health metrics

# Development helpers
NODE_ENV=development npm run dev # Verbose logging
DEBUG=* npm run dev              # All debug output
```