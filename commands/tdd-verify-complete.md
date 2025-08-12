# TDD Test Case Completeness Verification

Verify that test case implementation is completely finished in TDD development.

## Purpose of Verification

After refactoring, confirm that all planned test cases have been implemented to prevent implementation gaps.

## Important Principles

**⚠️ Do not make any fixes in this process**
- No code or test fixes should be made during this verification phase
- If problems are discovered, record them in the memo file
- Delegate fix work to later processes (next TDD cycle or separate tasks)
- Focus on verification, recording, and reporting

## Verification Procedure

### 1. Confirm Green State of Existing Tests

- **Required**: Confirm all existing tests are successful
- Run `npm test` or `jest` to check test results
- **If test failures exist**: Record in memo file and address fixes in later process
- **Fix prohibited in this process**: Do not fix test failures even if discovered
- Record test state and proceed to next step

### 2. Preliminary Preparation

Prepare verification context:

1. **Search for verification-related information with @agent-symbol-searcher and read found files**
   - Search for planned test cases and features, read corresponding files with Read tool
   - Check existing test coverage and quality standards, read related files with Read tool
   - Identify implementation completion task marking patterns, read task files with Read tool

2. **Directly read related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - `docs/implements/{{task_id}}/{feature_name}-refactor-phase.md` - Check Refactor phase results
   - Original task file (`docs/tasks/{taskfile}.md`) - Check task completion status

After completing the reading, start test case completeness verification based on the prepared context information.

### 2. Check Implemented Test Cases

- Check current test files
- Count number of implemented test cases
- Compare content of each test case with plan

### 3. Implementation Status Analysis and TODO.md Update Decision

Provide analysis results in the following format:

```
## Test Case Implementation Status

### 📋 TODO.md Target Task Confirmation
- **Target Task**: [Current TDD development target task name]
- **Current Status**: [Incomplete/Partially Complete/Completed]
- **Completion Mark Required**: [Required/Not Required]

### 📋 Planned Test Cases (from requirements definition)
- **Total**: [Total number of planned test cases]
- **Classification**:
  - Normal cases: [number] cases
  - Error cases: [number] cases
  - Edge cases: [number] cases
  - Others: [number] cases

### ✅ Implemented Test Cases
- **Total**: [Total number of implemented test cases]
- **Success Rate**: [Passing tests]/[Implemented tests] ([success rate]%)

### ❌ Unimplemented Test Cases ([number] cases)
1. **Test Case Name**: [Planned but unimplemented test]
   - **Type**: [Normal/Error/Edge case]
   - **Content**: [Detailed test content]
   - **Importance**: [High/Medium/Low]
   - **Requirements Item**: [Corresponding requirements definition item]

2. **Test Case Name**: [Second unimplemented test]
   ...

### 📋 Requirements Definition Coverage Check
- **Total Requirements Items**: [Total items in requirements definition]
- **Implemented Items**: [Number of implemented and tested items]
- **Requirements Coverage**: [Implemented]/[Total] = [coverage rate]%

#### Uncovered Requirements Items ([number] items)
1. **Requirements Item**: [Unimplemented requirements item name]
   - **Classification**: [Input parameters/Output specification/Constraints/Usage examples/Error cases, etc.]
   - **Content**: [Detailed requirements content]
   - **Reason for Non-implementation**: [Why not implemented]
   - **Need for Action**: [Required/Recommended/Optional]

2. **Requirements Item**: [Second uncovered item]
   ...

### 📊 Implementation Rate
- **Overall Implementation Rate**: [Implemented]/[Planned] = [implementation rate]%
- **Normal Case Implementation Rate**: [Implemented]/[Planned] = [implementation rate]%
- **Error Case Implementation Rate**: [Implemented]/[Planned] = [implementation rate]%
- **Edge Case Implementation Rate**: [Implemented]/[Planned] = [implementation rate]%
```

### 4. Assessment Criteria

#### ✅ Completely Implemented (Automatically proceed to next step)

```
- Existing test state: All green
- Requirements coverage: 100% (All requirements items implemented and tested)
- Test success rate: 100%
- Unimplemented important requirements: 0
- Quality standard: Complete fulfillment of requirements definition achieved
```

#### ⚠️ Implementation Insufficient (Additional implementation needed)

```
- Existing test state: Failed tests present OR
- Requirements coverage: Less than 100% (Implementation insufficient for requirements definition items)
- Important requirements items unimplemented/untested
- Quality risk in requirements fulfillment
```

### 5. Record Verification Results in Memo File and Update TODO.md

#### Integrated Memo File Update

After verification completion, organize and integrate existing content in `docs/implements/{{task_id}}/{feature_name}-memo.md` and update to the following information:

```markdown
# [Feature Name] TDD Development Completion Record

## Documents to Check

- `docs/tasks/{task file path}.md`
- `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- `docs/implements/{{task_id}}/{feature_name}-testcases.md`

## 🎯 Final Results ([Date/Time])
- **Implementation Rate**: [number]% ([implemented]/[planned] test cases)
- **Quality Assessment**: [Pass/Fail] 
- **TODO Update**: [✅Completion mark added/Needs improvement]

## 💡 Important Technical Learning
### Implementation Patterns
[Important implementation techniques reusable in the future]

### Test Design
[Effective test approaches]

### Quality Assurance
[Important perspectives for quality assurance]

## ⚠️ Cautions and Items Requiring Fixes (if applicable)
[Important cautions during implementation or incomplete items]

### 🔧 Fix Targets for Later Processes
#### Test Failures
- [Failing test case name]
- **Failure Content**: [Specific failure content]
- **Fix Policy**: [Recommended fix method]

#### Implementation Insufficient
- [Unimplemented features or requirements]
- **Insufficient Content**: [Specific insufficient content]
- **Response Policy**: [Recommended response method]

#### Quality Improvement
- [Areas requiring quality improvement]
- **Improvement Content**: [Specific improvement content]
- **Improvement Policy**: [Recommended improvement method]

---
*Important information integrated from existing memo content, duplicate and detailed progress records removed*
```

**Integrated Update Rules:**
1. **Preserve Important Information**: Integrate technical learning points and reusable patterns from existing memos
2. **Remove Duplicates**: Consolidate similar records and details into latest information  
3. **Simplify**: Keep only final results for dates, numbers, and other details
4. **Emphasize Reusability**: Prioritize information useful for future development
5. **Emphasize Related Information**: Prioritize specification information and other related data

#### Automatic Update of Original Task File Completion Mark

When verification is complete, automatically update the original task file with the following procedure:

1. **Identify Completed Task**: Identify current TDD development target task from original task file
2. **Add Completion Mark**: Add `✅ **Complete**` mark to corresponding task
3. **Record Completion Reason**: Add `(TDD development complete - [test count] test cases all passing)`
4. **Update Subtasks**: Add `[x]` check marks to related subtasks

Example:

```markdown
### 1. JSON File Path Argument Processing Feature ✅ **Complete** (TDD development complete - 15 test cases all passing)

- [x] Add feature to receive JSON file path as command line argument
- [x] Support multiple JSON file paths (reading entire sample/ directory)
- [x] Argument validation feature
```

### 6. Response Actions

#### When Completely Implemented

Display the following message with next recommended command:

```
✅ Test Case Completeness Verification: Pass
- Planned test cases: All [number] cases implemented
- Test success rate: 100%
- Quality standard: Achieved

Next recommended step: Start next TDD cycle with `/tdd-cycle`.
```

**Memo File Recording**: Automatically append verification results to memo file.
**Original Task File Update**: Automatically add ✅ completion mark to completed tasks.

#### When Implementation is Insufficient

Provide the following message and record the situation:

```
⚠️ Test Case Implementation Insufficient Detected

Unimplemented test cases ([number] cases) exist.
The following content has been recorded in the memo file:

[List of unimplemented test cases]

【Important】No fixes are made in this process.
Content requiring fixes is recorded in the memo file and will be addressed in later processes.

Complete current status recording and proceed to next step.
```

**Memo File Recording**: Record detailed verification results and fix policies for implementation insufficiency in memo file.
**Original Task File Update**: Even when implementation is insufficient, appropriately mark partially completed tasks.
**Fix Work Prohibited**: No fix work is performed in this process.

## Verification Target Files

### Documents to Check

- **Original Task File**: `docs/tasks/{task file path}.md` - Overall project task completion status (completion mark update target)
- `docs/implements/{{task_id}}/{feature_name}-requirements.md`
- `docs/implements/{{task_id}}/{feature_name}-testcases.md`

### Test Files to Check

- `src/__tests__/*.test.ts`
- `src/__tests__/*.test.js`

### Implementation Files to Check

- `src/*.ts`
- `src/*.js`

### Files Changed in Git

- Files changed by `git status`
- Files changed by `git diff --name-only`

## Quality Standards

### Minimum Quality Standards

- **Implementation Rate**: 80% or higher
- **Success Rate**: 100%
- **Important Tests**: All implemented
- **Requirements Coverage**: Cover all major features in requirements definition
- **Compilation Errors**: None

### Ideal Quality Standards

- **Implementation Rate**: 100%
- **Success Rate**: 100%
- **Coverage**: All cases covered
- **Complete Requirements Coverage**: Cover all items in requirements definition

### Requirements Definition Coverage Check

Check if the following items recorded in the requirements definition (requirements.md) are implemented and tested:

#### Required Check Items

- **Input Parameters**: Processing of all required and optional arguments
- **Output Specification**: Implementation of expected output format and structure
- **Constraints**: Performance, security, compatibility requirements
- **Basic Usage Examples**: Assumed basic usage patterns
- **Edge Cases**: Boundary value and exception condition processing
- **Error Cases**: Appropriate processing of abnormal cases
- **Main Algorithms**: Core processing logic of functionality

#### Coverage Assessment Criteria

```
✅ Complete Coverage (100%):
- All items in requirements definition are implemented and tested
- Test all patterns of input parameters
- Verify all output specification formats
- Cover all error cases and edge cases

⚠️ Partial Coverage (80-99%):
- Main features implemented but some items unimplemented
- Basic usage examples covered
- Some non-critical error cases unimplemented

❌ Insufficient (<80%):
- Important items in requirements definition unimplemented
- Gaps in basic usage examples
- Insufficient error handling
```

## Automatic Transition Decision

### Quality Assessment Criteria

```
✅ High Quality (Complete Requirements Fulfillment Achieved):
- Existing test state: All green
- Requirements coverage: 100% (Complete implementation and testing for all requirements definition items)
- Test success rate: 100%
- Unimplemented important requirements: 0
- Requirements fulfillment: Complete fulfillment of requirements definition achieved

⚠️ Needs Improvement (Requirements Fulfillment Insufficient):
- Existing test state: Failed tests present OR
- Requirements coverage: Less than 100% (Implementation and testing insufficient for requirements definition items)
- Important requirements items unimplemented/untested
- Requirements fulfillment: Fulfillment insufficient for requirements definition
- Need to improve requirements fulfillment through additional implementation
```

## Usage Example

```bash
# Auto-execute after refactor phase
/tdd-refactor
# ↓ Auto-execute
/tdd-verify-complete
# ↓ Auto-execute if implementation complete
/tdd-cycle
```

## Output Format

Output in one of the following formats depending on implementation status:

### When Complete Implementation

```
✅ **Test Case Completeness Verification: Pass**

📊 Current Task Requirements Fulfillment:
- Target requirements items: [number] items
- Implemented and tested: [number] items / Unimplemented: [number] items
- Requirements coverage: 100%
- Requirements fulfillment: Complete achievement

📊 Overall Test Status:
- Total test cases: [number] cases  
- Success: [number] cases / Failure: [number] cases
- Overall test success rate: [number]%

🚀 Complete fulfillment of requirements definition achieved.
Automatically proceed to next TDD cycle.
```

### When Implementation Insufficient

```
⚠️ **Test Case Implementation Insufficient Detected**

📊 Current Task Requirements Fulfillment:
- Target requirements items: [number] items
- Implemented and tested: [number] items / Unimplemented: [number] items  
- Requirements coverage: [number]%
- Requirements fulfillment: [fulfillment level]

📊 Overall Test Status:
- Total test cases: [number] cases
- Success: [number] cases / Failure: [number] cases
- Overall test success rate: [number]%

❌ Unimplemented test cases:
[Detailed list of unimplemented test cases]

📝 **Fix content recorded in memo file**
Will be addressed in later processes. No fixes made in this process.
```

This verification ensures the quality and completeness of TDD development.