import { html } from "../lib/preact-htm.js";

function ensureGlassDistortionFilter() {
	// Check if the filter already exists in the document
	if (document.getElementById("frosted")) {
		return;
	}

	// Create the SVG element with the filter
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.style.display = "none";
	svg.style.position = "absolute";
	svg.setAttribute("width", "0");
	svg.setAttribute("height", "0");

	svg.innerHTML = `
        <defs>
            <filter id="frosted" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.007 0.007" numOctaves="2" seed="92" result="noise"></feTurbulence>
                <feGaussianBlur in="noise" stdDeviation="2" result="blurred"></feGaussianBlur>
                <feDisplacementMap in="SourceGraphic" in2="blurred" scale="51" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
            </filter>
        </defs>
	`;

	// Append to document body
	document.body.appendChild(svg);
}

// See: https://github.com/archisvaze/liquid-glass?tab=readme-ov-file
// See: https://liquid-glass-eta.vercel.app

export default function LiquidGlassContainer(props) {
	const { className = "", children, blurAmount = 3, ...rest } = props;

	// Ensure the SVG filter exists in the document
	if (typeof document !== "undefined") {
		ensureGlassDistortionFilter();
	}

	return html`
		<div class="liquidGlass-container ${className}" ...${rest}>
			<style>
				.liquidGlass-container {
					position: relative;
                    /* box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5); */
				}
                .liquidGlass-container:before {
                    content: '';
                    position: absolute;
					z-index: 0;
					inset: 0;
					backdrop-filter: blur(${blurAmount}px);
                    filter:url(#frosted);
					overflow: hidden;
					isolation: isolate;
                }
				.liquidGlass-content {
					position: relative;
					z-index: 3;
					padding: 0;
					margin: 0;
					background: transparent;
				}
			</style>
			<div class="liquidGlass-content">${children}</div>
		</div>
	`;
}
