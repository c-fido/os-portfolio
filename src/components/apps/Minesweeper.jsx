import { useState, useCallback, useEffect } from 'react';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false, revealed: false, flagged: false, adjacent: 0,
    }))
  );
}

function placeMines(grid, safeRow, safeCol) {
  const next = grid.map(r => r.map(c => ({ ...c })));
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!next[r][c].mine && !(r === safeRow && c === safeCol)) {
      next[r][c].mine = true;
      placed++;
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (next[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && next[nr][nc].mine) count++;
        }
      }
      next[r][c].adjacent = count;
    }
  }
  return next;
}

function floodReveal(grid, row, col) {
  const next = grid.map(r => r.map(c => ({ ...c })));
  const stack = [[row, col]];
  while (stack.length) {
    const [r, c] = stack.pop();
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
    const cell = next[r][c];
    if (cell.revealed || cell.flagged || cell.mine) continue;
    cell.revealed = true;
    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }
  return next;
}

const NUM_COLORS = ['', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080'];

function SevenSegDisplay({ value }) {
  const str = String(Math.max(0, Math.min(999, value))).padStart(3, '0');
  return <div className="mine-seven-seg">{str}</div>;
}

export default function Minesweeper() {
  const [grid, setGrid] = useState(createEmptyGrid);
  const [status, setStatus] = useState('idle');
  const [minesLeft, setMinesLeft] = useState(MINES);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const reset = useCallback(() => {
    setGrid(createEmptyGrid());
    setStatus('idle');
    setMinesLeft(MINES);
    setTime(0);
  }, []);

  const handleClick = useCallback((row, col) => {
    if (status === 'won' || status === 'lost') return;

    setGrid(prev => {
      const cell = prev[row][col];
      if (cell.revealed || cell.flagged) return prev;

      let current = prev;
      if (status === 'idle') {
        current = placeMines(prev, row, col);
        setStatus('playing');
      }

      if (current[row][col].mine) {
        const next = current.map(r => r.map(c => ({
          ...c,
          revealed: c.mine ? true : c.revealed,
        })));
        next[row][col].exploded = true;
        setStatus('lost');
        return next;
      }

      const next = floodReveal(current, row, col);
      const unrevealed = next.flat().filter(c => !c.revealed && !c.mine).length;
      if (unrevealed === 0) setStatus('won');
      return next;
    });
  }, [status]);

  const handleRightClick = useCallback((e, row, col) => {
    e.preventDefault();
    if (status === 'won' || status === 'lost') return;
    setGrid(prev => {
      const cell = prev[row][col];
      if (cell.revealed) return prev;
      const next = prev.map(r => r.map(c => ({ ...c })));
      next[row][col].flagged = !cell.flagged;
      setMinesLeft(m => cell.flagged ? m + 1 : m - 1);
      return next;
    });
  }, [status]);

  const face = status === 'won' ? ':D' : status === 'lost' ? 'X(' : ':)';

  return (
    <div className="mine-game">
      <div className="mine-panel">
        <div className="mine-header">
          <SevenSegDisplay value={minesLeft} />
          <button className="mine-face-btn" onClick={reset} title="New Game">{face}</button>
          <SevenSegDisplay value={Math.min(time, 999)} />
        </div>

        <div
          className="mine-grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 30px)`,
            gridTemplateRows: `repeat(${ROWS}, 30px)`,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isRevealed = cell.revealed;
              const isExploded = cell.exploded;
              let cellClass = 'mine-cell mine-cell--hidden';
              if (isRevealed) {
                cellClass = isExploded ? 'mine-cell mine-cell--revealed mine-cell--exploded' : 'mine-cell mine-cell--revealed';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  className={cellClass}
                  onClick={() => handleClick(r, c)}
                  onContextMenu={e => handleRightClick(e, r, c)}
                >
                  {isRevealed
                    ? cell.mine
                      ? <span style={{ fontWeight: 'bold' }}>*</span>
                      : cell.adjacent > 0
                        ? <span style={{ color: NUM_COLORS[cell.adjacent] }}>{cell.adjacent}</span>
                        : null
                    : cell.flagged
                      ? <span style={{ color: '#cc0000', fontWeight: 'bold' }}>F</span>
                      : null}
                </button>
              );
            })
          )}
        </div>

        {(status === 'won' || status === 'lost') && (
          <div className="mine-status-banner">
            <span style={{ color: status === 'won' ? '#008000' : '#cc0000' }}>
              {status === 'won' ? 'You Win!' : 'Game Over!'}
            </span>
            <button className="win95-btn" onClick={reset} style={{ marginLeft: '12px', minWidth: 'auto', padding: '3px 12px' }}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
