document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Smooth scrolling for anchor links (safeguard for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Simple Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements to animate
    document.querySelectorAll('.project-card, .section-title, .about-text').forEach(el => {
        el.classList.add('fade-in'); // Ensure class exists
        el.style.opacity = "0"; // Start hidden
        el.style.animation = "none"; // Reset CSS animation to let JS handle it
        observer.observe(el);
    });
    
    // Re-enable animation via class when in view
    document.addEventListener('scroll', () => {
       // Logic handled by observer above, simply adds the class back
       // to trigger the CSS @keyframes
    });
});
