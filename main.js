// Modern Portfolio Website - Main JavaScript
// Handles animations, interactions, and responsive behavior

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initAnimations();
  
  // Setup mobile navigation toggle
  setupMobileNav();
  
  // Setup smooth scrolling for navigation links
  setupSmoothScroll();
  
  // Initialize form validation
  setupContactForm();
});

// GSAP Animations
function initAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    // Navbar animation
    gsap.from('.navbar', { 
      y: -100, 
      opacity: 0, 
      duration: 1, 
      ease: 'power3.out' 
    });
    
    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero__subtitle', { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: 'power3.out' 
    })
    .from('.hero__title', { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, '-=0.3')
    .from('.hero__role', { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, '-=0.3')
    .from('.hero__description', { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, '-=0.3')
    .from('.hero .btn', { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, '-=0.3')
    .from('.hero__card', { 
      opacity: 0, 
      x: 50, 
      duration: 0.8, 
      ease: 'power3.out' 
    }, '-=0.5');
    
    // Setup ScrollTrigger for section animations
    if (typeof ScrollTrigger !== 'undefined') {
      // About section
      gsap.from('.about__content > *', {
        scrollTrigger: {
          trigger: '.about',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      // Skills section - new design
      gsap.from('.skills-box', {
        scrollTrigger: {
          trigger: '.skills',
          start: 'top 80%',
          once: true
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: 'power3.out',
        onComplete: function() {
          console.log('Skills boxes animation complete');
        }
      });
      
      // Animate skill items with a staggered effect
      gsap.from('.skill-item', {
        scrollTrigger: {
          trigger: '.skills',
          start: 'top 70%',
          once: true
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.4,
        ease: 'power2.out',
        onComplete: function() {
          console.log('Skill items animation complete');
        }
      });
      
      // Projects section
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      // Contact section
      gsap.from('.contact__content > *', {
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  } else {
    // Fallback to CSS animations if GSAP is not loaded
    applyFallbackAnimations();
  }
}

// Apply CSS animations as fallback
function applyFallbackAnimations() {
  // Hero section
  document.querySelector('.hero__subtitle').classList.add('animate__animated', 'animate__fadeInUp');
  document.querySelector('.hero__title').classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-1');
  document.querySelector('.hero__role').classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-2');
  document.querySelector('.hero__description').classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-3');
  document.querySelector('.hero .btn').classList.add('animate__animated', 'animate__fadeInUp');
  document.querySelector('.hero__card').classList.add('animate__animated', 'animate__fadeInRight');
  
  // Add scroll-based animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('about__content')) {
          entry.target.querySelectorAll('*').forEach((el, index) => {
            el.classList.add('animate__animated', 'animate__fadeInUp');
            el.style.animationDelay = `${index * 0.1}s`;
          });
        } else if (entry.target.classList.contains('skills-container')) {
          entry.target.querySelectorAll('.skills-box').forEach((el, index) => {
            el.classList.add('animate__animated', 'animate__fadeInUp');
            el.style.animationDelay = `${index * 0.2}s`;
            // Make sure the skills box is visible
            el.style.opacity = '1';
          });
          
          // Animate the skill items with a slight delay
          setTimeout(() => {
            entry.target.querySelectorAll('.skill-item').forEach((el, index) => {
              el.classList.add('animate__animated', 'animate__fadeInRight');
              el.style.animationDelay = `${index * 0.05}s`;
              // Make sure the skill item is visible
              el.style.opacity = '1';
            });
          }, 300);
        } else if (entry.target.classList.contains('projects__grid')) {
          entry.target.querySelectorAll('.project-card').forEach((el, index) => {
            el.classList.add('animate__animated', 'animate__fadeInUp');
            el.style.animationDelay = `${index * 0.1}s`;
          });
        } else if (entry.target.classList.contains('contact__content')) {
          entry.target.querySelectorAll('*').forEach((el, index) => {
            el.classList.add('animate__animated', 'animate__fadeInUp');
            el.style.animationDelay = `${index * 0.1}s`;
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.about__content, .skills-grid, .skill-category, .projects__grid, .contact__content').forEach(el => {
    observer.observe(el);
  });
}

// Mobile Navigation Toggle
function setupMobileNav() {
  const navToggle = document.querySelector('.navbar__toggle');
  const navMenu = document.querySelector('.navbar__menu');
  const navLinks = document.querySelector('.navbar__links');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      } else {
        navMenu.classList.add('active');
        navLinks.style.flexDirection = 'column';
        navLinks.style.alignItems = 'center';
        navLinks.style.gap = '15px';
      }
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.navbar__links a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      });
    });
    
    // Reset navigation on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navLinks.style = '';
        navToggle.classList.remove('active');
      }
    });
  }
}

// Smooth Scrolling for Navigation Links
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Contact Form Validation
function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      
      if (!name.value.trim()) {
        highlightInvalid(name);
        valid = false;
      } else {
        removeHighlight(name);
      }
      
      if (!email.value.trim() || !isValidEmail(email.value)) {
        highlightInvalid(email);
        valid = false;
      } else {
        removeHighlight(email);
      }
      
      if (!subject.value.trim()) {
        highlightInvalid(subject);
        valid = false;
      } else {
        removeHighlight(subject);
      }
      
      if (!message.value.trim()) {
        highlightInvalid(message);
        valid = false;
      } else {
        removeHighlight(message);
      }
      
      if (valid) {
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show a success message
        contactForm.innerHTML = `
          <div class="form-success">
            <i class="fa-solid fa-check-circle" style="font-size: 3rem; color: var(--accent); margin-bottom: 20px;"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
          </div>
        `;
      }
    });
  }
}

// Helper function for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to highlight invalid fields
function highlightInvalid(element) {
  element.style.borderColor = '#ff4d4d';
  
  // Add error message if it doesn't exist
  const parent = element.parentElement;
  if (!parent.querySelector('.error-message')) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'This field is required';
    if (element.id === 'email' && element.value.trim()) {
      errorMessage.textContent = 'Please enter a valid email address';
    }
    errorMessage.style.color = '#ff4d4d';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '5px';
    parent.appendChild(errorMessage);
  }
}

// Helper function to remove highlight from valid fields
function removeHighlight(element) {
  element.style.borderColor = '';
  
  // Remove error message if it exists
  const parent = element.parentElement;
  const errorMessage = parent.querySelector('.error-message');
  if (errorMessage) {
    parent.removeChild(errorMessage);
  }
}

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar__links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    if (window.scrollY >= sectionTop - navbarHeight - 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
  
  // Add scroll class to navbar for background change
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
