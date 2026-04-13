/* ================================
   MODERN PROFESSIONAL PORTFOLIO JS
   Enhanced with animations, interactions, and user experience features
   ================================ */

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  // Initialize all features
  handlePreloader();
  initScrollProgress();
  initMobileNavigation();
  initSmoothScroll();
  initScrollAnimations();
  initTypingEffect();
  initProjectFilters();
  initCertificateModal();
  initContactForm();
  initBackToTop();
  initHeaderScroll();
  initActiveNavLinks();
  setCurrentYear();
  initCharCounter();
  initAOS();
  initThemeParticles();
}

// ========== PRELOADER ==========
function handlePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Hide preloader after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1000);
  });
}

// ========== SCROLL PROGRESS BAR ==========
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ========== MOBILE NAVIGATION ==========
function initMobileNavigation() {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navToggle || !mainNav) return;

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      navToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      // Smooth scroll to target
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without jumping
      history.pushState(null, null, href);
    });
  });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('aos-animate');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
}

// ========== TYPING EFFECT ==========
function initTypingEffect() {
  const typingText = document.getElementById('typingText');
  if (!typingText) return;

  const phrases = [
    'Data Science Student',
    'AI/ML Enthusiast',
    'Computer Vision Developer',
    'Event Organizer',
    'Kabaddi Athlete',
    'Problem Solver'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ========== HEADER SCROLL EFFECT ==========
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll (optional)
    // if (currentScroll > lastScroll && currentScroll > 100) {
    //   header.style.transform = 'translateY(-100%)';
    // } else {
    //   header.style.transform = 'translateY(0)';
    // }

    lastScroll = currentScroll;
  });
}

// ========== ACTIVE NAV LINKS ==========
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Initial check
}

// ========== PROJECT FILTERS ==========
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter projects with animation
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ========== CERTIFICATE MODAL ==========
function initCertificateModal() {
  const certModal = document.getElementById('certModal');
  const certImg = document.getElementById('certImg');
  const certClose = document.getElementById('certClose');
  const certClickables = document.querySelectorAll('.cert-clickable');
  const certPrev = document.getElementById('certPrev');
  const certNext = document.getElementById('certNext');

  if (!certModal || !certImg || !certClose) return;

  let currentCertIndex = 0;
  const certificates = Array.from(certClickables).map(el => 
    el.getAttribute('data-src') || el.querySelector('img')?.src
  ).filter(Boolean);

  // Open certificate modal
  function openCertificate(src, index = 0) {
    certImg.src = src;
    currentCertIndex = index;
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    setTimeout(() => {
      certModal.style.opacity = '1';
    }, 10);

    // Focus close button for accessibility
    certClose.focus();
  }

  // Close certificate modal
  function closeCertificate() {
    certModal.style.opacity = '0';
    setTimeout(() => {
      certModal.setAttribute('aria-hidden', 'true');
      certImg.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  // Navigate to previous certificate
  function showPrevCert() {
    currentCertIndex = (currentCertIndex - 1 + certificates.length) % certificates.length;
    certImg.style.opacity = '0';
    setTimeout(() => {
      certImg.src = certificates[currentCertIndex];
      certImg.style.opacity = '1';
    }, 200);
  }

  // Navigate to next certificate
  function showNextCert() {
    currentCertIndex = (currentCertIndex + 1) % certificates.length;
    certImg.style.opacity = '0';
    setTimeout(() => {
      certImg.src = certificates[currentCertIndex];
      certImg.style.opacity = '1';
    }, 200);
  }

  // Click handlers for certificate thumbnails
  certClickables.forEach((el, index) => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-src') || el.querySelector('img')?.src;
      if (src) openCertificate(src, index);
    });

    // Keyboard accessibility
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = el.getAttribute('data-src') || el.querySelector('img')?.src;
        if (src) openCertificate(src, index);
      }
    });
  });

  // Close button
  certClose.addEventListener('click', closeCertificate);

  // Navigation buttons
  if (certPrev) certPrev.addEventListener('click', showPrevCert);
  if (certNext) certNext.addEventListener('click', showNextCert);

  // Click outside to close
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal || e.target.classList.contains('cert-modal-backdrop')) {
      closeCertificate();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (certModal.getAttribute('aria-hidden') === 'false') {
      switch(e.key) {
        case 'Escape':
          closeCertificate();
          break;
        case 'ArrowLeft':
          showPrevCert();
          break;
        case 'ArrowRight':
          showNextCert();
          break;
      }
    }
  });
}

// Download certificate function
function downloadCertificate() {
  const certImg = document.getElementById('certImg');
  if (!certImg || !certImg.src) return;

  const link = document.createElement('a');
  link.href = certImg.src;
  link.download = 'certificate.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Share certificate function
function shareCertificate() {
  const certImg = document.getElementById('certImg');
  if (!certImg || !certImg.src) return;

  if (navigator.share) {
    navigator.share({
      title: 'My Certificate',
      text: 'Check out my certificate!',
      url: certImg.src
    }).catch(err => console.log('Share failed:', err));
  } else {
    // Fallback: Copy link to clipboard
    navigator.clipboard.writeText(certImg.src).then(() => {
      alert('Certificate link copied to clipboard!');
    });
  }
}

// ========== CONTACT FORM ==========
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Validate inputs
    if (!validateForm(nameInput, emailInput, messageInput)) {
      showFormStatus('Please fill in all required fields correctly.', 'error');
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // Submit form (Formspree handles this automatically)
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showFormStatus('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Confetti animation (optional)
        celebrateSuccess();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      showFormStatus('✗ Oops! Something went wrong. Please try again.', 'error');
      console.error('Form error:', error);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

// Form validation
function validateForm(nameInput, emailInput, messageInput) {
  let isValid = true;

  // Name validation
  if (nameInput.value.trim().length < 2) {
    showFieldError(nameInput, 'Name must be at least 2 characters');
    isValid = false;
  } else {
    clearFieldError(nameInput);
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showFieldError(emailInput, 'Please enter a valid email address');
    isValid = false;
  } else {
    clearFieldError(emailInput);
  }

  // Message validation
  if (messageInput.value.trim().length < 10) {
    showFieldError(messageInput, 'Message must be at least 10 characters');
    isValid = false;
  } else {
    clearFieldError(messageInput);
  }

  return isValid;
}

// Show field error
function showFieldError(input, message) {
  clearFieldError(input);
  
  input.style.borderColor = 'var(--error)';
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.style.color = 'var(--error)';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  errorDiv.textContent = message;
  
  input.parentElement.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(input) {
  input.style.borderColor = '';
  const errorDiv = input.parentElement.querySelector('.field-error');
  if (errorDiv) errorDiv.remove();
}

// Show form status
function showFormStatus(message, type) {
  const formStatus = document.getElementById('formStatus');
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    formStatus.style.opacity = '0';
    setTimeout(() => {
      formStatus.style.display = 'none';
      formStatus.style.opacity = '1';
    }, 300);
  }, 5000);
}

// Success celebration
function celebrateSuccess() {
  // Simple confetti effect (you can use a library like canvas-confetti for better results)
  const colors = ['#00d9ff', '#7c3aed', '#10b981', '#f59e0b'];
  
  for (let i = 0; i < 50; i++) {
    createConfetti(colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createConfetti(color) {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.backgroundColor = color;
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.top = '-10px';
  confetti.style.opacity = '1';
  confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
  confetti.style.transition = 'all 3s ease-out';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = '9999';
  
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    confetti.style.top = window.innerHeight + 'px';
    confetti.style.opacity = '0';
  }, 50);
  
  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

// ========== CHARACTER COUNTER ==========
function initCharCounter() {
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  
  if (!messageInput || !charCount) return;

  messageInput.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCount.textContent = count;
    
    // Change color based on length
    if (count > 500) {
      charCount.style.color = 'var(--warning)';
    } else if (count > 0) {
      charCount.style.color = 'var(--accent)';
    } else {
      charCount.style.color = 'var(--muted)';
    }
  });
}

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== SET CURRENT YEAR ==========
function setCurrentYear() {
  const yearElements = document.querySelectorAll('#year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

// ========== INITIALIZE AOS (Animate On Scroll) ==========
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 100
    });
  }
}

// ========== PROJECT MODAL ==========
function openProjectModal(projectId) {
  // Project details data
  const projectData = {
    drowsiness: {
      title: 'Drowsiness Detection System',
      description: 'Advanced real-time driver fatigue detection system using computer vision and facial landmark analysis. Built with Python, OpenCV, and dlib.',
      features: [
        'Real-time facial landmark detection',
        'Eye Aspect Ratio (EAR) calculation',
        'Customizable alert thresholds',
        'Frame smoothing for accuracy',
        'Low latency processing',
        'Cross-platform compatibility'
      ],
      tech: ['Python', 'OpenCV', 'dlib', 'MediaPipe', 'NumPy'],
      stats: {
        accuracy: '94%',
        fps: '30',
        latency: '<100ms'
      },
      github: '#',
      demo: '#'
    },
    dashboard: {
      title: 'Social Media Analytics Dashboard',
      description: 'Comprehensive analytics dashboard for tracking social media KPIs, engagement metrics, and audience growth patterns across multiple platforms.',
      features: [
        'Automated data pipeline',
        'Real-time KPI tracking',
        'Interactive visualizations',
        'Multi-platform integration',
        'Custom report generation',
        'Scheduled data refresh'
      ],
      tech: ['Python', 'Power BI', 'Pandas', 'SQL', 'REST APIs'],
      stats: {
        records: '100K+',
        refresh: 'Real-time',
        platforms: '5'
      },
      github: '#',
      demo: '#'
    },
    genai: {
      title: 'GenAI Job Simulation',
      description: 'Completed comprehensive BCG X GenAI simulation covering data extraction, analysis, and AI chatbot prototyping for enterprise applications.',
      features: [
        'Data extraction workflows',
        'Natural language processing',
        'AI chatbot prototype',
        'Context-aware responses',
        'Production deployment ready',
        'Scalable architecture'
      ],
      tech: ['Python', 'GenAI', 'NLP', 'TensorFlow', 'FastAPI'],
      stats: {
        accuracy: '92%',
        response: '<2s',
        certified: 'BCG X'
      },
      github: '#',
      demo: '#'
    },
    elevate: {
      title: 'AI/ML Internship Project',
      description: 'Intensive AI/ML internship at Elevate Labs covering model development, deployment, and optimization. Recognized as Best Performer.',
      features: [
        'Predictive model development',
        'ML pipeline automation',
        'Model performance tuning',
        'Deployment strategies',
        'A/B testing implementation',
        'Production monitoring'
      ],
      tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Docker', 'AWS'],
      stats: {
        models: '10+',
        accuracy: '96%',
        award: 'Best Performer'
      },
      github: '#',
      demo: '#'
    },
expenseTracker: {
  title: 'Personal Expense Tracker',
  description: 'Developed and deployed a Personal Expense Tracker application utilizing Python and HTML, focusing on structured data management and an intuitive user interface. Implemented data validation and tracking features to securely log, monitor, and visualize daily financial inputs.',
  features: [
    'Structured data management for daily expense records',
    'Intuitive and user-friendly interface',
    'Input validation to prevent incorrect entries',
    'Secure logging and tracking of financial inputs',
    'Monitoring and summary insights (daily/weekly/monthly)',
    'Basic visualization for spending overview'
  ],
  tech: ['Python', 'HTML', 'CSS', 'JavaScript'],
  stats: {
    duration: 'Feb 2026 – Apr 2026',
    org: 'IIT Bombay Spoken Tutorial',
    focus: 'Data Validation & Tracking'
  },
  github: 'https://github.com/Hydramix/Personal-expense-tracker-',
  demo: '#'
}
  };

  const project = projectData[projectId];
  if (!project) return;

  // Create modal HTML
  const modalHTML = `
    <div class="project-modal" id="projectModal">
      <div class="project-modal-backdrop"></div>
      <div class="project-modal-content">
        <button class="project-modal-close" onclick="closeProjectModal()">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="project-modal-header">
          <h2>${project.title}</h2>
          <div class="project-modal-actions">
            ${project.github !== '#' ? `<a href="${project.github}" target="_blank" class="modal-btn"><i class="fab fa-github"></i> View Code</a>` : ''}
            ${project.demo !== '#' ? `<a href="${project.demo}" target="_blank" class="modal-btn"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
          </div>
        </div>
        
        <div class="project-modal-body">
          <p class="project-modal-description">${project.description}</p>
          
          <div class="project-modal-stats">
            ${Object.entries(project.stats).map(([key, value]) => `
              <div class="stat-box">
                <div class="stat-value">${value}</div>
                <div class="stat-label">${key}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="project-modal-section">
            <h3><i class="fas fa-star"></i> Key Features</h3>
            <ul class="feature-list">
              ${project.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
            </ul>
          </div>
          
          <div class="project-modal-section">
            <h3><i class="fas fa-code"></i> Technologies Used</h3>
            <div class="tech-tags">
              ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';

  // Close on backdrop click
  const modal = document.getElementById('projectModal');
  modal.querySelector('.project-modal-backdrop').addEventListener('click', closeProjectModal);

  // Close on escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

// ========== THEME PARTICLES (Optional Background Animation) ==========
function initThemeParticles() {
  // Create subtle floating particles in background
  const particleCount = 20;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';
    particle.style.cssText = `
      position: fixed;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(0, 217, 255, ${Math.random() * 0.3});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      z-index: 0;
      animation: float-particle ${Math.random() * 10 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    document.body.appendChild(particle);
    particles.push(particle);
  }

  // Add CSS animation for particles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-particle {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0;
      }
      50% {
        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.5);
        opacity: 1;
      }
    }
    
    .project-modal {
      position: fixed;
      inset: 0;
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
    }
    
    .project-modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
    }
    
    .project-modal-content {
      position: relative;
      background: var(--card);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      max-width: 900px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 3rem;
      box-shadow: var(--shadow-xl);
      animation: slideUp 0.3s ease;
    }
    
    .project-modal-close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 40px;
      height: 40px;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: 50%;
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      z-index: 10;
    }
    
    .project-modal-close:hover {
      background: var(--error);
      transform: rotate(90deg);
    }
    
    .project-modal-header {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--glass-border);
    }
    
    .project-modal-header h2 {
      margin-bottom: 1rem;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .project-modal-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .modal-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      color: var(--text-primary);
      font-weight: 600;
      transition: var(--transition);
    }
    
    .modal-btn:hover {
      background: var(--accent);
      color: var(--bg);
      border-color: var(--accent);
    }
    
    .project-modal-description {
      font-size: 1.0625rem;
      line-height: 1.8;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
    
    .project-modal-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--glass);
      border-radius: var(--radius);
    }
    
    .stat-box {
      text-align: center;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .project-modal-section {
      margin-bottom: 2rem;
    }
    
    .project-modal-section h3 {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      color: var(--accent);
    }
    
    .feature-list {
      list-style: none;
      display: grid;
      gap: 0.75rem;
    }
    
    .feature-list li {
      display: flex;
      align-items: start;
      gap: 0.75rem;
      color: var(--text-secondary);
    }
    
    .feature-list i {
      color: var(--success);
      margin-top: 0.25rem;
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .tech-tag {
      padding: 0.5rem 1rem;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: var(--transition);
    }
    
    .tech-tag:hover {
      background: var(--accent);
      color: var(--bg);
      border-color: var(--accent);
    }
  `;
  document.head.appendChild(style);
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy load images
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ========== CONSOLE EASTER EGG ==========
console.log(
  '%c👋 Hi there, curious developer!',
  'font-size: 20px; font-weight: bold; color: #00d9ff;'
);
console.log(
  '%c🚀 Interested in how this portfolio was built?',
  'font-size: 14px; color: #7c3aed;'
);
console.log(
  '%c📧 Let\'s connect: vishwaavreddy@gmail.com',
  'font-size: 14px; color: #10b981;'
);
console.log(
  '%c💼 LinkedIn: linkedin.com/in/vishwaa-reddy-904260272',
  'font-size: 14px; color: #f59e0b;'
);

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // You can add error reporting service here
});

// ========== EXPORT FUNCTIONS FOR GLOBAL ACCESS ==========
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.downloadCertificate = downloadCertificate;
window.shareCertificate = shareCertificate;