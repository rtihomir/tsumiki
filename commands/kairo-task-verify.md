# kairo-task-verify

## Purpose

Verify the content of created task files and add any missing information according to the output format example.

## Prerequisites

- `docs/tasks/{requirement-name}-tasks.md` exists
- Task file has been created by kairo-tasks command

## Execution Content

**【Reliability Level Instructions】**:
For each item, comment on the verification status with original materials (EARS requirements definition document, design documents included) using the following signals:

- 🟢 **Green signal**: When referencing EARS requirements definition document and design documents with almost no speculation
- 🟡 **Yellow signal**: When making reasonable speculation from EARS requirements definition document and design documents
- 🔴 **Red signal**: When speculating beyond what's in EARS requirements definition document and design documents

1. **Task File Verification**
   - Search for task files with @agent-symbol-searcher, read found files with Read tool
   - Read `docs/tasks/{requirement-name}-tasks.md` with Read tool

2. **Comparison with Output Format Example**
   - Search for related task formats with @agent-symbol-searcher, read found files with Read tool
   - Read kairo-tasks command file with Read tool to verify output format example
   - Identify missing information in created task file

3. **Adding Missing Information**
   Verify the following items are included and add if missing:
   - Overview section (total task count, estimated work time, critical path)
   - Checkboxes for each task
   - Task type specification (TDD/DIRECT)
   - Requirement links
   - Dependent tasks
   - Implementation details
   - Test requirements
   - UI/UX requirements (for frontend tasks)
   - Error handling requirements
   - Completion conditions
   - Execution order (Mermaid Gantt chart)
   - Subtask template information

4. **File Update**
   - Update file by adding missing information

## Post-Execution Verification

- Display updated file path
- Display overview of added information
- Verify that task file is complete
