/* ==========================================================================
   BAL JYOTI FOUNDATION - CORE SCRIPTS
   Orchestration of GSAP, ScrollTrigger, Lenis Scroll, preloader & custom cursor
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. HERO ENTRANCE ANIMATIONS (declared FIRST so preloader can call it)
  // ------------------------------------------------------------------------
  // FIX: 'header' was used before being declared — now declared here
  const header = document.getElementById('main-header');

  const triggerEntranceAnimations = () => {
    try {
      const tl = gsap.timeline();
      tl.fromTo('.main-header',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      tl.fromTo('.hero-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
      tl.fromTo('.hero-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      );
      tl.fromTo('.hero-subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.7'
      );
      tl.fromTo('.hero-ctas',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.7'
      );
    } catch (e) {
      // GSAP not loaded yet — just make elements visible
      ['.main-header', '.hero-eyebrow', '.hero-title', '.hero-subtitle', '.hero-ctas'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
    }
  };

  // ------------------------------------------------------------------------
  // 2. PRELOADER — MUST ALWAYS HIDE (never get stuck)
  // ------------------------------------------------------------------------
  const loaderBar = document.getElementById('preloader-bar-fill');
  const preloader = document.getElementById('preloader');
  let progress = 0;
  let preloaderDone = false;

  const finishPreloader = () => {
    if (preloaderDone) return;
    preloaderDone = true;
    progress = 100;
    if (loaderBar) loaderBar.style.width = '100%';
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
        // FIX: Fully remove from layout after CSS transition (0.8s) completes
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 900);
      }
      triggerEntranceAnimations();
    }, 300);
  };

  const startPreloader = () => {
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 18) + 8;
      if (progress >= 100) {
        clearInterval(interval);
        finishPreloader();
      } else {
        if (loaderBar) loaderBar.style.width = `${progress}%`;
      }
    }, 25);

    // Ensure preloader ends when page is fully loaded
    window.addEventListener('load', () => {
      clearInterval(interval);
      finishPreloader();
    }, { once: true });

    // SAFETY NET: Force-hide preloader after 4 seconds no matter what
    setTimeout(() => {
      finishPreloader();
    }, 4000);
  };

  if (loaderBar && preloader) {
    startPreloader();
  } else {
    triggerEntranceAnimations();
  }


  // ------------------------------------------------------------------------
  // 2. INITIALIZE LENIS SMOOTH SCROLL (Kinetic Scrolling)
  // ------------------------------------------------------------------------
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical'
  });
  window.lenis = lenis;

  // FIX: Single RAF loop for Lenis — removed duplicate gsap.ticker.add(lenis.raf)
  // which caused double-ticking and scroll jank
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Hook ScrollTrigger updates to Lenis scroll events
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);


  // ------------------------------------------------------------------------
  // 3. ADVANCED GSAP & SCROLLTRIGGER ANIMATIONS
  // ------------------------------------------------------------------------

  // (triggerEntranceAnimations is now declared at the top of DOMContentLoaded)

  // Scroll Progress indicator
  gsap.to('#scroll-progress-bar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

  // ------------------------------------------------------------------------
  // HERO FAST CINEMATIC SLIDESHOW (2.5s duration, Touch Swipe, Preload Next 3)
  // ------------------------------------------------------------------------
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slideshow-dots .dot');
  let currentSlideIndex = 0;
  let heroSlideTimer = null;
  const slideDuration = 2500; // 2.5 seconds per slide (fast, continuous)

  // Preload upcoming images proactively to avoid flickering
  const preloadUpcomingImages = (currentIndex) => {
    if (heroSlides.length <= 1) return;
    for (let offset = 1; offset <= 3; offset++) {
      const idx = (currentIndex + offset) % heroSlides.length;
      const img = heroSlides[idx].querySelector('img');
      if (img && img.getAttribute('loading') === 'lazy') {
        img.removeAttribute('loading');
      }
    }
  };

  const showHeroSlide = (index) => {
    if (heroSlides.length === 0) return;
    const nextIndex = (index + heroSlides.length) % heroSlides.length;

    // Batch class list updates efficiently
    requestAnimationFrame(() => {
      heroSlides.forEach((slide, i) => {
        if (i === nextIndex) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      heroDots.forEach((dot, i) => {
        if (i === nextIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    });

    currentSlideIndex = nextIndex;
    preloadUpcomingImages(nextIndex);
  };

  const startHeroSlideshow = () => {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(() => {
      showHeroSlide(currentSlideIndex + 1);
    }, slideDuration);
  };

  if (heroSlides.length > 0) {
    showHeroSlide(0);
    startHeroSlideshow();

    // Dot pagination click events
    heroDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-slide'), 10);
        showHeroSlide(targetIdx);
        startHeroSlideshow();
      });
    });

    // Keyboard navigation (ArrowLeft & ArrowRight)
    document.addEventListener('keydown', (e) => {
      const heroSec = document.getElementById('hero');
      if (!heroSec) return;
      const rect = heroSec.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        if (e.key === 'ArrowRight') {
          showHeroSlide(currentSlideIndex + 1);
          startHeroSlideshow();
        } else if (e.key === 'ArrowLeft') {
          showHeroSlide(currentSlideIndex - 1);
          startHeroSlideshow();
        }
      }
    });

    // Mobile Touch Swipe Support
    const heroSec = document.getElementById('hero');
    if (heroSec) {
      let touchStartX = 0;
      let touchEndX = 0;

      heroSec.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          touchStartX = e.touches[0].clientX;
        }
      }, { passive: true });

      heroSec.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 40) { // 40px threshold for swipe
            if (diff > 0) {
              showHeroSlide(currentSlideIndex + 1); // Swipe Left -> Next
            } else {
              showHeroSlide(currentSlideIndex - 1); // Swipe Right -> Prev
            }
            startHeroSlideshow();
          }
        }
      }, { passive: true });

      // Pause auto-play on mouse enter, resume on mouse leave
      heroSec.addEventListener('mouseenter', () => clearInterval(heroSlideTimer));
      heroSec.addEventListener('mouseleave', () => startHeroSlideshow());
    }
  }

  // Hero Zoom-out Parallax on scroll
  gsap.to('.hero-slide-img', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });


  // Header shrink and color transformation on scroll
  if (header) {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 100px',
      onEnter: () => header.classList.add('scrolled'),
      onLeaveBack: () => header.classList.remove('scrolled')
    });
  }

  // About Section Image Slide Reveal (Masking)
  gsap.from('.about-img-frame', {
    clipPath: 'inset(100% 0px 0px 0px)',
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Reveal grid items and section texts dynamically on scroll
  const revealObservers = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  revealObservers.forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Interventions Cards Stagger Reveal
  gsap.from('.intervention-card', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.interventions-grid',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  // Stats Counters activation
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const countObj = { val: 0 };
    gsap.to(countObj, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.stats-banner-section',
        start: 'top 85%'
      },
      onUpdate: () => {
        counter.textContent = Math.ceil(countObj.val).toLocaleString() + '+';
      }
    });
  });

  // CTA Section background Parallax zoom
  gsap.to('.cta-bg-parallax', {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: {
      trigger: '.cta-banner-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });


  // ------------------------------------------------------------------------
  // 4. CUSTOM MOUSE CURSOR TRAILING EFFECT
  // ------------------------------------------------------------------------
  const dot = document.getElementById('custom-cursor-dot');
  const circle = document.getElementById('custom-cursor-circle');

  // Assign hover class dynamically to all interactive anchors
  document.querySelectorAll('a, button, input, select, textarea, .before-after-slider, .partner-logo-item').forEach(el => {
    el.classList.add('hover-target');
  });

  if (dot && circle) {
    let mouseInitiated = false;

    window.addEventListener('mousemove', (e) => {
      if (!mouseInitiated) {
        dot.style.opacity = 1;
        circle.style.opacity = 1;
        mouseInitiated = true;
      }

      const posX = e.clientX;
      const posY = e.clientY;

      dot.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;

      if (typeof gsap !== 'undefined') {
        gsap.to(circle, {
          x: posX,
          y: posY,
          duration: 0.22,
          overwrite: 'auto'
        });
      } else {
        circle.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
      }
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = 0;
      circle.style.opacity = 0;
      mouseInitiated = false;
    });

    const hoverElements = document.querySelectorAll('.hover-target');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }


  // ------------------------------------------------------------------------
  // 5. MOBILE NAVIGATION MENU
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu-donate-btn');

  if (mobileToggle && mobileMenu) {
    const toggleMobileMenu = () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      if (!isExpanded) {
        lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        lenis.start();
        document.body.style.overflow = 'auto';
      }
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        lenis.start();
        document.body.style.overflow = 'auto';
      });
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        lenis.start();
        document.body.style.overflow = 'auto';
        mobileToggle.focus();
      }
    });
  }


  // ------------------------------------------------------------------------
  // 6. STORY SECTION — "Read Full Story" navigates to about.html
  // FIX: Removed modal intercept that conflicted with the href="about.html"
  // The link now correctly navigates to about.html via its native href
  // ------------------------------------------------------------------------


  // ------------------------------------------------------------------------
  // 7. INTERACTIVE BEFORE/AFTER DRAG SLIDER
  // ------------------------------------------------------------------------
  const slider = document.getElementById('before-after-slider');
  const handle = document.getElementById('slider-handle');
  const imgAfter = document.getElementById('img-after');

  if (slider && handle && imgAfter) {
    let isDragging = false;

    const setSliderPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      slider.style.setProperty('--slider-pos', `${percentage}%`);
      slider.setAttribute('aria-valuenow', Math.round(percentage));
    };

    // Mouse Events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      slider.classList.add('dragging');
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        slider.classList.remove('dragging');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    // Touch Events (Mobile)
    handle.addEventListener('touchstart', () => {
      isDragging = true;
      slider.classList.add('dragging');
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        slider.classList.remove('dragging');
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        setSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    // Slider direct click navigation
    slider.addEventListener('click', (e) => {
      if (e.target !== handle && !handle.contains(e.target)) {
        setSliderPosition(e.clientX);
      }
    });

    // FIX: Keyboard navigation for accessibility (arrow keys)
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Before and after comparison. Use arrow keys to compare.');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');
    slider.setAttribute('aria-valuenow', '50');
    slider.addEventListener('keydown', (e) => {
      const currentPosStr = slider.style.getPropertyValue('--slider-pos') || '50%';
      const currentPos = parseFloat(currentPosStr);
      let newPos = currentPos;
      if (e.key === 'ArrowLeft') { newPos = Math.max(0, currentPos - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { newPos = Math.min(100, currentPos + 5); e.preventDefault(); }
      if (newPos !== currentPos) {
        slider.style.setProperty('--slider-pos', `${newPos}%`);
        slider.setAttribute('aria-valuenow', Math.round(newPos));
      }
    });
  }


  // ------------------------------------------------------------------------
  // 8. GALLERY LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-grid-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');

  if (galleryItems.length > 0 && lightboxModal && lightboxClose && lightboxImg) {
    // Build index of all gallery sources for cycling
    const gallerySources = Array.from(galleryItems).map(item => ({
      src: item.getAttribute('data-src'),
      alt: item.querySelector('img') ? item.querySelector('img').getAttribute('alt') : ''
    }));
    let currentLightboxIndex = 0;

    const openLightbox = (index) => {
      currentLightboxIndex = index;
      const { src, alt } = gallerySources[index];
      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', alt || '');
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      lenis.stop();
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    galleryItems.forEach((item, index) => {
      // Click handler
      item.addEventListener('click', () => openLightbox(index));
      // FIX: Keyboard access for gallery items (role="button" added in HTML)
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      lenis.start();
      document.body.style.overflow = 'auto';
      setTimeout(() => { lightboxImg.setAttribute('src', ''); }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    // FIX: Escape key closes lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) closeLightbox();
    });

    // FIX: "View Full Gallery" button now opens the lightbox
    const viewGalleryBtn = document.getElementById('view-full-gallery-link');
    if (viewGalleryBtn) {
      viewGalleryBtn.addEventListener('click', () => openLightbox(0));
    }
  }


  // ------------------------------------------------------------------------
  // 9. PATRON DONATIONS & UPI QR CODE GENERATOR
  // ------------------------------------------------------------------------
  const tierButtons = document.querySelectorAll('.donation-tiers .btn-tier');
  const customInputWrapper = document.getElementById('custom-amount-input-wrapper');
  const customAmountInput = document.getElementById('custom-donation-amount');
  const donateSubmitBtn = document.getElementById('donate-submit-btn');

  const upiModal = document.getElementById('upi-modal');
  const upiClose = document.getElementById('upi-modal-close');
  const upiQrImage = document.getElementById('upi-qr-image');

  let selectedAmount = 1000;

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tierButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.id === 'btn-custom-tier') {
        if (customInputWrapper) customInputWrapper.classList.add('active');
        selectedAmount = parseInt(customAmountInput ? customAmountInput.value : 0, 10) || 0;
      } else {
        if (customInputWrapper) customInputWrapper.classList.remove('active');
        selectedAmount = parseInt(btn.getAttribute('data-amount'), 10);
      }
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      selectedAmount = parseInt(customAmountInput.value, 10) || 0;
    });
  }

  // Hook program card clicks to scroll to Donation section
  const programCardArrows = document.querySelectorAll('.program-arrow-btn, .program-card');
  programCardArrows.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSec = document.querySelector('#donation');
      if (targetSec) lenis.scrollTo(targetSec, { offset: -80 });
    });
  });

  // Generic anchor smooth scroll (only for same-page hash links)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        return;
      }
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -80 });
      }
    });
  });

  if (donateSubmitBtn && upiModal && upiClose && upiQrImage) {
    donateSubmitBtn.addEventListener('click', () => {
      if (!selectedAmount || selectedAmount < 100) {
        showToast('Please select or enter an amount of at least ₹100.');
        return;
      }

      const upiId = 'baljyotifoundation@sbi';
      const orgName = 'Bal Jyoti Foundation';
      const notes = 'Patron Donation for Rural Artisans';
      const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(orgName)}&am=${selectedAmount}&cu=INR&tn=${encodeURIComponent(notes)}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;

      upiQrImage.setAttribute('src', qrUrl);
      upiModal.classList.add('active');
      upiModal.setAttribute('aria-hidden', 'false');
      lenis.stop();
      document.body.style.overflow = 'hidden';
    });

    const closeUpiModal = () => {
      upiModal.classList.remove('active');
      upiModal.setAttribute('aria-hidden', 'true');
      lenis.start();
      document.body.style.overflow = 'auto';
      setTimeout(() => { upiQrImage.setAttribute('src', ''); }, 300);
    };

    upiClose.addEventListener('click', closeUpiModal);
    upiModal.addEventListener('click', (e) => {
      if (e.target === upiModal) closeUpiModal();
    });

    // FIX: Escape key closes UPI modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && upiModal.classList.contains('active')) closeUpiModal();
    });
  }

  // ------------------------------------------------------------------------
  // 10. PARTNERS SLIDER CAROUSEL
  // ------------------------------------------------------------------------
  {
    const track = document.getElementById('partners-track');
    const prevBtn = document.getElementById('partner-prev-btn');
    const nextBtn = document.getElementById('partner-next-btn');
    const viewport = document.getElementById('partners-viewport');

    if (track && prevBtn && nextBtn && viewport) {
      let scrollPos = 0;

      const getSlideWidth = () => {
        const firstItem = track.querySelector('.partner-logo-item');
        if (firstItem) {
          const style = window.getComputedStyle(track);
          const gap = parseInt(style.columnGap || style.gap, 10) || 40;
          return firstItem.getBoundingClientRect().width + gap;
        }
        return 200;
      };

      const getMaxScroll = () => track.scrollWidth - viewport.getBoundingClientRect().width;

      nextBtn.addEventListener('click', () => {
        scrollPos = Math.min(scrollPos + getSlideWidth(), getMaxScroll());
        track.style.transform = `translateX(${-scrollPos}px)`;
      });

      prevBtn.addEventListener('click', () => {
        scrollPos = Math.max(scrollPos - getSlideWidth(), 0);
        track.style.transform = `translateX(${-scrollPos}px)`;
      });

      // Auto-scroll loop interval
      let autoScrollTimer = setInterval(() => {
        const max = getMaxScroll();
        if (scrollPos >= max - 5) {
          scrollPos = 0;
        } else {
          scrollPos = Math.min(scrollPos + getSlideWidth(), max);
        }
        track.style.transform = `translateX(${-scrollPos}px)`;
      }, 4500);

      const stopAutoScroll = () => clearInterval(autoScrollTimer);
      prevBtn.addEventListener('click', stopAutoScroll);
      nextBtn.addEventListener('click', stopAutoScroll);
    }
  }


  // ------------------------------------------------------------------------
  // 11. NEWSLETTER SUBMISSION
  // FIX: Replaced disruptive alert() with inline polite feedback message
  // ------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        if (newsletterFeedback) {
          newsletterFeedback.textContent = 'Please enter a valid email address.';
          newsletterFeedback.style.color = '#b43232';
        }
        return;
      }

      if (newsletterFeedback) {
        newsletterFeedback.textContent = `\u2713 Subscribed! Updates will be sent to ${email}.`;
        newsletterFeedback.style.color = 'var(--accent-gold)';
      }
      newsletterForm.reset();
      setTimeout(() => {
        if (newsletterFeedback) newsletterFeedback.textContent = '';
      }, 5000);
    });
  }


  // ------------------------------------------------------------------------
  // 12. DYNAMIC EVENTS HANDLER (HOMEPAGE)
  // ------------------------------------------------------------------------
  const eventsGrid = document.getElementById('events-grid');
  const searchInput = document.getElementById('events-search');
  const filterBar = document.getElementById('events-filter-bar');

  let activeEventForRegistration = null;

  if (eventsGrid && window.BAL_JYOTI_EVENTS) {
    renderEvents('all', '');

    if (filterBar) {
      const buttons = filterBar.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          const query = searchInput ? searchInput.value.trim() : '';
          renderEvents(filter, query);
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        const activeBtn = filterBar ? filterBar.querySelector('.filter-btn.active') : null;
        const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        renderEvents(filter, query);
      });
    }
  }

  function renderEvents(filter, searchQuery) {
    if (!eventsGrid) return;
    eventsGrid.innerHTML = '';

    const query = searchQuery.toLowerCase();

    const filtered = window.BAL_JYOTI_EVENTS.filter(ev => {
      let matchesFilter = false;
      const categories = ev.subCategories.map(c => c.toLowerCase());

      if (filter === 'all') {
        matchesFilter = true;
      } else if (filter === 'upcoming') {
        matchesFilter = ev.status === 'Upcoming';
      } else if (filter === 'completed') {
        matchesFilter = ev.status === 'Completed';
      } else {
        matchesFilter = categories.includes(filter);
      }

      let matchesSearch = true;
      if (query) {
        matchesSearch = ev.title.toLowerCase().includes(query) ||
                        ev.category.toLowerCase().includes(query) ||
                        ev.location.toLowerCase().includes(query);
      }

      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      eventsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 0.95rem; padding: 40px 0;">No matching events found.</div>`;
      return;
    }

    filtered.forEach(ev => {
      const dateStr = formatDateStr(ev.date);
      const timeStr = `${formatTimeStr(ev.startTime)} - ${formatTimeStr(ev.endTime)}`;
      const seatsText = ev.status === 'Completed' ? 'Completed' : `${ev.seatsRemaining} of ${ev.seatsTotal} Seats Left`;
      const completedClass = ev.status === 'Completed' ? 'completed' : '';
      const buttonClass = ev.status === 'Completed' ? 'btn-completed' : '';
      const buttonText = ev.status === 'Completed' ? 'Completed' : 'Register Now';

      eventsGrid.innerHTML += `
        <div class="event-card reveal-up">
          <div class="event-img-wrapper">
            <span class="event-badge">${ev.category}</span>
            <span class="event-status-badge ${completedClass}">${ev.status}</span>
            <img src="${ev.image}" alt="${ev.title}" class="event-img" loading="lazy">
          </div>
          <div class="event-card-content">
            <h3 class="event-card-title">${ev.title}</h3>
            <p class="event-card-desc">${ev.description}</p>
            <div class="event-meta-grid">
              <div class="event-meta-item"><i class="fa-regular fa-calendar-days" aria-hidden="true"></i><span>Date: <strong class="event-meta-val">${dateStr}</strong></span></div>
              <div class="event-meta-item"><i class="fa-regular fa-clock" aria-hidden="true"></i><span>Time: <strong class="event-meta-val">${timeStr}</strong></span></div>
              <div class="event-meta-item"><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>Venue: <strong class="event-meta-val">${ev.location}</strong></span></div>
              <div class="event-meta-item"><i class="fa-solid fa-chair" aria-hidden="true"></i><span>Seats: <strong class="event-meta-val">${seatsText}</strong></span></div>
            </div>
            <div class="event-card-actions">
              <button class="btn-event-register ripple hover-target ${buttonClass}" data-id="${ev.id}" ${ev.status === 'Completed' ? 'disabled aria-disabled="true"' : ''}>
                ${buttonText}
              </button>
              <button class="btn-event-share hover-target" data-id="${ev.id}" aria-label="Copy link to share this event">
                <i class="fa-regular fa-copy" aria-hidden="true"></i>
              </button>
            </div>
            <a href="event-details.html?id=${ev.id}" class="hover-target" style="display: block; text-align: center; margin-top: 15px; font-size: 0.8rem; font-weight: 600; color: var(--accent-gold); letter-spacing: 0.05em; text-transform: uppercase;">
              View Details <i class="fa-solid fa-arrow-right-long" style="font-size: 0.75rem; margin-left: 4px;" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      `;
    });

    // Stagger GSAP animations on new grid items
    if (typeof gsap !== 'undefined') {
      gsap.from(eventsGrid.querySelectorAll('.event-card'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }

    // Bind Button Click triggers
    eventsGrid.querySelectorAll('.btn-event-register').forEach(btn => {
      if (btn.classList.contains('btn-completed')) return;
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const ev = window.BAL_JYOTI_EVENTS.find(x => x.id === id);
        if (ev) openRegistrationModal(ev);
      });
    });

    eventsGrid.querySelectorAll('.btn-event-share').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const detailLink = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '/')}event-details.html?id=${id}`;
        // FIX: Clipboard API with secure-context check + fallback
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(detailLink)
            .then(() => showToast('Event link copied to clipboard!'))
            .catch(() => copyFallback(detailLink));
        } else {
          copyFallback(detailLink);
        }
      });
    });
  }

  // Helper date formatters
  function formatDateStr(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  function formatTimeStr(timeString) {
    const [hour, min] = timeString.split(':');
    const H = parseInt(hour);
    const ampm = H >= 12 ? 'PM' : 'AM';
    const h = H % 12 || 12;
    return `${h}:${min} ${ampm}`;
  }

  // FIX: Fallback clipboard copy for non-secure contexts / older browsers
  function copyFallback(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Event link copied!');
    } catch (e) {
      showToast('Copy this link: ' + text);
    }
    document.body.removeChild(ta);
  }

  // Toast notification (replaces all alert() calls)
  function showToast(message) {
    let toast = document.getElementById('bj-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bj-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      Object.assign(toast.style, {
        position: 'fixed', bottom: '30px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--primary-forest)', color: '#fff',
        padding: '12px 28px', borderRadius: '30px',
        fontSize: '0.9rem', fontWeight: '500',
        zIndex: '99999', opacity: '0',
        transition: 'opacity 0.3s ease',
        fontFamily: 'var(--font-sans)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap', border: '1px solid rgba(198,161,91,0.3)'
      });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
  }


  // Modal handlers for event registration
  const registerModal = document.getElementById('register-modal');
  const closeModalBtn = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const formInterface = document.getElementById('modal-form-interface');
  const successInterface = document.getElementById('modal-success-interface');
  const successCloseBtn = document.getElementById('success-close-btn');

  function openRegistrationModal(eventObj) {
    if (!registerModal) return;
    activeEventForRegistration = eventObj;
    // FIX: textContent prevents XSS (was innerText)
    const nameEl = document.getElementById('modal-event-name');
    if (nameEl) nameEl.textContent = eventObj.title;
    registerModal.classList.add('visible');
    registerModal.setAttribute('aria-hidden', 'false');
    if (formInterface) formInterface.style.display = 'block';
    if (successInterface) successInterface.style.display = 'none';
    // FIX: Move focus into modal for accessibility
    const firstFocusable = registerModal.querySelector('button, [href], input, select, textarea');
    if (firstFocusable) setTimeout(() => firstFocusable.focus(), 100);
    lenis.stop();
    document.body.style.overflow = 'hidden';
  }

  const hideRegistrationModal = () => {
    if (!registerModal) return;
    registerModal.classList.remove('visible');
    registerModal.setAttribute('aria-hidden', 'true');
    lenis.start();
    document.body.style.overflow = 'auto';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideRegistrationModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', hideRegistrationModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', hideRegistrationModal);

  // FIX: Escape key closes registration modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && registerModal && registerModal.classList.contains('visible')) {
      hideRegistrationModal();
    }
  });

  // Form Validation
  const form = document.getElementById('event-reg-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('reg-name');
      const emailInput = document.getElementById('reg-email');
      const mobileInput = document.getElementById('reg-mobile');
      const cityInput = document.getElementById('reg-city');
      const participantsInput = document.getElementById('reg-participants');

      // Clear errors
      document.querySelectorAll('.form-error-msg').forEach(el => el.style.display = 'none');

      if (!nameInput.value.trim()) {
        document.getElementById('err-name').style.display = 'block';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        document.getElementById('err-email').style.display = 'block';
        isValid = false;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(mobileInput.value.trim())) {
        document.getElementById('err-mobile').style.display = 'block';
        isValid = false;
      }

      if (!cityInput.value.trim()) {
        document.getElementById('err-city').style.display = 'block';
        isValid = false;
      }

      const pVal = parseInt(participantsInput.value);
      if (isNaN(pVal) || pVal < 1 || pVal > 10) {
        document.getElementById('err-participants').style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        if (formInterface) formInterface.style.display = 'none';
        if (successInterface) successInterface.style.display = 'block';

        if (activeEventForRegistration) {
          activeEventForRegistration.seatsRemaining = Math.max(activeEventForRegistration.seatsRemaining - pVal, 0);
          const activeBtn = filterBar ? filterBar.querySelector('.filter-btn.active') : null;
          const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
          const query = searchInput ? searchInput.value.trim() : '';
          renderEvents(filter, query);
        }

        form.reset();
      }
    });
  }

  // ------------------------------------------------------------------------
  // LEADERSHIP TEAM HORIZONTAL CAROUSEL CONTROLLER
  // ------------------------------------------------------------------------
  {
    const track = document.getElementById('team-carousel-track');
    const prevBtn = document.getElementById('team-carousel-prev');
    const nextBtn = document.getElementById('team-carousel-next');
    const viewport = document.getElementById('team-carousel-viewport');

    if (track && prevBtn && nextBtn && viewport) {
      let carouselPos = 0;
      const cardWidth = 325; // 300px card width + 25px gap
      let isDragging = false;
      let startX = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let carouselTimer = null;

      const getMaxScroll = () => {
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
      };

      const updateCarousel = () => {
        const maxScroll = getMaxScroll();
        if (carouselPos < 0) carouselPos = 0;
        if (carouselPos > maxScroll) carouselPos = maxScroll;
        track.style.transform = `translateX(-${carouselPos}px)`;
      };

      nextBtn.addEventListener('click', () => {
        const maxScroll = getMaxScroll();
        if (carouselPos >= maxScroll) {
          carouselPos = 0;
        } else {
          carouselPos += cardWidth;
        }
        updateCarousel();
      });

      prevBtn.addEventListener('click', () => {
        const maxScroll = getMaxScroll();
        if (carouselPos <= 0) {
          carouselPos = maxScroll;
        } else {
          carouselPos -= cardWidth;
        }
        updateCarousel();
      });

      // Touch & Drag Support
      viewport.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        prevTranslate = -carouselPos;
        if (carouselTimer) clearInterval(carouselTimer);
      }, { passive: true });

      viewport.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        carouselPos = Math.max(0, -currentTranslate);
        updateCarousel();
        startCarouselAutoplay();
      }, { passive: true });

      // Desktop Mouse Drag Support
      viewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        prevTranslate = -carouselPos;
        if (carouselTimer) clearInterval(carouselTimer);
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
      });

      window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        carouselPos = Math.max(0, -currentTranslate);
        updateCarousel();
        startCarouselAutoplay();
      });

      // Autoplay Loop
      const startCarouselAutoplay = () => {
        if (carouselTimer) clearInterval(carouselTimer);
        carouselTimer = setInterval(() => {
          const maxScroll = getMaxScroll();
          if (carouselPos >= maxScroll) {
            carouselPos = 0;
          } else {
            carouselPos += cardWidth;
          }
          updateCarousel();
        }, 3500);
      };

      startCarouselAutoplay();
      viewport.addEventListener('mouseenter', () => clearInterval(carouselTimer));
      viewport.addEventListener('mouseleave', () => startCarouselAutoplay());
    }
  }

});


/* ==========================================================================
   HOMEPAGE GALLERY CATEGORY FILTERING & LIGHTBOX INTERACTION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.prem-filter-btn');
  const allItems = Array.from(document.querySelectorAll('.prem-gi-inner'));
  const lightbox = document.getElementById('prem-lightbox');
  const lbImg = document.getElementById('prem-lb-img');
  const lbCat = document.getElementById('prem-lb-cat');
  const lbTitle = document.getElementById('prem-lb-title');
  const lbLoc = document.getElementById('prem-lb-loc');
  const lbCounter = document.getElementById('prem-lb-counter');
  const lbDownload = document.getElementById('prem-lb-download');
  const closeBtn = document.getElementById('prem-lb-close');
  const prevBtn = document.getElementById('prem-lb-prev');
  const nextBtn = document.getElementById('prem-lb-next');
  const backdrop = document.getElementById('prem-lb-backdrop');

  if (!allItems.length) return;

  let visibleItems = [...allItems];
  let currentFilteredIndex = 0;

  // Filter Buttons Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.dataset.filter;
      visibleItems = [];

      allItems.forEach(innerItem => {
        const gi = innerItem.closest('.prem-gi');
        const itemCat = innerItem.dataset.cat || '';

        let matches = false;
        if (filterVal === 'all') {
          matches = true;
        } else if (filterVal === 'Culture') {
          matches = (itemCat === 'Culture' || itemCat === 'Workshops' || itemCat === 'Village Development');
        } else {
          matches = (itemCat === filterVal);
        }

        if (matches) {
          visibleItems.push(innerItem);
          if (gi) {
            gi.classList.remove('hide');
            gi.style.display = '';
            gi.style.opacity = '1';
            gi.style.transform = 'scale(1)';
          }
        } else {
          if (gi) {
            gi.style.opacity = '0';
            gi.style.transform = 'scale(0.92)';
            setTimeout(() => {
              gi.classList.add('hide');
              gi.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });

  // Lightbox Logic
  if (!lightbox) return;

  function updateLightbox(index) {
    if (!visibleItems.length) return;
    currentFilteredIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentFilteredIndex];
    if (!item) return;

    const src = item.dataset.src;
    const title = item.dataset.title || 'Bal Jyoti Foundation';
    const cat = item.dataset.cat || 'Gallery';
    const loc = item.dataset.loc || '';

    if (lbImg) lbImg.src = src;
    if (lbTitle) lbTitle.textContent = title;
    if (lbCat) lbCat.textContent = cat;
    if (lbLoc) lbLoc.innerHTML = loc ? '<i class="fa-solid fa-location-dot"></i> ' + loc : '';
    if (lbCounter) lbCounter.textContent = (currentFilteredIndex + 1) + ' / ' + visibleItems.length;
    if (lbDownload) lbDownload.href = src;
  }

  function openLightbox(item) {
    const idx = visibleItems.indexOf(item);
    if (idx !== -1) {
      updateLightbox(idx);
    } else {
      updateLightbox(0);
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  allItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateLightbox(currentFilteredIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateLightbox(currentFilteredIndex + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentFilteredIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentFilteredIndex + 1);
  });
});
