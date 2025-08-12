# 8.1 Technology Selection Guidelines

This section provides practical guidelines for engineers to make appropriate technology choices when implementing AITDD.

## AI Tool Selection Criteria

### Organizational Policy Takes Priority

#### Using Company-Designated AI Tools
Organizational governance and compliance should be prioritized over technical advantages.

- **Use Only Approved Tools**: Use only AI tools designated by the company for business purposes
- **Organizational Policy Compliance**: Prioritize organizational rules over technical advantages
- **Regular Policy Verification**: Regularly check for changes in AI tool usage guidelines

#### Recommended Tool: Claude Sonnet 4
Current recommended tool based on practical experience and rationale:

- **High-Quality Implementation Generation**: Code generation capabilities suitable for TDD processes
- **Claude Code Integration**: Efficiency improvements through development environment integration
- **Japanese Language Support**: Quality of specification descriptions and comment generation
- **Token Capacity**: Stable operation in large-scale contexts

### Technology Selection Criteria

#### Project Application Conditions

**Cases Well-Suited for Application**
- **New Development Projects**: Very well-suited
- **Modern Technology Stack**: AI assistance is effective
- **Clear Requirements Definition**: When specifications are clearly defined
- **Iterative Development**: Agile and incremental development

**Cases Not Suited for Application**
- **Life-Critical Projects**: Not applicable
- **Legacy Systems**: Existing systems with complex constraints
- **Extremely High Quality Requirements**: Projects with low risk tolerance
- **Short-Term Small Modifications**: When AIDD introduction costs don't justify benefits

## Security and Compliance

### Confidential Information Management

#### Criteria for Transmittable Information
Practical standards for ensuring the safety of information sent to AI tools:

- **Exclude Personal Information**: Information that can identify individuals is not for transmission
- **Exclude Confidential Data**: Information classified as company confidential is not for transmission
- **General Technical Information Only**: Only publicly available technical information is permitted for transmission

#### Practical Data Protection Methods
```
Pre-Transmission Checklist:
□ Check for presence of personal information
□ Confirm removal of confidential data
□ Evaluate necessity of transmission
□ Consider alternative methods
```

### Intellectual Property Considerations

#### Organizational Policy Compliance
- **Apply Intellectual Property Rights Policy**: Operate according to organizational intellectual property policies
- **Coordination with Legal Department**: Consult with legal department when necessary
- **Verify Contract Terms**: Confirm terms of AI tool usage contracts

#### Risk Management
- **Recognize Copyright Risks**: Understand copyright issues with AI-generated code
- **Verify License Terms**: Comply with license terms of AI tools used
- **Commercial Use Appropriateness**: Confirm viability for use in commercial products

## Team Composition and Skill Requirements

### Required Roles and Skills

#### Design Lead
**Required Level**: Experienced practitioners should centrally handle design

Required Skills:
- **API Design**: Experience with RESTful API or GraphQL design
- **Database Design**: Appropriate schema design capabilities
- **Architecture Design**: Experience with overall system structure design
- **AI-Compatible Design**: Ability to create structures that AI can handle effectively

#### Development Members
**Basic Requirements**: Basic programming knowledge and adaptability to AI utilization

- **TDD Understanding**: Basic concepts of test-driven development
- **Prompt Skills**: Effective communication capabilities with AI (learnable)
- **Code Review Ability**: Appropriate evaluation of AI-generated code
- **Continuous Learning Willingness**: Adaptability to new methodologies

### Addressing Prompt Skill Gaps

#### Realistic Challenge Recognition
**"The gap between those who can and cannot imagine AI responses"**

Main differences:
- Experience gaps in AI interaction through familiarity
- Degree of understanding AI characteristics and quirks
- Skills to predict prompt effectiveness in advance
- Accumulated experience from trial and error

#### Solution Approaches
- **Continuous Practice**: Realistic recognition that "you have to keep using it"
- **Gradual Proficiency**: Build experience starting with small tasks
- **Knowledge Sharing**: Share success cases and best practices
- **Pair Programming**: Promote learning through experienced-novice pairs

## Cost-Effectiveness Assessment

### Efficiency Evaluation Criteria

#### Development Speed Improvement
Effects based on practical data:
- **Implementation Speed**: Achieved 20-48x improvement over conventional methods
- **Development Cycle**: 1-2 day tasks reduced to about 1 hour
- **Ease of Trial and Error**: High-speed iteration enables trying many approaches

#### New Cost Elements
- **Quality Management Costs**: Burden of verifying and reviewing AI-generated code
- **Learning Costs**: Time for team members to acquire AIDD skills
- **Tool Usage Costs**: Claude Code API fees, etc.

### Return on Investment Assessment

#### Basic Policy
- **Standard**: No problem if overwhelmingly faster than manual work
- **Effect**: Significant reduction in developer time (reduced to 1/4-1/8)
- **Overall Assessment**: Balance of implementation efficiency vs. quality management costs

#### Practical Implementation Decision
```
Implementation Consideration Checklist:
□ Project duration is sufficient (considering learning costs)
□ Team has understanding of AI utilization
□ Complies with organizational AI usage policies
□ Quality requirement level is within appropriate range
□ Security risks are manageable
```

## Technology Stack Selection Guidelines

### Technologies Suitable for AI Assistance

#### Recommended Technology Stack
- **Modern Frameworks**: React, Vue.js, Next.js, etc.
- **Type-Safe Languages**: TypeScript, Rust, Go, etc.
- **Standard Architectures**: RESTful API, MVC, microservices
- **Testable Design**: Dependency injection, unit-testable structures

#### Technologies to Avoid
- **Complex Legacy Technologies**: Old technologies with insufficient documentation
- **Non-Standard Architectures**: Proprietary designs difficult for AI to understand
- **Test-Difficult Structures**: Designs unsuitable for TDD

### Gradual Technology Introduction

#### Introduction Phases
1. **Pilot Project**: Trial with small-scale new features
2. **Partial Application**: Apply to some features of existing projects
3. **Full Deployment**: AITDD practice across the entire team

#### Technology Migration Strategy
- **Parallel with Existing Technology**: Risk reduction through gradual migration
- **Knowledge Transfer**: Utilize conventional methodology insights in AITDD
- **Continuous Improvement**: Methodology optimization through practice

---

Please use these technology selection guidelines to implement AITDD practices suited to your organization and project characteristics.