window.scrollTo(0, 0);
$(document).ready(function() {
    // Animate dissolve-in and bobble when scrolled into view
    function animateOnScroll() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('visible');
                    // Only bobble once when visible
                    if (!$(entry.target).hasClass('bobble-done')) {
                        $(entry.target).addClass('animate-bobble bobble-done');
                        setTimeout(function() {
                            $(entry.target).removeClass('animate-bobble');
                        }, 1200);
                    }
                }
            });
        }, { threshold: 0.2 });
        $('.animate-dissolve-bobble').each(function() {
            observer.observe(this);
        });
    }
    animateOnScroll();

    // Configure button click: go to configure.html
    $('.configure-btn').on('click', function() {
        window.location.href = 'configure.html';
    });

    // Parallax Particles Background
    const canvas = document.getElementById('parallax-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = window.innerWidth, h = window.innerHeight;
        canvas.width = w; canvas.height = h;
        let mouse = {x: w/2, y: h/2};
        const particles = Array.from({length: 32}, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 18 + Math.random() * 18,
            dx: -0.3 + Math.random() * 0.6,
            dy: -0.3 + Math.random() * 0.6,
            baseR: 18 + Math.random() * 18,
            color: Math.random() > 0.5 ? '#00c6fb' : '#1976d2',
            opacity: 0.10 + Math.random() * 0.18
        }));
        function resize() {
            w = window.innerWidth; h = window.innerHeight;
            canvas.width = w; canvas.height = h;
        }
        window.addEventListener('resize', resize);
        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX; mouse.y = e.clientY;
        });
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(
                    p.x + (mouse.x-w/2)*0.02,
                    p.y + (mouse.y-h/2)*0.02,
                    p.r + Math.sin(Date.now()/700+p.x)*2,
                    0, 2*Math.PI
                );
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.restore();
                p.x += p.dx * 0.6;
                p.y += p.dy * 0.6;
                if (p.x < -p.r) p.x = w + p.r;
                if (p.x > w + p.r) p.x = -p.r;
                if (p.y < -p.r) p.y = h + p.r;
                if (p.y > h + p.r) p.y = -p.r;
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    // Scroll-to-top button
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Micro-interaction: feature-btn bounce on click
    document.querySelectorAll('.feature-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            btn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(0.92)' },
                { transform: 'scale(1.08)' },
                { transform: 'scale(1)' }
            ], {
                duration: 320,
                easing: 'cubic-bezier(.68,-0.55,.27,1.55)'
            });
        });
    });

    // --- Split-text animation for hero title ---
    function splitTextAnimation(selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        const text = el.textContent;
        el.innerHTML = '';
        el.classList.add('split-text');
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'split-letter';
            span.style.animationDelay = (i * 0.06) + 's';
            el.appendChild(span);
        });
    }
    splitTextAnimation('.hero-title');

    // --- Animate variable font axes on scroll ---
    function animateVariableHero() {
        const hero = document.querySelector('.hero-title');
        if (!hero) return;
        window.addEventListener('scroll', () => {
            const y = Math.min(window.scrollY, 400);
            const wght = 800 - y/2; // 800 to 600
            const wdth = 100 + y/8; // 100 to 150
            hero.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`;
        });
    }
    animateVariableHero();

    // --- Scroll fade-in for sections ---
    function handleScrollFadeIn() {
        document.querySelectorAll('.scroll-fade-in').forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                sec.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', handleScrollFadeIn);
    window.addEventListener('DOMContentLoaded', handleScrollFadeIn);

    // Loader fade-out: show cube for 1.5s, then hide loader
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
        setTimeout(function() {
            document.getElementById('loader-overlay').classList.add('fade-out');
            window.scrollTo(0, 0);
        }, 1500);
    });

    // Digital Cube Intro fade out - QUICK DISAPPEAR
    window.addEventListener('DOMContentLoaded', () => {
        const intro = document.getElementById('cube-intro');
        if (intro) {
            // Make it disappear after 1 second
            setTimeout(() => {
                intro.classList.add('fade-out');
                intro.style.opacity = '0';
                intro.style.visibility = 'hidden';
                window.scrollTo(0, 0);
            }, 1000);
            
            // Fallback: force hide after 3 seconds no matter what
            setTimeout(() => {
                intro.style.display = 'none';
                intro.style.opacity = '0';
                intro.style.visibility = 'hidden';
                intro.style.pointerEvents = 'none';
                window.scrollTo(0, 0);
            }, 3000);
        }
    });

    // Animated background canvas (floating particles)
    const canvasBg = document.getElementById('bg-animated');
    if (canvasBg) {
        const ctxBg = canvasBg.getContext('2d');
        let w = window.innerWidth, h = window.innerHeight;
        canvasBg.width = w; canvasBg.height = h;
        let particlesBg = Array.from({length: 60}, () => ({
            x: Math.random()*w,
            y: Math.random()*h,
            r: 1.5 + Math.random()*2.5,
            dx: -0.5 + Math.random(),
            dy: -0.5 + Math.random(),
            a: 0.2 + Math.random()*0.5
        }));
        function drawBg() {
            ctxBg.clearRect(0,0,w,h);
            for (let p of particlesBg) {
                ctxBg.beginPath();
                ctxBg.arc(p.x, p.y, p.r, 0, 2*Math.PI);
                ctxBg.fillStyle = `rgba(30,144,255,${p.a})`;
                ctxBg.shadowColor = '#1e90ff';
                ctxBg.shadowBlur = 12;
                ctxBg.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > w) p.dx *= -1;
                if (p.y < 0 || p.y > h) p.dy *= -1;
            }
            requestAnimationFrame(drawBg);
        }
        drawBg();
        window.addEventListener('resize', () => {
            w = window.innerWidth; h = window.innerHeight;
            canvasBg.width = w; canvasBg.height = h;
        });
    }

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    let tIndex = 0;
    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[tIndex].classList.remove('active');
            tIndex = (tIndex + 1) % testimonials.length;
            testimonials[tIndex].classList.add('active');
        }, 4000);
    }

    // Product card tilt effect
    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(box => {
        box.addEventListener('mousemove', e => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width/2, cy = rect.height/2;
            const dx = (x-cx)/cx, dy = (y-cy)/cy;
            box.style.transform = `rotateY(${dx*8}deg) rotateX(${-dy*8}deg) scale(1.04)`;
        });
        box.addEventListener('mouseleave', () => {
            box.style.transform = '';
        });
    });

    // Smooth scroll for all buttons
    document.querySelectorAll('a[href^="#"], button[onclick*="configure.html"]').forEach(link => {
        link.addEventListener('click', e => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // --- Highlight active nav link on scroll ---
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

    function onScrollActiveSection() {
        let scrollPos = window.scrollY || window.pageYOffset;
        let offset = 120; // adjust for sticky header
        let currentSection = sections[0];
        for (let section of sections) {
            if (section.offsetTop - offset <= scrollPos) {
                currentSection = section;
            }
        }
        navLinks.forEach(link => link.classList.remove('active'));
        let activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${currentSection.id}`);
        if (activeLink) activeLink.classList.add('active');
    }
    window.addEventListener('scroll', onScrollActiveSection);
    window.addEventListener('DOMContentLoaded', onScrollActiveSection);

    // --- Email-capture modal logic ---
    const leadModal = document.getElementById('lead-modal');
    const openLeadModalBtn = document.getElementById('open-lead-modal');
    const closeLeadModalBtn = document.getElementById('close-lead-modal');
    const leadForm = document.getElementById('lead-form');
    const leadSuccess = document.getElementById('lead-success');
    let leadModalTimeout;

    function openLeadModal() {
        leadModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.getElementById('lead-email').focus();
    }
    function closeLeadModal() {
        leadModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    if (openLeadModalBtn) {
        openLeadModalBtn.addEventListener('click', openLeadModal);
    }
    if (closeLeadModalBtn) {
        closeLeadModalBtn.addEventListener('click', closeLeadModal);
    }
    window.addEventListener('keydown', function(e) {
        if (leadModal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
            closeLeadModal();
        }
    });
    // Show modal after 10s if not already opened
    leadModalTimeout = setTimeout(() => {
        if (leadModal.style.display !== 'flex') openLeadModal();
    }, 10000);
    // Handle form submit
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            leadForm.style.display = 'none';
            leadSuccess.style.display = 'block';
            setTimeout(closeLeadModal, 3500);
        });
    }
}); 