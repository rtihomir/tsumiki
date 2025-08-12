# kairo-requirements

## Purpose

Analyze requirement overviews provided by users and create detailed requirements definition documents including acceptance criteria using EARS (Easy Approach to Requirements Syntax) notation.

## Prerequisites

- Requirement overview provided by user
- `docs/spec/` directory exists (create if not present)

## Execution Content

**【Reliability Level Instructions】**:
For each item, comment on the verification status against source materials (including EARS requirements definition and design documents) using the following signals:

- 🟢 **Green Signal**: When referencing EARS requirements definition and design documents with minimal guesswork
- 🟡 **Yellow Signal**: When making reasonable inferences from EARS requirements definition and design documents
- 🔴 **Red Signal**: When making assumptions not found in EARS requirements definition and design documents

1. **Requirements Analysis**
   - Understand requirement overview provided by user
   - Search for related existing requirements and design documents with @agent-symbol-searcher and read found files with Read tool
   - Apply related domain knowledge
   - When unclear points exist, supplement based on general best practices

2. **User Story Creation**
   - Describe in WHO (who), WHAT (what), WHY (why) format
   - Clarify value of each function

3. **Requirements Definition Using EARS Notation**
   - **Normal Requirements (SHALL)**: Actions the system should normally execute
   - **Conditional Requirements (WHEN/IF-THEN)**: Actions under specific conditions
   - **State Requirements (WHERE)**: Actions in specific states
   - **Optional Requirements (MAY)**: Optional functions
   - **Constraint Requirements (MUST)**: System constraint matters

4. **Edge Case Definition**
   - Exception processing
   - Boundary value processing
   - Error handling
   - Performance requirements

5. **File Creation**
   - `docs/spec/{requirement name}-requirements.md`: Functional requirements and links to related documents
   - `docs/spec/{requirement name}-user-stories.md`: Detailed user stories
   - `docs/spec/{requirement name}-acceptance-criteria.md`: Acceptance criteria and test items
   - Create structured documents in markdown format

## Output Format Examples

### 1. requirements.md (Main File)

```markdown
# {Requirement Name} Requirements Definition

## Overview

{Requirement overview}

## Related Documents

- **User Stories**: [📖 {requirement name}-user-stories.md]({requirement name}-user-stories.md)
- **Acceptance Criteria**: [✅ {requirement name}-acceptance-criteria.md]({requirement name}-acceptance-criteria.md)

## Functional Requirements (EARS Notation)

### Normal Requirements

- REQ-001: The system shall {normal action}
- REQ-002: The system shall {normal action}

### Conditional Requirements

- REQ-101: When {condition}, the system shall {action}
- REQ-102: When {condition}, the system shall {action}

### State Requirements

- REQ-201: Where {state}, the system shall {action}

### Optional Requirements

- REQ-301: The system may {optional function}

### Constraint Requirements

- REQ-401: The system must {constraint matter}

## Non-Functional Requirements

### Performance

- NFR-001: {Performance requirement}

### Security

- NFR-101: {Security requirement}

### Usability

- NFR-201: {Usability requirement}

## Edge Cases

### Error Handling

- EDGE-001: {Error case}

### Boundary Values

- EDGE-101: {Boundary value case}
```

### 2. user-stories.md (Detailed User Stories)

```markdown
# {Requirement Name} User Stories

## Overview

This document describes detailed user stories for {requirement name} functionality.

## User Type Definitions

### Primary Users

- **End User**: {End user detailed description}
- **Administrator**: {Administrator detailed description}
- **Developer**: {Developer detailed description}

### Secondary Users

- **System Administrator**: {System administrator detailed description}
- **External System**: {External system detailed description}

## User Stories

### 📚 Epic 1: {Large Function Group}

#### Story 1.1: {Specific Story Name}

**User Story**:
- **As a** {user type}
- **In** {specific situation/context}
- **I want to** {desired action/operation}
- **So that** {obtained value/problem solved}

**Detailed Description**:
- **Background**: {Why this feature is needed}
- **Prerequisites**: {Prerequisite situations for this story}
- **Usage Scenarios**: {Examples of specific usage situations}
- **Expected Experience**: {Details of experience users expect}

**Related Requirements**: REQ-001, REQ-002

**Priority**: High/Medium/Low

**Estimation**: {Story points or effort}

#### Story 1.2: {Specific Story Name}

{Same format as above}

### 📚 Epic 2: {Large Function Group}

{Same format as above}

## User Journey

### Journey 1: {Representative Usage Flow}

```mermaid
journey
    title {User Journey Title}
    section {Phase 1}
      {Action 1}: 5: {User Type}
      {Action 2}: 3: {User Type}
    section {Phase 2}
      {Action 3}: 4: {User Type}
      {Action 4}: 5: {User Type}
```

**Details**:
1. **{Action 1}**: {Detailed description}
2. **{Action 2}**: {Detailed description}

## Persona Definition

### Persona 1: {Representative User Name}

- **Basic Information**: {Age, occupation, technical level, etc.}
- **Goals**: {What this user wants to achieve}
- **Challenges**: {Problems currently faced}
- **Behavior Patterns**: {Typical behavioral characteristics}
- **Usage Environment**: {Devices used, environment, etc.}

## Non-Functional User Requirements

### Usability Requirements

- **Learnability**: {Learning cost for first-time use}
- **Efficiency**: {Work efficiency after becoming proficient}
- **Memorability**: {Ease of remembering when reusing}
- **Error Recovery**: {Ease of handling errors}
- **Satisfaction**: {Subjective satisfaction}

### Accessibility Requirements

- **Visual**: {Consideration for visually impaired}
- **Auditory**: {Consideration for hearing impaired}
- **Motor**: {Consideration for motor impaired}
- **Cognitive**: {Consideration for cognitively impaired}
```

### 3. acceptance-criteria.md (Acceptance Criteria)

```markdown
# {Requirement Name} Acceptance Criteria

## Overview

This document describes acceptance criteria and test items for {requirement name} functionality.

## Functional Test Criteria

### REQ-001: {Requirement Name} Acceptance Criteria

**Given (Prerequisites)**:
- {State before test execution}
- {Required initial data}

**When (Execution Conditions)**:
- {Actions to execute}
- {Data to input}

**Then (Expected Results)**:
- {Expected output/state}
- {Side effects to verify}

**Test Cases**:
- [ ] Normal cases: {Normal case details}
- [ ] Error cases: {Error case details}
- [ ] Boundary values: {Boundary value test details}

### REQ-002: {Requirement Name} Acceptance Criteria

{Same format as above}

## Non-Functional Test Criteria

### Performance Testing

**NFR-001: {Performance Requirement}**

- [ ] Response time: {Specific time criteria}
- [ ] Throughput: {Processing volume criteria}
- [ ] Concurrent connections: {Concurrent user criteria}
- [ ] Resource usage: {CPU/memory usage criteria}

**Test Method**:
- Load testing tool: {Tool to use}
- Test scenario: {Specific test procedure}
- Pass criteria: {Quantitative pass line}

### Security Testing

**NFR-101: {Security Requirement}**

- [ ] Authentication: {Authentication function test items}
- [ ] Authorization: {Access control test items}
- [ ] Data protection: {Data encryption test items}
- [ ] Vulnerabilities: {Security vulnerability test items}

## Usability Test Criteria

### UX/UI Testing

- [ ] Intuitive operation: {Ease of operation}
- [ ] Responsive design: {Display on each device}
- [ ] Accessibility: {WCAG 2.1 compliance}
- [ ] Error messages: {Clear error display}

**Test Method**:
- Usability testing: {Implementation method}
- A/B testing: {Comparison test method}
- Accessibility check: {Tools to use}

## Edge Case Test Criteria

### EDGE-001: {Error Case} Acceptance Criteria

**Test Scenario**:
- {Setting abnormal situations}
- {Expected error handling}
- {Appropriate notification to users}

**Pass Criteria**:
- [ ] System does not crash
- [ ] Appropriate error messages are displayed
- [ ] Data integrity is maintained
- [ ] Recoverable state is maintained

## Integration Test Criteria

### Inter-System Integration Testing

- [ ] External API integration: {Integration testing with external systems}
- [ ] Database integration: {DB operation consistency testing}
- [ ] File system: {File operation testing}

## Regression Test Criteria

### Existing Function Impact Verification

- [ ] Existing function operation verification: {Impact scope identification and verification}
- [ ] Performance degradation verification: {Existing function performance verification}
- [ ] Security setting verification: {Continuous verification of security functions}

## Acceptance Test Execution Checklist

### Before Test Execution

- [ ] Test environment preparation complete
- [ ] Test data preparation complete
- [ ] Test tool preparation complete
- [ ] Execution personnel confirmation complete

### During Test Execution

- [ ] All functional tests executed
- [ ] All non-functional tests executed
- [ ] Problem recording when discovered
- [ ] Re-testing after fixes

### After Test Completion

- [ ] Test result recording
- [ ] Remaining problem organization
- [ ] Acceptance decision
- [ ] Stakeholder reporting
```

## Post-Execution Verification

- Verify relevance to requirements created with @agent-symbol-searcher
- Display paths of the three created files
  - `docs/spec/{requirement name}-requirements.md`
  - `docs/spec/{requirement name}-user-stories.md` 
  - `docs/spec/{requirement name}-acceptance-criteria.md`
- Report number of main requirements and user stories
- Confirm links within each file are correctly set
- Display message prompting user confirmation