/* This runs after a web page loads */


chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    // console.log(message, 'hohoho');
    if (data.message === 'get-arc-colors') {
        // See: https://arc.net/colors.html
        sendResponse({
            'arcPaletteTitle': getArcColor('--arc-palette-title'),
            'arcBGGradients': [
                getArcColor('--arc-background-gradient-color0'),
                getArcColor('--arc-background-gradient-color1'),
                getArcColor('--arc-background-gradient-color2'),
                getArcColor('--arc-background-gradient-overlay-color0'),
                getArcColor('--arc-background-gradient-overlay-color1'),
                getArcColor('--arc-background-gradient-overlay-color2')
            ]
        });
    }
});




function getArcColor(name) {
    return document.documentElement.style.getPropertyValue(name) ?? null;
}


setTimeout(() => {
    chrome.runtime.sendMessage({message: "get-user-tab-stash-from-notion"}, (response) => {
        console.log(response, '====');
    });
}, 500);

// document.getElementById('arc-bookmark-stash-main').style.backgroundColor = getArcColor('--arc-palette-title');
// document.getElementById('arc-bookmark-stash-main').innerHTML = 'red';

// setTimeout(() => {
//     console.log(getArcColor('--arc-palette-title'));
//     document.getElementById('arc-bookmark-stash-main').style.backgroundColor = getArcColor('--arc-palette-title');
// }, 500);
