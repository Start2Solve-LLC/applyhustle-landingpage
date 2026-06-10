import { LandingPageContent } from '@/components/LandingPageContent';

/* Server shell — metadata lives in layout.tsx; the page itself is interactive
   (region toggle, live mocks, scroll animations) so it renders as one client tree. */
export default function LandingPage() {
  return <LandingPageContent />;
}
