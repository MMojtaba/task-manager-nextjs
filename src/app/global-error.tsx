"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Error in root</h2>
        <button onClick={() => reset()}>Retry</button>
      </body>
    </html>
  );
}
