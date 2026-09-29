
(() => {

    "use strict";


    const MOBILE_MAX = 860;


    if (
        window.innerWidth
        >
        MOBILE_MAX
    ) {
        return;
    }


    const NAV_ITEMS = [
        "Home",
        "Quarterbacks",
        "Teams",
        "Matchups",
        "Methodology"
    ];


    function cleanText(value) {

        return (
            value
            ||
            ""
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim()
        .toLowerCase();
    }


    function onMatchupsPage() {

        return (
            /matchups\.html/i
            .test(
                window
                .location
                .pathname
            )
        );
    }


    function closeMenu() {

        document
        .body
        .classList
        .remove(
            "percera-mobile-nav-open"
        );
    }


    function openMenu() {

        document
        .body
        .classList
        .add(
            "percera-mobile-nav-open"
        );
    }


    // ========================================================
    // FIND EXISTING DESKTOP HEADER
    // ========================================================

    function findDesktopHeader() {

        const candidates = [
            ...document
            .querySelectorAll(
                "header,.site-header,.topbar,.navbar,.nav-shell,.navigation,.site-nav,nav"
            )
        ];


        let best = null;
        let bestScore = 0;


        for (
            const element
            of candidates
        ) {

            const text =
                cleanText(
                    element
                    .innerText
                );


            let score = 0;


            for (
                const label
                of NAV_ITEMS
            ) {

                if (
                    text.includes(
                        cleanText(
                            label
                        )
                    )
                ) {
                    score += 1;
                }
            }


            if (
                score
                >
                bestScore
            ) {

                best =
                    element;

                bestScore =
                    score;
            }
        }


        if (
            best
            &&
            best.tagName
            ===
            "NAV"
        ) {

            best =
                best.closest(
                    "header"
                )
                ||
                best.parentElement
                ||
                best;
        }


        return best;
    }


    // ========================================================
    // FIND PERCERA LOGO
    // ========================================================

    function findWordmark(header) {

        let image =
            header
            ?
            header.querySelector(
                "img"
            )
            :
            null;


        if (
            !image
        ) {

            image = [
                ...document
                .querySelectorAll(
                    "img"
                )
            ]
            .find(
                candidate => {

                    const src =
                        (
                            candidate
                            .getAttribute(
                                "src"
                            )
                            ||
                            ""
                        )
                        .toLowerCase();


                    const alt =
                        (
                            candidate
                            .getAttribute(
                                "alt"
                            )
                            ||
                            ""
                        )
                        .toLowerCase();


                    return (
                        src.includes(
                            "percera"
                        )
                        ||
                        alt.includes(
                            "percera"
                        )
                    );
                }
            );
        }


        return image || null;
    }


    // ========================================================
    // MOBILE HEADER
    // ========================================================

    function createMobileHeader() {

        if (
            document
            .querySelector(
                ".percera-mobile-topbar"
            )
        ) {
            return;
        }


        const desktopHeader =
            findDesktopHeader();


        const wordmark =
            findWordmark(
                desktopHeader
            );


        const topbar =
            document
            .createElement(
                "div"
            );


        topbar.className =
            "percera-mobile-topbar";


        const brand =
            document
            .createElement(
                "div"
            );


        brand.className =
            "percera-mobile-brand";


        if (
            wordmark
        ) {

            const clone =
                wordmark
                .cloneNode(
                    true
                );


            clone.removeAttribute(
                "width"
            );


            clone.removeAttribute(
                "height"
            );


            brand.appendChild(
                clone
            );

        } else {

            const text =
                document
                .createElement(
                    "div"
                );


            text.className =
                "percera-mobile-brand-text";


            text.textContent =
                "PERCERA";


            brand.appendChild(
                text
            );
        }


        const button =
            document
            .createElement(
                "button"
            );


        button.className =
            "percera-mobile-menu-button";


        button.type =
            "button";


        button.setAttribute(
            "aria-label",
            "Open navigation"
        );


        button.innerHTML =
            '<span class="percera-mobile-menu-icon"></span>';


        button.addEventListener(
            "click",
            openMenu
        );


        topbar.appendChild(
            brand
        );


        topbar.appendChild(
            button
        );


        if (
            desktopHeader
            &&
            desktopHeader.parentNode
        ) {

            desktopHeader
            .classList
            .add(
                "percera-mobile-original-header"
            );


            desktopHeader
            .parentNode
            .insertBefore(
                topbar,
                desktopHeader
            );

        } else {

            document
            .body
            .insertBefore(
                topbar,
                document
                .body
                .firstChild
            );
        }
    }


    // ========================================================
    // FIND EXISTING SITE NAV CONTROL
    // ========================================================

    function findOriginalNavControl(label) {

        const wanted =
            cleanText(
                label
            );


        const controls = [
            ...document
            .querySelectorAll(
                "a,button,[role='button']"
            )
        ];


        let found =
            controls
            .find(
                control => {

                    if (
                        control
                        .closest(
                            ".percera-mobile-drawer"
                        )
                    ) {
                        return false;
                    }


                    return (
                        cleanText(
                            control
                            .innerText
                        )
                        ===
                        wanted
                    );
                }
            );


        if (
            found
        ) {
            return found;
        }


        found =
            controls
            .find(
                control => {

                    if (
                        control
                        .closest(
                            ".percera-mobile-drawer"
                        )
                    ) {
                        return false;
                    }


                    return (
                        cleanText(
                            control
                            .innerText
                        )
                        .includes(
                            wanted
                        )
                    );
                }
            );


        return found || null;
    }


    function activateIndexView(label) {

        const control =
            findOriginalNavControl(
                label
            );


        if (
            !control
        ) {
            return false;
        }


        control.click();

        closeMenu();

        return true;
    }


    // ========================================================
    // MOBILE ROUTING
    // ========================================================

    function goTo(label) {

        closeMenu();


        if (
            label
            ===
            "Matchups"
        ) {

            if (
                !onMatchupsPage()
            ) {

                window
                .location
                .href =
                    "matchups.html";
            }

            return;
        }


        const hashes = {

            Home:
                "home",

            Quarterbacks:
                "quarterbacks",

            Teams:
                "teams",

            Methodology:
                "methodology"
        };


        const hash =
            hashes[
                label
            ]
            ||
            "home";


        if (
            onMatchupsPage()
        ) {

            window
            .location
            .href =
                "index.html#"
                +
                hash;

            return;
        }


        if (
            activateIndexView(
                label
            )
        ) {

            history
            .replaceState(
                null,
                "",
                "#"
                +
                hash
            );

            return;
        }


        window
        .location
        .hash =
            hash;
    }


    // ========================================================
    // DRAWER
    // ========================================================

    function createDrawer() {

        if (
            document
            .querySelector(
                ".percera-mobile-drawer"
            )
        ) {
            return;
        }


        const backdrop =
            document
            .createElement(
                "div"
            );


        backdrop.className =
            "percera-mobile-backdrop";


        backdrop.addEventListener(
            "click",
            closeMenu
        );


        const drawer =
            document
            .createElement(
                "div"
            );


        drawer.className =
            "percera-mobile-drawer";


        drawer.innerHTML =
            `
            <div class="percera-mobile-drawer-head">

                <div class="percera-mobile-drawer-title">
                    Percera
                </div>

                <button
                    class="percera-mobile-close"
                    type="button"
                    aria-label="Close navigation"
                >
                    ×
                </button>

            </div>

            <div class="percera-mobile-links"></div>
            `;


        const links =
            drawer
            .querySelector(
                ".percera-mobile-links"
            );


        for (
            const label
            of NAV_ITEMS
        ) {

            const button =
                document
                .createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "percera-mobile-link";


            button.textContent =
                label;


            button.addEventListener(
                "click",
                () => goTo(
                    label
                )
            );


            links.appendChild(
                button
            );
        }


        drawer
        .querySelector(
            ".percera-mobile-close"
        )
        .addEventListener(
            "click",
            closeMenu
        );


        document
        .body
        .appendChild(
            backdrop
        );


        document
        .body
        .appendChild(
            drawer
        );


        document
        .addEventListener(
            "keydown",
            event => {

                if (
                    event.key
                    ===
                    "Escape"
                ) {

                    closeMenu();
                }
            }
        );
    }


    // ========================================================
    // TABLE WRAPPER
    // ========================================================

    function wrapTables() {

        document
        .querySelectorAll(
            "table"
        )
        .forEach(
            table => {

                if (
                    table
                    .closest(
                        ".percera-table-scroll"
                    )
                ) {
                    return;
                }


                const wrapper =
                    document
                    .createElement(
                        "div"
                    );


                wrapper.className =
                    "percera-table-scroll";


                const note =
                    document
                    .createElement(
                        "div"
                    );


                note.className =
                    "percera-table-scroll-note";


                note.textContent =
                    "Swipe to view full table";


                table
                .parentNode
                .insertBefore(
                    wrapper,
                    table
                );


                wrapper.appendChild(
                    note
                );


                wrapper.appendChild(
                    table
                );
            }
        );
    }


    // ========================================================
    // HANDLE HASH WHEN RETURNING FROM MATCHUPS
    // ========================================================

    function openHashView() {

        if (
            onMatchupsPage()
        ) {
            return;
        }


        const hash =
            window
            .location
            .hash
            .replace(
                "#",
                ""
            )
            .toLowerCase();


        if (
            !hash
        ) {
            return;
        }


        const map = {

            home:
                "Home",

            quarterbacks:
                "Quarterbacks",

            teams:
                "Teams",

            methodology:
                "Methodology"
        };


        const label =
            map[
                hash
            ];


        if (
            !label
        ) {
            return;
        }


        let tries = 0;


        const attempt =
            () => {

                tries += 1;


                if (
                    activateIndexView(
                        label
                    )
                ) {
                    return;
                }


                if (
                    tries
                    <
                    20
                ) {

                    setTimeout(
                        attempt,
                        100
                    );
                }
            };


        setTimeout(
            attempt,
            50
        );
    }


    // ========================================================
    // INIT
    // ========================================================

    function initialize() {

        createMobileHeader();

        createDrawer();

        wrapTables();

        openHashView();
    }


    if (
        document
        .readyState
        ===
        "loading"
    ) {

        document
        .addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();
    }

})();
