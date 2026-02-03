'use client';

import type { DataSourceSummary } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

interface DataSourceCardProps {
  dataSources: DataSourceSummary;
}

export function DataSourceCard({ dataSources }: DataSourceCardProps) {
  return (
    <div className="bg-surface-secondary rounded-xl border border-surface-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Data Sources
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GitHub */}
        {dataSources.github && (
          <div className="bg-surface-tertiary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center">
                <svg className="w-5 h-5 text-text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <span className="font-medium text-text-primary">GitHub</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">PRs Authored</span>
                <span className="text-text-primary font-medium">
                  {dataSources.github.prsAuthored}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Reviews Given</span>
                <span className="text-text-primary font-medium">
                  {dataSources.github.reviewsGiven}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Repos Touched</span>
                <span className="text-text-primary font-medium">
                  {dataSources.github.reposTouched}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border">
              <span className="text-xs text-text-muted">
                Last sync: {formatRelativeTime(dataSources.github.lastSync)}
              </span>
            </div>
          </div>
        )}

        {/* Jira */}
        {dataSources.jira && (
          <div className="bg-surface-tertiary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-blue" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.486a.972.972 0 00-1.004-.973zM5.232 5.279H16.8a5.217 5.217 0 00-5.23-5.216h-2.13V-1.99A5.214 5.214 0 004.228 3.22v11.513a.972.972 0 001.004.973V5.279z" />
                </svg>
              </div>
              <span className="font-medium text-text-primary">Jira</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Stories Done</span>
                <span className="text-text-primary font-medium">
                  {dataSources.jira.storiesCompleted}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Bugs Fixed</span>
                <span className="text-text-primary font-medium">
                  {dataSources.jira.bugsFixed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Tech Debt Items</span>
                <span className="text-text-primary font-medium">
                  {dataSources.jira.techDebtItems}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border">
              <span className="text-xs text-text-muted">
                Last sync: {formatRelativeTime(dataSources.jira.lastSync)}
              </span>
            </div>
          </div>
        )}

        {/* Datadog */}
        {dataSources.datadog && (
          <div className="bg-surface-tertiary rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.045 0L.729 3.584v12.727l2.39.915V6.078l7.453 2.857.045-.009 7.499-2.857v11.14l-7.499 2.866-5.063-1.937V7.227l5.063 1.937V6.078L.729 3.584 12.045 0zm.045 9.22l-5.063-1.937v11.14l5.063 1.937V9.22zm7.499-2.857v11.14l2.39-.915V3.584l-2.39.779z" />
                </svg>
              </div>
              <span className="font-medium text-text-primary">Datadog</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Services Owned</span>
                <span className="text-text-primary font-medium">
                  {dataSources.datadog.servicesOwned}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">SLO Adherence</span>
                <span className="text-accent-green font-medium">
                  {dataSources.datadog.sloAdherence}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Incidents (resp)</span>
                <span className="text-text-primary font-medium">
                  {dataSources.datadog.incidentsResponded}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border">
              <span className="text-xs text-text-muted">
                Last sync: {formatRelativeTime(dataSources.datadog.lastSync)}
              </span>
            </div>
          </div>
        )}
      </div>

      <button className="mt-4 text-sm text-accent-blue hover:text-accent-blue/80 flex items-center gap-1 transition-colors">
        View all data details →
      </button>
    </div>
  );
}

