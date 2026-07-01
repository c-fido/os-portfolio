import { useState, useRef, useEffect, useCallback } from 'react';
import { person, skills, projects } from '../../data/portfolio';

const PROMPT = `C:\\PORTFOLIO>`;
const TERM_FONT = '11px';
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
  HELP          Show this help message
  ABOUT         Who am I?
  SKILLS        List my technical skills
  PROJECTS      List projects
  CONTACT       How to reach me
  CLS           Clear the screen
  WHOAMI        Print current user
  DATE          Print current date
  VER           System version
  HIRE          Make me an offer!

Type any command and press Enter.
`.trim(),

  about: () => `
${person.name} -- ${person.title}
Location: ${person.location}

I'm a Computer Science & German student at Wesleyan University (Class of 2027) based in Connecticut. I enjoy building things, from web apps and terminal games to bioinformatics pipelines.

Currently building Remindr (CLI reminder tool + web sync at remindr.gfedolfi.dev), doing bioinformatics research, and additive manufacturing simulation work at Wesleyan.

Type SKILLS, PROJECTS, or CONTACT for more info.
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
    const lines = projects.map((p, i) => {
      const link = p.demo ? `  ${p.demo}` : p.github ? `  ${p.github}` : '';
      return `  ${String(i + 1).padStart(2, '0')}  ${p.title.padEnd(22)} ${p.tags.slice(0, 2).join(', ')}${link ? '\n' + link : ''}`;
    });
    return `Directory of PROJECTS\n${lines.join('\n')}\n       ${projects.length} file(s)`;
  },

  contact: () => `
Contact ${person.name}:

  E-Mail    ${person.email}
  LinkedIn  ${person.linkedin}
  GitHub    ${person.github}
  Website   ${person.website}

Or open Contact.exe from the desktop.
`.trim(),

  hire: () => `
C:\\PORTFOLIO> HIRE ${person.name}

Verifying credentials...
Processing resume...

SUCCESS: ${person.name} is available for hire!

Contact: ${person.email}

(Just kidding, but seriously -- let's talk!)
`.trim(),
};

function processCommand(input) {
  const cmd = input.trim().toUpperCase();
  if (!cmd) return null;
  if (cmd === 'CLS') return 'CLEAR';
  const handler = COMMANDS[cmd.toLowerCase()];
  if (handler) return handler();
  return `Bad command or file name: ${cmd}\nType HELP for available commands.`;
}

export default function Terminal() {
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
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  const submit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;

    const result = processCommand(cmd);
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
  }, [input]);

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
        fontFamily: '"Press Start 2P", monospace',
        fontSize: TERM_FONT,
        cursor: 'text',
        color: '#c0c0c0',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div
        className="os-scrollbar"
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
        <div ref={bottomRef} />
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
        <span style={{ color: '#c0c0c0', flexShrink: 0, fontFamily: '"Press Start 2P", monospace', fontSize: TERM_FONT }}>
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
            fontFamily: '"Press Start 2P", monospace',
            fontSize: TERM_FONT,
            caret: 'block',
            caretColor: '#c0c0c0',
          }}
          placeholder=""
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
        <span className="terminal-cursor" style={{ color: '#c0c0c0', fontFamily: '"Press Start 2P", monospace', fontSize: TERM_FONT }}>█</span>
      </div>
    </div>
  );
}
