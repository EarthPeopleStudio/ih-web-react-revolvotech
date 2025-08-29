# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Choreo** is a neighborhood chore marketplace Flutter app connecting 5 distinct user roles:
- **Young Helper** (13-17): Earns gift cards by completing chores with guardian oversight
- **Adult Helper** (18+): Professional helpers for complex tasks
- **Chore Poster**: Posts chores and manages bidding processes
- **Guardian**: Monitors and approves young helper activities
- **Business**: Enterprise accounts with team management capabilities

The app features a live bidding system (InDrive-style), real-time messaging, Mapbox integration, and role-based authentication with progressive security.

## Core Architecture

### State Management Pattern
- **Service-based architecture** using `ChangeNotifier` singleton pattern
- **NO Provider, Bloc, or Riverpod** - uses custom service layer
- Services follow this exact pattern:
```dart
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
```

### UI State Updates
Use `ListenableBuilder` for reactive UI:
```dart
ListenableBuilder(
  listenable: ExampleService(),
  builder: (context, child) {
    final service = ExampleService();
    return YourWidget(data: service.data);
  },
)
```

### Navigation System
- **GoRouter-based** with authentication guards
- Route configuration in `lib/routing/app_router.dart`
- Route constants in `lib/routing/route_names.dart`
- AuthService handles role-based redirects and access control

### Feature Organization
```
lib/features/
├── young_helper/          # Complete feature module
│   ├── models/           # Role-specific data models
│   ├── screens/          # All screens including live bidding
│   ├── services/         # Business logic services
│   ├── utils/            # Design system and utilities
│   └── widgets/          # Reusable components
├── adult_helper/         # Similar structure
├── chore_poster/         # Most developed role
├── guardian/             # Monitoring features
└── business/             # Enterprise features
```

## Development Commands

### Essential Commands
```bash
# Development
flutter run                 # Run with development server
flutter run --release      # Production build
flutter hot-restart        # Full restart during development
flutter hot-reload          # Hot reload for quick changes

# Analysis & Quality
flutter analyze            # Static analysis (MUST stay <50 issues)
flutter test               # Run all tests
flutter test test/widget_test.dart  # Run specific test file
dart format lib/           # Format code in lib directory

# Build & Release
flutter build apk --release     # Android production build
flutter build ios --release     # iOS production build
flutter build appbundle        # Android App Bundle for Play Store
flutter clean && flutter pub get  # Clean reinstall dependencies

# Debugging
flutter doctor             # Check Flutter installation
flutter devices            # List available devices
flutter logs               # View device logs
```

### Project Setup
```bash
# Initial setup
flutter pub get
cp .env.example .env        # Configure environment variables
# Add Mapbox token to .env: MAPBOX_PUBLIC_TOKEN=your_token

# Note: .env file exists in project root - configure with actual tokens
# Critical: MAPBOX_PUBLIC_TOKEN required for location services
```

## Critical Architecture Patterns

### Authentication Flow
- `AuthService` manages user sessions and role-based routing
- Each role has dedicated auth screens with different requirements
- Young Helper requires guardian email for verification
- Progressive security model with device registration

### Multi-Role Navigation
- Each role has isolated feature modules
- Role-based route guards prevent unauthorized access
- Consistent navigation patterns across roles
- Bottom navigation implemented per role with badges/notifications

### Mapbox Integration
- `MapboxService` handles location services and mapping
- Real-time location tracking for chore discovery
- Interactive maps with custom markers and distance calculation
- Integrated with live bidding for location-based chores

### Live Bidding System
- WebSocket-ready architecture for real-time bidding
- InDrive-style bidding interface with maps
- Role-specific bidding capabilities and restrictions
- Timer systems and bid management

## Key Services

### Core Services (`lib/services/core/`)
- `AuthService`: Authentication and session management
- `MapboxService`: Location and mapping functionality

### Feature Services
- `YoungHelperService`: Mock data and business logic for young helpers
- `ChoreService`: Chore management and business logic
- `MessageService`: Real-time messaging functionality
- `LiveStreamingService`: Live bidding and streaming
- `ChoreExecutionService`: Chore workflow management
- `CurrencyService`: Payment and currency handling
- Role-specific services in each feature module

## Theme and Styling

### Design System
- `AppTheme`: Global color schemes and typography
- `TextStyles`: Consistent text styling across the app
- Role-specific design systems (e.g., `YoungHelperDesignSystem`)
- Dark/light mode support with `ThemeProvider`

### UI Consistency
- Feature-specific widgets in `widgets/` directories
- Shared components in `lib/widgets/`
- Maintain animations and transitions from original design
- Responsive design patterns for various screen sizes

## Environment Configuration

### Required Environment Variables (.env)
```
MAPBOX_PUBLIC_TOKEN=your_mapbox_token
```

### Configuration Files
- `lib/config/secrets.dart`: Environment variable management with fallbacks
- `pubspec.yaml`: Dependencies including Mapbox, GoRouter, and custom fonts
- `analysis_options.yaml`: Standard Flutter linting rules
- `.env`: Environment variables (MAPBOX_PUBLIC_TOKEN, API_BASE_URL)

## Testing Strategy

### Widget Testing
- Test file: `test/widget_test.dart`
- Tests main app initialization and basic smoke tests
- Role-specific widget testing in respective feature modules

### Integration Testing
- Service layer testing with mock implementations
- Authentication flow testing
- Navigation testing between roles

## Development Guidelines

### Naming Conventions
- Services: `ExampleService`
- Models: `ExampleModel` 
- Screens: `ExampleScreen`
- Widgets: `ExampleWidget`

### File Organization
- One class per file
- Feature isolation by user role
- Shared utilities in `lib/utils/`
- Common widgets in `lib/widgets/`

### Code Quality Standards
- Maintain `flutter analyze` issues below 50
- Follow existing service patterns exactly
- Use GoRouter for all navigation
- Maintain UI fidelity with original design

## External Integrations

### Currently Integrated
- **Mapbox**: Location services and mapping
- **Flutter packages**: See pubspec.yaml for complete list

### Planned Integrations
- WebSocket for real-time bidding
- WebRTC for video calling
- Push notifications
- Payment processing (Stripe)

## Development Workflow

1. **Feature Development**: Create services first, then UI components
2. **Testing**: Test services independently, then integration
3. **Navigation**: Add routes to app_router.dart with proper guards
4. **Styling**: Use existing design systems, create role-specific if needed
5. **State Management**: Follow ChangeNotifier service pattern exclusively

## Important Notes

### Critical Rules
- **DO NOT** change the service pattern or introduce new state management (no Provider/Bloc/Riverpod)
- **DO NOT** use Navigator directly - always use GoRouter with context.go() or context.push()
- **DO NOT** break the singleton ChangeNotifier pattern for services
- **DO** maintain role isolation in feature modules - each role has separate screens/services
- **DO** follow existing authentication and navigation patterns exactly
- **DO** preserve UI animations and design consistency across roles
- **DO** keep `flutter analyze` issues below 50 at all times

### Service Implementation Rules
- All services MUST extend ChangeNotifier and use singleton pattern
- Services MUST have initialize() method with _isInitialized guard
- UI updates MUST use ListenableBuilder, never direct service method calls in build()
- Route navigation MUST use GoRouter paths defined in route_names.dart

### Recent Development Focus
- Adult Helper features recently implemented with new screens and service
- Young Helper bidding system with live chore integration
- Multi-role navigation with proper authentication guards
- Mapbox integration working correctly with location services

The codebase prioritizes maintainability, role-based security, and consistent user experience across all 5 user types while supporting real-time marketplace functionality.