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
    /* BEGIN: Daksh777 (https://github.com/Daksh777/SpotifyNoPremium) */

    /* Context menu upgrade button */
    .upgrade-button,
    button[data-menu-item="upgrade-account"],
    .main-contextMenu-menuItem a[href="https://www.spotify.com/premium/"],
    button[id="upgradeAccount"] {
    display: none !important;
    }

    /* Ad placeholder */
    .main-leaderboardComponent-container {
    display: none !important;
    }

    /* Upgrade button */
    .main-topBar-UpgradeButton,
    .Button-y0gtbx-0[aria-label="Upgrade to Premium"] {
    display: none !important;
    }

    /* Home page ad section */
    .desktoproutes-homepage-takeover-ad-hptoComponent-parentContainer {
    display: none !important;
    }

    /* Remove download button */
    .x-downloadButton-DownloadButton {
    display: none !important;
    }

    /* Context menu download button */
    .main-contextMenu-disabled:not([as=a]) {
    display: none !important;
    }

    /* Remove sponsor ads in playlists */
    .sponsor-container {
    display: none !important
    }

    /* For update 1.1.74+ */

    /* Ad placeholder */
    .X871RxPwx9V0MqpQdMom {
    display: none !important
    }

    /* Upgrade button */
    .Qt5xfSWikz6CLU8Vobxs[aria-label="Upgrade to Premium"] {
    display: none !important
    }

    /* Context menu upgrade button */
    .DuEPSADpSwCcO880xjUG a[href="https://www.spotify.com/premium/"] {
    display: none !important
    }

    /* Download button */
    .BKsbV2Xl786X9a09XROH {
    display: none !important
    }

    /* Context menu download button */
    .wC9sIed7pfp47wZbmU6m[aria-disabled="true"] {
    display: none !important
    }

    /* Remove upgrade button for v1.1.78 */
    .main-buttons-button[title="Upgrade to Premium"] {
    display: none !important
    }

    /* Remove sponsored playlist in homepage */
    .WiPggcPDzbwGxoxwLWFf,
    .DHeG1dij5qSIc9nr0wDj,
    .hx2D0g_ursHte5bm62U2 {
    display: none !important
    }

    /* Ad placeholder for 1.1.86+ */
    .ReyA3uE3K7oEz7PTTnAn,
    .Root__main-view > div:nth-child(2),
    .Root__modal-slot .GenericModal__overlay.QMMTQfEw3AIHFf4dTRp3.nPKDEvIoCzySBR24pZiN {
    display: none !important
    }

    /* END: Daksh777 (https://github.com/Daksh777/SpotifyNoPremium) */

    /* BEGIN: Tetrax-10 (https://github.com/Tetrax-10/Nord-Spotify) */

    /* Remove upgrade button near username */
    button[title="Upgrade to Premium"],
    button[aria-label="Upgrade to Premium"] {
    display: none !important;
    }

    /* END Tetrax-10 (https://github.com/Tetrax-10/Nord-Spotify) */

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


