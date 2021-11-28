//@ts-check

// NAME: SongStats
// AUTHOR: CharlieS1103
// DESCRIPTION: View a songs stats, such as dancability and acousticness.

/// <reference path="../globals.d.ts" />

(function songstats() {
    const { CosmosAsync, ContextMenu, URI } = Spicetify;
    if (!(CosmosAsync && URI)) {
        setTimeout(songstats, 300)
        return
    }
    var local_language = Spicetify.Locale._locale
    const translation = {
        "en": {
            "buttontxt": "View Song Stats",
            "danceability": "Danceability",
            "energy": "Energy",
            "key": "Key",
            "loudness": "Loudness",
            "speechiness": "Speechiness",
            "acousticness": "Acousticness",
            "instrumentalness": "Instrumentalness",
            "liveness": "Liveness",
            "valence": "Valence",
            "tempo": "Tempo",  
        },
        "fr": {
            "buttontxt": "Voir les statistique de la musique",
            "danceability": "Capacité à danser",
            "energy": "Énergie",
            "key": "Tonalité",
            "loudness": "Intensité sonore",
            "speechiness": "Élocution",
            "acousticness": "Acoustique",
            "instrumentalness": "instrumentalité",
            "liveness": "vivacité",
            "valence": "Mood",
            "tempo": "Tempo",  
        },
        "fr-CA": {
            "buttontxt": "Voir les statistique de la musique",
            "danceability": "Capacité à danser",
            "energy": "Énergie",
            "key": "Tonalité",
            "loudness": "Intensité sonore",
            "speechiness": "Élocution",
            "acousticness": "Acoustique",
            "instrumentalness": "instrumentalité",
            "liveness": "vivacité",
            "valence": "Mood",
            "tempo": "Tempo",  
        }
    }

    try{translation[local_language]["buttontxt"]}
    catch{local_language ="en"}
    
    const buttontxt = translation[local_language]["buttontxt"]
    const danceability = translation[local_language]["danceability"]
    const energy = translation[local_language]["energy"]
    const key = translation[local_language]["key"]
    const loudness = translation[local_language]["loudness"]
    const speechiness = translation[local_language]["speechiness"]
    const acousticness = translation[local_language]["acousticness"]
    const instrumentalness = translation[local_language]["instrumentalness"]
    const liveness = translation[local_language]["liveness"]
    const valence = translation[local_language]["valence"]
    const tempo = translation[local_language]["tempo"]

    //Watch for when the song is changed

    async function getSongStats(uris) {
        var request = new XMLHttpRequest();
        const uri = uris[0];
        const uriObj = Spicetify.URI.fromString(uri);
        const uriFinal = uri.split(":")[2]
        const res = await CosmosAsync.get('https://api.spotify.com/v1/audio-features/' + uriFinal);

        Spicetify.PopupModal.display({
            title: "Song Stats",
            content: `${danceability}: ${Math.round(100 * res.danceability)}% | ${energy}: ${Math.round(100 * res.energy)}% <br> ${key}: ${res.key} | ${loudness}: ${res.loudness} <br> ${speechiness}: ${Math.round(100 * res.speechiness)}% | ${acousticness}: ${Math.round(100 * res.acousticness)}% <br> ${instrumentalness}: ${Math.round(100 * res.instrumentalness)}% | ${liveness}: ${Math.round(100 * res.liveness)}% <br> ${valence}: ${Math.round(100 * res.valence)}% | ${tempo}: ${res.tempo} BPM`,
        });
    }
    function shouldDisplayContextMenu(uris) {
        if (uris.length > 1) {
            return false;
        }

        const uri = uris[0];
        const uriObj = Spicetify.URI.fromString(uri);
        if (uriObj.type === Spicetify.URI.Type.TRACK) {
            return true;
        }
        return false;
    }


    const cntxMenu = new Spicetify.ContextMenu.Item(
        buttontxt,
        getSongStats,
        shouldDisplayContextMenu,
    );

    cntxMenu.register();
})();
