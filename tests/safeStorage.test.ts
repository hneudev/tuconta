import safeStorage from "@/lib/safeStorage";

/**
 * Unit tests for the safeStorage utility.
 *
 * These tests verify the happy path under jsdom where `window.localStorage`
 * is available. Error/fallback behavior (e.g., SSR or storage exceptions)
 * is implicitly covered by returning null/false, but not exercised here to
 * keep the tests focused and fast.
 */

describe("safeStorage", () => {
	test("set/get/remove work when available", () => {
		// jsdom provides localStorage → exercise the normal flow
		safeStorage.setItem("test:key", "value");
		expect(safeStorage.getItem("test:key")).toBe("value");
		safeStorage.removeItem("test:key");
		expect(safeStorage.getItem("test:key")).toBeNull();
	});
});
