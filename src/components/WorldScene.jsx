import { useEffect, useRef } from "react";
import {
TILE,
COLS,
ROWS,
PLAYER_SPEED,
BATTLE_CHANCE,
BATTLE_COOLDOWN,
TILE_COLORS,
TILE_BORDER
} from "../game/constants";

import { buildMap, isWalkable } from "../game/map";

const Scanlines = () => (

  <div style={{
    position:"absolute",inset:0,pointerEvents:"none",zIndex:50,
    background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
  }}/>
);

export default function WorldScene({ player, onBattle, onLearn }) {
const canvasRef = useRef(null);

const stateRef = useRef({
px: TILE * 10,
py: TILE * 7,
keys: {},
battleCooldown: 0,
inGrass: false,
});

const animRef = useRef(null);
const mapRef = useRef(null);

useEffect(() => {
mapRef.current = buildMap(player.unlockedRegions);
}, [player.unlockedRegions]);

const DIRS = {
ArrowUp: [0, -1],
ArrowDown: [0, 1],
ArrowLeft: [-1, 0],
ArrowRight: [1, 0],
};

useEffect(() => {
const down = (e) => stateRef.current.keys[e.key] = true;
const up = (e) => stateRef.current.keys[e.key] = false;


window.addEventListener("keydown", down);
window.addEventListener("keyup", up);

return () => {
  window.removeEventListener("keydown", down);
  window.removeEventListener("keyup", up);
};


}, []);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;


const ctx = canvas.getContext("2d");
if (!ctx) return;

function drawMap(map) {
  if (!map) return;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const t = map[r][c];
      ctx.fillStyle = TILE_COLORS[t] || "#000";
      ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
      ctx.strokeStyle = TILE_BORDER[t] || "#000";
      ctx.strokeRect(c * TILE, r * TILE, TILE, TILE);
    }
  }
}

function drawPlayer(px, py) {
  ctx.fillStyle = "#16a34a";
  ctx.fillRect(px + 10, py + 10, 20, 20);
}

function loop() {
  const s = stateRef.current;
  const map = mapRef.current;
  if (!map) return;

  let moved = false;

  for (const key in DIRS) {
    const [dx, dy] = DIRS[key];

    if (s.keys[key]) {
      const nx = s.px + dx * PLAYER_SPEED;
      const ny = s.py + dy * PLAYER_SPEED;

      const ok = [
        [nx + 8, ny + 8],
        [nx + TILE - 8, ny + 8],
        [nx + 8, ny + TILE - 8],
        [nx + TILE - 8, ny + TILE - 8],
      ].every(([cx, cy]) => isWalkable(map, cx, cy, TILE));

      if (ok) {
        s.px = nx;
        s.py = ny;
        moved = true;
      }
    }
  }

  // 🌿 Detect grass
  const centerCol = Math.floor((s.px + TILE / 2) / TILE);
  const centerRow = Math.floor((s.py + TILE / 2) / TILE);

  const tile = map?.[centerRow]?.[centerCol];
  const inGrass = tile === 5;

  s.inGrass = inGrass;

  if (s.battleCooldown > 0) s.battleCooldown--;

  // ✅ ONLY GRASS TRIGGERS BATTLE
  if (
    moved &&
    inGrass &&
    s.battleCooldown === 0 &&
    Math.random() < BATTLE_CHANCE
  ) {
    s.battleCooldown = BATTLE_COOLDOWN;
    onBattle();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(map);
  drawPlayer(s.px, s.py);

  animRef.current = requestAnimationFrame(loop);
}

animRef.current = requestAnimationFrame(loop);

return () => {
  if (animRef.current) cancelAnimationFrame(animRef.current);
};


}, [onBattle]);

return (
<div style={{ position: "relative", width: "100%", height: "100%" }}>
<canvas
ref={canvasRef}
width={COLS * TILE}
height={ROWS * TILE}
style={{ width: "100%", height: "100%" }}
/>


  <Scanlines />

  <button
    onClick={onLearn}
    style={{
      position: "absolute",
      bottom: 10,
      left: 10,
      color: "#4ade80",
      border: "1px solid #4ade80",
      background: "transparent",
      padding: "6px 10px",
      cursor: "pointer",
    }}
  >
    📖 STUDY
  </button>
</div>


);
}
