document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const rowGroups = document.querySelectorAll('.row-3-group');
    const bookmakersNav = document.getElementById("bookmakers-nav");
    const premiumToggle = document.getElementById("premium-toggle");

    function clearActive() {
        navItems.forEach(i => i.classList.remove("active"));
    }

    function setSection(section) {
        rowGroups.forEach(g => g.classList.remove("active"));
        const show = document.querySelector(`.row-3-group[data-subnav="${section}"]`);
        if (show) show.classList.add("active");
    }

    // Normal nav items (exclude premium + bookmakers)
    navItems.forEach(item => {
        if (item === premiumToggle || item === bookmakersNav) return;

        item.addEventListener("click", e => {
            e.preventDefault();
            clearActive();
            item.classList.add("active");
            setSection(item.dataset.section);
        });
    });

    // BOOKMAKERS
    bookmakersNav.addEventListener("click", e => {
        e.preventDefault();
        clearActive();
        bookmakersNav.classList.add("active");
        setSection("bookmakers");
    });

    // PREMIUM
    premiumToggle.addEventListener("click", e => {
        e.preventDefault();
        clearActive();
        premiumToggle.classList.add("active");
        setSection("premium");
    });

});
