"use client";
import { useState } from "react";
import Feed from "./components/Feed";
import Gallery from "./components/Gallery";

export default function Home() {
  const [forceRefresh, setForceRefresh] = useState<number>(0);
  return (
    <>
      <Feed setForceRefresh={setForceRefresh} />
      <Gallery forceRefresh={forceRefresh} />
    </>
  );
}
