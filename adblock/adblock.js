//@ts-check

// NAME: adblock
// AUTHOR: CharlieS1103
// DESCRIPTION: Block all audio and UI ads on Spotify

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function adblock() {
    // Check if the Spicetify Platform object is available
    const { Platform } = Spicetify;
    if (!Platform) {
        // If not available, wait and retry after 300 milliseconds
        setTimeout(adblock, 300);
        return;
    }

    // Create a new style sheet element to hide ads
    const styleSheet = document.createElement("style");

    styleSheet.innerHTML =
        `
    .MnW5SczTcbdFHxLZ_Z8j, .WiPggcPDzbwGxoxwLWFf, .ReyA3uE3K7oEz7PTTnAn, .main-leaderboardComponent-container, .sponsor-container, a.link-subtle.main-navBar-navBarLink.GKnnhbExo0U9l7Jz2rdc, button[title="Upgrade to Premium"], button[aria-label="Upgrade to Premium"], .main-contextMenu-menuItem a[href^="https://www.spotify.com/premium/"] {
        display: none !important;
    }
    `;
    document.body.appendChild(styleSheet);

    // Function to delay ads by adjusting stream time
    function delayAds() {
        console.log("Ads delayed: Adblock.js");
        Spicetify.Platform.AdManagers.audio.audioApi.cosmosConnector.increaseStreamTime(-100000000000);
        Spicetify.Platform.AdManagers.billboard.billboardApi.cosmosConnector.increaseStreamTime(-100000000000);
    }
    setInterval(delayAds, 720 * 10000); // Run the delayAds function every 7200 seconds (2 hours)

    // Override the displayBillboard function to handle ad removal
    const billboard = Spicetify.Platform.AdManagers.billboard.displayBillboard;
    Spicetify.Platform.AdManagers.billboard.displayBillboard = function () {
        Spicetify.Platform.AdManagers.billboard.finish();
        // hook before call
        const ret = billboard.apply(this, arguments);
        // hook after call

        // Use MutationObserver to detect the appearance of the billboard ad and remove it
        const observer = new MutationObserver((mutations, obs) => {
            const billboardAd = document.getElementById('view-billboard-ad');
            if (billboardAd) {
                Spicetify.Platform.AdManagers.billboard.finish();
                obs.disconnect();
                return;
            }
        });

        // Observe mutations in the document subtree
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        return ret;
    };

    // Function to disable Esperanto ads by modifying product state
    async function disableEsperantoAds() {
        // Check if the necessary Spicetify Platform objects are available
        if (!Spicetify.Platform?.UserAPI?._product_state) {
            // If not available, wait and retry after 300 milliseconds
            setTimeout(disableEsperantoAds, 300);
            return;
        }

        // Modify the product state to disable Esperanto ads
        await Spicetify.Platform.UserAPI._product_state.putOverridesValues({ pairs: { ads: "0", catalogue: "premium", product: "premium", type: "premium" } });

        // Log the disabled ads information
        Spicetify.Platform.UserAPI._product_state.subValues({}, ({ pairs }) => {
            console.log("Disabled Esperanto ads", pairs);
            // Reconfirm the disabled ads
            Spicetify.Platform.UserAPI._product_state.putOverridesValues({ pairs: { ads: "0", catalogue: "premium", product: "premium", type: "premium" } });
        });
    }

    // Call the disableEsperantoAds function to disable Esperanto ads
    disableEsperantoAds();
})();
