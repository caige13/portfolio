import React, { useLayoutEffect } from 'react';
import Header from './components/header/header';
import AboutMe from './components/about-me/about-me';
import Projects from './components/projects/projects';
import Experience from './components/experience/experience';
import Skills from './components/skills/skills';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';
import './App.css';

const REVEAL_TARGETS = [
  'main .eyebrow',
  'main h2',
  '.stat-card',
  '.exploring',
  '.featured',
  '.project-card',
  '.lab-note',
  '.exp-card',
  '.edu-card',
  '.skills-toggle',
  '.bubble-arena-wrap',
  '.skill-group',
  '.contact-form',
];

function App() {
  useLayoutEffect(() => {
    if (typeof window.matchMedia !== 'function' || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = document.querySelectorAll(REVEAL_TARGETS.join(', '));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
      <div className="App">
        <Header />
        <main>
          <AboutMe />
          <div className="bunting" />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
  );
}

export default App;
