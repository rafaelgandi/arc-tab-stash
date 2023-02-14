
import {
    sendMessageToActiveTab,
    storageSet,
    storageGet,
    openInNewTab,
    removeFromStash,
    logThis,
    sendMessageToBg,
    sendErrorToast,
    getGitCredsSaved,
    sync
} from './lib/helpers.js';

const $body = $('body');
const $head = $('head');
const $ul = $('.bstash-list-con ul');
const $addCurrentPageButton = $('#bstash-footer-add-tab-button');
const $settingsButton = $('#bstash-footer-settings-button');
const $emptyListMessage = $('.bstash-empty-con');
const $settingsCon = $('.bstash-setting');
const $settingSaveButton = $('#bstash-settings-save-button');
const $manuallySyncButton = $('#bstash-footer-sync-button');
const $githubTokenInput = $('#bstash-setting-git-token-input');
// const $gistLinkInput = $('#bstash-setting-gist-link-input');
const $msgCon = $('#bstash-msg-con');
let dragAndDropCleanUpFunc = undefined;
let STASH = [];
let debouncer = undefined;

function toggleSettingsVisibility(show = false) {
    if (show) {
        $settingsCon.removeClass('hide-settings');
        return;
    }
    $settingsCon.addClass('hide-settings');
}

async function saveSettingDetails() {
    if ($githubTokenInput.val().trim() === '') { return; }
    const savedToken = await storageGet('gitToken');
    if (savedToken === $githubTokenInput.val().trim()) { return; }
    await storageSet('gitToken', $githubTokenInput.val().trim());
    await sendMessageToBg({ 
        message: 'make-stash-gist',
        data: {
            gitToken: $githubTokenInput.val().trim()
        } 
    });
    
}


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
        dragAndDropCleanUpFunc = slist($ul.get(0), async () => {
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
    dragAndDropCleanUpFunc?.();
    return await populateList();
}

async function setArcTheme() {
    const response = await sendMessageToActiveTab({
        message: 'get-arc-colors'
    });
    if (response) {
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
        $msgCon.text('Stashing...');
        await sendMessageToBg({
            message: 'stash-current-tab'
        });
        refreshList();
        $msgCon.text('');
    }
    function onSettingsButtonClicked() {
        toggleSettingsVisibility(true);
    }
    function onSettingSaved() {
        if ($githubTokenInput.val().trim() === '') { return; }
        clearTimeout(debouncer);
        debouncer = setTimeout(async () => {
            await saveSettingDetails();
            refreshList();
            toggleSettingsVisibility(false);
        }, 300);
    }
    function onManuallySync() {
        clearTimeout(debouncer);
        $manuallySyncButton.css('transform', 'rotate(270deg)');
        setTimeout(() => requestAnimationFrame(() => {
            $manuallySyncButton.get(0).style.cssText = '';
        }), 300)
        debouncer = setTimeout(async () => {
            $msgCon.text('Syncing...');
            await sendMessageToBg({ message: 'sync-stash-force' });
            refreshList();
            $msgCon.text('');
        }, 500)
    }
    $ul
        .on('click', 'a', handleOnLinkClick)
        .on('click', 'img.bstash-trash-icon', handleOnDeleteItem);
    $addCurrentPageButton.on('click', onAddCurrentTab);
    $settingsButton.on('click', onSettingsButtonClicked);
    $settingSaveButton.on('click', onSettingSaved);
    $manuallySyncButton.on('click', onManuallySync);
}


// main //
(async () => {
    chrome.runtime.connect({ name: "popup" });
    setArcTheme();
    await populateList();
    setEvents();
    const gitCreds = await getGitCredsSaved();
    if (typeof gitCreds !== 'undefined' && navigator.onLine) {
        $githubTokenInput.val(gitCreds.token);
        // $gistLinkInput.val(gitCreds.gist.link);
        $msgCon.text('Syncing...');
        await sync();
        refreshList();
        $msgCon.text('');
    }
    else {
        // Show settings modal if notion integration is not set yet //
        toggleSettingsVisibility(true);
    }
})();