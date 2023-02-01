/* This runs after a web page loads */
(async () => {

    // Importing from helper scripts
    // See: https://stackoverflow.com/a/53033388
    const helpers = await import(chrome.runtime.getURL('lib/helpers.js'));


    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        // console.log(data, 'hohoho');
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
        if (data.message === 'tab-added-to-stash') {
            // alert('Tab added to stash.');
        }
        if (data.message === 'log-please') {
            console.log(data.data);
        }
    });




    function getArcColor(name) {
        return document.documentElement.style.getPropertyValue(name) ?? null;
    }

    const response = await helpers.sendMessageToBg({message: "get-user-tab-stash-from-notion"});

})();
