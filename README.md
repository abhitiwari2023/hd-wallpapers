# 🖼️ HD Wallpapers Gallery

<div align="center">

![HD Wallpapers Banner](https://source.unsplash.com/1200x300/?wallpaper,landscape)

[![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red.svg)](https://github.com/yourusername)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/wallpaper-project?style=social)](https://github.com/yourusername/wallpaper-project/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/wallpaper-project?style=social)](https://github.com/yourusername/wallpaper-project/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/wallpaper-project)](https://github.com/yourusername/wallpaper-project/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/wallpaper-project)](https://github.com/yourusername/wallpaper-project/blob/main/LICENSE)

</div>

## 🌟 Overview

A modern, responsive wallpaper gallery application built with HTML, JavaScript, and Tailwind CSS. Browse, search, and download high-quality wallpapers from Pexels' extensive collection. Features a beautiful dark theme UI with smooth animations and an intuitive user experience.

### ✨ Key Features

- 🎨 Modern dark theme UI with glass morphism effects
- 🔍 Real-time search with category filtering
- 📱 Fully responsive design for all devices
- 🖼️ Beautiful image modal with navigation
- ⚡ Fast loading with pagination support
- 📥 Direct download functionality
- 🎯 Category quick-filters
- 🔝 Smooth scroll-to-top feature
- 👆 Touch-friendly mobile interface
- 🌊 Smooth animations and transitions

## 🚀 Live Demo

Check out the live demo: [HD Wallpapers Gallery](https://your-demo-link.com)

## 🛠️ Technologies Used

- HTML5
- JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [Pexels API](https://www.pexels.com/api/)

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wallpaper-project.git
```

2. Navigate to the project directory:
```bash
cd wallpaper-project
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

4. Add your Pexels API key in `script.js`:
```javascript
const API_KEY = 'YOUR_PEXELS_API_KEY';
```

## 💡 Usage

### 🔍 Searching Wallpapers
- Use the search bar to find specific wallpapers
- Click category chips for quick filtering
- Results update in real-time as you type

### 📱 Mobile Usage
- Swipe left/right in the image viewer
- Scroll horizontally through categories
- Pull to refresh for new content

### ⌨️ Keyboard Shortcuts
- `←` Previous image
- `→` Next image
- `Esc` Close modal
- `Enter` Trigger search

## 🎨 Features in Detail

### Image Modal
```javascript
// Open image in modal
function openModal(photo, index) {
    currentPhotoIndex = index;
    const modal = document.getElementById('imageModal');
    modalImage.src = photo.src.original;
    modal.classList.remove('hidden');
}
```

### Category Filtering
```javascript
// Filter by category
document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        currentCategory = chip.dataset.category;
        updateCategoryChips();
        fetchWallpapers();
    });
});
```

### Responsive Design
```css
/* Mobile-first responsive design */
@media (max-width: 640px) {
    .image-container {
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }
}
```

## 📱 Screenshots

<div align="center">
<img src="https://source.unsplash.com/300x600/?ui,dark" alt="Mobile View" width="200"/>
<img src="https://source.unsplash.com/600x400/?desktop,dark" alt="Desktop View" width="400"/>
</div>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pexels](https://www.pexels.com/) for providing the wallpaper API
- [Tailwind CSS](https://tailwindcss.com/) for the awesome styling framework
- [Font Awesome](https://fontawesome.com/) for the beautiful icons

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/wallpaper-project](https://github.com/yourusername/wallpaper-project)

---

<div align="center">
Made with ❤️ by [Your Name]
</div> 