
(() => {
    "use strict";

    if (window.innerWidth > 860) return;


    function clean(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
    }


    function findDirectoryRow(teamName) {
        return Array.from(
            document.querySelectorAll("#teams-table-body .team-directory-row")
        ).find(row => {
            return clean(row.dataset.team).toLowerCase() ===
                   clean(teamName).toLowerCase();
        }) || null;
    }


    function logoForTeam(teamName) {
        const row = findDirectoryRow(teamName);

        const source = row
            ? row.querySelector(".team-directory-name img")
            : null;

        if (!source) return null;

        const img = source.cloneNode(true);
        img.removeAttribute("width");
        img.removeAttribute("height");

        return img;
    }


    function ctsiForTeam(teamName) {
        const row = findDirectoryRow(teamName);
        const cell = row ? row.querySelector(".teams-ctsi-cell") : null;

        if (!cell) {
            return {
                value: "—",
                rank: "",
                provisional: false
            };
        }

        return {
            value: clean(
                cell.querySelector(".teams-ctsi-value")?.textContent ||
                cell.textContent
            ),
            rank: clean(
                cell.querySelector(".teams-ctsi-rank")?.textContent
            ),
            provisional: Boolean(
                cell.querySelector(".teams-ctsi-provisional")
            )
        };
    }


    function normalizeOpponent(text) {
        return clean(text)
            .replace(/^@\s*/i, "")
            .replace(/^at\s+/i, "")
            .replace(/^vs\.?\s+/i, "")
            .replace(/^v\.?\s+/i, "")
            .trim();
    }


    function enhanceHero(detail) {
        const hero = detail.querySelector(".team-detail-hero");
        const brand = detail.querySelector(".team-detail-brand");

        if (!hero || !brand) return;

        if (hero.dataset.mobileHierarchyReady === "1") return;

        const teamName = clean(
            brand.querySelector("h1")?.textContent
        );

        if (!teamName) return;

        const facts = detail.querySelectorAll(
            ".team-detail-facts article"
        );

        const record = clean(
            facts[0]?.querySelector("strong")?.textContent ||
            "—"
        );

        const nextStrong = facts[1]?.querySelector(
            ".team-hero-next strong"
        );

        const nextSmall = facts[1]?.querySelector(
            ".team-hero-next small"
        );

        const opponentLogoSource = facts[1]?.querySelector(
            ".team-hero-next-logo"
        );

        const nextText = clean(
            nextStrong?.textContent
        );

        const week = clean(
            nextSmall?.textContent
        );

        const opponentName = normalizeOpponent(nextText);

        const locationSymbol = /^@/.test(nextText)
            ? "@"
            : "VS";

        const ctsi = ctsiForTeam(teamName);

        const stats = document.createElement("div");
        stats.className = "percera-mobile-team-hero-stats";

        const recordStat = document.createElement("div");
        recordStat.className = "percera-mobile-team-hero-stat";
        recordStat.innerHTML = `
            <span>Record</span>
            <strong>${record}</strong>
            <div class="percera-mobile-team-hero-sub">
                2026 season
            </div>
        `;

        const ctsiStat = document.createElement("div");
        ctsiStat.className = "percera-mobile-team-hero-stat";

        const ctsiSub = ctsi.provisional
            ? `
                <div class="percera-mobile-team-hero-sub">
                    <span class="percera-mobile-team-hero-prov">
                        PROV.
                    </span>
                </div>
            `
            : `
                <div class="percera-mobile-team-hero-sub">
                    ${ctsi.rank || "Neutral-field strength"}
                </div>
            `;

        ctsiStat.innerHTML = `
            <span>CTSI</span>
            <strong>${ctsi.value}</strong>
            ${ctsiSub}
        `;

        stats.append(recordStat, ctsiStat);
        hero.appendChild(stats);

        if (nextText && nextText !== "—") {
            const nextCard = document.createElement("section");
            nextCard.className = "percera-mobile-next-game";

            const currentLogo = brand.querySelector(
                ":scope > img:not(.team-detail-watermark)"
            );

            const currentLogoHTML = currentLogo
                ? `<img src="${currentLogo.src}" alt="">`
                : "";

            const opponentLogoHTML = opponentLogoSource
                ? `<img src="${opponentLogoSource.src}" alt="">`
                : "";

            nextCard.innerHTML = `
                <div class="percera-mobile-next-game-head">
                    <span>Next Game</span>
                    <strong>${week || ""}</strong>
                </div>

                <div class="percera-mobile-next-matchup">

                    <div class="percera-mobile-next-side">
                        ${currentLogoHTML}
                        <span>${teamName}</span>
                    </div>

                    <div class="percera-mobile-next-symbol">
                        ${locationSymbol}
                    </div>

                    <div class="percera-mobile-next-side">
                        ${opponentLogoHTML}
                        <span>${opponentName || nextText}</span>
                    </div>

                </div>
            `;

            hero.insertAdjacentElement(
                "afterend",
                nextCard
            );
        }

        hero.dataset.mobileHierarchyReady = "1";
    }


    function addScheduleLogos(detail) {
        detail.querySelectorAll(".team-game-row").forEach(row => {
            if (row.dataset.mobileLogoReady === "1") return;

            const opponentWrap = row.querySelector(
                ".team-game-opponent"
            );

            const opponentStrong = opponentWrap
                ? opponentWrap.querySelector("strong")
                : null;

            if (!opponentWrap || !opponentStrong) return;

            const opponentText = clean(
                opponentStrong.textContent
            );

            const opponentName = normalizeOpponent(
                opponentText
            );

            const logo = logoForTeam(opponentName);

            if (logo) {
                logo.className = "percera-mobile-game-logo";

                opponentWrap.insertBefore(
                    logo,
                    opponentStrong
                );
            }

            row.dataset.mobileLogoReady = "1";
        });
    }


    function enhance() {
        const detail = document.querySelector("#team-detail");

        if (!detail || detail.classList.contains("hidden")) return;

        enhanceHero(detail);
        addScheduleLogos(detail);
    }


    const observer = new MutationObserver(() => {
        setTimeout(enhance, 20);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    document.addEventListener(
        "click",
        () => setTimeout(enhance, 30),
        true
    );

    setTimeout(enhance, 300);
    setTimeout(enhance, 900);
})();
