# direct-verify

## Purpose

Perform operation verification and testing of setup work executed in DIRECT tasks. Confirm that configuration is correctly applied and the system operates as expected.

## Prerequisites

- `direct-setup.md` has been executed
- Task ID is provided
- Setup work records exist

## Execution Content

**【Important】**: If compilation errors or syntax errors are found in files created by direct-setup, automatically attempt to resolve them.

1. **Configuration Verification**
   - Search for related configurations and verification patterns with @agent-symbol-searcher, read found files with Read tool
   - Read `docs/implements/{TASK-ID}/setup-report.md` with Read tool to verify setup work results
   - Environment variable verification
   - Configuration file content verification
   - Dependency installation status verification
   - Service startup status verification

2. **Compilation/Syntax Verification**
   - TypeScript/JavaScript syntax error check (if applicable)
   - Configuration file syntax verification (JSON, YAML, etc.)
   - SQL syntax verification (if applicable)
   - Minimum compilation error resolution

3. **Operation Test Execution**
   - Search for existing test cases and verification scripts with @agent-symbol-searcher, read found files with Read tool
   - Basic operation verification
   - Connection testing
   - Permission verification
   - Error case verification

4. **Quality Check**
   - Security configuration verification
   - Performance standard verification
   - Log verification

## Output Destination

Verification records are created as the following files in `docs/implements/{TASK-ID}/` directory:
- `verify-report.md`: Configuration verification and operation test record

## Output Format Example

````markdown
# {TASK-ID} Configuration Verification and Operation Test

## Verification Overview

- **Task ID**: {TASK-ID}
- **Verification Content**: {Configuration verification overview}
- **Execution Date/Time**: {Execution date/time}
- **Executor**: {Executor}

## Configuration Verification Results

### 1. Environment Variable Verification

```bash
# Executed commands
echo $NODE_ENV
echo $DATABASE_URL
```
````

**Verification Results**:

- [x] NODE_ENV: development (Expected: development)
- [x] DATABASE_URL: postgresql://localhost:5432/mydb (Expected: correct DB URL)

### 2. Configuration File Verification

**Verified File**: `config/database.json`

```bash
# Executed commands
cat config/database.json | jq .
```

**Verification Results**:

- [x] File exists
- [x] JSON format is correct
- [x] Required configuration items are included

## Compilation/Syntax Check Results

### 1. TypeScript/JavaScript Syntax Check

```bash
# If TypeScript files exist
npx tsc --noEmit --skipLibCheck

# JavaScript syntax check
node --check *.js
```

**Check Results**:

- [x] TypeScript syntax errors: None
- [x] JavaScript syntax errors: None
- [x] import/require statements: Normal

### 2. Configuration File Syntax Check

```bash
# JSON configuration file syntax check
cat config/*.json | jq empty

# YAML configuration file syntax check (if applicable)
yamllint config/*.yml
```

**Check Results**:

- [x] JSON syntax: Normal
- [x] YAML syntax: Normal (if applicable)
- [x] Configuration item validity: Verified

### 3. SQL Syntax Check (if applicable)

```bash
# Basic SQL syntax check
psql -d mydb --single-transaction --set ON_ERROR_STOP=on -f schema.sql --dry-run
```

**Check Results**:

- [x] SQL syntax: Normal
- [x] Table definitions: Normal
- [x] Constraint definitions: Normal

### 3. Dependency Verification

```bash
# Executed commands
npm list express pg
```

**Verification Results**:

- [x] express: Installed
- [x] pg: Installed

### 4. Database Connection Test

```bash
# Executed commands
psql -d mydb -c "SELECT 1;"
```

**Verification Results**:

- [x] Database connection successful
- [x] Query execution successful

## Operation Test Results

### 1. Basic Operation Test

```bash
# Executed test commands
node -e "console.log('Hello, World!');"
```

**Test Results**:

- [x] Node.js execution environment: Normal
- [x] Basic JavaScript execution: Normal

### 2. Database Connection Test

```javascript
// Test script
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Connected:', res.rows[0]);
  }
  pool.end();
});
```

**Test Results**:

- [x] Database connection: Normal
- [x] Query execution: Normal
- [x] Connection termination: Normal

### 3. Security Configuration Test

```bash
# Executed commands
ls -la config/
ps aux | grep node
```

**Test Results**:

- [x] Configuration file permissions: Appropriate
- [x] Process execution permissions: Appropriate
- [x] Confidential information protection: Appropriate

## Quality Check Results

### Performance Verification

- [x] Startup time: Within 2 seconds
- [x] Memory usage: Within 256MB
- [x] CPU usage: Within 10%

### Log Verification

- [x] Error logs: No abnormalities
- [x] Warning logs: No issues
- [x] Information logs: Properly output

## Overall Verification Results

- [x] Setup work completed correctly
- [x] All operation tests successful
- [x] Quality standards met
- [x] Ready to proceed to next task

## Discovered Problems and Resolutions

### Syntax Error/Compilation Error Resolution

**Problems to attempt automatic resolution**:
- TypeScript/JavaScript syntax errors
- JSON/YAML syntax errors
- Basic SQL syntax errors
- import/require statement issues

### Problem 1: {Record if problems exist}

- **Problem Content**: {Problem details}
- **Discovery Method**: {Syntax check/Compilation/Operation test}
- **Severity**: {High/Medium/Low}
- **Automatic Resolution**: {Executed resolution commands/fixes}
- **Resolution Result**: {Resolved/Manual intervention required}

### Resolution Execution Log

```bash
# Example resolution commands executed
# Syntax error fix
sed -i 's/typo/correct/g' config.js

# Dependency fix
npm install missing-package

# Configuration file fix
jq '.port = 3000' config.json > temp.json && mv temp.json config.json
```

**Resolution Results**:
- [x] Problem 1: Resolved
- [x] Problem 2: Resolved
- [ ] Problem 3: Manual intervention required (details in recommendations)

## Recommendations

- {Record improvement suggestions if any}
- {Record optimization suggestions if any}

## Next Steps

- Task completion report
- Preparation for starting related tasks
- Fine-tune configuration as needed

````

## Post-Execution Verification
- Verify that `docs/implements/{TASK-ID}/verify-report.md` file is created
- Verify that all verification items are completed
- Verify that discovered problems are appropriately addressed
- Verify that task completion conditions are met
- Verify that preparation for next task is complete

## Directory Verification

Verify that `docs/implements/{TASK-ID}/` directory exists (should be created by direct-setup)

## Task Completion Marking
If quality checks are sufficient and all verification items are cleared, mark the corresponding task file in the tasks directory as complete.

### Completion Conditions
Mark task as complete when all of the following conditions are met:
- [ ] All configuration verification items cleared
- [ ] Compilation/syntax checks successful (all errors resolved)
- [ ] All operation tests successful
- [ ] Quality check items meet standards
- [ ] Discovered problems appropriately addressed
- [ ] Security configuration appropriate
- [ ] Performance standards met

### How to Mark Completion
1. Verify user-specified task file
2. Add `✅ Complete` or `[COMPLETED]` mark to corresponding section or task item in file
3. Record completion date/time and verifier

## README.md Update
When task is completed, create or update `README.md` in project root directory.

### Update Content
1. **Verify current README.md**: Check content if existing README.md exists
2. **Add completed task information**:
   - Overview of implemented features
   - Configuration procedures
   - Operation verification methods
   - Usage instructions
3. **Update overall project information**:
   - Setup procedures
   - Dependencies
   - Environment requirements
   - Development/operation procedures

### README.md Update Format Example

```markdown
# Project Name

## Overview
{Project overview}

## Completed Features
### {TASK-ID}: {Task name}
- **Implementation Date**: {Implementation date}
- **Overview**: {Feature overview}
- **Configuration Content**: {Configured content}
- **Operation Verification**: {Operation verification results}

## Setup Procedures
### Prerequisites
- {Required environment/tools}

### Installation
```bash
# Dependency installation
{Installation commands}

# Environment variable configuration
{Environment variable settings}
````

### Startup Method

```bash
# Development server startup
{Startup commands}
```

## Configuration

### Environment Variables

- `{Environment variable name}`: {Description}

### Configuration Files

- `{Configuration file path}`: {Description}

## Usage

{Usage description}

## Development

### Development Environment Preparation

{Development environment preparation procedures}

### Testing

{Test execution method}

## Troubleshooting

### Common Problems

- **Problem**: {Problem content}
- **Solution**: {Solution}

## Update History

- {Date}: {TASK-ID} {Change content}

```

### Execution Procedures
1. Verify current README.md (create new if doesn't exist)
2. Add completed task information
3. Update other sections as needed
4. Commit changes
```
