interface IconProps {
  glyph: string;
  label: string;
}

/** Lightweight gradient glyph tile — no icon font needed. */
export default function FeatureIcon({ glyph, label }: IconProps) {
  return (
    <span className="feature-icon" role="img" aria-label={label}>
      <span aria-hidden="true">{glyph}</span>
    </span>
  );
}