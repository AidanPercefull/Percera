
(() => {
    "use strict";

    if (window.innerWidth > 860) return;

    function applyMoveColors() {
        document.querySelectorAll(".percera-mobile-qb-move").forEach(el => {
            const text = (el.textContent || "").trim();

            el.classList.remove("move-up", "move-down", "move-flat");

            if (text.includes("▲")) {
                el.classList.add("move-up");
            } else if (text.includes("▼")) {
                el.classList.add("move-down");
            } else {
                el.classList.add("move-flat");
            }
        });
    }

    applyMoveColors();

    const observer = new MutationObserver(() => {
        applyMoveColors();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();
