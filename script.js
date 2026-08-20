/* ============================================
   AZAM MALIK - ADVANCED PORTFOLIO SCRIPTS
   Modern Animations & Interactive Features
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initLoader();
  initCursor();
  initHeader();
  initMobileMenu();
  initScrollProgress();
  initScrollReveal();
  initCounters();
  initTypedText();
  initParallax();
  initBackToTop();
  initSmoothScroll();
  initActiveNavLink();
  initFormValidation();
  init3DCarousel();
  initYouTubeFetcher();
  setCurrentYear();
});

/* ==================== LOADER ==================== */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  
  document.body.classList.add('loading');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      
      // Trigger entrance animations
      triggerEntranceAnimations();
    }, 800);
  });
  
  // Fallback - hide loader after 3 seconds
  setTimeout(() => {
    if (!loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      triggerEntranceAnimations();
    }
  }, 3000);
}

function triggerEntranceAnimations() {
  // Animate hero elements
  const heroElements = document.querySelectorAll('.hero-section .reveal, .hero-section [class*="stagger"]');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 100);
  });
}

/* ==================== CUSTOM CURSOR ==================== */
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (!cursor || !cursorDot || window.matchMedia('(hover: none)').matches) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update dot position immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  // Smooth cursor animation
  function animateCursor() {
    // Lerp for smooth movement
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .btn, .card, .social-icon, input, textarea');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
}

/* ==================== HEADER SCROLL EFFECTS ==================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let lastScroll = 0;
  const scrollThreshold = 50;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll direction (optional - uncomment if needed)
    // if (currentScroll > lastScroll && currentScroll > 200) {
    //   header.style.transform = 'translateY(-100%)';
    // } else {
    //   header.style.transform = 'translateY(0)';
    // }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ==================== MOBILE MENU ==================== */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (!menuToggle || !nav) return;
  
  // Toggle menu function
  function toggleMenu() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }
  
  // Click event
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });
  
  // Touch event for better mobile support
  menuToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });
  
  // Close menu on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==================== SCROLL PROGRESS BAR ==================== */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
}

/* ==================== SCROLL REVEAL ANIMATIONS ==================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!revealElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally stop observing after reveal
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/* ==================== ANIMATED COUNTERS ==================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  if (!counters.length) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;
  
  const easeOutQuad = t => t * (2 - t);
  
  const counter = setInterval(() => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentCount = Math.round(target * progress);
    
    element.textContent = currentCount + suffix;
    
    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = target + suffix;
    }
  }, frameDuration);
}

/* ==================== TYPED TEXT EFFECT ==================== */
function initTypedText() {
  const typedElements = document.querySelectorAll('.typed-text');
  
  typedElements.forEach(element => {
    const texts = JSON.parse(element.getAttribute('data-texts') || '[]');
    if (!texts.length) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next word
      }
      
      setTimeout(type, typeSpeed);
    }
    
    type();
  });
}

/* ==================== PARALLAX EFFECTS ==================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }, { passive: true });
}

/* ==================== BACK TO TOP BUTTON ==================== */
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });
  
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==================== SMOOTH SCROLL ==================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==================== ACTIVE NAV LINK ==================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isHome = href === 'index.html' && (currentPath === '' || currentPath === 'index.html');
    
    if (href === currentPath || isHome) {
      link.classList.add('active');
    }
  });
}

/* ==================== FORM VALIDATION & SUBMISSION ==================== */
function initFormValidation() {
  const forms = document.querySelectorAll('.contact-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Validate
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          input.style.borderColor = '#ef4444';
        } else {
          input.classList.remove('error');
          input.style.borderColor = '';
        }
      });
      
      // Email validation
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          isValid = false;
          emailInput.classList.add('error');
          emailInput.style.borderColor = '#ef4444';
        }
      }
      
      if (!isValid) return;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
      
      const formData = new FormData(form);
      const dataObj = {};
      formData.forEach((value, key) => { dataObj[key] = value; });
      dataObj["_subject"] = `New Contact Form Submission from ${dataObj.name || 'Portfolio'}`;
      dataObj["_captcha"] = "false";

      try {
        const actionUrl = form.getAttribute('action') || 'https://formsubmit.co/ajax/azammalik65@gmail.com';
        const ajaxUrl = actionUrl.includes('/ajax/') ? actionUrl : actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');

        const response = await fetch(ajaxUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(dataObj)
        });

        const result = await response.json();

        if (response.ok && result.success !== "false") {
          submitBtn.innerHTML = '✓ Message Sent!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          form.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX fallback:', err);
        const name = dataObj.name || '';
        const email = dataObj.email || '';
        const org = dataObj.organization ? `\nOrganization: ${dataObj.organization}` : '';
        const msg = dataObj.message || '';
        const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}${org}\n\nMessage:\n${msg}`);
        
        window.location.href = `mailto:azammalik65@gmail.com?subject=${subject}&body=${body}`;
        
        submitBtn.innerHTML = '✓ Email App Opened';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        form.reset();
      } finally {
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 4000);
      }
    });
    
    // Remove error state on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        input.style.borderColor = '';
      });
    });
  });
}

/* ==================== 3D CAROUSEL ==================== */
function setup3DCarousel(trackId, prevId, nextId, dotsId) {
  const carouselTrack = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dotsContainer = document.getElementById(dotsId);
  
  if (!carouselTrack || !prevBtn || !nextBtn) return;
  
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev', 'next');
      
      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index === currentIndex - 1 || (currentIndex === 0 && index === slides.length - 1)) {
        slide.classList.add('prev');
      } else if (index === currentIndex + 1 || (currentIndex === slides.length - 1 && index === 0)) {
        slide.classList.add('next');
      }
    });
    
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  }
  
  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateCarousel();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  let autoPlayInterval = setInterval(nextSlide, 5000);
  const carouselWrapper = carouselTrack.closest('.carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carouselWrapper.addEventListener('mouseleave', () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, 5000);
    });
  }
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  });
  
  updateCarousel();
}

function init3DCarousel() {
  setup3DCarousel('carouselTrack', 'carouselPrev', 'carouselNext', 'carouselDots');
  setup3DCarousel('videoCarouselTrack', 'videoCarouselPrev', 'videoCarouselNext', 'videoCarouselDots');
}

/* ==================== SET CURRENT YEAR ==================== */
function setCurrentYear() {
  const yearElements = document.querySelectorAll('#year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

/* ==================== UTILITY FUNCTIONS ==================== */

// Debounce function
function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function
function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Lerp (Linear Interpolation)
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/* ==================== YOUTUBE AUTOMATIC VIDEO FETCHER ==================== */
function initYouTubeFetcher() {
  const container = document.getElementById('youtube-videos-grid');
  if (!container) return;

  // Initial loading indicator
  container.innerHTML = `
    <div class="card reveal" style="padding: 2.5rem; text-align: center; grid-column: 1 / -1; background: var(--surface);">
      <p style="color: var(--text-muted); font-size: 1.1rem;">Loading latest YouTube uploads from @azammalik65...</p>
    </div>
  `;

  function renderVideoCards(videos) {
    if (!videos || !videos.length) {
      renderFallbackEmbeds();
      return;
    }

    container.innerHTML = videos.map((video, index) => {
      const videoId = video.videoId || '';
      const title = video.title || 'Azam Malik Talk';
      // Original YouTube Thumbnail from YouTube CDN
      const thumb = video.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '');
      const date = video.published ? new Date(video.published).toLocaleDateString() : (video.category || 'Official Upload');

      return `
        <article class="yt-video-card reveal stagger-${(index % 3) + 1}" data-video-id="${videoId}">
          <div class="yt-thumb-wrapper">
            <img src="${thumb}" alt="${title}" loading="lazy" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'" />
            <div class="yt-play-overlay">
              <div class="yt-play-btn-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="yt-video-info">
            <h4>${title}</h4>
            <div class="yt-video-meta">
              <span>${date}</span>
              <span style="color: #ef4444; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1.1-1.2-2-2.3-2.3C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.2.4C1.7 4.2.8 5.1.5 6.2.1 8 .1 12 .1 12s0 4 .4 5.8c.3 1.1 1.2 2 2.3 2.3 1.8.4 9.2.4 9.2.4s7.4 0 9.2-.4c1.1-.3 2-1.2 2.3-2.3.4-1.8.4-5.8.4-5.8s0-4-.4-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
                Preview Video
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click events to open instant video player modal
    container.querySelectorAll('.yt-video-card').forEach(card => {
      card.addEventListener('click', () => {
        const vId = card.getAttribute('data-video-id');
        if (vId) {
          openYouTubeModal(vId);
        } else {
          window.open('https://www.youtube.com/@azammalik65', '_blank');
        }
      });
    });

    initScrollReveal();
  }

  function renderFallbackEmbeds() {
    // Featured top videos directly scraped from @AzamMalik65 YouTube channel with original YouTube CDN thumbnails & click-to-preview player
    const defaultVideos = [
      {
        videoId: "zQAE9DmeQjI",
        title: "Can Pakistan Compete with India's $150 Billion IT Industry?",
        category: "Tech & Economy",
        published: "Future Fest by Ejad Labs",
        thumbnail: "https://i.ytimg.com/vi/zQAE9DmeQjI/hqdefault.jpg"
      },
      {
        videoId: "xv0GP-r4-e8",
        title: "Podcast with Prominent TV Host Dr Abeera Babur",
        category: "Podcast & Talk",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/xv0GP-r4-e8/hqdefault.jpg"
      },
      {
        videoId: "UZQaYZKkpSQ",
        title: "Podcast with Renowned Journalist & Political Analyst Khalid Farooqi",
        category: "Interview",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/UZQaYZKkpSQ/hqdefault.jpg"
      },
      {
        videoId: "vQZxFQfYH4U",
        title: "A Candid Talk with Zeeshan Javaid CEO Fixelcloud at his office",
        category: "Industry Discussion",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/vQZxFQfYH4U/hqdefault.jpg"
      },
      {
        videoId: "5e8lMnHPwIA",
        title: "Qasim Ali Shah & Gabe Gabrielle talking about 5 research methods of Living long",
        category: "Keynote & Research",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/5e8lMnHPwIA/hqdefault.jpg"
      },
      {
        videoId: "CPnTnc-njqQ",
        title: "An Interview with Zahid Durrani General Secretary Roshni Association Hosted by Azam Malik",
        category: "Civic & Community",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/CPnTnc-njqQ/hqdefault.jpg"
      },
      {
        videoId: "EMW9OAwTAn8",
        title: "A Brief Interview with Amjad Mehmood Siddiqi Project Manager Muslim Hands Educational Complex",
        category: "Development Talk",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/EMW9OAwTAn8/hqdefault.jpg"
      },
      {
        videoId: "Y0qckl8H-mI",
        title: "Meet A Norwegian Pakistani Tayyab Chaudri Head of IHSG Norway",
        category: "Global Network",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/Y0qckl8H-mI/hqdefault.jpg"
      },
      {
        videoId: "vPOo4fN7vMs",
        title: "An Brief Interview with the author of Book “Tameer - Bunyad se Takmeel Tak”",
        category: "Book & Literature",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/vPOo4fN7vMs/hqdefault.jpg"
      },
      {
        videoId: "3c_Vn6G7-kE",
        title: "A Visit of Rehabilitation Centre of Roshni Association Bedian Road Lahore",
        category: "Community Impact",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/3c_Vn6G7-kE/hqdefault.jpg"
      },
      {
        videoId: "Erg-_tNa7s8",
        title: "Interview & Keynote Talk by Azam Malik",
        category: "Keynote & Talk",
        published: "Official Channel",
        thumbnail: "https://i.ytimg.com/vi/Erg-_tNa7s8/hqdefault.jpg"
      }
    ];

    renderVideoCards(defaultVideos);
  }

  // Auto-fetch latest videos dynamically whenever a new video is uploaded to @AzamMalik65
  const targetRssFeed = 'https://www.youtube.com/feeds/videos.xml?user=azammalik65';
  const rssJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetRssFeed)}`;

  fetch(rssJsonUrl)
    .then(res => res.json())
    .then(data => {
      if (data && data.status === 'ok' && data.items && data.items.length > 0) {
        const fetchedVideos = data.items.map(item => {
          const match = item.link ? item.link.match(/v=([^&]+)/) : null;
          const videoId = match ? match[1] : (item.guid ? item.guid.split(':').pop() : '');
          return {
            videoId: videoId,
            title: item.title,
            published: item.pubDate,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          };
        }).filter(v => v.videoId);

        if (fetchedVideos.length > 0) {
          renderVideoCards(fetchedVideos);
          return;
        }
      }
      renderFallbackEmbeds();
    })
    .catch(err => {
      console.warn('YouTube Live Auto-Sync Notice:', err);
      renderFallbackEmbeds();
    });
}

// Modal helper for YouTube playback
function openYouTubeModal(videoId) {
  let modal = document.querySelector('.yt-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'yt-modal-overlay';
    modal.innerHTML = `
      <div class="yt-modal-container">
        <button class="yt-modal-close" aria-label="Close modal">&times;</button>
        <div class="yt-modal-iframe-wrapper">
          <iframe id="yt-modal-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.yt-modal-close').addEventListener('click', closeYouTubeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeYouTubeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeYouTubeModal();
    });
  }

  const iframe = modal.querySelector('#yt-modal-iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeYouTubeModal() {
  const modal = document.querySelector('.yt-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    const iframe = modal.querySelector('#yt-modal-iframe');
    if (iframe) iframe.src = '';
    document.body.style.overflow = '';
  }
}

// Modal helper for Facebook video playback inside website
function openFacebookModal(fbUrl) {
  let modal = document.querySelector('.fb-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'yt-modal-overlay fb-modal-overlay';
    modal.innerHTML = `
      <div class="yt-modal-container">
        <button class="yt-modal-close" aria-label="Close modal">&times;</button>
        <div class="yt-modal-iframe-wrapper">
          <iframe id="fb-modal-iframe" src="" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen="true"></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.yt-modal-close').addEventListener('click', closeFacebookModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeFacebookModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeFacebookModal();
    });
  }

  const iframe = modal.querySelector('#fb-modal-iframe');
  // Canonical Facebook video URL for embedded playback without external redirect
  let targetUrl = fbUrl || 'https://www.facebook.com/urdupoint.network/videos/1260982727824215/';
  if (targetUrl.includes('fb.watch')) {
    targetUrl = 'https://www.facebook.com/urdupoint.network/videos/1260982727824215/';
  }
  
  iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(targetUrl)}&show_text=false&autoplay=true`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFacebookModal() {
  const modal = document.querySelector('.fb-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    const iframe = modal.querySelector('#fb-modal-iframe');
    if (iframe) iframe.src = '';
    document.body.style.overflow = '';
  }
}


