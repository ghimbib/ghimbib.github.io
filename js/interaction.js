document.addEventListener('DOMContentLoaded', function() {
    
    // Typewriter Effect using Typed.js
    const rotateElement = document.querySelector('.txt-rotate');
    if (rotateElement && typeof Typed !== 'undefined') {
        const toRotate = rotateElement.getAttribute('data-rotate');
        const period = rotateElement.getAttribute('data-period');
        
        if (toRotate) {
            try {
                const strings = JSON.parse(toRotate);
                new Typed('.txt-rotate', {
                    strings: strings,
                    typeSpeed: 60,
                    backSpeed: 40,
                    backDelay: parseInt(period) || 2000,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|'
                });
            } catch (e) {
                console.error("Error parsing data-rotate JSON", e);
            }
        }
    }

    // Intersection Observer for Timeline Fade-in
    const timelineItems = document.querySelectorAll('.timeline');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for older browsers: just show them
        timelineItems.forEach(item => {
            item.classList.add('visible');
        });
    }
});
