"use client";

import { useState } from "react";

const graffitiStyles = [
  "Wildstyle",
  "Bubble",
  "Throw Up",
  "Block",
  "Tag",
  "3D",
];

const recommendedColors = [
  "#A855F7",
  "#3B82F6",
  "#EF4444",
  "#FACC15",
  "#FFFFFF",
];

export default function PromptPanel({
  className,
  word,
  setWord,
  selectedColors,
  setSelectedColors,
  selectedStyle,
  setSelectedStyle,
  onGenerate,
}: {
  className: string;
  word: string;
  setWord: (word: string) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedStyle: string | null;
  setSelectedStyle: (style: string | null) => void;
  onGenerate: () => void;
}) {
  const [customColors, setCustomColors] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(
        selectedColors.filter((selectedColor) => selectedColor !== color)
      );
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const addCustomColor = (color: string) => {
    if (!customColors.includes(color) && customColors.length < 7) {
      setCustomColors([...customColors, color]);
    }

    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div
      className={`border p-4 bg-graff-panel text-white rounded-lg space-y-4 ${className}`}
    >
      {/* Word */}
      <div>
        <label htmlFor="word-input">Word</label>

        <input
          type="text"
          id="word-input"
          placeholder="Write a word..."
          className="w-full bg-graff-input border rounded-lg p-1"
          value={word}
          onChange={(event) => setWord(event.target.value)}
        />
      </div>

      {/* Style */}
      <div>
        <p>Style</p>

        <div className="grid grid-cols-3 gap-2 text-xs">
          {graffitiStyles.map((style) => (
            <button
              type="button"
              onClick={() => setSelectedStyle(style)}
              key={style}
              className={`${
                selectedStyle === style
                  ? "bg-graff-purple text-graff-text"
                  : "bg-graff-surface text-graff-text-muted"
              } border border-graff-border rounded-lg p-2 hover:bg-graff-purple`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <p>Colors</p>

        <div className="flex items-center gap-2 flex-wrap">
          {recommendedColors.map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => toggleColor(color)}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-md border ${
                selectedColors.includes(color)
                  ? "border-graff-text"
                  : "border-graff-border"
              }`}
            />
          ))}

          {customColors.map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => toggleColor(color)}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-md border ${
                selectedColors.includes(color)
                  ? "border-graff-text"
                  : "border-graff-border"
              }`}
            />
          ))}

          <label
            htmlFor="custom-color"
            className="w-8 h-8 rounded-md border border-graff-border bg-graff-input flex items-center justify-center cursor-pointer"
          >
            🎨
          </label>

          <input
            id="custom-color"
            type="color"
            className="hidden"
            onChange={(event) => addCustomColor(event.target.value)}
          />
        </div>
      </div>

      {/* Generate */}
      <div>
        <button
          type="button"
          onClick={onGenerate}
          className="text-graff-text bg-graff-purple text-center rounded-lg shadow-md border border-graff-purple w-full py-2 hover:bg-graff-purple-light"
        >
          Generate Graffiti
        </button>
      </div>
    </div>
  );
}
