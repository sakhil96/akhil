import { ContactSection, SiteFooter } from '@/components/ContactSection';
import { Hero } from '@/components/Hero';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { WorkBento } from '@/components/WorkBento';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WorkBento />
      <ProjectShowcase />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
