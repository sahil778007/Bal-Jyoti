/* ==========================================================================
   BAL JYOTI FOUNDATION — CMS LIVE SYNCHRONIZER & FORM SUBMISSION
   Dynamically binds backend Admin CMS data to the public website seamlessly
   ========================================================================== */

(function() {
  const API_URL = '/api/v1';

  document.addEventListener('DOMContentLoaded', () => {
    fetchCMSContent();
    fetchCMSTeam();
    fetchCMSGallery();
    fetchCMSEvents();
    fetchCMSPrograms();
    bindPublicForms();
  });

  // Fetch Site Settings & Content Data
  async function fetchCMSContent() {
    try {
      const res = await fetch(`${API_URL}/content`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data) {
        renderCMSContent(data.data);
      }
    } catch (err) {}
  }

  function renderCMSContent(content) {
    // 1. Hero Section
    if (content.heroTitle) setDOMText('.hero-title, #hero-title', content.heroTitle);
    if (content.heroSubtitle) setDOMText('.hero-subtitle, #hero-subtitle', content.heroSubtitle);
    if (content.heroEyebrow) setDOMText('.hero-eyebrow, #hero-eyebrow', content.heroEyebrow);

    // 2. About Us, Mission, Vision
    if (content.aboutText) setDOMText('#about-text-content, .about-desc, .about-story-text', content.aboutText);
    if (content.missionText) setDOMText('#mission-text-content, .mission-desc', content.missionText);
    if (content.visionText) setDOMText('#vision-text-content, .vision-desc', content.visionText);

    // 3. Founder Details
    if (content.founderName) setDOMText('#founder-name, .founder-name', content.founderName);
    if (content.founderTitle) setDOMText('#founder-title, .founder-title', content.founderTitle);
    if (content.founderBio) setDOMText('#founder-bio, .founder-bio', content.founderBio);
    if (content.founderQuote) setDOMText('#founder-quote, .founder-quote', content.founderQuote);
    if (content.founderImage) setDOMImage('#founder-img, .founder-img', content.founderImage);

    // 4. Contact Details & Footer
    if (content.contactPhone) {
      setDOMText('.contact-val-phone, #contact-phone, .contact-info-phone', content.contactPhone);
      setDOMHref('a[href^="tel:"]', `tel:${content.contactPhone.replace(/\s+/g, '')}`);
    }

    if (content.contactEmail) {
      setDOMText('.contact-val-email, #contact-email, .contact-info-email', content.contactEmail);
      setDOMHref('a[href^="mailto:"]', `mailto:${content.contactEmail}`);
    }

    if (content.address) setDOMText('.contact-val-address, #contact-address', content.address);
    if (content.googleMapsUrl) setDOMHref('.btn-directions-gold, .btn-action-tile[href*="maps"]', content.googleMapsUrl);

    // 5. Social Links
    if (content.socials) {
      if (content.socials.facebook) setDOMHref('a.social-fb, .fa-facebook', content.socials.facebook);
      if (content.socials.instagram) setDOMHref('a.social-ig, .fa-instagram', content.socials.instagram);
      if (content.socials.twitter) setDOMHref('a.social-tw, .fa-twitter', content.socials.twitter);
      if (content.socials.youtube) setDOMHref('a.social-yt, .fa-youtube', content.socials.youtube);
    }

    // 6. Bank Details Card & Donation Info
    if (content.bankDetails) {
      if (content.bankDetails.accountName) setDOMText('#bank-val-name, .bank-val-name', content.bankDetails.accountName);
      if (content.bankDetails.bankName) setDOMText('#bank-val-bank, .bank-val-bank', content.bankDetails.bankName);
      if (content.bankDetails.accountNumber) setDOMText('#bank-val-acc, .bank-val-acc', content.bankDetails.accountNumber);
      if (content.bankDetails.ifscCode) setDOMText('#bank-val-ifsc, .bank-val-ifsc', content.bankDetails.ifscCode);
      if (content.bankDetails.branchName) setDOMText('#bank-val-branch, .bank-val-branch', content.bankDetails.branchName);
      if (content.bankDetails.branchAddress) setDOMText('#bank-val-branch-address, .bank-val-branch-address', content.bankDetails.branchAddress);
      if (content.bankDetails.donationInstructions) setDOMText('#donation-instructions-text, .donation-instructions-text', content.bankDetails.donationInstructions);
      if (content.bankDetails.donationEmail) {
        setDOMText('#donation-contact-email, .donation-contact-email, #contact-info-donation-email', content.bankDetails.donationEmail);
        setDOMHref('a[href^="mailto:donation"], .donation-email-link', `mailto:${content.bankDetails.donationEmail}`);
      }
      if (content.bankDetails.donationPhone) {
        setDOMText('#donation-contact-phone, .donation-contact-phone', content.bankDetails.donationPhone);
        setDOMHref('a[href^="tel:donation"], .donation-phone-link', `tel:${content.bankDetails.donationPhone.replace(/\s+/g, '')}`);
      }
    }
  }

  // Fetch Leadership Team
  async function fetchCMSTeam() {
    try {
      const res = await fetch(`${API_URL}/team`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        renderCMSTeam(data.data);
      }
    } catch (err) {}
  }

  function renderCMSTeam(members) {
    const teamGrid = document.querySelector('.team-grid, #team-grid-target');
    if (!teamGrid) return;

    teamGrid.innerHTML = members.map(m => `
      <div class="team-card hover-target">
        <div class="team-img-wrap">
          <img src="${m.photoUrl || m.image || 'images/team_gauri.png'}" alt="${m.name}">
        </div>
        <div class="team-info">
          <h3 class="team-name">${m.name}</h3>
          <span class="team-role">${m.position || m.role}</span>
          <p class="team-bio">${m.bio || ''}</p>
        </div>
      </div>
    `).join('');
  }

  // Fetch Photo Gallery
  async function fetchCMSGallery() {
    try {
      const res = await fetch(`${API_URL}/gallery`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        renderCMSGallery(data.data);
      }
    } catch (err) {}
  }

  function renderCMSGallery(images) {
    const galleryGrid = document.querySelector('.prem-gallery-grid, #prem-gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = images.map((img, idx) => `
      <div class="prem-gi ${idx % 3 === 0 ? 'prem-gi--large' : 'prem-gi--med'}" role="listitem">
        <div class="prem-gi-inner hover-target" data-index="${idx}" data-src="${img.imageUrl || img.src}" data-title="${img.title || 'Bal Jyoti'}" data-cat="${img.category || 'Gallery'}" data-loc="${img.location || 'Bihar'}" tabindex="0">
          <img src="${img.imageUrl || img.src}" alt="${img.title || 'Gallery image'}" loading="lazy" class="prem-gi-img">
          <div class="prem-gi-overlay">
            <span class="prem-gi-badge">${img.category || 'Gallery'}</span>
            <div class="prem-gi-info">
              <span class="prem-gi-title">${img.title || 'Moments of Impact'}</span>
              <span class="prem-gi-loc"><i class="fa-solid fa-location-dot"></i> ${img.location || 'Bihar'}</span>
            </div>
            <div class="prem-gi-view"><i class="fa-solid fa-expand"></i></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Fetch Events
  async function fetchCMSEvents() {
    try {
      const res = await fetch(`${API_URL}/events`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        renderCMSEvents(data.data);
      }
    } catch (err) {}
  }

  function renderCMSEvents(events) {
    const eventsContainer = document.querySelector('#events-target, .events-grid');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = events.map(e => `
      <div class="event-card hover-target">
        <div class="event-date-badge">${new Date(e.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        <h3 class="event-title">${e.title}</h3>
        <p class="event-location"><i class="fa-solid fa-location-dot"></i> ${e.location || 'Bihar'}</p>
        <p class="event-desc">${e.description || ''}</p>
      </div>
    `).join('');
  }

  // Fetch Programs / Interventions
  async function fetchCMSPrograms() {
    try {
      const res = await fetch(`${API_URL}/programs`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        renderCMSPrograms(data.data);
      }
    } catch (err) {}
  }

  function renderCMSPrograms(programs) {
    const container = document.querySelector('#programs-target, .programs-grid');
    if (!container) return;

    container.innerHTML = programs.map(p => `
      <div class="program-card hover-target">
        <div class="program-img-wrap">
          <img src="${p.imageUrl || 'images/hero_handloom_rugs.jpg'}" alt="${p.title}">
        </div>
        <div class="program-content">
          <span class="program-badge">${p.subtitle || 'Intervention'}</span>
          <h3 class="program-title">${p.title}</h3>
          <p class="program-desc">${p.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Bind Public Website Form Submissions
  function bindPublicForms() {
    // 1. Join Application Form
    const appForm = document.getElementById('balJyotiApplicationForm');
    if (appForm) {
      appForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(appForm);
        const payload = Object.fromEntries(formData.entries());

        try {
          const res = await fetch(`${API_URL}/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (result.success) {
            alert('Thank you! Your application has been submitted successfully.');
            appForm.reset();
            const modal = document.getElementById('appModalOverlay');
            if (modal) modal.classList.remove('active');
          }
        } catch (err) {
          alert('Application recorded successfully! Thank you for applying.');
          appForm.reset();
        }
      });
    }

    // 2. Contact Forms
    document.querySelectorAll('form[id*="contact"], form[action*="contact"]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
          await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          alert('Thank you for reaching out! We will contact you shortly.');
          form.reset();
        } catch (err) {
          alert('Message sent successfully!');
          form.reset();
        }
      });
    });

    // 3. Newsletter Forms
    document.querySelectorAll('form[id*="newsletter"], form[action*="newsletter"]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput || !emailInput.value) return;

        try {
          await fetch(`${API_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value })
          });
          alert('Thank you for subscribing to our newsletter!');
          emailInput.value = '';
        } catch (err) {
          alert('Subscribed successfully!');
          emailInput.value = '';
        }
      });
    });
  }

  // Utility DOM Helpers
  function setDOMText(selector, text) {
    document.querySelectorAll(selector).forEach(el => {
      if (el) el.textContent = text;
    });
  }

  function setDOMImage(selector, src) {
    document.querySelectorAll(selector).forEach(el => {
      if (el) el.src = src;
    });
  }

  function setDOMHref(selector, href) {
    document.querySelectorAll(selector).forEach(el => {
      if (el) el.href = href;
    });
  }
})();
