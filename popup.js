/*
    Stash
    www.rafaelgandi.com
*/
import "./popup.styles.js";
import "./lib/posthog-init.js";
import * as analytics from "./lib/analytics.js";
import { storageSet, storageGet, logThis, sendMessageToBg, toggleStyleElement, guard } from "./lib/helpers.js";
import * as api from "./lib/api.js";
import { html, render, useState, useCallback, useRef, useMemo } from "./lib/preact-htm.js";
import SettingsModal from "./components/SettingsModal.js";
import Empty from "./components/Empty.js";
import useSfx from "./hooks/useSfx.js";
import StashLinkItem from "./components/StashLinkItem.js";
import FooterControls from "./components/FooterControls.js";
import useIsMountedRef from "./hooks/useIsMountedRef.js";
import setUpAuGlobalErrorLogger from "./lib/global-error-logger.js";
import LiquidGlassContainer from "./components/LiquidGlassContainer.js";

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
	const sectionCount = useMemo(() => {
		return stashArr.filter((item) => !!item?.section).length;
	}, [stashArr]);

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
		const { error } = await guard(async () => {
			analytics.capture("sh-button-was-used-for-stashing");
			await sendMessageToBg({
				message: "stash-current-tab"
			});
			await getFreshStashData();
            document.querySelector("main").scrollTo({
				top: 0,
				behavior: "smooth",
				duration: 1000 // Add 800ms duration for smoother scroll
			});
		});
		if (error) {
			console.error(error);
			analytics.capture("sh-error", {
				message: error?.message ?? "Error adding current tab to stash",
				source: "onAddCurrentTabToStash"
			});
		}
		setBlock(false);
	}, [getFreshStashData]);

	const onToggleSettings = useCallback(() => {
		setShowSettings((prev) => !prev);
	}, []);

	const makeSectionId = useCallback(() => {
		return "sec-" + new Date().getTime().toString();
	}, []);

	const onSectionAddButtonClicked = useCallback(() => {
		analytics.capture("sh-section-add-button-clicked");
		const newSectionId = makeSectionId();
		setStashArr((prev) => {
			return [
				...prev,
				{
					url: "about:blank",
					title: "Untitled Heading",
					id: newSectionId,
					favIconUrl: "",
					order: prev.length,
					section: true,
					sectionShow: true
				}
			];
		});
		// Scroll to bottom smoothly after adding section
		setTimeout(() => {
			document.querySelector("main").scrollTo({
				top: document.querySelector("main").scrollHeight,
				behavior: "smooth",
				duration: 1000 // Add 800ms duration for smoother scroll
			});
			// Trigger double click on the newly added section title
			const lastSection = document.querySelector('li[data-sectionId="' + newSectionId + '"] .bstash-title');
			if (lastSection) {
				lastSection.dispatchEvent(
					new MouseEvent("dblclick", {
						bubbles: true,
						cancelable: true
					})
				);
				// Add animation to the newly added section so user can notice it //
				const li = document.querySelector('li[data-sectionId="' + newSectionId + '"]');
				if (li) {
					li.classList.add("animate__animated", "animate__jackInTheBox");
					setTimeout(() => {
						li.classList.remove("animate__animated", "animate__jackInTheBox");
					}, 2000);
				}
			}
		}, 400);
	}, [makeSectionId]);

	const hideSectionContents = useCallback((sectionId, hide) => {
		toggleStyleElement(
			sectionId,
			hide,
			/* css */ `
            li[data-myParentSectionId="${sectionId}"] {
                display: none !important;
            }
            li[data-sectionId="${sectionId}"] {
                & .section-toggle-icon {
                    transform: rotate(90deg) !important;
                }
            }
        `
		);
	}, []);

	const _setListUpdated = useCallback(async (updatedList) => {
		await storageSet("stash", updatedList);
		setStashArr(updatedList);
		sendMessageToBg({
			message: "something-has-changed"
		});
	}, []);

	const onSectionToggle = useCallback(
		async (sectionId) => {
			const sectionElement = document.querySelector(`li[data-sectionId="${sectionId}"]`);
			if (!sectionElement) {
				return;
			}
			const isSectionShown = sectionElement.getAttribute("data-isShowSection") === "yes";
			if (isSectionShown) {
				sectionElement.setAttribute("data-isShowSection", "");
			} else {
				sectionElement.setAttribute("data-isShowSection", "yes");
			}
			hideSectionContents(sectionId, !isSectionShown);
			const newOrderedList = getUpdatedListOrder();
			_setListUpdated(newOrderedList);
		},
		[hideSectionContents, getUpdatedListOrder, _setListUpdated]
	);

	const onTitleEdit = useCallback(
		async (itemId, newTitle) => {
			// console.log(itemId, newTitle);
			const updatedStashArray = stashArr.map((item) => {
				if (item.id === itemId) {
					return { ...item, title: newTitle };
				}
				return item;
			});
			analytics.capture("sh-stash-section-title-edited", {
				"section title": newTitle
			});
			_setListUpdated(updatedStashArray);
		},
		[stashArr, _setListUpdated]
	);

	useSfx(async function init() {
		await getFreshStashData();
		const gitCreds = await api.getGitCredsSaved();
		if (typeof gitCreds !== "undefined" && navigator.onLine) {
			if (gitCreds?.tokenEncrypted) {
				analytics.identify(gitCreds.tokenEncrypted);
			}
			const stashFromGist = await api.getGistContents();
			if (!stashFromGist) {
				return;
			}
			await storageSet("stash", stashFromGist.stash);
			if (isMountedRef.current) {
				getFreshStashData();
			}
		} else {
			if (isMountedRef.current) {
				setShowSettings(true);
			}
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
			// const { Sortable } = await import("./lib/sortable.js");
			const { default: Sortable } = await import("./lib/sortable.complete.esm.1.15.6.js");
			sortableRef.current = new Sortable(ulRef.current, {
				ghostClass: "drag-in-place",
				dragClass: "item-currently-dragging",
				// Delay before drag starts (prevents accidental dragging on click)
				delay: 200, // delay before drag starts
				// Auto-scroll configuration for better UX with long lists
				scroll: true, // Explicitly specify scroll container
				forceAutoScrollFallback: true, // Force fallback mode for better compatibility
				scrollSensitivity: 20, // Reduced sensitivity for easier triggering
				scrollSpeed: 20, // Increased speed for more noticeable effect
				bubbleScroll: true,
				emptyInsertThreshold: 5, // Allow insertion in empty areas
				onStart(e) {
					try {
						ifSectionBeingDraggedDoThisToChildItems(e, (item) => {
							draggedChildItemsRef.current.push(item);
							item.remove();
						});
					} catch (err) {
						draggedChildItemsRef.current = []; // Cleanup on error
						throw err;
					}
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

	const onStashItemDelete = useCallback(
		async (stashId) => {
			// const updatedStashArray = stashArr.filter((item) => !(item.id.toString() === stashId));
			// console.log(updatedStashArray, 'updatedStashArray');
			// _setListUpdated(updatedStashArray);
			let isRegularStashItem = false;
			for (let item of stashArr) {
				if (item.id.toString() === stashId) {
					if (!item?.section) {
						isRegularStashItem = true;
						break;
					}
				}
			}
			if (isRegularStashItem) {
				const updatedStashArray = stashArr.filter((item) => !(item.id.toString() === stashId));
				_setListUpdated(updatedStashArray);
				return;
			}
			// For section deletion //
			let isSectionItem = false;
			const sectionItems = [];
			for (let item of stashArr) {
				if (item.id.toString() === stashId) {
					isSectionItem = true;
					continue;
				}
				if (!item?.section && isSectionItem) {
					sectionItems.push(item);
				} else {
					isSectionItem = false;
				}
			}
			const sectionItemIds = sectionItems.map((item) => item.id);
			let updatedStashArray = stashArr.filter((item) => !sectionItemIds.includes(item.id));
			updatedStashArray = updatedStashArray.filter((item) => item.id.toString() !== stashId);
			updatedStashArray = [...sectionItems, ...updatedStashArray];
			setStashArr(updatedStashArray); // Update the dom first by rerendering the list.
			requestAnimationFrame(() => {
				const stashOrderedArrayFromDOM = getUpdatedListOrder(); // gets the list in correct order from the dom.
				_setListUpdated(stashOrderedArrayFromDOM);
			});
		},
		[stashArr, _setListUpdated, getUpdatedListOrder]
	);

	let parentSectionIdContainer = null;

	return html`
		<span id="tester-span"></span>
		${!stashArr.length && html`<${Empty} />`}
		<div class=${`bstash-list-con`} style=${{pointerEvents: (showSettings) ? "none" : "auto" }}>
			<ul ref=${ulRef}>
				${stashArr.map((/** @type {import("./types/types.d.ts").StashItem} */ item, index) => {
					parentSectionIdContainer = !!item?.section ? item.id : parentSectionIdContainer;
					if (!!item?.section) {
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
			sectionCount=${sectionCount}
		/>
		<div id="bstash-blocker" class=${!block ? "hide" : ""}></div>
	`;
}

const main = document.getElementById("arc-bookmark-stash-main");
render(html`<${Stash} />`, main);
main.style.opacity = 1;

// LM: 2025-06-03 15:46:10 [Set up global error logger]
setUpAuGlobalErrorLogger();

// LM: 2024-12-11 17:55:13 [Make sure the background.js script knows when the popup closes]
const port = chrome.runtime.connect({ name: "popup" });
window.addEventListener("unload", (e) => {
	port.disconnect();
});
