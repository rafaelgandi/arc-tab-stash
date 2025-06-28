import { html } from "../lib/preact-htm.js";
import LiquidGlassContainer from "./LiquidGlassContainer.js";

/** @param {import("../types/types.d.ts").FooterControlsProps} props */
export default function FooterControls(props) {
    const sectionCountLimit = 30; // Users are only allowed 30 sections.
    const sectionCount = props?.sectionCount ?? 0;

	return html`
    <${LiquidGlassContainer} 
        blurAmount=${5} 
        className="bstash-footer-liquid-glass-container"
    >
		<footer>
			<div class="bstash-footer-child" title="Stash current tab.">
				<img
					title="Add current tab to your Stash (shift + opt + s)"
					id="bstash-footer-add-tab-button"
					class="bstash-footer-control"
					src="./assets/add.svg"
					onClick=${(e) => {
						e.preventDefault();
						props?.onAddCurrentTabToStash?.();
					}}
				/>
			</div>
			<div id="bstash-msg-con" class="bstash-footer-child">
				${props?.loadingMessage && html`
					<span style=${{
						fontSize: '0.7rem', 
						opacity: 0.6, 
						fontStyle: 'italic'
					}}>
						${props.loadingMessage}
					</span>
				`}
			</div>
			<div class="bstash-footer-child">
                ${(sectionCount <= sectionCountLimit )  ? html`
				<img
					id="bstash-section-button"
					class="bstash-footer-control"					
					src="./assets/header.png"
                    title="Add New Heading"
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
					title="Settings"
					onClick=${(e) => {
						e.preventDefault();
						props?.onToggleSettings?.();
					}}
				/>
			</div>
		</footer>
    </LiquidGlassContainer>
	`;
}
