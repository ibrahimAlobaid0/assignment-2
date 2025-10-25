/* ===========================================================
   THEME TOGGLE (Light / Dark Mode)
   =========================================================== */
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
  // Toggle dark-theme class on the body
  document.body.classList.toggle('dark-theme');

  // Save user preference in local storage
  const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Apply saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

/* ===========================================================
   EXPANDABLE / COLLAPSIBLE PROJECT SECTIONS
   =========================================================== */
document.querySelectorAll(".project h3").forEach(title => {
  title.addEventListener("click", () => {
    const project = title.parentElement;
    const description = project.querySelector(".description");

    // Toggle visibility
    const isVisible = description.style.display === "block";
    description.style.display = isVisible ? "none" : "block";

    // Toggle arrow rotation
    project.classList.toggle("active", !isVisible);
  });
});

/* ===========================================================
   CONTACT FORM VALIDATION + ANIMATED FEEDBACK
   =========================================================== */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');

  // Clear everything first
  status.classList.remove('show', 'success', 'error');
  status.textContent = '';
  
  // Force browser to reflow (this is the key!)
  void status.offsetWidth;

  // Validate input fields
  if (!name || !email || !message) {
    status.textContent = "⚠️ Please fill in all fields.";
    status.classList.add('error');
    
    // Force reflow again before adding 'show'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        status.classList.add('show');
      });
    });
    
    setTimeout(() => status.classList.remove('show'), 4000);
    return;
  }

  // Show success message
  status.textContent = "✅ Message sent successfully!";
  status.classList.add('success');
  
  // Force reflow before adding 'show'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      status.classList.add('show');
    });
  });

  setTimeout(() => status.classList.remove('show'), 4000);

  e.target.reset();
});


/* ===========================================================
   SCROLL FADE-IN ANIMATION
   (Reveals elements with 'fade-in' class as they appear)
   =========================================================== */
/* ===========================================================
   SCROLL FADE-IN ANIMATION
   (Reveals elements with 'fade-in' class as they appear)
   =========================================================== */

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Select all elements with fade-in class
  const fadeElements = document.querySelectorAll('.fade-in');

  // Function to reveal elements when they enter viewport
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85; // 85% of viewport height

    fadeElements.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < triggerBottom) {
        el.classList.add('visible'); // Add class to trigger CSS fade-in
      }
    });
  }

  // Listen to scroll event
  window.addEventListener('scroll', revealOnScroll);

  // Run immediately to catch elements already visible
  revealOnScroll();
});



/* ===========================================================
   EMPTY STATE HANDLING FOR PROJECTS
   (Displays a message if no projects are present)
   =========================================================== */

// Select project container and empty state message

const projectsContainer = document.getElementById('projects-container');
const emptyMessage = document.getElementById('empty-projects');
function checkProjects() {
    if (!projectsContainer) return; // safeguard
    const projects = projectsContainer.querySelectorAll('.project');
    emptyMessage.style.display = projects.length === 0 ? 'block' : 'none';
  }
checkProjects();
