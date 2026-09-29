
(() => {

    "use strict";


    if (
        window.innerWidth
        >
        860
    ) {
        return;
    }


    function dedupeScheduleLogos() {

        document
        .querySelectorAll(
            "#team-detail .team-game-opponent"
        )
        .forEach(
            opponent => {

                const nativeLogo =
                    opponent.querySelector(
                        ".team-opponent-logo"
                    );


                const injectedLogos =
                    opponent.querySelectorAll(
                        ".percera-mobile-game-logo"
                    );


                if (
                    nativeLogo
                    &&
                    injectedLogos.length
                ) {

                    injectedLogos.forEach(
                        logo => logo.remove()
                    );
                }
            }
        );
    }


    dedupeScheduleLogos();


    const observer =
        new MutationObserver(
            () => {
                dedupeScheduleLogos();
            }
        );


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );


    document.addEventListener(
        "click",
        () =>
            setTimeout(
                dedupeScheduleLogos,
                20
            ),
        true
    );

})();
