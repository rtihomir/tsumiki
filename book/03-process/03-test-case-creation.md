# 3.3 Test Case Creation

## Importance of Test Case Creation

In AITDD, test cases are crucial elements that determine implementation quality. Since the quality of AI-generated code heavily depends on the comprehensiveness and accuracy of test cases, designing comprehensive test cases at this stage is important.

## Principles of Test Case Design

### 1. Ensuring Comprehensiveness

#### Functional Comprehensiveness
- **Normal cases**: All expected behaviors
- **Error cases**: Error handling and validation
- **Boundary values**: Boundary conditions for input values
- **Edge cases**: Special conditions and exceptional situations

#### Test Level Comprehensiveness
- **Unit tests**: Testing individual functions and methods
- **Integration tests**: Testing component interactions
- **End-to-end tests**: Complete execution of user scenarios

### 2. Clear and Specific Expected Values

```markdown
❌ Bad example: "An error should occur"
✅ Good example: "Status code 400 and error message 'Email already exists' should be returned"
```

### 3. Independence and Reproducibility
- Each test case can be executed independently
- Not dependent on test execution order
- Not dependent on external environment

## Standard Format for Test Case Documents

### Basic Template

```markdown
# [Feature Name] Test Case Specification

## Test Overview
- **Target Feature**: Name of the feature being tested
- **Test Purpose**: What is being verified
- **Prerequisites**: Prerequisites for test execution

## Test Case List

### TC001: [Test Case Name]
- **Category**: Normal/Error/Boundary Value
- **Purpose**: What this test verifies
- **Prerequisites**: State before test execution
- **Test Data**: Details of input data
- **Execution Steps**: 
  1. Specific step 1
  2. Specific step 2
- **Expected Results**: 
  - Details of expected behavior
  - Expected output values
- **Post-conditions**: Expected state after test execution
```

### Specific Test Case Example

#### Example: User Registration Feature Test Cases

```markdown
# User Registration Feature Test Case Specification

## Test Overview
- **Target Feature**: User Registration API (POST /api/users)
- **Test Purpose**: Verify all patterns of new user registration
- **Prerequisites**: Database in initial state, API server running

## Test Case List

### TC001: Normal User Registration
- **Category**: Normal case
- **Purpose**: Verify new user registration with valid data
- **Prerequisites**: test@example.com is not registered
- **Test Data**: 
  ```json
  {
    "email": "test@example.com",
    "password": "SecurePass123!",
    "password_confirmation": "SecurePass123!"
  }
  ```
- **Execution Steps**: 
  1. Send test data to POST /api/users
  2. Verify response
  3. Verify database state
- **Expected Results**: 
  - Status Code: 201
  - Response: 
    ```json
    {
      "id": any positive integer,
      "email": "test@example.com",
      "created_at": "datetime (ISO8601 format)"
    }
    ```
  - Database: New record created in users table
  - Password hashed and stored
- **Post-conditions**: User successfully registered and can log in

### TC002: Email Address Duplication Error
- **Category**: Error case
- **Purpose**: Verify error handling when registering with existing email address
- **Prerequisites**: test@example.com already registered
- **Test Data**: 
  ```json
  {
    "email": "test@example.com",
    "password": "AnotherPass456!",
    "password_confirmation": "AnotherPass456!"
  }
  ```
- **Execution Steps**: 
  1. Send test data to POST /api/users
  2. Verify response
  3. Verify database state
- **Expected Results**: 
  - Status Code: 400
  - Response: 
    ```json
    {
      "error": "validation_failed",
      "details": [
        {
          "field": "email",
          "message": "Email already exists"
        }
      ]
    }
    ```
  - Database: No new record created
- **Post-conditions**: No impact on existing user data

### TC003: Password Mismatch Error
- **Category**: Error case
- **Purpose**: Verify error handling when password and confirmation password don't match
- **Prerequisites**: Using new email address
- **Test Data**: 
  ```json
  {
    "email": "new@example.com",
    "password": "SecurePass123!",
    "password_confirmation": "DifferentPass456!"
  }
  ```
- **Expected Results**: 
  - Status Code: 400
  - Error Message: "Password confirmation does not match"

### TC004: Invalid Email Address Format
- **Category**: Error case, Boundary value
- **Purpose**: Verify email address format validation
- **Test Data Set**:
  - "invalid-email" (no @)
  - "test@" (no domain part)
  - "@example.com" (no local part)
  - "test..test@example.com" (consecutive dots)
- **Expected Results**: All should result in 400 error

### TC005: Insufficient Password Strength
- **Category**: Error case, Boundary value
- **Purpose**: Verify password strength validation
- **Test Data Set**:
  - "short" (less than 8 characters)
  - "onlylowercase" (lowercase only)
  - "ONLYUPPERCASE" (uppercase only)
  - "12345678" (numbers only)
  - "NoSymbol123" (no symbols)
- **Expected Results**: All should result in 400 error

### TC006: Missing Required Fields
- **Category**: Error case
- **Purpose**: Verify required field validation
- **Test Data Set**:
  - No email
  - No password
  - No password_confirmation
  - Empty string cases
  - null cases
- **Expected Results**: All should result in 400 error

### TC007: Boundary Value Test - Email Address Length
- **Category**: Boundary value
- **Purpose**: Verify email address character limit
- **Test Data**:
  - 254 characters (maximum allowed)
  - 255 characters (exceeding limit)
- **Expected Results**: 
  - 254 characters: Normal registration
  - 255 characters: 400 error

### TC008: Rate Limiting Test
- **Category**: Non-functional
- **Purpose**: Verify rate limiting for concurrent registrations
- **Execution Steps**: Send large number of requests in short time
- **Expected Results**: 429 error when limit exceeded

### TC009: Database Connection Error
- **Category**: Error case, Infrastructure
- **Purpose**: Verify behavior during database failure
- **Prerequisites**: Database unavailable
- **Expected Results**: 500 error and error log output

### TC010: CSRF Token Verification
- **Category**: Security
- **Purpose**: Verify CSRF attack prevention
- **Test Data**: No CSRF token or invalid token
- **Expected Results**: 403 error
```

## Test Case Creation Workflow

### 1. Test Case Extraction from Specifications

```markdown
Each specification item → Corresponding test case

■ Functional Requirements
- Basic functions → Normal case test cases
- Validation → Error case test cases
- Input restrictions → Boundary value test cases

■ Non-functional Requirements
- Performance → Load test cases
- Security → Security test cases
- Availability → Failure test cases
```

### 2. Test Case Design Process

#### Step 1: Organize Test Perspectives
```markdown
## Test Perspective List

### Functional Perspective
- [ ] Operation with normal input
- [ ] Input value validation
- [ ] Error handling
- [ ] Data persistence

### Data Perspective
- [ ] Boundary values (minimum, maximum)
- [ ] Special characters, multilingual
- [ ] NULL, empty strings
- [ ] Invalid formats

### State Perspective
- [ ] Initial state
- [ ] Data exists state
- [ ] Error state
- [ ] Limited state

### Environment Perspective
- [ ] Normal environment
- [ ] High load environment
- [ ] Failure environment
```

#### Step 2: Create Test Case Matrix

| Function | Normal | Error | Boundary | Security | Performance |
|----------|--------|-------|----------|----------|-------------|
| User Registration | TC001 | TC002-006 | TC007 | TC010 | TC008 |
| Validation | - | TC002-006 | TC004,005,007 | - | - |
| Data Storage | TC001 | TC009 | - | - | - |

#### Step 3: Create Detailed Test Cases
- Expand each cell content into detailed test cases
- Break down into executable specific steps
- Clearly define expected results

### 3. AI-Assisted Test Case Support

#### Areas Where AI Can Be Utilized
- **Coverage checking**: Point out missing test cases
- **Test data generation**: Suggest boundary values and abnormal values
- **Expected value calculation**: Calculate complex calculation results
- **Test case structuring**: Unify formats

#### Areas Where Humans Must Make Decisions
- **Business requirement understanding**: Domain-specific requirements
- **Risk assessment**: Impact and importance evaluation
- **Test prioritization**: Execution order and resource allocation
- **Quality standards**: Acceptance criteria setting

## Test Case Quality Checkpoints

### 1. Completeness Verification

#### Functional Coverage
```markdown
## Coverage Checklist

### Each API Specification Item
- [ ] Test cases for all endpoints
- [ ] Test cases for all parameters
- [ ] Test cases for all response patterns

### Error Handling
- [ ] Test cases for all error codes
- [ ] Test cases for all validation rules
- [ ] Test cases for all exception patterns
```

#### Business Rule Coverage
```markdown
### Business Rule Verification
- [ ] Test cases for all business flows
- [ ] Test cases for all business exceptions
- [ ] Test cases for all permission patterns
```

### 2. Executability Verification

#### Test Data Preparation Feasibility
- Can necessary test data be prepared?
- Can external dependent services be mocked?
- Can execution in test environment be performed?

#### Expected Result Verification Feasibility
- Can expected results be objectively determined?
- Are necessary tools or methods for verification available?
- Manual verification methods for parts difficult to automate

### 3. Maintainability Verification

#### Test Case Independence
- Each test case can be executed independently
- Not dependent on test order
- Parallel execution possible

#### Response to Changes
- Impact scope clear when specifications change
- Test case modifications easy
- Test data management simple

## Human Review Points

### Review Perspectives

#### 1. Consistency with Business Requirements
- [ ] Are user stories appropriately tested?
- [ ] Are business rules correctly reflected?
- [ ] Are edge cases valid from business perspective?

#### 2. Risk-Based Priority
- [ ] Are there sufficient test cases for high-risk functions?
- [ ] Are important business flows covered?
- [ ] Are security requirements appropriately tested?

#### 3. Test Efficiency
- [ ] Is the number of test cases appropriate (not too many/few)?
- [ ] Are there no duplicate test cases?
- [ ] Is separation of automatable parts and manual tests appropriate?

### Review Process

#### Step 1: Initial Review
- Verify consistency with specifications
- Basic coverage check
- Point out obvious omissions or problems

#### Step 2: Detailed Review
- Verify validity of each test case
- Verify accuracy of expected results
- Verify executability

#### Step 3: Final Approval
- Overall quality verification
- Verify test execution plan
- Determine progression to next phase

## Test Case Creation Best Practices

### 1. Progressive Detailed Elaboration

```markdown
Stage 1: Overview Level
"Test normal and error cases for user registration"

Stage 2: Function Level
"Registration success with valid data"
"Registration failure with invalid data"

Stage 3: Detail Level
"TC001: Normal user registration"
"TC002: Email address duplication error"
```

### 2. Strategic Test Data Design

#### Systematizing Data Patterns
```markdown
## Basic Data Set
- Normal data: Common valid values
- Boundary data: Limit values (minimum/maximum)
- Abnormal data: Invalid values, illegal values
- Special data: Special characters, multilingual, NULL
```

#### Reusable Test Data
- Define commonly used test data
- Manage test data variations
- Automate data creation

### 3. Precise Definition of Expected Results

#### Specific Expected Values
```markdown
❌ "Should become an error"
✅ "HTTP 400 + {'error': 'validation_failed', 'field': 'email'}"

❌ "Should be registered normally"
✅ "HTTP 201 + User ID returned + Record created in DB"
```

#### Verifiable Conditions
- Specific values or formats of output
- Database state changes
- Log output content
- Impact on external systems

## Common Problems and Solutions

### Problem 1: Inappropriate Test Case Granularity

**Symptoms**: 
- One test case tests multiple functions
- Conversely, too detailed with high management cost

**Solutions**: 
- One test case = One verification perspective
- Group by business value units

### Problem 2: Ambiguous Expected Results

**Symptoms**: 
- "Should work normally", "Error should occur", etc.
- Unclear judgment criteria

**Solutions**: 
- Specify concrete values or states
- Consider judgment conditions for automated testing

### Problem 3: Missing Test Cases

**Symptoms**: 
- Edge cases not considered
- Insufficient error patterns

**Solutions**: 
- Systematic verification using checklists
- Use equivalence class partitioning and boundary value analysis

### Problem 4: Insufficient Maintainability

**Symptoms**: 
- Difficult to modify test cases when specifications change
- Complex test data management

**Solutions**: 
- Modularized design
- Reusable test data design

## Preparation for Next Steps

Once test case creation is complete, proceed to [Red-Green-Refactor-Validation Cycle](./04-rgr-validation-cycle.md).

### Deliverable Verification
- [ ] testcases.md created in detail
- [ ] All specification items have corresponding test cases
- [ ] Expected results specifically defined
- [ ] Human review completed
- [ ] Test data can be prepared

### Quality Checklist
- [ ] **Comprehensiveness**: Normal, error, and boundary value cases covered
- [ ] **Clarity**: Expected results concrete and verifiable
- [ ] **Independence**: Each test case can be executed independently
- [ ] **Feasibility**: Executable in test environment
- [ ] **Maintainability**: Structure that easily responds to specification changes

Proper test case creation establishes the foundation for AI to generate high-quality code. The next chapter will detail the implementation cycle based on these test cases.
