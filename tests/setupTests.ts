/**
 * Global test setup for Vitest + Testing Library.
 *
 * - Extends `expect` with jest-dom matchers for richer assertions
 * - Adds a minimal `window.matchMedia` polyfill so components and Ant Design
 *   that query media features do not crash under jsdom
 *
 * Keep this file lean; it is executed before every test file.
 */
import "@testing-library/jest-dom";

// Minimal matchMedia polyfill for components that may use it
// Ant Design and some responsive components expect this API to exist
if (typeof window !== "undefined" && !("matchMedia" in window)) {
	Object.defineProperty(window, "matchMedia", {
		value: (query: string) => ({
			// emulate a non-matching media query by default
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}),
	});
}
