/* PERCERA — MATCHUPS NAVIGATION */
(() => {
    if (window.__PERCERA_MATCHUPS_NAV__) return;
    window.__PERCERA_MATCHUPS_NAV__ = true;

    function install() {
        const nav =
            document.querySelector(".site-header nav") ||
            document.querySelector("header nav");

        if (!nav) {
            setTimeout(install, 30);
            return;
        }

        nav.querySelector('[data-view="matchups"]')?.remove();

        const button = document.createElement("button");
        button.type = "button";
        button.className = "nav-button";
        button.dataset.view = "matchups";
        button.textContent = "Matchups";

        const methodology =
            nav.querySelector('[data-view="methodology"]');

        if (methodology) {
            nav.insertBefore(button, methodology);
        } else {
            nav.appendChild(button);
        }

        button.addEventListener("click", () => {
            window.location.href = "matchups.html";
        });

        const requested =
            sessionStorage.getItem("perceraReturnView");

        if (!requested) return;

        sessionStorage.removeItem("perceraReturnView");

        const allowed =
            new Set(["home", "rankings", "teams", "methodology"]);

        if (!allowed.has(requested)) return;

        let attempts = 0;

        function openRequestedView() {
            const target =
                document.querySelector(
                    `.nav-button[data-view="${requested}"]`
                );

            if (target) {
                target.click();
                return;
            }

            attempts += 1;

            if (attempts < 40) {
                setTimeout(openRequestedView, 25);
            }
        }

        setTimeout(openRequestedView, 0);
    }

    install();
})();
