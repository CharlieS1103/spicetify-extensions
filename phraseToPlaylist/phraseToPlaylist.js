//@ts-check

// NAME: phraseToPlaylist
// AUTHOR: CharlieS1103
// DESCRIPTION: Convert a phrase into a playlist with songs arraged to make that phrase.

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function phraseToPlaylist() {
    const { Platform, CosmosAsync } = Spicetify;
    if (!(Platform && CosmosAsync)) {
        setTimeout(phraseToPlaylist, 300)
        return
    }
    new Spicetify.Topbar.Button(
        "Phrase2Playlist",
        CONVERT_ICON,
        displayPhraseInput,
        false
    );


})()
function displayPhraseInput(){
    Spicetify.PopupModal.display({
        title: "Input phrase",
        content: createTextArea(),
    });
    addCustomCssListeners();
}

var offset = "";
var offsetnum = 0;
function createTextArea(){
    const container = document.createElement("div");
    container.innerHTML = `
<textarea id="playlist-phrase-box" name="playlist-phrase-box" rows="4" cols="30" placeholder="Input phrase here!"></textarea>
  <br><br>
  <button value="Submit" id="playlist-phrase-submit">Submit Phrase</button>
    `;
    return container;
}

async function addCustomCssListeners() {
    console.log("Adding listeners");
    const textarea = document.querySelector("#playlist-phrase-box");

    const submit = document.querySelector("#playlist-phrase-submit");
    submit.addEventListener("click", function (event) {
        // @ts-ignore
        generatePlaylist(textarea.value)
        event.preventDefault();
    }, false);
}

async function generatePlaylist(phrase){
    phrase = phrase.replace(/[^\w\s]|_/g, "").replace(/\s+/g, ' ')
    phrase = phrase.split(" ");
    const songArr = []
    offset = "";
    for (var i = 0; i < phrase.length; i++) {
        if (phrase[i].toLowerCase() in songMap) {
            songArr.push("spotify:track:" + songMap[phrase[i]])
        } else {
            const songJson = await searchSong(phrase[i]);
            songArr.push("spotify:track:" + songJson.id)
            console.log(i + "/" + phrase.length)
        }
        
            
        }
    createPlaylist(songArr)
}

async function searchSong(songName) {
    let songFound = false;
    const fallBackSongJson = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=50')
    while(!songFound){
        try{
        const songJson = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=50' + offset)
            for (var e = 0; e < songJson.tracks.items.length; e++) {
                const item = songJson.tracks.items[e];

                if (item.name.toLowerCase() == songName.toLowerCase()) {
                    console.log("Found! ")
                    offsetnum=0
                    offset = ""
                    return item;
                } else if (e == 49) {
                    offset = `&offset=${offsetnum}`
                    if (offsetnum == 999) {
                        return songJson.tracks.items[0]
                    }
                    if (offsetnum != 1000) {
                        offsetnum = offsetnum + 50;
                    }

                }
            }
        }catch(err){
            offsetnum = 0
            offset = ""
            return fallBackSongJson.tracks.items[0]
        }
       
    }
  
    /* const item = {
         id: "1W6qKv7nOWDbULZepUafbc"
    };
    return item
    */
}

async function createPlaylist(songArr){
    const randomName = await Spicetify.CosmosAsync.get('https://random-word-api.herokuapp.com/word?number=1&swear=0')
    const user = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/me')
    const newplaylist = await Spicetify.CosmosAsync.post('https://api.spotify.com/v1/users/' + user.id + '/playlists', {
        name: randomName[0]
    });

    const playlisturi = newplaylist.uri.split(":")[2]
    while(songArr.length){
        const b = songArr.splice(0, 100)
    Spicetify.CosmosAsync.post('https://api.spotify.com/v1/playlists/' + playlisturi + '/tracks', {
        uris: b
    });
}
}
const CONVERT_ICON = `
<?xml version="1.0" ?><svg fill="var(--spice-text)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 3C5.00736 3 4 4.00736 4 5.25V7.75C4 8.99264 5.00736 10 6.25 10H15.75C16.9926 10 18 8.99264 18 7.75V5.25C18 4.00736 16.9926 3 15.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H15.75C16.1642 4.5 16.5 4.83579 16.5 5.25V7.75C16.5 8.16421 16.1642 8.5 15.75 8.5H6.25C5.83579 8.5 5.5 8.16421 5.5 7.75V5.25Z" fill="var(--spice-text)"/><path d="M8.7 16C8.3134 16 8 16.3358 8 16.75C8 17.1642 8.3134 17.5 8.7 17.5H13.3C13.6866 17.5 14 17.1642 14 16.75C14 16.3358 13.6866 16 13.3 16H8.7Z" fill="var(--spice-text)"/><path d="M17.3529 16.4453L17.2803 16.5294C17.0141 16.7957 16.5974 16.8199 16.3038 16.602L16.2197 16.5294L14.2197 14.5294C13.9534 14.2632 13.9292 13.8465 14.1471 13.5529L14.2197 13.4688L16.2197 11.4688C16.5126 11.1759 16.9874 11.1759 17.2803 11.4688C17.5466 11.735 17.5708 12.1517 17.3529 12.4453L17.2803 12.5294L16.5612 13.2503L18.0607 13.2498C18.7079 13.2498 19.2402 12.7579 19.3042 12.1276L19.3107 11.9998V9.74976C19.3107 9.33554 19.6464 8.99976 20.0607 8.99976C20.4404 8.99976 20.7542 9.28191 20.8038 9.64799L20.8107 9.74976V11.9998C20.8107 13.4623 19.669 14.6582 18.2282 14.7447L18.0607 14.7498L16.5622 14.7503L17.2803 15.4688C17.5466 15.735 17.5708 16.1517 17.3529 16.4453Z" fill="var(--spice-text)"/><path d="M18 19.25V17.2239L17.9874 17.2365C17.5816 17.6423 17.027 17.8069 16.5 17.7311V19.25C16.5 19.6642 16.1642 20 15.75 20H6.25C5.83579 20 5.5 19.6642 5.5 19.25V14.25C5.5 13.8358 5.83579 13.5 6.25 13.5H13.0725C13.1295 13.3082 13.2199 13.1241 13.3439 12.957L13.3659 12.9274L13.4866 12.7876L14.2742 12H6.25C5.00736 12 4 13.0074 4 14.25V19.25C4 20.4926 5.00736 21.5 6.25 21.5H15.75C16.9926 21.5 18 20.4926 18 19.25Z" fill="var(--spice-text)"/></svg>`

const songMap = {
    "it": "6eG4JMN3f4WLgj1ElfuMUV",
    "for": "3beItkavCW1qXszPbFbijD",
    "is": "1epDL4xhczbpzkXIeGXZzb",
    "are": "0L6WRMANsYoX1mIe25zwbe",
    "i": "7wdzLe2Gsx1RGqbvYZHASz",
    "a": "6WH0LHM2vFBLpmU5RFdDh2",
    "the": "72FW5JjmSwgHNopNSLRocy",
    "have": "0DX4IC8aMjisNh7LHDyo6J",
    "he": "1bc28ebMDp7ym6rHfqFfj0",
    "we": "0BSI1Epu3YeVwXF1bvL8oH",
    "to": "4n3lfhTDOaFe9a1c4FPPSB",
    "and": "2YsrYsusAKqYD74ipCRxvz"
}