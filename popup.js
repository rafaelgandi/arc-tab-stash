
import { 
    sendMessageToActiveTab, 
    storageSet, 
    storageGet, 
    openInNewTab, 
    removeFromStash, 
    logThis,
    sendMessageToBg
} from './lib/helpers.js';

const $body = $('body');
const $head = $('head');
const $ul = $('.bstash-list-con ul');
const $addCurrentPageButton = $('#bstash-footer-add-tab-button');
const $emptyListMessage = $('.bstash-empty-con');
let dropDownCleanUpFunc = undefined;
let STASH = [];

function sortByOrderProp(arr) {
    let newArr = [...arr];
    newArr.sort((a, b) => {
        if (Number(a.order) < Number(b.order)) {
            return -1;
        }
        if (Number(a.order) > Number(b.order)) {
            return 1;
        }
        return 0;
    });
    return newArr;
}

function getUpdatedListOrder() {
    return $ul.find('a[data-stash-id]').get().map((a, index) => {
        return {
            title: a.title,
            url: a.href,
            id: a.getAttribute('data-stash-id'),
            favIconUrl: a.getAttribute('data-stash-favicon'),
            order: index
        };
    });
}

async function populateList() {
    STASH = await storageGet('stash');
    // $('#tester-span').text(STASH.length + '====');
    // logThis({STASH});
    if (STASH && STASH.length) {
        $emptyListMessage.addClass('hide');
        let listHTML = [];
        const orderedList = sortByOrderProp(STASH);
        orderedList.forEach((item) => {
            if (!item) { return; }
            listHTML.push(/*html*/ `
                 <li>
                    <a 
                        href="${item.url}" 
                        title="${item.title}"
                        data-stash-id="${item.id}" 
                        data-stash-order="${item?.order ?? ''}"
                        data-stash-favicon="${item.favIconUrl}"
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
        dropDownCleanUpFunc = slist($ul.get(0), async () => {
            STASH = getUpdatedListOrder();
            await storageSet('stash', STASH);
            refreshList();
        });
    }
    else {
        $emptyListMessage.removeClass('hide');
        $ul.html('');
    }
}

async function refreshList() {
    dropDownCleanUpFunc?.();
    return await populateList();
}

async function setArcTheme() {
    // logThis(['theme requested...']);
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
        $style.text(`
            .bstash-list-con ul li a {color: ${response.arcPaletteTitle}}
            .bstash-empty-con div {color: ${response.arcPaletteTitle}}
        `);
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
        //logThis({stashId})
        STASH = removeFromStash(STASH, stashId);
        await storageSet('stash', STASH);
        refreshList();
    }

    async function onAddCurrentTab(e) {
        e.preventDefault();
        // logThis(['clicked add tab']);
        await sendMessageToBg({
            message: 'stash-current-tab'
        });
        refreshList();
    }
    $ul
        .on('click', 'a', handleOnLinkClick)
        .on('click', 'img.bstash-trash-icon', handleOnDeleteItem);
    $addCurrentPageButton.on('click', onAddCurrentTab);
}

(async () => {
    populateList();
    setArcTheme();
    setEvents();
})();