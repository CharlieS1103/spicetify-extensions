//@ts-check

// NAME: SongStats
// AUTHOR: CharlieS1103
// DESCRIPTION: View a songs stats, such as dancability and acousticness.

/// <reference path="../globals.d.ts" />
(function WikiFy() {

    const { CosmosAsync, URI } = Spicetify;
    if (!(CosmosAsync && URI)) {
        setTimeout(WikiFy, 10);
        return;
    }

    const buttontxt = "View Wiki"
    //Watch for when the song is changed
//

    async function getWikiText(uris) {

        const rawUri = uris[0];
        const uri = rawUri.split(":")[2]
        const artistName = await CosmosAsync.get(`https://api.spotify.com/v1/artists/${uri}`)
        const artistNameTrimmed = (artistName.name).replace(/\s/g, "%20");
    
       if(artistName != null){
           try{
           const wikiInfo = await CosmosAsync.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cdescription&titles=${artistNameTrimmed}`)
           
           //https://en.wikipedia.org/w/api.php?action=query&format=json&uselang=en&list=search&srsearch=${artistNameTrimmed}
  
           const wikiInfoArr = wikiInfo.query.pages
      console.log(wikiInfoArr)
      console.log(Object.values(wikiInfoArr))
            const page = Object.values(wikiInfoArr)[0];
               var styles = `
    body > generic-modal > div > div {
    background-color: beige;
    color: black
}
`

               var styleSheet = document.createElement("style")
               styleSheet.type = "text/css"
               styleSheet.innerText = styles
               document.body.appendChild(styleSheet)
               console.log(page.extract)
               if (page.extract != null) {
                   Spicetify.PopupModal.display({
                       title: "WikiFy",
                       content: page.extract

                   });
               } else {
                   Spicetify.PopupModal.display({
                       title: "Error",
                       content: "Selected artist does not have a WikiPedia page, Sorry."

                   });
               }
           }catch{
Spicetify.PopupModal.display({
    title: "Error",
    content: "Request failed",
})
           }
    
           
        
    }
    }
        function shouldDisplayContextMenu(uris) {
            if (uris.length > 1) {
                return false;
            }
            const uri = uris[0];
            const uriObj = Spicetify.URI.fromString(uri);
            if (uriObj.type === Spicetify.URI.Type.TRACK || uriObj.type === Spicetify.URI.Type.ARTIST) {
                return true;
            }
            return false;
        }


        const cntxMenu = new Spicetify.ContextMenu.Item(
            buttontxt,
            getWikiText,
            shouldDisplayContextMenu,
        );

        cntxMenu.register();
    
})();