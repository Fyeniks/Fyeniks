
// Commission status color
document.querySelectorAll('.commission-state').forEach((state) => {
    const value = state.textContent.trim().toLowerCase();
    state.classList.toggle('open', value === 'open');
    state.classList.toggle('selective', value === 'selective');
    state.classList.toggle('closed', value === 'closed');
});

const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navbar.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// Typewriter text on the homepage
const typedText = document.querySelector('#typed-text');
const words = ['Video Editor', 'Motion Designer', 'Web Developer', 'Thumbnail Designer', 'Content Creator'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!typedText) return;

    const currentWord = words[wordIndex];

    if (deleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = deleting ? 55 : 95;

    if (!deleting && charIndex === currentWord.length) {
        speed = 1200;
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 250;
    }

    setTimeout(typeLoop, speed);
}

typeLoop();

// Reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Portfolio / experience filters
const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

function applyPortfolioFilter(filter) {
    workCards.forEach((card) => {
        const isFeatured = card.dataset.featured === 'true';
        const isMatchingCategory = card.dataset.category === filter;
        const shouldShow = filter === 'all' ? isFeatured : isMatchingCategory;

        card.classList.toggle('hidden', !shouldShow);

        // Shorts view: show the 3 extra hidden shorts first,
        // and keep the 3 main shorts at the bottom.
        if (filter === 'short' && card.dataset.category === 'short') {
            card.style.order = isFeatured ? '2' : '1';
        } else {
            card.style.order = '';
        }
    });
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        applyPortfolioFilter(button.dataset.filter);
    });
});

applyPortfolioFilter('all');

// Play YouTube videos directly inside Experience cards
document.querySelectorAll('.work-thumb.playable-video[data-youtube-id]').forEach((thumb) => {
    const playVideo = () => {
        if (thumb.classList.contains('is-playing')) return;

        const videoId = thumb.dataset.youtubeId;
        const title = thumb.dataset.youtubeTitle || 'YouTube video';

        thumb.classList.add('is-playing');
        thumb.removeAttribute('role');
        thumb.removeAttribute('tabindex');
        thumb.setAttribute('aria-label', title);
        thumb.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.className = 'youtube-embed';
        iframe.title = title;

        // YouTube can show Error 153 when the embed does not receive a proper referrer/origin.
        // This matches YouTube's current recommended iframe setup.
        const origin = window.location.origin && window.location.origin !== 'null'
            ? `&origin=${encodeURIComponent(window.location.origin)}`
            : '';

        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${origin}`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;
        iframe.setAttribute('frameborder', '0');

        thumb.appendChild(iframe);
    };

    thumb.addEventListener('click', playVideo);
    thumb.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            playVideo();
        }
    });
});



// Active menu item based on the section that is actually visible
const navLinks = document.querySelectorAll('.nav-link');
const linkedSections = Array.from(navLinks)
    .map((link) => {
        const url = new URL(link.getAttribute('href'), window.location.href);
        const id = url.hash.replace('#', '');
        const section = id ? document.getElementById(id) : null;
        return section ? { link, section, id } : null;
    })
    .filter(Boolean);

function updateActiveNav() {
    if (!linkedSections.length) {
        navLinks.forEach((link) => link.classList.remove('active'));
        return;
    }

    const checkLine = window.scrollY + Math.min(window.innerHeight * 0.42, 360);
    let activeItem = null;

    linkedSections.forEach((item) => {
        const top = item.section.offsetTop;
        const bottom = top + item.section.offsetHeight;
        if (checkLine >= top && checkLine < bottom) {
            activeItem = item;
        }
    });

    navLinks.forEach((link) => link.classList.remove('active'));
    if (activeItem) activeItem.link.classList.add('active');
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateActiveNav();
