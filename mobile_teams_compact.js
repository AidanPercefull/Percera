
(() => {
    "use strict";

    if (window.innerWidth > 860) return;

    let initialized = false;
    let tbodyObserver = null;

    function clean(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
    }

    function cloneLogo(cell) {
        const source = cell ? cell.querySelector("img") : null;
        if (!source) return null;

        const img = source.cloneNode(true);
        img.className = "percera-mobile-team-logo";
        img.removeAttribute("width");
        img.removeAttribute("height");
        return img;
    }

    function originalRowClick(row) {
        row.dispatchEvent(
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );
    }

    function sortArrow(header) {
        if (!header) return "";

        if (
            header.classList.contains("sort-down") ||
            header.classList.contains("sort-desc")
        ) {
            return " ▼";
        }

        if (
            header.classList.contains("sort-up") ||
            header.classList.contains("sort-asc")
        ) {
            return " ▲";
        }

        return "";
    }

    function render() {
        const view = document.querySelector("#teams-view");
        const table = view ? view.querySelector(".teams-table") : null;
        const tbody = view ? view.querySelector("#teams-table-body") : null;
        const list = document.querySelector("#percera-mobile-teams-list");

        if (!table || !tbody || !list) return;

        const teamHeader = table.querySelector("thead th:first-child");
        const ctsiHeader = table.querySelector("#teams-ctsi-header");

        const fragment = document.createDocumentFragment();

        const toolbar = document.createElement("div");
        toolbar.className = "percera-mobile-teams-toolbar";

        const label = document.createElement("span");
        label.className = "percera-mobile-teams-toolbar-label";
        label.textContent = "Team directory";

        const sortWrap = document.createElement("div");
        sortWrap.className = "percera-mobile-teams-sort";

        const teamSort = document.createElement("button");
        teamSort.type = "button";
        teamSort.className = "percera-mobile-team-sort-button";
        teamSort.textContent = "Team" + sortArrow(teamHeader);

        const ctsiSort = document.createElement("button");
        ctsiSort.type = "button";
        ctsiSort.className = "percera-mobile-team-sort-button";
        ctsiSort.textContent = "CTSI" + sortArrow(ctsiHeader);

        if (teamHeader && teamHeader.classList.contains("sort-active")) {
            teamSort.classList.add("active");
        }

        if (ctsiHeader && ctsiHeader.classList.contains("sort-active")) {
            ctsiSort.classList.add("active");
        }

        teamSort.addEventListener("click", event => {
            event.stopPropagation();
            if (teamHeader) teamHeader.click();
        });

        ctsiSort.addEventListener("click", event => {
            event.stopPropagation();
            if (ctsiHeader) ctsiHeader.click();
        });

        sortWrap.append(teamSort, ctsiSort);
        toolbar.append(label, sortWrap);
        fragment.appendChild(toolbar);

        Array.from(tbody.querySelectorAll(".team-directory-row")).forEach(row => {
            const cells = row.children;

            if (cells.length < 4) return;

            const teamCell = cells[0];
            const conference = clean(cells[1]?.textContent);
            const record = clean(cells[2]?.textContent);

            const nextName = clean(
                cells[3]?.querySelector(".team-next-name")?.textContent ||
                cells[3]?.textContent
            );

            const nextWeek = clean(
                cells[3]?.querySelector(".team-next-week")?.textContent
            );

            const ctsiCell =
                row.querySelector(".teams-ctsi-cell") ||
                cells[cells.length - 1];

            const ctsiRank = clean(
                ctsiCell?.querySelector(".teams-ctsi-rank")?.textContent
            );

            const ctsiValue = clean(
                ctsiCell?.querySelector(".teams-ctsi-value")?.textContent ||
                ctsiCell?.textContent
            );

            const provisional = Boolean(
                ctsiCell?.querySelector(".teams-ctsi-provisional")
            );

            const teamName = clean(
                teamCell.querySelector("strong")?.textContent ||
                row.dataset.team
            );

            const card = document.createElement("div");
            card.className = "percera-mobile-team-row";

            const main = document.createElement("div");
            main.className = "percera-mobile-team-main";

            const copy = document.createElement("div");
            copy.className = "percera-mobile-team-copy";

            const name = document.createElement("div");
            name.className = "percera-mobile-team-name";

            const logo = cloneLogo(teamCell);
            if (logo) name.appendChild(logo);

            const nameText = document.createElement("span");
            nameText.textContent = teamName;
            name.appendChild(nameText);

            const meta = document.createElement("div");
            meta.className = "percera-mobile-team-meta";
            meta.textContent = [conference, record].filter(Boolean).join(" · ");

            const next = document.createElement("div");
            next.className = "percera-mobile-team-next";

            let nextText = nextName && nextName !== "—"
                ? "Next: " + nextName
                : "Next: —";

            if (nextWeek) {
                nextText += " · " + nextWeek;
            }

            next.textContent = nextText;

            copy.append(name, meta, next);

            const ctsi = document.createElement("div");
            ctsi.className = "percera-mobile-team-ctsi";

            const rank = document.createElement("span");
            rank.className = "percera-mobile-team-rank";
            rank.textContent = provisional ? "Provisional" : (ctsiRank || "");

            const value = document.createElement("strong");
            value.className = "percera-mobile-team-value";
            value.textContent = ctsiValue || "—";

            const ctsiLabel = document.createElement("span");
            ctsiLabel.className = "percera-mobile-team-ctsi-label";
            ctsiLabel.textContent = "CTSI";

            ctsi.append(rank, value, ctsiLabel);

            if (provisional) {
                const prov = document.createElement("span");
                prov.className = "percera-mobile-team-prov";
                prov.textContent = "PROV.";
                ctsi.appendChild(prov);
            }

            main.append(copy, ctsi);

            main.addEventListener("click", () => {
                originalRowClick(row);
            });

            card.appendChild(main);
            fragment.appendChild(card);
        });

        list.replaceChildren(fragment);
    }

    function init() {
        const view = document.querySelector("#teams-view");
        const table = view ? view.querySelector(".teams-table") : null;
        const wrap = table ? table.closest(".teams-table-wrap") : null;
        const tbody = view ? view.querySelector("#teams-table-body") : null;

        if (!view || !table || !wrap || !tbody) return false;

        wrap.classList.add("percera-mobile-teams-source");

        let list = document.querySelector("#percera-mobile-teams-list");

        if (!list) {
            list = document.createElement("div");
            list.id = "percera-mobile-teams-list";
            list.className = "percera-mobile-teams-list";
            wrap.insertAdjacentElement("afterend", list);
        }

        if (!initialized) {
            initialized = true;

            tbodyObserver = new MutationObserver(() => {
                render();
            });

            tbodyObserver.observe(tbody, {
                childList: true,
                subtree: true
            });

            document.addEventListener("input", event => {
                if (event.target.closest("#teams-view")) {
                    setTimeout(render, 30);
                }
            }, true);

            document.addEventListener("change", event => {
                if (event.target.closest("#teams-view")) {
                    setTimeout(render, 30);
                }
            }, true);
        }

        render();
        return true;
    }

    let tries = 0;

    const boot = setInterval(() => {
        tries += 1;

        if (init() || tries >= 30) {
            clearInterval(boot);
        }
    }, 100);

    setTimeout(init, 500);
    setTimeout(init, 1200);
})();
