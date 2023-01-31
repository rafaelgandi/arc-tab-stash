
import { sendMessageToActiveTab, storageSet, storageGet, openInNewTab, removeFromStash, logThis } from './lib/helpers.js';

const $body = $('body');
const $head = $('head');
const $ul = $('.bstash-list-con ul');
let dropDownCleanUpFunc = undefined;
let STASH = [];

function sortByOrderProp() {
    return STASH.sort((a, b) => {
        if (Number(a.order) > Number(b.order)) {
            return -1;
        }
        if (Number(a.order) < Number(b.order)) {
            return 1;
        }
        return 0;
    });
}

async function populateList() {
    STASH = await storageGet('stash');
    // $('#tester-span').text(STASH.length + '====');
    if (STASH && STASH.length) {
        let listHTML = [];
        sortByOrderProp().forEach((item) => {
            if (!item) { return; }
            listHTML.push(/*html*/ `
                 <li>
                    <a 
                        href="${item.url}" 
                        data-stash-id="${item.id}" 
                        data-stash-order="${item?.order ?? ''}"
                        draggable="false"
                    >
                        <img src="${item.favIconUrl}" />
                        <span class="bstash-title">${item.title}</span>
                    </a>
                    <img class="bstash-trash-icon" src="./assets/trash.svg" data-stash-id="${item.id}" />
                </li>
            `);
        });
        $ul.html(listHTML.join(''));
        // Make draggable //
        dropDownCleanUpFunc = slist($ul.get(0), () => {
            // $('#tester-span').text('dargg end');
            // dragAndDropCleanUp();
        });
    }
}

async function setArcTheme() {
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
    }
}

function setEvents() {
    // chrome.tabs.create({ url: newURL });
    function handleOnLinkClick(e) {
        e.preventDefault();
        openInNewTab(e.currentTarget.href);
    }
    async function handleOnDeleteItem(e) {
        const stashId = e.currentTarget.getAttribute('data-stash-id');
        if (!stashId) { return; }
        logThis({stashId})
        STASH = removeFromStash(STASH, stashId);
        await storageSet('stash', STASH);
        dropDownCleanUpFunc?.();
        populateList();
    }
    $ul
        .on('click', 'a', handleOnLinkClick)
        .on('click', 'img.bstash-trash-icon', handleOnDeleteItem);
}

(async () => {
    populateList();
    setArcTheme();
    setEvents();
})();