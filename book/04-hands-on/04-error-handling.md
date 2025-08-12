# 4.4 Error Handling and Debugging

## Learning Objectives

This chapter covers approaches to various errors that occur during AITDD development and effective debugging techniques:

- Understanding error patterns specific to AI-generated code
- Identifying and fixing prompt-related errors
- Establishing efficient debugging processes
- Making decisions to switch to manual implementation and practicing it
- Best practices for error prevention

## Error Classification and Response Strategies

AITDD development encounters different types of errors than traditional development. It's important to properly classify these and apply appropriate solutions for each.

### Basic Error Classification

**1. Prompt-Related Errors**
- Due to ambiguous instructions
- Due to unclear requirements
- Due to insufficient context

**2. AI Implementation Errors**
- Bugs in AI-generated code
- Consistency issues with existing code
- Performance problems

**3. Integration Errors**
- Problems during multi-feature integration
- Interface inconsistencies
- Dependency issues

**4. Traditional Errors**
- General programming errors
- Environment configuration problems
- External dependency issues

## Practical Debugging Process

### Step 1: Comprehensive Error Information Collection

When an error occurs, first systematically collect information.

**Information to Collect**:
```markdown
## Error Information Collection Checklist

### Basic Information
- [ ] Error message (complete version)
- [ ] Stack trace
- [ ] Occurrence timing
- [ ] Execution environment

### Context Information
- [ ] Executed command
- [ ] Input data
- [ ] Expected behavior
- [ ] Actual behavior

### AI-Related Information
- [ ] Used prompt
- [ ] Relevant AI-generated code section
- [ ] Related existing code

### Execution Environment
- [ ] OS/Browser information
- [ ] Node.js/TypeScript version
- [ ] Dependency package status
```

**Information Collection Example**:
```
Error occurrence record example:

Error Message:
TypeError: Cannot read property 'map' of undefined
    at getAllTasks (TaskController.ts:15)
    at Router.handle (express/lib/router/layer.js:95)

Occurrence Timing:
During GET /api/tasks endpoint test execution

Input Data:
GET http://localhost:3000/api/tasks

Expected Behavior:
Response containing empty array should be returned

Actual Behavior:
Error calling map on undefined

Used Prompt:
"Please implement an API endpoint that calls the getAllTasks method of the TaskManager class and returns a response"
```

### Step 2: AI-Assisted Cause Analysis

Pass all collected information to AI and request error cause analysis.

**Effective Analysis Prompt**:
```
Please analyze the causes of the following error:

## Error Information
[Paste all collected error information]

## Related Code
[Complete source code where error occurred]

## Analysis Requirements
1. Direct cause of the error
2. Root cause (design/implementation issues)
3. Possibility of prompt-related causes
4. Proposed fix approach
5. Prevention measures for similar errors

Please provide as specific and practical analysis as possible.
```

**AI Analysis Example**:
```
## Error Analysis Results

### Direct Cause
In TaskController.getAllTasks method, taskManager.getAllTasks() is returning undefined

### Root Cause
1. Problem with TaskManager class instantiation
2. Task array not initialized in getAllTasks method implementation

### Prompt-Related Possibility
The instruction "use existing TaskManager class" was ambiguous,
possibly implemented without checking actual class definition

### Fix Approach
1. Verify TaskManager class initialization
2. Validate getAllTasks method return value
3. Add null/undefined checks

### Prevention Measures
1. Include existing code details in prompt
2. Strengthen return value type safety
3. Add null/undefined cases to unit tests
```

### Step 3: Step-by-Step Investigation and Hypothesis Verification

Based on AI analysis, investigate the problem step by step.

**Investigation Procedure Example**:
```typescript
// 1. TaskManager class state verification
describe('TaskManager Debug', () => {
  test('TaskManager instantiation verification', () => {
    const manager = new TaskManager();
    console.log('TaskManager instance:', manager);
    expect(manager).toBeDefined();
  });

  test('getAllTasks return value verification', () => {
    const manager = new TaskManager();
    const result = manager.getAllTasks();
    console.log('getAllTasks result:', result);
    console.log('result type:', typeof result);
    expect(result).toBeDefined();
  });

  test('Task array initial state verification', () => {
    const manager = new TaskManager();
    const tasks = manager.getAllTasks();
    expect(Array.isArray(tasks)).toBe(true);
    console.log('Initial tasks array:', tasks);
  });
});
```

**Debug Execution**:
```bash
npm test -- --verbose TaskManagerDebug
```

### Step 4: AI-Collaborated Fix Implementation

Provide investigation results feedback to AI and request fix implementation.

**Fix Request Prompt**:
```
Based on debugging investigation, the following was discovered:

## Investigation Results
[Debug test output results]

## Identified Problems
1. Improper array initialization in TaskManager class
2. getAllTasks method return value is undefined

## Fix Requirements
Please implement fixes that satisfy the following:
1. Array is properly initialized
2. Type safety is ensured
3. null/undefined checks are added
4. Existing tests pass
5. New test cases are also added

Please provide the fixed code and explanation of the fix reasons.
```

## Identifying and Fixing Prompt-Related Errors

### Prompt Problem Judgment Criteria

**Frequency-Based Assessment**:
```
Occurrence pattern of similar errors:
- 1st time: Handle as implementation error
- 2nd time: Consider possibility of prompt problem
- 3rd time: Prompt modification mandatory
```

**Typical Signs of Prompt Problems**:
- Different implementations generated for same request
- Output significantly different from expectations
- Unintended modification of existing code
- Implementation exceeding instruction scope

### Prompt Problem Correction Process

#### 1. Prompt Diagnosis

**AI Diagnosis Request**:
```
Please analyze the following prompt and point out problems:

## Used Prompt
[The problematic prompt]

## Expected Result
[Expected output]

## Actual Result
[Actual output]

## Diagnosis Request
1. Ambiguous parts of the prompt
2. Missing information
3. Expressions that may cause misunderstanding
4. Improvement suggestions
```

#### 2. Creating Prompt Improvement Plan

**Improved Prompt Example**:
```
Before improvement (problematic prompt):
"Create API endpoint using TaskManager class"

After improvement:
"Implement GET /api/tasks endpoint using the following existing TaskManager class.

Existing Code:
[Complete TaskManager class code]

Requirements:
1. Do not modify existing code at all
2. Use Express.js Router
3. Response format: { success: boolean, data: Task[] }
4. Include error handling
5. Ensure TypeScript type safety

Output Format:
- routes/tasks.ts file
- controllers/TaskController.ts file
- Corresponding test files"
```

#### 3. Improved Prompt Verification

**Verification Process**:
```typescript
describe('Prompt Improvement Verification', () => {
  test('Problem reproduction with old prompt', async () => {
    // Request implementation with problematic prompt
    // Verify expected problem occurs
  });

  test('Solution confirmation with improved prompt', async () => {
    // Request implementation with improved prompt
    // Verify problem is resolved
  });

  test('Side effect check for improved prompt', async () => {
    // Verify no new problems arise from improvement
  });
});
```

## Decision to Switch to Manual Implementation

### Timing Decision for Switching

**Pre-Implementation Decision**:
```markdown
## Manual Implementation Consideration Checklist

### Existence of Implementation Image
- [ ] Specific implementation steps come to mind
- [ ] Technologies/libraries to use are clear
- [ ] Implementation pitfalls can be predicted

### Technical Complexity
- [ ] Performance optimization required
- [ ] Complex algorithms required
- [ ] Deep domain knowledge required

### Difficulty Explaining to AI
- [ ] Requirements can be clearly verbalized
- [ ] Prompt becomes abnormally long
- [ ] Explaining prerequisite knowledge is difficult
```

**Mid-Implementation Switching Decision**:
```
Switching decision criteria:
1. Same error occurs 3+ times
2. Prompt modification doesn't resolve
3. Debug time exceeds implementation time
4. AI-generated code quality is inconsistent
```

### Effective Manual Implementation Approach

#### Gradual AI Collaboration Strategy

**Partial AI Utilization Rather Than Complete Manual**:
```typescript
// 1. Manual implementation for complex logic parts
const complexAlgorithm = (data: any[]) => {
  // Manually implement (parts difficult to explain to AI)
  let result = [];
  for (let i = 0; i < data.length; i++) {
    // Complex calculation logic
  }
  return result;
};

// 2. Request AI for routine code
const generateApiResponse = (data: any) => {
  // This part can be generated by AI
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      count: Array.isArray(data) ? data.length : 1
    }
  };
};

// 3. Combine for final implementation
export const processData = async (inputData: any[]) => {
  try {
    const processedData = complexAlgorithm(inputData); // Manual part
    return generateApiResponse(processedData); // AI-generated part
  } catch (error) {
    // Error handling can also be AI-assisted
  }
};
```

#### AI Assistance Utilization in Manual Implementation

**1. IDE Completion Feature Utilization**:
```typescript
// Actively use AI completion in VS Code etc.
const taskManager = new TaskManager();
// ↑ Utilize AI completion for parts where it's effective
```

**2. Partial Code Generation Requests**:
```
Example AI request for parts with clear implementation image:

"Please create a validation function based on the following type definition:

interface TaskInput {
  title: string;
  description?: string;
}

Requirements:
- title is required, 1-100 characters
- description is optional, 0-500 characters
- Specific error messages for invalid cases
- Function as TypeScript type guard
```

#### Continuing Quality Process

**Validation Step Mandatory Even for Manual Implementation**:
```
Manual Implementation Validation Check Items:
1. Consistency with specification requirements
2. Type safety assurance
3. Appropriate error handling
4. Test coverage verification
5. Performance validity
6. Code readability and maintainability
```

## Error Prevention Best Practices

### Prompt Design Improvement

**1. Context Clarification**:
```
Good prompt example:

"Please add new functionality to the following existing system:

Existing Code:
[Paste all related code]

New Feature Requirements:
[Specific and clear requirements]

Constraints:
- Existing code modification prohibited
- TypeScript type safety assurance
- Error handling mandatory

Expected Output:
- Implementation code
- Test code
- Usage examples
- Important notes"
```

**2. Step-by-Step Implementation Instructions**:
```
Step-by-step implementation for complex features:

"Please implement the following step by step:

Step 1: Interface design
Step 2: Basic implementation
Step 3: Error handling
Step 4: Test creation

Please proceed with confirmation at each step."
```

### Test Strategy Enhancement

**1. Tests Specific to AI-Generated Code**:
```typescript
describe('AI-Generated Code Verification Tests', () => {
  test('Verify no unintended existing code modifications', () => {
    // Test that important existing functions haven't been changed
    const originalFunction = require('./legacy/original-module');
    expect(originalFunction.criticalMethod).toBeDefined();
    expect(typeof originalFunction.criticalMethod).toBe('function');
  });

  test('Verify speculative implementation scope', () => {
    // Verify AI-implemented parts are within requirements
    const implementation = new FeatureImplementation();
    expect(implementation.getImplementedFeatures())
      .toEqual(expect.arrayContaining(REQUIRED_FEATURES));
  });

  test('Type safety verification', () => {
    // Verify TypeScript type checking works correctly
    // Test that no compilation errors occur
  });
});
```

**2. Integration Test Enhancement**:
```typescript
describe('Feature Integration Tests', () => {
  test('Regression check with 3-feature integration', async () => {
    // Test that 3 features work normally when combined
    const feature1 = await executeFeature1();
    const feature2 = await executeFeature2(feature1.result);
    const feature3 = await executeFeature3(feature2.result);
    
    expect(feature3.result).toMatchExpectedOutput();
  });
});
```

### Continuous Improvement Process

**1. Error Pattern Accumulation**:
```markdown
## Error Pattern Management

### High-Frequency Errors
1. undefined/null access errors
   - Cause: Insufficient initialization in AI-generated code
   - Solution: Explicit initialization instructions

2. Type mismatch errors
   - Cause: Insufficient type information in prompts
   - Solution: Explicitly provide type definitions

3. Existing code modification errors
   - Cause: Inadequate "modification prohibited" instructions
   - Solution: Specific constraint instructions
```

**2. Prompt Template Improvement**:
```
Improved prompt template:

### Basic Template
```
Feature: [Feature name]
Implementation target: [Specific implementation content]

Existing Code:
[All related code]

Requirements:
[Clear and specific requirements]

Constraints:
- Existing code modification prohibited
- [Other constraints]

Output Requirements:
- [Expected output format]

Quality Requirements:
- TypeScript type safety
- Error handling
- Include test code
```

## Practical Debugging Techniques

### Log-Based Debugging

**Effective Log Output**:
```typescript
// Debug log helper
class DebugLogger {
  static log(context: string, data: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${context}]`, {
        timestamp: new Date().toISOString(),
        data: JSON.stringify(data, null, 2)
      });
    }
  }

  static error(context: string, error: any) {
    console.error(`[ERROR:${context}]`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}

// Usage example
export const taskController = {
  getAllTasks: async (req, res, next) => {
    try {
      DebugLogger.log('TaskController.getAllTasks', 'Starting execution');
      
      const tasks = taskManager.getAllTasks();
      DebugLogger.log('TaskController.getAllTasks', { tasksCount: tasks?.length });
      
      const response = generateResponse(tasks);
      DebugLogger.log('TaskController.getAllTasks', { response });
      
      res.json(response);
    } catch (error) {
      DebugLogger.error('TaskController.getAllTasks', error);
      next(error);
    }
  }
};
```

### Test-Driven Debugging

**Reverse Engineering from Failed Tests**:
```typescript
describe('Bug Reproduction Tests', () => {
  test('Reproduce null error under specific conditions', () => {
    // Identify minimum conditions for bug occurrence
    const manager = new TaskManager();
    const result = manager.getAllTasks();
    
    // Error should occur at this point
    expect(() => result.map(x => x.id)).toThrow();
  });

  test('Verify behavior after fix', () => {
    // Test expected behavior after fix
    const manager = new TaskManager();
    const result = manager.getAllTasks();
    
    expect(Array.isArray(result)).toBe(true);
    expect(() => result.map(x => x.id)).not.toThrow();
  });
});
```

## Summary

This chapter covered comprehensive error handling and debugging techniques in AITDD development:

**Key Learning Outcomes**:
- Appropriate error classification and response methods
- Efficient debugging process utilizing AI
- Identification and correction of prompt-related errors
- Decision-making for switching to manual implementation and AI collaboration strategies
- Best practices for error prevention

**Practical Skills**:
- Comprehensive information collection techniques
- AI-collaborated error analysis
- Step-by-step problem-solving approaches
- Continuous improvement of quality management

**Preparation for Next Chapter**:
These skills prepare you for learning more advanced AITDD techniques and optimization technologies. We will proceed to prompt design and AI utilization optimization.

Through the practical hands-on AITDD series, you have acquired techniques from basics to applications. The next section will cover advanced techniques for refining these technologies and utilizing them in actual production environments.
