'use client';

import { cn, formatPercentile, getTrendIcon, getTrendColor, getScoreBarColor } from '@/lib/utils';
import type { DimensionScore, ScoreDisplayConfig } from '@/types';
import { ScoreBar } from './ScoreBar';
import { useState } from 'react';

interface ScoreCardProps {
  config: ScoreDisplayConfig;
  dimension: DimensionScore;
  expanded?: boolean;
  onToggle?: () => void;
}

export function ScoreCard({ config, dimension, expanded = false, onToggle }: ScoreCardProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  };

  const trendIcon = getTrendIcon(dimension.trend);
  const trendColor = getTrendColor(dimension.trend);

  return (
    <div
      className={cn(
        'bg-surface-secondary rounded-xl border border-surface-border overflow-hidden transition-all duration-300',
        isExpanded && 'ring-1 ring-accent-blue/30'
      )}
    >
      {/* Header - Always visible */}
      <button
        onClick={handleToggle}
        className="w-full p-5 text-left hover:bg-surface-tertiary/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-text-primary font-semibold truncate">
                {config.label}
              </h3>
              {dimension.isBelowAverage && (
                <span className="text-xs px-2 py-0.5 bg-accent-gold/20 text-accent-gold rounded-full">
                  Growth Area
                </span>
              )}
            </div>
            <p className="text-text-muted text-sm">{config.description}</p>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  'text-3xl font-bold tabular-nums',
                  getScoreBarColor(dimension.score).replace('bg-', 'text-')
                )}
              >
                {Math.round(dimension.score)}
              </span>
              <span className="text-text-muted text-sm">/100</span>
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="text-text-secondary text-xs">
                {formatPercentile(dimension.percentile)} %ile
              </span>
              <span className={cn('text-xs font-medium', trendColor)}>
                {trendIcon} {dimension.trendDelta > 0 ? '+' : ''}
                {dimension.trendDelta}
              </span>
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div className="mt-4">
          <ScoreBar score={dimension.score} size="md" showValue={false} />
        </div>
      </button>

      {/* Expanded Metrics */}
      {isExpanded && dimension.metrics && (
        <div className="px-5 pb-5 border-t border-surface-border pt-4 animate-fade-in">
          <h4 className="text-xs uppercase tracking-wider text-text-muted mb-3">
            Contributing Metrics
          </h4>
          <div className="space-y-3">
            {Object.entries(dimension.metrics).map(([key, metric]) => (
              <div key={key} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted">
                      You: <span className="text-text-primary">{metric.value}</span>
                    </span>
                    <span className="text-xs text-text-muted">
                      Peers: {metric.peerMedian}
                    </span>
                    <span className="text-xs text-text-secondary font-medium tabular-nums">
                      {Math.round(metric.score)}
                    </span>
                  </div>
                </div>
                <ScoreBar score={metric.score} size="sm" showValue={false} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

