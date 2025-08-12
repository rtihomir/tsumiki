# rev-specs

## Purpose

Reverse-generate comprehensive test cases and specifications from existing codebase. Analyze implemented business logic, API behavior, and UI component behavior to identify and generate missing test cases and document them as specifications.

## Prerequisites

- Target codebase for analysis exists
- `docs/reverse/` directory exists (create if not present)
- Preferably `rev-requirements.md`, `rev-design.md` have been executed beforehand

## Execution Instructions

1. **Existing Test Analysis**
   - Verify unit test implementation status
   - Verify integration test implementation status
   - Verify E2E test implementation status
   - Measure test coverage

2. **Test Case Reverse Generation from Implementation Code**
   - Generate test cases from function・method arguments・return values
   - Generate boundary value tests from conditional branches
   - Generate exception handling tests from error handling
   - Generate data tests from database operations

3. **Test Case Generation from API Specifications**
   - Normal case tests for each endpoint
   - Authentication・authorization tests
   - Validation error tests
   - HTTP status code tests

4. **Test Case Generation from UI Components**
   - Component rendering tests
   - User interaction tests
   - State change tests
   - Property change tests

5. **Performance・Security Test Case Generation**
   - Load test scenarios
   - Security vulnerability tests
   - Response time tests

6. **Test Specification Generation**
   - Test plans
   - Test case lists
   - Test environment specifications
   - Test procedures

7. **File Creation**
   - `docs/reverse/{project-name}-test-specs.md` - Test specifications
   - `docs/reverse/{project-name}-test-cases.md` - Test case list
   - `docs/reverse/tests/` - Generated test code

## Output Format Examples

### test-specs.md

```markdown
# {Project Name} Test Specifications (Reverse Generated)

## Analysis Overview

**Analysis Date**: {execution-date}
**Target Codebase**: {path}
**Test Coverage**: {current-coverage}%
**Generated Test Cases**: {generated-count} cases
**Recommended Implementation Tests**: {recommended-count} cases

## Current Test Implementation Status

### Test Frameworks
- **Unit Tests**: {Jest/Vitest/pytest etc.}
- **Integration Tests**: {Supertest/TestContainers etc.}
- **E2E Tests**: {Cypress/Playwright etc.}
- **Code Coverage**: {istanbul/c8 etc.}

### Test Coverage Details

| File/Directory | Line Coverage | Branch Coverage | Function Coverage |
|----------------|---------------|-----------------|-------------------|
| src/auth/ | 85% | 75% | 90% |
| src/users/ | 60% | 45% | 70% |
| src/components/ | 40% | 30% | 50% |
| **Overall** | **65%** | **55%** | **75%** |

### Test Category Implementation Status

#### Unit Tests
- [x] **Authentication Service**: auth.service.spec.ts
- [x] **User Service**: user.service.spec.ts
- [ ] **Data Transformation Utilities**: Not implemented
- [ ] **Validation Helpers**: Not implemented

#### Integration Tests
- [x] **Authentication API**: auth.controller.spec.ts
- [ ] **User Management API**: Not implemented
- [ ] **Database Operations**: Not implemented

#### E2E Tests
- [ ] **User Login Flow**: Not implemented
- [ ] **Data Operation Flow**: Not implemented
- [ ] **Error Handling**: Not implemented

## Generated Test Cases

### API Test Cases

#### POST /auth/login - Login Authentication

**Normal Case Tests**
```typescript
describe('POST /auth/login', () => {
  it('Login success with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user.email).toBe('test@example.com');
  });

  it('JWT token returned in correct format', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(validCredentials);
    
    const token = response.body.data.token;
    expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });
});
```

**Exception Case Tests**
```typescript
describe('POST /auth/login - Exception Cases', () => {
  it('Error with invalid email address', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'invalid-email',
        password: 'password123'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('Error with non-existent user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
  });

  it('Error with wrong password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
  });
});
```

**Boundary Value Tests**
```typescript
describe('POST /auth/login - Boundary Values', () => {
  it('Test with minimum character password', async () => {
    // 8 characters (minimum requirement)
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: '12345678'
      });
    
    expect(response.status).toBe(200);
  });

  it('Test with maximum character email address', async () => {
    // 255 characters (maximum requirement)
    const longEmail = 'a'.repeat(243) + '@example.com';
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: longEmail,
        password: 'password123'
      });
    
    expect(response.status).toBe(400);
  });
});
```

### UI Component Test Cases

#### LoginForm Component

**Rendering Tests**
```typescript
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('Required elements are displayed', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('Error messages hidden in initial state', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    expect(screen.queryByText(/Error/)).not.toBeInTheDocument();
  });
});
```

**User Interaction Tests**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm - User Interactions', () => {
  it('onSubmit called when form submitted', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Email Address'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('Not submitted when validation error occurs', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
  });
});
```

### Service Layer Test Cases

#### AuthService Unit Tests

```typescript
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

jest.mock('./user.repository');

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService(mockUserRepository);
  });

  describe('login', () => {
    it('Return user info and token with valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        hashedPassword: 'hashed_password'
      };
      
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(authService, 'verifyPassword').mockResolvedValue(true);
      jest.spyOn(authService, 'generateToken').mockReturnValue('mock_token');

      const result = await authService.login('test@example.com', 'password');

      expect(result).toEqual({
        user: { id: '1', email: 'test@example.com' },
        token: 'mock_token'
      });
    });

    it('Throw error with non-existent user', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login('nonexistent@example.com', 'password')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
```

## Performance Test Cases

### Load Tests

```typescript
describe('Performance Tests', () => {
  it('Login API - 100 concurrent connections test', async () => {
    const promises = Array.from({ length: 100 }, () =>
      request(app).post('/auth/login').send(validCredentials)
    );

    const startTime = Date.now();
    const responses = await Promise.all(promises);
    const endTime = Date.now();

    // All requests successful
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });

    // Response time within 5 seconds
    expect(endTime - startTime).toBeLessThan(5000);
  });

  it('Database - Large data search performance', async () => {
    // Create 1000 test data records
    await createTestData(1000);

    const startTime = Date.now();
    const response = await request(app)
      .get('/users')
      .query({ limit: 100, offset: 0 });
    const endTime = Date.now();

    expect(response.status).toBe(200);
    expect(endTime - startTime).toBeLessThan(1000); // Within 1 second
  });
});
```

### Security Tests

```typescript
describe('Security Tests', () => {
  it('SQL injection countermeasures', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: maliciousInput,
        password: 'password'
      });

    // System operates normally and database is not corrupted
    expect(response.status).toBe(400);
    
    // Verify users table still exists
    const usersResponse = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + validToken);
    expect(usersResponse.status).not.toBe(500);
  });

  it('XSS countermeasures', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    const response = await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + validToken)
      .send({
        name: xssPayload,
        email: 'test@example.com'
      });

    // Script is escaped in response
    expect(response.body.data.name).not.toContain('<script>');
    expect(response.body.data.name).toContain('&lt;script&gt;');
  });
});
```

## E2E Test Cases

### Playwright/Cypress Test Scenarios

```typescript
// User login flow E2E test
describe('User Login Flow', () => {
  it('Normal login to dashboard display', async () => {
    await page.goto('/login');
    
    // Login form input
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Redirect to dashboard
    await page.waitForURL('/dashboard');
    
    // Verify user info display
    await expect(page.locator('[data-testid="user-name"]')).toContainText('Test User');
    
    // Verify logout function
    await page.click('[data-testid="logout-button"]');
    await page.waitForURL('/login');
  });

  it('Error display on login failure', async () => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'wrong@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    // Verify error message display
    await expect(page.locator('[data-testid="error-message"]'))
      .toContainText('Authentication credentials are incorrect');
  });
});
```

## Test Environment Configuration

### Database Test Configuration

```typescript
// Test database configuration
beforeAll(async () => {
  // Test database connection
  await setupTestDatabase();
  
  // Run migrations
  await runMigrations();
});

beforeEach(async () => {
  // Cleanup data before each test
  await cleanupDatabase();
  
  // Seed basic test data
  await seedTestData();
});

afterAll(async () => {
  // Disconnect test database
  await teardownTestDatabase();
});
```

### Mock Configuration

```typescript
// External service mocks
jest.mock('./email.service', () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue(true)
  }))
}));

// Environment variable mocks
process.env.JWT_SECRET = 'test-secret';
process.env.NODE_ENV = 'test';
```

## Missing Test Priorities

### High Priority (Immediate implementation recommended)
1. **E2E Test Suite** - Guarantee overall user flow operation
2. **API Integration Tests** - Test entire backend API
3. **Security Tests** - Verify vulnerability countermeasures

### Medium Priority (Implement in next sprint)
1. **Performance Tests** - Load・response time tests
2. **UI Component Tests** - Frontend operation guarantee
3. **Database Tests** - Data integrity tests

### Low Priority (Implement as continuous improvement)
1. **Browser Compatibility Tests** - Operation verification across multiple browsers
2. **Accessibility Tests** - a11y compliance verification
3. **Internationalization Tests** - Multi-language support verification

```

### test-cases.md

```markdown
# {Project Name} Test Case List (Reverse Generated)

## Test Case Overview

| ID | Test Name | Category | Priority | Implementation Status | Estimated Effort |
|----|-----------|----------|----------|----------------------|------------------|
| TC-001 | Login Normal Case | API | High | ✅ | 2h |
| TC-002 | Login Exception Cases | API | High | ✅ | 3h |
| TC-003 | E2E Login Flow | E2E | High | ❌ | 4h |
| TC-004 | Performance Load Test | Performance | Medium | ❌ | 6h |

## Detailed Test Cases

### TC-001: Login API Normal Case Test

**Test Purpose**: Verify login functionality with valid credentials

**Preconditions**:
- Test user exists in database
- Password is correctly hashed

**Test Steps**:
1. Send request to POST /auth/login
2. Send JSON with valid email, password
3. Verify response

**Expected Results**:
- HTTP Status: 200
- success: true
- data.token: JWT format token
- data.user: User information

**Implementation File**: `auth.controller.spec.ts`

### TC-002: Login API Exception Case Test

**Test Purpose**: Verify appropriate error handling with invalid credentials

**Test Cases**:
1. Non-existent email address
2. Invalid password
3. Invalid email format
4. Empty string・null values
5. SQL injection attacks

**Expected Results**:
- Appropriate HTTP status codes
- Unified error response format
- No security vulnerabilities

**Implementation Status**: ✅ Partially implemented

```

## Test Code Generation Algorithm

### 1. Test Case Extraction through Static Analysis

```
1. Function signature analysis → Argument・return value test cases
2. Conditional branch analysis → Branch coverage test cases
3. Exception handling analysis → Exception case test cases
4. Database access analysis → Data test cases
```

### 2. Test Generation through Dynamic Analysis

```
1. API call logs → Actual usage pattern tests
2. User operation logs → E2E test scenarios
3. Performance logs → Load test scenarios
```

### 3. Test Coverage Gap Analysis

```
1. Current coverage measurement
2. Identify untested lines・branches
3. Identify critical paths
4. Risk-based prioritization
```

## Command Execution Examples

```bash
# Full analysis (generate all test cases)
claude code rev-specs

# Generate specific test categories only
claude code rev-specs --type unit
claude code rev-specs --type integration
claude code rev-specs --type e2e

# Target specific files/directories
claude code rev-specs --path ./src/auth

# Actually generate and output test code
claude code rev-specs --generate-code

# Analyze with coverage report
claude code rev-specs --with-coverage

# Priority filtering
claude code rev-specs --priority high
```

## Post-Execution Verification

- Display detailed report of current test coverage and missing areas
- Display number of generated test cases and estimated implementation effort
- Present prioritized implementation recommendation list
- Suggest test environment configuration requirements and recommended tools
- Present CI/CD pipeline integration proposals 