"use client";

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
  selectedStyle,
  setSelectedStyle,
  selectedColors,
  setSelectedColors,
  onGenerate,
  isGenerating,
}: {
  className: string;
  word: string;
  setWord: (word: string) => void;
  selectedStyle: string | null;
  setSelectedStyle: (style: string | null) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}) {
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(
        selectedColors.filter((selectedColor) => selectedColor !== color)
      );

      return;
    }

    if (selectedColors.length >= 12) {
      return;
    }

    setSelectedColors([...selectedColors, color]);
  };

  const addCustomColor = (color: string) => {
    if (selectedColors.length >= 12) {
      return;
    }

    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div
      className={`${className} border p-4 bg-graff-panel text-white rounded-lg space-y-5`}
    >
      {/* WORD */}
      <div>
        <label
          htmlFor="word-input"
          className="block mb-2"
        >
          Word
        </label>

        <input
          id="word-input"
          type="text"
          placeholder="Write a word..."
          value={word}
          onChange={(event) => setWord(event.target.value)}
          className="w-full bg-graff-input border border-graff-border rounded-lg p-2 outline-none focus:border-graff-purple"
        />
      </div>

      {/* STYLE */}
      <div>
        <p className="mb-2">Style</p>

        <div className="grid grid-cols-2 gap-2">
          {graffitiStyles.map((style) => {
            const isSelected = selectedStyle === style;

            return (
              <button
                key={style}
                type="button"
                onClick={() => setSelectedStyle(style)}
                className={`border rounded-lg p-2 transition ${
                  isSelected
                    ? "bg-graff-purple text-white border-graff-purple"
                    : "bg-graff-surface text-graff-text-muted border-graff-border hover:border-graff-purple"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>

      {/* COLORS */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p>Colors</p>

          <span className="text-xs text-graff-text-muted">
            {selectedColors.length}/12
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {recommendedColors.map((color) => {
            const isSelected = selectedColors.includes(color);

            return (
              <button
                key={color}
                type="button"
                onClick={() => toggleColor(color)}
                aria-label={`Color ${color}`}
                style={{
                  backgroundColor: color,
                }}
                className={`w-9 h-9 rounded-lg border-2 transition ${
                  isSelected
                    ? "border-white scale-110"
                    : "border-graff-border hover:scale-105"
                }`}
              />
            );
          })}

          {/* CUSTOM COLOR */}
          <label
            htmlFor="custom-color"
            className={`w-9 h-9 rounded-lg border-2 border-dashed border-graff-border flex items-center justify-center cursor-pointer transition hover:border-graff-purple ${
              selectedColors.length >= 12
                ? "opacity-40 cursor-not-allowed"
                : ""
            }`}
          >
            +
          </label>

          <input
            id="custom-color"
            type="color"
            disabled={selectedColors.length >= 12}
            className="hidden"
            onChange={(event) => addCustomColor(event.target.value)}
          />
        </div>

        {/* SELECTED COLORS */}
        {selectedColors.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-graff-text-muted mb-2">
              Selected colors
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  style={{
                    backgroundColor: color,
                  }}
                  className="w-7 h-7 rounded-md border-2 border-white"
                  title="Remove color"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GENERATE */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full py-2 rounded-lg bg-graff-purple text-white border border-graff-purple hover:bg-graff-purple-light disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isGenerating ? "Generating..." : "Generate Graffiti"}
      </button>
    </div>
  );
}