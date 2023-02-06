/* This runs after a web page loads */
(async () => {
    // Importing from helper scripts
    // See: https://stackoverflow.com/a/53033388
    const helpers = await import(chrome.runtime.getURL('lib/helpers.js'));

    function getArcColor(name) {
        return document.documentElement.style.getPropertyValue(name) ?? null;
    }

    function getArcPalette() {
        return {
            'arcPaletteTitle': getArcColor('--arc-palette-title'),
            'arcBGGradients': [
                getArcColor('--arc-background-gradient-color0'),
                getArcColor('--arc-background-gradient-color1'),
                getArcColor('--arc-background-gradient-color2'),
                getArcColor('--arc-background-gradient-overlay-color0'),
                getArcColor('--arc-background-gradient-overlay-color1'),
                getArcColor('--arc-background-gradient-overlay-color2')
            ]
        };
    }

    function presentToast(msg, type = 'okay') {
        const { arcPaletteTitle, arcBGGradients } = getArcPalette();
        Toastify({
            text: msg,
            duration: 5000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: (type === 'okay') ? '__stash-toast' : '__stash-toast--danger',
            style: {   
                color: arcPaletteTitle ?? '#092609',            
                background: `linear-gradient(140deg, ${arcBGGradients.filter((color) => !!color).join(', ')})`,
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }

    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        // console.log(data, 'hohoho');
        if (data.message === 'get-arc-colors') {
            // See: https://arc.net/colors.html
            sendResponse(getArcPalette());
        }
        if (data.message === 'tab-added-to-stash') {
            // alert('Tab added to stash.');
            presentToast('Added to stash 👍');
        }
        if (data.message === 'log-please') {
            console.log(data.data);
        }
        if (data.message === 'toast-this') {
            //console.log(data);
            presentToast(data.data.toast, data.data.type);
        }
    });

    // const response = await helpers.sendMessageToBg({ message: "get-user-tab-stash-from-notion" });

})();
