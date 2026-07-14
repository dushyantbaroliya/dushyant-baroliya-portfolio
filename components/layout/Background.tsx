/**
 * Fixed backdrop that later sections scroll over: a deep-blue glow field
 * with a faint engineering grid, mirroring the reference's sticky hero art.
 */
export default function Background() {
  return (
    <div className="sticky top-0 -z-50" aria-hidden>
      <div className="absolute h-screen w-full overflow-hidden bg-black">
        {/* Radial glows */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 45% at 78% 22%, rgba(2,87,122,0.4) 0%, transparent 70%)," +
              "radial-gradient(50% 50% at 15% 80%, rgba(2,169,247,0.14) 0%, transparent 70%)," +
              "radial-gradient(30% 30% at 50% 50%, rgba(1,48,63,0.5) 0%, transparent 75%)",
          }}
        />
        {/* Engineering grid */}
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(137,214,251,0.35) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(137,214,251,0.35) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(70% 70% at 60% 40%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(70% 70% at 60% 40%, black 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade into pure black */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black" />
      </div>
    </div>
  );
}
