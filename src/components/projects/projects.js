import React from 'react';
import crazyApeHero from '../../assets/projects/crazy-ape-hero-800.webp';
import crazyApeHeroLg from '../../assets/projects/crazy-ape-hero-1440.webp';
import crazyApeMobile from '../../assets/projects/crazy-ape-mobile-390.webp';
import agentBoard from '../../assets/projects/agent-board-1200.webp';
import azerothHub from '../../assets/projects/azerothhub-1200.webp';
import pickleBrackit from '../../assets/projects/picklebrackit-1200.webp';
import pickleBrackitDark from '../../assets/projects/picklebrackit-dark-1200.webp';
import pickleBrackitMobileLight from '../../assets/projects/picklebrackit-mobile-light-390.webp';
import pickleBrackitMobileDark from '../../assets/projects/picklebrackit-mobile-dark-390.webp';
import importPreflight from '../../assets/projects/import-preflight-1200.webp';
import './projects.css';

const projects = [
    {
        name: 'AgentBoard',
        tagline: 'AI agents on a Kanban board',
        image: agentBoard,
        alt: 'AgentBoard — Kanban with AI agents',
        status: 'In development',
        tags: ['React', 'Tauri (Rust)', 'SQLite', 'Claude CLI'],
        description:
            'A desktop app that orchestrates autonomous AI agents to plan, decompose, and ' +
            'execute software development work — a 6-step planning flow, multi-role agents, ' +
            'and real-time execution monitoring.',
        link: null,
    },
    {
        name: 'AzerothHub',
        tagline: 'thousands of weekly users',
        image: azerothHub,
        alt: 'AzerothHub — interactive world map',
        status: 'Live',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
        description:
            'A map and data tool for the Bronzebeard WoW community — Worldforge items, Mystic ' +
            'Enchants, and rare spawns, powered by the open-source LootCollector addon. ' +
            'Built from community demand.',
        link: 'https://azerothhub.com',
    },
    {
        name: 'PickleBrackit',
        tagline: 'tournaments without the paywall',
        variants: true,
        status: 'Live',
        tags: ['Next.js', 'Convex', 'Clerk', 'Tailwind', 'Light + dark'],
        description:
            'A real-time tournament platform for pickleball communities — round robins, brackets, ' +
            'live scoring, and standings. Mobile-first with full light and dark themes; players ' +
            'join with a QR code and nobody is forced to sign up.',
        link: 'https://picklebrackit.com',
    },
    {
        name: 'Import Preflight',
        tagline: 'catch bad CSVs in seconds',
        image: importPreflight,
        alt: 'Import Preflight — scan dashboard',
        status: 'In development',
        tags: ['Next.js 16', 'Supabase', 'TypeScript'],
        description:
            'A B2B SaaS that audits Shopify CSV imports before they fail — 50+ parallel detectors, ' +
            'an algorithmic auto-fix engine, and a 0–100 Clean Data Score.',
        link: null,
    },
];

function Projects() {
    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="projects-head">
                    <div className="eyebrow center">Selected work</div>
                    <h2>Built for clients, communities,<br />and <em className="squiggle">the fun of it.</em></h2>
                </div>

                <article className="featured card">
                    <div className="featured-shots">
                        <span className="featured-main">
                            <img
                                src={crazyApeHero}
                                srcSet={`${crazyApeHero} 800w, ${crazyApeHeroLg} 1440w`}
                                sizes="(max-width: 900px) 100vw, 600px"
                                alt="Crazy Ape Pickleball website hero"
                            />
                        </span>
                        <span className="featured-phone">
                            <img src={crazyApeMobile} alt="Crazy Ape Pickleball on mobile" />
                        </span>
                    </div>
                    <div className="featured-info">
                        <div className="chip-row">
                            <span className="chip hot">Client work</span>
                            <span className="chip">Design + build</span>
                            <span className="chip">Cloudflare Workers</span>
                        </div>
                        <h3>Crazy Ape Pickleball</h3>
                        <p>
                            A tournament brand for a DFW pickleball org running <strong>USAP &amp; USSP
                            sanctioned events</strong> — loud custom branding, an event calendar with
                            live registration, and a personality you can't buy off a theme shelf.
                            Designed, built, and shipped end-to-end.
                        </p>
                        <div className="featured-links">
                            <a className="btn btn-fill" href="https://crazy-ape-site-demo.caige-middaugh.workers.dev/" target="_blank" rel="noreferrer">
                                Visit the live site →
                            </a>
                        </div>
                    </div>
                </article>

                <div className="project-cards">
                    {projects.map((p) => (
                        <article className="project-card card" key={p.name}>
                            {p.variants ? (
                                <span className="project-shot pb-shot">
                                    <img src={pickleBrackit} alt="PickleBrackit desktop, light mode" loading="lazy" />
                                    <span className="pb-window">
                                        <img src={pickleBrackitDark} alt="PickleBrackit desktop, dark mode" loading="lazy" />
                                    </span>
                                    <span className="pb-phone pb-phone-dark">
                                        <img src={pickleBrackitMobileDark} alt="PickleBrackit mobile, dark mode" loading="lazy" />
                                    </span>
                                    <span className="pb-phone pb-phone-light">
                                        <img src={pickleBrackitMobileLight} alt="PickleBrackit mobile, light mode" loading="lazy" />
                                    </span>
                                </span>
                            ) : (
                                <span className="project-shot">
                                    <img src={p.image} alt={p.alt} loading="lazy" />
                                </span>
                            )}
                            <div className="project-body">
                                <div className="chip-row">
                                    <span className={p.status === 'Live' ? 'chip gold' : 'chip'}>{p.status}</span>
                                    {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                                </div>
                                <h3>{p.name} <em>— {p.tagline}</em></h3>
                                <p>{p.description}</p>
                                {p.link && (
                                    <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                                        {p.link.replace('https://', '')} →
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                <p className="lab-note">
                    <span className="chip">Also in the lab</span> a managed online-presence platform
                    for DFW restaurants, and a factory-floor computer-vision pipeline delivered for a
                    manufacturing client at Worlds.
                </p>
            </div>
        </section>
    );
}

export default Projects;
