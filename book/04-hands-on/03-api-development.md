# 4.3 API Development Practice

## Learning Objectives

This chapter demonstrates how to apply AITDD to actual web application development through RESTful API development:

- Leveraging AITDD in implementations with external dependencies
- Implementing asynchronous processing and error handling
- HTTP status codes and response design
- Automated API documentation generation
- Development experience close to actual production environments

## Project Overview: Task Management API

Building upon the task management system developed in the previous chapter, we'll construct a RESTful API using Express.js.

### API Specification Overview

```http
GET    /api/tasks       # Get all tasks
GET    /api/tasks/:id   # Get specific task
POST   /api/tasks       # Create new task
PUT    /api/tasks/:id   # Update task
DELETE /api/tasks/:id   # Delete task
```

### Technology Stack

- **Web Framework**: Express.js
- **Language**: TypeScript
- **Testing**: Jest + Supertest
- **Validation**: express-validator
- **Documentation**: OpenAPI (Swagger)

## New Technical Complexity

API development adds the following elements beyond the CRUD operations from the previous chapter:

**HTTP-related**:
- Request/response processing
- Status code management
- Header processing
- Routing design

**Asynchronous Processing**:
- Promise/async-await
- Error handling
- Timeout processing

**Validation**:
- Request data validation
- Response format standardization
- Error response standardization

## Practical Hands-On

### Step 1: TODO Creation and API Design

In AITDD API development, the **3-feature integration limit** applies similarly. Therefore, we appropriately divide endpoints.

```markdown
# TODO: Task Management API Implementation

## Phase 1: Foundation Setup
- [ ] Express.js project setup
- [ ] TypeScript configuration
- [ ] Basic middleware configuration
- [ ] Error handling middleware

## Phase 2: Basic API (3 endpoints)
- [ ] GET /api/tasks - Get all tasks
- [ ] GET /api/tasks/:id - Get single task
- [ ] POST /api/tasks - Create task

## Phase 3: Extended API (remaining endpoints)
- [ ] PUT /api/tasks/:id - Update task
- [ ] DELETE /api/tasks/:id - Delete task
- [ ] GET /api/tasks?search=xxx - Conditional search

## Phase 4: Quality Improvement
- [ ] OpenAPI specification generation
- [ ] Input validation enhancement
- [ ] Security header addition
- [ ] Performance optimization
```

### Step 2: Phase 1 - Foundation Setup

#### Specification Creation

**AI Prompt**:
```
Create a specification for API project foundation setup using Express.js and TypeScript.

Requirements:
- Express.js setup in TypeScript environment
- Basic middleware (CORS, JSON parsing, etc.)
- Structured error handling
- Development/production environment configuration separation
- Test environment setup

Please refer to the following TODO:
[Paste Phase 1 TODO]
```

**Generated Specification Example**:
````markdown
# Task Management API Foundation Specification

## Project Structure
```
src/
├── app.ts              # Express application configuration
├── server.ts           # Server startup entry point
├── routes/             # Route definitions
├── controllers/        # Business logic
├── middleware/         # Custom middleware
├── types/              # TypeScript type definitions
└── tests/              # Test files
```

## Express Configuration
- CORS support
- JSON/URL encoding parsing
- Request logging
- Security headers
- Error handling middleware

## Error Processing Standardization
```typescript
interface APIError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
}
```

## Response Format Unification
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
```
```

#### Test Case Creation and Red-Green-Refactor-Validation

**API Foundation Tests**:
```typescript
describe('API Foundation Tests', () => {
  test('Server startup confirmation', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('CORS configuration confirmation', async () => {
    const response = await request(app)
      .options('/api/tasks')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'GET');
    
    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });

  test('JSON parsing confirmation', async () => {
    const response = await request(app)
      .post('/api/test')
      .send({ test: 'data' })
      .set('Content-Type', 'application/json');
    
    expect(response.status).not.toBe(400); // Not a JSON parsing error
  });

  test('Error handling confirmation', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBeDefined();
  });
});
````

### Step 3: Phase 2 - Basic API Implementation

#### GET /api/tasks Implementation

**Specification**:
```markdown
## Get All Tasks API

### Endpoint
GET /api/tasks

### Response (Success)
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Task Title",
      "description": "Task Description",
      "completed": false,
      "createdAt": "2025-06-21T10:00:00Z",
      "updatedAt": "2025-06-21T10:00:00Z"
    }
  ],
  "meta": {
    "timestamp": "2025-06-21T10:00:00Z",
    "requestId": "req-123"
  }
}
```

### Status Codes
- 200: Successful retrieval (including empty array)
- 500: Server error


**AI Prompt Example**:
```
Please implement the GET /api/tasks endpoint based on the following specification:

[Paste specification]

Requirements:
1. Use Express.js router
2. Utilize the TaskManager class created in the previous chapter
3. Implement proper error handling
4. Ensure TypeScript type safety
5. Create integration tests using Supertest

Existing code:
[Paste TaskManager class code]
[Paste API foundation code]
```

**Expected Implementation**:
```typescript
// routes/tasks.ts
import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController();

router.get('/', taskController.getAllTasks);

export default router;

// controllers/TaskController.ts
import { Request, Response, NextFunction } from 'express';
import { TaskManager } from '../services/TaskManager';
import { APIResponse } from '../types/api';

export class TaskController {
  private taskManager = new TaskManager();

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = this.taskManager.getAllTasks();
      
      const response: APIResponse<typeof tasks> = {
        success: true,
        data: tasks,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown'
        }
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
```

#### GET /api/tasks/:id Implementation

**Additional Specification**:
```markdown
## Single Task Retrieval API

### Endpoint
GET /api/tasks/:id

### Parameters
- id: Task ID (UUID format)

### Status Codes
- 200: Successful retrieval
- 400: Invalid ID format
- 404: Task not found
- 500: Server error
```

#### POST /api/tasks Implementation

**Additional Specification**:
````markdown
## Task Creation API

### Endpoint
POST /api/tasks

### Request Body
```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

### Validation
- title: Required, 1-100 characters
- description: Optional, 0-500 characters

### Status Codes
- 201: Creation successful
- 400: Validation error
- 500: Server error
````

### Step 4: Phase 3 - Extended API Implementation

#### Input Validation Enhancement

**Utilizing express-validator**:

```typescript
// middleware/validation.ts
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be 1-100 characters'),
  
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),
];

export const taskIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Please specify a valid UUID format ID'),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        code: 'VALIDATION_ERROR',
        statusCode: 400,
        details: errors.array()
      }
    });
  }
  next();
};
```

#### PUT /api/tasks/:id Implementation

**Partial Update Support**:
```typescript
export const updateTaskValidation = [
  ...taskIdValidation,
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be 1-100 characters'),
  
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),
  
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('completed must be a boolean value'),
];
```

#### DELETE /api/tasks/:id Implementation

**Soft Delete Consideration**:
```typescript
deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = this.taskManager.deleteTask(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Task not found',
          code: 'TASK_NOT_FOUND',
          statusCode: 404
        }
      });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
```

### Step 5: Phase 4 - Quality Improvement

#### OpenAPI Specification Generation

**AI Prompt Example**:
```
Generate an OpenAPI 3.0 specification from the following API endpoints:

[List of implemented endpoints]
[Response format definitions]
[Error response definitions]

Requirements:
1. Format displayable in Swagger UI
2. Detailed documentation for all endpoints
3. Include request/response examples
4. Include error code descriptions
```

**Generated OpenAPI Specification Example**:
```yaml
openapi: 3.0.0
info:
  title: Task Management API
  version: 1.0.0
  description: RESTful API for simple task management system

paths:
  /api/tasks:
    get:
      summary: Get all tasks
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskListResponse'
    
    post:
      summary: Create task
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateTaskRequest'
      responses:
        '201':
          description: Creation successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskResponse'
        '400':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

components:
  schemas:
    Task:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
          minLength: 1
          maxLength: 100
        description:
          type: string
          maxLength: 500
        completed:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
```

## Handling Complex Problems

### Switching to Manual Implementation

In API development, consider manual implementation in the following cases:

**When Implementation Methods Are Not Clear**:
- "Complex authentication logic for custom middleware"
- "Integration with WebSocket processing"
- "Complex database optimization"

**When Performance Optimization Is Required**:
- "Processing optimization for high-volume requests"
- "Memory usage optimization"
- "Response time reduction"

### AI Utilization During Manual Implementation

Rather than complete manual implementation, utilize AI in the following ways:
```typescript
// AI can generate parts with clear implementation images
const generateResponseHelper = (data: any, meta: any) => {
  // This part can be generated by AI
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };
};

// Manual implementation for complex logic
const complexAuthMiddleware = (req, res, next) => {
  // Complex authentication logic implemented manually
  // However, utilize AI completion partially
};
```

## API Development-Specific Testing Strategy

### Integration Test Patterns

**End-to-End Testing**:
```typescript
describe('API Integration Tests', () => {
  test('Task management flow', async () => {
    // 1. Create task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'Task for testing'
      });
    
    expect(createResponse.status).toBe(201);
    const taskId = createResponse.body.data.id;

    // 2. Verify task retrieval
    const getResponse = await request(app)
      .get(`/api/tasks/${taskId}`);
    
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data.title).toBe('Test Task');

    // 3. Update task
    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        completed: true
      });
    
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.completed).toBe(true);

    // 4. Delete task
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`);
    
    expect(deleteResponse.status).toBe(204);

    // 5. Verify deletion
    const getAfterDeleteResponse = await request(app)
      .get(`/api/tasks/${taskId}`);
    
    expect(getAfterDeleteResponse.status).toBe(404);
  });
});
```

### Performance Testing

**Load Testing**:
```typescript
describe('Performance Tests', () => {
  test('Concurrent request processing', async () => {
    const requests = Array.from({ length: 100 }, (_, i) =>
      request(app)
        .post('/api/tasks')
        .send({
          title: `Parallel Task ${i}`,
          description: 'Parallel processing test'
        })
    );

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const endTime = Date.now();

    responses.forEach(response => {
      expect(response.status).toBe(201);
    });

    expect(endTime - startTime).toBeLessThan(5000); // Within 5 seconds
  });
});
```

## Error Handling Best Practices

### Comprehensive Error Processing

```typescript
// middleware/errorHandler.ts
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log output
  console.error('API Error:', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  // Processing by error type
  if (error.name === 'TaskNotFoundError') {
    return res.status(404).json({
      success: false,
      error: {
        message: 'Task not found',
        code: 'TASK_NOT_FOUND',
        statusCode: 404
      }
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        code: 'VALIDATION_ERROR',
        statusCode: 400,
        details: error.details
      }
    });
  }

  // Unknown error
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error occurred',
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: 500
    }
  });
};
```

## Learning Effects in Practice

### AITDD Effects in API Development

**Development Speed Experience**:
- Traditional API development: Several days to 1 week
- Using AITDD: Several hours
- **Significant efficiency improvement** achieved

**Quality Stability**:
- Quality assurance through comprehensive testing
- Error handling standardization
- Automated API documentation generation

**Practical Skill Acquisition**:
- Effective AI utilization in web development
- Handling complex integration processes
- Production-quality implementation

### Differences from Traditional Development

**Design Phase**:
- Traditional: Time spent on detailed design
- AITDD: Gradual design in cooperation with AI

**Implementation Phase**:
- Traditional: Manual detailed implementation
- AITDD: Quality management of AI-generated code

**Testing Phase**:
- Traditional: Test creation after implementation
- AITDD: Test-first approach

## Preparation for Next Chapter

Through this API development experience, you will acquire:

1. **AI utilization techniques in web development**
2. **Management methods for complex integration processes**
3. **Production-quality implementation techniques**
4. **Error handling and debugging techniques**

The next chapter will cover specific approaches to errors and troubles that occur during these implementation processes.

## Summary

Through API development, we have acquired the following:

**Technical Growth**:
- Practical RESTful API design
- Asynchronous processing and error handling
- Type-safe implementation with TypeScript
- Comprehensive testing strategies

**AITDD Utilization Techniques**:
- AI collaboration in complex implementations
- Management of gradual feature additions
- Automated quality management
- Documentation generation utilization

**Practical Development Skills**:
- Production-quality implementation
- Performance-conscious design
- Security-compliant implementation
- Operations-conscious design

Through these experiences, you will have the foundation to effectively utilize AITDD in actual product development.
