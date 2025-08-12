# 4.1 Your First AITDD Project

## Learning Objectives

Through this first project that provides hands-on experience with the basic AITDD flow, you will acquire the following skills:

- Understand the overall AITDD process flow
- Practice the complete procedure from TODO creation to implementation completion
- Experience the appropriate balance between AI assistance and human review
- Feel the effectiveness of AITDD through small-scale features

## Project Selection Criteria

### Characteristics Suitable for First Projects

**Implementation Scope**:
- Small-scale features that can be completed in 30 minutes to 1 hour
- Simple processing with a single responsibility
- Highly independent features with few external dependencies

**Technical Complexity**:
- Use familiar technology stacks
- Content where implementation methods can be visualized
- Processing that is relatively easy to debug

**Learning Effect**:
- Enables experience of each AITDD step
- Content that easily provides successful experiences
- Features that serve as a foundation for future expansion

### Recommended Project Examples

**1. Simple Calculation Features**
```
Example: Tax-inclusive price calculator
- Input: Product price, tax rate
- Output: Tax-inclusive price, tax amount
- Processing: Basic numerical calculations
```

**2. Data Conversion Features**
```
Example: CSV data format conversion
- Input: CSV string
- Output: JSON format data
- Processing: Parsing and conversion logic
```

**3. Validation Features**
```
Example: Email address validation
- Input: String
- Output: Validation result (boolean)
- Processing: Format checking with regular expressions
```

## Hands-On Practice: Tax-Inclusive Price Calculator

This example learns the AITDD process through implementing a tax-inclusive price calculator.

### Step 1: TODO Creation

Create a todo.md file in the project to clarify the features to implement.

```markdown
# TODO: Tax-Inclusive Price Calculator Implementation

## Features to Implement
- [ ] Function to calculate tax-inclusive price from product price and tax rate
- [ ] Function to calculate tax amount  
- [ ] Input value validation
- [ ] Error handling (negative values, null values, etc.)

## Completion Criteria
- Calculations work correctly with normal values
- Appropriate error handling for abnormal values
- Achieve 100% test coverage
```

**Key Points**:
- Break down features concretely
- Clarify completion criteria
- Adjust to a granularity that can be completed in 30 minutes to 1 hour

### Step 2: Specification Creation

Create detailed specifications in cooperation with AI based on the TODO.

**AI Prompt Example**:
```
Please create detailed specifications from the following TODO:

[Paste todo.md content]

Include the following in the specifications:
- Function signatures (parameters, return values)
- Input value constraints
- Error conditions and responses
- Detailed calculation logic
```

**Expected Specification Document (Example)**:
```markdown
# Tax-Inclusive Price Calculator Specifications

## Function Specifications

### calculateTaxIncludedPrice(price: number, taxRate: number): number
- Calculates tax-inclusive price from product price and tax rate
- Parameters:
  - price: Product price (number 0 or greater)
  - taxRate: Tax rate (decimal between 0 and 1, e.g., 0.1 = 10%)
- Return value: Tax-inclusive price (rounded to first decimal place)

### calculateTax(price: number, taxRate: number): number  
- Calculates tax amount
- Parameters and return values same as above
- Return value: Tax amount (rounded to first decimal place)

## Error Handling
- Negative price: Error("Price must be 0 or greater")
- Tax rate out of range: Error("Tax rate must be between 0 and 1")
- null/undefined: Error("Please enter valid numbers")
```

**Human Review Checkpoints**:
- [ ] Is the TODO intention correctly reflected?
- [ ] Is the function responsibility scope appropriate?
- [ ] Are error conditions comprehensive?
- [ ] Is the content implementable?

### Step 3: Test Case Creation

Create test cases with AI based on the specification document.

**AI Prompt Example**:
```
Please create comprehensive test cases based on the following specifications:

[Paste specification document content]

Create test cases from the following perspectives:
- Normal cases: Operation verification with typical values
- Boundary values: Operation verification at boundaries like 0, 1  
- Error cases: Operation verification for error conditions
- Test framework: Use Jest
```

**Generated Test Case Example**:
```typescript
import { calculateTaxIncludedPrice, calculateTax } from './taxCalculator';

describe('Tax-Inclusive Price Calculator', () => {
  describe('calculateTaxIncludedPrice', () => {
    // Normal cases
    test('typical tax-inclusive price calculation', () => {
      expect(calculateTaxIncludedPrice(1000, 0.1)).toBe(1100);
      expect(calculateTaxIncludedPrice(150, 0.08)).toBe(162);
    });

    // Boundary values
    test('when price is 0', () => {
      expect(calculateTaxIncludedPrice(0, 0.1)).toBe(0);
    });

    test('when tax rate is 0', () => {
      expect(calculateTaxIncludedPrice(1000, 0)).toBe(1000);
    });

    // Error cases
    test('error for negative price', () => {
      expect(() => calculateTaxIncludedPrice(-100, 0.1))
        .toThrow('Price must be 0 or greater');
    });

    test('error for tax rate out of range', () => {
      expect(() => calculateTaxIncludedPrice(1000, -0.1))
        .toThrow('Tax rate must be between 0 and 1');
      expect(() => calculateTaxIncludedPrice(1000, 1.1))
        .toThrow('Tax rate must be between 0 and 1');
    });
  });

  describe('calculateTax', () => {
    test('tax amount calculation', () => {
      expect(calculateTax(1000, 0.1)).toBe(100);
      expect(calculateTax(150, 0.08)).toBe(12);
    });
  });
});
```

**Human Review Checkpoints**:
- [ ] Does it cover all specification requirements?
- [ ] Are error case tests appropriate?
- [ ] Are test expected values correct?
- [ ] Are there any additional test cases needed?

### Step 4: Red-Green-Refactor-Validation Cycle

#### 4.1 Red (Test Failure)

Run tests to confirm expected failures.

```bash
npm test
```

Expected output:
```
FAIL  src/taxCalculator.test.ts
  ✕ calculateTaxIncludedPrice is not defined
  ✕ calculateTax is not defined
```

#### 4.2 Green (Minimal Implementation)

Request minimal implementation from AI.

**AI Prompt Example**:
```
Please create minimal implementation that passes the following test cases:

[Paste test cases]

Requirements:
- Prioritize passing tests
- Don't make it overly complex
- Properly implement error handling
```

**Generated Implementation Example**:
```typescript
export function calculateTaxIncludedPrice(price: number, taxRate: number): number {
  validateInputs(price, taxRate);
  const tax = calculateTax(price, taxRate);
  return Math.round((price + tax) * 10) / 10;
}

export function calculateTax(price: number, taxRate: number): number {
  validateInputs(price, taxRate);
  return Math.round((price * taxRate) * 10) / 10;
}

function validateInputs(price: number, taxRate: number): void {
  if (price < 0) {
    throw new Error('Price must be 0 or greater');
  }
  if (taxRate < 0 || taxRate > 1) {
    throw new Error('Tax rate must be between 0 and 1');
  }
}
```

Test execution:
```bash
npm test
# Confirm all tests pass
```

#### 4.3 Refactor (Refactoring)

Request code improvements from AI.

**AI Prompt Example**:
```
Please refactor the following code:

[Paste implementation code]

Improvement points:
- Improve code readability
- Function responsibility separation
- Performance optimization
- Enhance TypeScript type safety
```

#### 4.4 Validation (Verification)

Have AI comprehensively verify the implementation.

**AI Prompt Example**:
```
Please comprehensively verify the following implementation:

[Paste refactored code]
[Also paste test cases]

Verification perspectives:
- Consistency with specification requirements
- Code quality (readability, maintainability)
- Appropriateness of test coverage
- Potential issues
- Performance concerns
```

### Step 5: Final Review

**Human Review Checkpoints**:

**Functional Aspects**:
- [ ] All tests are passing
- [ ] Specification requirements are met
- [ ] Error handling is appropriate

**Code Quality**:
- [ ] High readability
- [ ] Appropriate function separation
- [ ] Follows naming conventions
- [ ] TypeScript type definitions are appropriate

**Maintainability**:
- [ ] Easy to extend structure
- [ ] Tests are maintainable
- [ ] Documentation is appropriate

## Reflection and Learning Points

### Success Patterns

**Process Adherence**:
- Execute each step without skipping
- Ensure human review is performed
- Don't take AI output at face value

**Appropriate AI Utilization**:
- Use clear and specific prompts
- Provide sufficient context
- Specify expected output format

### Common Failure Patterns and Countermeasures

**Failure 1: Ambiguous Prompts**
```
❌ Bad example: "Create a tax calculation function"
✅ Good example: "Create a function that calculates tax-inclusive price from product price and tax rate, following these specifications: [detailed specifications]"
```

**Failure 2: Skipping Human Review**
```
❌ Problem: Using AI output as-is
✅ Solution: Always verify consistency with specifications
```

**Failure 3: Insufficient Test Design**
```
❌ Problem: Only normal case tests
✅ Solution: Comprehensive tests including boundary values and error cases
```

### Preparation for Next Steps

Sensations to acquire from this first project:
- Rhythm of collaborative development with AI
- Importance of quality management
- Basics of prompt design
- Understanding of review points

The next chapter will develop AITDD application skills through implementing more complex CRUD operations.

## Summary

In your first AITDD project, emphasize the following:

1. **Gaining Successful Experience**: Experience the complete process even on a small scale
2. **Establishing Basic Habits**: Understand the importance of each step
3. **Developing AI Utilization Sense**: Foundation of appropriate prompt design
4. **Cultivating Quality Awareness**: Experience the value of human review

With these foundations, you'll be able to effectively utilize AITDD even in more complex projects.
