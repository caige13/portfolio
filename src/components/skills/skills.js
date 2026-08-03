import React, { useState } from 'react';
import SkillBubbles from './skill-bubbles';
import './skills.css';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const groups = [
    {
        title: 'Languages',
        items: ['Python', 'TypeScript', 'C# / .NET', 'C / C++', 'Java', 'SQL'],
    },
    {
        title: 'Frontend',
        items: ['React', 'Next.js', 'Angular', 'Tailwind', 'HTML / CSS'],
    },
    {
        title: 'Backend & Data',
        items: ['Node.js', 'FastAPI', 'Django', 'GraphQL', 'REST APIs', 'PostgreSQL', 'SQL Server', 'Convex', 'Supabase', 'Microservices'],
    },
    {
        title: 'Cloud & Infrastructure',
        items: ['Azure IoT Edge', 'AKS', 'AWS EC2 / S3 / Lambda', 'Docker', 'Kubernetes', 'Cloudflare', 'GitHub Actions', 'CI/CD'],
    },
    {
        title: 'AI & ML',
        items: ['LangGraph', 'N8N', 'Computer Vision', 'NLP', 'RAG Pipelines', 'Vector Databases', 'OpenAI / Anthropic APIs', 'PyTorch', 'Scikit-learn', 'Reinforcement Learning'],
    },
    {
        title: 'Developer Tooling & DX',
        items: ['SDK Design', 'MCP Servers', 'Custom N8N Nodes', 'Claude Skills', 'CLI Tooling', 'API Design & Docs'],
    },
];

function Skills() {
    const [view, setView] = useState(prefersReducedMotion ? 'grid' : 'bubbles');

    return (
        <section id="skills" className="section">
            <div className="container">
                <div className="eyebrow center">The toolbox</div>
                <h2 className="skills-title">Skills that go <em className="squiggle">deep.</em></h2>

                <div className="skills-toggle" role="tablist" aria-label="Skills view">
                    <button
                        type="button" role="tab" aria-selected={view === 'bubbles'}
                        className={view === 'bubbles' ? 'skills-toggle-btn active' : 'skills-toggle-btn'}
                        onClick={() => setView('bubbles')}
                    >
                        Bubbles
                    </button>
                    <button
                        type="button" role="tab" aria-selected={view === 'grid'}
                        className={view === 'grid' ? 'skills-toggle-btn active' : 'skills-toggle-btn'}
                        onClick={() => setView('grid')}
                    >
                        Grid
                    </button>
                </div>

                {view === 'bubbles' ? (
                    <SkillBubbles />
                ) : (
                    <div className="skill-groups">
                        {groups.map((g) => (
                            <article className="skill-group card" key={g.title}>
                                <h3>{g.title}</h3>
                                <ul className="chip-row skill-chips">
                                    {g.items.map((item) => (
                                        <li className="chip" key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Skills;
