"use client";

import { createLabel } from "@/app/dataAccess/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CreateLabelButton() {
  const { toast } = useToast();
  const [newLabelText, setNewLabelText] = useState<string>("");

  async function handleCreate() {
    try {
      const res = await createLabel(newLabelText);
      setNewLabelText("");
      if (res.status === 400)
        toast({ title: "The label already exists!", variant: "destructive" });
      else if (res.status !== 200) throw new Error(res.message);
    } catch (err) {
      console.error("Error creating label", err);
      toast({ title: "Error creating label", variant: "destructive" });
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
