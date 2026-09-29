
(() => {
    "use strict";

    if (window.innerWidth > 860) return;

    const MAX_PREVIEW_LOGOS = 6;

    function tierNumber(tier) {
        const label = tier.querySelector(".ctsi-tier-label strong");
        return label ? String(label.textContent || "").trim() : "";
    }

    function makePreviewLogo(card) {
        const img = card.querySelector(".ctsi-hierarchy-team-logo");

        if (img) {
            const clone = img.cloneNode(true);
            clone.className = "percera-mobile-tier-logo";
            clone.removeAttribute("width");
            clone.removeAttribute("height");
            return clone;
        }

        const fallback = card.querySelector(
            ".ctsi-hierarchy-team-logo-fallback"
        );

        if (fallback) {
            const clone = document.createElement("span");
            clone.className = "percera-mobile-tier-logo-fallback";
            clone.textContent = String(
                fallback.textContent || ""
            ).trim();
            return clone;
        }

        return null;
    }

    function closeOtherTiers(current) {
        document
            .querySelectorAll(".ctsi-tier.percera-mobile-tier-ready.open")
            .forEach(tier => {
                if (tier !== current) {
                    tier.classList.remove("open");

                    const button = tier.querySelector(
                        ".percera-mobile-tier-toggle"
                    );

                    if (button) {
                        button.setAttribute("aria-expanded", "false");
                    }
                }
            });
    }

    function decorateTier(tier) {
        if (tier.dataset.mobileAccordionReady === "1") return;

        const teams = tier.querySelector(".ctsi-tier-teams");
        if (!teams) return;

        const cards = Array.from(
            teams.querySelectorAll(".ctsi-hierarchy-team")
        );

        if (!cards.length) return;

        const number = tierNumber(tier);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "percera-mobile-tier-toggle";
        button.setAttribute("aria-expanded", "false");

        const numberWrap = document.createElement("div");
        numberWrap.className = "percera-mobile-tier-number";
        numberWrap.innerHTML = `
            <span>TIER</span>
            <strong>${number}</strong>
        `;

        const summary = document.createElement("div");
        summary.className = "percera-mobile-tier-summary";

        const count = document.createElement("div");
        count.className = "percera-mobile-tier-count";
        count.textContent =
            cards.length === 1
                ? "1 TEAM"
                : `${cards.length} TEAMS`;

        const logos = document.createElement("div");
        logos.className = "percera-mobile-tier-logos";

        cards
            .slice(0, MAX_PREVIEW_LOGOS)
            .forEach(card => {
                const logo = makePreviewLogo(card);
                if (logo) logos.appendChild(logo);
            });

        if (cards.length > MAX_PREVIEW_LOGOS) {
            const more = document.createElement("span");
            more.className = "percera-mobile-tier-more";
            more.textContent = `+${cards.length - MAX_PREVIEW_LOGOS}`;
            logos.appendChild(more);
        }

        summary.append(count, logos);

        const chevron = document.createElement("span");
        chevron.className = "percera-mobile-tier-chevron";
        chevron.setAttribute("aria-hidden", "true");

        button.append(numberWrap, summary, chevron);

        button.addEventListener("click", () => {
            const opening = !tier.classList.contains("open");

            closeOtherTiers(tier);

            tier.classList.toggle("open", opening);

            button.setAttribute(
                "aria-expanded",
                opening ? "true" : "false"
            );

            if (opening) {
                tier.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }
        });

        tier.insertBefore(button, teams);

        tier.classList.add("percera-mobile-tier-ready");
        tier.dataset.mobileAccordionReady = "1";
    }

    function apply() {
        document
            .querySelectorAll(".ctsi-hierarchy .ctsi-tier")
            .forEach(decorateTier);
    }

    apply();

    const observer = new MutationObserver(() => {
        apply();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    setTimeout(apply, 300);
    setTimeout(apply, 900);
})();
