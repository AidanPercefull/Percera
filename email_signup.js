
/* ==========================================================
   PERCERA WEEKLY
   Popup + permanent homepage signup
   ========================================================== */

(() => {

    "use strict";


    const FORM_ID =
        "f07d6f5d-fcdc-4fe8-bd01-724686d4ff3c";


    const SEEN_KEY =
        "percera_weekly_seen_until";


    const SUPPRESS_DAYS =
        7;


    const POPUP_DELAY =
        4000;


    let popup =
        null;


    let popupOpened =
        false;


    let forcedPreview =
        false;



    // ========================================================
    // HELPERS
    // ========================================================

    function setSeen() {

        try {

            const duration =
                SUPPRESS_DAYS
                *
                24
                *
                60
                *
                60
                *
                1000;


            localStorage.setItem(
                SEEN_KEY,
                String(
                    Date.now()
                    +
                    duration
                )
            );

        }

        catch (error) {

            // Storage being unavailable must never
            // break the website.
        }
    }



    function alreadySeen() {

        if (forcedPreview) {

            return false;
        }


        try {

            const until =
                Number(
                    localStorage.getItem(
                        SEEN_KEY
                    )
                );


            return (
                Number.isFinite(
                    until
                )
                &&
                Date.now()
                <
                until
            );

        }

        catch (error) {

            return false;
        }
    }



    function readPreviewFlag() {

        const url =
            new URL(
                window.location.href
            );


        forcedPreview =
            (
                url.searchParams.get(
                    "signup"
                )
                ===
                "1"
            );


        if (forcedPreview) {

            /*
             * Strip the testing flag immediately so normal
             * navigation cannot carry it to Matchups.
             */

            url.searchParams.delete(
                "signup"
            );


            window.history.replaceState(
                {},
                "",
                url.pathname
                +
                url.search
                +
                url.hash
            );
        }
    }



    function addBeehiivForm(
        container
    ) {

        if (
            !container
            ||
            container.dataset.beehiivLoaded
        ) {

            return;
        }


        container.dataset.beehiivLoaded =
            "true";


        const script =
            document.createElement(
                "script"
            );


        script.async =
            true;


        script.src =
            "https://subscribe-forms.beehiiv.com/v3/loader.js";


        script.setAttribute(
            "data-beehiiv-form",
            FORM_ID
        );


        container.appendChild(
            script
        );
    }



    // ========================================================
    // STYLES
    // ========================================================

    function installStyles() {

        if (
            document.getElementById(
                "percera-weekly-styles"
            )
        ) {

            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "percera-weekly-styles";


        style.textContent = `

            /* ==============================================
               SHARED
               ============================================== */

            .percera-weekly-form iframe {

                width:
                    100% !important;

                max-width:
                    100% !important;

                border:
                    0 !important;
            }



            /* ==============================================
               POPUP
               ============================================== */

            html.percera-weekly-open {

                overflow:
                    hidden;
            }


            .percera-weekly-overlay {

                position:
                    fixed;

                inset:
                    0;

                z-index:
                    999999;

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                padding:
                    24px;

                background:
                    rgba(
                        5,
                        20,
                        40,
                        0.60
                    );

                backdrop-filter:
                    blur(
                        5px
                    );

                -webkit-backdrop-filter:
                    blur(
                        5px
                    );

                opacity:
                    0;

                visibility:
                    hidden;

                transition:
                    opacity
                    180ms
                    ease,
                    visibility
                    180ms
                    ease;
            }


            .percera-weekly-overlay.is-visible {

                opacity:
                    1;

                visibility:
                    visible;
            }


            .percera-weekly-modal {

                position:
                    relative;

                width:
                    min(
                        100%,
                        620px
                    );

                overflow:
                    hidden;

                background:
                    #fbfaf6;

                border:
                    1px
                    solid
                    rgba(
                        7,
                        31,
                        61,
                        0.14
                    );

                border-radius:
                    8px;

                box-shadow:
                    0
                    30px
                    90px
                    rgba(
                        2,
                        15,
                        32,
                        0.32
                    );

                transform:
                    translateY(
                        14px
                    )
                    scale(
                        0.985
                    );

                transition:
                    transform
                    200ms
                    ease;
            }


            .percera-weekly-overlay.is-visible
            .percera-weekly-modal {

                transform:
                    translateY(
                        0
                    )
                    scale(
                        1
                    );
            }


            .percera-weekly-modal::before {

                content:
                    "";

                position:
                    absolute;

                top:
                    0;

                left:
                    0;

                right:
                    0;

                height:
                    4px;

                background:
                    #d49a2e;
            }


            .percera-weekly-watermark {

                position:
                    absolute;

                right:
                    -20px;

                top:
                    54px;

                color:
                    rgba(
                        7,
                        31,
                        61,
                        0.035
                    );

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    76px;

                font-weight:
                    900;

                letter-spacing:
                    -5px;

                pointer-events:
                    none;

                user-select:
                    none;
            }


            .percera-weekly-close {

                position:
                    absolute;

                top:
                    17px;

                right:
                    17px;

                z-index:
                    5;

                width:
                    35px;

                height:
                    35px;

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                padding:
                    0;

                border:
                    0;

                border-radius:
                    50%;

                background:
                    rgba(
                        7,
                        31,
                        61,
                        0.055
                    );

                color:
                    #071f3d;

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    23px;

                cursor:
                    pointer;
            }


            .percera-weekly-close:hover {

                background:
                    rgba(
                        7,
                        31,
                        61,
                        0.11
                    );
            }


            .percera-weekly-modal-content {

                position:
                    relative;

                z-index:
                    2;

                padding:
                    48px
                    48px
                    40px;
            }


            .percera-weekly-rule {

                width:
                    42px;

                height:
                    2px;

                margin-bottom:
                    18px;

                background:
                    #d49a2e;
            }


            .percera-weekly-kicker {

                margin-bottom:
                    13px;

                color:
                    #0752b5;

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    11px;

                font-weight:
                    800;

                letter-spacing:
                    1.8px;

                text-transform:
                    uppercase;
            }


            .percera-weekly-title {

                max-width:
                    500px;

                margin:
                    0
                    0
                    15px;

                color:
                    #071f3d;

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    clamp(
                        36px,
                        5vw,
                        50px
                    );

                font-weight:
                    700;

                line-height:
                    0.99;

                letter-spacing:
                    -1.7px;
            }


            .percera-weekly-copy {

                max-width:
                    510px;

                margin:
                    0
                    0
                    24px;

                color:
                    #54647a;

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    15px;

                line-height:
                    1.62;
            }


            .percera-weekly-popup-form {

                width:
                    100%;

                min-height:
                    80px;
            }


            .percera-weekly-note {

                margin-top:
                    12px;

                color:
                    #818b99;

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    11px;

                line-height:
                    1.45;
            }



            /* ==============================================
               PERMANENT HOMEPAGE SIGNUP
               ============================================== */

            #home-view
            .percera-weekly-inline {

                position:
                    relative;

                overflow:
                    hidden;

                margin:
                    0
                    auto;

                padding:
                    clamp(
                        36px,
                        4vw,
                        54px
                    );

                width:
                    100%;

                box-sizing:
                    border-box;

                background:
                    #0b2749;

                border-top:
                    3px
                    solid
                    #d49a2e;

                border-radius:
                    7px;

                box-shadow:
                    0
                    14px
                    40px
                    rgba(
                        4,
                        20,
                        40,
                        0.10
                    );

                color:
                    white;
            }


            #home-view
            .percera-weekly-inline::after {

                content:
                    "PERCERA";

                position:
                    absolute;

                right:
                    -30px;

                top:
                    -18px;

                color:
                    rgba(
                        255,
                        255,
                        255,
                        0.035
                    );

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    clamp(
                        76px,
                        10vw,
                        145px
                    );

                font-weight:
                    900;

                letter-spacing:
                    -7px;

                pointer-events:
                    none;
            }


            #home-view
            .percera-weekly-inline-grid {

                position:
                    relative;

                z-index:
                    2;

                display:
                    grid;

                grid-template-columns:
                    minmax(
                        0,
                        1fr
                    )
                    minmax(
                        320px,
                        0.82fr
                    );

                gap:
                    52px;

                align-items:
                    center;
            }


            #home-view
            .percera-weekly-inline-kicker {

                margin-bottom:
                    10px;

                color:
                    #e4ad3e;

                font-size:
                    10px;

                font-weight:
                    800;

                letter-spacing:
                    1.7px;

                text-transform:
                    uppercase;
            }


            #home-view
            .percera-weekly-inline-title {

                margin:
                    0
                    0
                    10px;

                color:
                    #ffffff;

                font-family:
                    Georgia,
                    "Times New Roman",
                    serif;

                font-size:
                    clamp(
                        29px,
                        3vw,
                        40px
                    );

                line-height:
                    1.04;

                letter-spacing:
                    -1px;
            }


            #home-view
            .percera-weekly-inline-copy {

                max-width:
                    590px;

                margin:
                    0;

                color:
                    rgba(
                        255,
                        255,
                        255,
                        0.75
                    );

                font-size:
                    14px;

                line-height:
                    1.6;
            }


            #home-view
            .percera-weekly-inline-form {

                min-height:
                    80px;

                position:
                    relative;

                z-index:
                    2;
            }


            #home-view
            .percera-weekly-inline-note {

                position:
                    relative;

                z-index:
                    2;

                margin-top:
                    8px;

                color:
                    rgba(
                        255,
                        255,
                        255,
                        0.52
                    );

                font-size:
                    10px;

                letter-spacing:
                    0.2px;
            }



            /* ==============================================
               MOBILE
               ============================================== */

            @media (
                max-width:
                760px
            ) {

                .percera-weekly-overlay {

                    padding:
                        14px;
                }


                .percera-weekly-modal-content {

                    padding:
                        42px
                        23px
                        28px;
                }


                .percera-weekly-title {

                    font-size:
                        38px;

                    letter-spacing:
                        -1.1px;
                }


                .percera-weekly-copy {

                    font-size:
                        14px;
                }


                .percera-weekly-watermark {

                    display:
                        none;
                }


                #home-view
                .percera-weekly-inline {

                    padding:
                        32px
                        24px;
                }


                #home-view
                .percera-weekly-inline-grid {

                    grid-template-columns:
                        1fr;

                    gap:
                        24px;
                }


                #home-view
                .percera-weekly-inline::after {

                    display:
                        none;
                }
            }

        `;


        document.head.appendChild(
            style
        );
    }



    // ========================================================
    // PERMANENT HOMEPAGE BOX
    // ========================================================

    function installHomepageSignup() {

        const home =
            document.getElementById(
                "home-view"
            );


        if (!home) {

            return;
        }


        if (
            home.querySelector(
                "#percera-weekly-inline"
            )
        ) {

            return;
        }


        const section =
            document.createElement(
                "section"
            );


        section.id =
            "percera-weekly-inline";


        section.className =
            "percera-weekly-inline";


        section.innerHTML = `

            <div
                class="percera-weekly-inline-grid"
            >

                <div>

                    <div
                        class="percera-weekly-inline-kicker"
                    >
                        PERCERA WEEKLY
                    </div>


                    <h2
                        class="percera-weekly-inline-title"
                    >
                        Don't miss the next update.
                    </h2>


                    <p
                        class="percera-weekly-inline-copy"
                    >
                        CQI rankings, CTSI movement,
                        matchup projections and the numbers
                        worth knowing — delivered to your
                        inbox each week.
                    </p>

                </div>


                <div>

                    <div
                        id="percera-weekly-inline-form"
                        class="
                            percera-weekly-form
                            percera-weekly-inline-form
                        "
                    ></div>


                    <div
                        class="percera-weekly-inline-note"
                    >
                        Free. No spam.
                        Unsubscribe anytime.
                    </div>

                </div>

            </div>
        `;


        home.appendChild(
            section
        );


        addBeehiivForm(
            section.querySelector(
                "#percera-weekly-inline-form"
            )
        );
    }



    // ========================================================
    // POPUP
    // ========================================================

    function closePopup() {

        if (!popup) {

            return;
        }


        popup.classList.remove(
            "is-visible"
        );


        document.documentElement
            .classList.remove(
                "percera-weekly-open"
            );


        const oldPopup =
            popup;


        popup =
            null;


        setTimeout(
            () => {

                oldPopup.remove();

            },
            220
        );
    }



    function buildPopup() {

        popup =
            document.createElement(
                "div"
            );


        popup.className =
            "percera-weekly-overlay";


        popup.setAttribute(
            "role",
            "dialog"
        );


        popup.setAttribute(
            "aria-modal",
            "true"
        );


        popup.setAttribute(
            "aria-label",
            "Join Percera Weekly"
        );


        popup.innerHTML = `

            <div
                class="percera-weekly-modal"
            >

                <div
                    class="percera-weekly-watermark"
                    aria-hidden="true"
                >
                    PERCERA
                </div>


                <button
                    type="button"
                    class="percera-weekly-close"
                    aria-label="Close"
                >
                    ×
                </button>


                <div
                    class="percera-weekly-modal-content"
                >

                    <div
                        class="percera-weekly-rule"
                    ></div>


                    <div
                        class="percera-weekly-kicker"
                    >
                        PERCERA WEEKLY
                    </div>


                    <h2
                        class="percera-weekly-title"
                    >
                        College football,
                        in context.
                    </h2>


                    <p
                        class="percera-weekly-copy"
                    >
                        Get CQI rankings, CTSI movement,
                        matchup projections and the numbers
                        worth knowing each week.
                    </p>


                    <div
                        id="percera-weekly-popup-form"
                        class="
                            percera-weekly-form
                            percera-weekly-popup-form
                        "
                    ></div>


                    <div
                        class="percera-weekly-note"
                    >
                        Free. No spam.
                        Unsubscribe anytime.
                    </div>

                </div>

            </div>
        `;


        document.body.appendChild(
            popup
        );


        popup
            .querySelector(
                ".percera-weekly-close"
            )
            .addEventListener(
                "click",
                closePopup
            );


        popup.addEventListener(
            "click",
            event => {

                if (
                    event.target
                    ===
                    popup
                ) {

                    closePopup();
                }
            }
        );


        addBeehiivForm(
            popup.querySelector(
                "#percera-weekly-popup-form"
            )
        );
    }



    function openPopup() {

        if (
            popupOpened
            ||
            (
                !forcedPreview
                &&
                alreadySeen()
            )
        ) {

            return;
        }


        popupOpened =
            true;


        /*
         * Record this IMMEDIATELY.
         *
         * localStorage is shared by index.html and
         * matchups.html because they use the same domain.
         *
         * Therefore Matchups will not reopen the popup.
         */

        setSeen();


        buildPopup();


        document.documentElement
            .classList.add(
                "percera-weekly-open"
            );


        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        if (popup) {

                            popup.classList.add(
                                "is-visible"
                            );
                        }
                    }
                );
            }
        );
    }



    // ========================================================
    // ESCAPE KEY
    // ========================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key
                ===
                "Escape"
                &&
                popup
            ) {

                closePopup();
            }
        }
    );



    // ========================================================
    // HOMEPAGE RE-RENDER PROTECTION
    //
    // Home is a JS view, so keep the permanent signup present
    // if the view is rebuilt.
    // ========================================================

    let inlineScheduled =
        false;


    function ensureInlineSignup() {

        if (inlineScheduled) {

            return;
        }


        inlineScheduled =
            true;


        requestAnimationFrame(
            () => {

                inlineScheduled =
                    false;

                installHomepageSignup();
            }
        );
    }


    const observer =
        new MutationObserver(
            ensureInlineSignup
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



    // ========================================================
    // START
    // ========================================================

    function start() {

        installStyles();

        readPreviewFlag();

        installHomepageSignup();


        if (
            !forcedPreview
            &&
            alreadySeen()
        ) {

            return;
        }


        setTimeout(
            openPopup,
            (
                forcedPreview
                ?
                250
                :
                POPUP_DELAY
            )
        );
    }


    if (
        document.readyState
        ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            start
        );

    }

    else {

        start();
    }

})();
