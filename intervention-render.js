/* ==========================================================================
   BAL JYOTI FOUNDATION - DYNAMIC INTERVENTION DETAIL RENDER ENGINE
   Renders ONLY the 7 specified sections:
   1. Hero Banner
   2. About the Program
   3. Complete Working Process
   4. Materials & Tools Used
   5. Skills & Techniques
   6. Product Gallery
   7. FAQ
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Determine Target Intervention ID
  let currentId = window.CURRENT_INTERVENTION_ID;

  if (!currentId) {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    if (filename && filename.endsWith('.html') && filename !== 'index.html' && filename !== 'about.html') {
      currentId = filename.replace('.html', '');
    }
  }

  if (!currentId) {
    const params = new URLSearchParams(window.location.search);
    currentId = params.get('id') || 'rugs';
  }

  if (currentId === 'bamboo-craft') currentId = 'bamboo';

  const data = (typeof INTERVENTIONS_DATA !== 'undefined') ? INTERVENTIONS_DATA[currentId] : null;

  if (!data) {
    console.error(`Intervention data not found for ID: ${currentId}`);
    return;
  }

  // Document Metadata
  document.title = `${data.title} | Bal Jyoti Foundation`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', data.shortDesc);

  // ------------------------------------------------------------------------
  // SECTION 1: HERO BANNER
  // ------------------------------------------------------------------------
  const heroContainer = document.getElementById('intervention-hero-target');
  if (heroContainer) {
    heroContainer.innerHTML = `
      <div class="intervention-hero-bg" style="background-image: url('${data.heroImage}');"></div>
      <div class="intervention-hero-overlay"></div>
      <div class="section-container hero-content-inner">
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <i class="fa-solid fa-chevron-right"></i>
          <a href="index.html#interventions">Explore Our Interventions</a>
          <i class="fa-solid fa-chevron-right"></i>
          <span aria-current="page">${data.title}</span>
        </nav>
        <span class="intervention-category-badge"><i class="fa-solid ${data.category === 'Sustainable Craft' ? 'fa-tree' : data.category === 'Natural Fiber Art' ? 'fa-basket-shopping' : data.category === 'Vocational Skills' ? 'fa-scissors' : 'fa-scroll'}"></i> ${data.category}</span>
        <h1 class="hero-intervention-title playfair">${data.title}</h1>
        <p class="hero-intervention-subtitle">${data.shortDesc}</p>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // SECTION 2: ABOUT THE PROGRAM
  // ------------------------------------------------------------------------
  const aboutContainer = document.getElementById('intervention-about-target');
  if (aboutContainer && data.about) {
    aboutContainer.innerHTML = `
      <div class="section-container">
        <div class="split-layout align-start">
          <div class="about-text-col reveal-up">
            <span class="section-subtitle">${data.about.tagline}</span>
            <h2 class="section-title">${data.about.heading}</h2>

            <div class="about-block">
              <h4>What the Program Is</h4>
              <p>${data.about.whatItIs}</p>
            </div>

            <div class="about-block">
              <h4>Why Bal Jyoti Foundation Started It</h4>
              <p>${data.about.whyStarted}</p>
            </div>

            <div class="about-block">
              <h4>Importance for the Local Community</h4>
              <p>${data.about.communityImportance}</p>
            </div>
          </div>

          <div class="about-objectives-col reveal-up">
            <div class="objectives-card-glass">
              <h3>Program Objectives</h3>
              <ul class="objectives-list">
                ${data.about.objectives.map(obj => `
                  <li><i class="fa-solid fa-circle-check"></i> <span>${obj}</span></li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // SECTION 3: COMPLETE WORKING PROCESS (VERTICAL TIMELINE)
  // ------------------------------------------------------------------------
  const processContainer = document.getElementById('intervention-process-target');
  if (processContainer && data.process) {
    processContainer.innerHTML = `
      <div class="section-container">
        <div class="section-header text-center reveal-up">
          <span class="section-subtitle center">STEP-BY-STEP WORKFLOW</span>
          <h2 class="section-title center">Complete Working Process</h2>
          <p class="section-desc center max-width">Follow the complete journey from raw natural materials to finished artisan products.</p>
        </div>

        <div class="vertical-process-timeline">
          ${data.process.map(proc => `
            <div class="timeline-step-item reveal-up">
              <div class="timeline-node">
                <span class="step-num">${proc.step}</span>
              </div>
              <div class="timeline-content-card hover-target">
                <div class="step-header">
                  <span class="step-icon"><i class="fa-solid ${proc.icon}"></i></span>
                  <h3 class="step-title">Step ${proc.step}: ${proc.title}</h3>
                </div>
                <p class="step-desc">${proc.desc}</p>
                ${proc.image ? `
                  <div class="step-img-frame">
                    <img src="${proc.image}" alt="${proc.title}" loading="lazy">
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // SECTION 4: MATERIALS & TOOLS USED
  // ------------------------------------------------------------------------
  const materialsContainer = document.getElementById('intervention-materials-target');
  if (materialsContainer && data.materials) {
    materialsContainer.innerHTML = `
      <div class="section-container">
        <div class="section-header text-center reveal-up">
          <span class="section-subtitle center">EQUIPMENT & RESOURCES</span>
          <h2 class="section-title center">Materials & Tools Used</h2>
        </div>

        <div class="materials-grid reveal-up">
          ${data.materials.map(mat => `
            <div class="material-card hover-target">
              <div class="mat-icon-wrapper"><i class="fa-solid ${mat.icon}"></i></div>
              <h4 class="mat-title">${mat.name}</h4>
              <p class="mat-desc">${mat.desc}</p>
              <div class="mat-purpose">
                <strong>Purpose:</strong> ${mat.purpose}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // SECTION 5: SKILLS & TECHNIQUES
  // ------------------------------------------------------------------------
  const skillsContainer = document.getElementById('intervention-skills-target');
  if (skillsContainer && data.skills) {
    skillsContainer.innerHTML = `
      <div class="section-container">
        <div class="section-header text-center reveal-up">
          <span class="section-subtitle center">VOCATIONAL COMPETENCIES</span>
          <h2 class="section-title center">Skills & Techniques</h2>
        </div>

        <div class="skills-grid reveal-up">
          ${data.skills.map(sk => `
            <div class="skill-technique-card hover-target">
              <div class="sk-icon"><i class="fa-solid ${sk.icon}"></i></div>
              <h4 class="sk-title">${sk.name}</h4>
              <p class="sk-desc">${sk.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // SECTION 6: PRODUCT GALLERY
  // ------------------------------------------------------------------------
  const galleryContainer = document.getElementById('intervention-gallery-target');
  if (galleryContainer && data.gallery) {
    galleryContainer.innerHTML = `
      <div class="section-container">
        <div class="section-header text-center reveal-up">
          <span class="section-subtitle center">CRAFT CATALOG</span>
          <h2 class="section-title center">Product Gallery</h2>
        </div>

        <div class="masonry-gallery-grid reveal-up">
          ${data.gallery.map((img, idx) => `
            <div class="masonry-item hover-target" data-src="${img.src}" data-index="${idx}">
              <img src="${img.src}" alt="${img.caption}" loading="lazy">
              <div class="masonry-overlay">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
                <p>${img.caption}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // SECTION 7: FAQ ACCORDION
  // ------------------------------------------------------------------------
  const faqContainer = document.getElementById('intervention-faqs-target');
  if (faqContainer && data.faqs && data.faqs.length > 0) {
    faqContainer.innerHTML = `
      <div class="section-container">
        <div class="section-header text-center reveal-up">
          <span class="section-subtitle center">QUESTIONS & ANSWERS</span>
          <h2 class="section-title center">Frequently Asked Questions</h2>
        </div>

        <div class="faq-accordion-list max-width reveal-up">
          ${data.faqs.map((faq, idx) => `
            <div class="faq-accordion-item ${idx === 0 ? 'active' : ''}">
              <button class="faq-header-btn hover-target" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                <span>${faq.q}</span>
                <i class="fa-solid fa-chevron-down faq-icon"></i>
              </button>
              <div class="faq-body-content" style="${idx === 0 ? 'max-height: 200px;' : 'max-height: 0px;'}">
                <p>${faq.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // FAQ Accordion Toggle Event Listener
  document.querySelectorAll('.faq-header-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-accordion-item');
      const body = item.querySelector('.faq-body-content');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-header-btn').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-body-content').style.maxHeight = '0px';
      });

      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Lightbox Modal Trigger
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightboxModal && lightboxImg) {
    document.querySelectorAll('.masonry-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        const caption = item.querySelector('p') ? item.querySelector('p').textContent : '';
        lightboxImg.setAttribute('src', src);
        lightboxImg.setAttribute('alt', caption);
        lightboxModal.classList.add('active');
      });
    });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});
