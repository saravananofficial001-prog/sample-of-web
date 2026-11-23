// Shared header and footer
const headerTarget = document.getElementById('site-header');
const footerTarget = document.getElementById('site-footer');

if (headerTarget) {
  headerTarget.innerHTML = `
    <header class="site-header">
      <a class="brand" href="index.html"><span class="brand-main">THANGAM</span><span class="brand-sub">AGENCY</span></a>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
      <nav class="main-nav" id="main-navigation">
        <button class="close-menu" type="button" aria-label="Close menu">CLOSE MENU <span aria-hidden="true">×</span></button>
        <a href="index.html">Home</a>
        <a href="furniture.html">Furniture</a>
        <a href="electronics.html">Electronics</a>
        <a href="mobile-service.html">Mobiles</a>
        <a href="brands.html">Brands</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <button class="language-toggle" type="button">தமிழ்</button>
      </nav>
    </header>`;
}

if (footerTarget) {
  footerTarget.innerHTML = `
    <footer class="site-footer">
      <div><a class="brand footer-brand" href="index.html"><span class="brand-main">THANGAM</span><span class="brand-sub">AGENCY</span></a>
      <p>Furniture • Electronics • Mobile Sales &amp; Services</p></div>
      <div class="footer-contact"><p>Damotha Nagar, Thoothukudi, Tamil Nadu, India</p><p>9:00 AM – 9:00 PM</p><a href="tel:+919486024462">9486024462</a></div>
      <p class="copyright">© ${new Date().getFullYear()} Thangam Agency. All Rights Reserved.</p>
    </footer>`;
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const closeMenuButton = document.querySelector('.close-menu');

function setMenuOpen(open) {
  if (!menuButton || !nav) return;
  nav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.textContent = open ? '×' : '☰';
  document.body.classList.toggle('menu-is-open', open);
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));
  closeMenuButton?.addEventListener('click', () => setMenuOpen(false));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
}

// Highlight the current page in the navigation
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Tamil / English switch for elements that have both translations.
// This is a simple page-level toggle; category and product names remain in English.
const languageButton = document.querySelector('.language-toggle');
let currentLanguage = 'en';
if (languageButton) {
  languageButton.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ta' : 'en';
    document.querySelectorAll('[data-en][data-ta]').forEach(element => {
      element.innerHTML = element.dataset[currentLanguage];
    });
    languageButton.textContent = currentLanguage === 'en' ? 'தமிழ்' : 'English';
  });
}

// Contact form opens a pre-filled WhatsApp message; no server is required.
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const message = document.getElementById('customer-message').value.trim();
    const text = `Hello Thangam Agency,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEnquiry: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/919486024462?text=${text}`, '_blank', 'noopener');
  });
}
