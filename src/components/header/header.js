import React from 'react';
import heroShot from '../../assets/projects/crazy-ape-hero-800.webp';
import './header.css';

function Header() {
    return (
        <header>
            <nav className="site-nav">
                <a className="brand" href="#top">Caige <em>Middaugh</em></a>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Work</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
                    <li><a className="btn btn-fill nav-cta" href="#contact">Get in touch</a></li>
                </ul>
            </nav>

            <section className="hero" id="top">
                <div className="hero-copy">
                    <div className="eyebrow">Software engineer &middot; DFW, Texas</div>
                    <h1>I build things people <em className="squiggle">actually&nbsp;use.</em></h1>
                    <p className="lede">
                        Forward Deployed Software Engineer at <strong>Worlds</strong>, MSAI candidate
                        at <strong>UT Austin</strong> — and freelance builder of one-of-a-kind websites
                        for real businesses and community tools with thousands of weekly users.
                    </p>
                    <div className="hero-actions">
                        <a className="btn btn-fill" href="#projects">See the work</a>
                        <a className="btn btn-line" href="#contact">Say hello</a>
                    </div>
                </div>

                <figure className="hero-card">
                    <div className="sticker">Open for<br />projects</div>
                    <div className="frame">
                        <img src={heroShot} alt="Crazy Ape Pickleball — freelance client site" />
                        <figcaption>Crazy Ape Pickleball — client work, live now</figcaption>
                    </div>
                </figure>
            </section>
        </header>
    );
}

export default Header;
