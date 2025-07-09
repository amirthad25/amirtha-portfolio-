// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

document.addEventListener('DOMContentLoaded', () => {
    // Navigation active state and smooth scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.navbar');
    let lastScroll = 0;
    
    // Handle navigation click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');

            // Smooth scroll to section
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.nav-content ul');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                hamburger.innerHTML = '☰';
            }
        });
    });

    // Hide/Show navigation on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
        }
        
        lastScroll = currentScroll;
    });

    // Video background handling
    const video = document.getElementById('background-video');
    const fallbackText = document.querySelector('.fallback-text');

    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(() => {
                console.warn('Autoplay was prevented');
                showFallbackContent();
            });
        });

        video.addEventListener('error', () => {
            console.warn('Video failed to load');
            showFallbackContent();
        });
    }

    function showFallbackContent() {
        if (fallbackText) {
            fallbackText.style.display = 'block';
        }
        if (video) {
            video.style.display = 'none';
        }
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animations
    document.querySelectorAll('.fade-in, .slide-in, .about-content, .contact-content').forEach(element => {
        observer.observe(element);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#4CAF50';
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message
                submitBtn.textContent = 'Failed to Send';
                submitBtn.style.background = '#f44336';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Active navigation link highlighting
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveNav();
        });
    });

    // Initial active nav update
    updateActiveNav();

    // Mobile navigation menu
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-content');
        const ul = nav.querySelector('ul');
        
        // Create hamburger button if it doesn't exist
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            nav.insertBefore(hamburger, ul);

            // Toggle menu on click
            hamburger.addEventListener('click', () => {
                ul.classList.toggle('show');
                hamburger.innerHTML = ul.classList.contains('show') ? '✕' : '☰';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target)) {
                    ul.classList.remove('show');
                    hamburger.innerHTML = '☰';
                }
            });
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
}); 