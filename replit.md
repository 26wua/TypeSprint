# WPM Typing Game

## Overview

This is a WPM (Words Per Minute) typing game built as a full-stack web application. The application provides users with a 60-second typing challenge where they type displayed sentences and receive real-time feedback on their performance including WPM, accuracy, and character count. The game features a clean, distraction-free interface optimized for typing performance with visual feedback for correct/incorrect characters and comprehensive results tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (single page application)
- **State Management**: React hooks for local state, TanStack Query for server state
- **UI Components**: Shadcn/UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for typography and spacing
- **Component Structure**: Modular component architecture with clear separation between game logic, UI controls, and display components

### Design System
- **Typography**: JetBrains Mono for typing text (optimal for monospace display), Inter for UI elements
- **Color Palette**: Dark theme optimized for typing focus with high contrast
- **Visual Feedback**: Real-time color coding for typing accuracy (green for correct, red for incorrect, blue for current position)
- **Layout**: Utility-focused design inspired by productivity tools like Linear and Notion

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL support (configured but basic schema)
- **Session Management**: Express sessions with PostgreSQL session store
- **API Structure**: RESTful API design (routes structure in place but not fully implemented)
- **Development Setup**: Hot reloading with Vite in development mode

### Core Game Logic
- **Typing Engine**: Real-time character comparison and validation
- **Statistics Calculation**: Live WPM calculation, accuracy tracking, character counting
- **Timer System**: 60-second countdown with visual urgency indicators
- **Sample Text**: Curated sentences optimized for typing practice
- **Results Display**: Comprehensive performance summary with visual feedback

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: ESLint configuration and consistent code formatting
- **Hot Reloading**: Development environment with instant feedback

## External Dependencies

### UI and Component Libraries
- **Radix UI**: Complete set of unstyled, accessible UI primitives for complex components
- **Shadcn/UI**: Pre-styled component library built on top of Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

### Database and ORM
- **Neon Database**: PostgreSQL cloud database service
- **Drizzle ORM**: Type-safe database ORM with excellent TypeScript integration
- **Drizzle Kit**: Database migration and schema management tools

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Tailwind integration

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation support
- **Zod**: Schema validation for data integrity

### Replit-Specific Integrations
- **Replit Vite Plugins**: Development banner, error overlay, and cartographer for enhanced Replit experience
- **Runtime Error Modal**: Enhanced error reporting in development environment