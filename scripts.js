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

    const oddsFormat = document.querySelector(".odds-format");
    const oddsToggle = document.getElementById("odds-toggle");
    const oddsDropdown = document.getElementById("odds-dropdown");
    const oddsLabel = oddsToggle ? oddsToggle.querySelector(".odds-label") : null;

    const langToggle = document.querySelector(".language-toggle");
    const langDropdown = document.getElementById("lang-dropdown");
    const LANGUAGE_STORAGE_KEY = "be_language";
    const languageCodeLabel = langToggle ? langToggle.querySelector(".language-code") : null;

    // --- AUTO-CLOSE BETWEEN ODDS & LANGUAGE DROPDOWNS --- //
    function closeOddsDropdown() {
        if (oddsDropdown) {
            oddsDropdown.style.display = "none";
            oddsToggle.classList.remove("active");
    }
}

    function closeLangDropdown() {
        if (langDropdown) {
            langDropdown.style.display = "none";
            langToggle.classList.remove("active");
    }
}

    // When opening Odds → close Language
    oddsToggle.addEventListener("click", () => {
        closeLangDropdown();
});

    // When opening Language → close Odds
    langToggle.addEventListener("click", () => {
        closeOddsDropdown();
});

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
    const passwordToggles = document.querySelectorAll(".password-toggle");

    let activeModal = null;
    let bettingToolsOpen = false;
    let oddsDropdownOpen = false;
    let langDropdownOpen = false;

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
            if (bettingToolsOpen) {
                closeBettingToolsDropdown();
            } else {
                openBettingToolsDropdown();
            }
        });
    }

    // ODDS FORMAT DROPDOWN
    function openOddsDropdown() {
        if (!oddsFormat || !oddsDropdown) return;
        oddsFormat.classList.add("open");
        oddsDropdownOpen = true;
    }

    function closeOddsDropdown() {
        if (!oddsFormat || !oddsDropdown) return;
        oddsFormat.classList.remove("open");
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
            if (oddsLabel) {
                oddsLabel.textContent = label;
            }
            closeOddsDropdown();
        });
    }

    // LANGUAGE DROPDOWN
    function openLangDropdown() {
        if (!langToggle || !langDropdown) return;
        langDropdown.classList.add("open");
        langDropdownOpen = true;
    }

    function closeLangDropdown() {
        if (!langDropdown) return;
        langDropdown.classList.remove("open");
        langDropdownOpen = false;
    }

    if (langToggle && langDropdown) {
        // Initialize language label from localStorage, if available
        let savedLangCode = null;
        try {
            savedLangCode = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        } catch (e) {
            savedLangCode = null;
        }
        if (savedLangCode) {
            const savedItem = langDropdown.querySelector(`.lang-item[data-lang="${savedLangCode}"]`);
            if (savedItem) {
                const allItems = langDropdown.querySelectorAll(".lang-item");
                allItems.forEach(i => i.classList.remove("active"));
                savedItem.classList.add("active");
                const label = (savedItem.textContent || "").trim();
                if (languageCodeLabel) {
                    languageCodeLabel.textContent = label;
                }
            }
        }

        langToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (langDropdownOpen) {
                closeLangDropdown();
            } else {
                openLangDropdown();
            }
        });

        langDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".lang-item");
            if (!item) return;

            const label = (item.textContent || "").trim();
            const allItems = langDropdown.querySelectorAll(".lang-item");
            allItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            if (languageCodeLabel) {
                languageCodeLabel.textContent = label;
            }

            const code = item.getAttribute("data-lang") || "";
            if (code) {
                try {
                    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
                } catch (err) {
                    // ignore storage errors
                }
            }

            closeLangDropdown();
            window.location.reload();
        });
    }

    // MODALS
    function openModal(modal) {
        if (!modal || !overlay) return;
        overlay.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        activeModal = modal;
    }

    function closeModal(modal) {
        if (!modal || !overlay) return;
        modal.setAttribute("aria-hidden", "true");
        overlay.classList.remove("active");
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

    // PASSWORD TOGGLE
    if (passwordToggles && passwordToggles.length > 0) {
        passwordToggles.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const wrapper = btn.closest(".password-field");
                const input = wrapper ? wrapper.querySelector("input") : null;
                if (!input) return;
                input.type = input.type === "password" ? "text" : "password";
            });
        });
    }

    // ESC key closes modal and dropdowns
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAnyModal();
            closeBettingToolsDropdown();
            closeOddsDropdown();
            closeLangDropdown();
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

        if (langDropdownOpen) {
            const insideToggle = langToggle && langToggle.contains(target);
            const insideDropdown = langDropdown && langDropdown.contains(target);
            if (!insideToggle && !insideDropdown) {
                closeLangDropdown();
            }
        }
    });

    // Initialize initial state
    initDefaultSection();
});
