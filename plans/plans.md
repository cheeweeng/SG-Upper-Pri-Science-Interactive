# Context

This plan outlines development of an AI-powered educational app for upper primary Science in Singapore. The app will:

* Generate personalized worksheets/questions based on proficiency
* Assess responses to estimate proficiency levels
* Adapt future content using AI

Key requirements:

* Align with MOE Singapore upper primary Science syllabus (Primary 4-6)
* Support adaptive learning paths
* Provide detailed progress tracking
* Include MOE-approved content standards

# Curriculum Framework (Singapore MOE Upper Primary Science)

## Thematic Structure (5 Themes)

* **Diversity**: Living and non-living things, classification, adaptation
* **Cycles**: Life cycles (plants, animals), water cycle, day/night, seasons
* **Systems**: Plant systems (transport, reproduction), animal systems (digestive, respiratory, circulatory), cell as basic unit
* **Energy**: Forms of energy (heat, light, sound), energy conversions, forces and friction, electricity, magnets
* **Interactions**: Living things \& environment (food chains/webs, ecosystem), physical interactions (matter, states, properties)

## Assessment Objectives (AO)

* **AO1**: Knowledge with understanding – recall facts, definitions, concepts, scientific vocabulary
* **AO2**: Application – apply knowledge to new situations, analyze information, solve problems
* **AO3**: Evaluation – interpret data, make inferences, design investigations, evaluate experimental methods, think critically

## PSLE Format

* Multiple-choice questions (MCQ) – \~60% of marks
* Open-ended questions (OEQ) – short answers, structured questions – \~40%
* Practical assessment (formerly SBA) – skills in handling equipment, observation, reporting
* Weighting: \~50% knowledge, \~30% application, \~20% higher-order thinking

## Progression (P4 → P6)

* P4: Foundational concepts, basic systems, simple investigation skills
* P5: Deeper understanding, more complex interactions, extended analysis
* P6: Integration of themes, extended explanation, full scientific method, model-based reasoning

## Skills to Assess

* Process skills: observing, comparing, classifying, measuring, inferring, predicting, communicating
* Experiment skills: planning fair tests, controlling variables, using apparatus safely
* Critical thinking: causal reasoning, evidence evaluation, misconception identification
* Scientific literacy: reading graphs, interpreting experimental results, drawing conclusions

# Implementation Approach

## Phase 1: Curriculum Research

* Use Explore subagent to analyze MOE Singapore upper primary Science syllabus
* Identify key topics, learning objectives, and assessment standards
* Map topics to difficulty levels and learning milestones
* Create knowledge graph linking concepts across themes and grade levels

## Phase 2: Core Functionality Design

### Proficiency Assessment Engine

* Use NLP to analyze short-answer and diagram-based responses
* Map responses to AO1/AO2/AO3 rubrics with confidence scoring
* Implement Bayesian knowledge tracing or item response theory for proficiency estimation
* Provide formative feedback with hints and explanations

### Adaptive Question Generation

* Template-based generation with variable substitution for numerics, diagrams, scenarios
* Difficulty controlled via Bloom's taxonomy alignment and concept interdependencies
* Ensure coverage of all 5 themes and progression across P4-P6
* Generate both MCQ and OEQ formats matching PSLE weightage

### Worksheet Customization

* Dynamic worksheet assembly based on proficiency gaps and learning goals
* Spaced repetition principles for concept reinforcement
* Mix of question types (MCQ, structured, application) per MOE guidelines
* Time-estimated completion based on historical performance

### Progress Tracking Dashboard

* Student view: mastery wheels per theme, progress over time, recommended next steps
* Parent/teacher view: class trends, identification of persistent misconceptions, assignment completion
* Analytics: proficiency trends, response patterns, time-on-task, hint usage

## Phase 3: Technical Architecture

* **Knowledge Base**: MOE-aligned concept map with metadata (theme, grade, AO, difficulty)
* **AI Models**:

  * Response understanding: fine-tuned small language model for scientific concept extraction
  * Proficiency estimation: hybrid model (rule-based + ML) with uncertainty quantification
  * Question generation: constrained generation using templates and concept relationships
* **API Layer**: RESTful services for question generation, assessment, worksheet creation
* **Frontend**: Child-friendly interface with gamification elements (badges, streaks)
* **Data Storage**: Encrypted student progress, anonymized for model improvement
* **Integration**: Designed for future MOE SLS (Student Learning Space) API compatibility

## Phase 4: Validation

* Content validation: MOE curriculum specialists review generated items
* Assessment validation: compare AI proficiency estimates with teacher judgments
* Adaptive efficacy: A/B test adaptive vs fixed difficulty with learning gains
* Pilot testing: 20 students over 4 weeks with pre/post concept maps
* Iterative improvement: feedback loop from user testing to refine algorithms

# Verification Plan

1. **Content Alignment**: Generated worksheets audited against MOE syllabus checklist
2. **Assessment Accuracy**: Correlation analysis between AI scores and teacher scores (target r > 0.7)
3. **Adaptive Effectiveness**: Pre/post test comparison showing improved learning trajectories
4. **User Engagement**: Measure completion rates, time-on-task, satisfaction surveys
5. **Scalability**: Load testing for concurrent user support

# Lessons Learned

* Prioritize MOE syllabus alignment in all development phases
* Use subagents for parallel research tasks
* Implement confidence scoring for assessment accuracy
* Design adaptive paths based on performance patterns
* Include parent dashboard
* Start with narrow scope (one theme) before expanding to full curriculum

