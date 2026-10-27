/**
 * CampusAI — shared site configuration.
 *
 * CHAT_URL is the existing production chatbot destination
 * (Activepieces chat), preserved from https://campusai-chi.vercel.app/.
 * Every primary CTA on the page must point here.
 */

export const CHAT_URL = 'https://cloud.activepieces.com/chats/ZCgNMlEocW5RinK2Zcuql';

export const CTA = {
  nav: 'Open Assistant',
  hero: 'Ask CampusAI',
  demo: 'Try CampusAI',
  final: 'Chat with CampusAI',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
] as const;