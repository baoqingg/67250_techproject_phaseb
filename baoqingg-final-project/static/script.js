function ActiveNav() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (window.location.href === link.href) {
      link.classList.add('active');
    }
  });
}
ActiveNav();
 
// ---- Footer Year ----
function addYear() {
  const el = document.getElementById('copyYear');
  if (el) {
    const y = new Date().getFullYear();
    el.innerHTML = '&copy; ' + y + ' MonoMuse. All rights reserved.';
  }
}
 
// ---- Time-based Greeting (index only) ----
function greetingFunc() {
  const el = document.getElementById('greeting');
  if (!el) return;
  const h = new Date().getHours();
  const greetings = [
    [5, 12, 'Good morning, and welcome to MonoMuse.'],
    [12, 18, 'Good afternoon, and welcome to MonoMuse.'],
    [18, 21, 'Good evening, and welcome to MonoMuse.'],
  ];
  const found = greetings.find(([s, e]) => h >= s && h < e);
  el.textContent = found ? found[2] : 'Good night, and welcome to MonoMuse.';
}
 
if (window.location.href.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/final-project/')) {
  greetingFunc();
}
 
// ---- Hamburger Menu ----
function toggleMenu() {
  document.querySelector('.nav_bar').classList.toggle('responsive');
}
 
// ---- Ticket Date Show Form ----
function showForm(date) {
  const form = document.getElementById('ticketForm');
  if (form) {
    form.style.display = 'block';
    const dateInput = document.getElementById('visitDate');
    if (dateInput) dateInput.value = date;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
 
// ---- Redirect to checkout with form data ----
function submitPurchase() {
  const name     = document.getElementById('name')?.value.trim();
  const email    = document.getElementById('email')?.value.trim();
  const quantity = document.getElementById('quantity')?.value;
  const date     = document.getElementById('visitDate')?.value;
  const type     = document.getElementById('ticketType')?.value || 'Adult';
 
  let valid = true;
  // Basic validation
  if (!name)     { showError('nameError', 'Name is required.'); valid = false; } else hideError('nameError');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('emailError', 'Valid email required.'); valid = false; } else hideError('emailError');
  if (!quantity || quantity < 1) { showError('quantityError', 'Select at least 1 ticket.'); valid = false; } else hideError('quantityError');
 
  if (!valid) return;
 
  const prices = { Adult: 18, Student: 10, Member: 15 };
  const total = (prices[type] || 18) * parseInt(quantity);
 
  const params = new URLSearchParams({ name, email, quantity, date, type, total });
  window.location.href = 'checkout.html?' + params.toString();
}
 
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
 
function hideError(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}
 
// ---- Price Calculator (buytickets) ----
function updatePrice() {
  const qty   = parseInt(document.getElementById('quantity')?.value) || 0;
  const type  = document.getElementById('ticketType')?.value || 'Adult';
  const prices= { Adult: 18, Student: 10, Member: 15 };
  const price = prices[type] || 18;
  const total = price * qty;
  const display = document.getElementById('priceDisplay');
  if (display) display.textContent = '$' + total.toFixed(2);
}
 
// ---- Image Slideshow ----
let currentSlide = 0;
let slideInterval;
 
function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;
 
  function goTo(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }
 
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.addEventListener('click', () => { clearInterval(slideInterval); goTo(i); slideInterval = setInterval(() => goTo(currentSlide + 1), 4500); });
  });
 
  document.querySelector('.slide-arrow.next')?.addEventListener('click', () => { clearInterval(slideInterval); goTo(currentSlide + 1); slideInterval = setInterval(() => goTo(currentSlide + 1), 4500); });
  document.querySelector('.slide-arrow.prev')?.addEventListener('click', () => { clearInterval(slideInterval); goTo(currentSlide - 1); slideInterval = setInterval(() => goTo(currentSlide + 1), 4500); });
 
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  slideInterval = setInterval(() => goTo(currentSlide + 1), 4500);
}
 
// ---- Leaflet Map ----
function loadLeafletMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;
  if (mapEl._leaflet_id) return;
 
  const lat = 40.4443, lng = -79.9436;
  const map = L.map('map').setView([lat, lng], 15);
 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
 
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup('<strong>MonoMuse Museum</strong><br>Carnegie Mellon University, Pittsburgh, PA')
    .openPopup();
}
 
// ---- Checkout Confirmation Page ----
function loadCheckoutPage() {
  const params = new URLSearchParams(window.location.search);
  if (!params.get('name')) return;
 
  const fields = {
    confName:     params.get('name'),
    confEmail:    params.get('email'),
    confDate:     params.get('date'),
    confType:     params.get('type'),
    confQuantity: params.get('quantity') + ' ticket(s)',
    confTotal:    '$' + parseFloat(params.get('total')).toFixed(2),
  };
 
  for (const [id, val] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
 
  const box = document.getElementById('confirmBox');
  if (box) box.style.display = 'block';
}
 
// ---- DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', function () {
  addYear();
  loadLeafletMap();
  initSlideshow();
  loadCheckoutPage();
 
  // jQuery: Read More / Read Less
  if (typeof $ !== 'undefined') {
    $('#readMore').click(function () {
      $('#longIntro').slideDown(300);
      $('#readLess').show();
      $(this).hide();
    });
 
    $('#readLess').click(function () {
      $('#longIntro').slideUp(300);
      $('#readMore').show();
      $(this).hide();
    });
 
    // jQuery: Accordion for exhibitions
    $('.accordion-header').click(function () {
      const body = $(this).next('.accordion-body');
      const isOpen = body.is(':visible');
      $('.accordion-body').slideUp(250);
      $('.accordion-header').removeClass('open');
      if (!isOpen) {
        body.slideDown(250);
        $(this).addClass('open');
      }
    });
  }
 
  // Ticket price update listeners
  const qtyInput  = document.getElementById('quantity');
  const typeSelect = document.getElementById('ticketType');
  if (qtyInput)   qtyInput.addEventListener('input', updatePrice);
  if (typeSelect) typeSelect.addEventListener('change', updatePrice);
});
 