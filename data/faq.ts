export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSectionContent {
  title: string;
  entries: FaqEntry[];
}

/* Q&A mirrors frontend/src/components/marketing/sections/Faq.tsx. */
export const faqSection: FaqSectionContent = {
  title: 'Frequently asked questions',
  entries: [
    {
      id: 'auto-apply-vs-guided',
      question: 'What is the difference between Auto-Apply (US) and guided applying?',
      answer:
        'Autonomous Auto-Apply (US Premium) submits tailored applications at volume on your behalf with guardrails. In other regions and tiers you get guided applying — AI prepares everything and you click submit, staying fully in control.',
    },
    {
      id: 'ats-checker',
      question: 'How does the ATS Score Checker work?',
      answer:
        'Our AI analyzes your résumé against any job description and gives an instant 0–100 compatibility score, highlighting the exact keywords and skills to add to pass Applicant Tracking Systems.',
    },
    {
      id: 'free-tier',
      question: 'Is ApplyHustle free to start?',
      answer:
        'Yes. The free tier includes the ATS Checker, résumé parsing, and the application tracker — no credit card required.',
    },
    {
      id: 'international',
      question: 'Does it work for international job seekers?',
      answer:
        'Absolutely. ApplyHustle works for candidates in the US, UK, India, Canada, Australia, Europe and beyond, with sponsorship-aware job intel.',
    },
    {
      id: 'time-to-results',
      question: 'How long until I see results?',
      answer:
        'Most consistent users start getting interview calls within 30–60 days thanks to better-targeted, ATS-optimized applications.',
    },
    {
      id: 'installation',
      question: 'Do I need to install anything?',
      answer: 'No. ApplyHustle is 100% web-based — use it from any browser on desktop or mobile.',
    },
    {
      id: 'data-security',
      question: 'Is my résumé data secure?',
      answer:
        'Yes. Your data is encrypted and stored securely. We never sell it or share it with third parties.',
    },
    {
      id: 'external-tracking',
      question: 'Can I track applications from other sites?',
      answer:
        'Yes. The tracker manages applications from LinkedIn, Indeed, company sites — anywhere — in one dashboard.',
    },
  ],
};
