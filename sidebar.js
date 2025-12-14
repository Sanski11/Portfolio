document.addEventListener('DOMContentLoaded', () => {

  // Sidebar elements
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  // Show sidebar
  if (navToggle && sidebar && sidebarBackdrop) {
    navToggle.addEventListener('click', () => {
      sidebar.classList.add('show');
      sidebarBackdrop.classList.add('show');
    });
  }

  // Hide sidebar
  if (navClose && sidebar && sidebarBackdrop) {
    navClose.addEventListener('click', () => {
      sidebar.classList.remove('show');
      sidebarBackdrop.classList.remove('show');
    });
  }

  // Close sidebar when clicking backdrop
  if (sidebarBackdrop && sidebar) {
    sidebarBackdrop.addEventListener('click', () => {
      sidebar.classList.remove('show');
      sidebarBackdrop.classList.remove('show');
    });
  }

  // Close sidebar when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar && sidebarBackdrop) {
        sidebar.classList.remove('show');
        sidebarBackdrop.classList.remove('show');
      }
    });
  });

  // ===== Active link (Intersection Observer) =====
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  if (sections.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection = entry.target.id;
          updateActiveLink();
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  function updateActiveLink() {
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active-link');
      }
    });
  }

  // ===== Dark Mode =====
  const savedMode = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedMode === 'true' || (!savedMode && prefersDark)) {
    document.body.classList.add('dark');
  }

  const themeBtns = document.querySelectorAll('#theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('darkMode', document.body.classList.contains('dark'));
      btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
  });

});