import React from 'react';
import Header from './components/header/header';
import AboutMe from './components/about-me/about-me';
import Projects from './components/projects/projects';
import Experience from './components/experience/experience';
import Skills from './components/skills/skills';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';
import './App.css';

function App() {
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
