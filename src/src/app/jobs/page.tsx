import { JobPortal } from '@/components/JobPortal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Portal — Akhil Adapala',
  description:
    'Track job applications, get resume notifications, tailor your resume to each job description, and apply with human-sounding cover letters.',
};

export default function JobsPage() {
  return <JobPortal />;
}
