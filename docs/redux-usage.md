## Redux Usage in this Project

This application uses Redux Toolkit for state management and RTK Query for data fetching.

### Store Setup

File: `store/index.ts`

```ts
export const store = configureStore({
	reducer: {
		[packagesApi.reducerPath]: packagesApi.reducer, // RTK Query cache
		ui: uiReducer, // Local UI state
	},
	middleware: (getDefault) => getDefault().concat(packagesApi.middleware),
});
```

- The RTK Query reducer manages the API cache/state under the `packagesApi` slice key.
- The `ui` slice holds UI-specific state such as modal visibility and pagination.

### UI Slice

File: `store/slices/uiSlice.ts`

- `packagesModalOpen: boolean` — controls modal visibility
- `packagesPage: number` — current page
- `packagesPageSize: number` — items per page
- `selectedPackageId?: string | null` — currently selected package (reserved for future use)

Reducers:

- `openPackagesModal`, `closePackagesModal`
- `setPackagesPage`, `setPackagesPageSize`
- `setSelectedPackageId`

### Typed Hooks

File: `store/hooks.ts`

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Use these throughout components to access typed store and selectors.

### Provider Setup

File: `components/Providers.tsx`

```tsx
export function Providers({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}
```

Included in `app/layout.tsx` so Redux is available across the app.

### How Components Use Redux

Component: `components/PackagesModal.tsx`

- Reads UI state via `useAppSelector((s) => s.ui)` to know whether the modal is open and the current pagination settings.
- Dispatches UI actions to open/close modal and update pagination.
- Uses `useGetPackagesQuery` from RTK Query to fetch data. The hook is skipped until `packagesModalOpen` is true, so data loads only when the modal is visible.
- Persists pagination preferences using `localStorage` (via `lib/safeStorage`).

Typical interactions:

1. User clicks “Ver paquetes” → component sets `open` prop to true.
2. Effect syncs `open` with the `ui` slice → `openPackagesModal()`.
3. Query runs; loading state renders skeletons.
4. On page size change → dispatch `setPackagesPageSize(size)` and compute a new page; persist to storage.
5. On close (header “Cerrar” or onCancel) → dispatch `closePackagesModal()` and call parent `onClose()`.

### Cache Management

- RTK Query cache is reset on page unload via `lib/cacheCleanup.ts` (listens for `beforeunload`).
- UI pagination preferences are cleared in the same cleanup.

### Testing

- Integration tests mock `useGetPackagesQuery` and verify loading, error, empty, and storage persistence flows (`tests/PackagesModal.integration.test.tsx`).
- Transform response tests validate `parsePackagesResponse` behavior.
