
import { html, useState } from '../lib/preact-htm.js';
import { openInNewTab } from '../lib/helpers.js';
import useSfx from '../hooks/useSfx.js';
import posthog from '../lib/posthog-js/dist/ph-full.js';

const defaultFavicon = './assets/empty_favicon.ico';

/**
 * 
 * @param {import("../types/types.d.ts").StashLinkItemProps} props 
 */
export default function StashLinkItem(props) {
    const { item } = props;
    const [faviconPath, setFaviconPath] = useState(defaultFavicon);

    useSfx(function setProperFavicon() {
        if (item.favIconUrl) {  
            setFaviconPath(item.favIconUrl);             
            const img = new Image();
            img.src = item.favIconUrl;
            img.onerror = () => { // Make sure the favicon loads
                setFaviconPath(defaultFavicon);
            };
        }
    }, false);

    function handleOnLinkClick(e) {
        e.preventDefault();
        if (!!item?.section) {
            return;
        }
        openInNewTab(e.currentTarget.href);
        posthog.capture('sh-stash-link-opened');
    }

    async function handleOnDeleteItem(e) {
        const stashId = e.currentTarget.getAttribute('data-stash-id');
        if (!stashId) { return; }
        props?.onDelete?.(stashId);
        posthog.capture('sh-stash-link-deleted');
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
            data-stash-favicon=${item.favIconUrl}
            draggable="false"
            onClick=${handleOnLinkClick}
            tabIndex=${props?.tabIndex ?? 0}
        >
            
            ${(!item?.section) ? html`<img src=${faviconPath} />` : null}
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