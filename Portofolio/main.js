// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// Contact form - mailto handler
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
      formStatus.textContent = "Please fill out all fields before sending.";
      formStatus.classList.remove("success");
      formStatus.classList.add("error");
      return;
    }

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ];

    const mailto = `mailto:chetanlimbani111@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;

    formStatus.textContent =
      "Your email client should now be open with a pre-filled message.";
    formStatus.classList.remove("error");
    formStatus.classList.add("success");
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// Typing animation function
function typeWriter(element, text, speed) {
  let i = 0;
  element.textContent = '';
  element.style.borderRight = '2px solid #93c5fd';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.style.borderRight = 'none'; // remove cursor after typing
    }
  }
  type();
}

// Scroll animations - pop up elements when they come into view
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// Add fade-in class to animated elements and handle intro overlay
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to all scroll-triggered elements
  const animatedElements = document.querySelectorAll(
    ".card, .pill-card, .project-card, .skills-card, .education-card, .section-header, .hero-text, .hero-profile, .contact-form, .contact-details li, .list li"
  );

  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in");
    // Add data attribute for stagger delay
    el.setAttribute("data-animation-delay", index * 0.1);
    observer.observe(el);
  });

  // Intro overlay animation
  const introOverlay = document.getElementById("intro-overlay");
  if (introOverlay) {
    const mainText = introOverlay.querySelector('.intro-overlay-main');
    if (mainText) {
      // Start typing main text after a short delay
      setTimeout(() => {
        typeWriter(mainText, 'Hi, I Am Chetan Limbani', 100);
      }, 500);
      // Fade out after typing completes
      setTimeout(() => {
        introOverlay.classList.add("intro-overlay--fade");
      }, 3500); // 0.5 + 2.5 + 0.5
      // Hide completely
      setTimeout(() => {
        introOverlay.classList.add("intro-overlay--hidden");
      }, 5000);
    } else {
      // Fallback
      setTimeout(() => {
        introOverlay.classList.add("intro-overlay--fade");
      }, 900);
      setTimeout(() => {
        introOverlay.classList.add("intro-overlay--hidden");
      }, 1700);
    }
  }

  // Rotating roles in hero section
  const rolePills = document.querySelectorAll(".hero-roles .role-pill");
  if (rolePills.length > 0) {
    let currentRoleIndex = 0;

    // Show the first role initially
    rolePills.forEach((pill, index) => {
      pill.classList.toggle("active", index === 0);
    });

    setInterval(() => {
      rolePills[currentRoleIndex].classList.remove("active");
      currentRoleIndex = (currentRoleIndex + 1) % rolePills.length;
      rolePills[currentRoleIndex].classList.add("active");
    }, 3000); // change every 3 seconds
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Dark Mode / Light Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme on load
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeIcon('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLightMode = document.body.classList.toggle('light-mode');
      const theme = isLightMode ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }
});

