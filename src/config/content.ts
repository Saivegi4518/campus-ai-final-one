/**
 * CampusAI — all site copy lives in this one file.
 * Components render by mapping over these arrays (content-driven).
 */

export const SITE = {
  name: 'CampusAI',
  tagline: 'CSD ASSISTANT',
  department: 'Department of Computer Science & Data Science',
  college: 'NSRIT',
  copyright: '© 2026 Department of Computer Science & Data Science, NSRIT. All rights reserved.',
} as const;

export const HERO = {
  badge: 'AI-POWERED CAMPUS ASSISTANT',
  title: 'Your Campus.',
  highlight: 'One Intelligent Assistant.',
  sub:
    'CampusAI helps CSD students at NSRIT quickly find information about courses, faculty, placements, subjects, campus resources, and department-related questions — anytime.',
  trust: ['Available 24/7', 'Student friendly', 'Instant answers'],
} as const;

export const FLOATING_CARDS = [
  { q: 'Where is the Data Science Lab?', tag: 'Campus' },
  { q: 'Who teaches DBMS?', tag: 'Faculty' },
  { q: 'Placement information', tag: 'Placements' },
  { q: 'Course details for CSD', tag: 'Courses' },
] as const;

export const FEATURES = [
  {
    glyph: '▤',
    label: 'Course Information',
    title: 'Course Information',
    text: 'Discover curriculum and course-related details for the CSD department.',
    span: 'span-1',
  },
  {
    glyph: '◉',
    label: 'Faculty Information',
    title: 'Faculty Information',
    text: 'Find department and faculty information whenever you need it.',
    span: 'span-1',
  },
  {
    glyph: '✎',
    label: 'Subject Assistance',
    title: 'Subject Assistance',
    text: 'Explore subjects and academic information across your semesters.',
    span: 'span-2',
  },
  {
    glyph: '⬢',
    label: 'Placement Information',
    title: 'Placement Information',
    text: 'Access placement-related information and guidance for the department.',
    span: 'span-1',
  },
  {
    glyph: '◎',
    label: 'Campus Guidance',
    title: 'Campus Guidance',
    text: 'Discover labs, facilities, and campus resources with ease.',
    span: 'span-1',
  },
  {
    glyph: '✦',
    label: '24/7 AI Assistance',
    title: '24/7 AI Assistance',
    text: 'Ask questions whenever you need — the assistant is always available.',
    span: 'span-2',
  },
] as const;

export const STEPS = [
  {
    n: '01',
    title: 'Ask',
    text: 'Type your campus or academic question in the assistant — courses, faculty, subjects, placements, or campus resources.',
  },
  {
    n: '02',
    title: 'Understand',
    text: 'CampusAI processes your request and looks through the available department information.',
  },
  {
    n: '03',
    title: 'Discover',
    text: 'Receive relevant information quickly, and follow up with more questions anytime.',
  },
] as const;

export const DEMO_SCRIPT = [
  {
    from: 'student',
    text: 'Where can I find information about my subjects?',
  },
  {
    from: 'ai',
    text: 'I can help you find course, subject, faculty, placement, and department information. Just ask — for example, "Who teaches DBMS?" or "What are the CSD course details?"',
  },
  {
    from: 'student',
    text: 'Who should I contact for placement queries?',
  },
  {
    from: 'ai',
    text: 'Ask me about placements anytime, and I will point you to the available placement-related information for the department.',
  },
] as const;

export const DEMO_CONTEXT = [
  { label: 'Courses' },
  { label: 'Faculty' },
  { label: 'Placements' },
  { label: 'Subjects' },
  { label: 'Campus' },
] as const;

export const WHY_POINTS = [
  {
    title: 'Simple access',
    text: 'One link opens the assistant — no installs, no accounts, no learning curve.',
  },
  {
    title: 'Quick discovery',
    text: 'Get to the information you need without digging through portals and notice boards.',
  },
  {
    title: 'Student-focused',
    text: 'Built around the questions CSD students actually ask, in plain language.',
  },
  {
    title: 'Department-focused',
    text: 'Focused on Computer Science & Data Science courses, faculty, and resources.',
  },
  {
    title: 'Available anytime',
    text: 'Ask questions day or night — the assistant never sleeps.',
  },
] as const;

export const FINAL_CTA = {
  eyebrow: 'Get started',
  title: 'Campus information',
  highlight: "shouldn't be hard to find.",
  sub:
    'Ask CampusAI about courses, faculty, placements, subjects, and campus resources — and get started in seconds.',
  note: 'Opens the CampusAI assistant in a new tab · Free for students',
} as const;

export const FOOTER = {
  explore: 'Explore',
  assistant: 'Assistant',
  exploreLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ],
  assistantLinks: [
    { label: 'Courses & subjects' },
    { label: 'Faculty information' },
    { label: 'Placements' },
    { label: 'Campus resources' },
  ],
} as const;
