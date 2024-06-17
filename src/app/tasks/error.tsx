"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong.</h1>;
      <button className="btn btn-error" onClick={() => reset()}>
        Retry
      </button>
    </div>
  );
}
