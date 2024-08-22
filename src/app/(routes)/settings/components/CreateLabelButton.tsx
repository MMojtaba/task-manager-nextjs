"use client";

import { createLabel } from "@/app/dataAccess/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CreateLabelButton() {
  const [newLabelText, setNewLabelText] = useState<string>("");

  async function handleCreate() {
    try {
      const res = await createLabel(newLabelText);
      setNewLabelText("");
      console.log("res is", res);
    } catch (err) {
      console.error("Error creating label", err);
    }
  }

  return (
    <div className="mt-4 flex">
      <Input
        value={newLabelText}
        onInput={(e) => setNewLabelText(e.target.value)}
      />
      <Button onClick={handleCreate} className="ml-2">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
}
