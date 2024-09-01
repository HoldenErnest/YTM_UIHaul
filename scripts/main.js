const elemClass = "yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m"; // these are the classes for the button "I wish to proceed" after viewer discresion

function tryRemove() {
    setTimeout(function () {
        const contButton = document.getElementsByClassName(elemClass);
        log("tried to click past");
        if (contButton.length > 0) {
            contButton[0].click();

            // once you accept it you dont need to click again until you refresh the page
            contButton[0].remove();
            window.navigation.removeEventListener("navigate", newlistener)
        }
    },1000); // a little delay to make sure its loaded
}

function log(thing) {
    console.log("[YTM Block] " + thing)
}

window.navigation.addEventListener("navigate", newlistener); // cant use an observer without node??, anyway to work around this just check if you can click everytime there is a new song

function newlistener(event) {
    //log(event.destination.url + " is the new song or page");
    if (event.destination.url == "https://music.youtube.com/") return;
    
    tryRemove();
};