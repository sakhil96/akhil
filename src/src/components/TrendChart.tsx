'use client';

import type { HistoricalTrend } from '@/types';
import { cn, getScoreBarColor } from '@/lib/utils';

interface TrendChartProps {
  trends: HistoricalTrend[];
  dimensions: string[];
  labels: Record<string, string>;
}

export function TrendChart({ trends, dimensions, labels }: TrendChartProps) {
  if (trends.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        No historical data available yet
      </div>
    );
  }

  const maxValue = 100;
  const chartHeight = 160;

  return (
    <div className="bg-surface-secondary rounded-xl border border-surface-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">
        Trends (12 Months)
      </h3>

      <div className="space-y-6">
        {dimensions.map((dimension) => {
          const values = trends.map((t) => t[dimension] as number);
          const firstValue = values[0];
          const lastValue = values[values.length - 1];
          const delta = lastValue - firstValue;
          const trend = delta > 2 ? 'up' : delta < -2 ? 'down' : 'stable';

          return (
            <div key={dimension} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">
                  {labels[dimension]}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      trend === 'up'
                        ? 'text-accent-green'
                        : trend === 'down'
                        ? 'text-accent-coral'
                        : 'text-text-muted'
                    )}
                  >
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}{' '}
                    {delta > 0 ? '+' : ''}
                    {delta} pts
                  </span>
                </div>
              </div>

              {/* Mini chart */}
              <div className="flex items-end gap-1 h-8">
                {values.map((value, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className={cn(
                        'w-full rounded-sm transition-all duration-300',
                        getScoreBarColor(value),
                        'group-hover:opacity-100',
                        idx === values.length - 1 ? 'opacity-100' : 'opacity-40'
                      )}
                      style={{
                        height: `${(value / maxValue) * 32}px`,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Period labels */}
              <div className="flex justify-between mt-1">
                {trends.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] text-text-muted"
                  >
                    {t.period.replace('-2024', '')}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

