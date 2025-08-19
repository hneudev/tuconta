import { parsePackagesResponse } from "@/store/services/packagesApi";

/**
 * Unit tests for `parsePackagesResponse`.
 *
 * This helper normalizes a variety of backend response shapes into a stable
 * `{ data, total }` object consumed by the UI. These tests document the
 * accepted input variants and the consistent output we expect.
 */

describe("parsePackagesResponse", () => {
	test("handles array response", () => {
		const input = [{ id: "1", name: "A" }];
		const out = parsePackagesResponse(input);
		expect(out).toEqual({ data: input, total: 100 });
	});

	test("handles {data: []} response", () => {
		const input = { data: [{ id: "2", name: "B" }] };
		const out = parsePackagesResponse(input);
		expect(out).toEqual({ data: input.data, total: 100 });
	});

	test("handles {items: []} response", () => {
		const input = { items: [{ id: "3", name: "C" }] };
		const out = parsePackagesResponse(input);
		expect(out).toEqual({ data: input.items, total: 100 });
	});

	test("handles null response", () => {
		const out = parsePackagesResponse(null);
		expect(out).toEqual({ data: [], total: 100 });
	});

	test("handles unexpected shape", () => {
		const input = { foo: "bar" };
		const out = parsePackagesResponse(input);
		expect(out).toEqual({ data: [], total: 100 });
	});
});
