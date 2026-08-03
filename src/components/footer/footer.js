import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer className="site-footer">
            <p>© 2026 Caige Middaugh — Powered by caffeine.</p>
            <ul>
                <li><a href="https://github.com/caige13" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/caigemiddaugh/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
                <li><a href="mailto:caige.middaugh@hotmail.com">Email</a></li>
            </ul>
        </footer>
    );
}

export default Footer;
