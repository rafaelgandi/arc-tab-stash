/*
    Stash
    www.rafaelgandi.com
*/
import "./popup.styles.js";
import posthog from "./lib/posthog-js/dist/ph-full.js";
import "./lib/posthog-init.js";
import { storageSet, storageGet, removeFromStash, logThis, sendMessageToBg, getCurrentTabData, isValidJson, toggleStyleElement } from "./lib/helpers.js";
import * as api from "./lib/api.js";
import { html, render, useState, useCallback, useRef } from "./lib/preact-htm.js";
import SettingsModal from "./components/SettingsModal.js";
import Empty from "./components/Empty.js";
import useSfx from "./hooks/useSfx.js";
import StashLinkItem from "./components/StashLinkItem.js";
import FooterControls from "./components/FooterControls.js";
import useIsMountedRef from "./hooks/useIsMountedRef.js";

const $head = document.querySelector("head");
const $body = document.querySelector("body");

// LM: 2023-02-24 11:16:10 [Use scripting instead of messages for accessing active tabs colors]
async function getArcSpaceColors() {
	const tab = await getCurrentTabData();
	if (!tab) {
		return;
	}
	if (tab.url.startsWith("chrome://") || tab.url.startsWith("arc://")) {
		return;
	}
	// See: https://developer.chrome.com/docs/extensions/reference/scripting/#manifest
	const res = await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: () => {
			function getArcColor(name) {
				// return document.documentElement.style.getPropertyValue(name) ?? null;
				return window.getComputedStyle(document.documentElement).getPropertyValue(name) ?? null;
			}

			function getArcPalette() {
				return {
					arcPaletteTitle: getArcColor("--arc-palette-title"),
					arcBGSimpleColor: getArcColor("--arc-background-simple-color"),
					arcBGGradients: [
						getArcColor("--arc-background-gradient-color0"),
						getArcColor("--arc-background-gradient-color1"),
						getArcColor("--arc-background-gradient-color2"),
						getArcColor("--arc-background-gradient-overlay-color0"),
						getArcColor("--arc-background-gradient-overlay-color1"),
						getArcColor("--arc-background-gradient-overlay-color2")
					]
				};
			}
			return getArcPalette();
		}
	});
	return res?.[0]?.result;
}

async function setArcTheme(colors = null) {
	const response = !!colors ? colors : await getArcSpaceColors();

	if (response) {
		storageSet("arcColors", JSON.stringify(response)); // Save a copy of Arc's space color to reference when for some reason we can't get it.
		const arcBGGradients = response.arcBGGradients.filter((color) => !!color);
		if (arcBGGradients.length) {
			$body.style.background = `linear-gradient(140deg, ${arcBGGradients.join(", ")})`;
		} else {
			if (response.arcBGSimpleColor) {
				$body.style.background = response.arcBGSimpleColor;
			}
		}
		const $style = document.createElement("style");
		$style.textContent = `
            .bstash-list-con ul li a {color: ${response.arcPaletteTitle}}
            .bstash-empty-con div {color: ${response.arcPaletteTitle}}
        `;
		$head.appendChild($style);
		$body.classList.add("is-arc-browser");
	} else {
		const arcColors = await storageGet("arcColors");
		if (!!arcColors && isValidJson(arcColors)) {
			// console.log(arcColors, 'arc colors');
			setArcTheme(JSON.parse(arcColors));
		}
	}
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

function Stash() {
	const [stashArr, setStashArr] = useState([]);
	const [showSettings, setShowSettings] = useState(false);
	const [block, setBlock] = useState(false);
	const ulRef = useRef(null);
	const sortableRef = useRef(null);
	const isMountedRef = useIsMountedRef();
	const draggedChildItemsRef = useRef([]);

	const getFreshStashData = useCallback(async () => {
		isMountedRef.current && setStashArr(sortByOrderProp(await storageGet("stash")));
	}, [isMountedRef]);

	const getUpdatedListOrder = useCallback(() => {
		if (!ulRef.current) {
			return null;
		}
		const orderedList = [];
		ulRef.current.querySelectorAll("a[data-stash-id]").forEach((a, index) => {
			const parentLi = a.parentElement;
			orderedList.push({
				title: a.title,
				url: a.href,
				id: a.getAttribute("data-stash-id"),
				favIconUrl: a.getAttribute("data-stash-favicon"),
				order: index,
				section: parentLi.getAttribute("data-isSection") === "yes",
				sectionShow: parentLi.getAttribute("data-isShowSection") === "yes"
			});
		});
		return orderedList;
	}, []);

	const onAddCurrentTabToStash = useCallback(async () => {
		setBlock(true);
		posthog.capture("sh-button-was-used-for-stashing");
		await sendMessageToBg({
			message: "stash-current-tab"
		});
		await getFreshStashData();
		setBlock(false);
	}, [getFreshStashData]);

	const onToggleSettings = useCallback(() => {
		setShowSettings((prev) => !prev);
	}, []);

	const makeSectionId = useCallback(() => {
		return "sec-" + new Date().getTime().toString();
	}, []);

	const onSectionAddButtonClicked = useCallback(() => {
		setStashArr((prev) => {
			return [
				{
					url: "about:blank",
					title: "Untitled Section",
					id: makeSectionId(),
					favIconUrl: "",
					order: 0,
					section: true,
					sectionShow: true
				},
				...prev
			];
		});
	}, [makeSectionId]);

    const hideSectionContents = useCallback((sectionId, hide) => {
        toggleStyleElement(sectionId, hide, /* css */`
            li[data-myParentSectionId="${sectionId}"] {
                display: none !important;
            }
            li[data-sectionId="${sectionId}"] {
                & .section-toggle-icon {
                    transform: rotate(90deg) !important;
                }
            }
        `);    
    }, []);

    const _setListUpdated = useCallback(async (updatedList) => {
        await storageSet("stash", updatedList);
        setStashArr(updatedList);
        sendMessageToBg({
            message: "something-has-changed"
        });
    }, []);

    const onSectionToggle = useCallback(async (sectionId) => {
        const sectionElement = document.querySelector(`li[data-sectionId="${sectionId}"]`);
        if (!sectionElement) { return; }
        const isSectionShown = sectionElement.getAttribute('data-isShowSection') === 'yes';
        if (isSectionShown) {
            sectionElement.setAttribute('data-isShowSection', '');
        }
        else {
            sectionElement.setAttribute('data-isShowSection', 'yes');
        }
        hideSectionContents(sectionId, !isSectionShown);
        const newOrderedList = getUpdatedListOrder();
        _setListUpdated(newOrderedList);
    }, []);

    const onTitleEdit = useCallback(async (itemId, newTitle) => {
        // console.log(itemId, newTitle);
        const updatedStashArray = stashArr.map(item => {
            if (item.id === itemId) {
                return { ...item, title: newTitle };
            }
            return item;
        });
        _setListUpdated(updatedStashArray);
    }, [stashArr, _setListUpdated]);

	useSfx(async function init() {
		setArcTheme();
		await getFreshStashData(); // Show saved copy first.
		const gitCreds = await api.getGitCredsSaved();
		if (typeof gitCreds !== "undefined" && navigator.onLine) {
			const stashFromGist = await api.getGistContents(); // Make sure to query fresh data from github api
			if (!stashFromGist) {
				return;
			}
			await storageSet("stash", stashFromGist.stash);
			getFreshStashData();
		} else {
			// Show settings modal if notion integration is not set yet //
			setShowSettings(true);
		}
	}, false);

	useSfx(async function makeListSortable() {
		function ifSectionBeingDraggedDoThisToChildItems(e, callback) {
			// console.log(e.item, e.item?.getAttribute?.('data-isSection'));
			if (e.item?.getAttribute?.("data-isSection") === "yes" && e.item?.getAttribute?.("data-sectionId")) {
				const sectionId = e.item?.getAttribute?.("data-sectionId");
				const childItems = ulRef.current.querySelectorAll(`li[data-myParentSectionId="${sectionId}"]`);
				if (childItems.length) {
					// console.log(childItems);
					childItems.forEach((item) => {
						// Sortable.utils.select(item);
						callback(item);
					});
				}
			}
		}

		if (ulRef.current) {
			// See: https://github.com/SortableJS/Sortable
			const { Sortable } = await import("./lib/sortable.js");
			sortableRef.current = new Sortable(ulRef.current, {
				ghostClass: "drag-in-place",
				onStart(e) {
					ifSectionBeingDraggedDoThisToChildItems(e, (item) => {
						draggedChildItemsRef.current.push(item);
						item.remove();
					});
				},
				async onEnd(e) {
					const sectionElement = e.item;
                    if (e.item?.getAttribute?.("data-isSection") === "yes" && e.item?.getAttribute?.("data-sectionId")) {
                        if (draggedChildItemsRef.current.length) {
                            let sibling = sectionElement;
                            draggedChildItemsRef.current.forEach((childItem) => {
                                sibling.insertAdjacentElement("afterend", childItem);
                                sibling = childItem;
                            });
                        }
                        draggedChildItemsRef.current = [];
                    }
					
					const newOrderedList = getUpdatedListOrder();
					_setListUpdated(newOrderedList);
				}
			});
		}
	}, false);

	async function onStashItemDelete(stashId) {
		const updatedStashArray = removeFromStash(stashArr, stashId);
		_setListUpdated(updatedStashArray);
	}

	let parentSectionIdContainer = null;

	return html`
		<span id="tester-span"></span>
		<${Empty} show=${stashArr.length < 1} />
		<div class="bstash-list-con">
			<ul ref=${ulRef}>
				${stashArr.map((/** @type {import("./types/types.d.ts").StashItem} */ item, index) => {
					parentSectionIdContainer = !!item?.section ? item.id : parentSectionIdContainer;
                    if (!!item?.section) {
                        console.log(item.id, item.sectionShow);
                        hideSectionContents(item.id, item.sectionShow ? false : true);
                    }
					return html`
						<li
							key=${item.id}
							data-sectionId=${!!item?.section ? item.id : ""}
							data-isSection=${!!item?.section ? "yes" : ""}
							data-isShowSection=${!!item?.sectionShow ? "yes" : ""}
							data-myParentSectionId=${!item?.section && !!parentSectionIdContainer ? parentSectionIdContainer : "none"}
						>
							<${StashLinkItem} 
                                item=${item} 
                                onDelete=${onStashItemDelete} 
                                tabIndex=${index} 
                                onSectionToggle=${onSectionToggle}
                                onTitleEdit=${onTitleEdit}
                            />
						</li>
					`;
				})}
			</ul>
		</div>
		<${SettingsModal}
			show=${showSettings}
			onDidDismiss=${() => setShowSettings(false)}
			doBlock=${(b) => setBlock(b)}
			onTokenSaved=${() => getFreshStashData()}
		/>
		<${FooterControls}
			onAddCurrentTabToStash=${onAddCurrentTabToStash}
			onToggleSettings=${onToggleSettings}
			onSectionAddButtonClicked=${onSectionAddButtonClicked}
		/>
		<div id="bstash-blocker" class=${!block ? "hide" : ""}></div>
	`;
}

const main = document.getElementById("arc-bookmark-stash-main");
render(html`<${Stash} />`, main);
main.style.opacity = 1;

// LM: 2024-12-11 17:55:13 [Make sure the background.js script knows when the popup closes]
const port = chrome.runtime.connect({ name: "popup" });
window.addEventListener("unload", (e) => {
	port.disconnect();
});
