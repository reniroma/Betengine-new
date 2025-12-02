document.addEventListener("DOMContentLoaded", () => {
    // Primary elements
    const navMain = document.getElementById("main-nav");
    const subNav = document.getElementById("sub-nav");
    const navItems = navMain ? navMain.querySelectorAll(".nav-item[data-section]") : [];
    const rowGroups = subNav ? subNav.querySelectorAll(".row-3-group") : [];

    const bookmakersNav = document.getElementById("bookmakers-nav");
    const premiumToggle = document.getElementById("premium-toggle");
    const bettingToolsToggle = document.getElementById("betting-tools-toggle");
    const bettingToolsDropdown = document.getElementById("betting-tools-dropdown");

    const oddsToggle = document.getElementById("odds-toggle");
    const oddsDropdown = document.getElementById("odds-dropdown");

    const loginButton = document.querySelector(".auth-btn.login");
    const registerButton = document.querySelector(".auth-btn.register");

    const overlay = document.getElementById("modal-overlay");
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");

    const loginClose = loginModal ? loginModal.querySelector(".modal-close") : null;
    const registerClose = registerModal ? registerModal.querySelector(".modal-close") : null;

    const openRegisterFromLogin = document.getElementById("open-register-from-login");
    const openLoginFromRegister = document.getElementById("open-login-from-register");

    const menuToggle = document.querySelector(".menu-toggle");

    let activeModal = null;
    let bettingToolsOpen = false;
    let oddsDropdownOpen = false;

    // Utility: clear active nav
    function clearActiveNav() {
        navItems.forEach(item => item.classList.remove("active"));
    }

    // Utility: set visible row-3 group
    function setSection(section) {
        if (!rowGroups) return;
        rowGroups.forEach(group => {
            const subnav = group.getAttribute("data-subnav");
            if (subnav === section) {
                group.classList.add("active");
            } else {
                group.classList.remove("active");
            }
        });
    }

    // Initialize default section
    function initDefaultSection() {
        const activeNav = Array.from(navItems).find(item =>
            item.classList.contains("active")
        );
        if (activeNav) {
            const section = activeNav.getAttribute("data-section");
            setSection(section || "odds");
        } else {
            setSection("odds");
        }
    }

    // Primary navigation click handling
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const section = item.getAttribute("data-section");
            if (!section) return;
            clearActiveNav();
            item.classList.add("active");
            setSection(section);
        });
    });

    // BETTING TOOLS DROPDOWN
    function openBettingToolsDropdown() {
        if (!bettingToolsToggle || !bettingToolsDropdown) return;
        const rect = bettingToolsToggle.getBoundingClientRect();
        bettingToolsDropdown.style.display = "block";
        bettingToolsDropdown.style.top = rect.bottom + window.scrollY + "px";
        bettingToolsDropdown.style.left = rect.left + window.scrollX + "px";
        bettingToolsOpen = true;
    }

    function closeBettingToolsDropdown() {
        if (!bettingToolsDropdown) return;
        bettingToolsDropdown.style.display = "none";
        bettingToolsOpen = false;
    }

    if (bettingToolsToggle && bettingToolsDropdown) {
        bettingToolsToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (bettingToolsOpen) {
                closeBettingToolsDropdown();
            } else {
                openBettingToolsDropdown();
            }
        });
    }

    // ODDS FORMAT DROPDOWN
    function openOddsDropdown() {
        if (!oddsToggle || !oddsDropdown) return;
        oddsDropdown.style.display = "block";
        oddsDropdownOpen = true;
    }

    function closeOddsDropdown() {
        if (!oddsDropdown) return;
        oddsDropdown.style.display = "none";
        oddsDropdownOpen = false;
    }

    if (oddsToggle && oddsDropdown) {
        oddsToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (oddsDropdownOpen) {
                closeOddsDropdown();
            } else {
                openOddsDropdown();
            }
        });

        oddsDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".odds-item");
            if (!item) return;
            const text = item.textContent || "";
            const label = text.split("(")[0].trim();
            const allItems = oddsDropdown.querySelectorAll(".odds-item");
            allItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            oddsToggle.textContent = label + " ▾";
            closeOddsDropdown();
        });
    }

    // MODALS
    function openModal(modal) {
        if (!modal || !overlay) return;
        overlay.style.display = "block";
        modal.style.display = "block";
        activeModal = modal;
    }

    function closeModal(modal) {
        if (!modal || !overlay) return;
        modal.style.display = "none";
        overlay.style.display = "none";
        if (activeModal === modal) {
            activeModal = null;
        }
    }

    function closeAnyModal() {
        if (!activeModal) return;
        closeModal(activeModal);
    }

    if (loginButton && loginModal) {
        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            closeAnyModal();
            openModal(loginModal);
        });
    }

    if (registerButton && registerModal) {
        registerButton.addEventListener("click", (e) => {
            e.preventDefault();
            closeAnyModal();
            openModal(registerModal);
        });
    }

    if (loginClose && loginModal) {
        loginClose.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(loginModal);
        });
    }

    if (registerClose && registerModal) {
        registerClose.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(registerModal);
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            closeAnyModal();
        });
    }

    if (openRegisterFromLogin && loginModal && registerModal) {
        openRegisterFromLogin.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
    }

    if (openLoginFromRegister && loginModal && registerModal) {
        openLoginFromRegister.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(registerModal);
            openModal(loginModal);
        });
    }

    // ESC key closes modal and dropdowns
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAnyModal();
            closeBettingToolsDropdown();
            closeOddsDropdown();
        }
    });

    // MOBILE MENU
    function toggleMobileNav() {
        if (!navMain || !subNav) return;
        const isOpen = navMain.classList.contains("is-open");
        if (isOpen) {
            navMain.classList.remove("is-open");
            subNav.classList.remove("is-open");
        } else {
            navMain.classList.add("is-open");
            subNav.classList.add("is-open");
        }
    }

    if (menuToggle && navMain && subNav) {
        menuToggle.addEventListener("click", (e) => {
            e.preventDefault();
            toggleMobileNav();
        });
    }

    // Global click handler to close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
        const target = e.target;

        if (bettingToolsOpen) {
            const insideToggle = bettingToolsToggle && bettingToolsToggle.contains(target);
            const insideDropdown = bettingToolsDropdown && bettingToolsDropdown.contains(target);
            if (!insideToggle && !insideDropdown) {
                closeBettingToolsDropdown();
            }
        }

        if (oddsDropdownOpen) {
            const insideToggle = oddsToggle && oddsToggle.contains(target);
            const insideDropdown = oddsDropdown && oddsDropdown.contains(target);
            if (!insideToggle && !insideDropdown) {
                closeOddsDropdown();
            }
        }
    });

    // Initialize initial state
    initDefaultSection();
});
