document.addEventListener('DOMContentLoaded', () => {

    /* ==================================================
       OPENING SCREEN
    ================================================== */

    const openingScreen = document.getElementById('opening-screen');

    if (openingScreen) {

        // Opening number count animation
        const openingNumbers = openingScreen.querySelectorAll('.opening-number');

        openingNumbers.forEach(number => {

            const target = parseInt(number.dataset.count || '0', 10);
            let current = 0;

            const duration = 1200;
            const startTime = performance.now();

            const animateNumber = (currentTime) => {

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                current = Math.floor(target * easedProgress);
                number.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animateNumber);
                } else {
                    number.textContent = target;
                }
            };

            requestAnimationFrame(animateNumber);
        });


        // Hide opening screen
        setTimeout(() => {

            openingScreen.classList.add('is-hidden');

            // Remove from screen after transition
            setTimeout(() => {
                openingScreen.style.display = 'none';
            }, 1000);

        }, 2500);
    }


    /* ==================================================
       HEADER / MOBILE MENU
    ================================================== */

    const menuButton = document.getElementById('menu-button');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuButton && mobileNav) {

        menuButton.addEventListener('click', () => {

            menuButton.classList.toggle('active');
            mobileNav.classList.toggle('active');

        });


        // Close mobile menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {

            link.addEventListener('click', () => {

                menuButton.classList.remove('active');
                mobileNav.classList.remove('active');

            });

        });
    }


    /* ==================================================
       SMOOTH SCROLL
    ================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            e.preventDefault();

            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

        });

    });


    /* ==================================================
       HERO SLIDER
    ================================================== */

    const heroTrack = document.querySelector('.hero-track');
    const heroSlides = document.querySelectorAll('.hero-slide');

    if (heroTrack && heroSlides.length > 1) {

        let currentSlide = 0;

        const slideNext = () => {

            currentSlide++;

            heroTrack.style.transform =
                `translateX(-${currentSlide * 100}%)`;

            // Reset to first slide
            if (currentSlide >= heroSlides.length - 1) {

                setTimeout(() => {

                    heroTrack.style.transition = 'none';
                    currentSlide = 0;

                    heroTrack.style.transform = 'translateX(0)';

                    // Force browser reflow
                    heroTrack.offsetHeight;

                    heroTrack.style.transition = '';

                }, 800);
            }
        };

        setInterval(slideNext, 5000);
    }


    /* ==================================================
       NUMBER COUNTER
    ================================================== */

    const counters = document.querySelectorAll('.network-number');

    const animateCounter = (counter) => {

        const target = parseInt(counter.dataset.count || '0', 10);

        let current = 0;

        const duration = 1200;
        const startTime = performance.now();

        const update = (currentTime) => {

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * easedProgress);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };


    if (counters.length) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }


    /* ==================================================
       FADE IN
    ================================================== */

    const fadeElements = document.querySelectorAll(
        '.feature-card, .service-card, .connection-item, .contact-card'
    );

    if (fadeElements.length) {

        const fadeObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('visible');

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }

});