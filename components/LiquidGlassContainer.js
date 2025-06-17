import { html } from "../lib/preact-htm.js";

function ensureGlassDistortionFilter() {
	// Check if the filter already exists in the document
	if (document.getElementById('glass-distortion')) {
		return;
	}

	// Create the SVG element with the filter
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.style.display = 'none';
	svg.style.position = 'absolute';
	svg.setAttribute('width', '0');
	svg.setAttribute('height', '0');

	svg.innerHTML = `
		<defs>
			<filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
				<feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
				
				<feComponentTransfer in="turbulence" result="mapped">
					<feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
					<feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
					<feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
				</feComponentTransfer>

				<feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

				<feSpecularLighting
					in="softMap"
					surfaceScale="5"
					specularConstant="1"
					specularExponent="100"
					lighting-color="white"
					result="specLight"
				>
					<fePointLight x="-200" y="-200" z="300" />
				</feSpecularLighting>

				<feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />

				<feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
			</filter>
		</defs>
	`;

	// Append to document body
	document.body.appendChild(svg);
}

export default function LiquidGlassContainer(props) {
	const {
		className = "",
		children,
		...rest
	} = props;

	// Ensure the SVG filter exists in the document
	if (typeof document !== 'undefined') {
		ensureGlassDistortionFilter();
	}

	const filterId = `liquidGlass-${Math.random().toString(36).substr(2, 9)}`;

	return html`
		<div class="liquidGlass-container ${className}" ...${rest}>
			<div class="liquidGlass-effect"></div>
			<div class="liquidGlass-tint"></div>
			<div class="liquidGlass-shine"></div>

			<style>
				.liquidGlass-container {
                    position: relative;
                    
				}
				.liquidGlass-effect {
					position: absolute;
					z-index: 0;
					inset: 0;

					backdrop-filter: blur(3px);
					filter: url(#glass-distortion);
					overflow: hidden;
					isolation: isolate;
                    
				}

				.liquidGlass-tint {
					z-index: 1;
					position: absolute;
					inset: 0;
					background: rgba(255, 255, 255, 0.25);
				}

				.liquidGlass-shine {
					position: absolute;
					inset: 0;
					z-index: 2;

					overflow: hidden;

					box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
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
