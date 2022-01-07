// NAME: fixEnhance
// AUTHOR: CharlieS1103
// DESCRIPTION: Patch enhance feature: Not currently needed

(function fixEnhance() {



    const { Platform, CosmosAsync, URI, Player, Queue } = Spicetify;
    if (!(Platform && CosmosAsync && URI && Player && Queue)) {
        setTimeout(fixEnhance, 300)
        return
    }
    Spicetify.Platform.History.listen(({ pathname }) => {
        listenThenEnhance(pathname)

    });

    console.log("Enhance feature enabled!")
})()

function listenThenEnhance(pathname) {
    const observer = new MutationObserver(function appchange() {
        // Look for specific section on search page, or any section on other pages
        const pathNameStripped = pathname.split('/')
        const app = pathNameStripped[1] === 'playlist'
        const playlistCheck = document.querySelector("div.main-view-container__scroll-node-child > section > div:nth-child(3) > div > div.JUa6JJNj7R_Y3i4P8YUX > div:nth-child(2) > div:nth-child(1)")


        if (app && playlistCheck) {
            patchPlayButtons(pathname);
            patchPlaylistQueue();
            observer.disconnect();
        }
    })
    observer.observe(main, { childList: true, subtree: true });
}




function patchPlayButtons(pathname) {
    const pathNameStripped = pathname.split('/')
    if (pathNameStripped[1] == "playlist") {
        const songWrapper = document.querySelector(" div.main-view-container__scroll-node-child > section > div:nth-child(3) > div > div.JUa6JJNj7R_Y3i4P8YUX > div:nth-child(2)")
        const children = songWrapper.children;

        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            const enhancedIcon = child.children[0].children[1].children[1].children[1];
            if (enhancedIcon.className == "main-trackList-rowBadges main-type-ballad") {
                const playButton = child.children[0].children[0].children[0].children[1]

                playButton.addEventListener("click", function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    var songName = playButton.ariaLabel.replace("Play ", "")
                    const lastIndexOfBy = songName.lastIndexOf("by")

                    songNameSplit = songName.substring(0, lastIndexOfBy - 1)
                    const artistName = songName.substring(lastIndexOfBy + 3, songName.length).replace(/ /g, '%20');


                    songNameSplit = songNameSplit.replace(/ /g, '%20');
                    (async function () {
                        const songJson = await searchSong(songNameSplit, artistName)

                        Spicetify.Player.playUri("spotify:track:" + songJson.tracks.items[0].id)
                    })()

                }, false);
            }
        }
    }

}
async function searchSong(songName, artistName) {
    const songJson = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/search?q=track:' + songName + '%20artist:' + artistName + '&type=track&limit=1')
    return songJson;
}

function patchPlaylistQueue() {
    // Add a button which when clicked will trigger queuePlaylist()
    const actionBar = document.querySelector("div.main-actionBar-ActionBar.contentSpacing > div")
    const enhanceButton = document.createElement("button")
    enhanceButton.innerText = "Play Enhance!"
    enhanceButton.onclick = function () { queuePlaylist()}
    enhanceButton.className = "ccdA-D"
    actionBar.appendChild(enhanceButton)
}


async function queuePlaylist() {
    const songWrapper = document.querySelector(" div.main-view-container__scroll-node-child > section > div:nth-child(3) > div > div.JUa6JJNj7R_Y3i4P8YUX > div:nth-child(2)")
    const children = songWrapper.children;
    const songArr = [];
    for (var i = 0; i < children.length; i++) {
        var child = children[i]; {
            const playButton = child.children[0].children[0].children[0].children[1]
            var songName = playButton.ariaLabel.replace("Play ", "")
            const lastIndexOfBy = songName.lastIndexOf("by")

            songNameSplit = songName.substring(0, lastIndexOfBy - 1)
            const artistName = songName.substring(lastIndexOfBy + 3, songName.length).replace(/ /g, '%20');


            songNameSplit = songNameSplit.replace(/ /g, '%20');
            (async function () {
                const songJson = await searchSong(songNameSplit, artistName)
         
                songArr.push("spotify:track:" + songJson.tracks.items[0].id)
            })()
        }

    }
    console.log(songArr)
    playQueue(songArr)

}
function playQueue(uris){
    Spicetify.Platform.PlayerAPI.clearQueue();
    if(Spicetify.Player.getShuffle()){
        setTimeout(() => { uris = shuffle(uris) }, 1000);
       
        console.log(uris)
    }
    setTimeout(() => { Spicetify.Player.origin._queue.addToQueue(uris.map(track => { return { uri: track } })) }, 1000);
    Spicetify.Platform.PlayerAPI.skipToNext()
}
function shuffle(array) {
    let shuffled = array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    return shuffled;
}