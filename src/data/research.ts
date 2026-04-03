export interface ResearchArea {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  focus: string[];
  methods: string[];
  recentDirections: string[];
  figures?: ResearchFigure[];
}

export interface ResearchFigure {
  src: string;
  alt: string;
  caption: string;
  scale?: number;
  width?: number;
  height?: number;
}

export const researchAreas: ResearchArea[] = [
  {
    slug: 'computational-electrocatalyst-design',
    title: 'Computational Electrocatalyst Design',
    summary:
      'DFT and machine learning enable discovery of molecular and single-atom electrocatalysts.',
    overview:
      'Current research centers on the computational design and discovery of electrocatalysts for sustainable energy conversion by combining first-principles simulations and machine learning techniques. Density functional theory (DFT) calculations are used to study reaction mechanisms, spin-state effects, and proton-coupled electron-transfer processes in electrochemical reactions such as CO₂ reduction (CO₂RR) and the oxygen reduction reaction (ORR). At the same time, data-driven and machine learning frameworks are being developed to efficiently explore large chemical spaces by integrating molecular descriptors and quantum-mechanical features. These approaches are used to discover and optimize nitrogen-heterocyclic molecular catalysts and Fe–N–C single-atom catalysts, aiming to elucidate how electronic structure, coordination environment, and catalyst composition influence catalytic activity, selectivity, and stability.',
    focus: [
      'Machine-learning-guided catalyst discovery',
      'Design of earth-abundant molecular and single-atom catalysts for sustainable energy conversion',
      'First-Principles Modeling of Electrocatalytic Reaction Mechanisms',
    ],
    methods: ['Genetic Algorithm and Machine learning', 'Density Functional Theory Calculations / Growing String Method (GSM)', 'Computational Hydrogen Electrode (CHE) formulism'],
    recentDirections: [
      'CO₂ Reduction Reaction (CO2RR)',
      'Oxygen Reduction Reaction (ORR)',
      'Nitrogen Reduction Reaction (NRR)',
    ],
    figures: [
      {
        src: '~/assets/images/research1-1.svg',
        alt: 'ML-Guided Evolutionary Search for Molecular Catalyst Discovery and Optimization',
        caption: 'ML-Guided Evolutionary Search for Molecular Catalyst Discovery and Optimization',
        scale: 1.2,
      },
      {
        src: '~/assets/images/research1-2.svg',
        alt: 'Solvation Effects in Pyridine-Catalyzed CO₂ Reduction to Formic Acid',
        caption: 'Solvation Effects in Pyridine-Catalyzed CO₂ Reduction to Formic Acid',
        scale: 1.2,
      }
    ],
  },
  {
    slug: 'AI-accelerated-polymer-design',
    title: 'AI-Accelerated Polymer Design',
    summary:
      'Integrating simulations and machine learning to uncover polymer structure–property relationships and accelerate materials discovery',
    overview:
      'Accelerated polymer design is an emerging research direction that integrates multiscale molecular simulations with machine learning to understand polymer structure–property relationships and guide molecular design. Recent advances in generative AI and active learning are enabling more efficient exploration of polymer chemical space and accelerating the discovery of high-performance functional materials.',
    focus: [
      'Functional polymer design for gas separation membranes, ion exchange membranes, etc.',
      'Structure–property relationships in polymer engineering',
      'Accelerated discovery of high-performance polymers through simulation and data-driven design',
    ],
    methods: ['Multiscale molecular simulations for gas transport in polymers', 'Machine learning for molecular representation and property prediction', 'Data-driven screening and active learning frameworks for polymer discovery'],
    recentDirections: [
      'Generative models for polymer and molecular design',
      'Large Language Models (LLMs) for encoding and leveraging chemical knowledge',
      'AI-guided exploration of polymer chemical space through active learning and autonomous workflows',
    ],
    figures: [
      {
        src: '~/assets/images/research2-1.png',
        alt: 'AI-Driven Polymer Design Workflow',
        caption: 'AI-Driven Polymer Design Workflow',
        scale: 1.2,
      },
    ],
  },
  {
    slug: 'molecular-simulations-of-complex-systems',
    title: 'Molecular simulations of Complex Systems',
    summary:
      'Using enhanced-sampling molecular dynamics to study membrane permeation and polymer binding in complex molecular systems',
    overview:
      'This line of work applies molecular dynamics simulations, particularly enhanced sampling methods, to investigate complex molecular processes in biomolecular and polymer systems. One major direction is studying antibiotic permeation through protein membranes to reveal transport pathways, free-energy barriers, and key molecular determinants of permeability. Another direction is simulating plastic polymers and their interactions with target substances, with emphasis on binding thermodynamics, molecular recognition, and adsorption behavior. By combining atomistic modeling with advanced sampling techniques, this work aims to uncover mechanisms that are difficult to resolve experimentally and to provide quantitative insight into transport and interaction phenomena relevant to drug delivery, membrane biology, and functional materials design.',
    focus: [
      'Molecular mechanisms in biomolecular and polymer systems',
      'Antibiotic permeation through protein membranes',
      'Polymer–molecule interactions and binding thermodynamics',
    ],
    methods: ['Atomistic molecular dynamics simulations', 'Enhanced sampling methods for rare-event exploration', 'Free-energy calculations and binding-energy analysis'],
    recentDirections: [
      'Quantifying antibiotic permeation pathways and energetic barriers in membrane proteins',
      'Investigating how polymer chemistry and structure affect binding affinity to target molecules',
      'Developing robust simulation workflows for difficult transport and adsorption processes',
    ],
    figures: [
      {
        src: '~/assets/images/research3-1.png',
        alt: 'Molecular Dynamics Simulation Setup for Antibiotic Translocation',
        caption: 'Molecular Dynamics Simulation Setup for Antibiotic Translocation',
        scale: 1.2,
      },
    ],
  },
];
