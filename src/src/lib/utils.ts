import { clsx, type ClassValue } from 'clsx';
import type { RoleType, ServiceTier, TrendDirection } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMinutes) < 60) {
    return formatter.format(diffMinutes, 'minute');
  }
  if (Math.abs(diffHours) < 48) {
    return formatter.format(diffHours, 'hour');
  }
  return formatter.format(diffDays, 'day');
}

export function getRoleLabel(role: RoleType) {
  switch (role) {
    case 'IC_ENGINEER':
      return 'Engineer';
    case 'ENGINEERING_MANAGER':
      return 'Engineering Manager';
    case 'PRODUCT_MANAGER':
      return 'Product Manager';
    case 'PROGRAM_MANAGER':
      return 'Program Manager';
    default:
      return 'Other';
  }
}

export function getRoleIcon(role: RoleType) {
  switch (role) {
    case 'IC_ENGINEER':
      return '🧑‍💻';
    case 'ENGINEERING_MANAGER':
      return '🧑‍💼';
    case 'PRODUCT_MANAGER':
      return '🧭';
    case 'PROGRAM_MANAGER':
      return '🗂️';
    default:
      return '👤';
  }
}

export function getScoreBarColor(score: number) {
  if (score >= 80) return 'bg-success';
  if (score >= 60) return 'bg-accent';
  if (score >= 40) return 'bg-warning';
  return 'bg-muted';
}

export function getTierColor(tier: ServiceTier) {
  switch (tier) {
    case 'TIER_0':
      return 'text-warning';
    case 'TIER_1':
      return 'text-accent';
    case 'TIER_2':
      return 'text-success';
    default:
      return 'text-muted';
  }
}

export function getTierBgColor(tier: ServiceTier) {
  switch (tier) {
    case 'TIER_0':
      return 'bg-warning';
    case 'TIER_1':
      return 'bg-accent';
    case 'TIER_2':
      return 'bg-success';
    default:
      return 'bg-muted';
  }
}

export function getConfidenceLabel(confidence: number) {
  if (confidence >= 0.8) return 'High';
  if (confidence >= 0.6) return 'Medium';
  return 'Low';
}

export function getConfidenceColor(confidence: number) {
  if (confidence >= 0.8) return 'text-success';
  if (confidence >= 0.6) return 'text-accent';
  return 'text-warning';
}

export function formatPercentile(value: number) {
  const rounded = Math.round(value);
  const suffix =
    rounded % 100 >= 11 && rounded % 100 <= 13
      ? 'th'
      : rounded % 10 === 1
        ? 'st'
        : rounded % 10 === 2
          ? 'nd'
          : rounded % 10 === 3
            ? 'rd'
            : 'th';
  return `${rounded}${suffix}`;
}

export function getTrendIcon(direction: TrendDirection) {
  switch (direction) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    default:
      return '→';
  }
}

export function getTrendColor(direction: TrendDirection) {
  switch (direction) {
    case 'up':
      return 'text-success';
    case 'down':
      return 'text-warning';
    default:
      return 'text-muted';
  }
}
