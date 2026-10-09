// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when clicking on any link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Viewport Reveal Animations for Contact Section
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.15,
};

const animateOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach((el) => {
  animateOnScroll.observe(el);
});

// Contact Form Validation & Submission Handler
const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
const nameInput = document.getElementById('name') as HTMLInputElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
const servicesSelect = document.getElementById('services') as HTMLSelectElement | null;
const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const formFeedback = document.getElementById('form-feedback');

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function clearErrors() {
  if (nameError) {
    nameError.textContent = '';
    nameError.classList.add('hidden');
  }
  if (emailError) {
    emailError.textContent = '';
    emailError.classList.add('hidden');
  }
  nameInput?.classList.remove('ring-2', 'ring-red-300', 'border-red-400');
  emailInput?.classList.remove('ring-2', 'ring-red-300', 'border-red-400');
}

if (contactForm && nameInput && emailInput) {
  // Real-time error clearance on input
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0 && nameError) {
      nameError.textContent = '';
      nameError.classList.add('hidden');
      nameInput.classList.remove('ring-2', 'ring-red-300', 'border-red-400');
    }
  });

  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value) && emailError) {
      emailError.textContent = '';
      emailError.classList.add('hidden');
      emailInput.classList.remove('ring-2', 'ring-red-300', 'border-red-400');
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput?.value.trim() || 'Not specified';
    const service = servicesSelect?.value || 'General Inquiry';
    const message = messageInput?.value.trim() || 'No message provided';

    // Validate Name
    if (!name) {
      if (nameError) {
        nameError.textContent = 'Please enter your name.';
        nameError.classList.remove('hidden');
      }
      nameInput.classList.add('ring-2', 'ring-red-300', 'border-red-400');
      nameInput.focus();
      isValid = false;
    }

    // Validate Email
    if (!email) {
      if (emailError) {
        emailError.textContent = 'Please enter your email address.';
        emailError.classList.remove('hidden');
      }
      emailInput.classList.add('ring-2', 'ring-red-300', 'border-red-400');
      if (isValid) emailInput.focus();
      isValid = false;
    } else if (!validateEmail(email)) {
      if (emailError) {
        emailError.textContent = 'Please enter a valid email address (e.g. name@example.com).';
        emailError.classList.remove('hidden');
      }
      emailInput.classList.add('ring-2', 'ring-red-300', 'border-red-400');
      if (isValid) emailInput.focus();
      isValid = false;
    }

    if (!isValid) {
      if (formFeedback) {
        formFeedback.textContent = 'Please correct the highlighted errors above.';
        formFeedback.className = 'block bg-red-900/60 border border-red-300/40 text-[#FFF8F0] py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all';
      }
      return;
    }

    // Validated: launch mailto client with structured message parameters
    if (formFeedback) {
      formFeedback.textContent = 'Opening your email client to send your inquiry to Resmi...';
      formFeedback.className = 'block bg-white/20 border border-white/40 text-[#FFF8F0] py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all';
    }

    const subject = encodeURIComponent(`Inquiry from ${name} - ${service}`);
    const body = encodeURIComponent(
      `Hi Resmi,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}\n`
    );

    window.location.href = `mailto:resmiharidas21@gmail.com?subject=${subject}&body=${body}`;
  });
}

