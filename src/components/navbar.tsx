import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 border-b-2 border-b-primary">
      <h1 className="text-center text-5xl font-semibold">
        <Link href="./" className="text-primary">
          Decenter Challenge
        </Link>{" "}
        - Milos Djurica
      </h1>
      <ModeToggle />
    </div>
  );
}
