(function() {
    "use strict";

    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    });

    document.addEventListener('DOMContentLoaded', function() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        const prevBtn = document.querySelector('.vector-icon:first-child');
        const nextBtn = document.querySelector('.vector-icon:last-child');
        
        let currentIndex = 0;
        let interval;
    
        function updateCarousel() {
            testimonials.forEach((item, index) => {
                item.classList.remove('active', 'prev', 'next');
    
                if (index === currentIndex) {
                    item.classList.add('active');
                } else if (index === currentIndex - 1 || 
                         (currentIndex === 0 && index === testimonials.length - 1)) {
                    item.classList.add('prev');
                } else if (index === currentIndex + 1 || 
                         (currentIndex === testimonials.length - 1 && index === 0)) {
                    item.classList.add('next');
                }
            });
        }
    
        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateCarousel();
        }
    
        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateCarousel();
        }
    
        // Event listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    
        // Auto-play functionality
        function startInterval() {
            interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
    
        function resetInterval() {
            clearInterval(interval);
            startInterval();
        }
    
        // Initialize carousel
        updateCarousel();
        startInterval();
    
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.section-content1');
        carouselContainer.addEventListener('mouseenter', () => clearInterval(interval));
        carouselContainer.addEventListener('mouseleave', startInterval);
    });


    document.addEventListener('DOMContentLoaded', () => {
        // Initialize carousel elements
        const carousel = document.querySelector('.carousel-container');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const prevButton = document.querySelector('.nav-button.prev');
        const nextButton = document.querySelector('.nav-button.next');
        const currentSlideElement = document.querySelector('.current-slide');
        const totalSlidesElement = document.querySelector('.total-slides');
    
        // Check if elements exist
        if (!carousel || !slides.length || !prevButton || !nextButton || !currentSlideElement || !totalSlidesElement) {
            console.error('Required carousel elements not found');
            return;
        }
    
        let currentSlide = 0;
        let autoScrollInterval;
    
        // Update total slides count
        totalSlidesElement.textContent = slides.length;
    
        function updateCarousel() {
            slides.forEach((slide, index) => {
                // Remove all classes first
                slide.classList.remove('active', 'next');
                
                // Add appropriate classes
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
                
                if (index === (currentSlide + 1) % slides.length) {
                    slide.classList.add('next');
                }
            });
    
            // Update slide counter
            currentSlideElement.textContent = currentSlide + 1;
        }
    
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }
    
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }
    
        function startAutoScroll() {
            stopAutoScroll(); // Clear any existing interval first
            autoScrollInterval = setInterval(nextSlide, 5000);
        }
    
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
        }
    
        // Event Listeners
        prevButton.addEventListener('click', () => {
            prevSlide();
            stopAutoScroll();
            startAutoScroll();
        });
    
        nextButton.addEventListener('click', () => {
            nextSlide();
            stopAutoScroll();
            startAutoScroll();
        });
    
        // Pause auto-scroll when hovering over carousel
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
    
        // Initialize carousel
        updateCarousel();
        startAutoScroll();
    });



document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.cta-nav-button.prev');
    const nextButton = document.querySelector('.cta-nav-button.next');
    const currentSlideSpan = document.querySelector('.cta-current-slide');
    const totalSlidesSpan = document.querySelector('.cta-total-slides');
    
    let currentIndex = 2;
    totalSlidesSpan.textContent = items.length;

    function updateCarousel() {
        items.forEach((item, index) => {
            const diff = index - currentIndex;
            const absIndex = Math.abs(diff);

            let xPos = diff * 350;
            let scale = 1 - (absIndex * 0.15);
            let zPos = absIndex === 0 ? 200 : 0;
            // let opacity = 1 - (absIndex * 0.3);
            // let blur = absIndex * 2;

            // const activeImage = item.querySelector('.active-image');
            // const inactiveImage = item.querySelector('.inactive-image');
            item.classList.remove('active');
            
            // Add active class only to the center item
            if (absIndex === 0) {
                item.classList.add('active');
            }

            // Apply transforms
            item.style.transform = `
                translateX(calc(-50% + ${xPos}px))
                translateZ(${zPos}px)
                scale(${scale})
                rotate(-2deg)
            `;
            item.style.zIndex = 1000 - absIndex;
            // item.style.opacity = Math.max(0, opacity);
            // item.style.filter = `blur(${blur}px)`;
            // item.style.visibility = opacity > 0 ? 'visible' : 'hidden';
            if (absIndex > 2) {
                item.style.visibility = 'hidden';
                item.style.opacity = 0;
            } else {
                // item.style.visibility = 'visible';
                item.style.visibility = 'visible';
                item.style.opacity = 1;
            }
        });

        currentSlideSpan.textContent = currentIndex + 1;
    }

    function nextSlide() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Initialize carousel
    updateCarousel();

    // Handle window resize
    window.addEventListener('resize', updateCarousel);

    // Optional: Auto-play
    let autoplayInterval = setInterval(() => {
        if (currentIndex === items.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }, 3000);

    // Pause autoplay on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex === items.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        }, 3000);
    });
});

// navlink active
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.stickynav-link');

    // Function to get the current section
    function getCurrentSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                return section.id;
            }
        }
        return null;
    }

    // Function to update active state
    function updateActiveState() {
        const currentSection = getCurrentSection();
        
        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');
            
            // Get the section ID from href attribute
            const sectionId = link.getAttribute('href').substring(1);
            
            // Add active class if this link corresponds to current section
            if (sectionId === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        updateActiveState();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

})();