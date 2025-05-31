import { html } from "../lib/preact-htm.js";

/** @param {import("../types/types.d.ts").FooterControlsProps} props */
export default function FooterControls(props) {
    const sectionCountLimit = 30; // Users are only allowed 30 sections.
    const sectionCount = props?.sectionCount ?? 0;
	return html`
		<footer>
			<div class="bstash-footer-child" title="Stash current tab.">
				<img
					title="Add current tab to stash (shift + opt + s)"
					id="bstash-footer-add-tab-button"
					class="bstash-footer-control"
					src="./assets/add.svg"
					onClick=${(e) => {
						e.preventDefault();
						props?.onAddCurrentTabToStash?.();
					}}
				/>
			</div>
			<div id="bstash-msg-con" class="bstash-footer-child"></div>
			<div class="bstash-footer-child">
                ${(sectionCount <= sectionCountLimit )  ? html`
				<img
					id="bstash-section-button"
					class="bstash-footer-control"
					src="./assets/tag-outline.svg"
					onClick=${(e) => {
						e.preventDefault();
						props?.onSectionAddButtonClicked?.();
					}}
				/>
                ` : null}
				<img
					id="bstash-footer-settings-button"
					class="bstash-footer-control"
					src="./assets/settings.svg"
					onClick=${(e) => {
						e.preventDefault();
						props?.onToggleSettings?.();
					}}
				/>
			</div>
		</footer>
	`;
}
