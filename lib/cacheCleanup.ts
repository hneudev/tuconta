import { store } from "@/store";
import safeStorage from "./safeStorage";

/**
 * Clears all cached data when user leaves the site
 * This includes RTK Query cache and localStorage items
 */
export function clearAllCache() {
	try {
		// Clear RTK Query cache
		store.dispatch({ type: "packagesApi/util/resetApiState" });

		// Clear localStorage items
		const keysToRemove = ["tuconta:packagesPage", "tuconta:packagesPageSize", "tuconta:packagesSort"];

		keysToRemove.forEach((key) => {
			safeStorage.removeItem(key);
		});

		console.log("[Cache Cleanup] All cached data cleared successfully");
	} catch (error) {
		console.warn("[Cache Cleanup] Error clearing cache:", error);
	}
}

/**
 * Sets up event listeners for page unload events
 * Clears cache when user leaves the site
 */
export function setupCacheCleanup() {
	if (typeof window === "undefined") return;

	const cleanup = () => {
		clearAllCache();
	};

	// Clear cache when page is unloaded (user navigates away or closes tab)
	window.addEventListener("beforeunload", cleanup);

	console.log("[Cache Cleanup] Event listeners set up successfully");
}
