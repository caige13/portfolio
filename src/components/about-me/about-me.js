import React from 'react';
import './about-me.css';

const stats = [
    { number: '5+', label: 'Years engineering' },
    { number: '3+', label: 'Live side projects' },
    { number: '10+', label: 'Projects shipped to production' },
    { number: '∞', label: 'Pickleball rating' },
];

function AboutMe() {
    return (
        <section id="about" className="section">
            <div className="container about-grid">
                <div className="about-copy">
                    <div className="eyebrow">Get to know me</div>
                    <h2>Listen, build, ship, <em className="squiggle">iterate.</em></h2>
                    <p>
                        I'm a software engineer who cares about <strong>delivering real value
                        to the people I build for</strong> — and making the people around me more effective.
                        Whether that's shipping production systems, building internal tools that
                        improve a team's quality of life, or creating something a community asked
                        for, the throughline is the same.
                    </p>
                    <p>
                        At <strong>Worlds</strong>, I built an internal SDK to streamline how we
                        developed against the platform. At <strong>Ethos Group</strong>, I was
                        promoted to the R&amp;D team for rapid delivery and led the integration of
                        AI/NLP features across the product suite.
                    </p>
                    <p>
                        Outside of work, I build for communities I'm part of. <strong>AzerothHub</strong> started
                        because the WoW community I play in needed a tool nobody had built — now it
                        has thousands of weekly users. <strong>PickleBrackit</strong> exists because the
                        tournament app our pickleball group used went behind a paywall. And local
                        businesses like <strong>Crazy Ape Pickleball</strong> come to me for websites
                        with personality you can't buy off a theme shelf.
                    </p>
                    <div className="exploring">
                        <span className="chip gold">Currently exploring</span>
                        <p>
                            LLM-native application architecture, agentic workflows
                            with <strong>LangGraph + N8N</strong>, and the product surface area
                            between AI APIs and real business workflows — alongside
                            my <strong>MS in AI at UT Austin</strong>.
                        </p>
                    </div>
                </div>

                <ul className="stats">
                    {stats.map((s) => (
                        <li className="stat-card" key={s.label}>
                            <span className="stat-number">{s.number}</span>
                            <span className="stat-label">{s.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default AboutMe;
