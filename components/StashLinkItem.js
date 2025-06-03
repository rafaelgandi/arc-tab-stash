import { html, useState, useRef, useEffect } from '../lib/preact-htm.js';
import { openInNewTab } from '../lib/helpers.js';
import useSfx from '../hooks/useSfx.js';
import useHighlightFade from '../hooks/useHighlightFade.js';
import Toggle from './Toggle.js';
import * as analytics from '../lib/analytics.js';

const defaultFavicon = './assets/empty_favicon.ico';

/**
 * 
 * @param {import("../types/types.d.ts").StashLinkItemProps} props 
 */
export default function StashLinkItem(props) {
    const { item, onSectionToggle } = props;
    const [faviconPath, setFaviconPath] = useState(defaultFavicon);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(item.title);
    const inputRef = useRef(null);
    const { triggerHighlight, getHighlightStyles } = useHighlightFade();

    useSfx(function setProperFavicon() {
        if (item.favIconUrl) {  
            setFaviconPath(item.favIconUrl);             
            const img = new Image();
            img.src = item.favIconUrl;
            img.onerror = () => { // Make sure the favicon loads
                setFaviconPath(defaultFavicon);
            };
            return () => {
                img.onerror = null;
                img.src = '';
            };
        }
    }, false);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    function handleOnLinkClick(e) {
        e.preventDefault();
        if (!!item?.section) {
            if (e.target.classList.contains('section-toggle-icon')) {
                e.preventDefault();
                e.stopPropagation();
                onSectionToggle?.(item.id, !item.sectionShow);
                return;
            }
            return;
        }
        openInNewTab(e.currentTarget.href);
        analytics.capture('sh-stash-link-opened');
    }

    async function handleOnDeleteItem(e) {
        const stashId = e.currentTarget.getAttribute('data-stash-id');
        if (!stashId) { return; }
        const parentElement = e.currentTarget.parentElement;
        if (parentElement && parentElement.tagName.toLowerCase() === 'li') {
            parentElement.classList.add('animate__animated', 'animate__fadeOutLeft', 'animate__faster');
            setTimeout(() => {
                props?.onDelete?.(stashId);
            }, 400);
        }
        else {
            props?.onDelete?.(stashId);
        }      
        analytics.capture('sh-stash-link-deleted');
    }

    function onTrashIconHover(e) {
        // logThis([e])
        if (e.currentTarget.src.indexOf('-open') === -1) {
            e.currentTarget.src = './assets/trash-open.svg';
            return;
        }
        e.currentTarget.src = './assets/trash.svg';
    }

    function handleTitleDoubleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
        setEditTitle(item.title);
    }

    function handleTitleInputBlur(e) {
        const newTitle = e.target.value.trim();
        setIsEditing(false);
        
        if (!newTitle) {
            // If empty, revert to original title
            setEditTitle(item.title);
            return;
        }
        
        if (newTitle !== item.title) {
            props?.onTitleEdit?.(item.id, newTitle);
            triggerHighlight(); // Trigger highlight effect
        }
    }

    function handleTitleInputKeyDown(e) {
        if (e.key === 'Enter') {
            const newTitle = e.target.value.trim();
            
            if (!newTitle) {
                // If empty, revert to original title and exit editing
                setEditTitle(item.title);
                setIsEditing(false);
                return;
            }
            
            e.target.blur(); // This will trigger the blur handler
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setEditTitle(item.title);
        }
    }

    function handleTitleInputChange(e) {
        setEditTitle(e.target.value);
    }

    return html`
         <a 
            href="${item.url}" 
            title="${item.title}"
            data-stash-id="${item.id}" 
            data-stash-order="${item.order ?? ''}"
            data-stash-favicon=${item.favIconUrl}
            draggable="false"
            onClick=${handleOnLinkClick}
            tabIndex=${props?.tabIndex ?? 0}
        >
            
            ${
                (!item?.section) 
                    ? html`<img src=${faviconPath} />` 
                    : html`
                    <${Toggle}
                        onClick=${() => {
                            onSectionToggle?.(item.id);
                        }} 
                    />`
            }
            ${
                isEditing 
                    ? html`<input 
                        ref=${inputRef}
                        class="bstash-title-input"
                        value=${editTitle}
                        onInput=${handleTitleInputChange}
                        onBlur=${handleTitleInputBlur}
                        onKeyDown=${handleTitleInputKeyDown}
                        spellCheck="false"
                    />`
                    : html`<span 
                        class="bstash-title" 
                        onDblClick=${handleTitleDoubleClick}
                        title="${(!item?.section) ? item.title : 'Double click to edit title.'}"
                        style=${getHighlightStyles()}
                    >${item.title}</span>`
            }
        </a>
        <img 
            class="bstash-trash-icon" 
            src="./assets/trash.svg" 
            data-stash-id="${item.id}" 
            onClick=${handleOnDeleteItem}
            onMouseOver=${onTrashIconHover}
            onMouseOut=${onTrashIconHover}
            title=${item.section ? 'Deletes heading title only. Items under this heading will not be deleted.' : 'Delete item'}
        />
    `;
}