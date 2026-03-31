// Definitions based on MOE Singapore Upper Primary Science Syllabus

export const THEMES = [
  { id: 'diversity', name: 'Diversity', description: 'Living and non-living things, classification, materials' },
  { id: 'cycles', name: 'Cycles', description: 'Life cycles, water cycle, reproduction' },
  { id: 'systems', name: 'Systems', description: 'Plant systems, animal systems, human body, cell' },
  { id: 'energy', name: 'Energy', description: 'Forms of energy (heat, light, electrical), uses' },
  { id: 'interactions', name: 'Interactions', description: 'Forces, environment, food webs' },
];

export const ASSESSMENT_OBJECTIVES = [
  { id: 'AO1', name: 'Knowledge & Understanding' },
  { id: 'AO2', name: 'Application of Knowledge' },
  { id: 'AO3', name: 'Evaluation & Higher-Order Thinking' },
];

// We can define subtopics if needed for finer-grained generation
export const SUBTOPICS = {
  diversity: ['Classification of Living Things', 'Fungi and Bacteria', 'Exploring Materials'],
  cycles: ['Life Cycles of Animals', 'Life Cycles of Plants', 'Matter', 'Water Cycle', 'Reproduction in Plants', 'Reproduction in Humans'],
  systems: ['Digestive System', 'Respiratory System', 'Circulatory System', 'Plant Transport System', 'Electrical Systems', 'Cells'],
  energy: ['Light Energy', 'Heat Energy', 'Energy Conversions'],
  interactions: ['Magnets', 'Forces (Friction, Gravity, Elastic)', 'Environment', 'Food Chains and Food Webs', 'Adaptations'],
};
