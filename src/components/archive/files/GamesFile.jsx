import Minesweeper from '../../apps/Minesweeper';
import Snake from '../../apps/Snake';
import ConnectFour from '../../apps/ConnectFour';

const GAMES = {
  minesweeper: { label: 'Minesweeper', Component: Minesweeper },
  snake: { label: 'Snake', Component: Snake },
  connect4: { label: 'Vier gewinnt', Component: ConnectFour },
};

export default function GamesFile({ section }) {
  const id = GAMES[section] ? section : 'minesweeper';
  const { label, Component } = GAMES[id];
  return (
    <>
      <h2 className="page-title" data-ordner-heading tabIndex={-1}>{label} <span>Spiele · Games</span></h2>
      <div className="game-frame" key={id}>
        <Component />
      </div>
    </>
  );
}
