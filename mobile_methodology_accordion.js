
(() => {

    "use strict";


    if (
        window.innerWidth
        >
        860
    ) {
        return;
    }


    function closeSiblings(
        section
    ) {

        const panel =
            section.closest(
                ".percera-method-panel"
            );


        if (
            !panel
        ) {
            return;
        }


        panel
        .querySelectorAll(
            ".percera-mobile-method-section.open"
        )
        .forEach(
            other => {

                if (
                    other
                    !==
                    section
                ) {

                    other
                    .classList
                    .remove(
                        "open"
                    );


                    const heading =
                        other
                        .querySelector(
                            ":scope > h3"
                        );


                    if (
                        heading
                    ) {

                        heading
                        .setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                }
            }
        );
    }


    function decorateSection(
        section,
        index
    ) {

        if (
            section
            .dataset
            .mobileMethodReady
            ===
            "1"
        ) {
            return;
        }


        const heading =
            section
            .querySelector(
                ":scope > h3"
            );


        if (
            !heading
        ) {
            return;
        }


        const body =
            document
            .createElement(
                "div"
            );


        body.className =
            "percera-mobile-method-body";


        Array
        .from(
            section.childNodes
        )
        .forEach(
            node => {

                if (
                    node
                    !==
                    heading
                ) {

                    body
                    .appendChild(
                        node
                    );
                }
            }
        );


        section
        .appendChild(
            body
        );


        section
        .classList
        .add(
            "percera-mobile-method-section"
        );


        const open =
            index
            ===
            0;


        section
        .classList
        .toggle(
            "open",
            open
        );


        heading
        .setAttribute(
            "role",
            "button"
        );


        heading
        .setAttribute(
            "tabindex",
            "0"
        );


        heading
        .setAttribute(
            "aria-expanded",
            open
                ?
                "true"
                :
                "false"
        );


        function toggle() {

            const opening =
                !section
                .classList
                .contains(
                    "open"
                );


            if (
                opening
            ) {

                closeSiblings(
                    section
                );
            }


            section
            .classList
            .toggle(
                "open",
                opening
            );


            heading
            .setAttribute(
                "aria-expanded",
                opening
                    ?
                    "true"
                    :
                    "false"
            );
        }


        heading
        .addEventListener(
            "click",
            toggle
        );


        heading
        .addEventListener(
            "keydown",
            event => {

                if (
                    event.key
                    ===
                    "Enter"
                    ||
                    event.key
                    ===
                    " "
                ) {

                    event
                    .preventDefault();


                    toggle();
                }
            }
        );


        section
        .dataset
        .mobileMethodReady =
            "1";
    }


    function decoratePanel(
        panel
    ) {

        const sections =
            Array
            .from(
                panel
                .querySelectorAll(
                    ":scope > .method-section"
                )
            );


        sections
        .forEach(
            (
                section,
                index
            ) => {

                decorateSection(
                    section,
                    index
                );
            }
        );
    }


    function apply() {

        document
        .querySelectorAll(
            ".percera-method-panel"
        )
        .forEach(
            decoratePanel
        );
    }


    apply();


    const observer =
        new MutationObserver(
            apply
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


    document
    .addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".percera-method-tab"
                )
            ) {

                setTimeout(
                    apply,
                    20
                );
            }
        },
        true
    );


    setTimeout(
        apply,
        300
    );


    setTimeout(
        apply,
        900
    );

})();
