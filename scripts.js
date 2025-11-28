document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-main .nav-item');
  const rowGroups = document.querySelectorAll('.row-3-group');
  const premiumToggle = document.getElementById('premium-toggle');
  const bettingToggle = document.getElementById('betting-tools-toggle');
  const bettingDropdown = document.getElementById('betting-tools-dropdown');
  const oddsToggle = document.getElementById('odds-toggle');
  const oddsDropdown = document.getElementById('odds-dropdown');
  const oddsItems = document.querySelectorAll('.odds-item');
  const loginButton = document.querySelector('.auth-btn.login');
  const registerButton = document.querySelector('.auth-btn.register');
  const overlay = document.getElementById('modal-overlay');
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');
  const loginClose = document.querySelector('[data-modal-close="login"]');
  const registerClose = document.querySelector('[data-modal-close="register"]');
  const openRegisterLink = document.getElementById('open-register-from-login');
  const openLoginLink = document.getElementById('open-login-from-register');
  const bookmakersNav = document.querySelector('.nav-main .nav-item[data-section="bookmakers"]');
  const passwordToggle = document.querySelector('#login-modal .password-toggle');
  const passwordInput = document.querySelector('#login-modal input[name="password"]');

  const hideAllRowGroups = () => {
    rowGroups.forEach((group) => group.classList.remove('active'));
  };

  const setActiveSection = (section) => {
    hideAllRowGroups();
    const targetGroup = Array.from(rowGroups).find((group) => group.dataset.subnav === section);
    if (targetGroup) {
      targetGroup.classList.add('active');
    }
  };

  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      navItems.forEach((link) => link.classList.remove('active'));
      if (premiumToggle) {
        premiumToggle.classList.remove('active');
      }
      item.classList.add('active');
      setActiveSection(item.dataset.section);
    });
  });

  if (premiumToggle && bookmakersNav) {
    premiumToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      navItems.forEach((link) => link.classList.remove('active'));
      premiumToggle.classList.add('active');
      setActiveSection('premium');
    });
  }

  const closeBettingDropdown = () => {
    if (bettingDropdown) {
      bettingDropdown.style.display = 'none';
    }
  };

  if (bettingToggle && bettingDropdown) {
    bettingToggle.addEventListener('click', (event) => {
      event.preventDefault();
      const rect = bettingToggle.getBoundingClientRect();
      const isVisible = bettingDropdown.style.display === 'block';
      if (isVisible) {
        closeBettingDropdown();
        return;
      }

      bettingDropdown.style.left = `${rect.left + window.scrollX}px`;
      bettingDropdown.style.top = `${rect.bottom + window.scrollY}px`;
      bettingDropdown.style.display = 'block';
    });
  }

  const closeOddsDropdown = () => {
    if (oddsDropdown) {
      oddsDropdown.style.display = 'none';
    }
  };

  if (oddsToggle && oddsDropdown) {
    oddsToggle.addEventListener('click', () => {
      const isVisible = oddsDropdown.style.display === 'block';
      oddsDropdown.style.display = isVisible ? 'none' : 'block';
    });
  }

  oddsItems.forEach((item) => {
    item.addEventListener('click', () => {
      oddsItems.forEach((other) => other.classList.remove('active'));
      item.classList.add('active');
      if (oddsToggle) {
        const label = item.textContent.replace(' ✔', '');
        oddsToggle.textContent = `${label} ▾`;
      }
      closeOddsDropdown();
    });
  });

  const showModal = (modal) => {
    if (!modal || !overlay) return;
    overlay.style.display = 'block';
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
  };

  const hideModal = (modal) => {
    if (!modal || !overlay) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    overlay.style.display = 'none';
  };

  if (loginButton && loginModal) {
    loginButton.addEventListener('click', () => {
      showModal(loginModal);
    });
  }

  if (registerButton && registerModal) {
    registerButton.addEventListener('click', () => {
      showModal(registerModal);
    });
  }

  if (loginClose && loginModal) {
    loginClose.addEventListener('click', () => hideModal(loginModal));
  }

  if (registerClose && registerModal) {
    registerClose.addEventListener('click', () => hideModal(registerModal));
  }

  if (openRegisterLink && loginModal && registerModal) {
    openRegisterLink.addEventListener('click', (event) => {
      event.preventDefault();
      loginModal.style.display = 'none';
      registerModal.style.display = 'block';
      registerModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (openLoginLink && loginModal && registerModal) {
    openLoginLink.addEventListener('click', (event) => {
      event.preventDefault();
      registerModal.style.display = 'none';
      loginModal.style.display = 'block';
      loginModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      if (loginModal) hideModal(loginModal);
      if (registerModal) hideModal(registerModal);
      closeOddsDropdown();
      closeBettingDropdown();
    });
  }

  document.addEventListener('click', (event) => {
    if (bettingDropdown && bettingToggle && !bettingDropdown.contains(event.target) && !bettingToggle.contains(event.target)) {
      closeBettingDropdown();
    }
    if (oddsDropdown && oddsToggle && !oddsDropdown.contains(event.target) && !oddsToggle.contains(event.target)) {
      closeOddsDropdown();
    }
  });

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    });
  }
});
