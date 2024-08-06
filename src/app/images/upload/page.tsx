"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const imageInputEl = document.getElementById("image-upload");

    if (imageInputEl) imageInputEl.addEventListener("change", handleFileSelect);

    function handleFileSelect() {
      console.log("in handle change");
      const file = imageInputEl?.files?.[0];

      if (!file) {
        console.log("no file");
        return;
      }

      const { name, size, type } = file;
      console.log("got file", name, size, type);
    }
  });

  return (
    <div>
      <input id="image-upload" type="file" accept="image/png, image/jpeg" />
    </div>
  );
}
