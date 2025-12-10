# ⏱️ Stopwatch Web Application

A modern, feature-rich stopwatch web application with a beautiful UI, multiple functionalities, and responsive design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## ✨ Features

### Core Functionality
- ⏯️ **Start/Pause/Reset** - Full control over timing
- 🚩 **Lap Times** - Record and display multiple lap times
- ⚡ **Real-time Display** - Precise millisecond accuracy
- 🏆 **Fastest/Slowest Lap Detection** - Automatically highlights best and worst laps

### Advanced Features
- 💾 **Save Time** - Download current time and lap data as a text file
- 🖥️ **Fullscreen Mode** - Distraction-free timing experience
- 🔊 **Sound Effects** - Audio feedback for actions (can be toggled)
- 🌓 **Theme Toggle** - Switch between Dark and Light modes
- ⌨️ **Keyboard Shortcuts** - Quick access to all functions

### User Interface
- 🎨 **Modern Gradient Design** - Beautiful cyan/blue theme
- ✨ **Smooth Animations** - Professional transitions and effects
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎯 **Single-Page Layout** - Everything visible without scrolling
- 💫 **Glassmorphism Effects** - Modern UI with backdrop blur

## 🚀 Demo

Simply open `index.html` in your browser to see the stopwatch in action!

## 📦 Installation

1. **Clone or Download** the repository:
   ```bash
   git clone <repository-url>
   ```
   Or download as ZIP and extract.

2. **Navigate** to the project folder:
   ```bash
   cd Sample1
   ```

3. **Open** `index.html` in your browser:
   - Double-click the file, or
   - Right-click → Open with → Your Browser, or
   - Use a local server (recommended for development)

### Using a Local Server (Optional)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📖 Usage

### Basic Operations

1. **Start Timing**
   - Click the green "Start" button
   - Or press `Space` key

2. **Record Lap**
   - While running, click the purple "Lap" button
   - Or press `L` key
   - Lap times are displayed with fastest/slowest indicators

3. **Pause Timing**
   - Click the orange "Pause" button
   - Or press `Space` key

4. **Reset Everything**
   - Click the red "Reset" button
   - Or press `R` key (when stopped)
   - Clears time and all lap records

### Additional Functions

#### 💾 Save Time
- Click "Save Time" to download a `.txt` file
- Contains current time, timestamp, and all lap times
- Perfect for record-keeping and sharing

#### 🖥️ Fullscreen Mode
- Click "Fullscreen" to enter fullscreen
- Great for presentations or competitions
- Click "Exit Full" to return to normal view

#### 🔊 Sound Toggle
- Click "Sound On/Off" to enable/disable audio
- Beep sounds play on Start, Pause, Lap, and Save
- Visual icon changes when muted

#### 🌓 Theme Toggle
- Click "Dark Mode" to switch to Light Mode
- Beautiful light blue theme for daytime use
- All elements adapt automatically

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start / Pause |
| `L` | Record Lap (while running) |
| `R` | Reset (when stopped) |

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
  - CSS Grid & Flexbox
  - CSS Variables
  - Keyframe Animations
  - Media Queries
  - Glassmorphism Effects
- **JavaScript (ES6+)** - Core functionality
  - Web Audio API (sound effects)
  - Fullscreen API
  - LocalStorage (optional data persistence)
  - DOM Manipulation
- **Font Awesome 6.4.0** - Icons

## 📁 File Structure

```
Sample1/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

### Code Organization

#### index.html
- Semantic HTML5 structure
- Stopwatch display and controls
- Additional function buttons
- Lap times section
- Footer with attribution

#### styles.css
- CSS Variables for theming
- Responsive grid layouts
- Smooth animations
- Light/Dark mode styles
- Mobile-first responsive design

#### script.js
- Core stopwatch logic
- Lap time management
- Sound effects system
- Theme toggling
- File download functionality
- Keyboard event handlers

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |
| Opera | Latest |

**Note:** For best experience, use a modern browser with ES6+ support.

## 🎨 Customization

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00d4ff;      /* Cyan */
    --secondary-color: #0099ff;    /* Blue */
    --success-color: #00e676;      /* Green */
    --danger-color: #ff5252;       /* Red */
    --warning-color: #ffc107;      /* Yellow */
}
```

### Modifying Time Format

In `script.js`, adjust the `formatTime()` function:

```javascript
function formatTime(milliseconds) {
    // Customize time display format here
}
```

## 🐛 Troubleshooting

### Sound Not Working?
- Check browser sound permissions
- Ensure sound is not muted in the app
- Some browsers require user interaction before playing audio

### Fullscreen Not Working?
- Some browsers restrict fullscreen to user-initiated actions
- Try clicking the button directly (not using keyboard shortcut)

### Layout Issues?
- Clear browser cache
- Ensure viewport meta tag is present
- Check browser zoom level (should be 100%)

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👏 Credits

**Developed by:** SM  
**Project:** Task-02  
**Year:** 2024

### Resources Used
- Font Awesome for icons
- Web Audio API for sound effects
- Unsplash for inspiration (if applicable)

---

## 💡 Tips & Best Practices

### Performance
- The stopwatch uses `setInterval` with 10ms precision
- Lap times are stored in memory (array)
- Minimal DOM manipulation for smooth performance

### Accessibility
- All buttons have descriptive labels
- Keyboard navigation supported
- Color contrast meets WCAG standards
- Semantic HTML for screen readers

### Mobile Usage
- Touch-friendly button sizes
- No hover-dependent features
- Optimized for portrait orientation
- Responsive font sizes

---

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Multiple timers
- [ ] Split time display
- [ ] Cloud save functionality
- [ ] Export to CSV/Excel
- [ ] Custom color themes
- [ ] Timer presets
- [ ] Voice commands
- [ ] PWA support for offline use
- [ ] Countdown timer mode
- [ ] Statistics dashboard

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [Usage](#usage) guide
3. Open an issue on GitHub
4. Contact the developer

---

## 🌟 Show Your Support

If you found this project helpful:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest new features
- 🔀 Fork and contribute
- 📢 Share with others

---

**Made with ❤️ by SM | Task-02**

*Last Updated: December 2024*
