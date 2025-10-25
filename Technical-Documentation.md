# Technical Documentation - Portfolio Website

## Overview
Personal portfolio with responsive design, dark/light themes, scroll animations, and comprehensive form validation with error handling.

## Architecture

### File Structure
```
portfolio/
├── index.html    # HTML5 structure
├── style.css     # Styling & animations
├── script.js     # Validation & interactions
└── assets/       # Images
```

### Technology Stack
- **HTML5**: Semantic elements, accessibility
- **CSS3**: Flexbox, animations, keyframes, media queries
- **JavaScript ES6+**: Validation, scroll observers, localStorage

## Core Features

### 1. Responsive Design
- Mobile-first Flexbox layout
- Breakpoint: `@media (max-width: 768px)`
- Tested: Desktop (1920px+), tablet (768px), mobile (375px)

### 2. Theme System
- Toggles `dark-theme` class on body
- Saves to localStorage
- 0.4s smooth transitions

### 3. Scroll Animations
```javascript
// Adds 'visible' class when 85% in viewport
// Triggers CSS fade-in transition
```

### 4. Form Validation

**Checks:**
- Empty fields
- Email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Message length (10+ characters)

**User Flow:**
1. Submit → Validation runs
2. Loading state → Spinner shows
3. API simulation → 2s delay
4. Result → Success (green) or error (red) with retry

### 5. Error Handling

**Inline Errors:**
- Red borders on invalid inputs
- Specific messages below fields
- Auto-clear when typing

**Submission Errors:**
- Try-catch for network failures
- Retry button provided
- User-friendly messages

## JavaScript Functions

### Theme Toggle
```javascript
document.body.classList.toggle('dark-theme');
localStorage.setItem('theme', 'dark' | 'light');
```

### Scroll Animation
```javascript
function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;
  fadeElements.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add('visible');
    }
  });
}
```

### Validation Helper
```javascript
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

## CSS Architecture

### Animations
- **Fade-in**: Opacity 0→1, translateY(-20px→0)
- **Shake**: TranslateX oscillation for errors
- **Spin**: 360° rotation for loading

### Responsive
```css
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
