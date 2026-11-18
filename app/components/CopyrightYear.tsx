"use client";

import { useSyncExternalStore } from "react";

export default function CopyrightYear() {
  const year = useSyncExternalStore(
    () => () => undefined,
    () => new Date().getFullYear(),
    () => 2026,
  );

  return year;
}
