# rev-design

## Purpose

Reverse-generate technical design documentation from existing codebase. Analyze implemented architecture, data flow, API specifications, database schemas, and TypeScript interfaces and document them as design specifications.

## Prerequisites

- Target codebase for analysis exists
- `docs/reverse/` directory exists (create if not present)
- Preferably `rev-tasks.md` has been executed beforehand

## Execution Instructions

1. **Architecture Analysis**
   - Identify architecture patterns from project structure
   - Verify layer composition (MVC, Clean Architecture, etc.)
   - Check for microservice composition
   - Assess frontend/backend separation status

2. **Data Flow Extraction**
   - User interaction flows
   - API call flows
   - Database access patterns
   - State management flows

3. **API Specification Extraction**
   - Generate endpoint listings
   - Analyze request/response structures
   - Verify authentication・authorization methods
   - Error response formats

4. **Database Schema Reverse Generation**
   - Extract table definitions
   - Analyze relationships
   - Verify index configurations
   - Extract constraint conditions

5. **TypeScript Type Definition Organization**
   - Extract entity types
   - Extract API types
   - Organize common types
   - Analyze type dependencies

6. **Component Design Analysis**
   - UI component hierarchy
   - Props interfaces
   - State management design
   - Routing design

7. **File Creation**
   - `docs/reverse/{project-name}-architecture.md` - Architecture overview
   - `docs/reverse/{project-name}-dataflow.md` - Data flow diagrams
   - `docs/reverse/{project-name}-api-specs.md` - API specifications
   - `docs/reverse/{project-name}-database.md` - DB design
   - `docs/reverse/{project-name}-interfaces.ts` - Type definition aggregation

## Output Format Examples

### architecture.md

```markdown
# {Project Name} Architecture Design (Reverse Generated)

## Analysis Date
{execution-date}

## System Overview

### Implemented Architecture
- **Pattern**: {identified-architecture-pattern}
- **Framework**: {used-framework}
- **Configuration**: {discovered-configuration}

### Technology Stack

#### Frontend
- **Framework**: {React/Vue/Angular etc.}
- **State Management**: {Redux/Zustand/Pinia etc.}
- **UI Library**: {Material-UI/Ant Design etc.}
- **Styling**: {CSS Modules/styled-components etc.}

#### Backend
- **Framework**: {Express/NestJS/FastAPI etc.}
- **Authentication**: {JWT/Session/OAuth etc.}
- **ORM/Data Access**: {TypeORM/Prisma/Sequelize etc.}
- **Validation**: {Joi/Yup/zod etc.}

#### Database
- **DBMS**: {PostgreSQL/MySQL/MongoDB etc.}
- **Cache**: {Redis/Memcached etc. or none}
- **Connection Pool**: {whether implemented}

#### Infrastructure・Tools
- **Build Tools**: {Webpack/Vite/Rollup etc.}
- **Test Framework**: {Jest/Vitest/Pytest etc.}
- **Code Quality**: {ESLint/Prettier/SonarQube etc.}

## Layer Configuration

### Discovered Layers
```
{actual-directory-structure}
```

### Layer Responsibility Analysis
- **Presentation Layer**: {implementation-status}
- **Application Layer**: {implementation-status}
- **Domain Layer**: {implementation-status}
- **Infrastructure Layer**: {implementation-status}

## Design Patterns

### Discovered Patterns
- **Dependency Injection**: {whether-implemented}
- **Repository Pattern**: {whether-implemented}
- **Factory Pattern**: {usage-locations}
- **Observer Pattern**: {usage-locations}
- **Strategy Pattern**: {usage-locations}

## Non-Functional Requirements Implementation Status

### Security
- **Authentication**: {implementation-method}
- **Authorization**: {implementation-method}
- **CORS Configuration**: {configuration-status}
- **HTTPS Support**: {support-status}

### Performance
- **Cache**: {implementation-status}
- **Database Optimization**: {indexes etc.}
- **CDN**: {usage-status}
- **Image Optimization**: {implementation-status}

### Operations・Monitoring
- **Log Output**: {implementation-status}
- **Error Tracking**: {implementation-status}
- **Metrics Collection**: {implementation-status}
- **Health Checks**: {implementation-status}
```

### dataflow.md

```markdown
# Data Flow Diagrams (Reverse Generated)

## User Interaction Flow

### Authentication Flow
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    U->>F: Enter login information
    F->>B: POST /auth/login
    B->>D: User verification
    D-->>B: User information
    B-->>F: JWT token
    F-->>U: Login complete
\`\`\`

### Data Retrieval Flow
\`\`\`mermaid
flowchart TD
    A[User Action] --> B[React Component]
    B --> C[useQuery Hook]
    C --> D[Axios HTTP Client]
    D --> E[API Gateway/Express]
    E --> F[Controller]
    F --> G[Service Layer]
    G --> H[Repository Layer]
    H --> I[Database]
    I --> H
    H --> G
    G --> F
    F --> E
    E --> D
    D --> C
    C --> B
    B --> J[UI Update]
\`\`\`

## State Management Flow

### {Used State Management Library} Flow
\`\`\`mermaid
flowchart LR
    A[Component] --> B[Action Dispatch]
    B --> C[Reducer/Store]
    C --> D[State Update]
    D --> A
\`\`\`

## Error Handling Flow

\`\`\`mermaid
flowchart TD
    A[Error Occurs] --> B{Error Type}
    B -->|Authentication Error| C[Redirect to Login]
    B -->|Network Error| D[Retry Function]
    B -->|Validation Error| E[Form Error Display]
    B -->|Server Error| F[Error Toast Display]
\`\`\`
```

### api-specs.md

```markdown
# API Specification (Reverse Generated)

## Base URL
\`{discovered-base-url}\`

## Authentication Method
{details-of-discovered-authentication-method}

## Endpoint List

### Authentication Related

#### POST /auth/login
**Description**: User login

**Request**:
\`\`\`typescript
{
  email: string;
  password: string;
}
\`\`\`

**Response**:
\`\`\`typescript
{
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    }
  };
}
\`\`\`

**Error Response**:
\`\`\`typescript
{
  success: false;
  error: {
    code: string;
    message: string;
  }
}
\`\`\`

#### POST /auth/logout
**Description**: User logout

**Headers**:
\`\`\`
Authorization: Bearer {token}
\`\`\`

### {Other Endpoints}

## Error Code List

| Code | Message | Description |
|------|---------|-------------|
| AUTH_001 | Invalid credentials | Authentication information is invalid |
| AUTH_002 | Token expired | Token has expired |
| VALID_001 | Validation failed | Validation error |

## Common Response Format

### Success Response
\`\`\`typescript
{
  success: true;
  data: T; // Type varies by endpoint
}
\`\`\`

### Error Response
\`\`\`typescript
{
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
\`\`\`
```

### database.md

```markdown
# Database Design (Reverse Generated)

## Schema Overview

### Table List
{discovered-table-list}

### ER Diagram
\`\`\`mermaid
erDiagram
    USERS {
        uuid id PK
        varchar email UK
        varchar name
        timestamp created_at
        timestamp updated_at
    }
    
    POSTS {
        uuid id PK
        uuid user_id FK
        varchar title
        text content
        timestamp created_at
        timestamp updated_at
    }
    
    USERS ||--o{ POSTS : creates
\`\`\`

## Table Details

### users table
\`\`\`sql
{actual-CREATE-TABLE-statement}
\`\`\`

**Column Descriptions**:
- \`id\`: {description}
- \`email\`: {description}
- \`name\`: {description}

**Indexes**:
- \`idx_users_email\`: For email column search

### {Other Tables}

## Constraints・Relationships

### Foreign Key Constraints
{discovered-foreign-key-constraints}

### Unique Constraints
{discovered-unique-constraints}

## Data Access Patterns

### Frequently Used Queries
{query-patterns-discovered-from-code}

### Performance Considerations
{discovered-index-strategies}
```

### interfaces.ts

```typescript
// ======================
// エンティティ型定義
// ======================

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

// ======================
// API型定義
// ======================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// ======================
// コンポーネントProps型
// ======================

export interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void;
  loading?: boolean;
  error?: string;
}

// ======================
// 状態管理型
// ======================

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// ======================
// 設定型
// ======================

export interface AppConfig {
  apiBaseUrl: string;
  tokenStorageKey: string;
  supportedLanguages: string[];
}
```

## Analysis Algorithm

### 1. File Scanning・Pattern Matching
- Function・class・interface extraction through AST analysis
- Configuration file analysis using regular expressions
- Architecture estimation from directory structure

### 2. Automatic API Specification Generation
- Express/NestJS route definition analysis
- FastAPI schema definition analysis
- Request/response estimation from TypeScript type definitions

### 3. Database Schema Extraction
- Migration file analysis
- ORM model definition analysis
- SQL file analysis

## Command Execution Examples

```bash
# Full analysis (generate all design documents)
claude code rev-design

# Generate specific design documents only
claude code rev-design --target architecture
claude code rev-design --target api
claude code rev-design --target database

# Analyze specific directory
claude code rev-design --path ./backend

# Specify output format
claude code rev-design --format markdown,openapi
```

## Post-Execution Verification

- Display list of generated design document files
- Display statistical information such as number of extracted APIs, tables, type definitions, etc.
- Present missing design elements and recommended improvements
- Suggest next reverse engineering steps (requirements definition generation, etc.) 