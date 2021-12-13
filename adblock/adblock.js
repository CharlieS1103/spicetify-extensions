//@ts-check

// NAME: adblock
// AUTHOR: CharlieS1103
// DESCRIPTION: Block all audio and UI ads on Spotify

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function adblock() {
 
    setInterval(function () {delayAds}, 720 *10000);
})() 


function delayAds() {
    Spicetify.Platform.AdManagers.billboard.billboardApi.cosmosConnector.increaseStreamTime(-7500);
    Spicetify.Platform.AdManagers.audio.audioApi.cosmosConnector.increaseStreamTime(-7500)
    Spicetify.Platform.AdManagers.leaderboard.leaderboardApi.cosmosConnector.increaseStreamTime(-7500)
}