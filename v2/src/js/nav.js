export function initNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const backdrop = document.getElementById('nav-backdrop');

    if (navToggle && navMenu) {
        function toggleMenu() {
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                navMenu.classList.remove('active');
                if (backdrop) backdrop.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = `
                    <svg class="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                `;
            } else {
                navMenu.classList.add('active');
                if (backdrop) backdrop.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
                navToggle.innerHTML = `
                    <svg class="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                `;
            }
        }

        navToggle.addEventListener('click', toggleMenu);

        if (backdrop) {
            backdrop.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        }

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Highlight current active link dynamically based on URL path
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Check if current URL matches link href
        if (
            (href === './' || href === 'index.html' || href === '/') &&
            (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '' || currentPath.endsWith('/soham-portfolio/'))
        ) {
            link.classList.add('active');
        } else if (href !== './' && currentPath.includes(href.replace('./', ''))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
