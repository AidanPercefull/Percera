
(() => {
    "use strict";

    if (window.innerWidth > 860) return;

    function closeAll(except = null) {
        document.querySelectorAll(".percera-mobile-select-wrap.open").forEach(wrap => {
            if (wrap !== except) wrap.classList.remove("open");
        });
    }

    function positionMenu(wrap) {
        const button = wrap.querySelector(".percera-mobile-select-button");
        const menu = wrap.querySelector(".percera-mobile-select-menu");
        if (!button || !menu) return;

        const rect = button.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const menuH = Math.min(250, Math.max(120, viewportH * 0.38));
        const gap = 6;

        const spaceBelow = viewportH - rect.bottom - 12;
        const spaceAbove = rect.top - 12;

        menu.style.maxHeight = menuH + "px";

        if (spaceBelow >= 140 || spaceBelow >= spaceAbove) {
            const top = Math.min(rect.bottom + gap, viewportH - 140);
            menu.style.top = Math.max(12, top) + "px";
            menu.style.bottom = "auto";
        } else {
            const bottom = Math.min(viewportH - rect.top + gap, viewportH - 140);
            menu.style.bottom = Math.max(12, bottom) + "px";
            menu.style.top = "auto";
        }
    }

    function enhanceSelect(select) {
        if (!select || select.dataset.perceraCustomSelect === "1") return;

        select.dataset.perceraCustomSelect = "1";
        select.classList.add("percera-native-select-hidden");

        const wrap = document.createElement("div");
        wrap.className = "percera-mobile-select-wrap";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "percera-mobile-select-button";
        button.setAttribute("aria-haspopup", "listbox");

        const menu = document.createElement("div");
        menu.className = "percera-mobile-select-menu";
        menu.setAttribute("role", "listbox");

        wrap.append(button, menu);
        select.insertAdjacentElement("afterend", wrap);

        function syncButton() {
            const option = select.options[select.selectedIndex];
            button.textContent = option ? option.textContent.trim() : "Select";
        }

        function rebuildOptions() {
            menu.replaceChildren();

            Array.from(select.options).forEach(option => {
                const item = document.createElement("button");
                item.type = "button";
                item.className = "percera-mobile-select-option";
                item.textContent = option.textContent.trim();
                item.disabled = option.disabled;

                if (option.value === select.value) {
                    item.classList.add("selected");
                }

                item.addEventListener("click", event => {
                    event.stopPropagation();
                    select.value = option.value;
                    select.dispatchEvent(new Event("change", { bubbles: true }));
                    syncButton();
                    rebuildOptions();
                    wrap.classList.remove("open");
                });

                menu.appendChild(item);
            });
        }

        button.addEventListener("click", event => {
            event.stopPropagation();

            const willOpen = !wrap.classList.contains("open");
            closeAll(wrap);

            if (willOpen) {
                rebuildOptions();
                wrap.classList.add("open");
                positionMenu(wrap);
            } else {
                wrap.classList.remove("open");
            }
        });

        select.addEventListener("change", () => {
            syncButton();
            rebuildOptions();
        });

        syncButton();
        rebuildOptions();
    }

    function scan() {
        document.querySelectorAll("select").forEach(enhanceSelect);
    }

    document.addEventListener("click", () => closeAll());

    window.addEventListener("resize", () => {
        document.querySelectorAll(".percera-mobile-select-wrap.open").forEach(positionMenu);
    });

    window.addEventListener("scroll", () => {
        document.querySelectorAll(".percera-mobile-select-wrap.open").forEach(positionMenu);
    }, true);

    scan();

    const observer = new MutationObserver(scan);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
