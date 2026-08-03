import React, { useState } from 'react';
import './contact.css';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(process.env.REACT_APP_CONTACT_URL || '/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setStatus('success');
            setForm({ name: '', email: '', message: '', website: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="section contact">
            <div className="container contact-inner">
                <div className="eyebrow center">Let's work together</div>
                <h2>Let's <em className="squiggle">build</em> something.</h2>
                <p className="contact-sub">
                    Open to senior engineering roles, founding engineer opportunities, and freelance
                    projects. Tell me what you're dreaming of — I reply within a day.
                </p>

                {status === 'success' ? (
                    <div className="form-success card">
                        <h3>Got it! 🎉</h3>
                        <p>Thanks for reaching out — I'll get back to you within a day.</p>
                    </div>
                ) : (
                    <form className="contact-form card" onSubmit={submit}>
                        <div className="form-row">
                            <label>
                                Name
                                <input
                                    type="text" name="name" value={form.name} onChange={update}
                                    placeholder="Your name" required maxLength={100}
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type="email" name="email" value={form.email} onChange={update}
                                    placeholder="you@example.com" required maxLength={254}
                                />
                            </label>
                        </div>
                        <label>
                            Message
                            <textarea
                                name="message" value={form.message} onChange={update} rows={5}
                                placeholder="A project, a role, or just a hello…" required
                                minLength={10} maxLength={5000}
                            />
                        </label>
                        {/* honeypot — humans never see or fill this */}
                        <label className="hp-field" aria-hidden="true">
                            Website
                            <input
                                type="text" name="website" value={form.website} onChange={update}
                                tabIndex={-1} autoComplete="off"
                            />
                        </label>
                        <div className="form-actions">
                            <button className="btn btn-fill" type="submit" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending…' : 'Send it →'}
                            </button>
                            <span className="or-email">
                                or email <a href="mailto:caige.middaugh@hotmail.com">caige.middaugh@hotmail.com</a>
                            </span>
                        </div>
                        {status === 'error' && (
                            <p className="form-error" role="alert">
                                Hmm, that didn't go through. Try again, or email me directly
                                at <a href="mailto:caige.middaugh@hotmail.com">caige.middaugh@hotmail.com</a>.
                            </p>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
}

export default Contact;
