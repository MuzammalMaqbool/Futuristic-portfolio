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

/* ==================== FORM VALIDATION ==================== */
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
      
      // Simulate form submission (replace with actual submission logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success state
      submitBtn.innerHTML = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
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
function init3DCarousel() {
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!carouselTrack || !prevBtn || !nextBtn) return;
  
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
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
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
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
  
  // Button events
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.gallery-section') && 
        document.querySelector('.gallery-section').getBoundingClientRect().top < window.innerHeight &&
        document.querySelector('.gallery-section').getBoundingClientRect().bottom > 0) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    }
  });
  
  // Auto-play (optional - can be disabled)
  let autoPlayInterval;
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Start auto-play
  startAutoPlay();
  
  // Pause on hover
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }
  
  // Initialize
  updateCarousel();
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
