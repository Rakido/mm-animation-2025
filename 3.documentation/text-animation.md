# MM Animation Library Documentation

A powerful text animation library built with GSAP and SplitText, providing a simple way to create engaging text animations through data attributes.

## Table of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Animation Types](#animation-types)
- [Split Types](#split-types)
- [Animation Parameters](#animation-parameters)
- [Stagger Methods](#stagger-methods)
- [3D Animations](#3d-animations)
- [Scroll Animations](#scroll-animations)
- [Examples](#examples)

## Installation

Include the required scripts in your HTML:

```html
<!-- GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<!-- ScrollTrigger Plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<!-- SplitText Plugin -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<!-- MM Animation Library -->
<script src="text-animations.js"></script>
```

## Basic Usage

Add the `data-splitting` attribute to any text element you want to animate:

```html
<h2 data-splitting="chars" data-animate="fade-in">
    Your animated text here
</h2>
```

## Animation Types

### Available Animation Types
- `fade-in`: Simple fade in animation
- `slide`: Slide animation (automatically handles overflow)
- `3D`: 3D rotation animation
- Multiple types can be combined: `data-animate="fade-in slide"`

## Split Types

### Available Split Types
- `lines`: Split text into lines
- `words`: Split text into words
- `chars`: Split text into characters

Example:
```html
<!-- Split by lines -->
<h2 data-splitting="lines" data-animate="fade-in">
    Each line will animate separately
</h2>

<!-- Split by words -->
<h2 data-splitting="words" data-animate="slide">
    Each word will animate separately
</h2>

<!-- Split by characters -->
<h2 data-splitting="chars" data-animate="slide">
    Each character will animate separately
</h2>
```

## Animation Parameters

### Basic Parameters
- `data-duration`: Animation duration in seconds (default: 1)
- `data-delay`: Initial delay in seconds (default: 0)
- `data-stagger`: Time between each element's animation (default: 0.05)
- `data-easing`: Animation easing function (default: "power2.out")

### Available Easing Functions
- `power1`: Gentle acceleration
- `power2`: Moderate acceleration
- `power3`: Strong acceleration
- `power4`: Very strong acceleration
- `back`: Overshoots the target
- `elastic`: Bounces like a spring
- `bounce`: Bounces at the end
- `expo`: Exponential acceleration
- `sine`: Smooth sine-based easing

Example:
```html
<h2 
    data-splitting="chars"
    data-animate="slide"
    data-duration="1.2"
    data-delay="0.2"
    data-stagger="0.03"
    data-easing="power3">
    Customized animation timing
</h2>
```

## Stagger Methods

### Available Stagger Methods
- `start`: Animation starts from the beginning (default)
- `end`: Animation starts from the end
- `center`: Animation starts from the center
- `random`: Elements animate in random order

Example:
```html
<h2 
    data-splitting="chars"
    data-animate="slide"
    data-stagger="0.03"
    data-stagger-method="center">
    Animates from center outward
</h2>
```

## 3D Animations

### 3D Parameters
- `data-rotation-x`: Initial X rotation in degrees (default: -100)
- `data-transform-origin`: Transform origin point (default: "50% 50% -160px")
- `data-perspective`: Perspective depth in pixels (default: 1000)

Example:
```html
<h2 
    data-splitting="lines"
    data-animate="3D"
    data-rotation-x="-90"
    data-transform-origin="50% 50% -200px"
    data-perspective="2000">
    3D rotating text
</h2>
```

## Scroll Animations

### Scroll Parameters
- `data-scroll`: Enable scroll trigger (value: "true")
- `data-scrub`: Enable scrubbing (value: "true" or number for smooth scrubbing)
- `data-start`: Scroll trigger start point (default: "top bottom-=10%")
- `data-end`: Scroll trigger end point (default: "bottom top+=10%")
- `data-revert`: Reverse animation on scroll up (default: true)

Example:
```html
<h2 
    data-splitting="chars"
    data-animate="slide"
    data-scroll="true"
    data-scrub="0.5"
    data-start="top center"
    data-end="bottom center">
    Scroll-triggered animation
</h2>
```

## Examples

### Basic Fade In
```html
<h2 
    data-splitting="chars"
    data-animate="fade-in"
    data-stagger="0.03">
    Simple fade in animation
</h2>
```

### Slide with Overflow
```html
<h2 
    data-splitting="chars"
    data-animate="slide"
    data-axis="y"
    data-stagger="0.02">
    Slide up animation (overflow handled automatically)
</h2>
```

### 3D with Center Stagger
```html
<h2 
    data-splitting="lines"
    data-animate="3D"
    data-rotation-x="-90"
    data-stagger="0.1"
    data-stagger-method="center">
    3D rotation from center
</h2>
```

### Complex Scroll Animation
```html
<h2 
    data-splitting="chars"
    data-animate="fade-in slide"
    data-axis="y"
    data-scroll="true"
    data-scrub="0.5"
    data-stagger="0.03"
    data-stagger-method="random"
    data-duration="1.5"
    data-easing="elastic">
    Complex scroll-triggered animation
</h2>
```

## Best Practices

1. **Performance**
   - Use appropriate split types (chars for short text, words for longer text)
   - Avoid too many simultaneous animations
   - Use appropriate stagger values (0.02-0.05 for chars, 0.1-0.2 for words/lines)

2. **Accessibility**
   - Ensure text remains readable during animation
   - Consider reduced motion preferences
   - Maintain sufficient color contrast

3. **Mobile Considerations**
   - Test animations on mobile devices
   - Consider using simpler animations on mobile
   - Be mindful of performance on lower-end devices

## Browser Support

The library works in all modern browsers that support:
- CSS Transforms
- CSS 3D Transforms
- ES6 JavaScript

## Troubleshooting

Common issues and solutions:

1. **Text not splitting**
   - Ensure GSAP and SplitText plugins are loaded
   - Check for JavaScript errors in console
   - Verify data-splitting attribute is present

2. **Animation not working**
   - Check for conflicting CSS
   - Verify animation parameters are correct
   - Ensure no JavaScript errors in console

3. **Performance issues**
   - Reduce number of simultaneous animations
   - Use appropriate split types
   - Consider using simpler animations on mobile

## Contributing

Feel free to contribute to the library by:
- Reporting bugs
- Suggesting new features
- Improving documentation
- Submitting pull requests

## License

MIT License - feel free to use in your projects! 