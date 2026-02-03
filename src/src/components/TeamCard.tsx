'use client';

import type { Team, Person, Score } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TeamCardProps {
  team: Team;
  manager?: Person;
  memberScores?: Score[];
}

export function TeamCard({ team, manager, memberScores = [] }: TeamCardProps) {
  // Calculate team score distributions
  const engineerScores = memberScores.filter((s) => s.roleType === 'IC_ENGINEER');
  
  const getDimensionStats = (dimension: string) => {
    const values = engineerScores
      .filter((s) => s.dimensions[dimension])
      .map((s) => s.dimensions[dimension].score);
    
    if (values.length === 0) return { median: 0, min: 0, max: 0 };
    
    const sorted = [...values].sort((a, b) => a - b);
    return {
      median: sorted[Math.floor(sorted.length / 2)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  };

  const dimensions = [
    { key: 'technicalImpact', label: 'Technical', color: 'from-accent-primary to-accent-secondary' },
    { key: 'reliabilityCraft', label: 'Reliability', color: 'from-accent-info to-accent-success' },
    { key: 'velocityConsistency', label: 'Velocity', color: 'from-accent-warning to-accent-gold' },
    { key: 'collaborationInfluence', label: 'Collaboration', color: 'from-accent-rose to-accent-primary' },
  ];

  // Calculate overall team health
  const avgScore = engineerScores.length > 0 
    ? Math.round(engineerScores.reduce((sum, s) => {
        const dims = Object.values(s.dimensions);
        const avg = dims.reduce((a, d) => a + d.score, 0) / dims.length;
        return sum + avg;
      }, 0) / engineerScores.length)
    : 0;

  return (
    <Link
      href={`/teams/${team.id}`}
      className="group block premium-card rounded-2xl overflow-hidden"
    >
      {/* Gradient Header */}
      <div className="relative h-24 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-transparent p-5">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="relative flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
              {team.name}
            </h3>
            <p className="text-sm text-text-muted line-clamp-1 mt-1">
              {team.description}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-3xl font-bold gradient-text">
              {team.memberIds.length}
            </div>
            <div className="text-[10px] text-text-muted uppercase tracking-wider font-medium">Members</div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Manager */}
        {manager && (
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-surface-border/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-secondary to-accent-primary flex items-center justify-center text-white font-semibold text-sm">
              {manager.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">{manager.name}</div>
              <div className="text-xs text-text-muted">Manager</div>
            </div>
            {avgScore > 0 && (
              <div className="ml-auto">
                <div className="text-2xl font-bold text-text-primary">{avgScore}</div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Avg Score</div>
              </div>
            )}
          </div>
        )}

        {/* Score Distribution Mini View */}
        {engineerScores.length > 0 && (
          <div className="space-y-3">
            {dimensions.map(({ key, label, color }) => {
              const stats = getDimensionStats(key);
              return (
                <div key={key} className="group/row">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-text-muted font-medium">
                      {label}
                    </span>
                    <span className="text-xs text-text-secondary tabular-nums">
                      {Math.round(stats.median)}
                    </span>
                  </div>
                  <div className="h-2 bg-surface-tertiary rounded-full relative overflow-hidden">
                    {/* Range bar */}
                    <div
                      className="absolute h-full bg-surface-elevated/80 rounded-full transition-all"
                      style={{
                        left: `${stats.min}%`,
                        width: `${Math.max(stats.max - stats.min, 2)}%`,
                      }}
                    />
                    {/* Median indicator with gradient */}
                    <div
                      className={cn('absolute h-full w-1 rounded-full bg-gradient-to-b transition-all', color)}
                      style={{ left: `${stats.median}%` }}
                    />
                    {/* Individual dots */}
                    {engineerScores.map((s, idx) => {
                      const dim = s.dimensions[key];
                      if (!dim) return null;
                      return (
                        <div
                          key={idx}
                          className={cn(
                            'absolute w-2 h-2 rounded-full -translate-x-1/2 top-0 border border-surface-secondary transition-transform group-hover/row:scale-125',
                            `bg-gradient-to-br ${color}`
                          )}
                          style={{ left: `${dim.score}%` }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Services Count */}
        {team.serviceIds.length > 0 && (
          <div className="mt-5 pt-4 border-t border-surface-border/50 flex items-center justify-between">
            <span className="text-xs text-text-muted font-medium">
              Services Owned
            </span>
            <span className="badge-primary text-xs px-2 py-1 rounded-lg font-medium">
              {team.serviceIds.length} services
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      {team.openReqs > 0 && (
        <div className="px-5 py-3 bg-accent-primary/5 border-t border-accent-primary/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-xs text-accent-primary font-semibold">
              {team.openReqs} Open Positions
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
