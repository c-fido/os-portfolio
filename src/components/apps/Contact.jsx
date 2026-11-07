import { useState } from 'react';
import { person } from '../../data/portfolio';
import Stamp from '../archive/Stamp';

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

const FIELDS = [
  { name: 'name', label: 'Name', gloss: 'Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Von', gloss: 'Your email', type: 'email', autoComplete: 'email', required: true },
  { name: 'subject', label: 'Betreff', gloss: 'Subject', type: 'text', autoComplete: 'off', required: false },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);
  const canSend = Boolean(FORM_ENDPOINT);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy email address:', person.email);
    }
  };

  const handleSend = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _replyto: form.email,
          _subject: form.subject || `gfedolfi.dev — message from ${form.name}`,
          message: form.body,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', body: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <h2 className="page-title" data-ordner-heading tabIndex={-1}>Posteingang <span>Contact</span></h2>

      <section className="page-section">
        <dl className="form-rows">
          <dt>An <span>To</span></dt>
          <dd><a href={`mailto:${person.email}?subject=${encodeURIComponent('gfedolfi.dev')}`}>{person.email}</a></dd>
          <dt>GitHub</dt>
          <dd><a href={person.github} target="_blank" rel="noopener noreferrer">{person.github.replace('https://', '')}</a></dd>
          <dt>LinkedIn</dt>
          <dd><a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn profile</a></dd>
        </dl>
        <div className="page-actions">
          <a className="btn btn--primary" href={`mailto:${person.email}?subject=${encodeURIComponent('gfedolfi.dev')}`}>Write an email</a>
          <button type="button" className="btn" onClick={copyEmail}>{copied ? 'Copied' : 'Copy email'}</button>
          <span className="sr-only" role="status">{copied ? 'Email address copied' : ''}</span>
        </div>
      </section>

      {canSend && (
        <section className="page-section">
          <h3 className="section-title">Formular <span>Send a message here</span></h3>
          {status === 'sent' ? (
            <div className="form-done" role="status">
              <Stamp tone="blue">Erledigt</Stamp>
              <p>Sent. I'll reply to the address you gave.</p>
              <button type="button" className="btn btn--quiet" onClick={() => setStatus('idle')}>Write another</button>
            </div>
          ) : (
            <form className="formular" onSubmit={handleSend}>
              {FIELDS.map(f => (
                <label key={f.name} className="formular-field">
                  <span className="formular-label">{f.label} <span>{f.gloss}{f.required ? '' : ' (optional)'}</span></span>
                  <input
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    value={form[f.name]}
                    onChange={handleChange}
                    required={f.required}
                  />
                </label>
              ))}
              <label className="formular-field">
                <span className="formular-label">Nachricht <span>Message</span></span>
                <textarea name="body" rows={6} value={form.body} onChange={handleChange} required />
              </label>
              <div className="page-actions">
                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                {status === 'error' && (
                  <p className="form-error" role="alert">
                    Couldn't send. Email me directly at <a href={`mailto:${person.email}`}>{person.email}</a>; your text is still here.
                  </p>
                )}
              </div>
            </form>
          )}
        </section>
      )}
    </>
  );
}
