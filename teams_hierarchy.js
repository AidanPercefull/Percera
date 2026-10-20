
/* ==========================================================
   PERCERA — CTSI TEAM HIERARCHY
   2026 THROUGH WEEK 7

   Production presentation layer.
   CTSI methodology is unchanged.
   ========================================================== */

(() => {

    "use strict";


    const hierarchy =
[{"tier": 1, "teams": [{"rank": 1, "team": "Notre Dame", "rating": 22.031569395504494, "games": 7, "previous_tier": 1, "history_text": "Stayed in Tier 1", "history_class": "same-tier"}]}, {"tier": 2, "teams": [{"rank": 2, "team": "Miami", "rating": 19.209178716661896, "games": 5, "previous_tier": 2, "history_text": "Stayed in Tier 2", "history_class": "same-tier"}, {"rank": 3, "team": "Alabama", "rating": 19.13591736509857, "games": 7, "previous_tier": 1, "history_text": "Previous tier: 1", "history_class": "moved-down"}, {"rank": 4, "team": "LSU", "rating": 18.971442746708703, "games": 6, "previous_tier": 5, "history_text": "Previous tier: 5", "history_class": "moved-up"}, {"rank": 5, "team": "Ohio State", "rating": 18.489416453799212, "games": 7, "previous_tier": 3, "history_text": "Previous tier: 3", "history_class": "moved-up"}]}, {"tier": 3, "teams": [{"rank": 6, "team": "Indiana", "rating": 16.99029755510996, "games": 6, "previous_tier": 4, "history_text": "Previous tier: 4", "history_class": "moved-up"}, {"rank": 7, "team": "Georgia", "rating": 15.427870897931838, "games": 6, "previous_tier": 3, "history_text": "Stayed in Tier 3", "history_class": "same-tier"}]}, {"tier": 4, "teams": [{"rank": 8, "team": "UCLA", "rating": 14.136894606662299, "games": 6, "previous_tier": 5, "history_text": "Previous tier: 5", "history_class": "moved-up"}, {"rank": 9, "team": "Boise State", "rating": 13.678094431621442, "games": 5, "previous_tier": 5, "history_text": "Previous tier: 5", "history_class": "moved-up"}, {"rank": 10, "team": "Nebraska", "rating": 13.53697889133858, "games": 6, "previous_tier": 5, "history_text": "Previous tier: 5", "history_class": "moved-up"}, {"rank": 11, "team": "Utah", "rating": 13.273802395626841, "games": 5, "previous_tier": 4, "history_text": "Stayed in Tier 4", "history_class": "same-tier"}, {"rank": 12, "team": "Wake Forest", "rating": 12.828693600235475, "games": 7, "previous_tier": 7, "history_text": "Previous tier: 7", "history_class": "moved-up"}, {"rank": 13, "team": "Houston", "rating": 12.569171899792096, "games": 6, "previous_tier": 5, "history_text": "Previous tier: 5", "history_class": "moved-up"}, {"rank": 14, "team": "BYU", "rating": 12.561812493878099, "games": 5, "previous_tier": 6, "history_text": "Previous tier: 6", "history_class": "moved-up"}, {"rank": 15, "team": "Tennessee", "rating": 12.389957612798113, "games": 6, "previous_tier": null, "history_text": "New to hierarchy", "history_class": "new-tier"}]}, {"tier": 5, "teams": [{"rank": 16, "team": "Ole Miss", "rating": 12.203863158882932, "games": 6, "previous_tier": null, "history_text": "New to hierarchy", "history_class": "new-tier"}, {"rank": 17, "team": "Northwestern", "rating": 12.16006547501959, "games": 5, "previous_tier": 6, "history_text": "Previous tier: 6", "history_class": "moved-up"}, {"rank": 18, "team": "Texas Tech", "rating": 11.895834131179015, "games": 5, "previous_tier": 6, "history_text": "Previous tier: 6", "history_class": "moved-up"}, {"rank": 19, "team": "Texas", "rating": 11.598029633153676, "games": 6, "previous_tier": 6, "history_text": "Previous tier: 6", "history_class": "moved-up"}, {"rank": 20, "team": "Kentucky", "rating": 10.681101965235023, "games": 6, "previous_tier": 7, "history_text": "Previous tier: 7", "history_class": "moved-up"}, {"rank": 21, "team": "Wisconsin", "rating": 10.539563423798185, "games": 5, "previous_tier": 6, "history_text": "Previous tier: 6", "history_class": "moved-up"}]}, {"tier": 6, "teams": [{"rank": 22, "team": "Florida", "rating": 9.798966695568424, "games": 6, "previous_tier": null, "history_text": "New to hierarchy", "history_class": "new-tier"}, {"rank": 23, "team": "Oregon", "rating": 9.510311913191797, "games": 5, "previous_tier": 7, "history_text": "Previous tier: 7", "history_class": "moved-up"}, {"rank": 24, "team": "Arizona", "rating": 9.455781532623085, "games": 5, "previous_tier": 7, "history_text": "Previous tier: 7", "history_class": "moved-up"}, {"rank": 25, "team": "USC", "rating": 9.340536954150732, "games": 7, "previous_tier": null, "history_text": "New to hierarchy", "history_class": "new-tier"}]}];

    const hierarchyTeamCount =
28;


    const sameTierProbability =
        55;


    const teamPages =
        window.PERCERA_TEAM_PAGES
        ||
        {};



    // ========================================================
    // STYLES
    // ========================================================

    function installStyles() {

        if (
            document.getElementById(
                "percera-ctsi-hierarchy-styles"
            )
        ) {

            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "percera-ctsi-hierarchy-styles";


        style.textContent = `

            /* ==============================================
               TEAMS HERO
               ============================================== */

            #teams-directory
            .teams-hero {

                align-items:
                    center !important;

                padding-top:
                    18px;

                padding-bottom:
                    30px !important;
            }


            #teams-directory
            .teams-hero h1 {

                margin-bottom:
                    10px !important;

                color:
                    #0B1F3B;

                font-size:
                    clamp(
                        48px,
                        5vw,
                        70px
                    ) !important;

                line-height:
                    1;

                letter-spacing:
                    -.055em;
            }


            #teams-directory
            .teams-hero p {

                max-width:
                    720px !important;

                font-size:
                    15px !important;

                line-height:
                    1.55 !important;
            }


            .ctsi-hero-label {

                display:
                    block;

                margin-top:
                    8px;

                color:
                    #C48B28;

                font-size:
                    10px;

                font-weight:
                    850;

                letter-spacing:
                    .13em;

                text-transform:
                    uppercase;
            }



            /* ==============================================
               HIERARCHY HEADER
               ============================================== */

            .ctsi-hierarchy {

                margin:
                    34px
                    0
                    46px;
            }


            .ctsi-hierarchy-head {

                display:
                    grid;

                grid-template-columns:
                    minmax(
                        0,
                        1fr
                    )
                    minmax(
                        300px,
                        430px
                    );

                gap:
                    36px;

                align-items:
                    end;

                margin-bottom:
                    22px;
            }


            .ctsi-hierarchy-kicker {

                color:
                    #174A9C;

                font-size:
                    9px;

                font-weight:
                    850;

                letter-spacing:
                    .13em;

                text-transform:
                    uppercase;
            }


            .ctsi-hierarchy-head h2 {

                margin:
                    7px
                    0
                    8px;

                color:
                    #0B1F3B;

                font-size:
                    clamp(
                        31px,
                        3.4vw,
                        45px
                    );

                line-height:
                    1;

                letter-spacing:
                    -.045em;
            }


            .ctsi-hierarchy-head p {

                max-width:
                    710px;

                margin:
                    0;

                color:
                    #687487;

                font-size:
                    13px;

                line-height:
                    1.6;
            }


            .ctsi-hierarchy-explainer {

                padding:
                    17px
                    19px;

                border:
                    1px
                    solid
                    rgba(
                        196,
                        139,
                        40,
                        .30
                    );

                border-radius:
                    7px;

                background:
                    linear-gradient(
                        135deg,
                        rgba(
                            196,
                            139,
                            40,
                            .08
                        ),
                        rgba(
                            255,
                            255,
                            255,
                            .72
                        )
                    );

                color:
                    #5f6978;

                font-size:
                    11px;

                line-height:
                    1.55;
            }


            .ctsi-hierarchy-explainer strong {

                display:
                    block;

                margin-bottom:
                    4px;

                color:
                    #0B1F3B;

                font-size:
                    9px;

                font-weight:
                    850;

                letter-spacing:
                    .10em;

                text-transform:
                    uppercase;
            }



            /* ==============================================
               TIER STACK
               ============================================== */

            .ctsi-tier-stack {

                display:
                    flex;

                flex-direction:
                    column;

                gap:
                    10px;
            }


            .ctsi-tier {

                position:
                    relative;

                display:
                    grid;

                grid-template-columns:
                    96px
                    minmax(
                        0,
                        1fr
                    );

                overflow:
                    hidden;

                border:
                    1px
                    solid
                    #d9d5ce;

                border-radius:
                    8px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        .77
                    );

                box-shadow:
                    0
                    7px
                    24px
                    rgba(
                        11,
                        31,
                        59,
                        .035
                    );
            }


            .ctsi-tier:first-child {

                border-color:
                    rgba(
                        196,
                        139,
                        40,
                        .65
                    );

                box-shadow:
                    0
                    9px
                    30px
                    rgba(
                        196,
                        139,
                        40,
                        .10
                    );
            }


            .ctsi-tier-label {

                display:
                    flex;

                flex-direction:
                    column;

                justify-content:
                    center;

                padding:
                    18px
                    16px;

                background:
                    linear-gradient(
                        135deg,
                        rgba(
                            196,
                            139,
                            40,
                            .11
                        ),
                        rgba(
                            196,
                            139,
                            40,
                            .035
                        )
                    );

                border-right:
                    1px
                    solid
                    #dedad2;
            }


            .ctsi-tier-label span {

                color:
                    #9e6d16;

                font-size:
                    9px;

                font-weight:
                    850;

                letter-spacing:
                    .14em;

                text-transform:
                    uppercase;
            }


            .ctsi-tier-label strong {

                margin-top:
                    4px;

                color:
                    #C48B28;

                font-size:
                    27px;

                font-weight:
                    850;

                line-height:
                    1;
            }


            .ctsi-tier-teams {

                display:
                    grid;

                grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(
                            175px,
                            1fr
                        )
                    );

                align-items:
                    stretch;
            }



            /* ==============================================
               TEAM TILE
               ============================================== */

            .ctsi-hierarchy-team {

                display:
                    grid;

                grid-template-columns:
                    44px
                    minmax(
                        0,
                        1fr
                    );

                column-gap:
                    9px;

                align-items:
                    center;

                min-width:
                    0;

                min-height:
                    108px;

                padding:
                    14px
                    13px;

                border:
                    0;

                border-right:
                    1px
                    solid
                    rgba(
                        220,
                        217,
                        210,
                        .72
                    );

                background:
                    transparent;

                text-align:
                    left;

                cursor:
                    pointer;

                transition:
                    background
                    .13s
                    ease,
                    transform
                    .13s
                    ease;
            }


            .ctsi-hierarchy-team:hover {

                z-index:
                    2;

                background:
                    rgba(
                        11,
                        31,
                        59,
                        .035
                    );

                transform:
                    translateY(
                        -1px
                    );
            }


            .ctsi-hierarchy-team:focus-visible {

                z-index:
                    3;

                outline:
                    2px
                    solid
                    #C48B28;

                outline-offset:
                    -2px;
            }


            .ctsi-hierarchy-team-logo {

                width:
                    40px;

                height:
                    40px;

                object-fit:
                    contain;
            }


            .ctsi-hierarchy-team-logo-fallback {

                width:
                    40px;

                height:
                    40px;

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                border-radius:
                    50%;

                background:
                    #f0eee9;

                color:
                    #8490a0;

                font-size:
                    9px;

                font-weight:
                    800;
            }


            .ctsi-hierarchy-team-main {

                width:
                    100%;

                min-width:
                    0;
            }



            /* ==============================================
               RANK ABOVE TEAM NAME
               ============================================== */

            .ctsi-hierarchy-team-heading {

                display:
                    flex;

                flex-direction:
                    column;

                align-items:
                    flex-start;

                gap:
                    4px;

                width:
                    100%;

                min-width:
                    0;
            }


            .ctsi-hierarchy-rank {

                display:
                    inline-flex;

                align-items:
                    center;

                justify-content:
                    center;

                min-width:
                    25px;

                padding:
                    2px
                    5px;

                border-radius:
                    3px;

                background:
                    rgba(
                        23,
                        74,
                        156,
                        .08
                    );

                color:
                    #50627b;

                font-size:
                    10px;

                font-weight:
                    850;

                line-height:
                    1.1;

                white-space:
                    nowrap;
            }


            .ctsi-hierarchy-team-name {

                display:
                    block;

                width:
                    100%;

                min-width:
                    0;

                overflow:
                    visible;

                color:
                    #0B1F3B;

                font-size:
                    14px;

                font-weight:
                    850;

                line-height:
                    1.12;

                white-space:
                    normal;

                text-overflow:
                    clip;

                word-break:
                    normal;

                overflow-wrap:
                    normal;
            }



            /* ==============================================
               CTSI
               ============================================== */

            .ctsi-hierarchy-team-bottom {

                display:
                    flex;

                align-items:
                    baseline;

                justify-content:
                    flex-start;

                gap:
                    6px;

                width:
                    100%;

                margin-top:
                    8px;
            }


            .ctsi-hierarchy-rating {

                color:
                    #C48B28;

                font-size:
                    20px;

                font-weight:
                    900;

                line-height:
                    1;

                letter-spacing:
                    -.035em;
            }


            .ctsi-hierarchy-unit {

                color:
                    #687487;

                font-size:
                    9px;

                font-weight:
                    850;

                line-height:
                    1;

                letter-spacing:
                    .08em;

                text-transform:
                    uppercase;
            }



            /* ==============================================
               TIER HISTORY
               ============================================== */

            .ctsi-hierarchy-history {

                display:
                    block;

                margin-top:
                    7px;

                color:
                    #7b8695;

                font-size:
                    10px;

                font-weight:
                    700;

                line-height:
                    1.18;
            }


            .ctsi-hierarchy-history.moved-up {

                color:
                    #26714f;
            }


            .ctsi-hierarchy-history.moved-down {

                color:
                    #a34d4d;
            }



            /* ==============================================
               FULL DIRECTORY TRANSITION
               ============================================== */

            .ctsi-directory-heading {

                display:
                    flex;

                align-items:
                    center;

                gap:
                    14px;

                margin:
                    3px
                    0
                    16px;
            }


            .ctsi-directory-heading strong {

                color:
                    #0B1F3B;

                font-size:
                    22px;

                letter-spacing:
                    -.025em;
            }


            .ctsi-directory-heading span {

                flex:
                    1;

                height:
                    1px;

                background:
                    #dedad2;
            }


            .teams-controls {

                margin-top:
                    0 !important;
            }


            .teams-table-wrap {

                overflow:
                    hidden;

                border-radius:
                    8px;

                box-shadow:
                    0
                    6px
                    20px
                    rgba(
                        11,
                        31,
                        59,
                        .025
                    );
            }



            /* ==============================================
               RESPONSIVE
               ============================================== */

            @media (
                max-width:
                900px
            ) {

                .ctsi-hierarchy-head {

                    grid-template-columns:
                        1fr;
                }


                .ctsi-tier-teams {

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(
                                0,
                                1fr
                            )
                        );
                }

            }


            @media (
                max-width:
                600px
            ) {

                .ctsi-tier {

                    display:
                        block;
                }


                .ctsi-tier-label {

                    flex-direction:
                        row;

                    justify-content:
                        flex-start;

                    align-items:
                        center;

                    gap:
                        10px;

                    border-right:
                        0;

                    border-bottom:
                        1px
                        solid
                        #dedad2;
                }


                .ctsi-tier-label strong {

                    margin-top:
                        0;
                }


                .ctsi-tier-teams {

                    grid-template-columns:
                        1fr;
                }


                .ctsi-hierarchy-team {

                    grid-template-columns:
                        48px
                        minmax(
                            0,
                            1fr
                        );

                    min-height:
                        90px;
                }

            }

        `;


        document.head.appendChild(
            style
        );
    }



    // ========================================================
    // HELPERS
    // ========================================================

    function escapeHtml(
        value
    ) {

        return String(
            value ?? ""
        )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
    }


    function signed(
        value
    ) {

        const n =
            Number(
                value
            );


        if (
            !Number.isFinite(
                n
            )
        ) {

            return "—";
        }


        return (
            n > 0
            ?
            `+${n.toFixed(2)}`
            :
            n.toFixed(2)
        );
    }


    function logoForTeam(
        teamName
    ) {

        const team =
            teamPages[
                teamName
            ];


        if (!team) {

            return "";
        }


        return (
            team.logo
            ||
            team.primary_logo
            ||
            ""
        );
    }



    // ========================================================
    // OPEN EXISTING TEAM PROFILE
    // ========================================================

    function openTeam(
        teamName
    ) {

        const rows =
            Array.from(
                document.querySelectorAll(
                    "#teams-table-body tr"
                )
            );


        const match =
            rows.find(
                row => {

                    const firstCell =
                        row.querySelector(
                            "td"
                        );


                    if (!firstCell) {

                        return false;
                    }


                    const rowName =
                        firstCell
                        .textContent
                        .replace(
                            /\s+/g,
                            " "
                        )
                        .trim()
                        .toLowerCase();


                    return (
                        rowName
                        ===
                        teamName
                        .trim()
                        .toLowerCase()
                    );
                }
            );


        if (match) {

            match.click();
        }
    }



    // ========================================================
    // BUILD
    // ========================================================

    function buildHierarchy() {

        const directory =
            document.getElementById(
                "teams-directory"
            );


        if (!directory) {

            return false;
        }


        if (
            directory.querySelector(
                ".ctsi-hierarchy"
            )
        ) {

            return true;
        }


        const controls =
            directory.querySelector(
                ".teams-controls"
            );


        if (!controls) {

            return false;
        }


        // ----------------------------------------------------
        // Hero
        // ----------------------------------------------------

        const hero =
            directory.querySelector(
                ".teams-hero"
            );


        if (hero) {

            const kicker =
                hero.querySelector(
                    ".teams-kicker"
                );


            const title =
                hero.querySelector(
                    "h1"
                );


            const copy =
                hero.querySelector(
                    "p"
                );


            if (kicker) {

                kicker.textContent =
                    "2026 · THROUGH WEEK 5";
            }


            if (title) {

                title.textContent =
                    "Team Strength";
            }


            if (copy) {

                copy.innerHTML = `
                    CTSI estimates team strength on a
                    neutral-field point scale. The hierarchy
                    groups teams whose modeled strength is
                    meaningfully similar.

                    <span
                        class="ctsi-hero-label"
                    >
                        Rating first. Rank second.
                    </span>
                `;
            }
        }


        // ----------------------------------------------------
        // Tier HTML
        // ----------------------------------------------------

        const tierHtml =
            hierarchy
            .map(
                tier => {

                    const teamHtml =
                        tier
                        .teams
                        .map(
                            team => {

                                const logo =
                                    logoForTeam(
                                        team.team
                                    );


                                const logoHtml =
                                    logo
                                    ?
                                    `
                                        <img
                                            class="
                                                ctsi-hierarchy-team-logo
                                            "
                                            src="${
                                                escapeHtml(
                                                    logo
                                                )
                                            }"
                                            alt=""
                                        >
                                    `
                                    :
                                    `
                                        <div
                                            class="
                                                ctsi-hierarchy-team-logo-fallback
                                            "
                                        >
                                            ${
                                                escapeHtml(
                                                    team.team
                                                    .slice(
                                                        0,
                                                        2
                                                    )
                                                    .toUpperCase()
                                                )
                                            }
                                        </div>
                                    `;


                                return `
                                    <button
                                        type="button"
                                        class="
                                            ctsi-hierarchy-team
                                        "
                                        data-hierarchy-team="${
                                            escapeHtml(
                                                team.team
                                            )
                                        }"
                                    >

                                        ${logoHtml}


                                        <div
                                            class="
                                                ctsi-hierarchy-team-main
                                            "
                                        >

                                            <div
                                                class="
                                                    ctsi-hierarchy-team-heading
                                                "
                                            >

                                                <span
                                                    class="
                                                        ctsi-hierarchy-rank
                                                    "
                                                >
                                                    #${team.rank}
                                                </span>


                                                <span
                                                    class="
                                                        ctsi-hierarchy-team-name
                                                    "
                                                >
                                                    ${
                                                        escapeHtml(
                                                            team.team
                                                        )
                                                    }
                                                </span>

                                            </div>


                                            <div
                                                class="
                                                    ctsi-hierarchy-team-bottom
                                                "
                                            >

                                                <span
                                                    class="
                                                        ctsi-hierarchy-rating
                                                    "
                                                >
                                                    ${
                                                        signed(
                                                            team.rating
                                                        )
                                                    }
                                                </span>


                                                <span
                                                    class="
                                                        ctsi-hierarchy-unit
                                                    "
                                                >
                                                    CTSI
                                                </span>

                                            </div>


                                            <span
                                                class="
                                                    ctsi-hierarchy-history
                                                    ${
                                                        escapeHtml(
                                                            team.history_class
                                                        )
                                                    }
                                                "
                                            >
                                                ${
                                                    escapeHtml(
                                                        team.history_text
                                                    )
                                                }
                                            </span>

                                        </div>

                                    </button>
                                `;
                            }
                        )
                        .join("");


                    return `
                        <div
                            class="
                                ctsi-tier
                                ctsi-tier-${tier.tier}
                            "
                        >

                            <div
                                class="
                                    ctsi-tier-label
                                "
                            >

                                <span>
                                    TIER
                                </span>

                                <strong>
                                    ${tier.tier}
                                </strong>

                            </div>


                            <div
                                class="
                                    ctsi-tier-teams
                                "
                            >
                                ${teamHtml}
                            </div>

                        </div>
                    `;
                }
            )
            .join("");


        // ----------------------------------------------------
        // Section
        // ----------------------------------------------------

        const section =
            document.createElement(
                "section"
            );


        section.className =
            "ctsi-hierarchy";


        section.innerHTML = `

            <div
                class="ctsi-hierarchy-head"
            >

                <div>

                    <span
                        class="ctsi-hierarchy-kicker"
                    >
                        CTSI HIERARCHY
                    </span>


                    <h2>
                        Who has separated?
                    </h2>


                    <p>
                        ${hierarchyTeamCount} teams currently
                        make the hierarchy. Teams within a tier
                        are treated as broadly comparable rather
                        than meaningfully separated by rank.
                    </p>

                </div>


                <div
                    class="ctsi-hierarchy-explainer"
                >

                    <strong>
                        HOW TO READ IT
                    </strong>

                    CTSI is a continuous strength estimate,
                    not a poll. A tier can span only enough
                    rating distance for its strongest team to
                    remain at or below a
                    ${sameTierProbability}% modeled
                    neutral-field win probability against its
                    weakest team.

                </div>

            </div>


            <div
                class="ctsi-tier-stack"
            >
                ${tierHtml}
            </div>

        `;


        directory.insertBefore(
            section,
            controls
        );


        // ----------------------------------------------------
        // Full directory heading
        // ----------------------------------------------------

        const directoryHeading =
            document.createElement(
                "div"
            );


        directoryHeading.className =
            "ctsi-directory-heading";


        directoryHeading.innerHTML = `

            <strong>
                All FBS Teams
            </strong>

            <span></span>

        `;


        directory.insertBefore(
            directoryHeading,
            controls
        );


        // ----------------------------------------------------
        // Existing team-profile navigation
        // ----------------------------------------------------

        section
            .querySelectorAll(
                "[data-hierarchy-team]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            openTeam(
                                button.dataset.hierarchyTeam
                            );
                        }
                    );
                }
            );


        return true;
    }



    // ========================================================
    // INITIALIZE
    //
    // teams.js builds the Teams view dynamically.
    // ========================================================

    function init() {

        installStyles();


        let attempts =
            0;


        const timer =
            setInterval(
                () => {

                    attempts += 1;


                    if (
                        buildHierarchy()
                        ||
                        attempts > 120
                    ) {

                        clearInterval(
                            timer
                        );
                    }

                },
                50
            );
    }


    if (
        document.readyState
        ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else {

        init();
    }

})();
