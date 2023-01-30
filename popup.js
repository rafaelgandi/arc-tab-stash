
import { sendMessageToActiveTab } from './lib/helpers.js';


(async () => {
    const $body = $('body');
    const $head = $('head');
    const response = await sendMessageToActiveTab({
        message: 'get-arc-colors'
    });
    if (response) {
         //$body.html(JSON.stringify(response))
         const arcBGGradients = response.arcBGGradients.filter((color) => !!color);
         if (arcBGGradients.length) {
             $body.css('background', `linear-gradient(140deg, ${arcBGGradients.join(', ')})`);
         }
         const $style = $('<style />');
         $style.text(`.bstash-list-con ul li a {color: ${response.arcPaletteTitle}}`);
         $head.append($style);

         // Make draggable
        const dragAndDropCleanUp = slist($('.bstash-list-con ul').get(0), () => {
            // $('#tester-span').text('dargg end');
            // dragAndDropCleanUp();
        });
    }
})();