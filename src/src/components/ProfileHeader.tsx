'use client';

import type { Person, Team, Score } from '@/types';
import { cn, getConfidenceLabel, getConfidenceColor, getRoleLabel } from '@/lib/utils';
import Link from 'next/link';

interface ProfileHeaderProps {
  person: Person;
  team?: Team;
  manager?: Person;
  score?: Score;
}

export function ProfileHeader({ person, team, manager, score }: ProfileHeaderProps) {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-surface-secondary rounded-2xl border border-surface-border overflow-hidden">
      {/* Background gradient */}
      <div className="h-24 bg-gradient-to-r from-accent-blue/20 via-accent-purple/10 to-accent-teal/20 relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-12 mb-4">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-accent-blue/20 border-4 border-surface-secondary">
            {initials}
          </div>
          {person.isRamping && (
            <div className="absolute -bottom-1 -right-1 px-2 py-1 bg-accent-gold text-surface-primary text-[10px] font-bold uppercase rounded-full">
              Ramping
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              {person.name}
            </h1>
            <p className="text-text-secondary mb-3">
              {person.title} ({person.level})
              {team && (
                <>
                  {' · '}
                  <Link
                    href={`/teams/${team.id}`}
                    className="text-accent-blue hover:underline"
                  >
                    {team.name}
                  </Link>
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                {person.location}
              </span>
              <span>Tenure: {person.tenure}</span>
              {manager && (
                <span>
                  Reports to:{' '}
                  <Link
                    href={`/people/${manager.id}`}
                    className="text-accent-blue hover:underline"
                  >
                    {manager.name}
                  </Link>
                </span>
              )}
            </div>
          </div>

          {/* Score summary */}
          {score && (
            <div className="flex flex-col items-start lg:items-end gap-2 bg-surface-tertiary rounded-xl p-4 lg:min-w-[280px]">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted">Period:</span>
                <span className="text-text-primary font-medium">{score.period}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted">Data Points:</span>
                <span className="text-text-primary font-medium">
                  {score.dataPointCount.toLocaleString()}
                </span>
                <span className="text-text-muted">from</span>
                <span className="text-text-primary font-medium">
                  {score.sourceCount} sources
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted">Confidence:</span>
                <span
                  className={cn(
                    'font-semibold',
                    getConfidenceColor(score.overallConfidence)
                  )}
                >
                  {getConfidenceLabel(score.overallConfidence)} (
                  {(score.overallConfidence * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="text-xs text-text-muted mt-1">
                Algorithm v{score.algorithmVersion}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

