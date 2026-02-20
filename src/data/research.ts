export interface ResearchArea {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  focus: string[];
  methods: string[];
  recentDirections: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    slug: 'molecular-simulation-multiscale-modeling',
    title: 'Molecular Simulation and Multiscale Modeling',
    summary:
      'Integrating atomistic and coarse-grained methods to understand structure-property relationships in complex materials.',
    overview:
      'This thrust develops predictive models across length and time scales. We connect molecular mechanisms to measurable bulk behavior and design principles.',
    focus: [
      'Polymer crystallinity, chain packing, and morphology evolution',
      'Multiscale coupling between atomistic and coarse-grained simulations',
      'Structure-property prediction for sustainable materials',
    ],
    methods: ['Molecular dynamics', 'Coarse-grained simulation', 'Free-energy analysis', 'Uncertainty quantification'],
    recentDirections: [
      'Automated setup pipelines for semicrystalline simulation systems',
      'Benchmarking force-field transferability across chemistries',
      'Reproducible workflows for high-throughput simulation studies',
    ],
  },
  {
    slug: 'data-driven-scientific-discovery',
    title: 'Data-Driven Scientific Discovery',
    summary:
      'Using machine learning and statistical inference to accelerate hypothesis generation and reduce experimental search space.',
    overview:
      'This direction combines domain knowledge with data-driven models to prioritize experiments and simulations that maximize scientific insight.',
    focus: [
      'Surrogate models for expensive simulation outputs',
      'Active-learning loops for adaptive sampling',
      'Interpretable models for mechanism discovery',
    ],
    methods: ['Scientific machine learning', 'Bayesian optimization', 'Feature engineering', 'Model interpretability'],
    recentDirections: [
      'Active-learning campaigns for materials property exploration',
      'Physics-aware descriptors for robust model transfer',
      'Uncertainty-aware ranking of candidate systems',
    ],
  },
  {
    slug: 'computational-infrastructure-reproducible-science',
    title: 'Computational Infrastructure for Reproducible Science',
    summary:
      'Designing robust software workflows, benchmark datasets, and validation protocols for high-quality computational research.',
    overview:
      'This line of work builds maintainable scientific software and reproducible pipelines so that results are portable, auditable, and extensible.',
    focus: [
      'Versioned datasets and provenance-aware workflows',
      'Testable and reusable scientific codebases',
      'Validation and benchmarking standards for simulation studies',
    ],
    methods: ['CI/CD for scientific code', 'Automated regression testing', 'Data versioning', 'Containerized execution'],
    recentDirections: [
      'Lab-wide templates for reproducible project setup',
      'Continuous integration checks for numerical consistency',
      'Standardized benchmark suites for method comparison',
    ],
  },
];

