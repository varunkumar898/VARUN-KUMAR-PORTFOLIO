export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  expectedGraduation: string;
  degree: string;
  university: string;
  cgpa: string;
  coreStatement: string;
  supportingLine: string;
  availability: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  tags: string[];
  responsibilities: string[];
  logReference: string;
}

export interface ProjectDetailTabs {
  overview: string;
  architecture: {
    diagramSteps: string[];
    description: string;
  };
  implementation: {
    points: string[];
    codeSnippet?: {
      title: string;
      language: string;
      code: string;
    };
  };
  debugging: {
    challenges: string[];
    instrumentsUsed: string[];
  };
  validation: {
    methods: string[];
    metrics: string[];
  };
  results: {
    outcomes: string[];
    keyTakeaway: string;
  };
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  repositoryUrl?: string;
  metadata?: {
    commits?: string;
    status?: string;
    targetHardware?: string;
    codeStyle?: string;
    contributionType?: string;
    community?: string;
  };
  drivers?: string[];
  contributions?: string[];
  details: ProjectDetailTabs;
}

export interface SkillCategoryData {
  id: string;
  number: string;
  title: string;
  skills: string[];
  description?: string;
}

export interface StrengthItem {
  id: number;
  title: string;
  description: string;
  metricLabel?: string;
}

export interface PeripheralNode {
  id: string;
  name: string;
  type: string;
  bus: 'AHB' | 'APB1' | 'APB2';
  baseAddress: string;
  pins: string;
  description: string;
  waveformType: 'uart' | 'spi' | 'i2c' | 'adc' | 'pwm' | 'gpio' | 'can' | 'dma';
}
