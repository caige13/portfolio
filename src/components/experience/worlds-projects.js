import React, { useState } from 'react';
import './worlds-projects.css';

const PHASES = [
    'Technical Feasibility',
    'Solutionizing',
    'Architecture',
    'Implementation',
    'Validation',
    'Deployment',
    'Support',
];

const worldsProjects = [
    {
        key: 'gate',
        title: 'Vehicle Gate Automation',
        sub: '24/7 mission-critical system deployed across dozens of client sites.',
        summary:
            'Built a microservice that retired the legacy solution entirely — performing better ' +
            'while cutting the number of cameras needed by 50%. Sole technical architect, ' +
            'developer, QA, and DevOps across multi-site deployments.',
        phases: [1, 1, 1, 1, 1, 1, 1],
        skills: ['Python', 'GraphQL API', 'SDK', 'CV', 'OCR', 'AI Assistance', 'Microservices'],
        impact: ['Retired legacy system', '50% fewer cameras', 'Multi-site deployment', 'Production critical'],
        flow: ['GraphQL Subscription (1000s events/sec)', 'Data Orchestration', 'OCR + CV Processing', 'Event Management', 'Client API Authorization', 'Gate Action'],
    },
    {
        key: 'factory',
        title: 'Factory Tracking & Optimization',
        sub: 'Real-time anomaly alerting from statistical analysis of factory events.',
        summary:
            'Built a real-time anomaly alerting system using statistical analysis to catch abnormal ' +
            'events and operational inefficiencies, plus a standalone dashboard for live alerting ' +
            'and sub-process efficiency comparisons. Architected event data structures to drive ' +
            'measurable client ROI.',
        phases: [1, 1, 1, 1, 1, 1, 1],
        skills: ['Python', 'GraphQL API', 'Streamlit', 'N8N', 'CV', 'Custom Nodes', 'AI Assistance'],
        impact: ['Real-time alerting', 'Efficiency tracking', 'Sub-process optimization', 'Client ROI'],
        flow: ['Event Data Ingestion', 'Statistical Analysis', 'N8N Agent Orchestration', 'Claude Code Pattern Recognition', 'Real-time Dashboard', 'Alerting & Comparison'],
    },
    {
        key: 'safety',
        title: 'CV Safety Detection',
        sub: 'Person-down, red-zone entry, and collision-path detection.',
        summary:
            'Owned discovery of the client environment and became a domain expert in their field ' +
            'to deliver real value. Built and optimized data review and model pipelines for ' +
            'safety-focused computer vision systems, deploying and supporting N8N agents.',
        phases: [1, 1, 1, 1, 1, 1, 1],
        skills: ['Python', 'GraphQL API', 'N8N', 'CV', 'Custom Nodes', 'AI Assistance'],
        impact: ['Safety workflows', 'Domain expertise', 'Detection optimization', 'Client value'],
        flow: ['Client Environment Discovery', 'Domain Analysis', 'N8N Agent Deployment', 'CV Detection Pipeline', 'Data Review & Optimization', 'Alerting'],
    },
    {
        key: 'mcp',
        title: 'MCP Server & Data Classification',
        sub: 'Claude access to self-hosted N8N and product data.',
        summary:
            'Created an MCP server and classification layer that routes true/false-positive data ' +
            'to optimize downstream workflows — streamlining workflow debugging and process ' +
            'optimization for deployed client environments.',
        phases: [1, 1, 1, 1, 1, 0, 1],
        skills: ['MCP', 'AI Assistance', 'GraphQL API', 'N8N', 'Claude Skills Dev'],
        impact: ['Agent access', 'Classification support', 'Workflow optimization'],
        flow: ['Product Data', 'MCP Server', 'Classification Logic', 'Workflow Routing'],
    },
    {
        key: 'sdk',
        title: 'Internal SDK',
        sub: 'Dev tools streamlining how teams build on the platform.',
        summary:
            'Built internal developer tooling and SDK design patterns that reduced friction for ' +
            'teams integrating with the platform — centralized access for FDEs and sales to ' +
            'build faster on the product.',
        phases: [1, 1, 1, 1, 1, 0, 1],
        skills: ['Python', 'GraphQL API', 'SDK Design', 'AI Assistance'],
        impact: ['Faster integrations', 'Internal leverage', 'Platform consistency'],
        flow: ['Core API', 'SDK Layer', 'Internal Teams', 'Faster Delivery'],
    },
    {
        key: 'n8n',
        title: 'N8N Platform for Clients',
        sub: 'Dozens of custom nodes, handed off to consulting firms and clients.',
        summary:
            'Designed a client-facing automation platform with reusable custom nodes and ' +
            'handoff-ready workflows on a self-hosted N8N platform — built so consulting firms ' +
            'and clients can keep building without me.',
        phases: [0, 1, 0, 1, 1, 0, 1],
        skills: ['N8N', 'GraphQL API', 'Custom Nodes', 'CV', 'AI Assistance'],
        impact: ['Client enablement', 'Reusable nodes', 'Consulting handoff'],
        flow: ['Custom Nodes', 'Client Workflows', 'Hosted Platform', 'Handoff / Scale'],
    },
];

function WorldsProjects() {
    const [activeKey, setActiveKey] = useState('gate');
    const active = worldsProjects.find((p) => p.key === activeKey);
    const owned = active.phases.filter(Boolean).length;

    return (
        <div className="wp">
            <p className="wp-intro">
                <span className="chip hot">Key projects</span> Every project runs the full ownership
                cycle — <em>feasibility to 24/7 support</em>. Pick one to see how far I carried it
                and how the system fits together.
            </p>

            <div className="wp-grid">
                <ul className="wp-list">
                    {worldsProjects.map((p) => (
                        <li key={p.key}>
                            <button
                                type="button"
                                className={p.key === activeKey ? 'wp-item active' : 'wp-item'}
                                onClick={() => setActiveKey(p.key)}
                            >
                                <span className="wp-item-title">{p.title}</span>
                                <span className="wp-item-meter" aria-label={`${p.phases.filter(Boolean).length} of 7 phases owned`}>
                                    {p.phases.map((on, i) => (
                                        <i key={i} className={on ? 'on' : ''} />
                                    ))}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="wp-detail card">
                    <div className="wp-detail-head">
                        <h4>{active.title}</h4>
                        <span className="chip">NDA</span>
                    </div>
                    <p className="wp-sub">{active.sub}</p>
                    <p className="wp-summary">{active.summary}</p>

                    <div className="wp-block">
                        <span className="wp-label">Ownership — {owned}/7 phases</span>
                        <ol className="wp-phases">
                            {PHASES.map((phase, i) => (
                                <li key={phase} className={active.phases[i] ? 'owned' : ''}>
                                    {phase}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="wp-block">
                        <span className="wp-label">How the system fits together</span>
                        <div className="wp-flow">
                            {active.flow.map((node, i) => (
                                <React.Fragment key={node}>
                                    {i > 0 && <span className="wp-arrow">→</span>}
                                    <span className="wp-node">{node}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="wp-block wp-cols">
                        <div>
                            <span className="wp-label">Impact</span>
                            <div className="chip-row">
                                {active.impact.map((it) => <span className="chip gold" key={it}>{it}</span>)}
                            </div>
                        </div>
                        <div>
                            <span className="wp-label">Skills</span>
                            <div className="chip-row">
                                {active.skills.map((s) => <span className="chip" key={s}>{s}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorldsProjects;
