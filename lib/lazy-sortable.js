// PHASE 3: Shared lazy sortable loader
// This module provides a single loadSortable function for efficient sortable loading

let sortableLoaded = false;
let sortableModule = null;

export async function loadSortable() {
	if (!sortableLoaded) {
		try {
			// Load the sortable library on demand
			sortableModule = await import("./sortable.complete.esm.1.15.6.js");
			sortableLoaded = true;
		} catch (error) {
			console.error('Sortable loading error:', error);
			// Return mock sortable to prevent crashes
			sortableModule = {
				default: class MockSortable {
					constructor() {
						console.warn('Sortable failed to load, drag and drop disabled');
					}
					destroy() {}
				}
			};
		}
	}
	return sortableModule;
}

// Check if sortable is already loaded (useful for conditional loading)
export function isSortableLoaded() {
	return sortableLoaded;
}

// Export default for convenience
export default loadSortable; 