# 2.2 Effective Usage of Claude Sonnet 4

This section explains how to effectively utilize Claude Sonnet 4, the core component of AITDD. You'll learn not just to have AI write code, but how humans and AI can collaborate to develop high-quality software.

## Characteristics and Strengths of Claude Sonnet 4

### Role in AITDD
- **Primary executor of Red-Green-Refactor-Validation cycle**
- **Consistently handles design, testing, and implementation**
- **Balances high-quality code generation with quality checks**

### Reasons for Selection
- **Accessibility**: Available for free use in Claude Code
- **Coding performance**: Stable performance at necessary and sufficient levels
- **Cost efficiency**: Reasonable cost level ($20/month)
- **AITDD suitability**: Optimal for trial-focused development style
- **Integration**: Excellent cooperation with VS Code environment

## Basic Usage of Claude Code

### Startup and Basic Operations

1. **Launching Claude Code**
   ```bash
   # Launch Claude Code within VS Code
   # or access through browser-based Claude
   ```

2. **Project Integration**
   - Specify project directory
   - Recognize file structure
   - Understand existing code

### Basic Interaction Patterns in AITDD

#### 1. Goal Setting Phase
```
You: "I want to implement CRUD operations for user management functionality. Please create a TODO list first."

Claude: "I'll create a TODO list for user management functionality:
1. Define user model
2. Create test cases for user creation
3. Implement user creation functionality
..."
```

#### 2. Test Creation Phase
```
You: "Please create test cases for the first item in the TODO."

Claude: "I'll create test cases for the user model:
```javascript
describe('User Model', () => {
  test('should create user with valid data', () => {
    // test code
  });
});
```"
```

#### 3. Implementation Phase
```
You: "Please implement the code to make this test pass."

Claude: "I'll implement the user model to make the test pass:
```javascript
class User {
  constructor(name, email) {
    // implementation code
  }
}
```"
```

## Effective Prompt Design

### Basic Principles of Prompt Design

#### 1. Clear Goal Setting
**Good Example:**
```
"I want to implement a user registration API (POST /users).
- With validation functionality
- Including error handling
- Want to proceed test-first"
```

**Bad Example:**
```
"Create user functionality"
```

#### 2. Providing Context
```
"Current project configuration:
- Express.js + MongoDB
- Jest for testing
- Existing User model available

New functionality to add:
- User profile update API"
```

#### 3. Explicit Constraints
```
"Constraints:
- Maintain compatibility with existing APIs
- Security-conscious implementation
- Performance requirement: Response within 1 second"
```

### Iterative Process for Prompt Optimization

#### Step 1: Initial Execution
1. **Create prompt**
2. **Request execution from AI**
3. **Evaluate results**

#### Step 2: Evaluation and Improvement
1. **Identify gaps from expectations**
2. **Analyze prompt issues**
3. **Design improved prompt**

#### Step 3: Re-execution
1. **Execute with improved prompt**
2. **Confirm degree of improvement**
3. **Further adjustments as needed**

### Practical Prompt Templates

#### Feature Implementation Template
```
【Implementation Request】
Feature: [Specific feature name]
Tech Stack: [List of technologies used]
Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Constraints:
- [Constraint 1]
- [Constraint 2]

Expected deliverables:
- Test cases
- Implementation code
- Documentation (as needed)
```

#### Debug Template
```
【Debug Request】
Problem: [Specific problem description]
Error message: [Actual error]
Reproduction steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Related code: [Problematic code]
Expected behavior: [Intended behavior]
```

## Review and Quality Management

### Key Points for Human Review

#### 1. Verification of Specification Compliance
- **Reflection of design intent**: Whether planned functionality is correctly implemented
- **Requirement coverage**: Whether all requirements are satisfied
- **Constraint adherence**: Whether set constraints are maintained

#### 2. Review Priority Order
1. **Specifications**: Consistency with requirements is most important
2. **Test cases**: Appropriate coverage of specifications
3. **Implementation code**: Code quality and specification compliance

#### 3. Review Checklist
- [ ] Are functional requirements satisfied?
- [ ] Is error handling appropriate?
- [ ] Are security requirements considered?
- [ ] Are performance requirements met?
- [ ] Is test coverage sufficient?
- [ ] Is code readability and maintainability good?

### Dealing with Unexpected AI Results

#### Fallback Strategy

**Basic Response Flow:**
1. **git reset**: Return to previous state
2. **Prompt adjustment**: Clarify and detail instructions
3. **Re-execution**: Retry with same tool (Claude Sonnet 4)
4. **Evaluation**: Confirm degree of improvement

**When to use git reset:**
- When final code significantly deviates from expectations
- When recreating is judged faster than requesting modifications
- When no improvement is seen after multiple modification attempts

#### Prompt Adjustment Techniques

**Improving Specificity:**
```
# Before improvement
"Fix this code"

# After improvement
"Fix the following issues in this code:
1. Validation errors are not properly handled
2. Return value type differs from specification
3. Edge case tests are insufficient"
```

**Adding Context:**
```
# Before improvement
"Create an API"

# After improvement
"Create RESTful API using Express.js:
- Endpoint: POST /api/users
- Request format: JSON
- Response format: JSON
- Use existing User model
- MongoDB Atlas already connected"
```

## Recording for Continuous Improvement

### Recording Success Patterns
```markdown
## Success Case Record

### Date: 2025-06-21
### Task: User authentication API implementation
### Prompt used:
[Specific prompt content]

### Result:
- Completed implementation as expected in one attempt
- Tests also passed 100%

### Learnings:
- Specific library specification is effective for authentication systems
- Important to specify security requirements in advance
```

### Analysis of Failure Patterns
```markdown
## Improvement Case Record

### Date: 2025-06-21
### Task: Complex query optimization
### Problem:
- Initial implementation did not meet performance requirements
- No improvement even after 3 modification attempts

### Solution:
- git reset to initial state
- Specify performance requirements numerically in prompt
- Provide reference implementation examples

### Learnings:
- Specify performance requirements quantitatively
- Break complex tasks into smaller parts
```

## Differentiation from Other Tools Besides Claude Sonnet 4

### Detailed Collaboration with Gemini (for Research)

#### Gemini Use Cases and Strengths
**Use Cases:**
- Research on new libraries
- Reading large amounts of technical documentation
- Research tasks requiring long context
- Information integration from multiple sources

**Gemini's Unique Strengths:**
- **Long context**: Can process large amounts of information at once
- **Information gathering capability**: Effectively integrates information from multiple sources
- **Research specialization**: Excellent performance in deep-diving technical information

#### Practical Collaboration Workflow

**Basic Collaboration Pattern:**
```
1. Identify research topic → Information gathering by Gemini
2. Organize and summarize information → Analysis by Gemini
3. Create implementation plan → Provide information to Claude Sonnet 4
4. Execute AITDD → Consistent implementation by Claude Sonnet 4
```

**Specific Collaboration Examples:**

**Example 1: Introducing New Framework**
```
Gemini:
"Research new features of Next.js 14 and organize migration 
methods from existing Express.js applications"

↓ Provide research results to Claude Sonnet 4

Claude Sonnet 4:
"Based on Gemini's research results, create a TODO list for 
gradual migration plan and implement the first feature with AITDD"
```

**Example 2: Deep Dive into Technical Specifications**
```
Gemini:
"Research the combination of OAuth 2.0 and JWT authentication, 
security best practices and implementation patterns"

↓ Organize security requirements and provide to Claude Sonnet 4

Claude Sonnet 4:
"Based on research results, create test cases for secure 
authentication system and implement using AITDD methodology"
```

#### Criteria for Tool Selection

**When to use Gemini:**
- [ ] Initial research on new technologies/libraries
- [ ] Need for comparative analysis of multiple options
- [ ] Need to read long technical documents
- [ ] Need to organize complex requirements
- [ ] Need to research precedent cases

**When to use Claude Sonnet 4:**
- [ ] Specific implementation work
- [ ] Test case creation
- [ ] Code review and quality checks
- [ ] Debugging and troubleshooting
- [ ] Refactoring work

### Practical Operational Know-how

#### Advanced Prompt Design Techniques

**Context Continuation Technique:**
```
# At session start
"Please remember the following project configuration:
- Express.js + MongoDB + Jest
- User authentication functionality already implemented
- Current goal: Add user profile management functionality"

# Reference in continued session
"Based on the project configuration I mentioned earlier,
please create test cases for the profile update API"
```

**Progressive Detailed Technique:**
```
# Phase 1: Overview level
"Please consider the overall design of the user management system"

# Phase 2: Function level
"From the previous design, please create detailed specifications for the profile update functionality"

# Phase 3: Implementation level
"Based on the specifications, please implement test cases and API endpoints"
```

#### Advanced Error Response Strategies

**Prompt Adjustment Pattern Analysis:**

**Pattern 1: Failure Due to Lack of Specificity**
```
# Failure example
"Create an API"
→ Implementation greatly different from expectations

# Success example
"Create POST /api/users/profile API with Express.js:
- Request: {name, email, bio}
- Validation: email format, name required
- Response: updated user information
- Error handling: 400, 401, 500 responses"
```

**Pattern 2: Failure Due to Unspecified Technical Constraints**
```
# Failure example
"Write database operation code"
→ Implementation with unused ORM

# Success example
"Implement User schema update operation using Mongoose 7.x:
- Use existing User model
- Use findByIdAndUpdate method
- Proper handling of validation errors"
```

**Practical Checklist for Prompt Adjustment:**
- [ ] Specification of technology stack used
- [ ] Concrete specification of input/output formats
- [ ] Instructions for error case consideration
- [ ] Ensuring consistency with existing code
- [ ] Specification of performance requirements
- [ ] Instructions for security considerations

#### Recording Methods for Continuous Improvement

**Templating Success Patterns:**
```markdown
## Prompt Template: API Implementation

### Basic Format
"Implement [HTTP method] [endpoint] API with [framework]:
- Request format: [details]
- Response format: [details]
- Validation: [requirements]
- Error handling: [corresponding status codes]
- Use existing [model name] model"

### Application Example
[Specific use case]

### Expected Results
[Success output pattern]
```

**Analysis Recording of Failure Patterns:**
```markdown
## Improvement Record: [Date]

### Problematic Prompt
[Original prompt]

### Problems That Occurred
- [Specific problem 1]
- [Specific problem 2]

### Improved Prompt
[Modified prompt]

### Improvement Points
- [Improvement point 1]
- [Improvement point 2]

### Future Application Guidelines
[How to apply to other cases]
```

### Detailed Comparison with Other AI Tools

**Why Consolidate on Claude Sonnet 4:**

**1. Importance of Consistency**
- Unified approach with the same tool
- Accumulated learning optimizations have cumulative effects
- Tool-specific quirks and limitation responses accumulate

**2. Maximizing Learning Efficiency**
- Efficiency improvement by mastering one tool
- Deepening prompt design know-how
- Accumulation of error patterns and solutions

**3. Simplifying Cost Management**
- Single tool easier to manage than multiple tools
- Simplification of budget planning
- Centralized usage monitoring

**4. Simplicity of Fallback Strategy**
- Can avoid complex decision logic
- No need to decide "which tool to retry with"
- Enables quick problem resolution

**Benefits of Tool Integration:**
```
Item                     Integrated Approach    Multiple Tools Approach
─────────────────────────────────────────────────────
Learning Cost            Low                   High
Prompt Optimization Eff. High                  Low
Cost Management Complex. Low                   High
Fallback Decision        Simple                Complex
Knowledge Accumulation   High                  Distributed
─────────────────────────────────────────────────────
Overall Dev Efficiency   Optimized             Inefficient
```

### Future Response to AI Tool Environment

#### New Technology Response Policy
**Systematization of Evaluation Criteria:**
- **Performance evaluation**: Performance comparison in existing workflows
- **Cost analysis**: Evaluation of total cost of ownership (including learning costs)
- **Integration evaluation**: Affinity with current development environment
- **Migration cost**: Estimation of costs associated with tool changes

**Phased Introduction Approach:**
1. **Information gathering period**: 3-6 month observation period
2. **Small-scale testing**: Trial in non-critical projects
3. **Comparative evaluation**: Quantitative performance and efficiency comparison
4. **Phased migration**: Careful migration after confirming clear advantages

**Quantification of Decisions:**
```
Threshold for new tool adoption:
- Performance improvement: 20% or more
- Cost reduction: 15% or more
- Learning cost: Within 2 weeks
- Integration cost: 50% or less of current tool
```

## Next Steps

Once you understand how to utilize Claude Sonnet 4, move on to the next chapter "2.3 Development Environment and Workflow Construction" to build a comprehensive development environment for practicing AITDD. You'll establish systematic development processes from TODO management to Git workflows.
