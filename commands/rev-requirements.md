# rev-requirements

## Purpose

Reverse-generate requirements specification from existing codebase. Analyze implemented features and extract/document functional requirements, non-functional requirements, and user stories using EARS (Easy Approach to Requirements Syntax) notation.

## Prerequisites

- Target codebase for analysis exists
- `docs/reverse/` directory exists (create if not present)
- Preferably `rev-tasks.md` and `rev-design.md` have been executed beforehand

## Execution Instructions

1. **Feature Identification and Analysis**
   - Extract screen functionality from UI components
   - Identify business functionality from API endpoints
   - Estimate data requirements from database schemas
   - Verify expected behavior from test code

2. **User Story Reverse Engineering**
   - Estimate user intent from implemented features
   - Identify WHO (user types)
   - Extract WHAT (desired achievements)
   - Estimate WHY (value gained)

3. **Requirements Classification using EARS Notation**
   - **Normal Requirements (SHALL)**: Extract from standard feature implementations
   - **Conditional Requirements (WHEN/IF-THEN)**: Extract from conditional branching logic
   - **State Requirements (WHERE)**: Extract from state management implementations
   - **Optional Requirements (MAY)**: Extract from configurable features
   - **Constraint Requirements (MUST)**: Extract from validation・restriction logic

4. **Non-Functional Requirements Estimation**
   - Performance requirements: Estimate from implemented caching, optimizations
   - Security requirements: Extract from authentication・authorization implementations
   - Usability requirements: Extract from UI/UX implementations
   - Operational requirements: Extract from logging, monitoring implementations

5. **Edge Case Identification**
   - Extract exception handling requirements from error handling implementations
   - Extract boundary value requirements from validation implementations
   - Extract expected error cases from test cases

6. **Acceptance Criteria Generation**
   - Reverse-engineer acceptance criteria from implemented tests
   - Present unimplemented test cases as recommendations

7. **File Creation**
   - Save as `docs/reverse/{project-name}-requirements.md`

## Output Format Example

```markdown
# {Project Name} Requirements Specification (Reverse Generated)

## Analysis Overview

**Analysis Date**: {execution-date}
**Target Codebase**: {path}
**Extracted Requirements**: {functional-requirements-count} functional requirements, {non-functional-requirements-count} non-functional requirements
**Confidence Level**: {analysis-confidence} % (based on implementation coverage)

## System Overview

### Estimated System Purpose
{System purpose inferred from implemented features}

### Target Users
{User types estimated from UI components and features}

## User Stories

### Story 1: User Authentication
- **As** an unregistered・existing user
- **I want** to securely log into the system
- **So that** I can access personal information and services

**Implementation Evidence**: 
- `LoginForm.tsx` - Login form implementation
- `POST /auth/login` - Authentication API implementation
- `useAuth` hook - Authentication state management

### Story 2: {Other Stories}

{Additional user stories estimated from implemented features}

## Functional Requirements (EARS Notation)

### Normal Requirements

#### REQ-001: User Authentication
The system shall provide user login with valid email address and password.

**Implementation Evidence**: 
- `auth.service.ts:login()` method
- `POST /auth/login` endpoint
- JWT token generation implementation

#### REQ-002: Session Management
The system shall manage user sessions after login.

**Implementation Evidence**:
- JWT token-based session management
- State management with `useAuth` hook
- Token persistence in local storage

### Conditional Requirements

#### REQ-101: Authentication Failure Handling
When invalid authentication credentials are provided, the system shall display appropriate error messages.

**Implementation Evidence**:
- Error handling in `auth.controller.ts`
- Error display implementation in `LoginForm.tsx`

#### REQ-102: Token Expiration Handling
When JWT token expires, the system shall redirect users to the re-login page.

**Implementation Evidence**:
- 401 error handling in `axios.interceptors`
- Automatic logout feature implementation

### State Requirements

#### REQ-201: Logged-in State Display
When users are in logged-in state, the system shall display UI for authenticated users.

**Implementation Evidence**:
- Authentication state verification with `useAuth` hook
- Conditional rendering based on authentication state

### Optional Requirements

#### REQ-301: Login State Persistence
The system may remember user login state.

**Implementation Evidence**:
- Token storage in local storage
- Automatic login feature implementation

### Constraint Requirements

#### REQ-401: Password Requirements
The system must enforce a minimum 8-character constraint on passwords.

**Implementation Evidence**:
- Frontend validation implementation
- Constraint definition in `yup` schema

#### REQ-402: Rate Limiting
The system must enforce rate limiting on login attempts.

**Implementation Evidence**:
- `express-rate-limit` middleware implementation

## Non-Functional Requirements

### Performance

#### NFR-001: Login Response Time
The system must complete normal login processing within 2 seconds.

**Implementation Evidence**:
- Database index configuration
- Efficient query implementation

#### NFR-002: Concurrent Users
The system must handle access from 100 concurrent users.

**Estimation Evidence**:
- Connection pool configuration
- Server configuration

### Security

#### NFR-101: Authentication Token Encryption
The system must properly encrypt JWT tokens.

**Implementation Evidence**:
- Use of `jsonwebtoken` library
- Signature implementation with secret key

#### NFR-102: HTTPS Communication
The system must enforce HTTPS communication in production environment.

**Implementation Evidence**:
- SSL configuration files
- HTTPS redirect implementation

### Usability

#### NFR-201: Responsive Design
The system must be usable on mobile devices.

**Implementation Evidence**:
- CSS media query implementation
- Responsive UI components

#### NFR-202: Accessibility
The system must meet basic accessibility requirements.

**Implementation Evidence**:
- Use of ARIA attributes
- Semantic HTML structure

### Operability

#### NFR-301: Log Output
The system must log important operations.

**Implementation Evidence**:
- Use of `winston` logging library
- Structured logging implementation

#### NFR-302: Error Tracking
The system must be able to track errors that occur.

**Implementation Evidence**:
- Error handling implementation
- Tracking functionality through log output

## Edge Cases

### Error Handling

#### EDGE-001: Network Failures
Retry processing when network connection is unstable

**Implementation Evidence**:
- `axios` retry configuration
- Error toast display

#### EDGE-002: Server Down
Processing when backend server is unavailable

**Implementation Evidence**:
- Fallback functionality
- Error page display

### Boundary Values

#### EDGE-101: Maximum Character Limit
Maximum character limit for input fields

**Implementation Evidence**:
- Form validation implementation
- Database constraints

#### EDGE-102: Empty String・Null Value Handling
Appropriate handling of empty strings and null values

**Implementation Evidence**:
- Validation implementation
- Default value configuration

## Acceptance Criteria

### Implemented Feature Tests

- [x] User login functionality
  - [x] Successful login with valid credentials
  - [x] Login failure with invalid credentials
  - [x] Appropriate error message display
- [x] Session management functionality
  - [x] Login state maintenance
  - [x] Logout functionality
  - [x] Token expiration handling

### Recommended Additional Tests

- [ ] **Performance Tests**
  - [ ] Login response time measurement
  - [ ] Concurrent access load testing
- [ ] **Security Tests**
  - [ ] SQL injection countermeasure testing
  - [ ] XSS countermeasure testing
  - [ ] CSRF countermeasure testing
- [ ] **Accessibility Tests**
  - [ ] Screen reader support testing
  - [ ] Keyboard operation testing

## Unestimated Requirements

### Unclear Areas

The following requirements are difficult to estimate from implementation and require stakeholder confirmation:

1. **Business Requirements**
   - Detailed system usage purpose
   - Detailed target user attributes
   - Revenue model and business objectives

2. **Operational Requirements**
   - Backup・recovery requirements
   - SLA (Service Level Agreement)
   - Monitoring・alert requirements

3. **Legal・Compliance Requirements**
   - Data protection regulation compliance
   - Industry-specific regulatory requirements

### Recommended Next Steps

1. **Stakeholder Interviews** - Confirm estimated requirements
2. **Usability Testing** - Confirm actual usability requirements
3. **Performance Testing** - Verify non-functional requirements
4. **Security Audit** - Detailed verification of security requirements

## Analysis Limitations

### Factors Affecting Confidence Level

- **Lack of Comments**: Supplement developer intent with estimation
- **Test Coverage**: {%}% - Requirements for untested parts are estimated
- **Lack of Documentation**: No external specification documents exist
- **Legacy Code**: Difficulty in estimation due to old implementation patterns

### Estimation Evidence Levels

- **Strong Evidence**: Implementation + Tests + Clear behavior
- **Medium Evidence**: Implementation + Partial tests
- **Weak Evidence**: Implementation only, supplemented with estimation

```

## Requirements Extraction Algorithm

### 1. Functional Requirements Extraction Process

```
1. API endpoints → Business functional requirements
2. UI components → User interface requirements
3. Database schemas → Data requirements
4. Validation implementations → Constraint requirements
5. Conditional branching → Conditional requirements
```

### 2. Non-Functional Requirements Estimation Process

```
1. Configuration files + Libraries → Performance・Security requirements
2. UI implementation patterns → Usability requirements
3. Logging・monitoring implementations → Operational requirements
4. Test implementations → Quality requirements
```

### 3. User Story Reverse Engineering Process

```
1. Screen transition flows → User journeys
2. Forms・input fields → User actions
3. Data CRUD operations → User needs
4. Permission・role implementations → User types
```

## Command Execution Examples

```bash
# Full analysis (extract all requirements)
claude code rev-requirements

# Extract specific requirement categories only
claude code rev-requirements --target functional
claude code rev-requirements --target non-functional
claude code rev-requirements --target user-stories

# Confidence level filter
claude code rev-requirements --confidence high
claude code rev-requirements --confidence medium

# Analyze specific directory
claude code rev-requirements --path ./src

# Specify output format
claude code rev-requirements --format markdown,json
```

## Post-Execution Verification

- Display number of extracted requirements (functional・non-functional requirements)
- Report analysis confidence level and evidence strength
- Present requirements that are difficult to estimate and items requiring confirmation
- Generate question list for stakeholder confirmation
- Suggest next recommended actions (test additions, documentation organization, etc.) 