# TDD Test Case Identification

Based on the requirements organized earlier, we'll identify test cases.

## Preparation

Prepare the development context:

1. **Search for test-related information with @agent-symbol-searcher and read found files**
   - Search for existing test patterns or test cases and read relevant test files with Read tool
   - Identify similar feature testing methods or mock strategies and read related files with Read tool
   - Check test framework usage and read configuration files with Read tool

2. **Directly read related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check existing test cases
   - Read related design documents or task files as needed

After completing the reading, begin test case identification based on the prepared context information.

## Reliability Level Instructions

When creating each test case, always comment on the verification status against source materials (requirements definition, existing implementation, library documentation, etc.) using the following signals:

- 🟢 **Green Signal**: When referencing source materials with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on source materials
- 🔴 **Red Signal**: When making speculation not found in source materials

## Test Case Classification

### 1. Normal Case Test Cases (Basic Operations)

Please describe in the following format:

- **Test Name**: [Clear descriptive name]
  - **What to Test**: [Specific behavior or functionality to verify in this test]
  - **Expected Behavior**: [What processing should execute normally]
- **Input Values**: [Specific values]
  - **Input Data Meaning**: [Why these input values were chosen, what they represent]
- **Expected Results**: [Specific expected values]
  - **Reason for Expected Results**: [Why these results are considered correct]
- **Test Purpose**: [What to verify]
  - **Verification Points**: [Points that require special attention during verification]
- 🟢🟡🔴 Record reliability level for this test case

### 2. Abnormal Case Test Cases (Error Handling)

- **Test Name**: [Clear descriptive name]
  - **Error Case Overview**: [What abnormal situation is being assumed]
  - **Importance of Error Handling**: [Why this error handling is necessary]
- **Input Values**: [Invalid values or values exceeding boundaries]
  - **Reason for Invalidity**: [Why these input values are considered invalid]
  - **Actual Occurrence Scenarios**: [In what situations this might occur in actual operation]
- **Expected Results**: [Appropriate error messages or exceptions]
  - **Error Message Content**: [Is the message user-friendly]
  - **System Safety**: [Can the system maintain a safe state during errors]
- **Test Purpose**: [Error handling verification]
  - **Quality Assurance Perspective**: [How this test contributes to system quality]
- 🟢🟡🔴 Record reliability level for this test case

### 3. Boundary Value Test Cases (Minimum, Maximum, null, etc.)

- **Test Name**: [Clear descriptive name]
  - **Boundary Value Meaning**: [Why this value is important as a boundary]
  - **Behavior Guarantee at Boundaries**: [Consistency verification of behavior near boundaries]
- **Input Values**: [Boundary values]
  - **Rationale for Boundary Value Selection**: [Why this value was chosen as a boundary]
  - **Actual Usage Scenarios**: [How this boundary value affects actual operation]
- **Expected Results**: [Behavior at boundaries]
  - **Accuracy at Boundaries**: [Are calculations and processing performed accurately at boundary values]
  - **Consistent Behavior**: [Is behavior consistent inside and outside the boundary]
- **Test Purpose**: [Boundary condition verification]
  - **Robustness Verification**: [Does the system operate stably under extreme conditions]
- 🟢🟡🔴 Record reliability level for this test case

## Development Language and Framework

Please also specify the language and test framework to be used for implementation:

- **Programming Language**: {{language}}
  - **Reason for Language Selection**: [Why this language was chosen]
  - **Features Suitable for Testing**: [Characteristics of this language that are advantageous for testing]
- **Test Framework**: {{test_framework}}
  - **Reason for Framework Selection**: [Why this test framework was chosen]
  - **Test Execution Environment**: [In what environment will tests be executed]
- 🟢🟡🔴 Record reliability level for this content

## Guidelines for English Comments in Test Case Implementation

When implementing each test case, always include the following English comments:

### Comments at Test Case Start

```javascript
// 【Test Purpose】: [Clearly state in English what this test verifies]
// 【Test Content】: [Explain what specific processing is being tested]
// 【Expected Behavior】: [Explain the results when operating normally]
// 🟢🟡🔴 Record reliability level for this content
```

### Given (Preparation Phase) Comments

```javascript
// 【Test Data Preparation】: [Reason for preparing this data]
// 【Initial Condition Setup】: [Explain the state before test execution]
// 【Prerequisite Verification】: [Specify prerequisites needed for test execution]
```

### When (Execution Phase) Comments

```javascript
// 【Actual Processing Execution】: [Explain which feature/method is being called]
// 【Processing Content】: [Explain the content of executed processing in English]
// 【Execution Timing】: [Explain why execution happens at this timing]
```

### Then (Verification Phase) Comments

```javascript
// 【Result Verification】: [Specifically explain what is being verified]
// 【Expected Value Confirmation】: [Explain expected results and their rationale]
// 【Quality Assurance】: [Explain how this verification contributes to system quality]
```

### Comments for Each expect Statement

```javascript
// 【Verification Item】: [Specific item being verified in this verification]
// 🟢🟡🔴 Record reliability level for this content
expect(result.validPaths).toHaveLength(2); // 【Verification Content】: Confirm that exactly 2 valid paths are detected
expect(result.invalidPaths).toContain('nonexistent.json'); // 【Verification Content】: Confirm that non-existent files are properly classified as invalid paths
```

### Setup and Cleanup Comments

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

After identifying all test cases, please execute the following:

1. Save test case list to docs/implements/{{task_id}}/{feature_name}-testcases.md (append if existing file is present)
2. Update TODO status (mark test case identification as complete)
3. **Quality Assessment**: Assess test case quality based on the following criteria
   - Test case classification: Normal cases, abnormal cases, and boundary values are covered
   - Expected value definition: Expected values for each test case are clear
   - Technology selection: Programming language and test framework are determined
   - Implementation feasibility: Achievable with current technology stack
4. **Show Next Steps**: Regardless of assessment results, display recommended next command
   - "Recommended next step: `/tdd-red` to start the Red phase (failing test creation)."

## Quality Assessment Criteria

Assess test case quality based on the following criteria:

```
✅ High Quality:
- Test case classification: Normal cases, abnormal cases, and boundary values are covered
- Expected value definition: Expected values for each test case are clear
- Technology selection: Programming language and test framework are determined
- Implementation feasibility: Achievable with current technology stack

⚠️ Needs Improvement:
- Test cases have gaps or duplications
- Expected values are ambiguous or insufficient
- Technology selection is uncertain
- Too complex to implement

❌ Inappropriate:
- Not consistent with requirements
- Test cases are insufficient
- Technical feasibility issues
```

## TODO Update Pattern

```
- Mark current TODO "Test case identification" as "completed"
- Reflect completion of test case definition phase in TODO content
- Record quality assessment results in TODO content
- Add next phase "Red phase (failing test creation)" to TODO
```
