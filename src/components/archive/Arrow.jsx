// One authored arrow, stroked to sit beside Barlow Condensed bold.
export default function Arrow({ direction = 'right' }) {
  return (
    <svg className="arrow" width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"
      style={direction === 'left' ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M1 6h15M11 1.5 16 6l-5 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}
