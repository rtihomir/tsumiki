# 4.2 CRUD Operations Implementation Example

## Learning Objectives

Through implementing more practical CRUD (Create, Read, Update, Delete) operations in this chapter, you will acquire the following skills:

- Utilizing AITDD for integrating multiple features
- Designing and implementing data management logic
- Experience close to actual application development
- Understanding the differences from vibe coding

## Project Overview: Simple Task Management System

### Features to Implement

Create a simple memory-based task management system:

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**CRUD Operations**:
- **Create**: Creating new tasks
- **Read**: Retrieving tasks (all, single, conditional search)
- **Update**: Updating tasks
- **Delete**: Deleting tasks

### Level of Technical Complexity

Compared to the previous chapter's calculation features, the following complexities are added:
- Data persistence (memory-based)
- Multiple entity operations
- Validation combinations
- Diversified error handling

## Hands-On Practice

### Step 1: TODO Creation and Feature Decomposition

An important lesson from AITDD is that **integration of about 3 features is the practical limit**. Therefore, we decompose features into appropriate granularity.

```markdown
# TODO: Task Management System CRUD Implementation

## Phase 1: Foundation Implementation
- [ ] Task interface definition
- [ ] TaskManager class basic structure
- [ ] Memory storage implementation

## Phase 2: Basic CRUD (up to 3 features)
- [ ] Create: New task creation
- [ ] Read: Get all tasks
- [ ] Read: Get single task by ID

## Phase 3: Extended CRUD (remaining features)
- [ ] Update: Task updates
- [ ] Delete: Task deletion
- [ ] Read: Conditional search (completion status, etc.)

## Technical Requirements
- Use TypeScript
- Testing with Jest
- Memory-based data management
- Appropriate error handling
```

**Key Points**:
- Control integration complexity through phasing
- Each phase can be tested independently
- Gradual feature addition possible

### Step 2: Phase 1 Implementation

#### Specification Creation

**AI Prompt**:
```
Please create specifications for the foundation part of the task management system.

Requirements:
- Task interface definition
- TaskManager class design
- Memory-based storage functionality
- Ensure type safety with TypeScript

Please reference the following TODO:
[Paste Phase 1 TODO]
```

**Generated Specification Example**:
```markdown
# Task Management System Foundation Specifications

## Task Interface
```typescript
interface Task {
  id: string;          // UUID format unique ID
  title: string;       // Task title (1-100 characters)
  description: string; // Task description (0-500 characters)
  completed: boolean;  // Completion status
  createdAt: Date;     // Creation date/time
  updatedAt: Date;     // Update date/time
}
```

## TaskManager Class
- Memory-based task management
- Task persistence (array)
- Automatic ID generation
- Basic validation

## Error Handling
- Task not found: TaskNotFoundError
- Validation failure: ValidationError
- Invalid ID format: InvalidIdError
```

#### Test Case Creation

**AI Prompt**:
```
Please create test cases for the foundation part based on the following specifications:

[Paste foundation specifications]

Test perspectives:
- Interface type checking
- TaskManager initialization
- Memory storage operation verification
- Error class definition verification
```

#### Red-Green-Refactor-Validation Execution

Request step-by-step implementation from AI:

1. **Red**: Confirm test failures
2. **Green**: Minimal implementation of foundation classes
3. **Refactor**: Design improvements
4. **Validation**: Foundation validity verification

### Step 3: Phase 2 Implementation (Basic CRUD)

#### Integration Considerations

An important difference from vibe coding is the need for a **structured approach**:

**AITDD Approach**:
```
1. Clear specification definition
2. Comprehensive test design
3. Gradual implementation
4. Quality checks
→ Easy integration, stable quality
```

**Vibe Coding Approach (to avoid)**:
```
1. Impulsively request AI implementation
2. Tests added afterwards
3. Problems discovered during integration
4. Manual fixes
→ Breakdown at 3-feature integration
```

#### Create Feature Implementation

**Specifications**:
```markdown
## Task Creation Feature

### Method: createTask(taskData)
- Parameters: { title: string, description: string }
- Return value: Created Task
- Validation:
  - title is required 1-100 characters
  - description is 0-500 characters
- Auto-set: id, createdAt, updatedAt, completed=false
```

**AI Prompt Example**:
```
Please create test cases and implementation for the createTask method according to the following specifications:

[Paste specifications]

Requirements:
1. Comprehensive test cases (normal, error, boundary values)
2. Implement with Red-Green-Refactor-Validation cycle
3. Ensure consistency with existing foundation code
4. Utilize TypeScript type safety
```

#### Read Feature Implementation

**Implement both get all and get single simultaneously**:

**Specifications**:
```markdown
## Task Retrieval Features

### getAllTasks(): Task[]
- Returns all tasks as an array
- Returns empty array if none exist
- Sort by creation date in descending order

### getTaskById(id: string): Task
- Search for task by ID
- If not found: TaskNotFoundError
- Invalid ID format: InvalidIdError
```

### Step 4: Phase 3 Implementation (Extended CRUD)

#### Update Feature

**Support partial updates**:

```typescript
interface TaskUpdateData {
  title?: string;
  description?: string;
  completed?: boolean;
}

updateTask(id: string, updateData: TaskUpdateData): Task
```

#### Delete Feature

**Implementation including consideration of logical vs physical deletion**:

```typescript
deleteTask(id: string): boolean  // Physical deletion
// or
softDeleteTask(id: string): Task  // Logical deletion
```

#### Conditional Search Feature

**Filtering functionality**:

```typescript
interface TaskFilter {
  completed?: boolean;
  titleContains?: string;
  createdAfter?: Date;
}

searchTasks(filter: TaskFilter): Task[]
```

### Step 5: Integration Testing and Final Review

#### Integration Scenario Testing

Tests assuming actual use cases:

```typescript
describe('Task Management Integration Scenarios', () => {
  test('typical task management flow', async () => {
    const manager = new TaskManager();
    
    // 1. Create task
    const task1 = manager.createTask({
      title: 'Project Planning',
      description: 'Requirements definition and design'
    });
    
    // 2. Get and verify tasks
    const allTasks = manager.getAllTasks();
    expect(allTasks).toHaveLength(1);
    
    // 3. Update task
    const updatedTask = manager.updateTask(task1.id, {
      completed: true
    });
    expect(updatedTask.completed).toBe(true);
    
    // 4. Search functionality
    const completedTasks = manager.searchTasks({
      completed: true
    });
    expect(completedTasks).toHaveLength(1);
    
    // 5. Delete task
    const deleted = manager.deleteTask(task1.id);
    expect(deleted).toBe(true);
    expect(manager.getAllTasks()).toHaveLength(0);
  });
});
```

#### Performance Testing

**Operation verification with large amounts of data**:

```typescript
describe('Performance Tests', () => {
  test('1000 task operations', () => {
    const manager = new TaskManager();
    
    // Create 1000 tasks
    const startTime = Date.now();
    for (let i = 0; i < 1000; i++) {
      manager.createTask({
        title: `Task${i}`,
        description: `Description${i}`
      });
    }
    const createTime = Date.now() - startTime;
    
    // Search performance
    const searchStart = Date.now();
    const results = manager.searchTasks({
      titleContains: 'Task1'
    });
    const searchTime = Date.now() - searchStart;
    
    expect(createTime).toBeLessThan(1000); // Within 1 second
    expect(searchTime).toBeLessThan(100);  // Within 100ms
  });
});
```

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: AI-Generated Code Consistency

**Symptoms**:
- Unintended modification of existing code
- Interface inconsistencies
- Naming convention differences

**Solutions**:
```
Prompt improvement example:
"Without modifying any existing code, please add only new methods following this interface:
[Specify existing interface]"
```

#### Issue 2: Insufficient Test Quality

**Symptoms**:
- Insufficient error case tests
- Missing boundary value tests
- No integration tests

**Solutions**:
```
Review checklist:
- [ ] Cover all normal, error, and boundary value cases
- [ ] Verify error messages
- [ ] Test with actual use cases
```

#### Issue 3: Integration Complexity

**Symptoms**:
- Breakdown when integrating 3+ features
- Difficult debugging
- Tests not passing

**Solutions**:
```
Gradual integration approach:
1. Implement one feature completely
2. Test combination of 2 features
3. Proceed carefully when adding 3rd feature
4. Split features when problems occur
```

## AI Prompt Best Practices

### Effective Prompt Design

**1. Context Clarification**:
```
Good example:
"For CRUD operations in a task management system, please implement the createTask method according to the following specifications.
Implement as an addition to the existing Task interface and TaskManager class,
using memory-based storage.

[Existing code]
[Detailed specifications]
[Expected output format]"
```

**2. Explicit Constraints**:
```
Constraint examples:
- "Please do not modify existing code"
- "Please maximize TypeScript type safety"
- "Please implement appropriate error handling"
- "Please implement test-first"
```

**3. Specifying Expected Quality**:
```
Quality requirement examples:
- "Please implement at production-level quality"
- "Please prioritize readability and maintainability"
- "Please implement with performance considerations"
- "Please include appropriate comments"
```

### Prompt Templates

CRUD operation-specific prompt template:

```
### CRUD Implementation Prompt Template

**Basic Information**:
- Feature: [Create/Read/Update/Delete] operation
- Target Entity: [Entity name]
- Implementation Language: TypeScript
- Test Framework: Jest

**Existing Context**:
[Existing interface and class definitions]

**Implementation Requirements**:
[Specific specifications]

**Constraints**:
- Existing code modification prohibited
- Maximize type safety
- Error handling required

**Output Requirements**:
1. Test cases (normal, error, boundary values)
2. Implementation code
3. Usage examples
4. Notes and limitations
```

## Quality Management Points

### Code Review Checklist

**Functional Quality**:
- [ ] Meets all specification requirements
- [ ] Appropriate error handling
- [ ] Correct behavior at boundary values
- [ ] Performance within acceptable range

**Technical Quality**:
- [ ] TypeScript type safety ensured
- [ ] Follows naming conventions
- [ ] Appropriate abstraction level
- [ ] DRY principle followed

**Test Quality**:
- [ ] Sufficient test coverage
- [ ] Tests are understandable
- [ ] Appropriate use of mocks
- [ ] Comprehensive integration tests

**Maintainability**:
- [ ] Code is readable
- [ ] Easy to change structure
- [ ] Appropriate documentation
- [ ] Design considers extensibility

## Learning Effects in Practice

### AITDD Strengths (Observable Benefits)

**Development Speed**:
- Traditional CRUD implementation: 1-2 days
- Using AITDD: Under 1 hour
- **Experience 20-48x efficiency improvement**

**Quality Stability**:
- Quality assurance through test-first approach
- Optimization during refactoring phase
- Comprehensive quality check in Validation step

**Learning Effects**:
- Collaborative development skills with AI
- Effective prompt design ability
- Improved sensitivity to quality management

### Clear Differences from Vibe Coding

**Integration Ease**:
- Vibe coding: Breakdown at 3-feature integration
- AITDD: Stable with gradual integration

**Debugging Efficiency**:
- Vibe coding: Repeated same problems
- AITDD: Systematic problem solving

**Long-term Maintainability**:
- Vibe coding: Requires rework later
- AITDD: Enables continuous development

## Preparation for Next Chapter

Through this CRUD implementation experience, you acquire the following skills:

1. **Multi-feature integration management**
2. **Gradual feature development**
3. **Understanding importance of quality management**
4. **Practical AI prompt design skills**

The next chapter will apply these skills to API development, a more practical development scenario. You'll learn how AITDD can handle new complexities like external dependencies and asynchronous processing.

## Summary

Through implementing CRUD operations, we learned the following:

**Process Importance**:
- Value of structured approach
- Effect of gradual feature addition
- Automation of quality management

**AI Utilization Tips**:
- Providing clear context
- Specifying appropriate constraints
- Continuous prompt improvement

**Practical Skills**:
- Multi-feature integration techniques
- Test-driven design thinking
- Review and quality management

With these foundations, you can effectively utilize AITDD even in more complex real development projects.
