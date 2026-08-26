export default function PreviewPanel({
  className,
  word,
  selectedColors,
  selectedStyle,
}: {
  className: string;
  word: string;
  selectedColors: string[];
  selectedStyle: string | null;
}) {
  const gradient =
    selectedColors.length > 0
      ? `linear-gradient(90deg, ${selectedColors.join(", ")})`
      : "white";

  return (
    <div
      className={`border p-4 rounded-lg bg-graff-panel text-white space-y-4 ${className}`}
    >
      <h2 className="ml-4">RESULT</h2>

      <div
        id="image-preview"
        className="w-full h-96 bg-graff-panel flex flex-col items-center justify-center text-center rounded-b-lg"
      >
        {word ? (
          <>
            <h3
              className="text-6xl font-black uppercase"
              style={{
                backgroundImage: gradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "2px black",
              }}
            >
              {word}
            </h3>

            {selectedStyle && (
              <p className="text-graff-text-muted mt-3">
                {selectedStyle}
              </p>
            )}
          </>
        ) : (
          <p className="text-graff-text-muted">
            Your graffiti will appear here.
          </p>
        )}
      </div>
    </div>
  );
}