# Architecture Overview

## 1. Overview

SaharaRealTech is a full-stack web application that enables blockchain-based real estate investment through tokenization. The platform allows users to invest in premium real estate properties with small amounts by dividing ownership into tokens on the Avalanche blockchain. The application provides property listings, investment analytics, portfolio management, and educational content about real estate tokenization.

## 2. System Architecture

The application follows a modern client-server architecture with a clear separation between frontend and backend:

```
┌─────────────────┐        ┌─────────────────┐        ┌────────────────┐
│                 │        │                 │        │                │
│  React Frontend │◄─────► │  Express Server │◄─────► │   PostgreSQL   │
│    (Client)     │  API   │    (Server)     │        │   Database     │
│                 │        │                 │        │                │
└─────────────────┘        └─────────────────┘        └────────────────┘
                                    ▲
                                    │
                           ┌────────┴─────────┐
                           │                  │
                           │    Avalanche     │
                           │   Blockchain     │
                           │                  │
                           └──────────────────┘
```

### Key Design Principles

1. **Modular Architecture**: The codebase is organized into modular components for easier maintenance.
2. **TypeScript Throughout**: Both frontend and backend use TypeScript for type safety and better developer experience.
3. **API-First Approach**: Well-defined API contract between frontend and backend.
4. **Internationalization**: Built-in support for multiple languages (Korean, English, Japanese).
5. **Schema Sharing**: Common schema definitions are shared between frontend and backend for consistency.

## 3. Key Components

### 3.1 Frontend Architecture

The frontend is built with React and uses a variety of modern libraries:

- **Framework**: React with TypeScript
- **Styling**: TailwindCSS with Shadcn UI components
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: React Query for server state, React hooks for local state
- **Form Handling**: React Hook Form with Zod validation
- **Visualization**: Recharts for data visualization

Key frontend directories:
- `client/src/pages`: Page components organized by feature
- `client/src/components`: Reusable UI components
- `client/src/hooks`: Custom React hooks
- `client/src/lib`: Utility functions and configurations
- `client/src/assets`: Static assets

### 3.2 Backend Architecture

The backend is built with Express.js and uses a modern TypeScript-based stack:

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless)
- **Authentication**: Session-based authentication with PostgreSQL session store
- **API Structure**: RESTful endpoints organized by domain

Key backend directories:
- `server/`: Contains all server-side code
- `server/routes.ts`: API route definitions
- `server/auth-routes.ts`: Authentication-related endpoints
- `server/services/`: Business logic organized by domain
- `server/db.ts`: Database connection configuration

### 3.3 Shared Code

- `shared/schema.ts`: Database schema definitions using Drizzle ORM, shared between frontend and backend
- Types and interfaces used by both client and server

## 4. Data Flow

### 4.1 Client-Server Communication

1. Frontend components make API requests using React Query
2. Express backend handles requests, applies business logic
3. Data is retrieved from or persisted to PostgreSQL database
4. Responses are sent back to the client

### 4.2 Authentication Flow

1. User credentials are validated through `/api/auth/login`
2. Server maintains session state using `express-session` with PostgreSQL store
3. Sessions are validated on protected routes
4. User information is accessible via `req.session` on the server

### 4.3 Blockchain Integration

1. Client connects to Avalanche blockchain via Web3 provider
2. Smart contracts handle tokenization of real estate assets
3. Transactions are signed by user wallets and recorded on the blockchain
4. Transaction history and token ownership are tracked and displayed in the UI

## 5. Database Schema

The application uses PostgreSQL with Drizzle ORM. Key schemas include:

1. **Users**: User accounts and authentication data
   - Fields: id, username, password, walletAddress, email, isVerified, role, lastLogin

2. **Properties**: Real estate property listings
   - Fields: id, name, nameEn, type (enum), tokenizationStatus, etc.

3. **Investments**: User investments in properties
   - Tracks which users have invested in which properties and the amount

4. **Transactions**: Record of all financial transactions
   - Tracks purchases, sales, and dividend distributions

5. **Blog Content**: Educational articles and news
   - Supports multiple languages (Korean, English, Japanese)

## 6. External Dependencies

### 6.1 Third-Party Services

1. **Avalanche Blockchain**: Primary blockchain platform for tokenization
   - Used for creating and managing real estate tokens
   - Smart contracts handle token distribution and management

2. **Financial APIs**: External APIs for financial data
   - Market indicators and investment analytics
   - Referenced in environment variables (`FINANCIAL_API_KEY`, `PROPERTY_API_KEY`)

### 6.2 Key Libraries

Frontend:
- Shadcn UI components (based on Radix UI)
- TailwindCSS for styling
- React Query for data fetching
- Recharts for data visualization

Backend:
- Express.js for API server
- Drizzle ORM for database operations
- Connect-PG-Simple for session storage

## 7. Deployment Strategy

The application is configured for deployment on Replit with the following strategy:

1. **Development Environment**:
   - Node.js 20
   - PostgreSQL 16
   - Development server with hot module reloading

2. **Production Build Process**:
   - Frontend: Vite builds optimized assets
   - Backend: esbuild bundles server code
   - Combined deployment with server serving static assets

3. **Containerization**:
   - Configured for autoscaling deployment
   - Exposed on port 80 (mapped from local port 5000)

4. **Database**:
   - Uses Neon serverless PostgreSQL
   - Connection string provided via environment variables

## 8. Security Considerations

1. **Authentication**: 
   - Password hashing using scrypt
   - Session-based authentication with secure cookies
   - Role-based access control (admin, manager, user roles)

2. **API Security**:
   - Input validation using Zod schemas
   - Protected routes require authentication

3. **Blockchain Security**:
   - User wallet connections required for transactions
   - Smart contract validation for ownership and transfers

## 9. Internationalization

The application supports multiple languages:
- Korean (default)
- English
- Japanese (partial)

Implementation uses i18next with structured translation files and language-specific content fields in the database.