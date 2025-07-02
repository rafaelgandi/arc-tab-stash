/*
    Stash
    www.rafaelgandi.com
*/
import "./popup.styles.js";
// PHASE 2: Defer analytics loading - remove synchronous imports
// import "./lib/posthog-init.js";
// import * as analytics from "./lib/analytics.js";
import { storageSet, storageGet, logThis, sendMessageToBg, toggleStyleElement, guard, isFirefoxBasedBrowser } from "./lib/helpers.js";
import { runtime as browserRuntime } from "./lib/browser-api.js";
import * as api from "./lib/api.js";
import { html, render, useState, useCallback, useRef, useMemo } from "./lib/preact-htm.js";
import SettingsModal from "./components/SettingsModal.js";
import Empty from "./components/Empty.js";
import useSfx from "./hooks/useSfx.js";
import StashLinkItem from "./components/StashLinkItem.js";
import FooterControls from "./components/FooterControls.js";
import useIsMountedRef from "./hooks/useIsMountedRef.js";
import setUpAuGlobalErrorLogger from "./lib/global-error-logger.js";

// Detect Firefox and add class to body
function detectFirefoxBrowserAndAddClass() {
	const isFirefox = isFirefoxBasedBrowser();
	if (isFirefox) {
		document.body.classList.add('firefox');
	}
}

// Initialize browser detection
detectFirefoxBrowserAndAddClass();

// PHASE 2: Import shared lazy analytics loader
import { loadAnalytics } from "./lib/lazy-analytics.js";
// PHASE 3: Import shared lazy sortable loader
import { loadSortable, isSortableLoaded } from "./lib/lazy-sortable.js";

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
	const [isInitialLoading, setIsInitialLoading] = useState(true); // PHASE 1: Track initial loading state
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
			// PHASE 2: Load analytics on demand
			const analytics = await loadAnalytics();
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
			// PHASE 2: Load analytics on demand for error tracking
			const analytics = await loadAnalytics();
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

	const onSectionAddButtonClicked = useCallback(async () => {
		// PHASE 2: Load analytics on demand
		const analytics = await loadAnalytics();
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
			// PHASE 2: Load analytics on demand
			const analytics = await loadAnalytics();
			analytics.capture("sh-stash-section-title-edited", {
				"section title": newTitle
			});
			_setListUpdated(updatedStashArray);
		},
		[stashArr, _setListUpdated]
	);

	// PHASE 1: Show cached data immediately for quick link access
	useSfx(async function showCachedDataFirst() {
		// Load local data immediately - this is the critical path for quick link access
		await getFreshStashData();
		setIsInitialLoading(false); // Mark initial loading as complete
	}, false);

	// PHASE 1: Background cloud sync (non-blocking)
	useSfx(async function backgroundCloudSync() {
		// Defer cloud sync to not block UI - use setTimeout to ensure UI renders first
		setTimeout(async () => {
			try {
				const gitCreds = await api.getGitCredsSaved();
				if (typeof gitCreds !== "undefined" && navigator.onLine) {
					if (gitCreds?.tokenEncrypted) {
						// PHASE 2: Load analytics on demand for user identification
						const analytics = await loadAnalytics();
						analytics.identify(gitCreds.tokenEncrypted);
					}
					const stashFromGist = await api.getGistContents();
					if (!stashFromGist) {
						return;
					}
					await storageSet("stash", stashFromGist.stash);
					if (isMountedRef.current) {
						// Update UI with fresh cloud data
						setStashArr(sortByOrderProp(stashFromGist.stash));
					}
				} else {
					if (isMountedRef.current) {
						setShowSettings(true);
					}
				}
			} catch (error) {
				console.error('Background sync error:', error);
				// Don't block UI for sync errors
			}
		}, 50); // Small delay to ensure UI renders first
	}, false);

	// PHASE 3: Smart sortable loading - only when needed and optimized
	const sortableLoadingRef = useRef(false);
	const [isSortableReady, setIsSortableReady] = useState(false);

	// PHASE 3: Determine if sortable is actually needed
	const needsSortable = useMemo(() => {
		return stashArr.length > 1; // Only load if there's more than 1 item to sort
	}, [stashArr.length]);

	// Helper function to get current loading message
	const getLoadingMessage = useCallback(() => {
		if (needsSortable && !isSortableReady) {
			return "Drag & drop loading...";
		}
		// Future loading states can be added here:
		// if (isCloudSyncing) return "Syncing with cloud...";
		// if (isAnalyticsLoading) return "Initializing analytics...";
		return null;
	}, [needsSortable, isSortableReady]);

	// PHASE 3: Preload sortable during idle time when it's likely to be needed
	useSfx(async function preloadSortableWhenNeeded() {
		if (needsSortable && !isSortableLoaded() && !sortableLoadingRef.current) {
			sortableLoadingRef.current = true;
			
			// Use requestIdleCallback with longer timeout for true background loading
			const preloadSortable = async () => {
				try {
					// Preload the library but don't initialize yet
					await loadSortable();
				} catch (error) {
					console.error('Sortable preload error:', error);
				} finally {
					sortableLoadingRef.current = false;
				}
			};

			// Use requestIdleCallback with long timeout for true background loading
			if (typeof requestIdleCallback !== 'undefined') {
				requestIdleCallback(preloadSortable, { timeout: 2000 });
			} else {
				// Longer delay for setTimeout fallback to ensure UI is fully ready
				setTimeout(preloadSortable, 500);
			}
		}
	});

	// PHASE 3: Initialize sortable only when library is loaded and needed
	useSfx(async function initializeSortable() {
		if (!needsSortable || !isSortableLoaded() || !ulRef.current || sortableRef.current) {
			return; // Don't initialize if not needed, not loaded, no DOM ref, or already initialized
		}

		function ifSectionBeingDraggedDoThisToChildItems(e, callback) {
			if (e.item?.getAttribute?.("data-isSection") === "yes" && e.item?.getAttribute?.("data-sectionId")) {
				const sectionId = e.item?.getAttribute?.("data-sectionId");
				const childItems = ulRef.current.querySelectorAll(`li[data-myParentSectionId="${sectionId}"]`);
				if (childItems.length) {
					childItems.forEach((item) => {
						callback(item);
					});
				}
			}
		}

		try {
			// Library is already loaded, just get the reference
			const { default: Sortable } = await loadSortable();
			
			sortableRef.current = new Sortable(ulRef.current, {
				ghostClass: "drag-in-place",
				dragClass: "item-currently-dragging",
				delay: 110, // Delay before drag starts (prevents accidental dragging on click)
				// PHASE 3: Optimized scroll configuration
				scroll: true,
				forceAutoScrollFallback: true,
				scrollSensitivity: 20,
				scrollSpeed: 20,
				bubbleScroll: true,
				emptyInsertThreshold: 5,
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
			
			// PHASE 3: Mark sortable as ready
			setIsSortableReady(true);
		} catch (error) {
			console.error('Sortable initialization error:', error);
		}
	}); 

	// PHASE 3: Cleanup sortable when no longer needed
	useSfx(async function cleanupSortableWhenNotNeeded() {
		if (!needsSortable && sortableRef.current) {
			try {
				sortableRef.current.destroy();
				sortableRef.current = null;
				setIsSortableReady(false);
			} catch (error) {
				console.error('Sortable cleanup error:', error);
			}
		}
	});

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
		${!stashArr.length && !isInitialLoading && html`<${Empty} />`}
		${!stashArr.length && isInitialLoading && html`
			<div class="bstash-loading-state">
				<div style=${{textAlign: 'center', padding: '2rem', opacity: 0.7}}>
					<div>Loading your stash...</div>
				</div>
			</div>
		`}
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
			loadingMessage=${getLoadingMessage()}
		/>
		<div id="bstash-blocker" class=${!block ? "hide" : ""}></div>
	`;
}

const main = document.getElementById("arc-bookmark-stash-main");
render(html`<${Stash} />`, main);
// PHASE 1: No need to set opacity - already visible in HTML

// LM: 2025-06-03 15:46:10 [Set up global error logger]
setUpAuGlobalErrorLogger();

// LM: 2024-12-11 17:55:13 [Make sure the background.js script knows when the popup closes]
	const port = browserRuntime.connect({ name: "popup" });
window.addEventListener("unload", (e) => {
	port.disconnect();
});
