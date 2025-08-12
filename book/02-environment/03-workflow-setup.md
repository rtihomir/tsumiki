# 2.3 Development Environment and Workflow Construction

This section explains how to construct development environments and workflows for effective AITDD practice. By systematizing not just tool preparation but the entire development process, we achieve consistent, high-quality development.

## Actual Implementation History and Methodology Evolution

### Implementation Timeline

#### Serious Commitment from Early 2025
**Triggers:**
- **Emergence of Claude Sonnet 3.5** and **DeepSeek R1 distilled models**
- Gained confidence that considerable implementation could be achieved with AI
- Felt limitations of traditional manual coding

**Accumulation of 5-6 months of practical experience:**
- Evolution from initial trial-and-error to systematic methodology
- Discovery of prompt design optimization patterns
- Establishment of best practices through learning from failure cases

### Methodology Evolution Process

#### Stage 1: Live Coding (Initial Approach)
**Characteristics:**
- Create code through real-time dialogue with AI
- Effective for small-scale feature implementation
- Rapid corrections through immediate feedback

**Effective scenarios:**
- Small-scale modifications within single files
- Rapid prototype creation
- Sample code creation for technical research

**Discovered limitations:**
- Structure tends to break down in large-scale development
- Difficult to manage complex dependencies
- Difficult to maintain quality consistency

#### Stage 2: Combination with TDD (Current Methodology)
**Problem recognition:**
- Live coding makes large-scale development difficult
- Lack of quality assurance mechanisms
- Need for mechanisms to maintain design consistency

**Adopted solutions:**
- **Combination with TDD (Test-Driven Development)**
- **Establishment of Red-Green-Refactor-Validation cycle**
- **Construction of systematic workflow**

**Current methodology characteristics:**
```
Before evolution (Live Coding):
Requirements → Direct Implementation → Operation Check → Fix → Complete

After evolution (AITDD):
Requirements → TODO Creation → Red → Green → Refactor → Validation → Complete
          ↑                                          ↓
          ←←←←←←← Feedback Loop ←←←←←←←←←←
```

### Practical Development Workflow Construction Experience

#### Project Structure Optimization Process
**Initial issues:**
- File organization varied between projects
- TODO granularity was inappropriate
- Git history was difficult to track

**Improved structure:**
```
project-root/
├── todo.md                    # Central task management
├── docs/                      # Systematic design documents
│   ├── requirements.md        # Clear requirement definitions
│   ├── architecture.md        # Architecture design
│   └── api-spec.md           # Detailed API specifications
├── src/                       # Clear functional separation
├── tests/                     # Systematic test code
└── scripts/                   # Automation scripts
```

#### TODO Management Evolution Process

**Initial problems:**
- TODO granularity too large ("Implement entire system", etc.)
- Dependencies unclear
- Progress difficult to track

**Current optimized approach:**

**Discovery of appropriate granularity:**
```markdown
# Optimal granularity (30 minutes to 1 hour)
- [x] User registration API implementation
- [x] Password validation functionality
- [ ] JWT authentication middleware
- [ ] Add login functionality tests

# Granularity to avoid
❌ Entire system implementation (too large)
❌ Variable name changes (too small)
```

**Practical sequential execution strategy:**
1. **Process TODO list in order from top**
2. **Completely finish one item before moving to next**
3. **Adjust order for items with dependencies**
4. **Split into units completable in 30 minutes to 1 hour**

### Practical Git Workflow Operations

#### AITDD-Specialized Branching Strategy

**Actually adopted strategy:**
```bash
# Branch creation pattern per TODO item
git checkout -b feature/user-registration    # TODO: User registration API
git checkout -b feature/auth-middleware      # TODO: Authentication middleware
git checkout -b feature/password-validation  # TODO: Password validation
```

**AITDD Cycle-Responsive Commit Strategy:**
```bash
# Red Phase (Create failing tests)
git add tests/user-registration.test.js
git commit -m "Red: Add failing tests for user registration"

# Green Phase (Minimal implementation to pass tests)
git add src/controllers/user.js
git commit -m "Green: Implement basic user registration"

# Refactor Phase (Code improvement)
git add src/controllers/user.js src/models/user.js
git commit -m "Refactor: Extract user validation logic"

# Validation Phase (Final verification and documentation)
git add docs/api-spec.md
git commit -m "Validation: Complete user registration with docs"
```

#### Practical Failure Recovery Strategies

**Decision criteria in actual operations:**
```bash
# Pattern 1: Addressable with minor fixes
if [ "difference_from_expectation" == "small" ]; then
    # Re-execute with prompt adjustment
    echo "Retry with more detailed prompt"
fi

# Pattern 2: Major fixes needed
if [ "difference_from_expectation" == "large" ]; then
    git reset --hard HEAD~1  # Return to previous state
    echo "Re-execute after prompt review"
fi

# Pattern 3: Multiple failures
if [ "failure_count" -gt 3 ]; then
    git reset --hard <last_known_good_commit>
    echo "Fundamentally review approach"
fi
```

**Actual recovery pattern examples:**
```
Situation: Inappropriate error handling in user authentication API implementation
Decision: No improvement after 3 fix attempts
Response: git reset --hard HEAD~4 to return to Red phase
Re-execution: Restart with more detailed prompt
Result: Expected implementation completed
```

### Important Lessons from Practice

#### Analysis of Success Factors

**1. Effect of Progressive Approach:**
- Steady progress in small steps
- Quality verification at each stage
- Limited impact scope when failures occur

**2. Importance of Documentation:**
- Clear requirement definition directly impacts AI output quality
- API specifications become guidelines for test design
- Progress visualization contributes to motivation maintenance

**3. Cumulative Effect of Prompt Optimization:**
- Efficiency improvement through reuse of same patterns
- Accuracy improvement through failure case analysis
- Domain-specific knowledge accumulation

#### Common Problems and Solutions

**Problem 1: Unstable AI Output Quality**
```
Symptoms: Results vary by day even with same prompt
Cause: Prompt ambiguity, lack of context
Solution: Add more specific technical constraints and examples

Improvement example:
"Create an API" 
↓
"Create POST /api/users API with Express.js + Mongoose:
- Request: {name: string, email: string}
- Validation: email format check, name required
- Response: 201 with created user information
- Errors: 400(validation), 409(duplicate), 500(server)"
```

**Problem 2: Getting Lost in Large Projects**
```
Symptoms: Cannot understand current work position
Cause: Poor TODO management, lack of progress tracking
Solution: Clear progress display and explicit next actions

Improvement example:
## Current Implementation Status (2025-06-21)
- [x] User management functionality (completed)
- [ ] **Authentication functionality (in progress: JWT middleware creation stage)**
- [ ] Authorization functionality (not started)

### Next Actions
1. Implement JWT signature verification
2. Add token refresh functionality
3. Implement logout functionality
```

**Problem 3: Test and Code Inconsistency**
```
Symptoms: Tests pass but actual behavior differs from expectations
Cause: Poor test design, requirement understanding gaps
Solution: Create more realistic test cases

Improvement example:
# Insufficient test
test('should create user', () => {
  expect(user).toBeDefined();
});

# Improved test
test('should create user with valid email and return 201', async () => {
  const userData = { name: 'John', email: 'john@example.com' };
  const response = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);
  
  expect(response.body.user.email).toBe(userData.email);
  expect(response.body.user.password).toBeUndefined(); // No password included
});
```

## Overall Picture of AITDD Development Workflow

### Basic Development Flow
```
TODO List Creation → Item Selection → AITDD Execution → Review → Next Item
      ↑                                            ↓
      ←←←←←←←←←← Adjust as needed ←←←←←←←←←←←←←←
```

### Detailed AITDD Execution Cycle
```
Red (Test Creation) → Green (Implementation) → Refactor (Improvement) → Validation (Verification)
       ↑                                                    ↓
       ←←←←←←←←←←←←← Feedback Loop ←←←←←←←←←←←←←←
```

## Project Structure Design

### Recommended Directory Structure

```
project-root/
├── todo.md                    # Main TODO list
├── docs/                      # Project documentation
│   ├── requirements.md        # Requirement definitions
│   ├── architecture.md        # Architecture design
│   └── api-spec.md           # API specifications
├── src/                       # Source code
│   ├── models/               # Data models
│   ├── controllers/          # Controllers
│   ├── services/             # Business logic
│   └── utils/                # Utilities
├── tests/                     # Test code
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── fixtures/             # Test data
├── scripts/                   # Development scripts
└── README.md                 # Project overview
```

### TODO List Creation and Management

#### Basic TODO List Format

**Example todo.md:**
```markdown
# Project TODO List

## Current Implementation Target
- [ ] User registration functionality implementation

## Completed
- [x] Project initial setup
- [x] Database connection setup

## Not Started (Priority Order)
1. [ ] User authentication functionality
   - [ ] Password hashing
   - [ ] JWT token generation
   - [ ] Login API

2. [ ] User management functionality
   - [ ] Profile update API
   - [ ] User deletion API
   - [ ] User list API

3. [ ] Security enhancement
   - [ ] Rate limiting implementation
   - [ ] Input validation strengthening
   - [ ] CORS configuration

## Future Considerations
- [ ] Performance optimization
- [ ] Deployment automation
```

#### Setting Effective TODO Granularity

**Appropriate granularity examples:**
- ✅ `User registration API implementation` (30 minutes to 1 hour)
- ✅ `Password validation functionality` (30 minutes to 1 hour)
- ✅ `JWT authentication middleware` (30 minutes to 1 hour)

**Granularity to avoid:**
- ❌ `Entire system implementation` (too large)
- ❌ `Variable name changes` (too small)

### TODO Execution Strategy

#### Sequential Execution Approach
```markdown
Execution policy:
1. Process TODO list in order from top
2. Completely finish one item before moving to next
3. Adjust order for items with dependencies
4. Split into units completable in 30 minutes to 1 hour
```

#### Dependency Management
```markdown
Dependency examples:
- User model → User registration API → User authentication
- Database design → Migration → API implementation
- Basic functionality → Error handling → Security enhancement
```

## Git Workflow Configuration

### AITDD-Oriented Branching Strategy

#### Basic Branch Model
```bash
main                    # Production environment
├── develop            # Development integration
└── feature/todo-item  # Per TODO item
```

#### Branch Creation Examples
```bash
# Create branch per TODO item
git checkout -b feature/user-registration
git checkout -b feature/user-authentication
git checkout -b feature/password-validation

# When grouping by functionality
git checkout -b feature/user-management
git checkout -b feature/security-enhancement
```

### Commit Strategy

#### AITDD Cycle-Aligned Commits
```bash
# Red Phase (Test creation)
git add tests/
git commit -m "Red: Add tests for user registration"

# Green Phase (Implementation)
git add src/
git commit -m "Green: Implement user registration functionality"

# Refactor Phase (Improvement)
git add src/
git commit -m "Refactor: Improve user registration code structure"

# Validation Phase (Verification)
git add .
git commit -m "Validation: Complete user registration with documentation"
```

#### Failure Recovery Strategy
```bash
# When AI doesn't produce expected results
git reset --hard HEAD~1  # Cancel last commit
# or
git reset --hard <commit-hash>  # Return to specific commit

# Adjust prompt and re-execute
# Create new commit when successful
```

## Practical Next Steps

### Action Guidelines After Environment Setup

1. **Preparation for Chapter 3 Transition**
   - Detailed understanding of AITDD process
   - Master Red-Green-Refactor-Validation cycle
   - Experience actual development flow

2. **First Project Planning**
   - Design small sample project
   - Define clear functional requirements
   - Create TODO list within implementable scope

3. **Continuous Improvement Preparation**
   - Improve prompt design skills
   - Master effective AI interaction patterns
   - Practice review and quality management

### Important Points for Success

#### Adopt Progressive Approach
- **Start small**: Begin with simple functionality
- **Gradually expand**: Accumulate successful experiences
- **Learn from failures**: Don't fear git reset, try and learn

#### Continuous Attention to Quality
- **Test-first**: Always start writing tests
- **Make review a habit**: Always check AI-generated code
- **Practice documentation**: Properly record implementation details

#### Team Practice Preparation
- **Build common understanding**: Align with team members
- **Unify tools**: Work in same development environment
- **Share knowledge**: Share success and failure cases

## Environment Setup Completion Verification

### Final Checklist

- [ ] **Basic Tools**
  - [ ] Claude Sonnet 4 (Claude Code) available
  - [ ] VS Code properly configured
  - [ ] Git repository initialized

- [ ] **Project Structure**
  - [ ] Recommended directory structure created
  - [ ] todo.md file prepared
  - [ ] Basic configuration files placed

- [ ] **Development Workflow**
  - [ ] Git branching strategy decided
  - [ ] Commit rules defined
  - [ ] Test environment operation verified

- [ ] **Documentation & Monitoring**
  - [ ] README.md created
  - [ ] Log configuration completed
  - [ ] Debug environment prepared

### Operation Verification Test

```bash
# Basic operation verification
npm test                     # Execute tests
npm run test:coverage        # Check coverage
git status                   # Check Git status
git log --oneline -5         # Check recent commits

# Claude Code integration verification
# Open project in VS Code
# Verify Claude Code plugin operates normally
# Request simple test case creation from AI and verify operation
```

### Troubleshooting

#### Common Problems and Solutions

**Cannot connect to Claude Code**
```bash
# Check authentication
# Verify Pro plan validity
# Check network settings
```

**Errors in test environment**
```bash
# Reinstall dependencies
npm install

# Clear package cache
npm cache clean --force
```

**Git operation errors**
```bash
# Reset authentication information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Summary

In Chapter 2, we learned how to construct comprehensive development environments for practicing AITDD. The important points are as follows:

### Main Achievements
1. **Tool Setup**: Constructed development environment centered on Claude Sonnet 4
2. **Workflow Design**: Systematic process from TODO management to Git flow
3. **Quality Management Foundation**: Organized test environment, logging, and debug functions

### Preparation for Next Chapter
Once environment construction is complete, you'll finally learn the actual AITDD process. In Chapter 3 "Detailed AITDD Process," you'll master specific practice methods for the Red-Green-Refactor-Validation cycle.

**Learning Points:**
- Specific work content for each phase
- Effective interaction methods with AI
- Quality management and review techniques

Now that the environment is ready, you're prepared to actually collaborate with AI for software development. In the next chapter, let's experience the true value of AITDD.
