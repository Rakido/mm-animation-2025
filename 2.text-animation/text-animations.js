// Initialize GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

// Helper function to parse easing
function parseEasing(easing) {
    if (!easing) return "0.39, 0.01, 0.7, 0.99";
    const easingMap = {
        "power1": "power1.out",
        "power2": "power2.out",
        "power3": "power3.out",
        "power4": "power4.out",
        "back": "back.out(1.7)",
        "elastic": "elastic.out(1, 0.3)",
        "bounce": "bounce.out",
        "expo": "expo.out",
        "sine": "sine.out"
    };
    return easingMap[easing] || easing;
}

// Helper function to parse transform origin
function parseTransformOrigin(origin) {
    if (!origin) return "50% 50% -160px";
    return origin;
}

// Function to determine stagger order
function getStaggerOrder(elements, method) {
    const elementsArray = Array.from(elements);
    switch (method) {
        case 'start':
            return elementsArray;
        case 'end':
            return elementsArray.reverse();
        case 'center':
            return elementsArray.sort((a, b) => 
                Math.abs(elementsArray.length / 2 - elementsArray.indexOf(a)) - 
                Math.abs(elementsArray.length / 2 - elementsArray.indexOf(b))
            );
        case 'random':
            return elementsArray.sort(() => Math.random() - 0.5);
        default:
            return elementsArray;
    }
}

// Function to handle overflow for slide animations
function setupOverflow(element, animationTypes) {
    if (animationTypes.includes('slide')) {
        // Create a wrapper div if it doesn't exist
        if (!element.parentElement.classList.contains('slide-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('slide-wrapper');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'inline-block';
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        } else {
            element.parentElement.style.overflow = 'hidden';
        }
    }
}

// Function to initialize text animations
function initTextAnimations() {
    // Get all elements with data-splitting attribute
    const textElements = document.querySelectorAll('[data-splitting]');

    textElements.forEach(element => {
        try {
            // Get all animation parameters
            const splittingType = element.getAttribute('data-splitting') || 'lines';
            const animationTypes = element.getAttribute('data-animate') ? 
                element.getAttribute('data-animate').split(' ') : [];
            
            // Set up overflow handling for slide animations
            setupOverflow(element, animationTypes);
            
            // Animation timing and control parameters
            const staggerValue = parseFloat(element.getAttribute('data-stagger')) || 0.05;
            const staggerMethod = element.getAttribute('data-stagger-method') || 'start';
            const delayValue = parseFloat(element.getAttribute('data-delay')) || 0;
            const durationValue = parseFloat(element.getAttribute('data-duration')) || 1;
            const easingValue = parseEasing(element.getAttribute('data-easing'));
            
            // 3D specific parameters
            const rotationX = parseFloat(element.getAttribute('data-rotation-x')) || -100;
            const transformOrigin = parseTransformOrigin(element.getAttribute('data-transform-origin'));
            const perspective = parseFloat(element.getAttribute('data-perspective')) || 1000;
            
            // Transform parameters
            const axis = element.getAttribute('data-axis') || 'y';
            const axisValue = element.getAttribute('data-axis-value') || '100%';
            const rotateValue = parseFloat(element.getAttribute('data-rotate')) || 0;
            const skewValue = parseFloat(element.getAttribute('data-skew')) || 0;
            
            // ScrollTrigger parameters
            const scrubAttr = element.getAttribute('data-scrub');
            const scrub = scrubAttr === 'true' ? true : (scrubAttr ? parseFloat(scrubAttr) : false);
            const startTrigger = element.dataset.start || "top bottom-=10%";
            const endTrigger = element.dataset.end || "bottom top+=10%";
            const revert = element.hasAttribute('data-revert') ? 
                element.dataset.revert === 'false' : true;

            // Set perspective on parent if 3D animation is used
            if (animationTypes.includes('3D')) {
                element.style.perspective = `${perspective}px`;
            }

            // Split the text using SplitText.create()
            const split = SplitText.create(element, {
                type: splittingType,
                linesClass: "split-line",
                wordsClass: "split-word",
                charsClass: "split-char"
            });

            // Get the elements to animate based on splitting type
            const elementsToAnimate = split[splittingType];
            if (!elementsToAnimate || !elementsToAnimate.length) {
                console.warn(`No elements found for splitting type: ${splittingType}`);
                return;
            }

            // Wrap each line in a parent div with overflow hidden if splitting by lines
            if (splittingType === 'lines') {
                elementsToAnimate.forEach(line => {
                    const wrapper = document.createElement('div');
                    wrapper.style.overflow = 'hidden';
                    wrapper.style.display = 'block';
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                });
            }

            const orderedElements = getStaggerOrder(elementsToAnimate, staggerMethod);

            // Set initial state based on animation types
            let initialState = {};
            let animationVars = {};

            if (animationTypes.includes('3D')) {
                initialState = {
                    rotationX: rotationX,
                    transformOrigin: transformOrigin,
                    opacity: 0
                };
                animationVars = {
                    rotationX: 0,
                    opacity: 1,
                    duration: durationValue,
                    delay: delayValue,
                    stagger: {
                        amount: staggerValue,
                        from: staggerMethod
                    },
                    ease: easingValue
                };
            } else {
                // Check if this is a pure fade-in animation
                const isPureFadeIn = animationTypes.length === 1 && animationTypes.includes('fade-in');
                
                initialState = {
                    opacity: animationTypes.includes('fade-in') ? 0 : 1,
                    // Only apply movement transforms if not a pure fade-in
                    y: (!isPureFadeIn && axis === 'y') ? axisValue : 0,
                    x: (!isPureFadeIn && axis === 'x') ? axisValue : 0,
                    z: (!isPureFadeIn && axis === 'z') ? axisValue : 0,
                    rotation: rotateValue,
                    skewX: skewValue,
                    skewY: skewValue
                };
                animationVars = {
                    opacity: 1,
                    // Only animate movement transforms if not a pure fade-in
                    y: (!isPureFadeIn) ? 0 : undefined,
                    x: (!isPureFadeIn) ? 0 : undefined,
                    z: (!isPureFadeIn) ? 0 : undefined,
                    rotation: 0,
                    skewX: 0,
                    skewY: 0,
                    duration: durationValue,
                    delay: delayValue,
                    stagger: {
                        amount: staggerValue,
                        from: staggerMethod
                    },
                    ease: easingValue
                };
            }

            gsap.set(orderedElements, initialState);

            // Create animation
            const animation = gsap.to(orderedElements, animationVars);

            // Create ScrollTrigger if needed
            if (element.hasAttribute('data-scroll')) {
                ScrollTrigger.create({
                    trigger: element,
                    animation: animation,
                    start: startTrigger,
                    end: endTrigger,
                    scrub: scrub,
                    toggleActions: revert ? "play none none reverse" : "play none none none",
                    onEnter: () => animation.play(),
                    onLeave: () => revert && animation.reverse(),
                    onEnterBack: () => animation.play(),
                    onLeaveBack: () => revert && animation.reverse()
                });
            }
        } catch (error) {
            console.error('Error initializing animation for element:', element, error);
        }
    });
}

// Wait for GSAP and plugins to be fully loaded
window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined') {
        initTextAnimations();
    } else {
        console.error('GSAP or SplitText plugin not loaded');
    }
});