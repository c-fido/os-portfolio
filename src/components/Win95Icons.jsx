// Win95-style pixel-art SVG icons — all 32x32

const P = { imageRendering: 'pixelated', display: 'block', shapeRendering: 'crispEdges' };

// ── Windows 4-color flag ─────────────────────────────────────────────────────
export function WindowsFlag({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={P}>
      <rect x="0" y="0" width="6" height="6" fill="#ee2222" />
      <rect x="8" y="0" width="6" height="6" fill="#22cc22" />
      <rect x="0" y="8" width="6" height="6" fill="#2222ee" />
      <rect x="8" y="8" width="6" height="6" fill="#eecc00" />
      <rect x="6" y="0" width="2" height="14" fill="#000000" />
      <rect x="0" y="6" width="14" height="2" fill="#000000" />
    </svg>
  );
}

// ── Notepad — About.txt ──────────────────────────────────────────────────────
export function NotepadIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* shadow */}
      <rect x="6" y="5" width="20" height="24" fill="#808080" />
      {/* page */}
      <rect x="4" y="3" width="20" height="24" fill="#ffffff" />
      {/* dog-ear fold (top-right) */}
      <rect x="18" y="3" width="6" height="6" fill="#c8c8c8" />
      {/* fold shadow */}
      <rect x="18" y="8" width="6" height="1" fill="#000000" />
      <rect x="23" y="3" width="1" height="6" fill="#000000" />
      {/* fold crease */}
      <rect x="18" y="3" width="2" height="1" fill="#888888" />
      <rect x="20" y="4" width="2" height="1" fill="#888888" />
      <rect x="22" y="5" width="1" height="3" fill="#888888" />
      {/* red margin */}
      <rect x="9"  y="5"  width="1" height="20" fill="#cc0000" />
      {/* ruled text lines */}
      <rect x="11" y="8"  width="8"  height="1" fill="#8888cc" />
      <rect x="11" y="11" width="8"  height="1" fill="#8888cc" />
      <rect x="11" y="14" width="6"  height="1" fill="#8888cc" />
      <rect x="11" y="17" width="8"  height="1" fill="#8888cc" />
      <rect x="11" y="20" width="5"  height="1" fill="#8888cc" />
      <rect x="11" y="23" width="8"  height="1" fill="#8888cc" />
      {/* outline */}
      <rect x="3"  y="3"  width="1"  height="25" fill="#000000" />
      <rect x="4"  y="3"  width="14" height="1"  fill="#000000" />
      <rect x="4"  y="27" width="20" height="1"  fill="#000000" />
      <rect x="23" y="9"  width="1"  height="18" fill="#000000" />
    </svg>
  );
}

// ── Document — Resume.pdf ────────────────────────────────────────────────────
export function DocumentIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* shadow */}
      <rect x="6" y="5" width="20" height="24" fill="#808080" />
      {/* page */}
      <rect x="4" y="3" width="20" height="24" fill="#ffffff" />
      {/* red header bar */}
      <rect x="4" y="3" width="20" height="7" fill="#cc1111" />
      {/* PDF letters (pixel art, white) */}
      {/* P */}
      <rect x="6"  y="5"  width="1" height="4" fill="#ffffff" />
      <rect x="7"  y="5"  width="2" height="1" fill="#ffffff" />
      <rect x="9"  y="6"  width="1" height="1" fill="#ffffff" />
      <rect x="7"  y="7"  width="2" height="1" fill="#ffffff" />
      {/* D */}
      <rect x="11" y="5"  width="1" height="4" fill="#ffffff" />
      <rect x="12" y="5"  width="1" height="1" fill="#ffffff" />
      <rect x="13" y="6"  width="1" height="2" fill="#ffffff" />
      <rect x="12" y="8"  width="1" height="1" fill="#ffffff" />
      {/* F */}
      <rect x="15" y="5"  width="1" height="4" fill="#ffffff" />
      <rect x="16" y="5"  width="3" height="1" fill="#ffffff" />
      <rect x="16" y="7"  width="2" height="1" fill="#ffffff" />
      {/* text lines */}
      <rect x="6"  y="13" width="14" height="1" fill="#000000" />
      <rect x="6"  y="16" width="14" height="1" fill="#000000" />
      <rect x="6"  y="19" width="10" height="1" fill="#000000" />
      <rect x="6"  y="22" width="14" height="1" fill="#000000" />
      <rect x="6"  y="25" width="7"  height="1" fill="#000000" />
      {/* outline */}
      <rect x="3"  y="3"  width="1"  height="25" fill="#000000" />
      <rect x="4"  y="3"  width="20" height="1"  fill="#000000" />
      <rect x="4"  y="27" width="21" height="1"  fill="#000000" />
      <rect x="24" y="3"  width="1"  height="25" fill="#000000" />
    </svg>
  );
}

// ── Folder — Projects ────────────────────────────────────────────────────────
export function FolderIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* tab */}
      <rect x="1" y="9"   width="12" height="4"  fill="#f0c040" />
      {/* body */}
      <rect x="1" y="12"  width="30" height="17" fill="#f0c040" />
      {/* top highlight */}
      <rect x="1" y="12"  width="30" height="1"  fill="#ffff80" />
      {/* left highlight */}
      <rect x="1" y="12"  width="1"  height="17" fill="#ffff80" />
      {/* tab highlights */}
      <rect x="1" y="9"   width="12" height="1"  fill="#ffff80" />
      <rect x="1" y="9"   width="1"  height="4"  fill="#ffff80" />
      {/* bottom shadow */}
      <rect x="2"  y="28" width="28" height="1"  fill="#806000" />
      {/* right shadow */}
      <rect x="29" y="12" width="1"  height="16" fill="#806000" />
      {/* outline */}
      <rect x="0"  y="8"  width="1"  height="22" fill="#000000" />
      <rect x="1"  y="8"  width="12" height="1"  fill="#000000" />
      <rect x="12" y="9"  width="1"  height="3"  fill="#000000" />
      <rect x="13" y="11" width="18" height="1"  fill="#000000" />
      <rect x="30" y="11" width="1"  height="19" fill="#000000" />
      <rect x="1"  y="29" width="30" height="1"  fill="#000000" />
    </svg>
  );
}

// ── Envelope — Contact ───────────────────────────────────────────────────────
export function EnvelopeIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* body */}
      <rect x="2" y="9" width="28" height="16" fill="#ffffff" />
      {/* navy flap triangle */}
      <polygon points="2,9 30,9 16,19" fill="#000080" />
      {/* left side panel */}
      <polygon points="2,9 2,25 14,18" fill="#d8d8ee" />
      {/* right side panel */}
      <polygon points="30,9 30,25 18,18" fill="#d0d0e8" />
      {/* bottom v-fold */}
      <polygon points="2,25 14,18 16,20 18,18 30,25" fill="#e8e8f8" />
      {/* outline */}
      <rect x="1"  y="9"  width="1"  height="17" fill="#000000" />
      <rect x="2"  y="9"  width="28" height="1"  fill="#000000" />
      <rect x="2"  y="25" width="28" height="1"  fill="#000000" />
      <rect x="30" y="9"  width="1"  height="17" fill="#000000" />
    </svg>
  );
}

// ── Terminal — MS-DOS Prompt ─────────────────────────────────────────────────
export function TerminalIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* monitor bezel */}
      <rect x="1"  y="1"  width="28" height="21" fill="#c0c0c0" />
      <rect x="1"  y="1"  width="28" height="1"  fill="#ffffff" />
      <rect x="1"  y="1"  width="1"  height="21" fill="#ffffff" />
      <rect x="2"  y="21" width="27" height="1"  fill="#808080" />
      <rect x="28" y="1"  width="1"  height="21" fill="#808080" />
      {/* outline */}
      <rect x="0"  y="0"  width="1"  height="23" fill="#000000" />
      <rect x="1"  y="0"  width="28" height="1"  fill="#000000" />
      <rect x="29" y="0"  width="1"  height="23" fill="#000000" />
      <rect x="1"  y="22" width="29" height="1"  fill="#000000" />
      {/* screen (black) */}
      <rect x="3"  y="3"  width="24" height="17" fill="#000000" />
      {/* C:\> in yellow */}
      {/* C */}
      <rect x="5"  y="14" width="1"  height="4"  fill="#cccc00" />
      <rect x="6"  y="14" width="3"  height="1"  fill="#cccc00" />
      <rect x="6"  y="17" width="3"  height="1"  fill="#cccc00" />
      {/* : */}
      <rect x="10" y="15" width="1"  height="1"  fill="#cccc00" />
      <rect x="10" y="17" width="1"  height="1"  fill="#cccc00" />
      {/* \ */}
      <rect x="12" y="14" width="1"  height="1"  fill="#cccc00" />
      <rect x="13" y="15" width="1"  height="1"  fill="#cccc00" />
      <rect x="14" y="16" width="1"  height="1"  fill="#cccc00" />
      <rect x="15" y="17" width="1"  height="1"  fill="#cccc00" />
      {/* > */}
      <rect x="17" y="15" width="1"  height="1"  fill="#cccc00" />
      <rect x="18" y="16" width="1"  height="1"  fill="#cccc00" />
      <rect x="17" y="17" width="1"  height="1"  fill="#cccc00" />
      {/* blinking cursor */}
      <rect x="20" y="16" width="4"  height="2"  fill="#cccc00" />
      {/* stand */}
      <rect x="12" y="23" width="6"  height="2"  fill="#c0c0c0" />
      {/* base */}
      <rect x="8"  y="25" width="14" height="3"  fill="#c0c0c0" />
      <rect x="8"  y="25" width="14" height="1"  fill="#ffffff" />
      <rect x="8"  y="27" width="14" height="1"  fill="#808080" />
      <rect x="7"  y="28" width="16" height="1"  fill="#000000" />
    </svg>
  );
}

// ── Computer — My Computer ───────────────────────────────────────────────────
export function ComputerIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* monitor bezel */}
      <rect x="0"  y="1"  width="22" height="18" fill="#c0c0c0" />
      <rect x="0"  y="1"  width="22" height="1"  fill="#ffffff" />
      <rect x="0"  y="1"  width="1"  height="18" fill="#ffffff" />
      <rect x="1"  y="18" width="21" height="1"  fill="#808080" />
      <rect x="21" y="1"  width="1"  height="18" fill="#808080" />
      <rect x="0"  y="0"  width="22" height="1"  fill="#000000" />
      <rect x="22" y="0"  width="1"  height="20" fill="#000000" />
      <rect x="0"  y="19" width="23" height="1"  fill="#000000" />
      {/* screen (dark blue) */}
      <rect x="2"  y="3"  width="18" height="13" fill="#000080" />
      {/* Win flag on screen */}
      <rect x="5"  y="6"  width="4"  height="4"  fill="#cc2020" />
      <rect x="10" y="6"  width="4"  height="4"  fill="#20cc20" />
      <rect x="5"  y="11" width="4"  height="4"  fill="#2020cc" />
      <rect x="10" y="11" width="4"  height="4"  fill="#cccc20" />
      <rect x="9"  y="6"  width="1"  height="9"  fill="#000080" />
      <rect x="5"  y="10" width="9"  height="1"  fill="#000080" />
      {/* stand */}
      <rect x="8"  y="20" width="6"  height="2"  fill="#c0c0c0" />
      {/* base */}
      <rect x="4"  y="22" width="14" height="2"  fill="#c0c0c0" />
      <rect x="4"  y="22" width="14" height="1"  fill="#ffffff" />
      <rect x="4"  y="23" width="14" height="1"  fill="#808080" />
      <rect x="3"  y="24" width="16" height="1"  fill="#000000" />
      {/* tower (right side) */}
      <rect x="24" y="5"  width="7"  height="16" fill="#c0c0c0" />
      <rect x="24" y="5"  width="7"  height="1"  fill="#ffffff" />
      <rect x="24" y="5"  width="1"  height="16" fill="#ffffff" />
      <rect x="25" y="20" width="6"  height="1"  fill="#808080" />
      <rect x="30" y="5"  width="1"  height="16" fill="#808080" />
      <rect x="23" y="4"  width="1"  height="18" fill="#000000" />
      <rect x="24" y="4"  width="7"  height="1"  fill="#000000" />
      <rect x="31" y="4"  width="1"  height="18" fill="#000000" />
      <rect x="24" y="21" width="8"  height="1"  fill="#000000" />
      {/* drive bays */}
      <rect x="25" y="7"  width="5"  height="1"  fill="#808080" />
      <rect x="25" y="9"  width="5"  height="2"  fill="#404040" />
      <rect x="26" y="10" width="3"  height="1"  fill="#606060" />
      <rect x="25" y="12" width="5"  height="1"  fill="#808080" />
      <rect x="27" y="14" width="1"  height="2"  fill="#404040" />
      <rect x="27" y="15" width="1"  height="1"  fill="#888888" />
    </svg>
  );
}

// ── Minesweeper ──────────────────────────────────────────────────────────────
export function MinesweeperIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* gray background */}
      <rect x="0" y="0" width="32" height="32" fill="#c0c0c0" />
      {/* inset border for grid area */}
      <rect x="1" y="4" width="30" height="24" fill="#808080" />
      <rect x="2" y="5" width="28" height="22" fill="#c0c0c0" />
      {/* 6x4 grid of raised tiles */}
      {[0,1,2,3,4,5].map(c =>
        [0,1,2,3].map(r => {
          const tx = 3 + c * 5;
          const ty = 6 + r * 5;
          return (
            <g key={`${c}-${r}`}>
              <rect x={tx}   y={ty}   width="4" height="4" fill="#c0c0c0" />
              <rect x={tx}   y={ty}   width="4" height="1" fill="#ffffff" />
              <rect x={tx}   y={ty}   width="1" height="4" fill="#ffffff" />
              <rect x={tx+1} y={ty+3} width="3" height="1" fill="#808080" />
              <rect x={tx+3} y={ty+1} width="1" height="3" fill="#808080" />
            </g>
          );
        })
      )}
      {/* one revealed mine (red) */}
      <rect x="8"  y="11" width="4"  height="4"  fill="#ff0000" />
      <rect x="8"  y="11" width="4"  height="1"  fill="#ff8080" />
      {/* mine bomb shape on red cell */}
      <rect x="9"  y="12" width="2"  height="2"  fill="#000000" />
      <rect x="10" y="11" width="1"  height="1"  fill="#000000" />
      {/* smiley face strip at top */}
      <rect x="0"  y="0"  width="32" height="4"  fill="#c0c0c0" />
      <rect x="12" y="0"  width="8"  height="4"  fill="#c0c0c0" />
      <rect x="12" y="0"  width="8"  height="1"  fill="#ffffff" />
      <rect x="12" y="0"  width="1"  height="4"  fill="#ffffff" />
      <rect x="13" y="3"  width="7"  height="1"  fill="#808080" />
      <rect x="19" y="0"  width="1"  height="4"  fill="#808080" />
      {/* smiley */}
      <rect x="13" y="1"  width="6"  height="2"  fill="#ffff00" />
      <rect x="14" y="1"  width="1"  height="1"  fill="#000000" />
      <rect x="17" y="1"  width="1"  height="1"  fill="#000000" />
      <rect x="14" y="2"  width="4"  height="1"  fill="#000000" />
    </svg>
  );
}

// ── Snake ────────────────────────────────────────────────────────────────────
export function SnakeIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* dark grid bg */}
      <rect x="0" y="0" width="32" height="32" fill="#1a3a1a" />
      {/* subtle grid lines */}
      {[4,8,12,16,20,24,28].map(x => (
        <rect key={`v${x}`} x={x} y={0} width="1" height="32" fill="#1e421e" />
      ))}
      {[4,8,12,16,20,24,28].map(y => (
        <rect key={`h${y}`} x={0} y={y} width="32" height="1" fill="#1e421e" />
      ))}
      {/* snake body — U shape */}
      {/* row 1: going right → */}
      <rect x="4"  y="4"  width="4" height="4" fill="#44bb44" />
      <rect x="8"  y="4"  width="4" height="4" fill="#44bb44" />
      <rect x="12" y="4"  width="4" height="4" fill="#44bb44" />
      <rect x="16" y="4"  width="4" height="4" fill="#44bb44" />
      {/* head (slightly brighter) */}
      <rect x="20" y="4"  width="4" height="4" fill="#55dd55" />
      {/* eye on head (facing right) */}
      <rect x="22" y="5"  width="1" height="1" fill="#000000" />
      {/* turn down ↓ */}
      <rect x="20" y="8"  width="4" height="4" fill="#44bb44" />
      <rect x="20" y="12" width="4" height="4" fill="#44bb44" />
      {/* row 3: going left ← */}
      <rect x="16" y="12" width="4" height="4" fill="#44bb44" />
      <rect x="12" y="12" width="4" height="4" fill="#44bb44" />
      <rect x="8"  y="12" width="4" height="4" fill="#44bb44" />
      {/* tail end */}
      <rect x="4"  y="12" width="4" height="4" fill="#338833" />
      {/* food (red apple) */}
      <rect x="24" y="20" width="4" height="4" fill="#cc2222" />
      <rect x="25" y="19" width="2" height="1" fill="#226622" />
      <rect x="25" y="20" width="1" height="1" fill="#ff6666" />
      {/* border */}
      <rect x="0"  y="0"  width="32" height="1" fill="#000000" />
      <rect x="0"  y="31" width="32" height="1" fill="#000000" />
      <rect x="0"  y="0"  width="1"  height="32" fill="#000000" />
      <rect x="31" y="0"  width="1"  height="32" fill="#000000" />
    </svg>
  );
}

// ── Connect Four ─────────────────────────────────────────────────────────────
export function Connect4Icon({ size = 32 }) {
  const pieces = [
    [0,4,'#cc0000'],[1,4,'#ffcc00'],[2,4,'#cc0000'],[3,4,'#ffcc00'],[4,4,'#cc0000'],
    [1,3,'#ffcc00'],[2,3,'#cc0000'],[3,3,'#ffcc00'],
    [2,2,'#cc0000'],[3,2,'#ffcc00'],
    [3,1,'#cc0000'],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={P}>
      {/* blue frame */}
      <rect x="0" y="3" width="32" height="29" fill="#0000aa" />
      {/* 5 rows × 7 cols, each cell 4×4 with 1px gap */}
      {[0,1,2,3,4].map(r =>
        [0,1,2,3,4,5,6].map(c => {
          const piece = pieces.find(p => p[0] === c && p[1] === r);
          return (
            <rect
              key={`${r}-${c}`}
              x={1 + c * 5}
              y={4 + r * 5}
              width="4"
              height="4"
              fill={piece ? piece[2] : '#000033'}
            />
          );
        })
      )}
      {/* outline */}
      <rect x="0"  y="3"  width="1"  height="29" fill="#000000" />
      <rect x="31" y="3"  width="1"  height="29" fill="#000000" />
      <rect x="0"  y="3"  width="32" height="1"  fill="#000000" />
      <rect x="0"  y="31" width="32" height="1"  fill="#000000" />
    </svg>
  );
}

// ── Icon lookup map ──────────────────────────────────────────────────────────
export const ICON_MAP = {
  about:       NotepadIcon,
  resume:      DocumentIcon,
  projects:    FolderIcon,
  contact:     EnvelopeIcon,
  terminal:    TerminalIcon,
  finder:      ComputerIcon,
  minesweeper: MinesweeperIcon,
  snake:       SnakeIcon,
  connect4:    Connect4Icon,
};

export function AppIcon({ id, size = 32 }) {
  const Icon = ICON_MAP[id] || FolderIcon;
  return <Icon size={size} />;
}
