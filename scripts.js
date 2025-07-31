
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const headerText = document.getElementById('header-text');
    const headerLogo = document.getElementById('header-logo');
    const headerSectionTitle = document.getElementById('header-section-title');
    const headerArrow = document.getElementById('header-arrow');
    const sections = document.querySelectorAll('section[data-section-name]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.getAttribute('data-section-name');
                headerSectionTitle.textContent = sectionName;
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        headerText.classList.toggle('hidden', isScrolled);
        headerLogo.classList.toggle('hidden', !isScrolled);
        headerSectionTitle.classList.toggle('hidden', !isScrolled);
        headerArrow.classList.toggle('hidden', isScrolled);
        siteSwitcherButton.disabled = isScrolled;
    });

    // --- BETA BANNER LOGIC ---
    const betaBanner = document.getElementById('beta-banner');
    const closeBetaBannerButton = document.getElementById('close-beta-banner');
    const contentWrapper = document.getElementById('content-wrapper');

    if (closeBetaBannerButton) {
        closeBetaBannerButton.addEventListener('click', () => {
            if (betaBanner) {
                betaBanner.style.opacity = '0';
                betaBanner.style.transform = 'scaleY(0)';
                betaBanner.style.marginTop = `-${betaBanner.offsetHeight}px`;
                
                setTimeout(() => {
                    betaBanner.remove();
                }, 300);
            }
        });
    }

    // --- MODAL LOGIC ---
    const modal = document.getElementById('modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    
    const openModal = () => {
        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    modalCloseButton.addEventListener('click', closeModal);

    document.querySelectorAll('.modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // --- HEADER DROPDOWN LOGIC ---
    const siteSwitcherButton = document.getElementById('site-switcher-button');
    const siteSwitcherDropdown = document.getElementById('site-switcher-dropdown');
    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');
    const scrollToTopButton = document.getElementById('scroll-to-top');

    const toggleDropdown = (button, dropdown) => {
        const isHidden = dropdown.classList.contains('hidden');
        siteSwitcherDropdown.classList.add('hidden');
        menuDropdown.classList.add('hidden');
        siteSwitcherButton.querySelector('svg:not(#header-logo svg)').classList.remove('rotate-180');
        
        if (isHidden) {
            dropdown.classList.remove('hidden');
            if (button.id === 'site-switcher-button') {
                button.querySelector('svg:not(#header-logo svg)').classList.add('rotate-180');
            }
        }
    };

    siteSwitcherButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(siteSwitcherButton, siteSwitcherDropdown);
    });

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(menuButton, menuDropdown);
    });

    window.addEventListener('click', () => {
        siteSwitcherDropdown.classList.add('hidden');
        menuDropdown.classList.add('hidden');
        siteSwitcherButton.querySelector('svg:not(#header-logo svg)').classList.remove('rotate-180');
    });

    // --- SCROLL-TO-TOP BUTTON LOGIC ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.remove('hidden');
        } else {
            scrollToTopButton.classList.add('hidden');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- SWIPER CAROUSEL LOGIC ---
    const mainCarousel = new Swiper('.main-carousel', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 12,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: { slidesPerView: 1.5, spaceBetween: 12 },
            768: { slidesPerView: 2.5, spaceBetween: 12 },
            1024: { slidesPerView: 3.5, spaceBetween: 12 }
        }
    });

    const projectCarousels = new Swiper('.project-carousel', {
        loop: true,
        slidesPerView: 1.25,
        spaceBetween: 12,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: { slidesPerView: 1.25, spaceBetween: 12 },
            768: { slidesPerView: 2, spaceBetween: 16 },
        }
    });
});
