import { buildMap, isWalkable } from "../game/map";

export default function WorldScene({ player, onBattle, onLearn }) {
  // Since Phaser is now our main game engine (running in index.html),
  // we do not need the redundant React 2d canvas loop anymore!
  // We can leave this component just as an overlay container if needed.
  
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
      <button
        onClick={onLearn}
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          color: "#4ade80",
          border: "1px solid #4ade80",
          background: "var(--code-bg)",
          borderRadius: "6px",
          padding: "8px 16px",
          fontFamily: "var(--sans)",
          cursor: "pointer",
          pointerEvents: "auto",
          boxShadow: "var(--shadow)",
          transition: "background 0.2s"
        }}
        onMouseOver={e=>e.currentTarget.style.background="var(--accent-bg)"}
        onMouseOut={e=>e.currentTarget.style.background="var(--code-bg)"}
      >
        📖 STUDY
      </button>
    </div>
  );
}
