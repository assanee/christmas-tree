// Christmas Tree Animation with Colors
// Run with: node christmas-tree.js

const readline = require('readline');

// ANSI Color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
};

// Array of tree colors for animation
const treeColors = [
  colors.green,
  colors.brightGreen,
  colors.cyan,
  colors.brightCyan,
];

// Array of ornament colors
const ornamentColors = [
  colors.red,
  colors.yellow,
  colors.blue,
  colors.magenta,
  colors.brightRed,
  colors.brightYellow,
  colors.brightBlue,
  colors.brightMagenta,
];

// Clear screen
function clearScreen() {
  console.clear();
}

// Get random color from array
function getRandomColor(colorArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

// Snow particles class
class SnowFlake {
  constructor(maxWidth, groundLevel) {
    this.x = Math.floor(Math.random() * maxWidth);
    this.y = 0;
    this.speed = Math.random() * 0.5 + 0.3;
    this.char = Math.random() > 0.5 ? '❄' : '*';
    this.groundLevel = groundLevel;
    this.settled = false;
  }
  
  fall(groundSnow) {
    if (this.settled) return;
    
    this.y += this.speed;
    
    // Check if reached ground or snow pile
    const x = Math.floor(this.x);
    const y = Math.floor(this.y);
    
    if (y >= this.groundLevel - 1) {
      this.settled = true;
      if (x >= 0 && x < groundSnow.length) {
        groundSnow[x] = Math.max(groundSnow[x], this.groundLevel - y);
      }
    }
  }
}

// Generate snow layer
function generateSnow(snowFlakes, groundSnow, maxWidth, maxHeight, groundLevel) {
  const snowLayer = Array(maxHeight).fill(null).map(() => Array(maxWidth).fill(' '));
  
  // Add falling snowflakes
  snowFlakes.forEach(flake => {
    if (!flake.settled) {
      const x = Math.floor(flake.x);
      const y = Math.floor(flake.y);
      
      if (y >= 0 && y < maxHeight && x >= 0 && x < maxWidth) {
        snowLayer[y][x] = `${colors.white}${flake.char}${colors.reset}`;
      }
    }
  });
  
  return snowLayer;
}

// Generate ground with accumulated snow
function generateGround(groundSnow, width) {
  const ground = [];
  const snowColor = colors.white;
  const groundColor = '\x1b[38;5;250m'; // Light gray
  
  // Create snow pile on ground
  let groundLine = '';
  for (let i = 0; i < width; i++) {
    if (groundSnow[i] > 0) {
      groundLine += `${snowColor}▓${colors.reset}`;
    } else {
      groundLine += `${groundColor}▁${colors.reset}`;
    }
  }
  ground.push(groundLine);
  
  return ground;
}

// Generate Christmas tree
function generateTree(height, colorIndex) {
  const tree = [];
  const treeColor = treeColors[colorIndex % treeColors.length];
  
  // Star on top
  const starColor = colors.brightYellow;
  const starSpaces = ' '.repeat(height);
  tree.push(`${starSpaces}${starColor}*${colors.reset}`);
  
  // Tree layers
  for (let i = 0; i < height; i++) {
    const spaces = ' '.repeat(height - i);
    let line = '';
    
    for (let j = 0; j <= i * 2; j++) {
      // Randomly add colored ornaments
      if (Math.random() > 0.7) {
        const ornamentColor = getRandomColor(ornamentColors);
        line += `${ornamentColor}*${colors.reset}`;
      } else {
        line += `${treeColor}*${colors.reset}`;
      }
    }
    
    tree.push(spaces + line);
  }
  
  // Tree trunk
  const trunkColor = '\x1b[38;5;94m'; // Brown color
  const trunkSpaces = ' '.repeat(height - 1);
  tree.push(`${trunkSpaces}${trunkColor}|||${colors.reset}`);
  tree.push(`${trunkSpaces}${trunkColor}|||${colors.reset}`);
  
  return tree;
}

// Display tree with animation
function displayTree(height, colorIndex, snowFlakes, groundSnow) {
  clearScreen();
  const tree = generateTree(height, colorIndex);
  const treeWidth = height * 2 + 20;
  const displayHeight = height + 6;
  const groundLevel = displayHeight;
  
  // Calculate center offset to center the tree
  const centerOffset = 10;
  
  // Generate snow layer
  const snowLayer = generateSnow(snowFlakes, groundSnow, treeWidth, displayHeight, groundLevel);
  
  // Add decorative border
  console.log('\n' + colors.brightCyan + '═'.repeat(50) + colors.reset);
  console.log(colors.brightYellow + '        🎄 MERRY CHRISTMAS! 🎄' + colors.reset);
  console.log(colors.brightCyan + '═'.repeat(50) + colors.reset + '\n');
  
  // Display tree with snow on both sides
  tree.forEach((line, index) => {
    // Add center offset (left padding)
    const leftPadding = ' '.repeat(centerOffset);
    
    // Get snow for this row
    let leftSnow = '';
    let rightSnow = '';
    
    if (index < snowLayer.length) {
      const snowRow = snowLayer[index];
      
      // Left side snow (before tree)
      for (let i = 0; i < centerOffset && i < snowRow.length; i++) {
        if (snowRow[i] !== ' ') {
          leftSnow += snowRow[i];
        } else {
          leftSnow += ' ';
        }
      }
      
      // Calculate where tree ends (without ANSI codes)
      const cleanLine = line.replace(/\x1b\[[0-9;]*m/g, '');
      const treeEndPos = centerOffset + cleanLine.length;
      
      // Right side snow (after tree)
      for (let i = treeEndPos; i < Math.min(snowRow.length, treeWidth); i++) {
        if (snowRow[i] !== ' ') {
          rightSnow += snowRow[i];
        } else {
          rightSnow += ' ';
        }
      }
    }
    
    // Combine: left snow + tree + right snow
    // Use leftPadding for spacing, leftSnow shows snow in that space
    const finalLeftPadding = leftSnow.padEnd(centerOffset, ' ');
    console.log(finalLeftPadding + line + rightSnow);
  });
  
  // Display falling snow between tree and ground
  const snowSpaceLines = displayHeight - tree.length;
  for (let i = 0; i < snowSpaceLines; i++) {
    const rowIndex = tree.length + i;
    let snowLine = '';
    
    if (rowIndex < snowLayer.length) {
      for (let j = 0; j < treeWidth && j < snowLayer[rowIndex].length; j++) {
        snowLine += snowLayer[rowIndex][j];
      }
    }
    
    console.log(' '.repeat(centerOffset) + snowLine);
  }
  
  // Display ground with accumulated snow (centered)
  const ground = generateGround(groundSnow, treeWidth);
  ground.forEach(line => console.log(' '.repeat(centerOffset) + line));
  
  console.log('\n' + colors.brightCyan + '═'.repeat(50) + colors.reset);
  console.log(colors.white + '    Press Ctrl+C to exit' + colors.reset);
  console.log(colors.brightCyan + '═'.repeat(50) + colors.reset + '\n');
}

// Main animation loop
function animate() {
  const height = 10; // Height of the tree
  let colorIndex = 0;
  const snowFlakes = [];
  const maxWidth = height * 2 + 20;
  const maxHeight = height + 6; // Match the displayHeight
  const groundLevel = maxHeight;
  const groundSnow = Array(maxWidth).fill(0);
  
  // Create initial snowflakes (reduced from 50 to 20)
  for (let i = 0; i < 20; i++) {
    const flake = new SnowFlake(maxWidth, groundLevel);
    flake.y = Math.random() * maxHeight;
    snowFlakes.push(flake);
  }
  
  setInterval(() => {
    // Update snowflakes
    snowFlakes.forEach(flake => {
      flake.fall(groundSnow);
    });
    
    // Remove settled snowflakes
    for (let i = snowFlakes.length - 1; i >= 0; i--) {
      if (snowFlakes[i].settled) {
        snowFlakes.splice(i, 1);
      }
    }
    
    // Add new snowflakes randomly (reduced from 100 to 40 max, increased threshold)
    if (Math.random() > 0.8 && snowFlakes.length < 40) {
      snowFlakes.push(new SnowFlake(maxWidth, groundLevel));
    }
    
    displayTree(height, colorIndex, snowFlakes, groundSnow);
    colorIndex++;
  }, 200); // Change colors every 200ms
}

// Start the animation
console.log(colors.brightGreen + '\n🎄 Starting Christmas Tree Animation...\n' + colors.reset);
setTimeout(animate, 1000);

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  clearScreen();
  console.log(colors.brightRed + '\n\n🎄 Thank you! Happy Holidays! 🎄\n\n' + colors.reset);
  process.exit(0);
});
