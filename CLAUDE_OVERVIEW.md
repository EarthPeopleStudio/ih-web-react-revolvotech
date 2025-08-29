# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Choreo Platform** - A comprehensive neighborhood chore marketplace connecting young helpers (13-17) with adults needing tasks completed. The platform features:

- **Express.js Backend** (`ih-app-express-choreo/`) - Node.js API with MongoDB, WebSocket support, and payment processing
- **Flutter Mobile App** (`choreo/`) - Cross-platform app with real-time bidding and Mapbox integration

Supporting 5 distinct user roles: Young Helper, Adult Helper, Chore Poster, Guardian, and Business accounts.

## Quick Start Commands

### Backend Development
```bash
cd ih-app-express-choreo
npm install
cp .env.example .env      # Configure environment variables
npm run dev               # Start development server (port 5000)
npm test                  # Run all tests
jest tests/unit/auth/auth.controller.test.js  # Run specific test
```

### Flutter Development
```bash
cd choreo
flutter pub get
cp .env.example .env      # Add MAPBOX_PUBLIC_TOKEN
flutter run               # Run development build
flutter analyze           # Check code quality (<50 issues required)
flutter test              # Run all tests
flutter build apk --release  # Production Android build
```

## High-Level Architecture

### Backend (ih-app-express-choreo)
```
Entry: App.js → Express server with middleware chain
Routes: src/routes.js → Modular route files in src/routes/
Controllers: Business logic in src/Controllers/
Services: External integrations in src/Services/
Models: MongoDB schemas in src/Models/
Middleware: Auth, security, validation in src/Middleware/
```

**Key Patterns:**
- JWT authentication with refresh tokens
- Progressive security model (additional verification for sensitive actions)
- WebSocket support via Socket.IO for real-time features
- Rate limiting and CAPTCHA for security
- Device tracking and trusted device management

### Flutter App (choreo)
```
lib/
├── features/[role]/     # Role-specific modules (screens, services, widgets)
├── services/            # Singleton ChangeNotifier services
│   ├── core/           # Core app services (auth, execution, streaming)
│   ├── features/       # Feature-specific services  
│   └── integration/    # External service integrations (Mapbox)
├── routing/            # GoRouter configuration with auth guards
├── models/             # Data models
├── theme/              # Design system and theming
└── widgets/            # Shared UI components
```

**Critical Pattern - Service Architecture:**
```dart
// ALL services MUST follow this exact pattern
class ExampleService extends ChangeNotifier {
  static final ExampleService _instance = ExampleService._internal();
  factory ExampleService() => _instance;
  ExampleService._internal();
  
  bool _isInitialized = false;
  
  Future<void> initialize() async {
    if (_isInitialized) return;
    // Initialize logic
    _isInitialized = true;
    notifyListeners();
  }
}

// UI updates MUST use ListenableBuilder
ListenableBuilder(
  listenable: ExampleService(),
  builder: (context, child) => YourWidget()
)
```

## Common Development Commands

### Backend Testing & Database
```bash
# Testing
npm run test:watch          # Watch mode for TDD
npm run test:coverage       # Generate coverage report
npm run test:security       # Security-specific tests
npm run test:auth          # Authentication tests

# Database Management
npm run setup:database      # Initialize with indexes and defaults
npm run query:users        # Query user data
npm run query:db-health    # Check database health
npm run production:check   # Verify production setup
```

### Flutter Development & Analysis
```bash
# Development
flutter hot-reload         # Quick UI changes (r in terminal)
flutter hot-restart        # Full restart (R in terminal)
flutter devices           # List available devices
flutter logs             # View device logs

# Quality Checks
flutter analyze          # MUST stay under 50 issues (currently 2088 - needs cleanup)
dart format lib/        # Format code
flutter doctor          # Check Flutter installation

# Building
flutter build appbundle    # Android App Bundle for Play Store
flutter build ios --release # iOS production build
flutter clean             # Clean build artifacts
```

## Multi-Role System Implementation

### Role Capabilities Matrix
| Role | Age | Features | Security Level | Payment |
|------|-----|----------|----------------|---------|
| Young Helper | 13-17 | Badge system, gift cards, guardian oversight | Progressive auth | Receive only (gift cards) |
| Adult Helper | 18+ | Professional verification, complex tasks | Full auth + verification | Full payment |
| Chore Poster | Any | Post chores, manage bids, payments | Full auth | Send payments |
| Guardian | Adult | Monitor young helpers, approve activities | Full auth | Manage youth accounts |
| Business | Enterprise | Team management, bulk operations | Enhanced auth | Corporate billing |

### Key Services Architecture
**Core Services** (`lib/services/core/`):
- `AuthService`: Session management, role-based routing
- `ChoreExecutionService`: Chore workflow management
- `LiveStreamingService`: Real-time bidding and streaming
- `CurrencyService`: Payment and currency handling

**Integration Services**:
- `MapboxService`: Location services with real GPS and mock chore generation

### Authentication Flow
1. **Initial Registration**: Email/phone verification
2. **Progressive Security**: Additional verification for sensitive actions
3. **Device Management**: Trusted device registration and tracking
4. **Role-Based Access**: Guards on routes and API endpoints
5. **Session Management**: JWT with refresh token rotation

## API Integration Points

### Critical Endpoints
```
Base: /api/v1
Auth: /auth/register, /auth/login, /auth/refresh, /auth/verify
Users: /users/profile, /users/role-specific-data
Chores: /chores, /chores/:id/bid
Live Bidding: /live-bidding (WebSocket)
Payments: /payments/stripe, /escrow
Emergency: /emergency/alert, /emergency/checkin
```

### WebSocket Events
```javascript
// Live bidding
socket.emit('join-bidding-room', choreId)
socket.on('new-bid', (bidData) => {})
socket.on('bid-accepted', (winnerData) => {})

// Real-time messaging
socket.emit('send-message', messageData)
socket.on('receive-message', (message) => {})
```

## External Service Integrations

### Currently Implemented
- **Stripe**: Payment processing and escrow
- **AWS S3**: File storage with presigned URLs
- **AWS SES**: Email delivery
- **Twilio**: SMS verification
- **Cloudinary**: Image optimization
- **Mapbox**: Location services (Flutter)
- **Tremendous API**: Gift card rewards

### Environment Variables Required
```bash
# Backend (.env)
MONGO_URI=mongodb://...
JWT_SECRET=...
STRIPE_SECRET_KEY=...
AWS_ACCESS_KEY_ID=...
TWILIO_ACCOUNT_SID=...

# Flutter (.env)
MAPBOX_PUBLIC_TOKEN=pk.eyJ1I...
API_BASE_URL=http://localhost:5000/api/v1
```

## Critical Development Rules

### Backend Rules
- Always validate input with express-validator
- Use try-catch blocks with proper error responses
- Implement rate limiting on sensitive endpoints
- Log security events to AuditLog model
- Test with MongoDB Memory Server, not production DB

### Flutter Rules  
- **NEVER** change the ChangeNotifier service pattern
- **NEVER** use Provider, Bloc, or Riverpod
- **ALWAYS** use GoRouter for navigation (context.go() or context.push())
- **ALWAYS** use ListenableBuilder for UI updates
- **MAINTAIN** flutter analyze issues below 50
- **PRESERVE** existing UI animations and transitions
- **FOLLOW** singleton pattern for all services with _instance and _internal()
- **MAINTAIN** role isolation in feature modules

## Testing Requirements

### Backend Test Coverage
- Controllers: Unit tests with mocked services
- Services: Integration tests with external APIs
- Auth: Complete flow testing with security scenarios
- WebSocket: Real-time event testing

### Flutter Test Focus
- Widget tests for each role's screens
- Service tests with mock data
- Navigation guard testing
- Integration tests for critical flows

## Deployment Considerations

### Backend Production Checklist
- Environment variables configured
- Database indexes created
- Rate limiting enabled
- CORS origins whitelisted
- SSL certificates valid
- Monitoring configured

### Flutter Release Checklist
- API endpoints pointing to production
- Mapbox token configured
- App signing configured
- Version numbers updated
- Analytics integrated
- Crash reporting enabled
- Flutter analyze issues resolved (<50 required)