// PHASE 2: Shared lazy analytics loader
// This module provides a single loadAnalytics function that can be imported by all components

let analyticsLoaded = false;
let analyticsModule = null;

export async function loadAnalytics() {
	if (!analyticsLoaded) {
		try {
			// Load PostHog and analytics module on demand
			await import("./posthog-init.js");
			analyticsModule = await import("./analytics.js");
			analyticsLoaded = true;
		} catch (error) {
			console.error('Analytics loading error:', error);
			// Return mock analytics to prevent crashes
			analyticsModule = {
				capture: () => {},
				identify: () => {}
			};
		}
	}
	return analyticsModule;
}

// Export default for convenience
export default loadAnalytics; 