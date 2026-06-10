// Mobile menu toggle (works on all pages)
document.querySelectorAll('#menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mobile = document.getElementById('mobile-menu');
    if (mobile) mobile.classList.toggle('hidden');
  });
});

// Animated counters
function runCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target') || 0;
    let count = 0;
    const step = Math.max(1, Math.floor(target / 200));
    const update = () => {
      count += step;
      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}
document.addEventListener('DOMContentLoaded', runCounters);

// Simple testimonial rotation (About page)
const testimonials = [
  { text: "The internship helped me build a portfolio and land my first role.", author: "A. Student" },
  { text: "Mentors were supportive and the projects were real-world.", author: "B. Learner" },
  { text: "I learned practical skills and improved my confidence.", author: "C. Intern" }
];
let tIndex = 0;
function rotateTestimonials() {
  const tText = document.getElementById('testimonial-text');
  const tAuthor = document.getElementById('testimonial-author');
  if (!tText || !tAuthor) return;
  tIndex = (tIndex + 1) % testimonials.length;
  tText.classList.add('opacity-0', 'transition', 'duration-300');
  tAuthor.classList.add('opacity-0', 'transition', 'duration-300');
  setTimeout(() => {
    tText.innerText = testimonials[tIndex].text;
    tAuthor.innerText = `— ${testimonials[tIndex].author}`;
    tText.classList.remove('opacity-0');
    tAuthor.classList.remove('opacity-0');
  }, 300);
}
setInterval(rotateTestimonials, 5000);

// FAQ accordion
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

// Contact form basic handler (no backend)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    if (!status) return;
    status.classList.remove('hidden');
    status.innerText = 'Sending message...';
    // Simulate send
    setTimeout(() => {
      status.innerText = 'Message sent. We will reply to your email shortly.';
      contactForm.reset();
    }, 900);
  });
}