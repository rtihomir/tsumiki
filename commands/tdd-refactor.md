# TDD Refactor Phase (Code Improvement)

Execute the TDD Refactor phase.

## Preliminary Preparation

Prepare the development context:

1. **Search for refactoring-related information with @agent-symbol-searcher and read found files**
   - Search for existing code styles and best practices, read style guides with Read tool
   - Identify project-wide architecture patterns, read design documents with Read tool
   - Check reusable utility functions and components, read related files with Read tool

2. **Directly read related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check test case definition
   - `docs/implements/{{task_id}}/{feature_name}-green-phase.md` - Check Green phase implementation
   - Also read related design documents or task files as needed

After completing the reading, start Refactor phase (code improvement) work based on the prepared context information.

## Reliability Level Instructions

When refactoring, comment on the verification status against source materials using the following signals:

- 🟢 **Green Signal**: When referencing source materials with minimal guesswork
- 🟡 **Yellow Signal**: When making reasonable inferences from source materials
- 🔴 **Red Signal**: When making assumptions not found in source materials

## Objective

Improve the code implemented in the Green phase from the following perspectives. **Tests must continue to pass** is the fundamental prerequisite.

## Improvement Perspectives

### 1. Readability Enhancement

- Improve variable names and function names
- Enhance Japanese comments
- Make code structure more understandable

### 2. Remove Duplicate Code (DRY Principle)

- Consolidate similar processes
- Extract constants
- Create helper functions

### 3. Design Improvement

- Apply single responsibility principle
- Organize dependencies
- Consider modularization

- NEVER: Write mocks/stubs in implementation code
- NEVER: Use in-memory storage as DB replacement in implementation code

### 4. File Size Optimization

- Split and optimize files to be under 500 lines
- Split large files by functionality
- Set appropriate module boundaries

### 5. Code Quality Assurance

- Resolve lint errors
- Resolve typecheck errors
- Unify formatting
- Clear static analysis tool checks

### 6. Security Review

- Detect and fix implementations that could lead to vulnerabilities
- Strengthen input validation
- Check SQL injection countermeasures
- Check XSS (Cross-Site Scripting) countermeasures
- Check CSRF (Cross-Site Request Forgery) countermeasures
- Avoid data leakage risks
- Proper implementation of authentication and authorization

### 7. Performance Review

- Algorithm computational complexity analysis
- Memory usage optimization
- Remove unnecessary processing
- Consider caching strategies
- Database query optimization
- Loop processing efficiency
- Proper asynchronous processing implementation

### 8. Enhanced Error Handling

- Input validation
- Appropriate error messages
- Improved exception handling

## Japanese Comment Enhancement Requirements for Refactoring

In refactoring, improve existing Japanese comments and add new comments:

### Improved Function/Method Comments

```javascript
/**
 * 【機能概要】: [Detailed explanation of functionality after refactoring]
 * 【改善内容】: [Explain what improvements were made]
 * 【設計方針】: [Reason for choosing this design]
 * 【パフォーマンス】: [Performance considerations]
 * 【保守性】: [Measures to improve maintainability]
 * 🟢🟡🔴 信頼性レベル: [How much this improvement is based on source materials]
 * @param {type} paramName - [Detailed parameter description and constraints]
 * @returns {type} - [Detailed return value description and guarantees]
 */
function improvedFunction(paramName) {
  // 【実装詳細】: [Content and reason for improved implementation]
}
```

### Helper Function/Utility Comments

```javascript
/**
 * 【ヘルパー関数】: [Role of this function and reason for creation]
 * 【再利用性】: [In what situations this can be reused]
 * 【単一責任】: [Scope of responsibility this function handles]
 */
function helperFunction(input) {
  // 【処理効率化】: [Measures to improve processing efficiency] 🟢🟡🔴
  // 【可読性向上】: [Mechanisms to improve code readability] 🟢🟡🔴
}
```

### Constant/Configuration Value Comments

```javascript
// 【設定定数】: [Role of this constant and reason for setting] 🟢🟡🔴
// 【調整可能性】: [Possibility of future adjustments and methods] 🟢🟡🔴
const IMPROVED_CONSTANT = 100; // 【最適化済み】: Optimized based on performance tests 🟢🟡🔴

// 【設定オブジェクト】: [Reason for grouping settings and management policy]
const CONFIG = {
  // 【各設定項目】: [Meaning and impact scope of each setting value]
  maxRetries: 3, // 【リトライ回数】: Appropriate count based on operational experience
  timeout: 5000, // 【タイムアウト】: Time setting considering usability
};
```

### Error Handling Improvement Comments

```javascript
try {
  // 【安全な処理実行】: [Possibility of exceptions and countermeasures]
  const result = riskyOperation();
} catch (error) {
  // 【詳細エラー処理】: [Appropriate handling according to error type]
  // 【ユーザビリティ】: [User-friendly error handling]
  if (error.code === 'SPECIFIC_ERROR') {
    // 【特定エラー対応】: [Reason for processing specific to this error]
    return handleSpecificError(error);
  }
  // 【一般エラー対応】: [Safe handling of unexpected errors]
  return handleGenericError(error);
}
```

## Refactoring Procedure

1. **Confirm all current tests pass**
   - 【品質保証】: Verify behavior before refactoring
   - 【安全性確保】: Prevent functional breakdown due to changes
   - 【実行方法】: Execute tests using Task tool and analyze results in detail
2. **Code and test exclusion check**
   - 【.gitignore確認】: Check if code files that should be reviewed are not excluded
   - 【テスト除外確認】: Check if tests are disabled with `describe.skip`, `it.skip`, `test.skip`, etc.
   - 【jest設定確認】: Check if test files are excluded in `jest.config.js` or `testPathIgnorePatterns` in `package.json`
   - 【実行対象確認】: Check if tests and code that should be executed are properly included in targets
3. **Development-generated file cleanup**
   - 【不要ファイル検出】: Detect and delete temporary files created during development
   - 【対象ファイルパターン】: Check files matching the following patterns
     - `debug-*.js`, `debug-*.ts`: Debug scripts
     - `test-*.js`, `test-*.ts`, `temp-*.js`: Temporary test files
     - `*.tmp`, `*.temp`, `*.bak`, `*.orig`: Temporary and backup files
     - `*~`, `.DS_Store`: Editor and system-generated files
     - `test-output-*`, `*.test-output`: Test output files
   - 【安全確認】: Check content of each file before deletion to ensure no important code is included
   - 【選択的削除】: Delete only files determined unnecessary, keep necessary files
   - 【削除ログ】: Record deleted files and deletion reasons as log
   - 【実行手順】: 
     1. Detect files with `find . -name "debug-*" -o -name "test-*" -o -name "temp-*" -o -name "*.tmp" -o -name "*.temp" -o -name "*.bak" -o -name "*.orig" -o -name "*~" -o -name ".DS_Store" | grep -v node_modules`
     2. Check content of each file with Read tool
     3. Delete files determined unnecessary and record deletion reasons
4. **Conduct security review**
   - 【脆弱性検査】: Identify security holes in entire codebase
   - 【入力検証確認】: Check defense functions against malicious input values
   - 【セキュリティガイドライン適用】: Apply industry standard security best practices
5. **Conduct performance review**
   - 【計算量解析】: Evaluate time and space complexity of algorithms
   - 【ボトルネック特定】: Identify problem areas in processing speed or memory usage
   - 【最適化戦略】: Plan specific performance improvement measures
6. **Apply small improvements one by one**
   - 【段階的改善】: Safe changes with limited impact scope
   - 【トレーサビリティ】: Ensure traceability of change content
7. **Run tests after each improvement**
   - 【継続的検証】: Verify behavior with each improvement
   - 【早期発見】: Early detection and correction of problems
   - 【実行方法】: Execute tests using Task tool and check impact of improvements
8. **Immediately revert if tests fail**
   - 【迅速復旧】: Quick response when problems occur
   - 【安定性維持】: Maintain stable system state

## Precautions

- **Do not make functional changes** (adding new features is NG)
- **Fix immediately if tests stop passing**
- **Do not make large changes at once**
- **Also improve quality of Japanese comments**
- **Use Task tool when running tests for quality verification**

## Please Provide

1. **Security Review Results**: Presence of vulnerabilities and countermeasures
2. **Performance Review Results**: Analysis of performance issues and improvement measures
3. **Improved Code**: Code after refactoring (with enhanced Japanese comments)
4. **Explanation of Improvement Points**: What and how improvements were made (including security and performance perspectives)
5. **Test Execution Results**: Confirm all tests continue to pass using Task tool
6. **Quality Assessment**: Current code quality level (including security and performance evaluation)
7. **Comment Improvement Content**: How Japanese comments were enhanced

## Refactoring Example

```javascript
// Before: Hard coding
function add(a, b) {
  return 5; // Just working implementation
}

// After: Proper implementation (with improved Japanese comments)
/**
 * 【機能概要】: Add two numbers and return the result
 * 【改善内容】: Removed hard coding and implemented actual addition processing
 * 【設計方針】: Design emphasizing input validation and type safety
 * 【エラー処理】: Implemented proper exception handling for invalid input
 */
function add(firstNumber, secondNumber) {
  // 【入力値検証】: Early detection of non-numeric input to prevent errors
  // 【型安全性】: Runtime validation combined with TypeScript type checking
  if (typeof firstNumber !== 'number' || typeof secondNumber !== 'number') {
    // 【ユーザビリティ】: Provide clear error messages for developers
    throw new Error('引数は数値である必要があります');
  }

  // 【メイン処理】: Simple and reliable addition processing
  // 【パフォーマンス】: Efficient implementation avoiding unnecessary processing
  return firstNumber + secondNumber;
}
```

After completing refactoring, execute the following:

1. **Final memo file update**: Update Refactor phase section and overview in docs/implements/{{task_id}}/{feature_name}-memo.md
   - Record improvement content, security review results, performance review results
   - Record final code and quality assessment
   - Update current phase in overview section to "completed"
2. Save refactoring content and design improvements to docs/implements/{{task_id}}/{feature_name}-refactor-phase.md (append if existing file)
3. Update TODO status (mark Refactor phase completion)
4. **Quality Assessment**: Judge refactoring results quality by the following criteria
   - Test Results: All tests continue to succeed
   - Security: No critical vulnerabilities discovered
   - Performance: No critical performance issues discovered
   - Refactor Quality: Goals achieved
   - Code Quality: Improved to appropriate level
5. **Display Next Step**: Regardless of assessment results, display next recommended command
   - "Next recommended step: Execute completeness verification with `/tdd-verify-complete`."

## Quality Assessment Criteria

```
✅ High Quality:
- Test Results: All continue to succeed with Task tool execution
- Security: No critical vulnerabilities
- Performance: No critical performance issues
- Refactor Quality: Goals achieved
- Code Quality: Appropriate level
- Documentation: Complete

⚠️ Needs Improvement:
- Some tests fail (detected by Task tool)
- Security vulnerabilities discovered
- Performance issues discovered
- Refactor goals not achieved
- Insufficient quality improvement
- Documentation deficiencies
```

## TODO Update Pattern

```
- Mark current TODO "Refactor Phase (Quality Improvement)" as "completed"
- Reflect refactoring phase completion in TODO content
- Record quality assessment results in TODO content
- Add next phase "Completeness Verification" to TODO
- Add new TODOs for areas that need improvement if any
```