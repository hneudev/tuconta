/**
 * Safely retrieves an item from localStorage
 * Handles SSR and localStorage unavailability gracefully
 * @param key - The storage key to retrieve
 * @returns The stored value or null if not found/unavailable
 */
export function getItem(key: string): string | null {
	try {
		if (typeof window === "undefined" || !window.localStorage) return null;
		return window.localStorage.getItem(key);
	} catch (e) {
		return null;
	}
}

/**
 * Safely stores an item in localStorage
 * Handles SSR and localStorage unavailability gracefully
 * @param key - The storage key
 * @param value - The value to store
 * @returns True if successful, false otherwise
 */
export function setItem(key: string, value: string): boolean {
	try {
		if (typeof window === "undefined" || !window.localStorage) return false;
		window.localStorage.setItem(key, value);
		return true;
	} catch (e) {
		return false;
	}
}

/**
 * Safely removes an item from localStorage
 * Handles SSR and localStorage unavailability gracefully
 * @param key - The storage key to remove
 * @returns True if successful, false otherwise
 */
export function removeItem(key: string): boolean {
	try {
		if (typeof window === "undefined" || !window.localStorage) return false;
		window.localStorage.removeItem(key);
		return true;
	} catch (e) {
		return false;
	}
}

export default {
	getItem,
	setItem,
	removeItem,
};
