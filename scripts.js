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
       UTILITY — CLOSE ALL OTHER DROPDOWNS
    ============================ */
    function closeAll(except = null) {
        if (except !== "betting") {
            if (bettingToolsDropdown) bettingToolsDropdown.style.display = "none";
            bettingToolsOpen = false;
        }
        if (except !== "odds") {
            if (oddsDropdown) oddsDropdown.style.display = "none";
            oddsDropdownOpen = false;
        }
        if (except !== "lang") {
            if (langDropdown) langDropdown.style.display = "none";
            langDropdownOpen = false;
        }
    }

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
       BETTING TOOLS
    ============================ */
    function openBettingTools() {
        bettingToolsDropdown.style.display = "block";
        bettingToolsOpen = true;
    }
    function closeBettingTools() {
        bettingToolsDropdown.style.display = "none";
        bettingToolsOpen = false;
    }

    if (bettingToolsToggle && bettingToolsDropdown) {
        bettingToolsToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAll("betting");
            bettingToolsOpen ? closeBettingTools() : openBettingTools();
        });

        // Prevent closing when clicking inside dropdown
        bettingToolsDropdown.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    /* ============================
       ODDS FORMAT DROPDOWN
    ============================ */
    function openOdds() {
        oddsDropdown.style.display = "block";
        oddsDropdownOpen = true;
    }
    function closeOdds() {
        oddsDropdown.style.display = "none";
        oddsDropdownOpen = false;
    }

    if (oddsToggle && oddsDropdown) {
        oddsToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAll("odds");
            oddsDropdownOpen ? closeOdds() : openOdds();
        });
    }

    if (oddsDropdown) {
        oddsDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".odds-item");
            if (!item) return;

            const labelText = item.textContent.split("(")[0].trim();
            const labelSpan = oddsToggle.querySelector(".odds-label");
            if (labelSpan) labelSpan.textContent = labelText;

            oddsDropdown.querySelectorAll(".odds-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            closeOdds();
        });
    }

    /* ============================
       LANGUAGE DROPDOWN
    ============================ */
    function openLang() {
        langDropdown.style.display = "block";
        langDropdownOpen = true;
    }
    function closeLang() {
        langDropdown.style.display = "none";
        langDropdownOpen = false;
    }

    if (langToggle && langDropdown) {
        langToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAll("lang");
            langDropdownOpen ? closeLang() : openLang();
        });
    }

    if (langDropdown) {
        langDropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".lang-item");
            if (!item) return;

            langDropdown.querySelectorAll(".lang-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            const codeSpan = langToggle.querySelector(".language-code");
            if (codeSpan) codeSpan.textContent = item.textContent.trim();

            try {
                const code = item.getAttribute("data-lang");
                if (code) localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
            } catch (err) {}

            closeLang();
            location.reload();
        });
    }

    /* ============================
       MODALS
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
        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            closeAnyModal();
            openModal(loginModal);
        });
    }

    if (registerButton) {
        registerButton.addEventListener("click", (e) => {
            e.preventDefault();
            closeAnyModal();
            openModal(registerModal);
        });
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
    if (menuToggle) {
        menuToggle.addEventListener("click", (e) => {
            e.preventDefault();
            navMain.classList.toggle("is-open");
            subNav.classList.toggle("is-open");
        });
    }

    /* ============================
       CLICK OUTSIDE → CLOSE ALL
    ============================ */
    document.addEventListener("click", (e) => {
        const t = e.target;

        if (!bettingToolsToggle.contains(t) && !bettingToolsDropdown.contains(t))
            closeBettingTools();

        if (!oddsToggle.contains(t) && !oddsDropdown.contains(t))
            closeOdds();

        if (!langToggle.contains(t) && !langDropdown.contains(t))
            closeLang();
    });

    /* ============================
       ESC KEY CLOSE
    ============================ */
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAll();
            closeAnyModal();
        }
    });

    initDefaultSection();
});
