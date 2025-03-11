# React CSharp app
This project implements a full-stack architecture using Clean Architecture principles. The application includes both a frontend (React + Next.js) and a backend (.NET Core).

##  Project Structure
The repository is divided into two main sections:

### Frontend (front/):
Built with React, Next.js, TypeScript, and ShadCN + TailwindCSS for UI components.

Built according to Clean Architecture structure:
- Presentation: Contains React components, pages, hooks, and schemas for the UI layer.
- Application: Contains frontend-specific application logic (e.g., services, utilities).
- Domain: Contains business logic and models.
- Infrastructure: Contains repository implementations, mappers, and API interfaces.

Dependency flow: App -> Presentation -> Application -> Domain <- Infrastructure.

# Backend (back/):

Built according to Clean Architecture structure:
- API: Exposes endpoints via controllers.
- Application: Contains DTOs, mapping profiles, and service interfaces for the backend.
- Domain: Defines entities, exceptions, and business logic services.
- Infrastructure: Contains database configurations, migrations, and repository implementations.

Both frontend and backend layers align with the Clean Architecture structure to ensure modularity, scalability, and testability (tests are not yet provided).

## Key Features
Frontend:
Next.js for SSR/SPA on demand and routing
shadcn components styled with Tailwind CSS
TypeScript
React Query and Axios to query backend

Main patterns: Repository, Anemic Domain Model

Backend:

.NET Core structure.
Uses dependency injection and separation of concerns
Pre-configured API for order management (create, read, etc.)
Utilizes Entity Framework Core for database management

Main patterns: Repository, Anemic Domain Model

## File Tree
```
├── back                       # Backend folder
│   ├── API                  # Exposes API endpoints (OrderController, etc.)
│   ├── Application          # Service interfaces and DTOs
│   ├── Domain               # Business logic and domain models
│   ├── Infrastructure       # Database access and configuration
├── front                      # Frontend folder
│   ├── src                    # Source folder for frontend app
│   │   ├── Application      # Frontend application logic
│   │   ├── Domain           # Models and business logic
│   │   ├── Infrastructure   # API services, repositories, etc.
│   │   ├── Presentation     # React components, hooks, and schemas
│   │   ├── app              # Next.js routes and entry points
│   │   ├── components       # Shared UI components (mainly from shadc)
├── docker-compose.yml       # Docker Compose for orchestration
├── LICENSE                  
└── README.md     
```
## Getting Started
Prerequisites

Docker: Ensure Docker is installed and running.
Node.js: At least version 22.x. (none other tested)
.NET Core SDK: Version 9.0+.
Database: (Optional) PostgreSQL pgAdmin.

> Warining!
Before proceeding, you should create .env file. There is a sample provided in the repo. And here:
```sh
POSTGRES_USER=mahUsername
POSTGRES_PASSWORD=mahPassword
POSTGRES_DB=appDb
HOST=localhost
PORT=5432
```

> Startup is meant to be done using docker!!

At the root of the project
```sh
docker compose up --build
```

## Conribution

Well, you can try
