/* =========================================================
   GLOBAL RESET
========================================================= */
* {
    box-sizing: border-box;
}

:root {
    --bg-main: #0a0c12;
    --bg-header: #0a0c12;
    --bg-nav: #0a0c12;
    --bg-panel: #11141d;

    --text-primary: #ffec00;
    --text-secondary: #00eaff;
    --text-muted: #b3b3b3;

    --border-neon: #ff0000;

    --premium-yellow: #ffe600;
}

/* =========================================================
   BODY
========================================================= */
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: var(--bg-main);
    color: var(--text-secondary);
}

/* =========================================================
   HEADER TOP BAR (ROW 1)
========================================================= */
.top-bar {
    background-color: var(--bg-header);
    width: 100%;
    padding: 0;
}

.row1,
.row2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
}

/* =========================================================
   LEFT BLOCK (LOGO, MENU)
========================================================= */
.left-block {
    display: flex;
    align-items: center;
    gap: 10px;
}

.menu-toggle {
    background: none;
    border: none;
    font-size: 24px;
    color: var(--text-secondary);
    cursor: pointer;
}

/* =========================================================
   BRAND AREA (ROW 2)
========================================================= */
.brand-area {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo {
    width: 36px;
    height: 36px;
    background: #ffb300;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: black;
    font-size: 18px;
}

.brand-name {
    font-size: 20px;
    font-weight: bold;
    color: var(--text-secondary);
}

.brand-tagline {
    font-size: 12px;
    color: var(--text-muted);
}

/* =========================================================
   NAVIGATION (ROW 2)
========================================================= */
.nav-main {
    display: flex;
    align-items: center;
    gap: 35px;
}

.nav-item {
    color: var(--text-secondary);
    font-size: 17px;
    text-decoration: none;
    font-weight: bold;
    position: relative;
}

.nav-item.active {
    color: var(--text-primary);
    text-shadow: 0 0 6px var(--text-primary);
}

/* PREMIUM STAR */
.premium-link .premium-star {
    color: var(--premium-yellow);
    margin-left: 4px;
    font-size: 18px;
}

/* ROW SEPARATORS */
.row1-separator,
.row2-separator {
    width: 100%;
    height: 1px;
    background: rgba(255,255,255,0.12);
}

/* =========================================================
   SEARCH BAR — FINAL FIX APPLIED
========================================================= */
.search-box {
    display: flex;
    align-items: center;
    background: var(--bg-panel);
    border: 1px solid var(--border-neon);
    border-radius: 6px;
    padding: 4px 10px; /* UNTOUCHED HORIZONTAL */
    padding-top: 5px;  /* +1px FIX */
    height: 34px;      /* +2px FIX */
    position: relative;
}

.search-icon img {
    width: 16px;
    height: 16px;
    opacity: 0.9;
    margin-right: 6px;
}

.search-box input[type="search"] {
    background: transparent;
    border: none;
    outline: none;
    font-size: 14px;
    color: var(--text-secondary);
    padding: 2px 0; /* untouched horizontal */
    height: 20px;   /* FIX: ensures vertical centering */
}

/* =========================================================
   NOTIFICATION BUTTON
========================================================= */
.notif-button {
    background: none;
    border: none;
    cursor: pointer;
}

.icon {
    width: 20px;
    height: 20px;
}

/* =========================================================
   DROPDOWNS (ODDS, LANGUAGE, BETTING TOOLS)
========================================================= */
.odds-dropdown,
.lang-dropdown,
.betting-tools-dropdown {
    position: absolute;
    display: none;
    background-color: var(--bg-panel);
    border: 1px solid var(--border-neon);
    padding: 8px 10px;
    margin-top: 4px;
    z-index: 99999;
}

.odds-item,
.lang-item,
.tools-item {
    padding: 6px 4px;
    cursor: pointer;
    white-space: nowrap;
}

.odds-item.active,
.lang-item.active {
    color: var(--text-primary);
}

/* =========================================================
   SUB NAV — ROW 3
========================================================= */
.sub-nav {
    display: flex;
    width: 100%;
    padding: 0 12px;
}

.row-3-group {
    display: none;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;
    width: 100%;
}

.row-3-group.active {
    display: flex;
}

.sub-item {
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 15px;
}

.sub-item:hover {
    color: var(--text-primary);
}

/* BETTING TOOLS DROPDOWN INSIDE SUB NAV */
.sub-item-tools {
    position: relative;
    cursor: pointer;
}

.betting-tools-dropdown {
    left: 0;
    min-width: 180px;
}

/* =========================================================
   MODALS
========================================================= */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: none;
    z-index: 9999;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-panel);
    border: 1px solid var(--border-neon);
    padding: 20px;
    width: 350px;
    display: none;
    z-index: 10000;
    border-radius: 8px;
}

.modal-title {
    color: var(--text-primary);
    text-align: center;
}

.modal-close {
    position: absolute;
    top: 8px;
    right: 10px;
    background: none;
    border: none;
    font-size: 22px;
    color: var(--text-secondary);
    cursor: pointer;
}

.modal-label {
    display: block;
    margin-bottom: 12px;
}

.modal-label input {
    width: 100%;
    padding: 6px;
    background: #000;
    border: 1px solid #333;
    color: var(--text-secondary);
}

.modal-btn.primary {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background: var(--text-primary);
    color: black;
    border: none;
    cursor: pointer;
}

/* =========================================================
   MOBILE
========================================================= */
@media (max-width: 900px) {
    .nav-main {
        display: none;
    }
    .nav-main.is-open {
        display: block;
    }
    .sub-nav {
        display: none;
    }
    .sub-nav.is-open {
        display: block;
    }
}
