//@ts-check

// NAME: SongStats
// AUTHOR: CharlieS1103
// DESCRIPTION: View a songs stats, such as danceability and acousticness.

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function songstats() {
    const { CosmosAsync, ContextMenu, URI } = Spicetify;
    if (!(CosmosAsync && URI)) {
        setTimeout(songstats, 300)
        return
    }
    // @ts-ignore
    var local_language = Spicetify.Locale._locale
    const translation = {
        "en": {
            "titletxt": "Song Stats",
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
            "titletxt": "Statistique de la musique",
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
            "titletxt": "Statistique de la musique",
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
        "cs": {
            "titletxt": "Statistiky písně",
            "buttontxt": "Zobrazit statistiky písně",
            "danceability": "Tančitelnost",
            "energy": "Energie",
            "key": "Tónina",
            "loudness": "Hlasitost",
            "speechiness": "Mluvenost",
            "acousticness": "Akustičnost",
            "instrumentalness": "Nástrojovost",
            "liveness": "Živost",
            "valence": "Emoční náboj",
            "tempo": "Tempo"
        }
    }

    try{translation[local_language]["buttontxt"]}
    catch{local_language ="en"}

    const titletxt = translation[local_language]["titletxt"]
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

        const pitchClasses = [
            "C",
            "C♯/D♭",
            "D",
            "D♯/E♭",
            "E",
            "F",
            "F♯/G♭",
            "G",
            "G♯/A♭",
            "A",
            "A♯/B♭",
            "B"
        ];

        let keyText = res.key;
        if (res.key === -1) {
            keyText = "Undefined";
        } else {
            const pitchClassIndex = res.key;
            keyText = pitchClasses[pitchClassIndex];
        }

        Spicetify.PopupModal.display({
            title: `${titletxt}`,
            content: `<style>
                    .stats-table {
                        display: table;
                        width: 100%;
                    }

                    .stats-row {
                        display: table-row;
                    }

                    .stats-cell {
                        display: table-cell;
                        padding: 5px;
                        font-weight: bold;
                    }
                </style>
                <div class="stats-table">
                    <div class="stats-row">
                        <div class="stats-cell">${danceability}: ${Math.round(100 * res.danceability)} %</div>
                        <div class="stats-cell">${energy}: ${Math.round(100 * res.energy)} %</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${key}: ${keyText}</div>
                        <div class="stats-cell">${loudness}: ${res.loudness} dB</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${speechiness}: ${Math.round(100 * res.speechiness)} %</div>
                        <div class="stats-cell">${acousticness}: ${Math.round(100 * res.acousticness)} %</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${instrumentalness}: ${Math.round(100 * res.instrumentalness)} %</div>
                        <div class="stats-cell">${liveness}: ${Math.round(100 * res.liveness)} %</div>
                    </div>
                    <div class="stats-row">
                        <div class="stats-cell">${valence}: ${Math.round(100 * res.valence)} %</div>
                        <div class="stats-cell">${tempo}: ${res.tempo} BPM</div>
                    </div>
                </div>`,
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
        shouldDisplayContextMenu
    );

    cntxMenu.register();
})();
