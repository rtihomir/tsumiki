# TDD Related File Loading and Context Preparation (Deprecated)

**Note**: This command is deprecated. Other TDD commands directly use @agent-symbol-searcher and Read tools to prepare context.

The following is maintained as reference information.

## Execution Tasks

Execute the following parallel loading and searching using @agent-symbol-searcher and Task tools:

### 0. **Search for related information with @agent-symbol-searcher**
   - Search for existing symbols, functions, and classes related to target features
   - Identify implementation patterns and architecture of similar features
   - Check usage of TDD-related tools and frameworks

```
1. 【Reading】Check TDD memo files
   - Read tool: `docs/implements/{{task_id}}/{feature_name}-memo.md`
   - Understand existing development history, phase information, verification results

2. 【Reading】Check requirements definition documents  
   - Read tool: `docs/implements/{{task_id}}/{feature_name}-requirements.md`
   - Understand feature specifications, input/output, constraints

3. 【Reading】Check test case definitions
   - Read tool: `docs/implements/{{task_id}}/{feature_name}-testcases.md` 
   - Understand planned test cases, classifications, expected values

4. 【Exploration only】Identify project design documents
   - Glob tool: Check existence of `docs/spec/{feature_name}-requirements.md`
   - Glob tool: Identify files in `docs/design/{feature_name}/` directory
   - Record found file paths (do not execute reading)

5. 【Exploration only】Identify project structure and library files
   - Glob tool: Check existence of `package.json`
   - Glob tool: Understand existing test file structure (`**/*test*.js`, `**/*spec*.js`, etc.)
   - Grep tool: Survey implementation patterns of similar features (search related keywords)
   - Record found file paths (do not execute reading)

6. 【Exploration only】Identify task management documents
   - Glob tool: Check existence of `docs/tasks/{requirement name}-tasks.md`
   - Record found file paths (do not execute reading)
```

## Organize Loading Results

After loading and exploration completion, organize information in the following format:

### 📋 Development Context Information

```markdown
## TDD Development Context

### 🎯 Current Phase and Status
- **Target Feature**: {feature_name}
- **Current TDD Phase**: [Requirements/TestCases/Red/Green/Refactor/Verify]
- **Previously Completed Phase**: [Previously completed phase]
- **Planned Execution**: [Next step to execute]

### 📄 Requirements and Specification Information
- **Feature Overview**: [Feature overview extracted from requirements definition]
- **Input Specification**: [Input parameter types, constraints, ranges]
- **Output Specification**: [Output format, structure, expected values]
- **Constraints**: [Performance, security, technical constraints]
- **Referenced EARS Requirements**: [Requirement IDs like REQ-XXX, NFR-XXX]

### 🔧 Technical and Implementation Information
- **Language Used**: [JavaScript/TypeScript, etc.]
- **Test Framework**: [Jest/Mocha, etc.]
- **Related Files**: [List of related file paths found in exploration]
- **Design Document Paths**: [List of found design document paths]
- **Similar Implementation Paths**: [File paths of existing implementations for reference]

### 📈 Progress and Quality Information
- **Overall Task Progress**: [Completed]/[Total] ([%])
- **Previous Verification Results**: [Pass/Fail/Not Implemented]
- **Quality Issues**: [Security and performance issues]
- **Improvement Requirements**: [Improvement points recorded previously]

### ⚠️ Cautions and Constraints
- **Technical Constraints**: [Architecture and compatibility constraints]
- **Implementation Cautions**: [Important cautions recorded previously]
- **Unresolved Issues**: [Issues requiring continued attention]
```

## Reliability Level Assessment

Assess reliability level for each piece of loaded information:

- 🟢 **Green Signal**: File exists and detailed information is available
- 🟡 **Yellow Signal**: File exists but information is partial
- 🔴 **Red Signal**: File does not exist or requires guesswork

## Usage

Use at the beginning of each TDD command as follows:

```markdown
## Preliminary Preparation

Prepare development context:

**Task Tool Execution**: Execute TDD-related file loading, exploration, and context preparation with `/tdd-load-context`

After loading completion, start work for {current phase} based on prepared context information.
```

## Effects

- **Efficiency**: Time saving by reading memos, requirements, test cases and only exploring others
- **Consistency**: Unified context preparation across all TDD phases
- **Quality Improvement**: Prevent omission of necessary information loading
- **Maintainability**: Centralized management of file loading and exploration logic
- **Lightweight**: Related files are only identified, can be read individually as needed

This task enables efficient preparation of necessary information for each phase of TDD development by combining search results from @agent-symbol-searcher with existing TDD file information.