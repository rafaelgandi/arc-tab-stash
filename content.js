/*
    Stash
    www.rafaelgandi.com
*/
import { runtime as browserRuntime } from './lib/browser-api.js';

(async () => {
    function presentToast(msg, type = 'okay') {
        // const { arcPaletteTitle, arcBGGradients } = getArcPalette();
        Toastify({
            text: msg,
            duration: 5000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: (type === 'okay') ? '__stash-toast' : '__stash-toast--danger',
            style: {   
                padding: 'calc(1rem / 2) 1rem'
            }
        }).showToast();
    }

    function messageHandler(data, sender, sendResponse) {
        if (data.message === 'tab-added-to-stash') {
            presentToast('Added to your stash 👍');
            sendResponse('done');
        }
        if (data.message === 'log-please') {
            console.log(data.data);
            sendResponse('done');
        }
        if (data.message === 'toast-this') {
            presentToast(data.data.toast, data.data.type);
            sendResponse('done');
        }
        return true;
    }
    
    function listen() {
        browserRuntime?.onMessage?.removeListener(messageHandler);
        browserRuntime?.onMessage?.addListener(messageHandler);
    }
    listen();
    // Do something if we are at the Stash home notion page. //
    if (window.location.href.indexOf('rafaelgandi.notion.site/Stash') !== -1) {
        
    }

})();
