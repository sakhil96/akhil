'use client';

import type { Score } from '@/types';
import { cn, getConfidenceLabel, getConfidenceColor } from '@/lib/utils';

interface SummaryCardProps {
  score: Score;
}

export function SummaryCard({ score }: SummaryCardProps) {
  return (
    <div className="bg-gradient-to-br from-surface-secondary to-surface-tertiary rounded-2xl border border-surface-border p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center">
            <span className="text-accent-blue">✨</span>
          </div>
          <h2 className="text-lg font-semibold text-text-primary">
            Impact Summary
          </h2>
          <span className="text-xs text-text-muted ml-auto">{score.period}</span>
        </div>

        <blockquote className="text-text-secondary leading-relaxed mb-4 text-[15px]">
          &ldquo;{score.summary}&rdquo;
        </blockquote>

        <div className="flex items-center justify-between pt-4 border-t border-surface-border">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-text-muted">
              <span className="text-accent-blue">📊</span>
              Based on{' '}
              <span className="text-text-primary font-medium">
                {score.dataPointCount.toLocaleString()}
              </span>{' '}
              data points from{' '}
              <span className="text-text-primary font-medium">
                {score.sourceCount}
              </span>{' '}
              sources
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Confidence:</span>
            <span
              className={cn(
                'text-sm font-semibold',
                getConfidenceColor(score.overallConfidence)
              )}
            >
              {getConfidenceLabel(score.overallConfidence)}
            </span>
          </div>
        </div>

        <button className="mt-4 text-sm text-accent-blue hover:text-accent-blue/80 flex items-center gap-1 transition-colors">
          <span>🔍</span>
          See what data contributed to this summary
        </button>
      </div>
    </div>
  );
}

