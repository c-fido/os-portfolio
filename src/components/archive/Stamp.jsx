// Rubber stamp: the only state vocabulary. Always a word, never colour alone.
export default function Stamp({ tone = 'red', children, className = '' }) {
  return <span className={`stamp stamp--${tone} ${className}`}>{children}</span>;
}
