import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface defining the UI state structure
interface UIState {
	packagesModalOpen: boolean; // Controls visibility of packages modal
	packagesPage: number; // Current page number for pagination
	packagesPageSize: number; // Number of items per page
	selectedPackageId?: string | null; // Currently selected package ID
}

// Initial state for UI slice
const initialState: UIState = {
	packagesModalOpen: false, // Modal starts closed
	packagesPage: 1, // Start on first page
	packagesPageSize: 4, // Default 4 items per page
	selectedPackageId: null, // No package selected initially
};

// Redux slice for UI state management
const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		// Open the packages modal
		openPackagesModal(state) {
			state.packagesModalOpen = true;
		},
		// Close the packages modal
		closePackagesModal(state) {
			state.packagesModalOpen = false;
		},
		// Set the current page number for pagination
		setPackagesPage(state, action: PayloadAction<number>) {
			state.packagesPage = action.payload;
		},
		// Set the number of items per page
		setPackagesPageSize(state, action: PayloadAction<number>) {
			state.packagesPageSize = action.payload;
		},
		// Set the currently selected package ID
		setSelectedPackageId(state, action: PayloadAction<string | null>) {
			state.selectedPackageId = action.payload;
		},
	},
});

export const { openPackagesModal, closePackagesModal, setPackagesPage, setPackagesPageSize, setSelectedPackageId } =
	uiSlice.actions;

export default uiSlice.reducer;
