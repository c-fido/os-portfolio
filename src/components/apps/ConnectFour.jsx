import { useState, useCallback, useEffect, useRef } from 'react';

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const HUMAN = 1;
const BOT = 2;

const PIECE_COLOR = {
  [HUMAN]: '#e82020',
  [BOT]:   '#f0c020',
};

function makeBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function getLowestEmpty(board, col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) return row;
  }
  return -1;
}

function applyDrop(board, col, player) {
  const row = getLowestEmpty(board, col);
  if (row === -1) return null;
  const next = board.map(r => [...r]);
  next[row][col] = player;
  return { board: next, row };
}

function findWin(board, player) {
  const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== player) continue;
      for (const [dr, dc] of dirs) {
        const cells = [];
        for (let i = 0; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== player) break;
          cells.push(`${nr},${nc}`);
        }
        if (cells.length === 4) return new Set(cells);
      }
    }
  }
  return null;
}

function isFull(board) {
  return board[0].every(c => c !== EMPTY);
}

function scoreWindow(win, player) {
  const opp = player === BOT ? HUMAN : BOT;
  const p = win.filter(c => c === player).length;
  const e = win.filter(c => c === EMPTY).length;
  const o = win.filter(c => c === opp).length;
  if (o > 0 && p > 0) return 0;
  if (p === 4) return 100;
  if (p === 3 && e === 1) return 5;
  if (p === 2 && e === 2) return 2;
  if (o === 3 && e === 1) return -4;
  return 0;
}

function heuristic(board) {
  let score = 0;
  const center = Math.floor(COLS / 2);
  for (let r = 0; r < ROWS; r++) {
    if (board[r][center] === BOT) score += 3;
    if (board[r][center] === HUMAN) score -= 3;
  }
  const windows = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      windows.push([board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]]);
  for (let c = 0; c < COLS; c++)
    for (let r = 0; r <= ROWS - 4; r++)
      windows.push([board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]]);
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      windows.push([board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]]);
  for (let r = 3; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      windows.push([board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]]);
  for (const w of windows) score += scoreWindow(w, BOT);
  return score;
}

function minimax(board, depth, alpha, beta, isMax) {
  if (findWin(board, BOT))   return { score:  100000 };
  if (findWin(board, HUMAN)) return { score: -100000 };
  if (isFull(board) || depth === 0) return { score: heuristic(board) };

  const cols = [];
  for (let c = 0; c < COLS; c++) {
    if (getLowestEmpty(board, c) !== -1) cols.push(c);
  }
  cols.sort((a, b) => Math.abs(a - 3) - Math.abs(b - 3));

  let bestCol = cols[0];
  let bestScore = isMax ? -Infinity : Infinity;

  for (const col of cols) {
    const result = applyDrop(board, col, isMax ? BOT : HUMAN);
    if (!result) continue;
    const { score } = minimax(result.board, depth - 1, alpha, beta, !isMax);
    if (isMax ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestCol = col;
    }
    if (isMax) alpha = Math.max(alpha, score);
    else beta = Math.min(beta, score);
    if (alpha >= beta) break;
  }
  return { score: bestScore, col: bestCol };
}

export function getBotMove(board) {
  const validCols = [];
  for (let c = 0; c < COLS; c++) {
    if (getLowestEmpty(board, c) !== -1) validCols.push(c);
  }
  if (validCols.length === 0) return null;
  const { col } = minimax(board, 6, -Infinity, Infinity, true);
  return col ?? validCols[Math.floor(validCols.length / 2)];
}

export default function ConnectFour() {
  const [board, setBoard] = useState(makeBoard);
  const [turn, setTurn] = useState(HUMAN);
  const [status, setStatus] = useState('playing');
  const [winCells, setWinCells] = useState(null);
  const [scores, setScores] = useState({ human: 0, bot: 0 });
  const [hoverCol, setHoverCol] = useState(null);
  const [lastDrop, setLastDrop] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const boardRef = useRef(null);
  const [cellSize, setCellSize] = useState(52);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCellSize(Math.floor(Math.min(width / COLS, height / ROWS)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const resetGame = useCallback(() => {
    setBoard(makeBoard());
    setTurn(HUMAN);
    setStatus('playing');
    setWinCells(null);
    setLastDrop(null);
    setIsThinking(false);
    setHoverCol(null);
  }, []);

  const resolveEnd = useCallback((nextBoard, player) => {
    const win = findWin(nextBoard, player);
    if (win) {
      setWinCells(win);
      setStatus(player === HUMAN ? 'human_win' : 'bot_win');
      setScores(s => ({
        human: player === HUMAN ? s.human + 1 : s.human,
        bot:   player === BOT   ? s.bot   + 1 : s.bot,
      }));
      setTimeout(resetGame, 2500);
      return true;
    }
    if (isFull(nextBoard)) {
      setStatus('draw');
      setTimeout(resetGame, 2000);
      return true;
    }
    return false;
  }, [resetGame]);

  const handleColumnClick = useCallback((col) => {
    if (status !== 'playing' || turn !== HUMAN || isThinking) return;
    if (getLowestEmpty(board, col) === -1) return;

    const humanResult = applyDrop(board, col, HUMAN);
    if (!humanResult) return;

    setBoard(humanResult.board);
    setLastDrop({ row: humanResult.row, col, id: Date.now() });

    if (resolveEnd(humanResult.board, HUMAN)) return;

    setTurn(BOT);
    setIsThinking(true);

    setTimeout(() => {
      const botCol = getBotMove(humanResult.board);
      if (botCol === null) return;
      const botResult = applyDrop(humanResult.board, botCol, BOT);
      if (botResult) {
        setBoard(botResult.board);
        setLastDrop({ row: botResult.row, col: botCol, id: Date.now() });
        resolveEnd(botResult.board, BOT);
      }
      setTurn(HUMAN);
      setIsThinking(false);
    }, 400);
  }, [board, status, turn, isThinking, resolveEnd]);

  const statusLabel = (() => {
    if (status === 'human_win') return 'You Win!';
    if (status === 'bot_win') return 'Bot Wins!';
    if (status === 'draw') return 'Draw!';
    if (isThinking) return 'Bot thinking...';
    return 'Your turn';
  })();

  return (
    <div className="c4-game">
      <div className="c4-scorebar">
        <div className="c4-scorebar-side">
          <div className="c4-piece-dot" style={{ background: PIECE_COLOR[HUMAN] }} />
          <span>You</span>
          <strong>{scores.human}</strong>
        </div>
        <span className="c4-status">{statusLabel}</span>
        <div className="c4-scorebar-side c4-scorebar-side--right">
          <strong>{scores.bot}</strong>
          <span>Bot</span>
          <div className="c4-piece-dot" style={{ background: PIECE_COLOR[BOT] }} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: cellSize }}>
            {Array.from({ length: COLS }, (_, c) => (
              <div
                key={c}
                style={{ width: cellSize, height: cellSize, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
                onClick={() => handleColumnClick(c)}
                onMouseEnter={() => setHoverCol(c)}
                onMouseLeave={() => setHoverCol(null)}
              >
                {hoverCol === c && status === 'playing' && turn === HUMAN && !isThinking && getLowestEmpty(board, c) !== -1 && (
                  <div className="c4-disc" style={{
                    width: cellSize * 0.72, height: cellSize * 0.72,
                    background: PIECE_COLOR[HUMAN], opacity: 0.45,
                  }} />
                )}
              </div>
            ))}
          </div>

          <div
            ref={boardRef}
            className="c4-board-frame"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
              minWidth: cellSize * COLS,
              minHeight: cellSize * ROWS,
            }}
          >
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: COLS }, (_, c) => {
                const player = board[r][c];
                const isWin = winCells?.has(`${r},${c}`);
                const isNew = lastDrop?.col === c && lastDrop?.row === r;
                const dropFromY = -((r + 1) * cellSize);
                const discSize = cellSize * 0.74;

                return (
                  <div
                    key={`${r}-${c}`}
                    style={{ position: 'relative', width: cellSize, height: cellSize, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
                    onClick={() => handleColumnClick(c)}
                    onMouseEnter={() => setHoverCol(c)}
                    onMouseLeave={() => setHoverCol(null)}
                  >
                    <div className="c4-hole" style={{
                      position: 'absolute', width: discSize, height: discSize,
                    }} />
                    {player !== EMPTY && (
                      <div
                        key={isNew ? `drop-${lastDrop.id}` : `piece-${r}-${c}`}
                        className={`c4-disc${isWin ? ' c4-disc--win' : ''}`}
                        style={{
                          position: 'absolute', zIndex: 1,
                          width: discSize, height: discSize,
                          background: PIECE_COLOR[player],
                          '--c4-from': `${dropFromY}px`,
                          animation: isNew ? 'c4-drop 0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards' : 'none',
                        }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderTop: '1px solid #808080', flexShrink: 0 }}>
        <button className="win95-btn" onClick={resetGame}>New Game</button>
      </div>
    </div>
  );
}
