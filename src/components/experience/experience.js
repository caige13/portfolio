import React from 'react';
import WorldsProjects from './worlds-projects';
import './experience.css';

const jobs = [
    {
        company: 'Worlds',
        role: 'Forward Deployed Software Engineer',
        dates: '2025 — Present',
        where: 'Remote',
        bullets: [
            'Sole technical owner of large-scale distributed systems processing thousands of events per second across dozens of nationwide sites — architecture through 24/7 production support.',
            'Architected production CV and ML pipelines, platform SDKs, and agentic workflow layers with direct client-facing accountability.',
            'Built an MCP server integrating Claude Code with self-hosted n8n instances, streamlining workflow debugging and data classification for deployed client environments.',
        ],
        explorer: true,
    },
    {
        company: 'Ethos Group',
        role: 'Full Stack Software Engineer',
        dates: '2021 — 2025',
        where: 'Remote',
        bullets: [
            'Built and maintained distributed IoT Edge infrastructure serving hundreds of client locations across the U.S. (Azure IoT Edge, Docker, Kubernetes).',
            'Promoted to the R&D team; spearheaded integration of NLP models and LLMs into production products — prompt engineering, token optimization, and real-time monitoring.',
            'Engineered a data transfer compiler integrating internal systems with 12+ external partner APIs on scalable microservice architecture.',
        ],
        keyProjects: [
            {
                name: 'Sales Replay',
                blurb: 'Record, transcribe, and apply AI — semantic analysis, Q&A extraction, rankings, and AI feedback, synced with Playbook.',
                tech: ['OpenAI', '.NET', 'Angular', 'SQL', 'IoT Edge'],
            },
            {
                name: 'Playbook',
                blurb: 'Knowledge base with scripted homework, recording, and AI roleplay for sales training — RAG architecture.',
                tech: ['.NET', 'Angular', 'Python', 'OpenAI', 'RAG'],
            },
            {
                name: 'Large Data Compiler',
                blurb: 'Translated data from 12 external partners to internal teams on scalable microservice architecture.',
                tech: ['.NET', 'Angular', 'SQL', 'Entity Framework'],
            },
        ],
    },
];

const schools = [
    {
        school: 'The University of Texas at Austin',
        degree: 'M.S. in Artificial Intelligence',
        dates: '2025 — 2027 · 4.0 GPA',
        note: 'In progress alongside full-time engineering. Research focus: trajectory-based pedestrian-vehicle collision risk prediction.',
    },
    {
        school: 'The University of Texas at Dallas',
        degree: 'B.S. in Computer Science',
        dates: 'Dec 2022 · 4.0 GPA',
        note: 'Co-authored the first ML case study presented at the 2023 EOS/ESD Annual Symposium.',
    },
];

function Experience() {
    return (
        <section id="experience" className="section experience">
            <div className="container">
                <div className="eyebrow">Where I've been</div>
                <h2>Experience worth <em className="squiggle">writing home</em> about.</h2>

                <div className="exp-list">
                    {jobs.map((job) => (
                        <article className="exp-card card" key={job.company}>
                            <header className="exp-head">
                                <div>
                                    <h3>{job.company}</h3>
                                    <p className="exp-role">{job.role}</p>
                                </div>
                                <p className="exp-dates">{job.dates} · {job.where}</p>
                            </header>
                            <ul className="exp-bullets">
                                {job.bullets.map((b) => <li key={b}>{b}</li>)}
                            </ul>
                            {job.explorer && <WorldsProjects />}
                            {job.keyProjects && (
                                <div className="kp">
                                    <p className="kp-intro">
                                        <span className="chip hot">Key projects</span>
                                    </p>
                                    <div className="kp-grid">
                                        {job.keyProjects.map((kp) => (
                                            <div className="kp-card" key={kp.name}>
                                                <h4>{kp.name} <span className="chip">NDA</span></h4>
                                                <p>{kp.blurb}</p>
                                                <div className="chip-row">
                                                    {kp.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}

                    <div className="edu-row">
                        {schools.map((s) => (
                            <article className="edu-card card" key={s.school}>
                                <span className="chip gold">{s.dates}</span>
                                <h3>{s.degree}</h3>
                                <p className="edu-school">{s.school}</p>
                                <p className="edu-note">{s.note}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience;
