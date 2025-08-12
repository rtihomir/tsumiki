# 5.2 AI Inference Visualization Techniques

## Introduction

The most important aspect of AI-generated code quality management is clearly understanding which parts AI has "inferred." AI inference visualization techniques using the traffic light system enable efficient reviews and high-quality assurance.

## Theoretical Background of the Traffic Light System

### Problem Identification

AI-generated code has the following characteristics:

- **Extensive Auto-completion**: AI automatically fills in parts that are not explicitly specified
- **The Plausibility Trap**: Generated content may appear reasonable but differ from actual intent
- **Unclear Inference Basis**: It's unclear what information the generation was based on

### Solution Approach

The traffic light system classifies AI-generated content based on the following criteria and clarifies review priorities:

```
🟢 Green Light → 🟡 Yellow Light → 🔴 Red Light
    Safe           Caution         Danger
```

## Detailed Definition of the Traffic Light System

### 🟢 Green Light (High Confidence・Safe)

**Definition:** Content that can be clearly inferred from referenced source files

**Characteristics:**
- Generated based on content explicitly stated in original instructions or specifications
- Implementation following existing code patterns
- Implementation decisions with clear rationale

**Example:**
```javascript
// When specification states "User ID is required"
function validateUser(userId) {
  if (!userId) {  // 🟢 Clearly derived from specification
    throw new Error('User ID is required');
  }
}
```

**Review Priority:** Low
**Check Points:** Implementation accuracy, performance impact

### 🟡 Yellow Light (Medium Confidence・Caution)

**Definition:** Content not in referenced source files but appears reasonable

**Characteristics:**
- Completion through AI's reasonable speculation
- Implementation based on general best practices
- Inference utilizing domain knowledge

**Example:**
```javascript
// Error handling when specification lacks details
function processData(data) {
  try {
    return transform(data);
  } catch (error) {  // 🟡 Common but needs verification
    console.error('Data processing failed:', error);
    return null;
  }
}
```

**Review Priority:** High
**Check Points:** Validity of speculation, alignment with business requirements

### 🔴 Red Light (Requires Judgment・Danger)

**Definition:** Content not in referenced source files and not directly inferable

**Characteristics:**
- Generated through AI's independent judgment
- Assumptions about organization-specific customs or rules
- Implementation choices without clear rationale

**Example:**
```javascript
// When there's no information about organization's log format
function logUserAction(action) {
  // 🔴 Log format is organization-specific, requires verification
  logger.info(`[AUDIT] User performed: ${action} at ${new Date().toISOString()}`);
}
```

**Review Priority:** Highest
**Check Points:** Alignment with organizational rules, security impact

## Implementation Methods and TODO File Format

### Standard TODO File Format

```markdown
## [Step Name] Results TODO

### 🟢 High Confidence Items
- [ ] [utils.js](./src/utils.js) Verify type definitions match specification
- [ ] [validation.js](./src/validation.js) Confirm required field check implementation

### 🟡 Medium Confidence Items
- [ ] [error-handler.js](./src/error-handler.js) Verify validity of error response format
- [ ] [config.js](./src/config.js) Check default value settings for organizational policy compliance

### 🔴 Requires Judgment Items
- [ ] Detailed verification: [logger.js](./src/logger.js) Log output format compliance with organizational standards
- [ ] Detailed verification: [auth.js](./src/auth.js) Rationale for session management approach selection
```

### Instruction Methods in Prompts

**Basic Instruction Template:**
```markdown
## AI Inference Visualization Instructions

Please execute the following task and classify generated content using the traffic light system:

**Task Content:**
[Specific task content]

**Classification Criteria:**
- 🟢 Green Light: Clearly derivable from reference files ([file names])
- 🟡 Yellow Light: Reasonable speculation but not explicitly stated in reference files
- 🔴 Red Light: Generated through independent judgment (organization-specific content etc.)

**Output File:** `./todos/[step-name]-inference-check.md`

**Output Format:**
Add traffic light marks to each generated item and create check items in TODO format
```

### Reference Source File Management

**Recording File Relationships:**
```markdown
## Reference File Management

**Primary References:**
- [`requirements.md`](./docs/requirements.md) - Basic requirements definition
- [`api-spec.yaml`](./docs/api-spec.yaml) - API specification

**Secondary References:**
- [`existing-code/`](./src/existing/) - Existing implementation patterns
- [`config-samples/`](./config/) - Configuration file examples

**External References:**
- Technical documentation (framework official)
- Industry standards (RFC, W3C, etc.)

**Inference Basis Tracking:**
- 🟢 items → Explicitly stated in primary references
- 🟡 items → Secondary references + general knowledge
- 🔴 items → Unclear basis・independent judgment
```

## Setting Check Priorities

### Priority Matrix

| Signal | High Impact | Medium Impact | Low Impact |
|--------|-------------|---------------|------------|
| 🔴 Red Signal | **Top Priority** | High Priority | Medium Priority |
| 🟡 Yellow Signal | High Priority | Medium Priority | Low Priority |
| 🟢 Green Signal | Medium Priority | Low Priority | **Postpone** |

### Impact Assessment Criteria

**High Impact:**
- Security-related implementation
- Data integrity impact
- System-wide operation impact

**Medium Impact:**
- Specific functionality operation impact
- User experience impact
- Performance impact

**Low Impact:**
- Log output and comments
- Internal variable names
- Auxiliary functionality

### Practical Check Order

1. **🔴×High Impact** - Immediate verification and correction
2. **🔴×Medium Impact** and **🟡×High Impact** - Verify before next work session
3. **Other 🔴 items** - Must verify before implementation completion
4. **🟡 items** - Verify during review
5. **🟢 items** - Verify during final check

## Practical Examples and Case Studies

### Case Study 1: REST API Implementation

**Scenario:** User management API implementation
**Reference Files:** `user-api-spec.yaml`, `existing-user-model.js`

**AI Generation Result Classification:**

```javascript
// 🟢 Endpoint specified in API specification
app.post('/api/users', async (req, res) => {
  
  // 🟡 Common validation but details not in specification
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  // 🔴 Hashing algorithm depends on organization-specific policy
  const hashedPassword = bcrypt.hashSync(req.body.password, 12);
  
  // 🟢 Implementation following existing model patterns
  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });
});
```

**Generated TODO:**
```markdown
## API Implementation Results TODO

### 🟢 High Confidence Items
- [ ] [user-controller.js](./src/controllers/user.js) Endpoint definition matches specification
- [ ] [user-model.js](./src/models/user.js) Confirm existing pattern adherence

### 🟡 Medium Confidence Items
- [ ] [validation.js](./src/middleware/validation.js) Error message format validity
- [ ] [user-controller.js](./src/controllers/user.js) Status code selection verification

### 🔴 Requires Judgment Items
- [ ] Detailed verification: [auth.js](./src/utils/auth.js) bcrypt salt rounds comply with organizational policy
```

### Case Study 2: Test Case Generation

**Scenario:** Creating test cases for the above API
**Reference Files:** `user-api-spec.yaml`, `existing-test-patterns.js`

**Classification Results:**
```javascript
describe('User API', () => {
  // 🟢 Test case specified in specification
  it('should create user with valid email and password', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', password: 'password123' });
    
    expect(response.status).toBe(201);  // 🟢 As per specification
  });
  
  // 🟡 Common edge case (not specified in specification)
  it('should reject invalid email format', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'invalid-email', password: 'password123' });
    
    expect(response.status).toBe(400);  // 🟡 Based on speculation
  });
  
  // 🔴 Speculation based on organization-specific security requirements
  it('should enforce password complexity requirements', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', password: '123' });
    
    expect(response.status).toBe(400);  // 🔴 Organization policy dependent
  });
});
```

## Effect Measurement and Improvement Methods

### Effect Measurement Indicators

**Quantitative Indicators:**
- Review time reduction rate
- Bug discovery rate improvement
- Reduction in number of corrections

**Qualitative Indicators:**
- Review efficiency improvement
- Prevention of overlooking important issues
- Improved developer confidence

### Operational Data Examples

```markdown
## Traffic Light System Implementation Effects (1 Month)

**Traditional Review:**
- Average review time: 45 minutes/feature
- Bug discovery rate: ~60%
- Review oversights: 3-4 cases/month

**After Traffic Light System Implementation:**
- Average review time: 25 minutes/feature (44% reduction)
- Bug discovery rate: ~85% (25% improvement)
- Review oversights: 1 case or less/month

**Typical Problems in 🔴 Items:**
- Security-related: 40%
- Organizational policy violations: 35%
- Configuration/environment dependent: 25%
```

### Continuous Improvement Approach

**1. Classification Accuracy Improvement:**
```markdown
## Classification Criteria Improvement Log

**Week 1-2:**
- Problem: Ambiguous log format classification
- Improvement: Created organization-specific item checklist

**Week 3-4:**
- Problem: Unstable error handling classification
- Improvement: Documented error handling patterns

**Month 2:**
- Problem: Classification difficulties with new technology stack
- Improvement: Created technology stack-specific guidelines
```

**2. Prompt Optimization:**
```markdown
## Prompt Improvement Cycle

**Pre-improvement Issues:**
- 🔴 item detection rate around 70%
- Inconsistent classification

**Improvement Content:**
- Provided clear list of organization-specific items
- Added abundant specific examples of judgment criteria

**Post-improvement Effects:**
- 🔴 item detection rate improved to 90%+
- Significantly improved classification consistency
```

## Practical Implementation Steps

### Step 1: Basic System Construction

```bash
# Project structure preparation
mkdir -p todos
mkdir -p docs/inference-guides

# Basic template creation
cat > docs/inference-guides/classification-template.md << 'EOF'
## AI Inference Classification Template

### 🟢 Green Light Judgment Criteria
- Content explicitly stated in reference file "[file name]"
- Implementation following established patterns in existing code

### 🟡 Yellow Light Judgment Criteria  
- Implementation based on general best practices
- Technically valid but not explicitly stated in reference files

### 🔴 Red Light Judgment Criteria
- Dependent on organization-specific policies or customs
- Independent judgment without clear rationale
EOF
```

### Step 2: Documenting Organization-Specific Rules

```markdown
## Organization-Specific Check Points

**Security-Related:**
- [ ] Password hashing algorithm and strength
- [ ] Session management approach
- [ ] API authentication method

**Logging and Audit-Related:**
- [ ] Log output format and levels
- [ ] Audit log output items
- [ ] Log retention period and rotation

**Coding Conventions:**
- [ ] Naming conventions (variables, functions, classes)
- [ ] Error handling patterns
- [ ] Comment description rules
```

### Step 3: Establishing Team Operations

```markdown
## Team Operation Rules

**Classification Work Assignment:**
- AI executor performs initial classification
- Reviewer confirms classification validity

**Check Work Distribution:**
- 🔴 items: Senior engineers verify
- 🟡 items: Team pair review  
- 🟢 items: Automated tests + minor verification

**Knowledge Accumulation:**
- Weekly classification criteria review meetings
- Sharing misclassification patterns
- Documenting improvement cases
```

## Troubleshooting

### Common Problems and Solutions

**Problem 1: Inconsistent Classification**

```markdown
**Symptoms:** Same type of content gets different classification results
**Causes:** Ambiguous classification criteria, unclear prompt instructions
**Solutions:**
1. Create more specific lists of organization-specific items
2. Include past classification examples in prompts
3. Record and standardize uncertain judgment items
```

**Problem 2: Missing 🔴 Items**

```markdown
**Symptoms:** Important organization-specific items classified as 🟡 or 🟢
**Causes:** AI doesn't understand organizational context
**Solutions:**
1. Provide explicit list of organization-specific items
2. Set principle "classify as 🔴 when in doubt"
3. Reviewer checks classification validity
```

**Problem 3: Too Many TODO Items**

```markdown
**Symptoms:** Generated TODO items exceed executable scope
**Causes:** Classification too detailed, lenient impact assessment
**Solutions:**
1. Group similar items
2. Stricter impact assessment
3. Introduce "importance × urgency" matrix
```

## Practical Exercises

### Exercise 1: Creating Classification Criteria

Please classify the following code snippet using the traffic light system:

```javascript
function authenticateUser(username, password) {
  // Case 1: User existence check
  const user = await User.findOne({ username });
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  
  // Case 2: Password verification
  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid) {
    return { success: false, message: 'Invalid password' };
  }
  
  // Case 3: JWT token generation
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  // Case 4: Log output
  console.log(`User ${username} authenticated successfully at ${new Date().toISOString()}`);
  
  return { success: true, token };
}
```

**Reference File:** `auth-spec.md` (only basic authentication flow documented)

### Exercise 2: Setting TODO Item Priorities

Based on the above classification results, please arrange TODO items in priority order.

## Summary

AI inference visualization techniques enable the following effects:

1. **Efficient Reviews**: Quality checks focused on important areas
2. **Risk Reduction**: Reliable discovery of high-risk speculation areas
3. **Knowledge Accumulation**: Documentation and sharing of organization-specific judgment criteria
4. **Continuous Improvement**: Data-driven optimization of classification criteria and prompts

The traffic light system is an important technique for balancing human factors and AI assistance in AITDD. The next section covers continuous improvement and prompt optimization utilizing these techniques.
