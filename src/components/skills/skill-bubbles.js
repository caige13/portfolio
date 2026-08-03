import React, { useEffect, useRef } from 'react';
import './skill-bubbles.css';

const CY = new Date().getFullYear();

const bubbleData = [
    { name: 'Languages', tone: 'card', skills: [
        { n: 'Python', y: 2018 }, { n: 'TypeScript', y: 2021 }, { n: 'C# / .NET', y: 2021 },
        { n: 'C / C++', y: 2023 }, { n: 'Java', y: 2024 }, { n: 'SQL', y: 2021 }, { n: 'HTML / CSS', y: 2021 },
    ] },
    { name: 'Frontend', tone: 'mustard', skills: [
        { n: 'React', y: 2024 }, { n: 'Next.js', y: 2024 }, { n: 'Angular', y: 2021 },
        { n: 'Tailwind', y: 2024 }, { n: 'Dash', y: 2025 }, { n: 'Streamlit', y: 2025 },
    ] },
    { name: 'Backend', tone: 'cream', skills: [
        { n: 'SQL Databases', y: 2021 }, { n: 'PostgreSQL', y: 2024 }, { n: 'Node.js', y: 2022 },
        { n: 'REST APIs', y: 2021 }, { n: 'GraphQL', y: 2025 }, { n: 'FastAPI', y: 2024 },
        { n: 'Flask', y: 2022 }, { n: 'Django', y: 2022 }, { n: 'Convex', y: 2025 },
        { n: 'Supabase', y: 2025 }, { n: 'Entity Framework', y: 2021 }, { n: 'Microservices', y: 2021 },
    ] },
    { name: 'Infra', tone: 'persimmon', skills: [
        { n: 'Docker', y: 2023 }, { n: 'Kubernetes', y: 2024 }, { n: 'Cloudflare', y: 2024 },
        { n: 'CI/CD', y: 2021 }, { n: 'GitHub Actions', y: 2025 },
    ] },
    { name: 'AWS', tone: 'cream', skills: [
        { n: 'EC2', y: 2023 }, { n: 'S3', y: 2023 }, { n: 'Lambda', y: 2023 },
        { n: 'RDS', y: 2023 }, { n: 'CloudFront', y: 2023 },
    ] },
    { name: 'Azure', tone: 'mustard', skills: [
        { n: 'VMs', y: 2021 }, { n: 'App Service', y: 2021 }, { n: 'Azure SQL', y: 2021 },
        { n: 'Blob Storage', y: 2021 }, { n: 'DevOps', y: 2021 }, { n: 'Functions', y: 2021 },
        { n: 'IoT Edge', y: 2021 }, { n: 'AKS', y: 2021 }, { n: 'Cognitive Services', y: 2022 },
        { n: 'Core AI', y: 2022 }, { n: 'Databricks', y: 2025 }, { n: 'Power BI', y: 2025 },
    ] },
    { name: 'AI / ML', tone: 'persimmon', skills: [
        { n: 'LangGraph', y: 2025 }, { n: 'N8N', y: 2025 }, { n: 'Computer Vision', y: 2025 },
        { n: 'NLP', y: 2024 }, { n: 'Reinforcement Learning', y: 2024 }, { n: 'Agentic Workflows', y: 2024 },
        { n: 'OpenAI / Anthropic', y: 2024 }, { n: 'RAG Pipelines', y: 2024 }, { n: 'Vector DBs', y: 2024 },
        { n: 'Pandas / NumPy', y: 2024 }, { n: 'Scikit-learn', y: 2024 }, { n: 'PyTorch', y: 2024 },
        { n: 'TorchVision', y: 2024 },
    ] },
    { name: 'Dev Tooling & DX', tone: 'card', skills: [
        { n: 'SDK Design', y: 2025 }, { n: 'MCP Design', y: 2025 }, { n: 'CLI Tooling', y: 2023 },
        { n: 'API Design & Docs', y: 2021 }, { n: 'Internal Tooling', y: 2021 },
        { n: 'Platform Integration', y: 2021 }, { n: 'Dev Onboarding', y: 2023 },
        { n: 'N8N Custom Nodes', y: 2025 }, { n: 'Claude Skills', y: 2025 }, { n: 'Monorepo', y: 2023 },
    ] },
    { name: 'Practices', tone: 'cream', skills: [
        { n: 'System Design', y: 2021 }, { n: 'Agile / Scrum', y: 2021 }, { n: 'Technical PM', y: 2024 },
        { n: 'QA', y: 2023 }, { n: 'Data Visualization', y: 2025 },
    ] },
];

// Ported from the original static site's physics sim: center gravity, damping,
// pairwise collision knock-back, drag to throw, click to expand.
function SkillBubbles() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !('IntersectionObserver' in window)) return undefined;

        let bubbles = [];
        let dragBubble = null;
        let dragOff = { x: 0, y: 0 };
        let didDrag = false;
        let animId = null;
        let started = false;
        let W = 0;
        let H = 0;
        const recent = []; // recent drag positions, for throw velocity

        function build() {
            W = container.offsetWidth;
            H = container.offsetHeight;
            container.innerHTML = '';
            // shrink bubbles on narrow arenas so the cluster can physically fit
            const scale = Math.max(0.58, Math.min(1, W / 900));
            bubbles = bubbleData.map((d, i) => {
                const totalYrs = d.skills.reduce((s, sk) => s + (sk.y ? CY - sk.y : 1), 0);
                const r = Math.max(46, Math.min(96, 28 + totalYrs * 1.1 + d.skills.length * 1.5)) * scale;
                const labelSize = Math.max(12, Math.min(18, r / 4.6));
                const el = document.createElement('div');
                el.className = `bubble tone-${d.tone}`;
                el.style.width = `${r * 2}px`;
                el.style.height = `${r * 2}px`;
                el.innerHTML =
                    `<span class="bubble-label" style="font-size:${labelSize}px">${d.name}</span>` +
                    `<span class="bubble-count">${d.skills.length} skills</span>` +
                    `<div class="bubble-skills">${d.skills.map((s) => {
                        const yr = s.y ? CY - s.y : 0;
                        return `<span class="bubble-skill-tag">${s.n}${yr ? ` · ${yr}yr${yr > 1 ? 's' : ''}` : ''}</span>`;
                    }).join('')}</div>`;
                container.appendChild(el);
                return {
                    el, r, baseR: r,
                    x: r + Math.random() * Math.max(1, W - r * 2),
                    y: r + Math.random() * Math.max(1, H - r * 2),
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                };
            });
            for (let i = 0; i < 100; i++) resolveCollisions();
            render();
        }

        function resolveCollisions() {
            for (let i = 0; i < bubbles.length; i++) {
                const a = bubbles[i];
                if (a.x - a.r < 0) { a.x = a.r; a.vx = Math.abs(a.vx) * 0.5; }
                if (a.x + a.r > W) { a.x = W - a.r; a.vx = -Math.abs(a.vx) * 0.5; }
                if (a.y - a.r < 0) { a.y = a.r; a.vy = Math.abs(a.vy) * 0.5; }
                if (a.y + a.r > H) { a.y = H - a.r; a.vy = -Math.abs(a.vy) * 0.5; }
                for (let j = i + 1; j < bubbles.length; j++) {
                    const b = bubbles[j];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minD = a.r + b.r + 4;
                    if (dist < minD && dist > 0) {
                        const nx = dx / dist;
                        const ny = dy / dist;
                        const overlap = (minD - dist) / 2;
                        if (!a.dragging) { a.x -= nx * overlap; a.y -= ny * overlap; a.vx -= nx * 0.3; a.vy -= ny * 0.3; }
                        if (!b.dragging) { b.x += nx * overlap; b.y += ny * overlap; b.vx += nx * 0.3; b.vy += ny * 0.3; }
                    }
                }
            }
        }

        function tick() {
            bubbles.forEach((b) => {
                if (b.dragging) return;
                b.vx += (W / 2 - b.x) * 0.0002;
                b.vy += (H / 2 - b.y) * 0.0002;
                b.vx *= 0.98;
                b.vy *= 0.98;
                b.x += b.vx;
                b.y += b.vy;
            });
            resolveCollisions();
            render();
            animId = requestAnimationFrame(tick);
        }

        function render() {
            bubbles.forEach((b) => {
                const expanded = b.el.classList.contains('expanded');
                b.el.style.width = expanded ? '' : `${b.r * 2}px`;
                b.el.style.height = expanded ? '' : `${b.r * 2}px`;
                b.el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
            });
        }

        function collapseAll() {
            bubbles.forEach((b) => { b.el.classList.remove('expanded'); b.r = b.baseR; });
        }

        function toggleBubble(el) {
            const b = bubbles.find((x) => x.el === el);
            if (!b) return;
            if (el.classList.contains('expanded')) {
                el.classList.remove('expanded');
                b.r = b.baseR;
            } else {
                collapseAll();
                el.classList.add('expanded');
                b.r = Math.max(b.baseR, 150);
            }
        }

        function getPos(e) {
            const rect = container.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }

        function onPointerDown(e) {
            const el = e.target.closest('.bubble');
            if (!el) return;
            const b = bubbles.find((x) => x.el === el);
            if (!b) return;
            e.preventDefault();
            b.dragging = true;
            dragBubble = b;
            didDrag = false;
            recent.length = 0;
            const p = getPos(e);
            dragOff = { x: p.x - b.x, y: p.y - b.y };
            b.vx = 0;
            b.vy = 0;
        }

        function onPointerMove(e) {
            if (!dragBubble) return;
            e.preventDefault();
            const p = getPos(e);
            const nx = p.x - dragOff.x;
            const ny = p.y - dragOff.y;
            if (Math.abs(nx - dragBubble.x) + Math.abs(ny - dragBubble.y) > 2) didDrag = true;
            dragBubble.x = nx;
            dragBubble.y = ny;
            recent.push({ x: nx, y: ny, t: performance.now() });
            if (recent.length > 6) recent.shift();
        }

        function onPointerUp(e) {
            if (!dragBubble) {
                const el = e.target.closest('.bubble');
                if (!el && container.contains(e.target)) collapseAll();
                return;
            }
            const b = dragBubble;
            b.dragging = false;
            dragBubble = null;
            // throw momentum from the last few pointer samples
            if (recent.length >= 2) {
                const first = recent[0];
                const last = recent[recent.length - 1];
                const dt = Math.max(16, last.t - first.t);
                b.vx = Math.max(-18, Math.min(18, ((last.x - first.x) / dt) * 14));
                b.vy = Math.max(-18, Math.min(18, ((last.y - first.y) / dt) * 14));
            }
            if (!didDrag) toggleBubble(b.el);
        }

        let resizeTimer = null;
        function onResize() {
            const newW = container.offsetWidth;
            const newH = container.offsetHeight;
            if (Math.abs(newW - W) > 80) {
                // big change (rotation, window resize): rebuild so sizes fit the arena
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => { if (started) build(); }, 250);
            }
            W = newW;
            H = newH;
        }

        container.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('resize', onResize);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    build();
                    tick();
                }
            });
        }, { threshold: 0.05 });
        observer.observe(container);

        return () => {
            observer.disconnect();
            if (animId) cancelAnimationFrame(animId);
            container.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className="bubble-arena-wrap">
            <p className="bubble-hint">
                <em>Drag them, throw them, knock them around — click one to see inside.</em>
            </p>
            <div className="bubble-arena" ref={containerRef} aria-label="Interactive skill bubbles" />
        </div>
    );
}

export default SkillBubbles;
