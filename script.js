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
/* ===========================================================
   API: FETCH PROGRAMMING JOKE
   =========================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const loading = document.getElementById('joke-loading');
  const error = document.getElementById('joke-error');
  const content = document.getElementById('joke-content');
  const jokeText = document.getElementById('joke-text');

  function fetchJoke() {
    // show loading
    loading.style.display = 'flex';
    error.style.display = 'none';
    content.style.display = 'none';
    //wait 2 seconds to simulate loading using setTimeout
    setTimeout(() => {}, 10000);

    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          loading.style.display = 'none';
          content.style.display = 'block';
          jokeText.innerHTML = `<strong>${data.setup}</strong><br><br>${data.punchline}`;
        }, 1000);
      })
      .catch(err => {
        setTimeout(() => {
          loading.style.display = 'none';
          error.style.display = 'block';
          console.error('Error:', err);
        }, 2000);
      });
  }

  fetchJoke();

  const retryBtn = document.getElementById('retry-joke');
  if (retryBtn) retryBtn.addEventListener('click', fetchJoke);
});
