
(() => {

    "use strict";


    if (
        window.innerWidth
        >
        860
    ) {
        return;
    }


    const table =
        document
        .querySelector(
            "#leaderboard"
        );


    if (
        !table
    ) {
        return;
    }


    // ========================================================
    // HELPERS
    // ========================================================

    function clean(value) {

        return String(
            value
            ||
            ""
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();
    }


    function low(value) {

        return clean(
            value
        )
        .toLowerCase();
    }


    function headers() {

        return Array
        .from(
            table
            .querySelectorAll(
                "thead th"
            )
        )
        .map(
            th =>
                clean(
                    th.textContent
                )
        );
    }


    function findIndex(
        names,
        headerList
    ) {

        for (
            let i = 0;
            i < headerList.length;
            i += 1
        ) {

            const h =
                low(
                    headerList[
                        i
                    ]
                );


            if (
                names.some(
                    name =>
                        name(
                            h
                        )
                )
            ) {
                return i;
            }
        }


        return -1;
    }


    function visibleRows() {

        return Array
        .from(
            table
            .querySelectorAll(
                "tbody tr"
            )
        )
        .filter(
            row => {

                const style =
                    getComputedStyle(
                        row
                    );


                return (
                    !row.hidden
                    &&
                    !row
                    .classList
                    .contains(
                        "hidden"
                    )
                    &&
                    style.display
                    !==
                    "none"
                    &&
                    style.visibility
                    !==
                    "hidden"
                );
            }
        );
    }


    function activateOriginalRow(
        row
    ) {

        const link =
            row
            .querySelector(
                "a[href]"
            );


        if (
            link
        ) {

            link.click();

            return;
        }


        const button =
            row
            .querySelector(
                "button,[role='button']"
            );


        if (
            button
        ) {

            button.click();

            return;
        }


        row.dispatchEvent(
            new MouseEvent(
                "click",
                {
                    bubbles:
                        true,

                    cancelable:
                        true,

                    view:
                        window
                }
            )
        );
    }


    function cloneLogo(
        cell
    ) {

        if (
            !cell
        ) {
            return null;
        }


        const source =
            cell
            .querySelector(
                "img"
            );


        if (
            !source
        ) {
            return null;
        }


        const img =
            source
            .cloneNode(
                true
            );


        img.className =
            "percera-mobile-qb-logo";


        img.removeAttribute(
            "width"
        );


        img.removeAttribute(
            "height"
        );


        return img;
    }


    // ========================================================
    // HIDE ORIGINAL TABLE ON MOBILE
    // ========================================================

    const sourceWrap =
        table.closest(
            ".percera-table-scroll"
        )
        ||
        table.closest(
            ".table-wrap"
        )
        ||
        table.parentElement;


    sourceWrap
    .classList
    .add(
        "percera-mobile-qb-source"
    );


    // ========================================================
    // MOBILE LIST
    // ========================================================

    const list =
        document
        .createElement(
            "div"
        );


    list.className =
        "percera-mobile-qb-list";


    sourceWrap
    .insertAdjacentElement(
        "afterend",
        list
    );


    function render() {

        const hs =
            headers();


        const rankIndex =
            findIndex(
                [
                    h =>
                        h
                        ===
                        "rank"
                        ||
                        h.startsWith(
                            "rank "
                        )
                ],
                hs
            );


        const moveIndex =
            findIndex(
                [
                    h =>
                        h.includes(
                            "move"
                        )
                ],
                hs
            );


        const qbIndex =
            findIndex(
                [
                    h =>
                        h.includes(
                            "quarterback"
                        ),

                    h =>
                        h
                        ===
                        "qb",

                    h =>
                        h.includes(
                            "player"
                        )
                ],
                hs
            );


        const teamIndex =
            findIndex(
                [
                    h =>
                        h
                        ===
                        "team"
                        ||
                        h.startsWith(
                            "team "
                        )
                ],
                hs
            );


        const scoreIndex =
            findIndex(
                [
                    h =>
                        h.includes(
                            "cqi"
                        ),

                    h =>
                        h.includes(
                            "qpi"
                        )
                ],
                hs
            );


        const primary =
            new Set(
                [
                    rankIndex,
                    moveIndex,
                    qbIndex,
                    teamIndex,
                    scoreIndex
                ]
                .filter(
                    index =>
                        index
                        >=
                        0
                )
            );


        const fragment =
            document
            .createDocumentFragment();


        const note =
            document
            .createElement(
                "div"
            );


        note.className =
            "percera-mobile-qb-note";


        note.innerHTML =
            `
            <span>
                Full quarterback rankings
            </span>

            <span>
                Stats expands
            </span>
            `;


        fragment.appendChild(
            note
        );


        visibleRows()
        .forEach(
            row => {

                const cells =
                    Array
                    .from(
                        row.children
                    )
                    .map(
                        td =>
                            clean(
                                td.textContent
                            )
                    );


                const card =
                    document
                    .createElement(
                        "div"
                    );


                card.className =
                    "percera-mobile-qb-row";


                const main =
                    document
                    .createElement(
                        "div"
                    );


                main.className =
                    "percera-mobile-qb-main";


                // -----------------------------------------
                // RANK
                // -----------------------------------------

                const rank =
                    document
                    .createElement(
                        "div"
                    );


                rank.className =
                    "percera-mobile-qb-rank";


                rank.textContent =
                    rankIndex
                    >=
                    0
                        ?
                        cells[
                            rankIndex
                        ]
                        :
                        "";


                // -----------------------------------------
                // NAME + TEAM + MOVE
                // -----------------------------------------

                const copy =
                    document
                    .createElement(
                        "div"
                    );


                copy.className =
                    "percera-mobile-qb-copy";


                const name =
                    document
                    .createElement(
                        "div"
                    );


                name.className =
                    "percera-mobile-qb-name";


                const nameText =
                    document
                    .createElement(
                        "span"
                    );


                nameText.className =
                    "percera-mobile-qb-name-text";


                nameText.textContent =
                    qbIndex
                    >=
                    0
                        ?
                        cells[
                            qbIndex
                        ]
                        :
                        "";


                name.appendChild(
                    nameText
                );


                const moveText =
                    moveIndex
                    >=
                    0
                        ?
                        cells[
                            moveIndex
                        ]
                        :
                        "";


                if (
                    moveText
                ) {

                    const move =
                        document
                        .createElement(
                            "span"
                        );


                    move.className =
                        "percera-mobile-qb-move";


                    move.textContent =
                        moveText;


                    name.appendChild(
                        move
                    );
                }


                const team =
                    document
                    .createElement(
                        "div"
                    );


                team.className =
                    "percera-mobile-qb-team";


                const logo =
                    cloneLogo(
                        teamIndex
                        >=
                        0
                            ?
                            row.children[
                                teamIndex
                            ]
                            :
                            null
                    );


                if (
                    logo
                ) {

                    team.appendChild(
                        logo
                    );
                }


                const teamText =
                    document
                    .createElement(
                        "span"
                    );


                teamText.textContent =
                    teamIndex
                    >=
                    0
                        ?
                        cells[
                            teamIndex
                        ]
                        :
                        "";


                team.appendChild(
                    teamText
                );


                copy.appendChild(
                    name
                );


                copy.appendChild(
                    team
                );


                // -----------------------------------------
                // CQI
                // -----------------------------------------

                const score =
                    document
                    .createElement(
                        "div"
                    );


                score.className =
                    "percera-mobile-qb-score";


                score.innerHTML =
                    `
                    <strong>
                        ${
                            scoreIndex
                            >=
                            0
                                ?
                                cells[
                                    scoreIndex
                                ]
                                :
                                "—"
                        }
                    </strong>

                    <span>
                        CQI
                    </span>
                    `;


                main.appendChild(
                    rank
                );


                main.appendChild(
                    copy
                );


                main.appendChild(
                    score
                );


                // Tapping main row opens QB profile.

                main.addEventListener(
                    "click",
                    () => {

                        activateOriginalRow(
                            row
                        );
                    }
                );


                card.appendChild(
                    main
                );


                // -----------------------------------------
                // REMAINING TABLE COLUMNS
                // -----------------------------------------

                const extra =
                    [];


                hs.forEach(
                    (
                        header,
                        index
                    ) => {

                        if (
                            primary.has(
                                index
                            )
                        ) {
                            return;
                        }


                        if (
                            !cells[
                                index
                            ]
                        ) {
                            return;
                        }


                        extra.push(
                            {
                                label:
                                    header,

                                value:
                                    cells[
                                        index
                                    ]
                            }
                        );
                    }
                );


                if (
                    extra.length
                ) {

                    const actions =
                        document
                        .createElement(
                            "div"
                        );


                    actions.className =
                        "percera-mobile-qb-actions";


                    const toggle =
                        document
                        .createElement(
                            "button"
                        );


                    toggle.type =
                        "button";


                    toggle.className =
                        "percera-mobile-qb-toggle";


                    toggle.textContent =
                        "Stats +";


                    const details =
                        document
                        .createElement(
                            "div"
                        );


                    details.className =
                        "percera-mobile-qb-details";


                    extra.forEach(
                        item => {

                            const chip =
                                document
                                .createElement(
                                    "div"
                                );


                            chip.className =
                                "percera-mobile-qb-chip";


                            const label =
                                document
                                .createElement(
                                    "span"
                                );


                            label.textContent =
                                item.label;


                            const value =
                                document
                                .createElement(
                                    "strong"
                                );


                            value.textContent =
                                item.value;


                            chip.appendChild(
                                label
                            );


                            chip.appendChild(
                                value
                            );


                            details.appendChild(
                                chip
                            );
                        }
                    );


                    toggle.addEventListener(
                        "click",
                        event => {

                            event
                            .stopPropagation();


                            const open =
                                card
                                .classList
                                .toggle(
                                    "open"
                                );


                            toggle.textContent =
                                open
                                    ?
                                    "Stats −"
                                    :
                                    "Stats +";
                        }
                    );


                    actions.appendChild(
                        toggle
                    );


                    card.appendChild(
                        actions
                    );


                    card.appendChild(
                        details
                    );
                }


                fragment.appendChild(
                    card
                );
            }
        );


        list.replaceChildren(
            fragment
        );
    }


    // ========================================================
    // KEEP MOBILE VIEW IN SYNC WITH SEARCH / FILTER / SORT
    //
    // Observer only READS source table.
    // It never rearranges or modifies source rows.
    // ========================================================

    let renderTimer =
        null;


    function scheduleRender() {

        clearTimeout(
            renderTimer
        );


        renderTimer =
            setTimeout(
                render,
                60
            );
    }


    render();


    const tbody =
        table
        .querySelector(
            "tbody"
        );


    if (
        tbody
    ) {

        const observer =
            new MutationObserver(
                scheduleRender
            );


        observer.observe(
            tbody,
            {
                childList:
                    true,

                subtree:
                    true,

                attributes:
                    true,

                attributeFilter:
                    [
                        "class",
                        "style",
                        "hidden"
                    ]
            }
        );
    }


    document.addEventListener(
        "input",
        scheduleRender,
        true
    );


    document.addEventListener(
        "change",
        scheduleRender,
        true
    );


    document.addEventListener(
        "click",
        event => {

            if (
                event
                .target
                .closest(
                    ".percera-mobile-qb-list"
                )
            ) {
                return;
            }


            scheduleRender();

        },
        true
    );

})();
