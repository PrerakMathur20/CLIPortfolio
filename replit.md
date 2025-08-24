# Overview

This is a personal portfolio website for Prerak Mathur, Software Development Engineer II at Walmart Global Tech. The application features a unique dual-mode interface that allows users to explore the portfolio either through a command-line interface (CLI) or a modern graphical user interface (GUI), complete with Matrix-style transitions between modes.

The portfolio showcases career history, projects, education, skills, achievements, and contact information in an interactive format that appeals to both technical and non-technical audiences.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a dark Matrix-inspired design
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, pre-built components
- **Animations**: Framer Motion for smooth transitions and Matrix-style visual effects
- **State Management**: React hooks with custom terminal hook for CLI functionality

## Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints and static file serving
- **Development Setup**: Vite for fast development builds and hot module replacement
- **Build Process**: ESBuild for production bundling with separate client and server builds

## Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Database**: PostgreSQL (configured via Neon serverless driver)
- **Schema Management**: Drizzle migrations with schema definitions in TypeScript
- **Development Storage**: In-memory storage class for development/testing purposes

## Key Features
- **Dual Interface**: Toggle between CLI and GUI modes with Matrix transition effects
- **Interactive Terminal**: Custom terminal implementation with command history, auto-completion, and file system navigation metaphors
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Type Safety**: Full TypeScript implementation across frontend and backend

## Development Tools
- **Build System**: Vite with React plugin and runtime error overlay for development
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Path Aliases**: Configured module resolution for clean imports

# External Dependencies

## Core Frameworks
- **React & React DOM**: Frontend framework and rendering
- **Express.js**: Backend web server framework
- **Vite**: Build tool and development server

## Database & ORM
- **Drizzle ORM**: Type-safe database operations and migrations
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **Drizzle-Zod**: Schema validation integration

## UI Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for transitions and effects

## Development Tools
- **TypeScript**: Type checking and development experience
- **@tanstack/react-query**: Server state management and data fetching
- **Wouter**: Lightweight client-side routing
- **ESBuild**: Fast JavaScript bundler for production

## Utilities
- **Zod**: Schema validation and type inference
- **date-fns**: Date manipulation utilities
- **clsx & class-variance-authority**: Conditional CSS class management
- **React Hook Form**: Form state management with validation