# Tsumiki - AI-Driven Development Support Framework

Tsumiki is a framework for AI-driven development that provides an efficient development process from requirements definition to implementation using AI.

## Installation

To use Tsumiki, install it with the following npx command:

```bash
npx tsumiki install
```

This command installs Tsumiki's Claude Code slash commands to `.claude/commands/`.

## Overview

Tsumiki consists of two main command sets:

- **kairo** - Comprehensive development flow from requirements to implementation
- **tdd** - Individual Test-Driven Development (TDD) execution

### Kairo Commands

Kairo automates and supports the development process from requirements definition to implementation. It supports the following development flow:

1. **Requirements Definition** - Generate detailed requirements documents from overview
2. **Design** - Auto-generate technical design documents
3. **Task Breakdown** - Properly divide and sequence implementation tasks
4. **TDD Implementation** - High-quality implementation through test-driven development

## Available Commands

### Kairo Commands (Comprehensive Development Flow)
- `kairo-requirements` - Requirements definition
- `kairo-design` - Design document generation
- `kairo-tasks` - Task breakdown
- `kairo-implement` - Implementation execution

### TDD Commands (Individual Execution)
- `tdd-requirements` - TDD requirements definition
- `tdd-testcases` - Test case creation
- `tdd-red` - Test implementation (Red)
- `tdd-green` - Minimal implementation (Green)
- `tdd-refactor` - Refactoring
- `tdd-verify-complete` - TDD completion verification

### Reverse Engineering Commands
- `rev-tasks` - Generate task list from existing code
- `rev-design` - Generate design documents from existing code
- `rev-specs` - Generate test specifications from existing code
- `rev-requirements` - Generate requirements documents from existing code

## Quick Start

### Comprehensive Development Flow

```bash
# 1. Requirements definition
/kairo-requirements

# 2. Design
/kairo-design

# 3. Task breakdown
/kairo-tasks

# 4. Implementation
/kairo-implement
```

### Individual TDD Process

```bash
/tdd-requirements
/tdd-testcases
/tdd-red
/tdd-green
/tdd-refactor
/tdd-verify-complete
```

### Reverse Engineering

```bash
# 1. Analyze task structure from existing code
/rev-tasks

# 2. Generate design documents (recommended after task analysis)
/rev-design

# 3. Generate test specifications (recommended after design documents)
/rev-specs

# 4. Generate requirements documents (recommended after complete analysis)
/rev-requirements
```

### Development Environment Cleanup

```bash
# Clean up development environment
/clear
```

## Detailed Manual

For detailed usage, directory structure, workflow examples, and troubleshooting, see [MANUAL.md](./MANUAL.md).
