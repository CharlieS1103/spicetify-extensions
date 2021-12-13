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
    .MnW5SczTcbdFHxLZ_Z8j, .WiPggcPDzbwGxoxwLWFf {
    display: none !important;
    }
    `
      
    document.body.appendChild(styleSheet)
    delayAds()

    function delayAds() {
        console.log("Ads delayed: Adblock.js")
        Spicetify.Platform.AdManagers.audio.audioApi.cosmosConnector.increaseStreamTime(-100000000000)
        Spicetify.Platform.AdManagers.billboard.billboardApi.cosmosConnector.setAdState(-100000000000)
    }
    setInterval(delayAds, 720 *10000);
})() 


