# kairo-design

## Purpose

Generate technical design documentation based on approved requirements specifications. Create comprehensive design including data flow diagrams, TypeScript interfaces, database schemas, and API endpoints.

## Prerequisites

- Requirements specification exists in `docs/spec/`
- Requirements have been approved by user

## Execution Instructions

**【Reliability Level Instructions】**:
For each item, comment on the verification status against source materials (including EARS requirements and design documents) using these signals:

- 🟢 **Green Light**: Almost no inference when referencing EARS requirements specification and design documents
- 🟡 **Yellow Light**: Reasonable inference from EARS requirements specification and design documents
- 🔴 **Red Light**: Inference not based on EARS requirements specification and design documents

1. **Requirements Analysis**
   - Search for requirements specifications using @agent-symbol-searcher and read found files with Read tool
   - Check related existing design documents using @agent-symbol-searcher and read found files with Read tool
   - Organize functional and non-functional requirements
   - Clarify system boundaries

2. **Architecture Design**
   - Determine overall system architecture
   - Frontend/backend separation
   - Consider necessity of microservices

3. **Data Flow Diagram Creation**
   - Visualize data flow using Mermaid notation
   - User interaction flow
   - Data flow between systems

4. **TypeScript Interface Definition**
   - Entity type definitions
   - API request/response type definitions
   - Common type definitions

5. **Database Schema Design**
   - Table definitions
   - Relationships
   - Index strategy
   - Normalization level determination

6. **API Endpoint Design**
   - RESTful API design
   - Endpoint naming conventions
   - Appropriate use of HTTP methods
   - Request/response structure

7. **File Creation**
   - Create the following in `docs/design/{requirement-name}/` directory:
     - `architecture.md` - Architecture overview
     - `dataflow.md` - Data flow diagrams
     - `interfaces.ts` - TypeScript type definitions
     - `database-schema.sql` - DB schema
     - `api-endpoints.md` - API specifications

## Output Format Examples

### architecture.md

```markdown
# {Requirement Name} Architecture Design

## System Overview

{System overview description}

## Architecture Pattern

- Pattern: {Selected pattern}
- Reason: {Selection rationale}

## Component Structure

### Frontend

- Framework: {Framework used}
- State Management: {State management approach}

### Backend

- Framework: {Framework used}
- Authentication: {Authentication method}

### Database

- DBMS: {DBMS used}
- Cache: {Cache strategy}
```

### dataflow.md

```markdown
# Data Flow Diagrams

## User Interaction Flow

\`\`\`mermaid
flowchart TD
A[User] --> B[Frontend]
B --> C[API Gateway]
C --> D[Backend]
D --> E[Database]
\`\`\`

## Data Processing Flow

\`\`\`mermaid
sequenceDiagram
participant U as User
participant F as Frontend
participant B as Backend
participant D as Database

    U->>F: Action
    F->>B: API Request
    B->>D: Execute Query
    D-->>B: Return Result
    B-->>F: Response
    F-->>U: Update Screen

\`\`\`
```

### interfaces.ts

```typescript
// エンティティ定義
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// APIリクエスト/レスポンス
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```

### database-schema.sql

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
```

### api-endpoints.md

```markdown
# API Endpoint Specifications

## Authentication

### POST /auth/login

Request:
\`\`\`json
{
"email": "user@example.com",
"password": "password"
}
\`\`\`

Response:
\`\`\`json
{
"success": true,
"data": {
"token": "jwt-token",
"user": { ... }
}
}
\`\`\`

## User Management

### GET /users/:id

### POST /users

### PUT /users/:id

### DELETE /users/:id
```

## Post-Execution Verification

- Verify consistency between created design and existing system using @agent-symbol-searcher
- Display list of created files
- Show summary of main design points
- Display message prompting user confirmation
