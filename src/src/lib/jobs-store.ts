import {
  generateApplicationMessage,
  generateCoverLetter,
  generateLinkedInNote,
} from '@/lib/cover-letter';
import { resumeToText, tailorResume, type TailoredResume } from '@/lib/resume';

export type JobStatus =
  | 'saved'
  | 'applied'
  | 'viewed'
  | 'shortlisted'
  | 'interview'
  | 'rejected'
  | 'offer';

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  status: JobStatus;
  createdAt: string;
  appliedAt?: string;
  updatedAt: string;
  tailoredResume?: TailoredResume;
  resumeText?: string;
  coverLetter?: string;
  applicationMessage?: string;
  linkedInNote?: string;
  notes?: string;
};

export type NotificationType =
  | 'application_sent'
  | 'resume_viewed'
  | 'shortlisted'
  | 'interview'
  | 'rejected'
  | 'offer'
  | 'reminder'
  | 'resume_tailored';

export type Notification = {
  id: string;
  jobId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type JobPortalState = {
  jobs: Job[];
  notifications: Notification[];
};

const STORAGE_KEY = 'akhil-job-portal-v1';

function nowIso(): string {
  return new Date().toISOString();
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmptyState(): JobPortalState {
  return { jobs: [], notifications: [] };
}

export function loadState(): JobPortalState {
  if (typeof window === 'undefined') {
    return createEmptyState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return seedDemoState();
    }
    return JSON.parse(raw) as JobPortalState;
  } catch {
    return createEmptyState();
  }
}

export function saveState(state: JobPortalState): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addNotification(
  state: JobPortalState,
  job: Job,
  type: NotificationType,
  title: string,
  message: string,
): JobPortalState {
  const notification: Notification = {
    id: createId('notif'),
    jobId: job.id,
    type,
    title,
    message,
    read: false,
    createdAt: nowIso(),
  };

  return {
    ...state,
    notifications: [notification, ...state.notifications],
  };
}

export function addJob(
  state: JobPortalState,
  input: Pick<Job, 'title' | 'company' | 'location' | 'url' | 'description'>,
): JobPortalState {
  const timestamp = nowIso();
  const job: Job = {
    id: createId('job'),
    title: input.title.trim(),
    company: input.company.trim(),
    location: input.location.trim(),
    url: input.url.trim(),
    description: input.description.trim(),
    status: 'saved',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return {
    ...state,
    jobs: [job, ...state.jobs],
  };
}

export function updateJob(
  state: JobPortalState,
  jobId: string,
  patch: Partial<Job>,
): JobPortalState {
  return {
    ...state,
    jobs: state.jobs.map((job) =>
      job.id === jobId
        ? { ...job, ...patch, updatedAt: nowIso() }
        : job,
    ),
  };
}

export function deleteJob(state: JobPortalState, jobId: string): JobPortalState {
  return {
    jobs: state.jobs.filter((job) => job.id !== jobId),
    notifications: state.notifications.filter((notification) => notification.jobId !== jobId),
  };
}

export function tailorJobResume(state: JobPortalState, jobId: string): JobPortalState {
  const job = state.jobs.find((item) => item.id === jobId);
  if (!job) {
    return state;
  }

  const tailoredResume = tailorResume(job.description, job.company, job.title);
  const resumeText = resumeToText(tailoredResume);
  const coverLetter = generateCoverLetter(
    tailoredResume,
    job.company,
    job.title,
    job.description,
  );
  const applicationMessage = generateApplicationMessage(
    tailoredResume,
    job.company,
    job.title,
  );
  const linkedInNote = generateLinkedInNote(tailoredResume, job.company, job.title);

  let next = updateJob(state, jobId, {
    tailoredResume,
    resumeText,
    coverLetter,
    applicationMessage,
    linkedInNote,
  });

  next = addNotification(
    next,
    job,
    'resume_tailored',
    `Resume tailored for ${job.title}`,
    `${tailoredResume.matchScore}% keyword match at ${job.company}. Cover letter and short apply message are ready.`,
  );

  return next;
}

export function applyToJob(state: JobPortalState, jobId: string): JobPortalState {
  const job = state.jobs.find((item) => item.id === jobId);
  if (!job) {
    return state;
  }

  let next = job.tailoredResume
    ? state
    : tailorJobResume(state, jobId);

  next = updateJob(next, jobId, {
    status: 'applied',
    appliedAt: nowIso(),
  });

  const updatedJob = next.jobs.find((item) => item.id === jobId)!;

  next = addNotification(
    next,
    updatedJob,
    'application_sent',
    `Applied to ${updatedJob.title}`,
    `Your application for ${updatedJob.title} at ${updatedJob.company} was marked as sent.`,
  );

  return next;
}

export function markNotificationRead(
  state: JobPortalState,
  notificationId: string,
): JobPortalState {
  return {
    ...state,
    notifications: state.notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification,
    ),
  };
}

export function markAllNotificationsRead(state: JobPortalState): JobPortalState {
  return {
    ...state,
    notifications: state.notifications.map((notification) => ({
      ...notification,
      read: true,
    })),
  };
}

export function simulateRecruiterUpdate(
  state: JobPortalState,
  jobId: string,
  status: Exclude<JobStatus, 'saved' | 'applied'>,
): JobPortalState {
  const job = state.jobs.find((item) => item.id === jobId);
  if (!job) {
    return state;
  }

  let next = updateJob(state, jobId, { status });
  const copy: Record<
    Exclude<JobStatus, 'saved' | 'applied'>,
    { type: NotificationType; title: string; message: string }
  > = {
    viewed: {
      type: 'resume_viewed',
      title: 'Recruiter viewed your resume',
      message: `${job.company} opened your resume for ${job.title}.`,
    },
    shortlisted: {
      type: 'shortlisted',
      title: 'Shortlisted',
      message: `You were shortlisted for ${job.title} at ${job.company}.`,
    },
    interview: {
      type: 'interview',
      title: 'Interview invite',
      message: `${job.company} wants to schedule an interview for ${job.title}.`,
    },
    rejected: {
      type: 'rejected',
      title: 'Application update',
      message: `${job.company} passed on ${job.title} for now. Worth keeping the tailored resume for similar roles.`,
    },
    offer: {
      type: 'offer',
      title: 'Offer received',
      message: `You received an offer for ${job.title} at ${job.company}.`,
    },
  };

  const payload = copy[status];
  next = addNotification(next, job, payload.type, payload.title, payload.message);
  return next;
}

export function getStatusLabel(status: JobStatus): string {
  const labels: Record<JobStatus, string> = {
    saved: 'Saved',
    applied: 'Applied',
    viewed: 'Resume viewed',
    shortlisted: 'Shortlisted',
    interview: 'Interview',
    rejected: 'Rejected',
    offer: 'Offer',
  };
  return labels[status];
}

export function getUnreadCount(state: JobPortalState): number {
  return state.notifications.filter((notification) => !notification.read).length;
}

function seedDemoState(): JobPortalState {
  const timestamp = nowIso();
  const demoJobs: Job[] = [
    {
      id: createId('job'),
      title: 'Senior Software Engineer, AI Platform',
      company: 'Stripe',
      location: 'Remote',
      url: 'https://stripe.com/jobs',
      description:
        'We are looking for a senior engineer to build AI inference platforms on Kubernetes. You will work with Java, TypeScript, GCP, and MLOps pipelines. Experience with real-time scoring, observability, and platform tooling is required. 5+ years experience.',
      status: 'viewed',
      createdAt: timestamp,
      appliedAt: timestamp,
      updatedAt: timestamp,
    },
    {
      id: createId('job'),
      title: 'Staff Engineer, Payments Risk',
      company: 'Coinbase',
      location: 'Hybrid — Bangalore',
      url: 'https://www.coinbase.com/careers',
      description:
        'Lead backend services for risk and fraud detection. Strong Java and Spring Boot skills. Experience with distributed systems, SQL, and cloud-native deployments on AWS or GCP. Product-minded engineers preferred.',
      status: 'saved',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  ];

  let state: JobPortalState = { jobs: demoJobs, notifications: [] };
  state = tailorJobResume(state, demoJobs[0].id);
  state = applyToJob(state, demoJobs[0].id);
  state = simulateRecruiterUpdate(state, demoJobs[0].id, 'viewed');

  return state;
}
