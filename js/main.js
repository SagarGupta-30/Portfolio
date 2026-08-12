/* ==========================================================================
   SAGAR GUPTA PORTFOLIO - MAIN JAVASCRIPT LOGIC
   GSAP ScrollTrigger, Split Typing, 3D Card Tilt, GitHub Live API & Form Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Register GSAP ScrollTrigger plugin if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ================= 1. PRELOADER & INITIALIZATION ================= */
  const loader = document.getElementById('loader');
  const loaderProgress = document.querySelector('.loader-progress');

  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      if (loaderProgress) loaderProgress.style.width = '100%';

      setTimeout(() => {
        if (loader) {
          loader.style.opacity = '0';
          loader.style.visibility = 'hidden';
        }
        initAnimations();
      }, 500);
    } else {
      if (loaderProgress) loaderProgress.style.width = progress + '%';
    }
  }, 60);

  /* ================= 2. DUAL CUSTOM CURSOR ================= */
  const cursor = document.querySelector('.cursor');
  const cursor2 = document.querySelector('.cursor2');

  if (cursor && cursor2 && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      cursor2.style.left = e.clientX + 'px';
      cursor2.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll(
      'a, button, .skill-card, .project-card, .achievement-card, .stat-card, .tab-btn'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor2.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor2.classList.remove('active'));
    });
  }

  /* ================= 3. NAVBAR SCROLL & MOBILE MENU ================= */
  const header = document.querySelector('header');
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('ri-menu-3-line');
        icon.classList.toggle('ri-close-line');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('ri-menu-3-line');
          icon.classList.remove('ri-close-line');
        }
      });
    });
  }

  /* ================= 4. TYPING ROLE ANIMATION ================= */
  const roleTextEl = document.getElementById('typing-role');
  const roles = [
    'Java Backend Developer',
    'Spring Boot Architect',
    'Open Source Contributor',
    'Google Student Ambassador 2026'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    if (!roleTextEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      roleTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  /* ================= 5. 3D CARD TILT EFFECT ================= */
  const tiltCards = document.querySelectorAll(
    '.hero-avatar-card, .project-card, .skill-card, .achievement-card, .stat-card'
  );

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ================= 6. SKILLS TAB FILTERING ================= */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ================= 7. GSAP SCROLL TRIGGER REVEALS ================= */
  function initAnimations() {
    if (typeof gsap === 'undefined') return;

    // Hero Animations
    gsap.from('.hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    gsap.from('.hero-visual', {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out'
    });

    // Section Titles
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Skill Cards Stagger
    gsap.from('.skill-card', {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      onComplete: () => animateSkillBars()
    });

    // Project Cards Stagger
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Timeline Items
    gsap.utils.toArray('.timeline-item').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Counter Numbers Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out'
          });
        }
      });
    });
  }

  function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth + '%';
    });
  }

  /* ================= 8. DYNAMIC GITHUB API INTEGRATION ================= */
  async function fetchGitHubStats() {
    const username = 'SagarGupta-30';
    const userUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

    try {
      // Fetch User Meta
      const userRes = await fetch(userUrl);
      if (userRes.ok) {
        const userData = await userRes.json();
        const avatarEl = document.getElementById('gh-avatar');
        const reposCountEl = document.getElementById('gh-repos-count');
        const followersCountEl = document.getElementById('gh-followers-count');

        if (avatarEl && userData.avatar_url) avatarEl.src = userData.avatar_url;
        if (reposCountEl) reposCountEl.textContent = userData.public_repos || '24';
        if (followersCountEl) followersCountEl.textContent = userData.followers || '150+';
      }

      // Fetch Repositories
      const reposRes = await fetch(reposUrl);
      const reposGrid = document.getElementById('github-repos-grid');

      if (reposRes.ok && reposGrid) {
        const reposData = await reposRes.json();
        if (reposData.length > 0) {
          reposGrid.innerHTML = '';
          reposData.forEach((repo) => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
              <div class="repo-top">
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-name">
                  <i class="ri-git-repository-line"></i> ${repo.name}
                </a>
                <span class="tech-tag">${repo.language || 'Java'}</span>
              </div>
              <p class="repo-desc">${repo.description || 'High-performance open-source repository & backend implementation.'}</p>
              <div class="repo-footer">
                <span><i class="ri-star-line"></i> ${repo.stargazers_count}</span>
                <span><i class="ri-git-fork-line"></i> ${repo.forks_count}</span>
              </div>
            `;
            reposGrid.appendChild(card);
          });
        }
      }
    } catch (err) {
      console.log('GitHub API offline or rate limited, using cached presentation data.');
    }
  }

  fetchGitHubStats();

  /* ================= 9. CONTACT FORM & TOAST NOTIFICATION ================= */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('❌ Please fill in all required fields.', true);
        return;
      }

      // Simulating successful submit
      showToast('🚀 Thank you! Your message has been sent to Sagar.');
      contactForm.reset();
    });
  }

  function showToast(message, isError = false) {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;

    if (isError) {
      toast.style.borderColor = '#FF4949';
    } else {
      toast.style.borderColor = 'var(--accent)';
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  /* ================= 10. SCROLL TO TOP ================= */
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
      } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
