// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isOpen ? '✕' : '☰';
        });
    }

    // Simple Counter Animation
    function initCounter() {
        const statItems = document.querySelectorAll('.stat-item h3');
        let counterStarted = false;
        const statsSection = document.querySelector('.stats');

        function startCounters() {
            if (counterStarted || !statsSection) return;
            counterStarted = true;
            
            statItems.forEach(item => {
                const target = parseInt(item.getAttribute('data-count') || '0');
                const duration = 2000; // 2 seconds
                const step = Math.max(1, Math.floor(target / 50)); // Smooth animation steps
                let current = 0;
                
                item.textContent = '0';
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    item.textContent = current.toLocaleString();
                }, duration / (target / step));
            });
        }

        // Check if element is in viewport
        function isInViewport() {
            if (!statsSection) return false;
            const rect = statsSection.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.8) &&
                rect.bottom >= 0
            );
        }

        // Initialize on scroll or immediately if already in view
        function checkAndStart() {
            if (isInViewport()) {
                startCounters();
                window.removeEventListener('scroll', checkAndStart);
            }
        }

        // Start checking
        checkAndStart();
        window.addEventListener('scroll', checkAndStart);
    }

    // Start counter when page loads
    document.addEventListener('DOMContentLoaded', initCounter);

    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-controls');

    if (testimonialTrack && testimonialCards.length > 0) {
        let currentIndex = 0;

        // Create dots for each testimonial
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Function to go to a specific slide
        function goToSlide(index) {
            if (index < 0) index = testimonialCards.length - 1;
            if (index >= testimonialCards.length) index = 0;

            currentIndex = index;
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

            // Update active dot
            document.querySelectorAll('.testimonial-dot').forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === index);
            });
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the fixed header
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                }
            }
        });
    });

    // Form validation for contact form
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            let isValid = true;

            // Simple validation
            if (!name.trim()) {
                isValid = false;
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }

            if (!email.trim() || !email.includes('@')) {
                isValid = false;
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }

            if (!message.trim()) {
                isValid = false;
                document.getElementById('message').classList.add('error');
            } else {
                document.getElementById('message').classList.remove('error');
            }

            if (isValid) {
                // In a real application, you would send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Add hover effect on service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); // Close the DOMContentLoaded event listener