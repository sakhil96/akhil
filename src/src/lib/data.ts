// Data access layer - reads from JSON files
import peopleData from '@/data/people.json';
import teamsData from '@/data/teams.json';
import servicesData from '@/data/services.json';
import scoresData from '@/data/scores.json';
import activityData from '@/data/activity.json';
import reposData from '@/data/repos.json';

import type {
  Person,
  Team,
  Department,
  Service,
  Score,
  HistoricalTrend,
  PullRequest,
  Ticket,
  Incident,
  Review,
  DataSourceSummary,
  Repo,
} from '@/types';

// People
export function getAllPeople(): Person[] {
  return peopleData.people as Person[];
}

export function getPersonById(id: string): Person | undefined {
  return peopleData.people.find((p) => p.id === id) as Person | undefined;
}

export function getPeopleByTeam(teamId: string): Person[] {
  return peopleData.people.filter((p) => p.teamId === teamId) as Person[];
}

export function getPeopleByManager(managerId: string): Person[] {
  return peopleData.people.filter((p) => p.managerId === managerId) as Person[];
}

export function getEngineers(): Person[] {
  return peopleData.people.filter((p) => p.roleType === 'IC_ENGINEER') as Person[];
}

export function getManagers(): Person[] {
  return peopleData.people.filter((p) => p.roleType === 'ENGINEERING_MANAGER') as Person[];
}

export function getProductManagers(): Person[] {
  return peopleData.people.filter(
    (p) => p.roleType === 'PRODUCT_MANAGER' || p.roleType === 'PROGRAM_MANAGER'
  ) as Person[];
}

// Teams
export function getAllTeams(): Team[] {
  return teamsData.teams as Team[];
}

export function getTeamById(id: string): Team | undefined {
  return teamsData.teams.find((t) => t.id === id) as Team | undefined;
}

export function getDepartments(): Department[] {
  return teamsData.departments as Department[];
}

// Services
export function getAllServices(): Service[] {
  return servicesData.services as Service[];
}

export function getServiceById(id: string): Service | undefined {
  return servicesData.services.find((s) => s.id === id) as Service | undefined;
}

export function getServicesByTeam(teamId: string): Service[] {
  return servicesData.services.filter((s) => s.owningTeamId === teamId) as Service[];
}

export function getTier0Services(): Service[] {
  return servicesData.services.filter((s) => s.tier === 'TIER_0') as Service[];
}

// Repos
export function getAllRepos(): Repo[] {
  return reposData.repos as Repo[];
}

export function getRepoById(id: string): Repo | undefined {
  return reposData.repos.find((r) => r.id === id) as Repo | undefined;
}

export function getReposByService(serviceId: string): Repo[] {
  return reposData.repos.filter((r) => r.serviceIds.includes(serviceId)) as Repo[];
}

export function getReposByContributor(personId: string): Repo[] {
  return reposData.repos.filter((r) =>
    r.contributors.some((c) => c.personId === personId)
  ) as Repo[];
}

// Scores
export function getAllScores(): Score[] {
  return scoresData.scores as Score[];
}

export function getScoreByPersonId(personId: string, period?: string): Score | undefined {
  const scores = scoresData.scores.filter((s) => s.personId === personId) as Score[];
  if (period) {
    return scores.find((s) => s.period === period);
  }
  // Return most recent
  return scores.sort(
    (a, b) => new Date(b.computedAt).getTime() - new Date(a.computedAt).getTime()
  )[0];
}

export function getScoresByTeam(teamId: string): Score[] {
  const team = getTeamById(teamId);
  if (!team) return [];
  
  return team.memberIds
    .map((memberId) => getScoreByPersonId(memberId))
    .filter((s): s is Score => s !== undefined);
}

export function getHistoricalTrends(personId: string): HistoricalTrend[] {
  const trends = (scoresData.historicalTrends as Record<string, HistoricalTrend[]>)[personId];
  return trends || [];
}

// Activity
export function getPullRequestsByAuthor(authorId: string): PullRequest[] {
  return activityData.pullRequests.filter((pr) => pr.authorId === authorId) as PullRequest[];
}

export function getTicketsByAssignee(assigneeId: string): Ticket[] {
  return activityData.tickets.filter((t) => t.assigneeId === assigneeId) as Ticket[];
}

export function getIncidentsByResponder(responderId: string): Incident[] {
  return activityData.incidents.filter((i) =>
    i.responderIds.includes(responderId)
  ) as Incident[];
}

export function getIncidentsByService(serviceId: string): Incident[] {
  return activityData.incidents.filter((i) => i.serviceId === serviceId) as Incident[];
}

export function getReviewsByReviewer(reviewerId: string): Review[] {
  return activityData.reviews.filter((r) => r.reviewerId === reviewerId) as Review[];
}

export function getDataSourceSummary(personId: string): DataSourceSummary | undefined {
  return (activityData.dataSources as Record<string, DataSourceSummary>)[personId];
}

// Aggregations
export interface TeamHealthMetrics {
  teamId: string;
  memberCount: number;
  avgTechnicalImpact: number;
  avgReliability: number;
  avgVelocity: number;
  avgCollaboration: number;
  sloAdherence: number;
  openIncidents: number;
  recentIncidents: number;
}

export function getTeamHealthMetrics(teamId: string): TeamHealthMetrics | undefined {
  const team = getTeamById(teamId);
  if (!team) return undefined;

  const scores = getScoresByTeam(teamId);
  const engineerScores = scores.filter((s) => s.roleType === 'IC_ENGINEER');

  const services = getServicesByTeam(teamId);
  const avgSlo =
    services.length > 0
      ? services.reduce((sum, s) => sum + s.currentSloAdherence, 0) / services.length
      : 0;

  const incidents = services.flatMap((s) => getIncidentsByService(s.id));
  const recentIncidents = incidents.filter(
    (i) => new Date(i.startedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );

  const avgDimension = (dimension: string) => {
    const validScores = engineerScores.filter((s) => s.dimensions[dimension]);
    if (validScores.length === 0) return 0;
    return (
      validScores.reduce((sum, s) => sum + s.dimensions[dimension].score, 0) /
      validScores.length
    );
  };

  return {
    teamId,
    memberCount: team.memberIds.length,
    avgTechnicalImpact: avgDimension('technicalImpact'),
    avgReliability: avgDimension('reliabilityCraft'),
    avgVelocity: avgDimension('velocityConsistency'),
    avgCollaboration: avgDimension('collaborationInfluence'),
    sloAdherence: avgSlo,
    openIncidents: incidents.filter((i) => i.status === 'active').length,
    recentIncidents: recentIncidents.length,
  };
}

// Search
export function searchPeople(query: string): Person[] {
  const lowerQuery = query.toLowerCase();
  return peopleData.people.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.email.toLowerCase().includes(lowerQuery) ||
      p.title.toLowerCase().includes(lowerQuery)
  ) as Person[];
}

export function searchServices(query: string): Service[] {
  const lowerQuery = query.toLowerCase();
  return servicesData.services.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery)
  ) as Service[];
}

