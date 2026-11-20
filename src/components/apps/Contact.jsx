import { useState } from 'react';
import { person } from '../../data/portfolio';

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Your email', type: 'email', autoComplete: 'email', required: true },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', required: false },
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
    <div className="contact-grid">
      <div>
        <a className="contact-email" href={`mailto:${person.email}?subject=${encodeURIComponent('gfedolfi.dev')}`}>{person.email}</a>
        <div className="actions">
          <a className="btn btn--ink" href={`mailto:${person.email}?subject=${encodeURIComponent('gfedolfi.dev')}`}>Write an email</a>
          <button type="button" className="btn" onClick={copyEmail}>{copied ? 'Copied' : 'Copy address'}</button>
          <span className="sr-only" role="status">{copied ? 'Email address copied' : ''}</span>
        </div>
        <p className="muted">
          Also on <a href={person.github} target="_blank" rel="noopener noreferrer">GitHub</a> and{' '}
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
      </div>

      {canSend && (
        status === 'sent' ? (
          <div className="form-done" role="status">
            <p>Sent. I'll reply to the address you gave.</p>
            <button type="button" className="btn" onClick={() => setStatus('idle')}>Write another</button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSend} aria-label="Send a message">
            {FIELDS.map(f => (
              <label key={f.name} className="form-field">
                <span>{f.label}{f.required ? '' : ' (optional)'}</span>
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
            <label className="form-field">
              <span>Message</span>
              <textarea name="body" rows={5} value={form.body} onChange={handleChange} required />
            </label>
            <div className="actions">
              <button type="submit" className="btn btn--go" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </div>
            {status === 'error' && (
              <p className="form-error" role="alert">
                Couldn't send. Email me directly at <a href={`mailto:${person.email}`}>{person.email}</a>; your text is still here.
              </p>
            )}
          </form>
        )
      )}
    </div>
  );
}
