# TDD Red Phase (Write Failing Tests)

Execute the Red phase of TDD.

## Preparation

Prepare the development context:

1. **Search for test implementation-related information with @agent-symbol-searcher and read found files**
   - Search for existing test files or test functions and read relevant files with Read tool
   - Identify test setup and mock usage patterns and read related files with Read tool
   - Check Jest/Mocha and other test framework configurations and read configuration files with Read tool

2. **Directly read related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definitions
   - Read related design documents or task files as needed

After completing the reading, begin Red phase (failing test creation) work based on the prepared context information.

## Target Test Case

**【Target Test Case】**: {{test_case_name}}

## Test Case Addition Target Count

**Test Case Addition Target Count**: 10 or more (if fewer than 10 test cases are available, add all available ones)

Please select and implement 10 or more test cases from unimplemented test cases. If fewer than 10 test cases are available, target all available test cases for implementation.
If test cases are already implemented, add tests from the test cases written in the test case definition.

## Reliability Level Instructions

When creating test code, please comment on the verification status of each test case content against source materials using the following signals:

- 🟢 **Green Signal**: When referencing source materials with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on source materials
- 🔴 **Red Signal**: When making speculation not found in source materials

## Requirements

- **Language/Framework**: {{language_framework}}
- Tests must be created in a failing state
- Test names should be descriptive and written in English
- Clearly describe assertions (verification of expected values)
- Create by calling functions/methods that are not yet implemented

## Test Code Creation Guidelines

- Structure conscious of Given-When-Then pattern
- Test data preparation (Given)
- Actual process execution (When)
- Result verification (Then)

## Mandatory English Comment Requirements

Test code must include the following English comments:

### Comments at Test Case Start

```javascript
describe('{{feature_name}}', () => {
  test('{{test_case_name}}', () => {
    // 【Test Purpose】: [Clearly state what this test verifies in English]
    // 【Test Content】: [Explain what specific processing is being tested]
    // 【Expected Behavior】: [Explain the results when operating normally]
    // 🟢🟡🔴 Reliability Level: [How much this test content is based on source materials]

    // 【Test Data Preparation】: [Reason for preparing this data]
    // 【Initial Condition Setup】: [Explain the state before test execution]
    const input = {{test_input}};

    // 【Actual Processing Execution】: [Explain which feature/method is being called]
    // 【Processing Content】: [Explain the content of executed processing in English]
    const result = {{function_name}}(input);

    // 【Result Verification】: [Specifically explain what is being verified]
    // 【Expected Value Confirmation】: [Explain expected results and their rationale]
    expect(result).toBe({{expected_output}}); // 【Verification Content】: [Specific item being verified in this verification] 🟢🟡🔴
  });
});
```

### Setup and Cleanup Comments (as needed)

```javascript
beforeEach(() => {
  // 【Pre-test Preparation】: [Explain preparation work done before each test execution]
  // 【Environment Initialization】: [Reason and method for making test environment clean]
});

afterEach(() => {
  // 【Post-test Processing】: [Explain cleanup work done after each test execution]
  // 【State Restoration】: [Reason for restoring state to not affect next test]
});
```

### Comments for Each expect Statement

Each expect statement must have English comments:

```javascript
expect(result.property).toBe(expectedValue); // 【Verification Content】: [Specific item and reason being verified in this verification]
expect(result.array).toHaveLength(3); // 【Verification Content】: [Reason for confirming array length matches expected value]
expect(result.errors).toContain('error message'); // 【Verification Content】: [Reason for confirming specific error message is included]
```

## Example of Test Code to Create

```javascript
// Test file: {{test_file_name}}
describe('{{feature_name}}', () => {
  beforeEach(() => {
    // 【Pre-test Preparation】: Initialize test environment before each test execution to guarantee consistent test conditions
    // 【Environment Initialization】: Clean reset filesystem state to avoid influence from previous tests
  });

  afterEach(() => {
    // 【Post-test Processing】: Delete temporary files and directories created after test execution
    // 【State Restoration】: Return system to original state to not affect next test
  });

  test('{{test_case_name}}', () => {
    // 【Test Purpose】: {{test_purpose}}
    // 【Test Content】: {{test_description}}
    // 【Expected Behavior】: {{expected_behavior}}
    // 🟢🟡🔴 Reliability Level: [How much this test content is based on source materials]

    // 【Test Data Preparation】: {{test_data_reason}}
    // 【Initial Condition Setup】: {{initial_condition}}
    const input = {{test_input}};

    // 【Actual Processing Execution】: {{function_description}}
    // 【Processing Content】: {{process_description}}
    const result = {{function_name}}(input);

    // 【Result Verification】: {{verification_description}}
    // 【Expected Value Confirmation】: {{expected_result_reason}}
    expect(result).toBe({{expected_output}}); // 【Verification Content】: {{specific_verification_point}}
  });
});
```

## Please Provide

1. **Test Code**: In executable format with mandatory English comments
2. **Test Execution Command**: How to execute
3. **Expected Failure Message**: What kind of error will occur
4. **Comment Explanation**: Intent and purpose of each English comment

After creating test code, please execute the following:

1. **Create/Update Memo File**: Create or append Red phase content to docs/implements/{{task_id}}/{feature_name}-memo.md file
   - If existing memo file exists, update Red phase section
   - If memo file doesn't exist, create new one
2. Save test code design content to docs/implements/{{task_id}}/{feature_name}-red-phase.md (append if existing file is present)
3. Update TODO status (mark Red phase as complete)
4. **Quality Assessment**: Assess test code quality based on the following criteria
   - Test execution: Executable and confirmed to fail
   - Expected values: Clear and specific
   - Assertions: Appropriate
   - Implementation approach: Clear
5. **Show Next Steps**: Regardless of assessment results, display recommended next command
   - "Recommended next step: `/tdd-green` to start Green phase (minimal implementation)."

## TDD Memo File Format

Format for docs/implements/{{task_id}}/{feature_name}-memo.md file:

```markdown
# TDD Development Memo: {feature_name}

## Overview

- Feature Name: [feature name]
- Development Start: [date/time]
- Current Phase: [Red/Green/Refactor]

## Related Files

- Original Task File: `docs/tasks/{task file path}.md`
- Requirements Definition: `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- Test Case Definition: `docs/implements/{{task_id}}/{feature_name}-testcases.md`
- Implementation File: `[implementation file path]`
- Test File: `[test file path]`

## Red Phase (Create Failing Tests)

### Creation Date/Time

[date/time]

### Test Cases

[Overview of created test cases]

### Test Code

[Actual test code]

### Expected Failures

[What failures are expected]

### Requirements for Next Phase

[Content to be implemented in Green phase]

## Green Phase (Minimal Implementation)

### Implementation Date/Time

[date/time]

### Implementation Approach

[Minimal implementation approach]

### Implementation Code

[Actual implementation code]

### Test Results

[Results of tests passing]

### Issues and Improvements

[Points to improve in Refactor phase]

## Refactor Phase (Quality Improvement)

### Refactor Date/Time

[date/time]

### Improvement Content

[Specific improvement content]

### Security Review

[Security review results]

### Performance Review

[Performance review results]

### Final Code

[Code after refactoring]

### Quality Assessment

[Final quality assessment]
```

## Quality Assessment Criteria

```
✅ High Quality:
- Test execution: Success (confirmed to fail)
- Expected values: Clear and specific
- Assertions: Appropriate
- Implementation approach: Clear

⚠️ Needs Improvement:
- Tests cannot be executed
- Expected values are ambiguous
- Implementation approach is unclear
- Complex test cases
```

## TODO Update Pattern

```
- Mark current TODO "Red phase (failing test creation)" as "completed"
- Reflect completion of failing test creation phase in TODO content
- Record quality assessment results in TODO content
- Add next phase "Green phase (minimal implementation)" to TODO
```

Next step: `/tdd-green` to perform minimal implementation to make tests pass.
