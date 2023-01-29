

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message, 'popup');
// });


(async () => {
    const $body = $('body');
    const $head = $('head');
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs?.[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
            message: 'get-arc-colors'
        }, (response) => {
            //$body.html(JSON.stringify(response))
            const arcBGGradients = response.arcBGGradients.filter((color) => !!color);
            if (arcBGGradients.length) {
                $body.css('background', `linear-gradient(140deg, ${arcBGGradients.join(', ')})`);
            }
            const $style = $('<style />');
            $style.text(`.bstash-list-con ul li a {color: ${response.arcPaletteTitle}}`);
            $head.append($style);
        });


        // Make draggable
        const dragAndDropCleanUp = slist($('.bstash-list-con ul').get(0), () => {
            // $('#tester-span').text('dargg end');
            // dragAndDropCleanUp();
        });

    }
})();