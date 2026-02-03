// Core entity types for PayPal EIP

export type RoleType = 
  | 'IC_ENGINEER' 
  | 'ENGINEERING_MANAGER' 
  | 'PRODUCT_MANAGER' 
  | 'PROGRAM_MANAGER' 
  | 'OTHER';

export type ServiceTier = 'TIER_0' | 'TIER_1' | 'TIER_2' | 'TIER_3';

export type TrendDirection = 'up' | 'down' | 'stable';

export interface Person {
  id: string;
  employeeId: string;
  email: string;
  name: string;
  roleType: RoleType;
  level: string;
  title: string;
  teamId: string;
  managerId: string | null;
  startDate: string;
  githubUsername: string | null;
  jiraUsername: string | null;
  avatarUrl: string;
  isActive: boolean;
  location: string;
  tenure: string;
  isRamping?: boolean;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  managerId: string;
  departmentId: string;
  memberIds: string[];
  serviceIds: string[];
  openReqs: number;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  vpId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  tier: ServiceTier;
  owningTeamId: string;
  repoIds: string[];
  criticalityScore: number;
  complexityScore: number;
  dependencyCount: number;
  isSecuritySensitive: boolean;
  monthlyTrafficMillions: number;
  currentSloAdherence: number;
  targetSlo: number;
  errorRate: number;
  latencyP99Ms: number;
  lastIncidentDate: string;
  lastIncidentSeverity: string;
  lastIncidentMttrMinutes: number;
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  language: string;
  serviceIds: string[];
  owningTeamId: string;
  complexityScore: number;
  cyclomaticComplexity: number;
  dependencyDepth: number;
  fanIn: number;
  fanOut: number;
  testCoverage: number;
  techDebtScore: number;
  contributors: RepoContributor[];
  recentChanges: {
    last30Days: RepoChangeStats;
    last90Days: RepoChangeStats;
  };
}

export interface RepoContributor {
  personId: string;
  commitPercentage: number;
  isCodeOwner: boolean;
}

export interface RepoChangeStats {
  commits: number;
  prs: number;
  avgComplexityDelta: number;
}

// Scoring types
export interface MetricValue {
  value: number | string;
  peerMedian: number | string;
  score: number;
  weight: number;
}

export interface DimensionScore {
  score: number;
  percentile: number;
  confidence: number;
  trend: TrendDirection;
  trendDelta: number;
  isBelowAverage?: boolean;
  metrics: Record<string, MetricValue>;
}

export interface Score {
  id: string;
  personId: string;
  roleType: RoleType;
  period: string;
  periodStart: string;
  periodEnd: string;
  algorithmVersion: string;
  computedAt: string;
  overallConfidence: number;
  isRamping?: boolean;
  dimensions: Record<string, DimensionScore>;
  summary: string;
  dataPointCount: number;
  sourceCount: number;
}

export interface HistoricalTrend {
  period: string;
  [dimension: string]: string | number;
}

// Activity types
export interface PullRequest {
  id: string;
  repoId: string;
  number: number;
  title: string;
  authorId: string;
  reviewerIds: string[];
  status: 'open' | 'merged' | 'closed';
  filesChanged: number;
  additions: number;
  deletions: number;
  complexityDelta: number;
  reviewCommentsCount: number;
  createdAt: string;
  mergedAt?: string;
  cycleTimeDays: number;
  impact?: string;
}

export interface Ticket {
  id: string;
  key: string;
  summary: string;
  type: 'story' | 'bug' | 'tech_debt' | 'incident';
  assigneeId: string;
  storyPoints: number;
  status: string;
  sprint: string;
  createdAt: string;
  completedAt?: string;
  reopened: boolean;
}

export interface Incident {
  id: string;
  serviceId: string;
  title: string;
  severity: string;
  status: 'active' | 'resolved';
  responderIds: string[];
  startedAt: string;
  resolvedAt?: string;
  mttrMinutes: number;
  rootCause: string;
  postMortemCompleted: boolean;
  actionItemsCompleted: number;
  actionItemsTotal: number;
}

export interface Review {
  id: string;
  prId: string;
  reviewerId: string;
  state: 'approved' | 'changes_requested' | 'commented';
  commentsCount: number;
  qualityScore: number;
  submittedAt: string;
  responseTimeHours: number;
}

export interface DataSourceSummary {
  github?: {
    prsAuthored: number;
    reviewsGiven: number;
    reposTouched: number;
    lastSync: string;
  };
  jira?: {
    storiesCompleted: number;
    bugsFixed: number;
    techDebtItems: number;
    lastSync: string;
  };
  datadog?: {
    servicesOwned: number;
    sloAdherence: number;
    incidentsResponded: number;
    lastSync: string;
  };
}

// UI helper types
export interface ScoreDisplayConfig {
  dimension: string;
  label: string;
  description: string;
  color: string;
}

export const ENGINEER_DIMENSIONS: ScoreDisplayConfig[] = [
  {
    dimension: 'technicalImpact',
    label: 'Technical Impact',
    description: 'Code quality, complexity handled, service criticality',
    color: 'accent-blue',
  },
  {
    dimension: 'reliabilityCraft',
    label: 'Reliability & Craft',
    description: 'Stability of code, post-deploy defects, tests',
    color: 'accent-teal',
  },
  {
    dimension: 'velocityConsistency',
    label: 'Velocity & Consistency',
    description: 'Sustainable throughput, responsiveness, predictability',
    color: 'accent-purple',
  },
  {
    dimension: 'collaborationInfluence',
    label: 'Collaboration & Influence',
    description: 'Reviews, cross-team work, mentoring signals',
    color: 'accent-gold',
  },
];

export const MANAGER_DIMENSIONS: ScoreDisplayConfig[] = [
  {
    dimension: 'teamHealthRetention',
    label: 'Team Health & Retention',
    description: 'Attrition, engagement, team stability',
    color: 'accent-green',
  },
  {
    dimension: 'deliveryReliability',
    label: 'Delivery Reliability',
    description: 'Sprint completion, roadmap adherence',
    color: 'accent-blue',
  },
  {
    dimension: 'operationalExcellence',
    label: 'Operational Excellence',
    description: 'SLO adherence, incident response, on-call health',
    color: 'accent-teal',
  },
  {
    dimension: 'talentGrowthDelegation',
    label: 'Talent Growth & Delegation',
    description: 'Promotions, work distribution, mentoring',
    color: 'accent-purple',
  },
];

export const PM_DIMENSIONS: ScoreDisplayConfig[] = [
  {
    dimension: 'businessProductOutcomes',
    label: 'Business & Product Outcomes',
    description: 'Feature adoption, revenue impact, retention',
    color: 'accent-gold',
  },
  {
    dimension: 'executionCoordination',
    label: 'Execution & Coordination',
    description: 'Milestone delivery, cross-team coordination',
    color: 'accent-blue',
  },
  {
    dimension: 'customerStakeholderSatisfaction',
    label: 'Customer & Stakeholder Satisfaction',
    description: 'Escalation rate, feedback scores',
    color: 'accent-teal',
  },
  {
    dimension: 'documentationClarity',
    label: 'Documentation & Clarity',
    description: 'PRD quality, spec clarity, coverage',
    color: 'accent-purple',
  },
];

export function getDimensionsForRole(roleType: RoleType): ScoreDisplayConfig[] {
  switch (roleType) {
    case 'IC_ENGINEER':
      return ENGINEER_DIMENSIONS;
    case 'ENGINEERING_MANAGER':
      return MANAGER_DIMENSIONS;
    case 'PRODUCT_MANAGER':
    case 'PROGRAM_MANAGER':
      return PM_DIMENSIONS;
    default:
      return ENGINEER_DIMENSIONS;
  }
}

