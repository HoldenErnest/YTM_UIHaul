// Holden Ernest - 9/1/2024
// Fix IU for ytm page

UpdatePlaylistPage(); // This only activates on pages with /playlist because of the manifest.json


function UpdatePlaylistPage() {
    setTimeout(function () {
        var randomContentElements = document.getElementsByClassName("style-scope ytmusic-playlist-shelf-renderer"); // cant use id "contents" because youtube doesnt use id's traditionally
        var allSongs; // this is the parent for all of the song elements

        for (let i = 0; i < randomContentElements.length; i++) {
            let e = randomContentElements[i];
            if (e.id == "contents") {
                allSongs = e;
            }
        }
        // at this point allSongs should contain every song element in the playlist

        var allSongNames = [];
        var allSongPlays = [];

        log("songs: " + allSongs.children.length);
        for (let i = 0; i < allSongs.children.length; i++) {
            let song = allSongs.children[i];
            allSongNames.push(song.children[4].children[0].children[0].children[0].innerHTML);
            allSongPlays.push(song.children[4].children[2].children[1].innerHTML.replace(" plays", ""));
        }

        for (let i = 0; i < allSongNames.length; i++) {
            log(allSongNames[i] + " : " + allSongPlays[i]);
        }

        //allSongs.insertBefore(allSongs.children[1], allSongs.children[0]);
        playCountToNumber(allSongPlays);
        sortAll(allSongs, allSongPlays);
        // create a new element at the top, right before contents. Then create a click event for sorting everything in contents based on what the user wants
        
    },1000); // a little delay to make sure its loaded
}

function sortAll(parent, sortList) {
    var toSort = parent.children;
    toSort = Array.prototype.slice.call(toSort, 0);
    toSort.sort(function(a, b) {
        var aIndex = toSort.indexOf(a);
        var bIndex = toSort.indexOf(b);
        if (typeof sortList[aIndex] == "number") {
            return sortList[bIndex] - sortList[aIndex];
        }
        return sortList[aIndex].localeCompare(sortList[bIndex]);
    });

    parent.innerHTML = ""; // delete all old children

    for(var i = 0, l = toSort.length; i < l; i++) { // append all new children in the correct order (tosorts order)
        parent.appendChild(toSort[i]);
    }
}

function playCountToNumber(listOfPlays) { // play count is displayed as ##.#k or ##.#M ect, convert to a real number
    for(let i = 0; i < listOfPlays.length; i++) {

        const replacables = ['K','M','B'];
        var extension = listOfPlays[i].slice(-1); // does this number have an extension k m b
        var newNum = Number(listOfPlays[i].slice(0, -1));
        for (var j = 0; j < replacables.length; j++) { // if there is an extension find which one
            if (extension == replacables[j]) {
                for (var k = 1; k <= j+1; k++) { // depending on where it is in the list, multiply the current number
                    newNum *= 1000;
                }
            }
        }
        listOfPlays[i] = newNum;
    }
}


function log(thing) {
    console.log("[YTM UIHaul] " + thing)
}

/*

window.navigation.addEventListener("navigate", newURLEvent);
//window.navigation.removeEventListener("navigate", newURLEvent); // << to remove this (if you ever want)

function newURLEvent(event) {
    //log(event.destination.url + " is the new song or page");
    if (event.destination.url == "https://music.youtube.com/") return;
    
    if (event.destination.url.startsWith("https://music.youtube.com/playlist")) {
        log("visiting a playlist");
        UpdatePlaylistPage();
    }
};

*/