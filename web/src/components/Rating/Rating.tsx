interface RatingProps {
  value: number;
}
export function Rating({ value }: RatingProps) {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
