document.addEventListener("DOMContentLoaded", () => {
    /* ============================
       ELEMENT REFERENCES
    ============================ */
    const navMain = document.getElementById("main-nav");
    const subNav = document.getElementById("sub-nav");
    const navItems = navMain ? navMain.querySelectorAll(".nav-item[data-section]") : [];
    const rowGroups = subNav ? subNav.querySelectorAll(".row-3-group") : [];

    const bettingToolsToggle = document.getElementById("betting-tools-toggle");
    const bettingToolsDropdown = document.getElementById("betting-tools-dropdown");

    const oddsToggle = document.getElementById("odds-toggle");
    const oddsDropdown = document.getElementById("odds-dropdown");

    const langToggle = document.querySelector(".language-toggle");
    const langDropdown = document.getElementById("lang-dropdown");

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

    let bettingToolsOpen = false;
    let oddsDropdownOpen = false;
    let langDropdownOpen = false;
    let activeModal = null;

    const LANGUAGE_STORAGE_KEY = "be_language";


    /* ============================
       NAVIGATION SWITCHING
    ============================ */
    function clearActiveNav() {
        navItems.forEach(item => item.classList.remove("active"));
    }

    function setSection(section) {
        rowGroups.forEach(group => {
            group.classList.toggle("active", group.getAttribute("data-subnav") === section);
        });
    }

    function initDefaultSection() {
        const activeNav = Array.from(navItems).find(item => item.classList.contains("active"));
        const section = activeNav ? activeNav.getAttribute("data-section") : "odds";
        setSection(section);
    }

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            clearActiveNav();
            item.classList.add("active");
            setSection(item.getAttribute("data-section"));
        });
    });


    /* ============================
       DROPDOWN HANDLERS
    ============================ */

    // BETTING TOOLS
    function openBettingToolsDropdown() {
        if (!bettingToolsDropdown) return;
        bettingToolsDropdown.style.display = "block";
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
            bettingToolsOpen ? closeBettingToolsDropdown() : openBettingToolsDropdown();
        });
    }


    // ODDS FORMAT
    function openOddsDropdown() {
        if (!oddsDropdown) return;
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
            oddsDropdownOpen ? closeOddsDropdown() : openOddsDropdown();
        });
    }

    if (oddsDropdown && oddsToggle) {
        oddsDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".odds-item");
            if (!item) return;

            const label = (item.textContent || "").split("(")[0].trim();
            const labelSpan = oddsToggle.querySelector(".odds-label");
            if (labelSpan) {
                labelSpan.textContent = label;
            }

            oddsDropdown.querySelectorAll(".odds-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            closeOddsDropdown();
        });
    }


    // LANGUAGE DROPDOWN
    function openLangDropdown() {
        if (!langDropdown) return;
        langDropdown.style.display = "block";
        langDropdownOpen = true;
    }
    function closeLangDropdown() {
        if (!langDropdown) return;
        langDropdown.style.display = "none";
        langDropdownOpen = false;
    }

    if (langToggle && langDropdown) {
        // Load saved language
        let savedLang = null;
        try {
            savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        } catch (e) {
            savedLang = null;
        }

        if (savedLang) {
            const saved = langDropdown.querySelector(`[data-lang="${savedLang}"]`);
            if (saved) {
                langDropdown.querySelectorAll(".lang-item").forEach(i => i.classList.remove("active"));
                saved.classList.add("active");
                const codeSpan = langToggle.querySelector(".language-code");
                if (codeSpan) {
                    codeSpan.textContent = saved.textContent.trim();
                }
            }
        }

        langToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            langDropdownOpen ? closeLangDropdown() : openLangDropdown();
        });
    }

    if (langDropdown && langToggle) {
        langDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".lang-item");
            if (!item) return;

            langDropdown.querySelectorAll(".lang-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const codeSpan = langToggle.querySelector(".language-code");
            if (codeSpan) {
                codeSpan.textContent = item.textContent.trim();
            }

            const langCode = item.getAttribute("data-lang");
            if (langCode) {
                try {
                    localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
                } catch (err) {
                    // ignore storage error
                }
            }

            closeLangDropdown();
            location.reload();
        });
    }


    /* ============================
       MODALS (LOGIN / REGISTER)
    ============================ */
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
        if (activeModal) {
            closeModal(activeModal);
        }
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


    /* ============================
       MOBILE MENU
    ============================ */
    function toggleMobileNav() {
        if (!navMain || !subNav) return;
        navMain.classList.toggle("is-open");
        subNav.classList.toggle("is-open");
    }

    if (menuToggle && navMain && subNav) {
        menuToggle.addEventListener("click", (e) => {
            e.preventDefault();
            toggleMobileNav();
        });
    }


    /* ============================
       GLOBAL CLICK (close dropdowns)
    ============================ */
    document.addEventListener("click", (e) => {
        const t = e.target;

        if (bettingToolsOpen && bettingToolsToggle && bettingToolsDropdown) {
            const insideToggle = bettingToolsToggle.contains(t);
            const insideDropdown = bettingToolsDropdown.contains(t);
            if (!insideToggle && !insideDropdown) {
                closeBettingToolsDropdown();
            }
        }

        if (oddsDropdownOpen && oddsToggle && oddsDropdown) {
            const insideToggle = oddsToggle.contains(t);
            const insideDropdown = oddsDropdown.contains(t);
            if (!insideToggle && !insideDropdown) {
                closeOddsDropdown();
            }
        }

        if (langDropdownOpen && langToggle && langDropdown) {
            const insideToggle = langToggle.contains(t);
            const insideDropdown = langDropdown.contains(t);
            if (!insideToggle && !insideDropdown) {
                closeLangDropdown();
            }
        }
    });


    /* ============================
       ESC KEY CLOSE
    ============================ */
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAnyModal();
            closeBettingToolsDropdown();
            closeOddsDropdown();
            closeLangDropdown();
        }
    });


    /* ============================
       INIT
    ============================ */
    initDefaultSection();
});
