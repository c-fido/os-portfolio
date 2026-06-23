import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const GRID = 20;
const INIT_SPEED = 160;
const MIN_SPEED  = 65;
const SPEED_STEP = 4;

const C = {
  bg:       '#0a0a12',
  gridLine: 'rgba(0, 255, 65, 0.06)',
  head:     '#00ff41',
  body:     '#00aa2a',
  food:     '#ff3355',
  foodHi:   '#ff8899',
};

function randPos(snake) {
  let p;
  do {
    p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some(s => s.x === p.x && s.y === p.y));
  return p;
}

function makeInitState() {
  const cx = Math.floor(GRID / 2);
  const cy = Math.floor(GRID / 2);
  const snake = [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }];
  return {
    snake, food: randPos(snake),
    dir: { dx: 1, dy: 0 }, nextDir: { dx: 1, dy: 0 },
    score: 0, speed: INIT_SPEED, lastTick: 0,
  };
}

export default function Snake({ onTitleChange }) {
  const canvasRef  = useRef(null);
  const gameRef    = useRef(makeInitState());
  const phaseRef   = useRef('idle');
  const rafRef     = useRef(null);
  const tickFnRef  = useRef(null);

  const [phase, setPhase]         = useState('idle');
  const [score, setScore]         = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem('snake-hs') || '0', 10),
  );

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const W = canvas.width;
    const H = canvas.height;
    const cell = Math.floor(Math.min(W, H) / GRID);
    const ox   = Math.floor((W - cell * GRID) / 2);
    const oy   = Math.floor((H - cell * GRID) / 2);
    const s    = gameRef.current;

    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = C.gridLine;
    for (let i = 0; i <= GRID; i++) {
      ctx.fillRect(ox + i * cell, oy, 1, GRID * cell);
      ctx.fillRect(ox, oy + i * cell, GRID * cell, 1);
    }

    ctx.fillStyle = C.food;
    ctx.fillRect(ox + s.food.x * cell + 2, oy + s.food.y * cell + 2, cell - 4, cell - 4);
    ctx.fillStyle = C.foodHi;
    ctx.fillRect(ox + s.food.x * cell + 2, oy + s.food.y * cell + 2, 3, 3);

    s.snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? C.head : C.body;
      ctx.fillRect(ox + seg.x * cell + 1, oy + seg.y * cell + 1, cell - 2, cell - 2);
      if (isHead) {
        ctx.fillStyle = '#ccffcc';
        ctx.fillRect(ox + seg.x * cell + 2, oy + seg.y * cell + 2, 3, 3);
      }
    });
  }, []);

  const endGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    phaseRef.current = 'gameover';
    setPhase('gameover');
    const finalScore = gameRef.current.score;
    const hs = Math.max(finalScore, parseInt(localStorage.getItem('snake-hs') || '0', 10));
    localStorage.setItem('snake-hs', String(hs));
    setHighScore(hs);
    onTitleChange?.('Snake.app');
    drawFrame();
  }, [drawFrame, onTitleChange]);

  useLayoutEffect(() => {
    tickFnRef.current = (ts) => {
      if (phaseRef.current !== 'playing') return;
      const s = gameRef.current;
      drawFrame();

      if (ts - s.lastTick >= s.speed) {
        s.lastTick = ts;
        s.dir = s.nextDir;
        const head = { x: s.snake[0].x + s.dir.dx, y: s.snake[0].y + s.dir.dy };

        if (
          head.x < 0 || head.x >= GRID ||
          head.y < 0 || head.y >= GRID ||
          s.snake.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
          endGame();
          return;
        }

        const ate = head.x === s.food.x && head.y === s.food.y;
        s.snake = [head, ...s.snake];
        if (!ate) {
          s.snake.pop();
        } else {
          s.score += 1;
          s.food = randPos(s.snake);
          s.speed = Math.max(MIN_SPEED, s.speed - SPEED_STEP);
          setScore(s.score);
          onTitleChange?.(`Snake.app — Score: ${s.score}`);
        }
      }

      rafRef.current = requestAnimationFrame(ts2 => tickFnRef.current(ts2));
    };
  });

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    gameRef.current = makeInitState();
    gameRef.current.lastTick = performance.now();
    phaseRef.current = 'playing';
    setPhase('playing');
    setScore(0);
    onTitleChange?.('Snake.app — Score: 0');
    rafRef.current = requestAnimationFrame(ts => tickFnRef.current(ts));
  }, [onTitleChange]);

  const pauseGame = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    cancelAnimationFrame(rafRef.current);
    phaseRef.current = 'paused';
    setPhase('paused');
  }, []);

  const resumeGame = useCallback(() => {
    if (phaseRef.current !== 'paused') return;
    gameRef.current.lastTick = performance.now();
    phaseRef.current = 'playing';
    setPhase('playing');
    rafRef.current = requestAnimationFrame(ts => tickFnRef.current(ts));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawFrame();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => ro.disconnect();
  }, [drawFrame]);

  useEffect(() => {
    const onBlur = () => pauseGame();
    const onVisibility = () => { if (document.hidden) pauseGame(); };
    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pauseGame]);

  useEffect(() => {
    const DIR_MAP = {
      ArrowUp: { dx: 0, dy: -1 }, ArrowDown: { dx: 0, dy: 1 },
      ArrowLeft: { dx: -1, dy: 0 }, ArrowRight: { dx: 1, dy: 0 },
      w: { dx: 0, dy: -1 }, s: { dx: 0, dy: 1 },
      a: { dx: -1, dy: 0 }, d: { dx: 1, dy: 0 },
    };

    const onKey = (e) => {
      if (DIR_MAP[e.key]) e.preventDefault();
      if (phaseRef.current === 'idle' || phaseRef.current === 'gameover') { startGame(); return; }
      if (phaseRef.current === 'paused') { resumeGame(); return; }
      const newDir = DIR_MAP[e.key];
      if (!newDir) return;
      const cur = gameRef.current.dir;
      if (newDir.dx === -cur.dx && newDir.dy === -cur.dy) return;
      gameRef.current.nextDir = newDir;
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [startGame, resumeGame]);

  return (
    <div className="snake-screen">
      <div className="snake-hud">
        <span>SCORE {String(score).padStart(3, '0')}</span>
        <span>SNAKE.EXE</span>
        <span>BEST {String(highScore).padStart(3, '0')}</span>
      </div>

      <div className="snake-canvas-wrap">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {phase === 'idle' && (
          <div className="snake-overlay">
            <h2 style={{ color: '#00ff41' }}>SNAKE</h2>
            <p style={{ color: '#888' }}>Arrow keys or WASD to move</p>
            <button className="win95-btn" onClick={startGame} style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>Play</button>
            {highScore > 0 && <p style={{ color: '#666' }}>Best: {highScore}</p>}
          </div>
        )}

        {phase === 'paused' && (
          <div className="snake-overlay">
            <h2 style={{ color: '#fff' }}>PAUSED</h2>
            <p style={{ color: '#888' }}>Score: {score}</p>
            <button className="win95-btn" onClick={resumeGame} style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>Resume</button>
          </div>
        )}

        {phase === 'gameover' && (
          <div className="snake-overlay">
            <h2 style={{ color: '#ff3355' }}>GAME OVER</h2>
            <p>Score: <strong style={{ color: '#ffff00' }}>{score}</strong></p>
            <p style={{ color: '#666' }}>Best: {highScore}</p>
            <button className="win95-btn" onClick={startGame} style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>Play Again</button>
            <p style={{ color: '#444', fontSize: 'var(--text-xs)' }}>Press any key to restart</p>
          </div>
        )}
      </div>
    </div>
  );
}
