'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { SectionHeading } from '@/components/SectionHeading';
import {
  addJob,
  applyToJob,
  deleteJob,
  getStatusLabel,
  getUnreadCount,
  loadState,
  markAllNotificationsRead,
  markNotificationRead,
  saveState,
  simulateRecruiterUpdate,
  tailorJobResume,
  type Job,
  type JobPortalState,
  type JobStatus,
  type Notification,
} from '@/lib/jobs-store';

const STATUS_TONE: Record<
  JobStatus,
  'accent' | 'muted' | 'success' | 'warning'
> = {
  saved: 'muted',
  applied: 'accent',
  viewed: 'accent',
  shortlisted: 'success',
  interview: 'success',
  rejected: 'warning',
  offer: 'success',
};

const EMPTY_FORM = {
  title: '',
  company: '',
  location: '',
  url: '',
  description: '',
};

function formatWhen(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="stack-sm">
      <div className="row-between">
        <span className="label">{label}</span>
        <button type="button" className="btn-link" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="job-text-block">{value}</pre>
    </div>
  );
}

export function JobPortal() {
  const [state, setState] = useState<JobPortalState>({ jobs: [], notifications: [] });
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'apply'>('overview');
  const [filter, setFilter] = useState<'all' | JobStatus>('all');

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    if (loaded.jobs[0]) {
      setSelectedJobId(loaded.jobs[0].id);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      saveState(state);
    }
  }, [state, ready]);

  const selectedJob = useMemo(
    () => state.jobs.find((job) => job.id === selectedJobId) ?? null,
    [state.jobs, selectedJobId],
  );

  const filteredJobs = useMemo(() => {
    if (filter === 'all') {
      return state.jobs;
    }
    return state.jobs.filter((job) => job.status === filter);
  }, [state.jobs, filter]);

  const unread = getUnreadCount(state);

  const update = (next: JobPortalState) => setState(next);

  const handleAddJob = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.description.trim()) {
      return;
    }

    const next = addJob(state, form);
    update(next);
    setSelectedJobId(next.jobs[0]?.id ?? null);
    setForm(EMPTY_FORM);
    setActiveTab('overview');
  };

  const stats = [
    { label: 'Tracked jobs', value: String(state.jobs.length) },
    { label: 'Applied', value: String(state.jobs.filter((job) => job.status !== 'saved').length) },
    { label: 'Unread alerts', value: String(unread) },
    {
      label: 'Avg match',
      value:
        state.jobs.filter((job) => job.tailoredResume).length === 0
          ? '—'
          : `${Math.round(
              state.jobs
                .filter((job) => job.tailoredResume)
                .reduce((sum, job) => sum + (job.tailoredResume?.matchScore ?? 0), 0) /
                state.jobs.filter((job) => job.tailoredResume).length,
            )}%`,
    },
  ];

  if (!ready) {
    return (
      <div className="page">
        <main className="container container-narrow">
          <p className="text-muted">Loading job portal…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="container container-wide">
        <section className="hero">
          <div className="hero-meta">
            <span className="pill">Apply smarter</span>
            <span>Resume alerts · Tailored docs · Human copy</span>
          </div>
          <div className="stack-md">
            <h1 className="hero-title">
              Job Portal
              <span className="text-gradient" style={{ display: 'block' }}>
                Track applications. Tailor resume. Apply like a person.
              </span>
            </h1>
            <p className="hero-body">
              Paste a job description, get a resume tuned to it, and copy cover letters that
              read like you wrote them — not a template bot.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="grid-4">
            {stats.map((item) => (
              <Card key={item.label} className="stack-sm">
                <span className="eyebrow">{item.label}</span>
                <span className="heading-md">{item.value}</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="job-layout">
          <div className="job-column stack-md">
            <Card>
              <SectionHeading
                eyebrow="Add job"
                title="New posting"
                description="Drop in the JD — we'll pull keywords and prep your materials."
              />
              <form className="stack-md" onSubmit={handleAddJob}>
                <label className="stack-sm">
                  <span className="label">Role title</span>
                  <input
                    className="job-input"
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    placeholder="Senior Software Engineer"
                    required
                  />
                </label>
                <label className="stack-sm">
                  <span className="label">Company</span>
                  <input
                    className="job-input"
                    value={form.company}
                    onChange={(event) => setForm({ ...form, company: event.target.value })}
                    placeholder="Acme Corp"
                    required
                  />
                </label>
                <div className="grid-2">
                  <label className="stack-sm">
                    <span className="label">Location</span>
                    <input
                      className="job-input"
                      value={form.location}
                      onChange={(event) => setForm({ ...form, location: event.target.value })}
                      placeholder="Remote / Hyderabad"
                    />
                  </label>
                  <label className="stack-sm">
                    <span className="label">Job URL</span>
                    <input
                      className="job-input"
                      value={form.url}
                      onChange={(event) => setForm({ ...form, url: event.target.value })}
                      placeholder="https://..."
                    />
                  </label>
                </div>
                <label className="stack-sm">
                  <span className="label">Job description</span>
                  <textarea
                    className="job-textarea"
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    placeholder="Paste the full job description here..."
                    rows={8}
                    required
                  />
                </label>
                <button type="submit" className="btn btn--primary">
                  Save job
                </button>
              </form>
            </Card>

            <Card>
              <div className="row-between">
                <SectionHeading eyebrow="Inbox" title="Notifications" />
                {unread > 0 && (
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => update(markAllNotificationsRead(state))}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="notification-list">
                {state.notifications.length === 0 ? (
                  <p className="text-muted text-small">No notifications yet.</p>
                ) : (
                  state.notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      job={state.jobs.find((job) => job.id === notification.jobId)}
                      onOpen={() => {
                        update(markNotificationRead(state, notification.id));
                        setSelectedJobId(notification.jobId);
                      }}
                    />
                  ))
                )}
              </div>
            </Card>
          </div>

          <div className="job-column stack-md">
            <Card>
              <div className="row-between">
                <SectionHeading eyebrow="Pipeline" title="Your jobs" />
                <div className="job-filter-row">
                  {(['all', 'saved', 'applied', 'viewed', 'interview', 'offer'] as const).map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        className={`job-filter ${filter === item ? 'is-active' : ''}`}
                        onClick={() => setFilter(item)}
                      >
                        {item === 'all' ? 'All' : getStatusLabel(item)}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div className="job-list">
                {filteredJobs.length === 0 ? (
                  <p className="text-muted text-small">No jobs in this filter.</p>
                ) : (
                  filteredJobs.map((job) => (
                    <button
                      key={job.id}
                      type="button"
                      className={`job-list-item ${selectedJobId === job.id ? 'is-selected' : ''}`}
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setActiveTab('overview');
                      }}
                    >
                      <div className="row-between">
                        <div className="stack-sm align-left">
                          <strong>{job.title}</strong>
                          <span className="text-muted text-small">
                            {job.company}
                            {job.location ? ` · ${job.location}` : ''}
                          </span>
                        </div>
                        <Badge label={getStatusLabel(job.status)} tone={STATUS_TONE[job.status]} />
                      </div>
                      {job.tailoredResume && (
                        <span className="text-xsmall text-accent">
                          {job.tailoredResume.matchScore}% match
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </Card>

            {selectedJob ? (
              <Card className="stack-md">
                <div className="row-between">
                  <div className="stack-sm align-left">
                    <h2 className="heading-md">{selectedJob.title}</h2>
                    <p className="text-muted text-small">
                      {selectedJob.company}
                      {selectedJob.location ? ` · ${selectedJob.location}` : ''}
                    </p>
                  </div>
                  <Badge
                    label={getStatusLabel(selectedJob.status)}
                    tone={STATUS_TONE[selectedJob.status]}
                  />
                </div>

                <div className="job-tab-row">
                  {(['overview', 'resume', 'apply'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`job-tab ${activeTab === tab ? 'is-active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === 'overview' ? 'Overview' : tab === 'resume' ? 'Resume' : 'Apply'}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' && (
                  <div className="stack-md">
                    <p className="text-muted text-small">{selectedJob.description}</p>
                    {selectedJob.url && (
                      <a
                        href={selectedJob.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link text-small"
                      >
                        Open posting →
                      </a>
                    )}
                    <div className="cta-row">
                      <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() => update(tailorJobResume(state, selectedJob.id))}
                      >
                        Tailor resume
                      </button>
                      <button
                        type="button"
                        className="btn btn--ghost"
                        onClick={() => update(applyToJob(state, selectedJob.id))}
                      >
                        Mark applied
                      </button>
                      <button
                        type="button"
                        className="btn btn--ghost"
                        onClick={() => {
                          update(deleteJob(state, selectedJob.id));
                          setSelectedJobId(state.jobs.find((job) => job.id !== selectedJob.id)?.id ?? null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    {selectedJob.status === 'applied' && (
                      <div className="stack-sm">
                        <span className="label">Simulate recruiter updates</span>
                        <div className="cta-row">
                          {(['viewed', 'shortlisted', 'interview', 'rejected', 'offer'] as const).map(
                            (status) => (
                              <button
                                key={status}
                                type="button"
                                className="btn-link"
                                onClick={() =>
                                  update(simulateRecruiterUpdate(state, selectedJob.id, status))
                                }
                              >
                                {getStatusLabel(status)}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'resume' && (
                  <div className="stack-md">
                    {!selectedJob.tailoredResume ? (
                      <div className="stack-sm">
                        <p className="text-muted text-small">
                          No tailored resume yet. Hit “Tailor resume” to align your experience with
                          this JD.
                        </p>
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() => update(tailorJobResume(state, selectedJob.id))}
                        >
                          Generate tailored resume
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="row-between">
                          <Badge
                            label={`${selectedJob.tailoredResume.matchScore}% match`}
                            tone="success"
                          />
                          <span className="text-muted text-xsmall">
                            Updated {formatWhen(selectedJob.updatedAt)}
                          </span>
                        </div>
                        {selectedJob.tailoredResume.keywordsMatched.length > 0 && (
                          <div className="tag-row">
                            {selectedJob.tailoredResume.keywordsMatched.map((keyword) => (
                              <Badge key={keyword} label={keyword} tone="success" />
                            ))}
                          </div>
                        )}
                        {selectedJob.tailoredResume.keywordsMissing.length > 0 && (
                          <div className="stack-sm">
                            <span className="label">Gaps to address in interview prep</span>
                            <div className="tag-row">
                              {selectedJob.tailoredResume.keywordsMissing.map((keyword) => (
                                <Badge key={keyword} label={keyword} tone="warning" />
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedJob.resumeText && (
                          <CopyField label="Tailored resume" value={selectedJob.resumeText} />
                        )}
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'apply' && (
                  <div className="stack-md">
                    {!selectedJob.coverLetter ? (
                      <div className="stack-sm">
                        <p className="text-muted text-small">
                          Tailor the resume first — we’ll draft a cover letter and short apply
                          message in plain language.
                        </p>
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() => update(tailorJobResume(state, selectedJob.id))}
                        >
                          Prepare application
                        </button>
                      </div>
                    ) : (
                      <>
                        <CopyField label="Cover letter" value={selectedJob.coverLetter} />
                        {selectedJob.applicationMessage && (
                          <CopyField
                            label="Short apply message (email / portal)"
                            value={selectedJob.applicationMessage}
                          />
                        )}
                        {selectedJob.linkedInNote && (
                          <CopyField
                            label="LinkedIn note (300 chars)"
                            value={selectedJob.linkedInNote}
                          />
                        )}
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() => update(applyToJob(state, selectedJob.id))}
                        >
                          Mark applied & notify
                        </button>
                      </>
                    )}
                  </div>
                )}
              </Card>
            ) : (
              <Card>
                <p className="text-muted text-small">
                  Add a job or pick one from the list to tailor your resume and copy application
                  text.
                </p>
              </Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function NotificationItem({
  notification,
  job,
  onOpen,
}: {
  notification: Notification;
  job?: Job;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`notification-item ${notification.read ? '' : 'is-unread'}`}
      onClick={onOpen}
    >
      <div className="stack-sm align-left">
        <strong>{notification.title}</strong>
        <span className="text-muted text-small">{notification.message}</span>
        <span className="text-xsmall text-muted">
          {job ? `${job.company} · ` : ''}
          {formatWhen(notification.createdAt)}
        </span>
      </div>
    </button>
  );
}
