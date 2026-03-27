import { ROWS, COLS } from "./constants";

export function buildMap(unlockedRegions) {
const map = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

// Borders
for (let c = 0; c < COLS; c++) {
map[0][c] = 1;
map[ROWS - 1][c] = 1;
}
for (let r = 0; r < ROWS; r++) {
map[r][0] = 1;
map[r][COLS - 1] = 1;
}

// Paths
for (let c = 1; c < COLS - 1; c++) map[7][c] = 2;
for (let r = 1; r < ROWS - 1; r++) map[r][10] = 2;

// Water
for (let r = 2; r < 5; r++)
for (let c = 14; c < 18; c++) map[r][c] = 3;

// Trees
const trees = [
[2,3],[3,5],[4,2],[5,4],
[9,3],[10,5],[11,2],[12,4],
];
trees.forEach(([r, c]) => {
if (map[r][c] === 0) map[r][c] = 1;
});

// 🌿 GRASS (battle zones)
const grass = [
[2,4],[2,5],[2,6],[3,4],[3,5],[3,6],
[4,4],[4,5],[5,5],[9,2],[9,3],[10,2],[10,3]
];

grass.forEach(([r, c]) => {
if (map[r][c] === 0) map[r][c] = 5;
});

return map;
}

export function isWalkable(map, px, py, TILE) {
const col = Math.floor(px / TILE);
const row = Math.floor(py / TILE);

if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false;

const t = map[row][col];
return t !== 1 && t !== 3 && t !== 4;
}
