"use client";

import {
  createLabel,
  getUserLabels,
  removeLabel,
} from "@/app/dataAccess/label";
import { Button } from "@/components/ui/button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Props {
  label: string;
  index: number;
}

export default function UserLabelItem({ label, index }: Props) {
  async function handleRemove() {
    try {
      const res = await removeLabel(label);
      console.log("got res", res);
      if (res.status !== 200) throw new Error(res.message);
      // TODO: show toast
    } catch (err) {
      console.error("Error removing label", err);
      // TODO: show toast
    }
  }

  return (
    <div className="m-2 flex items-center rounded-xl border border-gray-500 p-2 hover:bg-gray-800">
      <h3>{label}</h3>
      <Button onClick={handleRemove} variant="ghost" className="ml-auto">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}
