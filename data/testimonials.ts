/* Quotes mirror frontend/src/components/marketing/sections/Testimonials.tsx —
   the app's own published marketing testimonials. */

export interface Testimonial {
  name: string;
  initials: string;
  role: string;
  quote: string;
}

export interface TestimonialsSectionContent {
  eyebrow: string;
  title: { pre: string; accent: string };
  testimonials: Testimonial[];
}

export const testimonialsSection: TestimonialsSectionContent = {
  eyebrow: 'Loved by job seekers',
  title: { pre: 'They stopped ', accent: 'ghosting the process' },
  testimonials: [
    {
      name: 'Kanchan K.',
      initials: 'K',
      role: 'Healthcare Data Scientist',
      quote:
        'Offers finally moved after ApplyHustle resurfaced ATS gaps I never saw. My résumé finally matched recruiter keyword stacks.',
    },
    {
      name: 'Aryan G.',
      initials: 'AG',
      role: 'Software Engineer · security unicorn',
      quote: 'My interview pipeline went from chaos to predictable. Seeing every touchpoint beats fifty browser tabs.',
    },
    {
      name: 'Priya R.',
      initials: 'PR',
      role: 'Frontend Engineer · fintech',
      quote:
        'Premium Auto-Apply handled the brute force while I white-glove prepped for onsites. Totally different energy walking in.',
    },
  ],
};
