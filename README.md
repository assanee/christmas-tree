# 🎄 Christmas Tree Animation

Animated Christmas tree with colorful decorations and falling snow in the terminal! Perfect for spreading holiday cheer. ✨

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-%3E%3D12.0.0-brightgreen.svg)

## ✨ Features

- 🎨 **Colorful Animations** - Tree colors cycle through green, bright green, cyan, and bright cyan
- 🎁 **Random Ornaments** - Multi-colored ornaments randomly placed on the tree (red, yellow, blue, magenta)
- ❄️ **Falling Snow** - Realistic snow particles falling and accumulating on the ground
- ⭐ **Bright Star** - Golden star on top of the tree
- 🌲 **Realistic Design** - Complete with brown trunk and snow-covered ground
- 🔄 **Smooth Animation** - Updates every 200ms for smooth visual effects

## 🎬 Demo

![Christmas Tree Animation](assets/christmas-tree-demo.png)

The animation displays:
- A decorated Christmas tree with a star on top
- Colorful ornaments that twinkle
- Snowflakes falling from the sky
- Snow accumulating on the ground
- Decorative borders and holiday message

## 📋 Requirements

- Node.js >= 12.0.0
- Terminal with ANSI color support
- UTF-8 encoding for proper character display

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/assanee/christmas-tree.git
cd christmas-tree
```

2. Install dependencies (if any):
```bash
npm install
```

## 💻 Usage

Run the animation using one of the following commands:

```bash
npm start
```

or

```bash
node christmas-tree.js
```

To stop the animation, press `Ctrl+C`

## 🎨 Customization

You can customize the animation by modifying these parameters in `christmas-tree.js`:

- **Tree Height**: Change `const height = 10` (line 264) to adjust tree size
- **Animation Speed**: Modify the interval value `200` (line 288) in milliseconds
- **Snow Amount**: Adjust the threshold `0.8` (line 282) for snow generation frequency
- **Max Snowflakes**: Change the limit `40` (line 282) for concurrent snowflakes
- **Ornament Density**: Modify `Math.random() > 0.7` (line 142) to control ornament frequency

### Color Customization

The code uses ANSI color codes. You can modify these arrays:

**Tree Colors** (lines 20-25):
```javascript
const treeColors = [
  colors.green,
  colors.brightGreen,
  colors.cyan,
  colors.brightCyan,
];
```

**Ornament Colors** (lines 28-37):
```javascript
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
```

## 🏗️ Code Structure

### Main Components

1. **Color System** - ANSI color codes for terminal output
2. **SnowFlake Class** - Manages individual snowflake particles with physics
3. **Tree Generation** - Creates the ASCII art Christmas tree with decorations
4. **Snow System** - Handles falling snow animation and ground accumulation
5. **Animation Loop** - Main render loop that updates display every 200ms

### Key Functions

- `generateTree()` - Creates the tree structure with star, ornaments, and trunk
- `generateSnow()` - Renders falling snowflakes in their current positions
- `generateGround()` - Displays ground with accumulated snow
- `displayTree()` - Combines all elements and renders to terminal
- `animate()` - Main animation loop with timing control

## 🎯 Technical Highlights

- **Object-Oriented Design**: Uses ES6 class for snowflake physics
- **ANSI Escape Codes**: Professional terminal colors and formatting
- **Physics Simulation**: Realistic snow falling with variable speeds
- **Memory Management**: Efficiently removes settled snowflakes to prevent memory leaks
- **Graceful Exit**: Proper SIGINT handling with farewell message
- **Responsive Layout**: Centered display with dynamic width calculation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**assanee**

- GitHub: [@assanee](https://github.com/assanee)

## 🎁 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check [issues page](https://github.com/assanee/christmas-tree/issues).

## ⭐ Show your support

Give a ⭐️ if this project brought you some holiday cheer!

## 🎊 Happy Holidays!

Enjoy the festive animation and have a wonderful holiday season! 🎄✨
