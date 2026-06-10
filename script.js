/* Global interactive behaviors for all pages */

/* Mobile menu toggle (supports multiple menu buttons across pages) */
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mobile = document.querySelector('.mobile-menu');
    if (!mobile) return;
    mobile.classList.toggle('hidden');
  });
});

/* Scroll-triggered counters */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target || 0;
      let current = 0;
      const duration = 1200;
      const stepTime = Math.max(8, Math.floor(duration / Math.max(1, target)));
      const step = Math.max(1, Math.floor(target / (duration / stepTime)));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.innerText = target;
          clearInterval(timer);
        } else {
          el.innerText = current;
        }
      }, stepTime);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => observer.observe(c));
}
document.addEventListener('DOMContentLoaded', initCounters);

/* Testimonials rotation (used on home/about) */
const testimonials = [
  { text: "The internship helped me build a portfolio and land my first role.", author: "A. Student" },
  { text: "Mentors were supportive and the projects were real-world.", author: "B. Learner" },
  { text: "I learned practical skills and improved my confidence.", author: "C. Intern" }
];
let tIndex = 0;
function rotateTestimonials() {
  const tText = document.getElementById('testimonial-text') || document.getElementById('home-testimonial');
  const tAuthor = document.getElementById('testimonial-author') || document.getElementById('home-testimonial-author');
  if (!tText || !tAuthor) return;
  tIndex = (tIndex + 1) % testimonials.length;
  tText.classList.add('opacity-0');
  tAuthor.classList.add('opacity-0');
  setTimeout(() => {
    tText.innerText = testimonials[tIndex].text;
    tAuthor.innerText = `— ${testimonials[tIndex].author}`;
    tText.classList.remove('opacity-0');
    tAuthor.classList.remove('opacity-0');
  }, 300);
}
setInterval(rotateTestimonials, 5000);

/* FAQ accordion */
document.querySelectorAll('.faq-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const plus = btn.querySelector('span:last-child');
    if (!content) return;
    const isHidden = content.classList.contains('hidden');
    document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.faq-toggle span:last-child').forEach(s => s.innerText = '+');
    if (isHidden) {
      content.classList.remove('hidden');
      plus.innerText = '−';
    } else {
      content.classList.add('hidden');
      plus.innerText = '+';
    }
  });
});

/* Contact form handler (client-side simulation) */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    if (!status) return;
    status.classList.remove('hidden');
    status.innerText = 'Sending message...';
    setTimeout(() => {
      status.innerText = 'Message sent successfully. We will reply shortly.';
      contactForm.reset();
    }, 900);
  });
}

/* Internship search & filter (client-side) */
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const internSearch = document.getElementById('intern-search');
const internDuration = document.getElementById('intern-duration');

function filterInternships(query, duration) {
  const cards = document.querySelectorAll('.internship-card');
  if (!cards.length) return;
  const q = (query || '').trim().toLowerCase();
  cards.forEach(card => {
    const skills = (card.dataset.skills || '').toLowerCase();
    const dur = (card.dataset.duration || '').toLowerCase();
    const title = (card.querySelector('h3')?.innerText || '').toLowerCase();
    const matchesQuery = !q || title.includes(q) || skills.includes(q);
    const matchesDuration = !duration || dur.includes(duration.toLowerCase());
    if (matchesQuery && matchesDuration) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    filterInternships(searchInput.value, document.getElementById('filter-duration')?.value || '');
  });
}
if (internSearch) {
  internSearch.addEventListener('input', () => {
    filterInternships(internSearch.value, internDuration?.value || '');
  });
}
if (internDuration) {
  internDuration.addEventListener('change', () => {
    filterInternships(internSearch?.value || '', internDuration.value);
  });
}

/* Small accessibility: close mobile menu on outside click */
document.addEventListener('click', (e) => {
  const mobile = document.querySelector('.mobile-menu');
  const btn = e.target.closest('.menu-btn');
  if (!btn && mobile && !mobile.classList.contains('hidden')) {
    const isInside = e.target.closest('.mobile-menu');
    if (!isInside) mobile.classList.add('hidden');
  }
});