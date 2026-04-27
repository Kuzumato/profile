/**
 * Navigation Module
 * Handles sidebar navigation and section switching
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeIntro();
  initializeNavigation();
});

/**
 * Initialize intro screen
 */
function initializeIntro() {
  const folder = document.getElementById('folder');
  const introScreen = document.getElementById('introScreen');
  const container = document.querySelector('.container');

  if (folder) {
    folder.addEventListener('click', function() {
      // Animate folder opening
      folder.style.transform = 'scale(0.95) rotateX(10deg)';
      
      setTimeout(() => {
        // Hide intro
        introScreen.style.opacity = '0';
        setTimeout(() => {
          introScreen.style.display = 'none';
          // Show main content
          container.style.display = 'block';
          container.style.animation = 'fadeIn 0.5s ease';
        }, 300);
      }, 200);
    });
  }
}

/**
 * Initialize navigation event listeners
 */
function initializeNavigation() {
  const sidebarButtons = document.querySelectorAll('.sidebar-btn');
  
  sidebarButtons.forEach(button => {
    button.addEventListener('click', handleNavigation);
  });
}

/**
 * Handle navigation button clicks
 * @param {Event} event - Click event
 */
function handleNavigation(event) {
  const button = event.currentTarget;
  const section = button.getAttribute('data-section');
  
  if (section) {
    showSection(section);
  }
}

/**
 * Show specific section and hide others
 * @param {string} section - Section identifier (about, resume, projects, awards, contact)
 */
function showSection(section) {
  // Hide all content sections
  const allSections = document.querySelectorAll('.content-section');
  allSections.forEach(sec => {
    sec.classList.remove('active');
  });

  // Show selected section
  const selectedSection = document.getElementById(section + '-section');
  if (selectedSection) {
    selectedSection.classList.add('active');
  }

  // Special case: Show skills section with about section
  if (section === 'about') {
    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
      skillsSection.classList.add('active');
    }
  }

  // Update active button state
  updateActiveButton(section);

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update active button styling
 * @param {string} section - Currently active section
 */
function updateActiveButton(section) {
  const allButtons = document.querySelectorAll('.sidebar-btn');
  
  allButtons.forEach(btn => {
    const btnSection = btn.getAttribute('data-section');
    if (btnSection === section) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
