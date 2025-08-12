# TDD Requirements Definition and Functional Specifications

We'll begin TDD development. Please organize the requirements for the following feature:

**【Feature Name】**: {{feature_name}}

## Preparation

Prepare the development context:

1. **Search for feature-related information with @agent-symbol-searcher and read found files**
   - Search for related existing features/components and read relevant files with Read tool
   - Identify similar implementation patterns or architectures and read design documents with Read tool
   - Check existing interfaces or API specifications and read related files with Read tool

2. **Directly read related files**
   - `docs/implements/{{task_id}}/{feature_name}-memo.md` - Check existing development history
   - `docs/implements/{{task_id}}/{feature_name}-requirements.md` - Check existing requirements definition
   - `docs/implements/{{task_id}}/{feature_name}-testcases.md` - Check existing test cases
   - Read related design documents or task files as needed

After completing the reading, begin TDD requirements definition work based on the prepared context information.

## TDD Requirements Organization Format

**【Reliability Level Instructions】**:
For each item, please comment on the verification status against source materials (including EARS requirements documents and design documents) using the following signals:

- 🟢 **Green Signal**: When referencing EARS requirements documents and design documents with minimal speculation
- 🟡 **Yellow Signal**: When making reasonable speculation based on EARS requirements documents and design documents
- 🔴 **Red Signal**: When making speculation not found in EARS requirements documents and design documents

## 1. Feature Overview (Based on EARS Requirements Documents and Design Documents)

- 🟢🟡🔴 Record reliability level for each item
- What the feature does (extracted from user stories)
- What problems it solves (extracted from As a / So that)
- Expected users (extracted from As a)
- Position within the system (extracted from architecture design)
- **Referenced EARS Requirements**: [specific requirement IDs]
- **Referenced Design Documents**: [relevant sections of architecture.md]

## 2. Input/Output Specifications (Based on EARS Functional Requirements and TypeScript Type Definitions)

- 🟢🟡🔴 Record reliability level for each item
- Input parameters (types, ranges, constraints) - extracted from interfaces.ts
- Output values (types, formats, examples) - extracted from interfaces.ts
- Input/output relationships
- Data flow (extracted from dataflow.md)
- **Referenced EARS Requirements**: [specific REQ-XXX]
- **Referenced Design Documents**: [relevant interfaces in interfaces.ts]

## 3. Constraints (Based on EARS Non-functional Requirements and Architecture Design)

- 🟢🟡🔴 Record reliability level for each item
- Performance requirements (extracted from NFR-XXX)
- Security requirements (extracted from NFR-XXX)
- Compatibility requirements (extracted from REQ-XXX MUST)
- Architecture constraints (extracted from architecture.md)
- Database constraints (extracted from database-schema.sql)
- API constraints (extracted from api-endpoints.md)
- **Referenced EARS Requirements**: [specific NFR-XXX, REQ-XXX]
- **Referenced Design Documents**: [relevant sections of architecture.md, database-schema.sql, etc.]

## 4. Expected Use Cases (Based on EARS Edge Cases and Data Flow)

- 🟢🟡🔴 Record reliability level for each item
- Basic usage patterns (extracted from normal requirements REQ-XXX)
- Data flow (extracted from dataflow.md)
- Edge cases (extracted from EDGE-XXX)
- Error cases (extracted from EDGE-XXX error handling)
- **Referenced EARS Requirements**: [specific EDGE-XXX]
- **Referenced Design Documents**: [relevant flow diagrams in dataflow.md]

## 5. Correspondence with EARS Requirements and Design Documents

When referencing existing EARS requirements documents and design documents, clearly specify the following correspondences:

- **Referenced User Stories**: [story names]
- **Referenced Functional Requirements**: [REQ-001, REQ-002, ...]
- **Referenced Non-functional Requirements**: [NFR-001, NFR-101, ...]
- **Referenced Edge Cases**: [EDGE-001, EDGE-101, ...]
- **Referenced Acceptance Criteria**: [specific test items]
- **Referenced Design Documents**:
  - **Architecture**: [relevant sections of architecture.md]
  - **Data Flow**: [relevant flow diagrams in dataflow.md]
  - **Type Definitions**: [relevant interfaces in interfaces.ts]
  - **Database**: [relevant tables in database-schema.sql]
  - **API Specifications**: [relevant endpoints in api-endpoints.md]

After organizing, please execute the following:

1. Save requirements document to docs/implements/{{task_id}}/{feature_name}-requirements.md (append if existing file is present)
2. Update TODO status (mark requirements definition as complete)
3. **Quality Assessment**: Assess requirements quality based on the following criteria
   - Requirements are clear and unambiguous
   - Input/output specifications are specifically defined
   - Constraints are clear
   - Implementation feasibility is certain
4. **Show Next Steps**: Regardless of assessment results, display recommended next command
   - "Recommended next step: `/tdd-testcases` to identify test cases."

## Quality Assessment Criteria

```
✅ High Quality:
- Requirements ambiguity: None
- Input/output definition: Complete
- Constraints: Clear
- Implementation feasibility: Certain

⚠️ Needs Improvement:
- Requirements have ambiguous parts
- Input/output details are unclear
- Technical constraints are unknown
- User intent confirmation needed
```

## TODO Update Pattern

```
- Mark current TODO as "completed"
- Reflect completion of requirements definition phase in TODO content
- Add next phase "Test case identification" to TODO
- Record quality assessment results in TODO content
```

Next step: `/tdd-testcases` to identify test cases.
