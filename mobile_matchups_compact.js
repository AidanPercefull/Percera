
(() => {
    "use strict";

    if (window.innerWidth > 860) return;


    /* ======================================================
       MODEL STRIP ACCORDION
       ====================================================== */

    function setupModelBox() {
        const strip =
            document.querySelector(".model-strip") ||
            document.querySelector(".definition");

        if (!strip) return;

        if (strip.closest(".percera-mobile-model-box")) return;

        const box = document.createElement("div");
        box.className = "percera-mobile-model-box";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "percera-mobile-model-toggle";
        button.setAttribute("aria-expanded", "false");

        button.innerHTML = `
            <div>
                <small>MODEL NOTES</small>
                <strong>How Percera Edge works</strong>
            </div>

            <span
                class="percera-mobile-chevron"
                aria-hidden="true"
            ></span>
        `;

        strip.parentNode.insertBefore(box, strip);

        box.appendChild(button);
        box.appendChild(strip);

        button.addEventListener("click", () => {
            const open = box.classList.toggle("open");

            button.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );
        });
    }


    /* ======================================================
       RELIABILITY ACCORDION
       ====================================================== */

    function setupReliability() {
        const section =
            document.querySelector("section.reliability");

        if (!section) return;

        if (section.classList.contains("percera-mobile-rel-ready")) {
            return;
        }

        const intro =
            section.querySelector(".rel-intro") ||
            section.querySelector(".reliability-intro");

        const stats =
            Array.from(
                section.querySelectorAll(".rel-stat")
            );

        let winner = "—";
        let median = "—";

        stats.forEach(stat => {
            const label =
                String(
                    stat.querySelector("span")?.textContent || ""
                )
                .trim()
                .toLowerCase();

            const value =
                String(
                    stat.querySelector("strong")?.textContent || ""
                )
                .trim();

            if (label.includes("winner")) {
                winner = value;
            }

            if (label.includes("median")) {
                median = value;
            }
        });

        const title =
            String(
                intro?.querySelector("strong")?.textContent ||
                "Historical reliability"
            )
            .replace(/\s+/g, " ")
            .trim();

        const summary =
            document.createElement("button");

        summary.type = "button";
        summary.className = "percera-mobile-rel-summary";

        summary.setAttribute(
            "aria-expanded",
            "false"
        );

        summary.innerHTML = `
            <div class="percera-mobile-rel-title">

                <small>
                    RELIABILITY
                </small>

                <strong>
                    ${title}
                </strong>

            </div>


            <div class="percera-mobile-rel-stat">

                <span>
                    Winner
                </span>

                <strong>
                    ${winner}
                </strong>

            </div>


            <div class="percera-mobile-rel-stat">

                <span>
                    Median
                </span>

                <strong>
                    ${median}
                </strong>

            </div>
        `;

        section.insertBefore(
            summary,
            section.firstChild
        );

        section.classList.add(
            "percera-mobile-rel-ready"
        );

        summary.addEventListener(
            "click",
            () => {

                const open =
                    section.classList.toggle(
                        "open"
                    );

                summary.setAttribute(
                    "aria-expanded",
                    open ? "true" : "false"
                );
            }
        );
    }


    /* ======================================================
       ONLY ONE MATCHUP EXPANDED
       ====================================================== */

    function closeOtherGames(clickedCard) {

        document
            .querySelectorAll(".game.expanded")
            .forEach(card => {

                if (card !== clickedCard) {
                    card.classList.remove("expanded");
                }
            });
    }


    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(".game-main");

            if (!button) return;

            const card =
                button.closest(".game");

            if (!card) return;

            setTimeout(
                () => {
                    if (card.classList.contains("expanded")) {
                        closeOtherGames(card);
                    }
                },
                0
            );
        }
    );


    /* ======================================================
       INIT
       ====================================================== */

    setupModelBox();
    setupReliability();

})();
