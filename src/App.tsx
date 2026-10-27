import DemoChat from './components/DemoChat';
import Features from './components/Features';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Navbar from './components/Navbar';
import Why from './components/Why';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page-bg" aria-hidden="true" />
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <DemoChat />
        <HowItWorks />
        <Why />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
