//@ts-check

// NAME: adblock
// AUTHOR: CharlieS1103
// DESCRIPTION: Block all audio and UI ads on Spotify

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function adblock() {
    const { Platform} = Spicetify;
    if (!(Platform)) {
        setTimeout(adblock, 300)
        return
    }
    
    var styleSheet = document.createElement("style")

    styleSheet.innerHTML =
     `
    /* Top Context menu upgrade button hide */
    .main-contextMenu-menuItem a[href="https://www.spotify.com/premium/"] {
        display: none !important;
    }

    /* Remove upgrade button near username */
    button[title="Upgrade to Premium"],
    button[aria-label="Upgrade to Premium"],
    .main-topBar-UpgradeButton {
        display: none !important;
    }

    /* Ad placeholder */
    .main-leaderboardComponent-container,
    .ReyA3uE3K7oEz7PTTnAn,
    .X871RxPwx9V0MqpQdMom {
        display: none !important;
    }

    /* Home page ad section */
    .desktoproutes-homepage-takeover-ad-hptoComponent-parentContainer {
        display: none !important;
    }

    /* Remove sponsor ads in playlists */
    .sponsor-container {
        display: none !important;
    }

    /* Remove sponsored playlist in homepage */
    .WiPggcPDzbwGxoxwLWFf,
    .DHeG1dij5qSIc9nr0wDj,
    .hx2D0g_ursHte5bm62U2 {
        display: none !important;
    }

    /* Misc */
    .MnW5SczTcbdFHxLZ_Z8j,
    a.link-subtle.main-navBar-navBarLink.GKnnhbExo0U9l7Jz2rdc {
        display: none !important;
    }
    `
    document.body.appendChild(styleSheet)
    delayAds()
    var billboard = Spicetify.Platform.AdManagers.billboard.displayBillboard;
    Spicetify.Platform.AdManagers.billboard.displayBillboard = function (arguments) {
        Spicetify.Platform.AdManagers.billboard.finish()
        // hook before call
        var ret = billboard.apply(this, arguments);
        // hook after call
        console.log("Adblock.js: Billboard blocked! Leave a star!")
        Spicetify.Platform.AdManagers.billboard.finish()
        const observer = new MutationObserver((mutations, obs) => {
            const billboardAd = document.getElementById('view-billboard-ad');
            if (billboardAd) {
                Spicetify.Platform.AdManagers.billboard.finish()
                obs.disconnect();
                return;
            }
        });

        observer.observe(document, {
            childList: true,
            subtree: true
        });
        return ret;
    };
    function delayAds() {
        console.log("Ads delayed: Adblock.js")
        Spicetify.Platform.AdManagers.audio.audioApi.cosmosConnector.increaseStreamTime(-100000000000)
        Spicetify.Platform.AdManagers.billboard.billboardApi.cosmosConnector.increaseStreamTime(-100000000000)
    }
    setInterval(delayAds, 720 *10000);

   
})() 


