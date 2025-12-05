document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       ELEMENTS
    --------------------------------------------------------- */
    const navItems = document.querySelectorAll(".nav-item");
    const row3Groups = document.querySelectorAll(".row-3-group");
    const oddsToggle = document.getElementById("odds-toggle");
    const oddsDropdown = document.getElementById("odds-dropdown");
    const langToggle = document.getElementById("lang-toggle");
    const langDropdown = document.getElementById("lang-dropdown");

    const bettingToolsToggle = document.getElementById("betting-tools-toggle");
    const bettingToolsDropdown = document.getElementById("betting-tools-dropdown");

    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-button");

    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const overlay = document.getElementById("modal-overlay");

    const openRegisterFromLogin = document.getElementById("open-register-from-login");
    const openLoginFromRegister = document.getElementById("open-login-from-register");

    const menuToggle = document.querySelector(".menu-toggle");
    const navMain = document.getElementById("main-nav");
    const subNav = document.getElementById("sub-nav");

    /* ---------------------------------------------------------
       UTILITIES FOR CLEAN CLOSING
    --------------------------------------------------------- */

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

    function closeBettingToolsDropdown() {
        if (bettingToolsDropdown) {
            bettingToolsDropdown.style.display = "none";
            bettingToolsToggle.classList.remove("active");
        }
    }

    /* ---------------------------------------------------------
       PRIMARY NAVIGATION (ROW 2 + ROW 3 SUBNAV)
    --------------------------------------------------------- */

    function setSection(sectionName) {
        navItems.forEach((item) =>
            item.classList.toggle("active", item.dataset.section === sectionName)
        );

        row3Groups.forEach((group) =>
            group.classList.toggle("active", group.dataset.subnav === sectionName)
        );
    }

    function initDefaultSection() {
        const active = Array.from(navItems).find((i) => i.classList.contains("active"));
        if (active) setSection(active.dataset.section);
    }

    initDefaultSection();

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const section = item.getAttribute("data-section");
            if (section) {
                setSection(section);
            }
        });
    });

    /* ---------------------------------------------------------
       ODDS FORMAT DROPDOWN
    --------------------------------------------------------- */

    if (oddsToggle && oddsDropdown) {
        oddsToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            closeLangDropdown();
            closeBettingToolsDropdown();

            const isOpen = oddsDropdown.style.display === "block";
            if (isOpen) {
                closeOddsDropdown();
                return;
            }

            oddsDropdown.style.display = "block";

            const rect = oddsToggle.getBoundingClientRect();
            oddsDropdown.style.top = rect.bottom + window.scrollY + 4 + "px";
            oddsDropdown.style.left = rect.left + window.scrollX + "px";

            oddsToggle.classList.add("active");
        });

        oddsDropdown.querySelectorAll(".dropdown-item").forEach((item) => {
            item.addEventListener("click", (e) => {
                e.stopPropagation();

                const text = (item.textContent || "").trim();
                const label = text.split("(")[0].trim();
                const oddsLabel = oddsToggle.querySelector(".odds-label");

                if (oddsLabel) {
                    oddsLabel.textContent = label;
                }

                closeOddsDropdown();
            });
        });
    }

    /* ---------------------------------------------------------
       LANGUAGE DROPDOWN
    --------------------------------------------------------- */

    if (langToggle && langDropdown) {
        langToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            closeOddsDropdown();
            closeBettingToolsDropdown();

            const isOpen = langDropdown.style.display === "block";
            if (isOpen) {
                closeLangDropdown();
                return;
            }

            langDropdown.style.display = "block";

            const rect = langToggle.getBoundingClientRect();
            langDropdown.style.top = rect.bottom + window.scrollY + 4 + "px";
            langDropdown.style.left = rect.left + window.scrollX + "px";

            langToggle.classList.add("active");
        });

        langDropdown.querySelectorAll(".lang-item").forEach((item) => {
            item.addEventListener("click", (e) => {
                e.stopPropagation();

                const code = item.textContent.trim();
                const langCode = langToggle.querySelector(".language-code");

                if (langCode) {
                    langCode.textContent = code;
                }

                localStorage.setItem("be_language", code);

                closeLangDropdown();
            });
        });

        const storedLang = localStorage.getItem("be_language");
        if (storedLang && langToggle.querySelector(".language-code")) {
            langToggle.querySelector(".language-code").textContent = storedLang;
        }
    }

    /* ---------------------------------------------------------
       CLICK OUTSIDE (FOR BOTH ODDS + LANGUAGE + BETTING TOOLS)
    --------------------------------------------------------- */

    document.addEventListener("click", (e) => {
        const clickOdds = oddsToggle && oddsToggle.contains(e.target);
        const clickOddsDrop = oddsDropdown && oddsDropdown.contains(e.target);

        const clickLang = langToggle && langToggle.contains(e.target);
        const clickLangDrop = langDropdown && langDropdown.contains(e.target);

        const clickBT = bettingToolsToggle && bettingToolsToggle.contains(e.target);
        const clickBTDrop = bettingToolsDropdown && bettingToolsDropdown.contains(e.target);

        if (!clickOdds && !clickOddsDrop) closeOddsDropdown();
        if (!clickLang && !clickLangDrop) closeLangDropdown();
        if (!clickBT && !clickBTDrop) closeBettingToolsDropdown();
    });

    /* ---------------------------------------------------------
       BETTING TOOLS DROPDOWN (UNCHANGED LOGIC + SAFETY FIXES)
    --------------------------------------------------------- */

    if (bettingToolsToggle && bettingToolsDropdown) {
        bettingToolsToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            closeOddsDropdown();
            closeLangDropdown();

            const isOpen = bettingToolsDropdown.style.display === "block";
            if (isOpen) {
                closeBettingToolsDropdown();
                return;
            }

            bettingToolsDropdown.style.display = "block";

            const rect = bettingToolsToggle.getBoundingClientRect();
            bettingToolsDropdown.style.top = rect.bottom + window.scrollY + "px";
            bettingToolsDropdown.style.left = rect.left + window.scrollX + "px";

            bettingToolsToggle.classList.add("active");
        });
    }

    /* ---------------------------------------------------------
       MODAL SYSTEM (UNCHANGED)
    --------------------------------------------------------- */

    function showModal(modal) {
        if (!modal) return;
        modal.style.display = "block";
        overlay.style.display = "block";
    }

    function hideModal(modal) {
        if (!modal) return;
        modal.style.display = "none";
        overlay.style.display = "none";
    }

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            showModal(loginModal);
        });
    }

    if (registerButton) {
        registerButton.addEventListener("click", () => {
            showModal(registerModal);
        });
    }

    if (openRegisterFromLogin) {
        openRegisterFromLogin.addEventListener("click", () => {
            hideModal(loginModal);
            showModal(registerModal);
        });
    }

    if (openLoginFromRegister) {
        openLoginFromRegister.addEventListener("click", () => {
            hideModal(registerModal);
            showModal(loginModal);
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            hideModal(loginModal);
            hideModal(registerModal);
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            hideModal(loginModal);
            hideModal(registerModal);
        }
    });

    /* ---------------------------------------------------------
       MOBILE MENU
    --------------------------------------------------------- */

    if (menuToggle && navMain && subNav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            navMain.classList.toggle("is-open");
            subNav.classList.toggle("is-open");
        });
    }

});
