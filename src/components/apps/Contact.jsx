import { useState } from 'react';
import { person } from '../../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSend = e => {
    e.preventDefault();
    const mailto = `mailto:${person.email}?subject=${encodeURIComponent(form.subject || 'Hello from your portfolio!')}&body=${encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.body}`)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy email address:', person.email);
    }
  };

  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-surface)' }}>
      <div className="win95-app-toolbar" style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '3px 6px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0,
      }}>
        <button type="button" className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px' }} onClick={handleSend}>
          Send
        </button>
        <button type="button" className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px' }} onClick={copyEmail}>
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </div>

      <form onSubmit={handleSend} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border-dark)', flexShrink: 0 }}>
          {[
            { label: 'To:', value: person.email, readOnly: true, name: '_to' },
            { label: 'From:', placeholder: 'your@email.com', name: 'email' },
            { label: 'Name:', placeholder: 'Your Name', name: 'name' },
            { label: 'Subject:', placeholder: "What's on your mind?", name: 'subject' },
          ].map(field => (
            <div key={field.name} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--color-border-dark)' }}>
              <span style={{ width: '72px', padding: '0 10px', flexShrink: 0, fontWeight: 'bold', fontSize: 'var(--text-xs)' }}>
                {field.label}
              </span>
              {field.readOnly ? (
                <span style={{ flex: 1, padding: '5px 6px', color: '#333' }}>{field.value}</span>
              ) : (
                <input
                  name={field.name}
                  type={field.name === 'email' ? 'email' : 'text'}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="win95-input"
                  style={{ flex: 1, margin: '3px 6px 3px 0' }}
                  required={field.name === 'email' || field.name === 'name'}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, padding: '6px', overflow: 'hidden' }}>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder={`Hi ${person.name},\n\nI'd love to chat about...`}
            className="win95-input os-scrollbar text-prose"
            style={{ width: '100%', height: '100%', resize: 'none', padding: '8px' }}
            required
          />
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 10px', borderTop: '1px solid var(--color-border-dark)', flexShrink: 0, gap: '8px', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <a href={person.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-title-active)' }}>GitHub</a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-title-active)' }}>LinkedIn</a>
            <a href={`mailto:${person.email}`} style={{ color: 'var(--color-title-active)' }}>Email</a>
          </div>
          {sent ? (
            <span style={{ color: '#008000' }}>Opening email client...</span>
          ) : (
            <button type="submit" className="win95-btn">Send Message</button>
          )}
        </div>
      </form>
    </div>
  );
}
