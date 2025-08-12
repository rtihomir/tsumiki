# 5.1 Principles of Effective Prompt Design

## Introduction

In AITDD, the quality of AI output heavily depends on prompt design. Proper prompt design enables improved AI-generated code quality and maximized development efficiency. This chapter covers practical prompt design principles and specific techniques.

## Basic Principles of Prompt Design

### 1. Adopting Iterative Improvement Approach

In AITDD, we design for continuous improvement rather than seeking perfect results from a single prompt creation.

**Basic Cycle:**
```
Prompt Creation → Execution → Result Evaluation → Modification → Re-execution
```

**Practical Points:**
- Target 80% quality initially, don't seek perfection
- Analyze each execution result in detail and identify improvement points
- Optimize through accumulating small modifications
- Record improvement logs and understand patterns

### 2. Incorporating Confidence Assessment

By having AI evaluate its confidence in its own output, we can efficiently identify areas that need review.

**Confidence Indicators:**
- **🟢 High Confidence**: Clearly derivable from reference files
- **🟡 Medium Confidence**: Based on reasonable speculation but requires confirmation
- **🔴 Requires Judgment**: Generated through independent judgment, needs focused verification

### 3. Step-by-Step Customization

We optimize prompts for each TDD step (Red, Green, Refactor, Validation).

**Step-by-Step Characteristics:**
- **Red**: Emphasize test creation clarity and comprehensiveness
- **Green**: Focus on minimal implementation and preventing unintended changes
- **Refactor**: Balance quality improvement and functionality preservation
- **Validation**: Comprehensive quality checking and issue discovery

## Prompt Patterns in AITDD

### Pattern 1: TODO Recording Instructions

A pattern that records items to be verified from AI-generated results in TODO format.

**Basic Template:**
```markdown
## Prompt Instruction Example

Please execute the following process and record the results as a TODO list:

**Execution Content:**
[Specific instruction content]

**TODO Recording Format:**
```markdown
## [Step Name] Results TODO

### 🟢 High Confidence Items
- [ ] [File name](relative path) specific verification content

### 🟡 Medium Confidence Items  
- [ ] [File name](relative path) validity confirmation of estimated content

### 🔴 Requires Judgment Items
- [ ] Detailed verification: [File name](relative path) organization-specific content
```

**Reference Files:** [List of files to specify]
**Output File:** `./todos/[step-name]-check.md`
```

### Pattern 2: Confidence Assessment Instructions

A pattern that makes AI specify the basis and confidence level of generated content.

**Basic Template:**
```markdown
## Confidence Assessment Instructions

Please evaluate confidence for each generated content based on the following criteria:

**Assessment Criteria:**
- 🟢 Green Light: Clearly inferrable from reference files
- 🟡 Yellow Light: Reasonable speculation but requires verification
- 🔴 Red Light: Generated through independent judgment

**Assessment Targets:**
1. Each function of generated code
2. Reasoning for test case selection
3. Basis for implementation approach decisions

**Output Format:**
- Add traffic light marks to each item
- Clearly specify reference file locations that serve as basis
- Briefly explain reasoning for speculation
```

### Pattern 3: Gradual Refinement Instructions

A pattern for progressing complex implementations step by step.

**Basic Template:**
```markdown
## Gradual Implementation Instructions

Please proceed with implementation step by step in the following order:

**Phase 1: Basic Structure**
- Minimal operation verification
- Framework of main functions/classes
- Basic test cases

**Phase 2: Feature Extension**
- Specific feature implementation
- Error handling
- Additional test cases

**Phase 3: Optimization**
- Performance improvement
- Code quality enhancement
- Comprehensive testing

**Verification After Each Phase:**
- Report test execution results
- Perform confidence assessment
- Organize challenges for next phase
```

## Practical Prompt Components

### Essential Elements Checklist

Elements that must be included when creating prompts:

- [ ] **Clear Purpose Definition**
  - Clear explanation of what to achieve
  - Specific format of expected output

- [ ] **Reference File Specification**
  - Clear documentation of files to use as basis
  - Explanation of relationships between files

- [ ] **Confidence Assessment Instructions**
  - Application instructions for traffic light system
  - Clear definition of assessment criteria

- [ ] **Output Format Specification**
  - File name and save location specification
  - Detailed specification of markdown format etc.

- [ ] **Constraints and Notes Documentation**
  - Areas that must not be changed
  - Special considerations

### Templatable Parts

**Standard Header Example:**
```markdown
## [Step Name] Execution Instructions

**Purpose:** [Specific purpose]
**Reference Files:** [File list]
**Output File:** [Save destination path]

**Confidence Assessment:**
Display confidence level with 🟢🟡🔴 for each generated content

**Constraints:**
- [Important constraints]
```

### Parts Requiring Customization

Elements that should be customized specifically for projects:

1. **Domain-Specific Terms and Concepts**
   - Industry-specific term definitions
   - Project-internal naming conventions

2. **Technology Stack-Specific Constraints**
   - Framework constraints in use
   - Performance requirements

3. **Organization-Specific Rules**
   - Coding conventions
   - Security guidelines

## Prompt Techniques for Quality Assurance

### 1. Preventing Unexpected Implementation

**Countermeasure Techniques:**
```markdown
## Implementation Constraint Clarification

**Modification Permission Scope:**
- Modifiable: [Specific file/function names]
- Modification Prohibited: [Existing working parts]

**Implementation Policy:**
- Achieve objectives with minimal changes
- Minimize impact on existing functionality
- Base on new additions, minimize existing modifications

**Verification Check:**
- [ ] Are there changes outside the specified scope?
- [ ] Do existing tests continue to succeed?
- [ ] Are there unintended side effects?
```

### 2. Clarifying Relationships with Reference Source Files

**Relationship Clarification Example:**
```markdown
## Reference File Relationship Diagram

**Primary References:**
- `spec.md` → Basis for requirements definition
- `existing_test.js` → Existing specification verification
- `config.json` → Configuration specification reference

**Derived References:**
- `utils.js` → Utilization of existing utilities
- `types.ts` → Type definition consistency assurance

**Reference Priority During Generation:**
1. Primary references take highest priority
2. For conflicting content, adopt primary references
3. Clearly record unclear points as questions
```

### 3. Implementing Gradual Refinement

**Refinement Strategy:**
```markdown
## Gradual Refinement Process

**Level 1: Framework Creation**
- Interface definition
- Main function signatures
- Basic error handling

**Level 2: Feature Implementation**
- Business logic implementation
- Detailed error handling
- Input value validation

**Level 3: Optimization and Completion**
- Performance optimization
- Edge case handling
- Documentation preparation

**Verification Items at Each Level:**
- Test execution results
- Confidence assessment
- Challenges for next level
```

## Practical Exercises

### Exercise 1: Creating Basic Prompts

Please create prompts for the following scenario:

**Scenario:** Creating test cases for user authentication functionality
**Reference Files:** `auth_spec.md`, `user_model.js`
**Expected Output:** Jest format test file

**Elements to Create:**
1. Clear purpose definition
2. Reference file specification
3. Confidence assessment instructions
4. Output format specification

### Exercise 2: Designing Step-by-Step Implementation Prompts

**Scenario:** REST API endpoint implementation
**Requirements:** Includes complex data processing
**Constraints:** Utilize existing middleware

**Elements to Design:**
1. 3-phase implementation phases
2. Deliverables for each phase
3. Verification items between phases

## Summary

The core of effective prompt design is as follows:

1. **Iterative Improvement**: Don't seek perfection at once, assume continuous improvement
2. **Confidence Assessment**: Visualize AI speculation parts and achieve efficient reviews
3. **Step-by-Step Optimization**: Prompt design according to each TDD stage
4. **Quality Control**: Prevention of unexpected implementation and clarification of reference sources

The next section will cover AI inference visualization techniques that specifically utilize these principles.
