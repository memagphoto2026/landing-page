document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const btnVi = document.getElementById('btn-vi');
    const btnEn = document.getElementById('btn-en');

    // Scroll Effect for Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Parallax Effect for Gallery
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            let offset = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${offset * 0.3}px)`;
        }
    });

    // Language Switcher Logic
    const translatableElements = document.querySelectorAll('[data-vi]');

    function switchLanguage(lang) {
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.innerHTML = text; // Use innerHTML to support <br>
                }
            }
        });

        const mainLogo = document.getElementById('main-logo');
        if (mainLogo) {
            const newLogo = mainLogo.getAttribute(`data-logo-${lang}`);
            if (newLogo) mainLogo.src = newLogo;
        }

        if (lang === 'vi') {
            btnVi.classList.add('active');
            btnEn.classList.remove('active');
            document.documentElement.lang = 'vi';
        } else {
            btnEn.classList.add('active');
            btnVi.classList.remove('active');
            document.documentElement.lang = 'en';
        }
    }

    btnVi.addEventListener('click', () => switchLanguage('vi'));
    btnEn.addEventListener('click', () => switchLanguage('en'));

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navbar.classList.toggle('active');
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Pause video when not in view
    const video = document.getElementById('hero-video');
    if (video) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        videoObserver.observe(video);
    }

    // Smooth Scroll
    document.querySelectorAll('nav a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                mobileMenu.classList.remove('is-active');
                navbar.classList.remove('active');

                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight + 50,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            submitBtn.disabled = true;
            submitBtn.innerHTML = document.documentElement.lang === 'vi' ? 'Đang gửi...' : 'Sending...';

            try {
                // Formspree ID: mqenjqrr
                const response = await fetch('https://formspree.io/f/mqenjqrr', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const successOverlay = document.getElementById('success-overlay');
                    if (successOverlay) {
                        successOverlay.classList.remove('overlay-hidden');
                        successOverlay.classList.add('overlay-visible');
                    }
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert(document.documentElement.lang === 'vi' 
                    ? 'Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua Zalo.' 
                    : 'An error occurred. Please try again later or contact us via Zalo.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Close Success Overlay
    const closeSuccess = document.getElementById('close-success');
    if (closeSuccess) {
        closeSuccess.addEventListener('click', () => {
            const successOverlay = document.getElementById('success-overlay');
            if (successOverlay) {
                successOverlay.classList.remove('overlay-visible');
                successOverlay.classList.add('overlay-hidden');
            }
        });
    }
});
