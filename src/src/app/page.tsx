import { ContactSection } from '@/components/contact/ContactSection';
import { Hero } from '@/components/hero/Hero';
import { PracticeBento } from '@/components/practice/PracticeBento';
import { CaseStudyGrid } from '@/components/work/CaseStudyGrid';
import { ProjectShowcase } from '@/components/work/ProjectShowcase';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PracticeBento />
      <ProjectShowcase />
      <CaseStudyGrid />
      <ContactSection />
    </main>
  );
}
