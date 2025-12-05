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
        bettingToolsDropdown.style.display = "block";
        bettingToolsOpen = true;
    }
    function closeBettingToolsDropdown() {
        bettingToolsDropdown.style.display = "none";
        bettingToolsOpen = false;
    }

    if (bettingToolsToggle) {
        bettingToolsToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            bettingToolsOpen ? closeBettingToolsDropdown() : openBettingToolsDropdown();
        });
    }


    // ODDS FORMAT
    function openOddsDropdown() {
        oddsDropdown.style.display = "block";
        oddsDropdownOpen = true;
    }
    function closeOddsDropdown() {
        oddsDropdown.style.display = "none";
        oddsDropdownOpen = false;
    }

    if (oddsToggle) {
        oddsToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            oddsDropdownOpen ? closeOddsDropdown() : openOddsDropdown();
        });
    }

    if (oddsDropdown) {
        oddsDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".odds-item");
            if (!item) return;

            const label = (item.textContent || "").split("(")[0].trim();
            oddsToggle.querySelector(".odds-label").textContent = label;

            oddsDropdown.querySelectorAll(".odds-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            closeOddsDropdown();
        });
    }


    // LANGUAGE DROPDOWN
    function openLangDropdown() {
        langDropdown.style.display = "block";
        langDropdownOpen = true;
    }
    function closeLangDropdown() {
        langDropdown.style.display = "none";
        langDropdownOpen = false;
    }

    if (langToggle) {
        // Load saved language
        let savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLang) {
            const saved = langDropdown.querySelector(`[data-lang="${savedLang}"]`);
            if (saved) {
                langDropdown.querySelectorAll(".lang-item").forEach(i => i.classList.remove("active"));
                saved.classList.add("active");
                langToggle.querySelector(".language-code").textContent = saved.textContent.trim();
            }
        }

        langToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            langDropdownOpen ? closeLangDropdown() : openLangDropdown();
        });
    }

    if (langDropdown) {
        langDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".lang-item");
            if (!item) return;

            langDropdown.querySelectorAll(".lang-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            langToggle.querySelector(".language-code").textContent = item.textContent.trim();
            localStorage.setItem(LANGUAGE_STORAGE_KEY, item.getAttribute("data-lang"));

            closeLangDropdown();
            location.reload();
        });
    }


    /* ============================
       MODALS (LOGIN / REGISTER)
    ============================ */
    function openModal(modal) {
        overlay.style.display = "block";
        modal.style.display = "block";
        activeModal = modal;
    }
    function closeModal(modal) {
        modal.style.display = "none";
        overlay.style.display = "none";
        if (activeModal === modal) activeModal = null;
    }
    function closeAnyModal() {
        if (activeModal) closeModal(activeModal);
    }

    if (loginButton) {
        loginButton.addEventListener("click", () => openModal(loginModal));
    }
    if (registerButton) {
        registerButton.addEventListener("click", () => openModal(registerModal));
    }

    if (loginClose) loginClose.addEventListener("click", () => closeModal(loginModal));
    if (registerClose) registerClose.addEventListener("click", () => closeModal(registerModal));

    if (overlay) overlay.addEventListener("click", () => closeAnyModal());

    if (openRegisterFromLogin) {
        openRegisterFromLogin.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
    }
    if (openLoginFromRegister) {
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
        navMain.classList.toggle("is-open");
        subNav.classList.toggle("is-open");
    }

    if (menuToggle) {
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

        if (bettingToolsOpen && !bettingToolsToggle.contains(t) && !bettingToolsDropdown.contains(t)) {
            closeBettingToolsDropdown();
        }

        if (oddsDropdownOpen && !oddsToggle.contains(t) && !oddsDropdown.contains(t)) {
            closeOddsDropdown();
        }

        if (langDropdownOpen && !langToggle.contains(t) && !langDropdown.contains(t)) {
            closeLangDropdown();
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
