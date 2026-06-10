/* Mirrors frontend/src/components/marketing/sections/FounderNote.tsx. */

export interface FounderNoteContent {
  eyebrow: string;
  founderInitial: string;
  founderName: string;
  founderTitle: string;
  /** One entry per paragraph; `accent` (if set) is appended with the gradient style. */
  paragraphs: { text: string; accent?: string }[];
  ctaLabel: string;
  ctaAppPath: string;
}

export const founderNote: FounderNoteContent = {
  eyebrow: 'A note from the founder',
  founderInitial: 'K',
  founderName: 'Kalyan Reddy',
  founderTitle: 'Founder · Start2Solve',
  paragraphs: [
    {
      text:
        'I have seen students, graduates, and professionals spend hours applying to jobs, tailoring resumes, writing cover letters, and still not getting enough responses. ',
      accent: 'ApplyHustle is built to change that.',
    },
    {
      text:
        'Our goal is simple: help job seekers apply faster, apply smarter, and track everything clearly — without losing quality.',
    },
    {
      text:
        'ApplyHustle is not just about sending more applications. It is about sending better applications with the right resume, the right cover letter, and the right strategy.',
    },
  ],
  ctaLabel: 'Read the full story',
  ctaAppPath: '/signup',
};
