import { useState, useRef, useEffect, useCallback } from 'react';
import { person, skills, projects } from '../../data/portfolio';
import { ALL_ORDNER } from '../../lib/archive';

const PROMPT = 'gast@akte:~$';
const TERM_FONT = '13px';
const SHELL_NAME = 'Portfolio Shell';
const SHELL_VERSION = '1.00';
const BOOT_BANNER = [
  '   _____ _                            _       ',
  '  / ____(_)                          | |      ',
  ' | |  __ _  __ _ _ __   ___ __ _ _ __| | ___  ',
  " | | |_ | |/ _` | '_ \\ / __/ _` | '__| |/ _ \\ ",
  ' | |__| | | (_| | | | | (_| (_| | |  | | (_) |',
  '  \\_____|_|\\__,_|_| |_|\\___\\__,_|_|  |_|\\___/ ',
].join('\n');

const COMMANDS = {
  help: () => `
Available commands:
  help          Show this help message
  ls            List the Ordner on the shelf
  open <name>   Pull an Ordner onto the desk (e.g. open remindr)
  about         Who am I?
  skills        List my technical skills
  projects      List projects
  contact       How to reach me
  clear         Clear the screen
  whoami        Print current user
  date          Print current date
  ver           System version
  hire          Make me an offer!

Type any command and press Enter.
`.trim(),

  about: () => `
${person.name} -- ${person.title}
Location: ${person.location}

Former SWE intern at turingpoint (Hamburg). I ship systems in C++ and Go —
Remindr is live at remindr.gfedolfi.dev. Also a research assistant in
bioinformatics and additive manufacturing at Wesleyan.

Type skills, projects, or contact for more info.
`.trim(),

  whoami: () => `${person.name.toLowerCase().replace(' ', '-')}`,

  ver: () => `${SHELL_NAME}  Version ${SHELL_VERSION}\nCopyright (C) ${person.name}. All rights reserved.`,

  date: () => `Current date is: ${new Date().toLocaleDateString()}`,

  skills: () => {
    const lines = Object.entries(skills).map(([cat, items]) => {
      const bar = '█'.repeat(Math.min(items.length, 8));
      return `  ${cat.padEnd(12)} ${bar}  ${items.join(', ')}`;
    });
    return `Technical Skills:\n${lines.join('\n')}`;
  },

  projects: () => {
    const listed = projects.filter(p => p.featured);
    const lines = listed.map((p, i) => {
      const link = p.demo ? `  ${p.demo}` : p.github ? `  ${p.github}` : '';
      return `  ${String(i + 1).padStart(2, '0')}  ${p.title.padEnd(22)} ${p.tags.slice(0, 2).join(', ')}${link ? '\n' + link : ''}`;
    });
    return `Directory of PROJECTS\n${lines.join('\n')}\n       ${listed.length} file(s)`;
  },

  contact: () => `
Contact ${person.name}:

  E-Mail    ${person.email}
  LinkedIn  ${person.linkedin}
  GitHub    ${person.github}
  Website   ${person.website}

Or run: open posteingang
`.trim(),

  hire: () => `
$ hire ${person.name}

Verifying credentials...
Processing resume...

SUCCESS: ${person.name} is available for hire!

Contact: ${person.email}

(Just kidding, but seriously -- let's talk!)
`.trim(),
};

const fold = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function listOrdner() {
  return ALL_ORDNER.map(o => `  ${o.number}  ${o.id.padEnd(12)} ${o.label} (${o.gloss})`).join('\n');
}

function processCommand(input, onOpenOrdner) {
  const [name = '', ...args] = input.trim().split(/\s+/);
  const cmd = name.toLowerCase();
  if (!cmd) return null;
  if (cmd === 'cls' || cmd === 'clear') return 'CLEAR';
  if (cmd === 'ls' || cmd === 'dir') return listOrdner();
  if (cmd === 'open' || cmd === 'cd') {
    const query = fold(args.join(' '));
    if (!query) return 'usage: open <name>   (run ls to see names)';
    const match = ALL_ORDNER.find(o => [o.id, o.label, o.gloss].some(v => fold(v) === query))
      || ALL_ORDNER.find(o => [o.id, o.label, o.gloss].some(v => fold(v).startsWith(query)));
    if (!match) return `open: no Ordner called "${args.join(' ')}". Run ls to see names.`;
    onOpenOrdner?.(match.id);
    return `Pulling ${match.label} (${match.gloss}) from the shelf…`;
  }
  const handler = COMMANDS[cmd];
  if (handler) return handler();
  return `${cmd}: command not found\nType help for available commands.`;
}

export default function Terminal({ onOpenOrdner }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `${BOOT_BANNER}\n\n${SHELL_NAME}  Version ${SHELL_VERSION}\nCopyright (C) ${person.name}. All rights reserved.\n`,
    },
    {
      type: 'system',
      text: 'Type help to see all commands!',
    },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll only the terminal output, never the page around it.
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const submit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;

    const result = processCommand(cmd, onOpenOrdner);
    setCmdHistory(h => [cmd, ...h]);
    setHistoryIdx(-1);

    if (result === 'CLEAR') {
      setHistory([]);
      setInput('');
      return;
    }

    setHistory(h => [
      ...h,
      { type: 'input', text: cmd },
      ...(result ? [{ type: 'output', text: result }] : []),
    ]);
    setInput('');
  }, [input, onOpenOrdner]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    }
  }, [submit, historyIdx, cmdHistory]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#000000',
        fontFamily: 'var(--font-mono)',
        fontSize: TERM_FONT,
        cursor: 'text',
        color: '#c0c0c0',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div
        ref={outputRef}
        style={{ flex: 1, overflow: 'auto', padding: '8px', lineHeight: 1.9 }}
      >
        {history.map((entry, i) => (
          <div key={i}>
            {entry.type === 'input' ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#c0c0c0', flexShrink: 0 }}>{PROMPT}</span>
                <span style={{ color: '#ffffff' }}>{entry.text}</span>
              </div>
            ) : (
              <pre style={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.9,
                color: entry.type === 'system' && entry.text.startsWith('Type help')
                  ? '#00ff00'
                  : entry.type === 'system' ? '#808080' : '#c0c0c0',
                margin: '0 0 4px',
              }}>
                {entry.text}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Input line */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 8px',
        borderTop: '1px solid #404040',
        background: '#000000',
      }}>
        <span style={{ color: '#c0c0c0', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: TERM_FONT }}>
          {PROMPT}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: TERM_FONT,
            caret: 'block',
            caretColor: '#c0c0c0',
          }}
          aria-label="Terminal command"
          placeholder=""
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
        <span className="terminal-cursor" style={{ color: '#c0c0c0', fontFamily: 'var(--font-mono)', fontSize: TERM_FONT }}>█</span>
      </div>
    </div>
  );
}
