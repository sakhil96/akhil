'use client';

import type { Service } from '@/types';
import { cn, getTierColor, getTierBgColor, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const tierLabel = service.tier.replace('TIER_', 'Tier ');

  const getTierGradient = () => {
    switch (service.tier) {
      case 'TIER_0':
        return 'from-accent-danger via-accent-rose to-accent-warning';
      case 'TIER_1':
        return 'from-accent-warning via-accent-gold to-accent-lime';
      default:
        return 'from-accent-info via-accent-primary to-accent-secondary';
    }
  };

  const getTierBadgeStyle = () => {
    switch (service.tier) {
      case 'TIER_0':
        return 'badge-danger';
      case 'TIER_1':
        return 'badge-warning';
      default:
        return 'badge-primary';
    }
  };

  if (compact) {
    return (
      <Link
        href={`/services/${service.id}`}
        className="group block premium-card rounded-xl p-4 hover:shadow-lg hover:shadow-accent-primary/5 transition-all"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
            {service.name}
          </span>
          <span className={cn('text-xs px-2 py-1 rounded-lg font-semibold', getTierBadgeStyle())}>
            {tierLabel}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className={cn(
              'w-2 h-2 rounded-full',
              service.currentSloAdherence >= service.targetSlo ? 'bg-accent-success' : 'bg-accent-danger'
            )} />
            <span className="text-text-muted">SLO:</span>
            <span className={cn(
              'font-semibold',
              service.currentSloAdherence >= service.targetSlo ? 'text-accent-success' : 'text-accent-danger'
            )}>
              {service.currentSloAdherence}%
            </span>
          </div>
          <div className="text-text-muted">
            Err: <span className="text-text-secondary font-medium">{service.errorRate}%</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group premium-card rounded-2xl overflow-hidden">
      {/* Gradient Top Bar */}
      <div className={cn('h-1.5 bg-gradient-to-r', getTierGradient())} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-mono text-lg font-bold text-text-primary">
                {service.name}
              </h3>
              <span className={cn('text-xs px-2.5 py-1 rounded-lg font-bold', getTierBadgeStyle())}>
                {tierLabel}
              </span>
              {service.isSecuritySensitive && (
                <span className="badge-danger text-xs px-2 py-1 rounded-lg font-medium">
                  🔒 Security
                </span>
              )}
            </div>
            <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
          </div>
        </div>

        {/* Service Health Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-surface-tertiary/50 rounded-xl p-4 border border-surface-border/30">
            <div className="text-[10px] text-text-muted mb-1 uppercase tracking-wider font-medium">SLO Status</div>
            <div className="flex items-baseline gap-1">
              <span className={cn(
                'text-2xl font-bold',
                service.currentSloAdherence >= service.targetSlo ? 'text-accent-success' : 'text-accent-danger'
              )}>
                {service.currentSloAdherence}%
              </span>
            </div>
            <div className="text-[10px] text-text-muted mt-1">
              target: {service.targetSlo}%
            </div>
          </div>

          <div className="bg-surface-tertiary/50 rounded-xl p-4 border border-surface-border/30">
            <div className="text-[10px] text-text-muted mb-1 uppercase tracking-wider font-medium">Traffic</div>
            <div className="text-2xl font-bold text-text-primary">
              {service.monthlyTrafficMillions >= 1000
                ? `${(service.monthlyTrafficMillions / 1000).toFixed(1)}B`
                : `${service.monthlyTrafficMillions}M`}
            </div>
            <div className="text-[10px] text-text-muted mt-1">req/month</div>
          </div>

          <div className="bg-surface-tertiary/50 rounded-xl p-4 border border-surface-border/30">
            <div className="text-[10px] text-text-muted mb-1 uppercase tracking-wider font-medium">Error Rate</div>
            <div className="text-2xl font-bold text-text-primary">
              {service.errorRate}%
            </div>
            <div className="text-[10px] text-text-muted mt-1">current</div>
          </div>

          <div className="bg-surface-tertiary/50 rounded-xl p-4 border border-surface-border/30">
            <div className="text-[10px] text-text-muted mb-1 uppercase tracking-wider font-medium">Latency</div>
            <div className="text-2xl font-bold text-text-primary">
              {service.latencyP99Ms}<span className="text-sm font-normal text-text-muted">ms</span>
            </div>
            <div className="text-[10px] text-text-muted mt-1">p99</div>
          </div>
        </div>

        {/* Complexity & Last Incident */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-tertiary/30 rounded-xl p-5 border border-surface-border/30">
            <div className="text-[10px] uppercase tracking-wider text-text-muted mb-4 font-semibold flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent-primary" />
              Complexity & Risk
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Criticality</span>
                <span className="font-semibold text-text-primary">
                  {service.criticalityScore}/100
                </span>
              </div>
              <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent-warning to-accent-danger rounded-full"
                  style={{ width: `${service.criticalityScore}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Dependencies</span>
                <span className="font-semibold text-text-primary">
                  {service.dependencyCount} services
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Complexity</span>
                <span className="font-semibold text-text-primary">
                  {service.complexityScore}/100
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-tertiary/30 rounded-xl p-5 border border-surface-border/30">
            <div className="text-[10px] uppercase tracking-wider text-text-muted mb-4 font-semibold flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent-warning" />
              Last Incident
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">When</span>
                <span className="text-text-primary font-medium">
                  {formatRelativeTime(service.lastIncidentDate)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Severity</span>
                <span
                  className={cn(
                    'font-semibold px-2 py-0.5 rounded-md text-xs',
                    service.lastIncidentSeverity === 'SEV-1'
                      ? 'badge-danger'
                      : service.lastIncidentSeverity === 'SEV-2'
                      ? 'badge-warning'
                      : 'badge-primary'
                  )}
                >
                  {service.lastIncidentSeverity}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">MTTR</span>
                <span className="text-text-primary font-semibold">
                  {service.lastIncidentMttrMinutes} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-border/50 px-6 py-4 bg-surface-tertiary/20">
        <Link
          href={`/services/${service.id}`}
          className="text-sm text-accent-primary hover:text-accent-primary/80 flex items-center gap-2 font-medium group-hover:gap-3 transition-all"
        >
          View service details
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
