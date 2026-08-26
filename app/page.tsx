"use client";

import { useState } from "react";

import Header from "../components/Header";
import PreviewPanel from "../components/PreviewPanel";
import PromptPanel from "../components/PromptPanel";

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [word, setWord] = useState("");

  const handleGenerate = () => {
    console.log("Generate graffiti:", {
      word,
      selectedStyle,
      selectedColors,
    });
  };

  return (
    <>
      <Header />

      <main className="grid grid-cols-12 gap-1">
        <PromptPanel
          className="col-span-3"
          word={word}
          setWord={setWord}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          onGenerate={handleGenerate}
        />

        <PreviewPanel
          className="col-span-9"
          word={word}
          selectedStyle={selectedStyle}
          selectedColors={selectedColors}
        />
      </main>
    </>
  );
}