import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Mock store hooks used by the component.
// We return a stable UI slice so the modal is considered open during tests.
vi.mock("@/store/hooks", () => ({
	useAppDispatch: () => vi.fn(),
	useAppSelector: (fn: any) => fn({ ui: { packagesModalOpen: true, packagesPage: 1, packagesPageSize: 4 } }),
}));

// Prepare a mock refetch function to assert retry behavior when errors occur
const mockRefetch = vi.fn();

// We'll mock the useGetPackagesQuery hook to return controlled states per test.
// Each test sets the desired return shape (loading, error, or data).
const mockUseGetPackagesQuery = vi.fn();
vi.mock("@/store/services/packagesApi", async () => {
	return {
		useGetPackagesQuery: (...args: any[]) => mockUseGetPackagesQuery(...args),
		useLazyGetPackagesQuery: () => [vi.fn(), vi.fn()],
	};
});

// Import the component after mocks
import PackagesModal from "@/components/PackagesModal";

describe("PackagesModal integration", () => {
	test("shows skeletons while loading", async () => {
		mockUseGetPackagesQuery.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			refetch: mockRefetch,
		});

		render(
			<PackagesModal
				open={true}
				onClose={() => {}}
			/>
		);

		// Expect skeleton elements rendered (Ant Design renders `.ant-skeleton`)
		await waitFor(() => {
			const skeletons = document.querySelectorAll(".ant-skeleton");
			expect(skeletons.length).toBeGreaterThan(0);
		});
	});

	test("shows error and retry calls refetch", async () => {
		mockRefetch.mockClear();
		mockUseGetPackagesQuery.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: { status: 500 },
			refetch: mockRefetch,
		});

		render(
			<PackagesModal
				open={true}
				onClose={() => {}}
			/>
		);

		// Assert error alert is shown and pressing "Reintentar" triggers refetch
		expect(await screen.findByText("Error al cargar los paquetes")).toBeInTheDocument();

		const retry = screen.getByRole("button", { name: /reintentar/i });
		userEvent.click(retry);
		await waitFor(() => {
			expect(mockRefetch).toHaveBeenCalled();
		});
	});

	test("shows empty state when no packages", async () => {
		mockUseGetPackagesQuery.mockReturnValue({
			data: { data: [], total: 0 },
			isLoading: false,
			error: undefined,
			refetch: mockRefetch,
		});

		render(
			<PackagesModal
				open={true}
				onClose={() => {}}
			/>
		);

		expect(await screen.findByText("No hay paquetes disponibles")).toBeInTheDocument();
	});

	test("page size change dispatches and updates storage", async () => {
		// Spy on safeStorage to assert persistence of page size
		const { default: safeStorage } = await import("@/lib/safeStorage");
		const setSpy = vi.spyOn(safeStorage, "setItem");

		mockUseGetPackagesQuery.mockReturnValue({
			data: { data: [{ id: "1", name: "One" }], total: 1 },
			isLoading: false,
			error: undefined,
			refetch: mockRefetch,
		});

		render(
			<PackagesModal
				open={true}
				onClose={() => {}}
			/>
		);

		// Change page size select to 8 → should update storage
		const select = await screen.findByLabelText("Elementos por página:");
		userEvent.selectOptions(select, "8");

		await waitFor(() => {
			expect(setSpy).toHaveBeenCalled();
		});

		setSpy.mockRestore();
	});
});
