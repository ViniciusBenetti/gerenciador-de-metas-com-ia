# Overview

This is a full-stack React application with an Express.js backend that provides user authentication functionality. The app features a modern, responsive authentication interface built with React, TypeScript, and Tailwind CSS, using shadcn/ui components for the UI. The backend is set up to handle authentication via an external API service, with Drizzle ORM configured for PostgreSQL database operations and session management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API interactions
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod validation schemas
- **Theme System**: Custom theme provider supporting light/dark modes with localStorage persistence

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Setup**: tsx for TypeScript execution in development
- **Build Process**: esbuild for production bundling with ESM format
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Error Handling**: Centralized error middleware with proper status codes
- **Development Tools**: Vite integration for hot module replacement and development server

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with migration support
- **Database**: PostgreSQL (configured for Neon Database serverless)
- **Session Management**: connect-pg-simple for PostgreSQL-backed session storage
- **Schema Validation**: Zod schemas shared between frontend and backend
- **Migration Strategy**: Drizzle Kit for database schema migrations

## Authentication System
- **External Authentication**: Integration with vinixodin.com API for user registration and login
- **Form Validation**: Client-side validation using Zod schemas with email and password requirements
- **Error Handling**: Toast notifications for authentication feedback
- **Session Persistence**: Configured session storage (not currently requiring persistence on app exit)

## Development Features
- **Hot Reload**: Vite development server with React Fast Refresh
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: Consistent import aliases and path resolution
- **Development Tools**: Runtime error overlay and development banner for Replit environment
- **Build Optimization**: Separate client and server build processes with proper asset handling

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **express**: Node.js web framework for backend API

## Database & ORM
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Migration and schema management tooling
- **@neondatabase/serverless**: Neon Database serverless driver
- **connect-pg-simple**: PostgreSQL session store for Express

## UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class name utilities

## Form & Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolver for Zod integration
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas

## External Services
- **vinixodin.com API**: External authentication service for user registration and login
- **PostgreSQL Database**: Primary data storage (configured for Neon serverless)

## Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements