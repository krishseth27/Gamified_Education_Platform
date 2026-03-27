const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, 'assets/images/map.json');
const backupPath = path.join(__dirname, 'assets/images/map_backup.json');

// Restore from backup first
if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, mapPath);
    console.log('Restored from backup');
}

// Read and parse map.json
const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

console.log('Tilesets found:', mapData.tilesets.length);

// Fix dimensions and spacing for problematic tilesets (don't remove them)
mapData.tilesets.forEach(tileset => {
    const tileW = tileset.tilewidth;
    const tileH = tileset.tileheight;
    const spacing = tileset.spacing || 0;
    const imgW = tileset.imagewidth;
    const imgH = tileset.imageheight;
    
    // Calculate expected dimensions
    const cols = tileset.columns;
    const rows = Math.ceil(tileset.tilecount / cols);
    const expectedW = cols * tileW + (cols - 1) * spacing;
    const expectedH = rows * tileH + (rows - 1) * spacing;
    
    if (imgW !== expectedW || imgH !== expectedH) {
        console.log(`\nFixing ${tileset.name}:`);
        console.log(`  Old: ${imgW}x${imgH}, spacing: ${spacing}`);
        
        // Set spacing to 0 and recalculate
        tileset.spacing = 0;
        const newCols = Math.floor(imgW / tileW);
        const newRows = Math.floor(imgH / tileH);
        
        // Round image dimensions to nearest multiple of tile size
        tileset.imagewidth = newCols * tileW;
        tileset.imageheight = newRows * tileH;
        tileset.column = newCols;
        tileset.tilecount = newCols * newRows;
        
        console.log(`  New: ${tileset.imagewidth}x${tileset.imageheight}, spacing: 0`);
        console.log(`  Columns: ${newCols}, Tilecount: ${tileset.tilecount}`);
    }
});

// Write updated map.json
fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 1));
console.log('\nUpdated map.json successfully!');
