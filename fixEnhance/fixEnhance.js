(function fixEnhance(){



    const { Platform, CosmosAsync, URI, Player } = Spicetify;
    if (!(Platform && CosmosAsync && URI && Player)) {
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
        const playlistCheck = document.querySelector("#main > div > div.Root__top-container > div.Root__main-view > main > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > section > div:nth-child(3) > div > div.JUa6JJNj7R_Y3i4P8YUX > div:nth-child(2) > div:nth-child(1)")
          
        
        if (app && playlistCheck) {
            reworkEnhance(pathname);
            observer.disconnect();
        }
    })
    observer.observe(main, { childList: true, subtree: true });
}
 function reworkEnhance(pathname) {
   
    const pathNameStripped = pathname.split('/')
    console.log(pathNameStripped[1])
    if (pathNameStripped[1] == "playlist") {
        const songWrapper = document.querySelector("#main > div > div.Root__top-container > div.Root__main-view > main > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > section > div:nth-child(3) > div > div.JUa6JJNj7R_Y3i4P8YUX > div:nth-child(2)")
        const children = songWrapper.children;
      
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            const enhancedIcon = child.children[0].children[1].children[1].children[1];
            if (enhancedIcon.className == "main-trackList-rowBadges main-type-ballad"){
                const playButton = child.children[0].children[0].children[0].children[1]
                console.log(playButton)
                playButton.addEventListener("click", function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    var songName = playButton.ariaLabel.replace("Play ", "")
                    const lastIndexOfBy = songName.lastIndexOf("by")
                    console.log(lastIndexOfBy)
                    songNameSplit = songName.substring(0, lastIndexOfBy - 1)
                    const artistName = songName.substring(lastIndexOfBy + 3, songName.length).replace(/ /g, '%20');
                    
                    console.log(songNameSplit)
                    songNameSplit = songNameSplit.replace(/ /g, '%20');
                        (async function () {
                            const songJson = await searchSong(songNameSplit,artistName)
                            console.log(songJson)
                            Spicetify.Player.playUri("spotify:track:" + songJson.tracks.items[0].id)
                        })()
              
                    console.log(songJson)
                    
                    
                   
                }, false);
            }
        }
    }
    
}
async function searchSong(songName,artistName){
    const songJson = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/search?q=track:' + songName + '%20artist:' + artistName + '&type=track&limit=1')
    return songJson;
}
function queuePlaylist(){
    
}