'use client';

import type { Person, Score } from '@/types';
import { cn, getRoleLabel, getScoreBarColor } from '@/lib/utils';
import Link from 'next/link';
import { ScoreBar } from './ScoreBar';

interface PersonCardProps {
  person: Person;
  score?: Score;
  compact?: boolean;
}

export function PersonCard({ person, score, compact = false }: PersonCardProps) {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const getDimensionKeys = () => {
    if (!score) return [];
    if (score.roleType === 'IC_ENGINEER') {
      return [
        { key: 'technicalImpact', label: 'Technical', color: 'from-accent-primary to-accent-secondary' },
        { key: 'reliabilityCraft', label: 'Reliability', color: 'from-accent-info to-accent-success' },
        { key: 'velocityConsistency', label: 'Velocity', color: 'from-accent-warning to-accent-gold' },
        { key: 'collaborationInfluence', label: 'Collab', color: 'from-accent-rose to-accent-primary' },
      ];
    }
    if (score.roleType === 'ENGINEERING_MANAGER') {
      return [
        { key: 'teamHealthRetention', label: 'Health', color: 'from-accent-success to-accent-info' },
        { key: 'deliveryReliability', label: 'Delivery', color: 'from-accent-primary to-accent-secondary' },
        { key: 'operationalExcellence', label: 'Ops', color: 'from-accent-warning to-accent-gold' },
        { key: 'talentGrowthDelegation', label: 'Growth', color: 'from-accent-rose to-accent-primary' },
      ];
    }
    return [
      { key: 'businessProductOutcomes', label: 'Outcomes', color: 'from-accent-success to-accent-info' },
      { key: 'executionCoordination', label: 'Execution', color: 'from-accent-primary to-accent-secondary' },
      { key: 'customerStakeholderSatisfaction', label: 'Satisfaction', color: 'from-accent-warning to-accent-gold' },
      { key: 'documentationClarity', label: 'Clarity', color: 'from-accent-rose to-accent-primary' },
    ];
  };

  // Generate gradient based on initials for variety
  const getGradient = () => {
    const gradients = [
      'from-accent-primary via-accent-secondary to-accent-info',
      'from-accent-secondary via-accent-rose to-accent-primary',
      'from-accent-info via-accent-success to-accent-primary',
      'from-accent-rose via-accent-warning to-accent-gold',
      'from-accent-success via-accent-info to-accent-secondary',
    ];
    const index = person.name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  if (compact) {
    return (
      <Link
        href={`/people/${person.id}`}
        className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-secondary/80 hover:bg-surface-tertiary border border-surface-border/50 hover:border-accent-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/5"
      >
        <div className="relative">
          <div className={cn(
            'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-semibold text-sm shadow-lg transition-transform duration-300 group-hover:scale-105',
            getGradient()
          )}>
            {initials}
          </div>
          {person.isRamping && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-warning rounded-full border-2 border-surface-secondary flex items-center justify-center">
              <span className="text-[8px]">⚡</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-text-primary truncate group-hover:text-accent-primary transition-colors">
            {person.name}
          </div>
          <div className="text-xs text-text-muted truncate flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded-md bg-surface-tertiary text-text-secondary text-[10px] font-medium">
              {person.level}
            </span>
            <span>{getRoleLabel(person.roleType)}</span>
          </div>
        </div>
        {score && (
          <div className="flex items-center gap-1">
            <div className="text-right">
              <div className="text-lg font-bold text-text-primary">
                {Math.round((score.dimensions.technicalImpact?.score || score.dimensions.teamHealthRetention?.score || score.dimensions.businessProductOutcomes?.score || 0))}
              </div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider">Score</div>
            </div>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/people/${person.id}`}
      className="group block premium-card rounded-2xl overflow-hidden"
    >
      {/* Gradient Top Bar */}
      <div className={cn('h-1 bg-gradient-to-r', getGradient())} />
      
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className={cn(
              'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl',
              getGradient()
            )}>
              {initials}
            </div>
            <div className={cn(
              'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300',
              getGradient()
            )} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-text-primary truncate group-hover:text-accent-primary transition-colors">
                {person.name}
              </h3>
              {person.isRamping && (
                <span className="badge-warning text-[10px] px-2 py-0.5 rounded-full font-medium">
                  ⚡ Ramping
                </span>
              )}
            </div>
            <div className="text-sm text-text-secondary truncate mb-2">
              {person.title}
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-1 rounded-lg bg-surface-tertiary text-text-secondary font-medium">
                {person.level}
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-text-muted">{person.tenure}</span>
            </div>
          </div>
        </div>

        {/* Score preview */}
        {score && (
          <div className="mt-6 pt-5 border-t border-surface-border/50 space-y-3">
            {getDimensionKeys().map(({ key, label, color }) => {
              const dimension = score.dimensions[key];
              if (!dimension) return null;
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-xs text-text-muted w-20 truncate font-medium">
                    {label}
                  </span>
                  <div className="flex-1 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-500', color)}
                      style={{ width: `${dimension.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-text-primary tabular-nums w-8 text-right">
                    {Math.round(dimension.score)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary teaser */}
      {score?.summary && (
        <div className="px-6 pb-5">
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {score.summary}
          </p>
        </div>
      )}

      {/* Hover indicator */}
      <div className="px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-accent-primary font-medium">View Profile →</span>
      </div>
    </Link>
  );
}
