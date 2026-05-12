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

    // Smooth Scroll
    document.querySelectorAll('nav a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});
