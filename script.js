document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const btnVi = document.getElementById('btn-vi');
    const btnEn = document.getElementById('btn-en');
    
    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Language Switcher Logic
    const translatableElements = document.querySelectorAll('[data-vi]');

    function switchLanguage(lang) {
        // Switch Text
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.innerText = text;
                }
            }
        });

        // Switch Logo
        const mainLogo = document.getElementById('main-logo');
        if (mainLogo) {
            const newLogo = mainLogo.getAttribute(`data-logo-${lang}`);
            if (newLogo) mainLogo.src = newLogo;
        }

        // Update active button state
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

    // Smooth Scroll for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu after clicking
            mobileMenu.classList.remove('is-active');
            navbar.classList.remove('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
