//@ts-check

// NAME: adblock
// AUTHOR: CharlieS1103
// DESCRIPTION: Block all audio and UI ads on Spotify

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function adblock() {
    const { Platform } = Spicetify;
    if (!Platform) {
        setTimeout(adblock, 300)
        return
    }

    const styleSheet = document.createElement("style")

    styleSheet.innerHTML =
        `
    .nHCJskDZVlmDhNNS9Ixv, .utUDWsORU96S7boXm2Aq, .cpBP3znf6dhHLA2dywjy, .G7JYBeU1c2QawLyFs5VK, .vYl1kgf1_R18FCmHgdw2, .vZkc6VwrFz0EjVBuHGmx, .iVAZDcTm1XGjxwKlQisz, ._I_1HMbDnNlNAaViEnbp, .xXj7eFQ8SoDKYXy6L3E1, .F68SsPm8lZFktQ1lWsQz, .MnW5SczTcbdFHxLZ_Z8j, .WiPggcPDzbwGxoxwLWFf, .ReyA3uE3K7oEz7PTTnAn, .x8e0kqJPS0bM4dVK7ESH, .gZ2Nla3mdRREDCwybK6X, .SChMe0Tert7lmc5jqH01, .AwF4EfqLOIJ2xO7CjHoX, .UlkNeRDFoia4UDWtrOr4, .k_RKSQxa2u5_6KmcOoSw, ._mWmycP_WIvMNQdKoAFb, .O3UuqEx6ibrxyOJIdpdg, .akCwgJVf4B4ep6KYwrk5, .bIA4qeTh_LSwQJuVxDzl, .ajr9pah2nj_5cXrAofU_, .gvn0k6QI7Yl_A0u46hKn, .obTnuSx7ZKIIY1_fwJhe, .IiLMLyxs074DwmEH4x5b, .RJjM91y1EBycwhT_wH59, .mxn5B5ceO2ksvMlI1bYz, .l8wtkGVi89_AsA3nXDSR, .Th1XPPdXMnxNCDrYsnwb, .SJMBltbXfqUiByDAkUN_, .Nayn_JfAUsSO0EFapLuY, .YqlFpeC9yMVhGmd84Gdo, .HksuyUyj1n3aTnB4nHLd, .DT8FJnRKoRVWo77CPQbQ, .main-leaderboardComponent-container, .sponsor-container, a.link-subtle.main-navBar-navBarLink.GKnnhbExo0U9l7Jz2rdc, button[title="Upgrade to Premium"], button[aria-label="Upgrade to Premium"], .main-topBar-UpgradeButton, .main-contextMenu-menuItem a[ehrf^="https://www.spotify.com/premium/"] {
    display: none !important;
    }
    `
    document.body.appendChild(styleSheet);
    
    delayAds();
    
    const billboard = Spicetify.Platform.AdManagers.billboard.displayBillboard;

    Spicetify.Platform.AdManagers.billboard.displayBillboard = function (arguments) {
        Spicetify.Platform.AdManagers.billboard.finish()
        // hook before call
        var ret = billboard.apply(this, arguments);
        // hook after call
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

    async function delayAds() {
        if (!Spicetify.Platform?.UserAPI) {
            setTimeout(delayAds, 300);
            return; 
        }
        const productState = Spicetify.Platform.UserAPI._product_state || Spicetify.Platform.UserAPI._product_state_service;

        await productState.putOverridesValues({ pairs: { ads: "0", catalogue: "premium", product: "premium", type: "premium" } });
        Spicetify.Platform.AdManagers.audio.audioApi.cosmosConnector.increaseStreamTime(-100000000000);
        Spicetify.Platform.AdManagers.billboard.billboardApi.cosmosConnector.increaseStreamTime(-100000000000);
        await Spicetify.Platform.AdManagers.audio.disable();
        await Spicetify.Platform.AdManagers.billboard.disable();
        await Spicetify.Platform.AdManagers.leaderboard.disableLeaderboard();
        await Spicetify.Platform.AdManagers.sponsoredPlaylist.disable();
        
        console.log("[Adblock] Ads disabled", Spicetify.Platform.AdManagers);
    };

    setInterval(delayAds, 30 * 10000);
    
    (async function disableEsperantoAds() {
        if (!Spicetify.Platform?.UserAPI) {
            setTimeout(disableEsperantoAds, 300);
            return;
        }
        try{
            const productState = Spicetify.Platform.UserAPI._product_state || Spicetify.Platform.UserAPI._product_state_service;
        
            await productState.putOverridesValues({ pairs: { ads: "0", catalogue: "premium", product: "premium", type: "premium" } });
            productState.subValues({ keys: ["ads"] }, () => {
                delayAds();
            });
        }catch(e){
            console.log("[Adblock] Product State does not exist", e);
        }
       
    })();
})()

