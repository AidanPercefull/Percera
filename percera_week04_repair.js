
/* ==========================================================
   PERCERA WEEK 4 FRONTEND REPAIR
   ========================================================== */

(() => {

    "use strict";


    /* ------------------------------------------------------
       HELPERS
       ------------------------------------------------------ */

    function playerContainer() {

        return document.getElementById(
            "player-content"
        );
    }


    function currentPlayer() {

        const container =
            playerContainer();


        if (!container) {
            return null;
        }


        const heading =
            container.querySelector(
                "h1"
            );


        if (!heading) {
            return null;
        }


        const name =
            heading.textContent
            .trim();


        const players =
            window.CQI_PLAYERS
            ||
            window.QPI_PLAYERS
            ||
            {};


        return (
            Object.values(players)
            .find(
                player =>
                    player
                    &&
                    (
                        player.name
                        ||
                        player.player
                    )
                    ===
                    name
            )
            ||
            null
        );
    }


    /* ------------------------------------------------------
       REMOVE PLAYER RANK / TREND GRAPH COMPLETELY
       ------------------------------------------------------ */

    function removeTrendGraph() {

        const container =
            playerContainer();


        if (!container) {
            return;
        }


        [
            "#player-trend",
            "#cqi-trend",
            ".player-trend",
            ".cqi-trend",
            ".rank-trend",
            ".rank-history",
            ".player-history",
            ".trend-chart",
            ".player-trend-section",
            ".cqi-trend-section"
        ]
        .forEach(
            selector => {

                container
                .querySelectorAll(
                    selector
                )
                .forEach(
                    element =>
                        element.remove()
                );
            }
        );


        /*
         * Fallback for the existing weekly-history renderer:
         * locate sections by their heading text.
         */

        const headings =
            Array.from(
                container.querySelectorAll(
                    "h2, h3, h4"
                )
            );


        headings.forEach(
            heading => {

                const text =
                    heading.textContent
                    .trim()
                    .toLowerCase();


                const isTrend =
                    (
                        text.includes(
                            "trend"
                        )
                        ||
                        text.includes(
                            "rank history"
                        )
                        ||
                        text.includes(
                            "weekly history"
                        )
                    )
                    &&
                    (
                        text.includes(
                            "cqi"
                        )
                        ||
                        text.includes(
                            "rank"
                        )
                        ||
                        text.includes(
                            "history"
                        )
                    );


                if (!isTrend) {
                    return;
                }


                const section =
                    heading.closest(
                        "section"
                    )
                    ||
                    heading.closest(
                        ".profile-section"
                    )
                    ||
                    heading.parentElement;


                if (
                    section
                    &&
                    section !== container
                ) {

                    section.remove();
                }
            }
        );
    }


    /* ------------------------------------------------------
       EXACTLY ONE PLAYER TEAM CARD
       ------------------------------------------------------ */

    function removeDuplicateTeamCards() {

        const container =
            playerContainer();


        if (!container) {
            return;
        }


        const cards =
            Array.from(
                container.querySelectorAll(
                    ".percera-team-card"
                )
            );


        cards.forEach(
            card =>
                card.remove()
        );
    }


    function renderTeamCard() {

        const container =
            playerContainer();


        if (!container) {
            return;
        }


        const player =
            currentPlayer();


        if (
            !player
            ||
            !player.team
        ) {
            return;
        }


        const teamPages =
            window.PERCERA_TEAM_PAGES
            ||
            {};


        const team =
            teamPages[
                player.team
            ];


        if (!team) {
            return;
        }


        /*
         * Remove every old copy FIRST.
         * This makes the renderer fully idempotent.
         */

        removeDuplicateTeamCards();


        const card =
            document.createElement(
                "section"
            );


        card.className =
            "percera-team-card";


        card.style.setProperty(
            "--team-card-color",
            (
                player.team_color
                ||
                "#0B1F3B"
            )
        );


        const logo =
            team.logo
            ||
            player.team_logo
            ||
            "";


        const nextOpponent =
            team.next_opponent
            ?
            `${
                team.next_location
                ||
                ""
            } ${
                team.next_opponent
            }`.trim()
            :
            "—";


        const nextWeek =
            team.next_week
            ?
            `Week ${team.next_week}`
            :
            "";


        card.innerHTML = `

            <div
                class="team-card-header"
            >

                ${
                    logo
                    ?
                    `
                        <img
                            class="team-card-logo"
                            src="${logo}"
                            alt="${player.team}"
                        >
                    `
                    :
                    ""
                }


                <div
                    class="team-card-identity"
                >

                    <h3>
                        ${player.team}
                    </h3>

                    <span>
                        ${team.conference || ""}
                    </span>

                </div>

            </div>


            <div
                class="team-card-facts"
            >

                <div
                    class="team-card-fact"
                >

                    <span>
                        RECORD
                    </span>

                    <strong>
                        ${team.record || "—"}
                    </strong>

                </div>


                <div
                    class="team-card-fact"
                >

                    <span>
                        NEXT OPPONENT
                    </span>

                    <strong>
                        ${nextOpponent}
                    </strong>

                    ${
                        nextWeek
                        ?
                        `
                            <small>
                                ${nextWeek}
                            </small>
                        `
                        :
                        ""
                    }

                </div>

            </div>
        `;


        container.appendChild(
            card
        );
    }


    /* ------------------------------------------------------
       TEAM-PAGE NAVIGATION ESCAPE
       ------------------------------------------------------ */

    document.addEventListener(

        "click",

        event => {

            const button =
                event.target.closest(
                    ".nav-button"
                );


            if (!button) {
                return;
            }


            const view =
                button.dataset.view;


            if (
                view ===
                "teams"
            ) {
                return;
            }


            const teamsView =
                document.getElementById(
                    "teams-view"
                );


            const teamDetail =
                document.getElementById(
                    "team-detail"
                );


            if (teamsView) {

                teamsView.classList.add(
                    "hidden"
                );
            }


            if (teamDetail) {

                teamDetail.classList.add(
                    "hidden"
                );
            }

        },

        true
    );


    /* ------------------------------------------------------
       MASTER REPAIR
       ------------------------------------------------------ */

    let scheduled =
        false;


    function repair() {

        if (scheduled) {
            return;
        }


        scheduled =
            true;


        requestAnimationFrame(
            () => {

                scheduled =
                    false;


                removeTrendGraph();


                const container =
                    playerContainer();


                if (
                    container
                    &&
                    !container.closest(
                        ".hidden"
                    )
                ) {

                    renderTeamCard();
                }
            }
        );
    }


    const observer =
        new MutationObserver(
            repair
        );


    observer.observe(
        document.body,
        {
            childList:
                true,

            subtree:
                true
        }
    );


    document.addEventListener(
        "DOMContentLoaded",
        repair
    );


    window.addEventListener(
        "hashchange",
        repair
    );


    repair();

})();


/* ==========================================================
   END PERCERA WEEK 4 FRONTEND REPAIR
   ========================================================== */
