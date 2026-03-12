document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. Custom Cursor Logic
    // =========================================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;

            const hoverable = e.target.closest('a, button, input, textarea, .project-card');
            if (hoverable) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            } else {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            }
        });
    }

    // =========================================================
    // 2. Dynamic Greeting
    // =========================================================
    const greetingElement = document.getElementById('greeting');
    const updateGreeting = () => {
        const hour = new Date().getHours();
        let greetingText = 'HELLO';
        if (hour >= 5 && hour < 12) greetingText = 'GOOD MORNING';
        else if (hour >= 12 && hour < 18) greetingText = 'GOOD AFTERNOON';
        else if (hour >= 18 || hour < 5) greetingText = 'GOOD EVENING';
        if (greetingElement) greetingElement.textContent = greetingText;
    };
    updateGreeting();

    // =========================================================
    // 3. Theme Toggle
    // =========================================================
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // =========================================================
    // 4. Mobile Navigation Toggle (Assignment 2)
    // =========================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    function openNav() {
        navLinks.classList.add('nav-open');
        navOverlay.classList.add('visible');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
        menuToggle.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navLinks.classList.remove('nav-open');
        navOverlay.classList.remove('visible');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        menuToggle.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeNav() : openNav();
    });

    navOverlay.addEventListener('click', closeNav);

    // Close nav when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close nav on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeNav();
            menuToggle.focus();
        }
    });

    // =========================================================
    // 5. Project Explorer – Data & Rendering (Assignment 2)
    // =========================================================
    const PROJECTS = [
        {
            id: 'ai-salesman',
            title: 'AI SALESMAN',
            role: 'KAUST Academy × Jarir',
            desc: 'Browser extension comparing 500+ products via chat. RAG pipeline with comparison logic.',
            tags: ['LangChain', 'FastAPI', 'React'],
            categories: ['ai', 'fullstack'],
            visual: 'p1-visual'
        },
        {
            id: 'qudrat-prep',
            title: 'QUDRAT PREP',
            role: 'Full Stack Platform',
            desc: 'Full-stack exam preparation platform for high school students. Features progress tracking and dashboards to support habit-driven learning.',
            tags: ['Next.js', 'Supabase', 'Vertex AI'],
            categories: ['fullstack', 'ai'],
            visual: 'p2-visual'
        },
        {
            id: 'candid-cam',
            title: 'CANDID CAM',
            role: 'Computer Vision',
            desc: 'Real-time face matching in 4,000+ image collections with &lt;1s response time.',
            tags: ['MediaPipe', 'Dlib', 'Python'],
            categories: ['cv', 'ai'],
            visual: 'p3-visual'
        },
        {
            id: 'rl-anti-jamming',
            title: 'RL ANTI-JAMMING',
            role: 'Research @ KFUPM',
            desc: 'Deep Reinforcement Learning applied to wireless communications security.',
            tags: ['PyTorch', 'RL', 'Python'],
            categories: ['ai', 'research', 'rl'],
            visual: 'p4-visual'
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    const projectsEmpty = document.getElementById('projectsEmpty');
    const projectSearch = document.getElementById('project-search');
    const filterChips = document.querySelectorAll('.filter-chip');
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');

    let activeFilter = 'all';
    let searchQuery = '';

    function buildCardHTML(project) {
        const tagsHTML = project.tags
            .map(tag => `<li>${tag}</li>`)
            .join('');
        return `
            <article class="project-card" data-id="${project.id}" tabindex="0">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-role">${project.role}</p>
                    <p class="project-desc">${project.desc}</p>
                    <ul class="project-tags">${tagsHTML}</ul>
                </div>
                <div class="project-visual ${project.visual}"></div>
            </article>`;
    }

    function getFilteredProjects() {
        const q = searchQuery.toLowerCase().trim();
        return PROJECTS.filter(p => {
            const matchesCategory = activeFilter === 'all' || p.categories.includes(activeFilter);
            const matchesSearch = !q ||
                p.title.toLowerCase().includes(q) ||
                p.role.toLowerCase().includes(q) ||
                p.desc.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q));
            return matchesCategory && matchesSearch;
        });
    }

    function renderProjects() {
        const filtered = getFilteredProjects();

        if (filtered.length === 0) {
            projectsGrid.innerHTML = '';
            projectsEmpty.hidden = false;
        } else {
            projectsEmpty.hidden = true;
            projectsGrid.innerHTML = filtered.map(buildCardHTML).join('');
            // Re-apply scroll reveal and tilt to newly created cards
            applyScrollRevealToCards();
            applyTiltToCards();
        }
    }

    // Filter chip click
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeFilter = chip.dataset.filter;
            renderProjects();
        });
    });

    // Live search
    projectSearch.addEventListener('input', () => {
        searchQuery = projectSearch.value;
        renderProjects();
    });

    // Reset filters
    resetFiltersBtn.addEventListener('click', () => {
        searchQuery = '';
        activeFilter = 'all';
        projectSearch.value = '';
        filterChips.forEach(c => c.classList.remove('active'));
        filterChips[0].classList.add('active');
        renderProjects();
    });

    // =========================================================
    // 6. Scroll Reveal Animation
    // =========================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function applyScrollRevealToCards() {
        projectsGrid.querySelectorAll('.project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    document.querySelectorAll('.section-title, .about-text, .timeline-item, .contact-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleSheet);

    // Initial render after observer setup so cards can be observed safely.
    renderProjects();

    // =========================================================
    // 7. Smooth Scroll for Anchor Links
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =========================================================
    // 8. 3D Tilt Effect for Cards (applied to dynamic cards)
    // =========================================================
    function applyTiltToCards() {
        projectsGrid.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // =========================================================
    // 9. Contact Form – Validation, Draft Save & Feedback (Assignment 2)
    // =========================================================
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    const DRAFT_KEY = 'contactDraft';

    // Restore any saved draft from localStorage
    const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (savedDraft) {
        if (savedDraft.name) nameInput.value = savedDraft.name;
        if (savedDraft.email) emailInput.value = savedDraft.email;
        if (savedDraft.message) {
            messageInput.value = savedDraft.message;
            updateCharCounter();
        }
    }

    function saveDraft() {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        }));
    }

    function clearDraft() {
        localStorage.removeItem(DRAFT_KEY);
    }

    function updateCharCounter() {
        const len = messageInput.value.length;
        charCounter.textContent = `${len} / 500`;
        charCounter.classList.toggle('char-counter--warn', len >= 450);
    }

    function setFieldError(inputEl, errorId, message) {
        const errorEl = document.getElementById(errorId);
        errorEl.textContent = message;
        inputEl.setAttribute('aria-describedby', errorId);
        inputEl.classList.add('field-invalid');
    }

    function clearFieldError(inputEl, errorId) {
        const errorEl = document.getElementById(errorId);
        errorEl.textContent = '';
        inputEl.removeAttribute('aria-describedby');
        inputEl.classList.remove('field-invalid');
    }

    function validateForm() {
        let valid = true;

        // Name
        if (nameInput.value.trim().length < 2) {
            setFieldError(nameInput, 'name-error', 'Please enter your name (at least 2 characters).');
            valid = false;
        } else {
            clearFieldError(nameInput, 'name-error');
        }

        // Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            setFieldError(emailInput, 'email-error', 'Please enter a valid email address.');
            valid = false;
        } else {
            clearFieldError(emailInput, 'email-error');
        }

        // Message
        if (messageInput.value.trim().length < 10) {
            setFieldError(messageInput, 'message-error', 'Please write at least 10 characters.');
            valid = false;
        } else {
            clearFieldError(messageInput, 'message-error');
        }

        return valid;
    }

    // Clear field errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            clearFieldError(input, `${input.id}-error`);
            saveDraft();
        });
    });

    messageInput.addEventListener('input', updateCharCounter);

    function showFormStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = `form-status form-status--${type}`;
        formStatus.hidden = false;
        setTimeout(() => { formStatus.hidden = true; }, 5000);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm()) {
                showFormStatus('error', 'Please fix the errors above before sending.');
                return;
            }

            const btn = form.querySelector('.submit-btn');
            const btnText = btn.querySelector('.btn-text');
            btn.disabled = true;
            btnText.textContent = 'SENDING...';

            // Simulate network delay; replace with a real service (e.g. Formspree) later
            setTimeout(() => {
                btnText.textContent = 'SENT';
                showFormStatus('success', 'Message sent! I\'ll get back to you soon.');
                clearDraft();
                form.reset();
                updateCharCounter();
                btn.disabled = false;

                setTimeout(() => { btnText.textContent = 'SEND'; }, 3000);
            }, 1500);
        });
    }

});
