
(() => {

    "use strict";


    let scheduled = false;


    function removeWeeklyDescriptions() {

        let changed = false;


        document
        .querySelectorAll(
            ".player-explainer"
        )
        .forEach(
            node => {

                node.remove();

                changed = true;
            }
        );


        /*
         * Fallback for any older renderer that does not use
         * .player-explainer.
         */

        document
        .querySelectorAll(
            "#player-content h2, "
            +
            "#player-content h3, "
            +
            "#player-content h4"
        )
        .forEach(
            heading => {

                const text =
                    String(
                        heading.textContent
                        ||
                        ""
                    )
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim()
                    .toLowerCase();


                if (
                    !text.includes(
                        "why cqi ranks"
                    )
                ) {
                    return;
                }


                const container =
                    heading.closest(
                        ".player-explainer"
                    )
                    ||
                    heading.closest(
                        "section"
                    )
                    ||
                    heading.parentElement;


                if (
                    container
                    &&
                    container.id
                    !==
                    "player-content"
                    &&
                    container.isConnected
                ) {

                    container.remove();

                    changed = true;
                }
            }
        );


        return changed;
    }


    function apply() {

        scheduled = false;

        removeWeeklyDescriptions();
    }


    function scheduleApply() {

        if (
            scheduled
        ) {
            return;
        }


        scheduled = true;


        requestAnimationFrame(
            () => {

                apply();
            }
        );
    }


    apply();


    const observer =
        new MutationObserver(
            () => {

                scheduleApply();
            }
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
        "click",
        () => {

            setTimeout(
                scheduleApply,
                20
            );
        },
        true
    );

})();
