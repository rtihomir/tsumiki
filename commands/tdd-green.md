# TDD Green Phase (Implementation)

Execute the TDD Green phase.

## Preliminary Preparation

Prepare the development context:

1. **Search for implementation-related information with @agent-symbol-searcher and read found files**
   - Search for existing similar features or utility functions and read corresponding files with Read tool
   - Identify implementation patterns or architecture guidelines and read design documents with Read tool
   - Check dependencies and import paths and read related files with Read tool

2. **Directly read related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - `docs/implements/{{task_id}}/{feature_name}-red-phase.md` - Check Red phase tests
   - Also read related design documents or task files as needed

After completing the reading, start Green phase (implementation) work based on the prepared context information.

**Use Task tool when running tests**

## Reliability Level Instructions

When creating implementation code, comment on the verification status against source materials using the following signals:

- 🟢 **Green Signal**: When referencing source materials with minimal guesswork
- 🟡 **Yellow Signal**: When making reasonable inferences from source materials
- 🔴 **Red Signal**: When making assumptions not found in source materials

## Objective

Perform **implementation** to make the tests created in the Red phase pass.

## Implementation Principles

- **Making tests pass is the top priority**
- Code beauty is secondary (improved in next Refactor phase)
- "Just working" level is OK
- Postpone complex logic, focus on simple implementation
- When tests don't pass easily, use Task tool to investigate failure causes before planning fixes
- When existing tests error, fix appropriately based on specifications
- **Mock Usage Restrictions**: Do not write mocks outside test code (implementation code should contain actual logic)
- **File Size Management**: Consider file splitting when implementation file exceeds 800 lines
- NEVER: Skip required tests
- NEVER: Delete required tests
- NEVER: Write mocks/stubs in implementation code
- NEVER: Use in-memory storage as DB replacement in implementation code
- NEVER: Omit DB operations in implementation code

## Japanese Comment Requirements for Implementation

Implementation code must include the following Japanese comments:

### Function/Method Level Comments

```javascript
/**
 * 【機能概要】: [Describe what this function does in Japanese]
 * 【実装方針】: [Explain why this implementation approach was chosen]
 * 【テスト対応】: [Specify which test cases this implementation addresses]
 * 🟢🟡🔴 信頼性レベル: [How much this implementation is based on source materials]
 * @param {type} paramName - [Parameter description]
 * @returns {type} - [Return value description]
 */
function {{function_name}}(paramName) {
  // 【実装内容】: [Detailed explanation of the implemented process]
}
```

### Processing Block Level Comments

```javascript
function processData(input) {
  // 【入力値検証】: [Reason and method for input validation] 🟢🟡🔴
  if (!input) {
    throw new Error('入力値が不正です'); // 【エラー処理】: [Explain why this error is necessary] 🟢🟡🔴
  }

  // 【データ処理開始】: [Indicate start of main processing] 🟢🟡🔴
  // 【処理方針】: [Explain how this process contributes to passing tests] 🟢🟡🔴
  const result = {
    // 【結果構造】: [Explain the return value structure and its reason]
    validData: [],
    invalidData: [],
    errors: [],
  };

  // 【結果返却】: [Explain the reason for returning results and content description]
  return result;
}
```

### Variable/Constant Comments

```javascript
// 【定数定義】: [Reason this constant is needed and its purpose]
const MAX_FILE_SIZE = 1024 * 1024; // 【制限値】: Set file size limit (1MB)

// 【変数初期化】: [Explain why this variable is needed for test passing]
let processedCount = 0; // 【カウンタ】: Counter to track the number of processed files
```

### Error Handling Comments

```javascript
try {
  // 【実処理実行】: [Description of the actual processing execution section]
  const data = processFile(filePath);
} catch (error) {
  // 【エラー捕捉】: [Error handling policy when errors occur]
  // 【テスト要件対応】: [Processing to meet expected error handling in tests]
  return {
    success: false,
    error: error.message, // 【エラー情報】: Properly return error messages verified in tests
  };
}
```

## Implementation Example

```javascript
/**
 * 【機能概要】: Validate JSON file paths and classify valid/invalid paths
 * 【実装方針】: Implement only the minimum features necessary to pass test cases
 * 【テスト対応】: Implementation to pass test cases created in tdd-red phase
 */
function {{function_name}}(input) {
  // 【入力値検証】: Early detection of invalid input values to prevent errors
  if (!input) {
    // 【エラー処理】: Handle error cases expected in tests
    throw new Error('入力値が必要です');
  }

  // 【最小限実装】: Simplest implementation to pass tests
  // 【ハードコーディング許可】: Fixed values OK at this stage, will improve in refactor phase
  return {{simple_return_value}};
}
```

## Stepwise Implementation Guidelines

1. **First make only one test case pass**
   - 【実装戦略】: Avoid handling multiple tests simultaneously to prevent complexity
   - 【品質確保】: Ensure quality by implementing one at a time
2. **Implement using the simplest method**
   - 【シンプル実装】: Add complex algorithms in later refactor
   - 【可読性重視】: Prioritize understandability at this stage
3. **File size-conscious implementation**
   - 【800行制限】: Consider splitting when implementation file exceeds 800 lines
   - 【モジュール設計】: Properly separate files by functional units
   - 【関数分割】: Split large functions into smaller units
   - 【責任境界】: Clearly define responsibility scope for each file
   - 【分割戦略】: Separate files by function, layer, and domain
4. **Code quality standards consideration**
   - 【静的解析対応】: Aim for implementation without lint or typecheck errors
   - 【フォーマット統一】: Implementation consistent with existing project format
   - 【命名規則遵守】: Implementation following project naming conventions
5. **Other test cases come later**
   - 【段階的開発】: Follow TDD principles, proceed one step at a time
   - 【影響範囲限定】: Minimize impact of changes
6. **Minimal error handling**
   - 【必要最小限】: Implement only parts required by tests
   - 【将来拡張可能】: Plan to add detailed error handling in refactor phase
7. **Mock usage restrictions**
   - 【実装コード制限】: Do not use mocks/stubs in implementation code
   - 【テストコード限定】: Use mocks only within test code
   - 【実際のロジック実装】: Write actual processing in implementation code
   - 【依存関係注入】: Implement with dependency injection pattern if needed

## Please Provide

1. **Implementation Code**: Code that passes tests (with required Japanese comments)
2. **Test Execution Results**: Confirm tests actually pass using Task tool
3. **Implementation Explanation**: Reasoning behind implementation (correspondence with Japanese comments)
4. **Issue Identification**: Current implementation problems (clear refactor targets)
5. **File Size Check**: Check implementation file line count (split plan if exceeding 800 lines)
6. **Mock Usage Verification**: Confirm no mocks/stubs included in implementation code

After completing implementation, execute the following:

1. **Update Memo File**: Update Green phase section in docs/implements/{{task_id}}/{feature_name}-memo.md
   - Record implementation policy, implementation code, test results, issues and improvements
   - Record in detail for reference in next Refactor phase
2. Save implementation code and design content to docs/implements/{{task_id}}/{feature_name}-green-phase.md (append if existing file)
3. Update TODO status (mark Green phase completion)
4. **Automatic Transition Decision**: Automatically execute `/tdd-refactor` if the following conditions are met
   - Confirmed all tests succeed using Task tool
   - Implementation is simple and understandable
   - Clear refactoring points exist
   - No functional problems
5. **Manual Confirmation**: If automatic transition conditions are not met, provide the following:
   - "Confirmed tests pass using Task tool."
   - "Current implementation: [brief description]"
   - "Japanese comments included in implementation: [purpose and content of comments]"
   - "Refactoring candidates: [points to improve]"
   - "Is it okay to proceed to the next Refactor phase?"

## Quality Assessment Criteria

```
✅ High Quality:
- Test Results: All successful with Task tool execution
- Implementation Quality: Simple and functional
- Refactor Points: Clearly identifiable
- Functional Issues: None
- Compilation Errors: None
- File Size: 800 lines or less, or clear split plan
- Mock Usage: No mocks/stubs in implementation code

⚠️ Needs Improvement:
- Some tests fail (detected by Task tool)
- Implementation too complex
- Unclear refactor policy
- Functional concerns exist
- Compilation errors exist
- File size exceeds 800 lines with unclear split plan
- Mocks/stubs included in implementation code
```

## TODO Update Pattern

```
- Mark current TODO "Green Phase (Minimal Implementation)" as "completed"
- Reflect minimal implementation phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Refactor Phase (Quality Improvement)" to TODO
```

Next step: `/tdd-refactor` to improve code quality.
