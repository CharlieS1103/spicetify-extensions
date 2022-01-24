//@ts-check

// NAME: skipSilence
// AUTHOR: CharlieS1103
// DESCRIPTION: Skip the silent last part of a song

/// <reference path="../../spicetify-cli/globals.d.ts" />

(async function skipSilence() {
    const { Platform,Player } = Spicetify;
    if (!(Platform && Player)) {
        setTimeout(skipSilence, 300)
        return
    }
    let intervalID
    var timeToWatch = null;
    Spicetify.Player.addEventListener("songchange", async () => {
       let audioData = await Spicetify.getAudioData();
        for (var i = audioData.segments.length - 5; i<audioData.segments.length; i++){
            if (audioData.segments[i].loudness_max < -40){
                timeToWatch = audioData.segments[i].start;
                timeToWatch = timeToWatch.toString().substring(0, timeToWatch.toString().length-2).replace(".", "")
                intervalID = setInterval(timeCheck, 2000);
            }
        }
})


function timeCheck() {
    if(timeToWatch== null ){
        return null
    }
        if(timeToWatch <= Spicetify.Player.getProgress()){
            clearInterval(intervalID)
            timeToWatch = null;
            Spicetify.Player.next()
            return null;
        }
 }
 
})() 