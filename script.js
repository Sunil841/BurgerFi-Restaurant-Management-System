document.addEventListener('DOMContentLoaded', () => {

  // ── ELEMENTS 
  const searchBtn   = document.getElementById('search-btn');
  const searchForm  = document.querySelector('.search-form');
  const cartBtn     = document.getElementById('cart-btn');
  const cartBox     = document.querySelector('.cart-items-container');
  const menuBtn     = document.getElementById('menu-btn');
  const navbar      = document.querySelector('.navbar');
  const loginButton = document.getElementById('login-button');
  const loginModal  = document.getElementById('login-modal');
  const closeModal  = document.getElementById('close-modal');
  const loginForm   = document.querySelector('#login-modal form');

  // ── SEARCH TOGGLE 
  if (searchBtn && searchForm) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchForm.classList.toggle('active');
      if (cartBox)  cartBox.classList.remove('active');
      if (navbar)   navbar.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target) && e.target !== searchBtn) {
        searchForm.classList.remove('active');
      }
    });

    // Live search highlight
    const searchInput = searchForm.querySelector('input');
    if (searchInput) {
      searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
          alert(`Searching for: "${searchInput.value.trim()}"`);
          searchInput.value = '';
          searchForm.classList.remove('active');
        }
      });
    }
  }

  // ── CART TOGGLE 
  if (cartBtn && cartBox) {
    cartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cartBox.classList.toggle('active');
      if (searchForm) searchForm.classList.remove('active');
      if (navbar)     navbar.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
      if (!cartBox.contains(e.target) && e.target !== cartBtn) {
        cartBox.classList.remove('active');
      }
    });

    // Remove cart items
    cartBox.querySelectorAll('.fa-times').forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = icon.closest('.cart-item');
        if (item) {
          item.style.opacity = '0';
          item.style.transform = 'translateX(100%)';
          setTimeout(() => item.remove(), 250);
        }
      });
    });
  }

  // ── MOBILE MENU TOGGLE 
  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navbar.classList.toggle('active');
      if (searchForm) searchForm.classList.remove('active');
      if (cartBox)    cartBox.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && e.target !== menuBtn) {
        navbar.classList.remove('active');
      }
    });
  }

  // ── LOGIN MODAL 
  if (loginButton && loginModal) {
    loginButton.addEventListener('click', (e) => {
      e.stopPropagation();
      loginModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    const closeIt = () => {
      loginModal.classList.remove('show');
      document.body.style.overflow = '';
    };

    if (closeModal) closeModal.addEventListener('click', closeIt);
    loginModal.addEventListener('click', (e) => { if (e.target === loginModal) closeIt(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeIt(); });

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.querySelector("input[type='text']").value.trim();
        const password = loginForm.querySelector("input[type='password']").value.trim();

        if (!username || !password) {
          showToast('Please fill in all fields.', 'error');
          return;
        }
        // Simulate login success
        showToast(`Welcome back, ${username}! 🍔`, 'success');
        setTimeout(closeIt, 1200);
      });
    }
  }

  // ── ADD TO CART BUTTONS 
  document.querySelectorAll('.btn[data-add], .product-btn a, .box-bottom .btn').forEach(btn => {
    if (btn.textContent.toLowerCase().includes('add') || btn.closest('.product-btn')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const box  = btn.closest('.box');
        const name = box?.querySelector('h3, .name')?.textContent || 'Item';
        showToast(`"${name}" added to cart! 🛒`, 'success');
      });
    }
  });

  // ── SMOOTH SCROLL for anchor links 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navbar) navbar.classList.remove('active');
      }
    });
  });

  // ── CONTACT FORM 
  const contactForm = document.querySelector('.contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]');
      let valid = true;
      inputs.forEach(i => { if (!i.value.trim()) valid = false; });
      if (!valid) { showToast('Please fill in all fields.', 'error'); return; }
      showToast('Message sent! We\'ll be in touch soon. 🍔', 'success');
      contactForm.reset();
    });
  }

  // ── FOOTER SEARCH 
  document.querySelectorAll('.footer .search').forEach(fs => {
    const btn   = fs.querySelector('.btn');
    const input = fs.querySelector('input');
    if (btn && input) {
      btn.addEventListener('click', () => {
        if (input.value.trim()) {
          showToast(`Searching for "${input.value.trim()}"...`, 'success');
          input.value = '';
        } else {
          showToast('Enter a search term.', 'error');
        }
      });
    }
  });

  // ── CARD FLIP 
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  // ── TOAST HELPER 
  function showToast(msg, type = 'success') {
    const existing = document.querySelector('.bf-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'bf-toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '3rem',
      right: '3rem',
      background: type === 'success' ? '#1a2f6e' : '#e53e3e',
      color: '#fff',
      padding: '1.4rem 2.8rem',
      borderRadius: '50px',
      fontSize: '1.5rem',
      fontWeight: '700',
      fontFamily: 'Nunito, sans-serif',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      zIndex: '99999',
      transform: 'translateY(20px)',
      opacity: '0',
      transition: 'all 0.3s ease',
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ── SCROLL REVEAL 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.box, .about .row .content, .contact .row').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});