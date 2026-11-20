import { useEffect, useRef, useState } from 'react';

// The drum order on a split-flap module: each cell turns forward through this until it shows its letter.
const DRUM = ' ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789+-/.:·';
const STEP_MS = 34;
const STAGGER = 2; // ticks of delay per cell, so the board settles left to right

const still = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const target = (text, cells) => {
  const t = text.toUpperCase();
  return cells ? t.slice(0, cells).padEnd(cells, ' ') : t;
};

/** A row of split-flap cells showing `text`; screen readers get the plain text. */
export default function Flap({ text, cells, className = '' }) {
  const goal = target(text, cells);
  let [shown, setShown] = useState(() => ' '.repeat(goal.length));
  const current = useRef(shown); // only the ticker below changes `shown`, so it owns this copy

  useEffect(() => {
    if (still()) return;
    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      const cur = current.current.padEnd(goal.length, ' ').slice(0, goal.length);
      const next = [...goal].map((want, i) => {
        const have = cur[i];
        if (have === want || tick < i * STAGGER) return have;
        // Letters the drum lacks (rare punctuation) drop in directly.
        const at = DRUM.indexOf(have);
        return DRUM.includes(want) && at >= 0 ? DRUM[(at + 1) % DRUM.length] : want;
      }).join('');
      current.current = next;
      setShown(next);
      if (next === goal) clearInterval(id);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [goal]);

  if (still()) shown = goal;

  // Group cells by word so a narrow board wraps between words, never inside one.
  const words = [];
  [...shown].forEach((ch, i) => {
    if (i === 0 || (goal[i] === ' ') !== (goal[i - 1] === ' ')) words.push([]);
    words[words.length - 1].push([ch, i]);
  });

  return (
    <span className={`flap ${className}`}>
      <span className="sr-only">{text}</span>
      <span className="flap-cells" aria-hidden="true">
        {words.map(w => (
          <span className={goal[w[0][1]] === ' ' ? 'flap-word flap-gap' : 'flap-word'} key={w[0][1]}>
            {w.map(([ch, i]) => <span className="flap-cell" key={i}><span key={ch}>{ch}</span></span>)}
          </span>
        ))}
      </span>
    </span>
  );
}
