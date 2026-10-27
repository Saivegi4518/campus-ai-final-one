# CampusAI

An AI-powered campus assistant landing page for Computer Science and Data Science (CSD) students at NSRIT. CampusAI helps students find information about courses, faculty, subjects, placements, and campus resources.

## Features

- Responsive landing page with sections for features, a conversation demo, how it works, and a call to action.
- Animated hero illustration and interface details, with reduced-motion support.
- Primary calls to action link to the CampusAI chat.
- Built with React and TypeScript, using Vite for development and production builds.

## Getting started

You’ll need Node.js and npm installed.

```bash
git clone https://github.com/Saivegi4518/campus-ai-final-one.git
cd campus-ai-final-one
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Run the TypeScript check and create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run the TypeScript check. |

## Production build

```bash
npm run build
npm run preview
```

The project is configured for Vercel with Vite as the framework and `dist` as the output directory. You can import the GitHub repository into Vercel to deploy it.

## Project structure

```text
src/
  components/   Page sections, UI components, and their styles
  config/       Site copy, navigation, and assistant link
  App.tsx       Page composition
  main.tsx      React entry point
public/         Static assets
```

The interactive conversation on the landing page is a scripted preview. The assistant’s chat experience opens at the external URL configured in `src/config/links.ts`.
