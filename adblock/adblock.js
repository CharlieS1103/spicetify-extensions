//@ts-check

// NAME: adblock
// AUTHOR: CharlieS1103
// DESCRIPTION: Block all audio and UI ads on Spotify

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function adblock() {
 
    setInterval(delayAds, 720 *10000);
})() 


function delayAds() {
    Spicetify.Platform.AdManagers.audio.audioApi.cosmosConnector.increaseStreamTime(-100000000000)
    console.log("Ads delayed: Adblock.js")
}