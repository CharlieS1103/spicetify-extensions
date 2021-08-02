//@ts-check

// NAME: SongStats
// AUTHOR: CharlieS1103
// DESCRIPTION: View a songs stats, such as dancability and acousticness.

/// <reference path="../globals.d.ts" />

(function songstats() {
    const { CosmosAsync, Player, LocalStorage, PlaybackControl, ContextMenu, URI } = Spicetify;
    if (!(CosmosAsync && URI)) {
        setTimeout(songstats, 300)
        return
    }
    const buttontxt = "View Song Stats"
    //Watch for when the song is changed

    async function getSongStats(uris) {
        var request = new XMLHttpRequest();
        const uri = uris[0];
        const uriObj = Spicetify.URI.fromString(uri);
        const uriFinal = uri.split(":")[2]
        const res = await CosmosAsync.get('https://api.spotify.com/v1/audio-features/' + uriFinal);

        Spicetify.PopupModal.display({
            title: "Song Stats",
            content: "Danceability: " + Math.round(100 * res.danceability) / 100 + " | | " + "Energy: " + Math.round(100 * res.energy) / 100 + " | | " + "Key: " + res.key + " | | " + "Loudness: " + res.loudness + " | | " + "Speechiness: " + Math.round(100 * res.speechiness) / 100 + " | | " + "Acousticness: " + Math.round(100 * res.acousticness) / 100 + " | | " + "Instrumentalness: " + Math.round(100 * res.instrumentalness) / 100 + " | | " + "Liveness: " + Math.round(100 * res.liveness) / 100 + " | | " + "Valence: " + Math.round(100 * res.valence) / 100 + " | | " + "Tempo: " + res.tempo,
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
