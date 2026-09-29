
(() => {

    "use strict";


    if (
        window.innerWidth
        >
        860
    ) {
        return;
    }


    function fixLimitedSamples() {

        document
        .querySelectorAll(
            ".percera-mobile-qb-row"
        )
        .forEach(
            row => {

                const name =
                    row.querySelector(
                        ".percera-mobile-qb-name-text"
                    );


                const team =
                    row.querySelector(
                        ".percera-mobile-qb-team"
                    );


                if (
                    !name
                    ||
                    !team
                ) {
                    return;
                }


                if (
                    row.dataset.sampleBadgeFixed
                    ===
                    "1"
                ) {
                    return;
                }


                const original =
                    String(
                        name.textContent
                        ||
                        ""
                    )
                    .trim();


                const pattern =
                    /\s+Limited\s+sample\s*$/i;


                if (
                    !pattern.test(
                        original
                    )
                ) {
                    return;
                }


                name.textContent =
                    original.replace(
                        pattern,
                        ""
                    );


                const badge =
                    document.createElement(
                        "span"
                    );


                badge.className =
                    "percera-mobile-sample-badge";


                badge.textContent =
                    "LIMITED SAMPLE";


                team.appendChild(
                    badge
                );


                row.dataset.sampleBadgeFixed =
                    "1";
            }
        );
    }


    fixLimitedSamples();


    const observer =
        new MutationObserver(
            () => {
                fixLimitedSamples();
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

})();
