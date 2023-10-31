
import { html } from '../lib/preact-htm.js';
import { openInNewTab } from '../lib/helpers.js';

/**
 * @typedef {import("../types/types.d.ts").StashItem} StashItem
 * 
 * @param {{item: StashItem, onDelete: Function | undefined}} props 
 */
export default function StashLinkItem(props) {
    const { item } = props;

    function handleOnLinkClick(e) {
        e.preventDefault();
        openInNewTab(e.currentTarget.href);
    }

    async function handleOnDeleteItem(e) {
        const stashId = e.currentTarget.getAttribute('data-stash-id');
        if (!stashId) { return; }
        props?.onDelete?.(stashId)
    }

    function onTrashIconHover(e) {
        // logThis([e])
        if (e.currentTarget.src.indexOf('-open') === -1) {
            e.currentTarget.src = './assets/trash-open.svg';
            return;
        }
        e.currentTarget.src = './assets/trash.svg';
    }

    return html`
         <a 
            href="${item.url}" 
            title="${item.title}"
            data-stash-id="${item.id}" 
            data-stash-order="${item?.order ?? ''}"
            data-stash-favicon="${item.favIconUrl}"
            draggable="false"
            onClick=${handleOnLinkClick}
        >
            <img src="${item.favIconUrl}" />
            <span class="bstash-title">${item.title}</span>
        </a>
        <img 
            class="bstash-trash-icon" 
            src="./assets/trash.svg" 
            data-stash-id="${item.id}" 
            onClick=${handleOnDeleteItem}
            onMouseOver=${onTrashIconHover}
            onMouseOut=${onTrashIconHover}
        />
    `;
}