## Data Fetching Dynamics

This project uses RTK Query (Redux Toolkit) to fetch and normalize data from a MockAPI backend.

### Overview

- Library: Redux Toolkit Query (RTK Query)
- Entry point: `store/services/packagesApi.ts`
- Consumer: `components/PackagesModal.tsx`
- Config: `lib/env.ts` via `NEXT_PUBLIC_PACKAGES_API`

### Endpoint Shape

Base URL is resolved via:

```ts
getPackagesApiUrl(); // from lib/env.ts
```

By default it points to a mock API. The packages query builds:

- Method: GET
- Path: `/lista-de-paquetes`
- Query params: `?page=<number>&limit=<number>`

### Query Definition

```ts
export const packagesApi = createApi({
	reducerPath: "packagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: getPackagesApiUrl() }),
	endpoints: (builder) => ({
		getPackages: builder.query<PackagesResponse, { page: number; limit: number }>({
			query: ({ page, limit }) => {
				const url = new URL("/lista-de-paquetes", getPackagesApiUrl());
				url.searchParams.append("page", String(page));
				url.searchParams.append("limit", String(limit));
				return { url: url.pathname + url.search, method: "GET", headers: { "content-type": "application/json" } };
			},
			transformResponse: (response: any) => parsePackagesResponse(response),
		}),
	}),
});
```

### Response Normalization

`parsePackagesResponse(response)` accepts common shapes and returns a consistent object:

```ts
{ data: Package[]; total: number }
```

Supported input shapes:

- `Package[]`
- `{ data: Package[] }`
- `{ items: Package[] }`
- `{ result: Package[] }`
- Generic object containing the first array-like property

If the response is null/unexpected, it returns `{ data: [], total: 100 }` (fallback total for pagination UI).

### When Queries Run

In `PackagesModal` the query is skipped until the modal is open:

```ts
useGetPackagesQuery({ page, limit }, { skip: !packagesModalOpen });
```

The `open` prop drives a UI slice flag (`packagesModalOpen`). When the modal opens:

- Pagination state is restored from `localStorage`
- Query is enabled and data is fetched
- On close, the modal flag is reset

### Caching & Re-fetch

- RTK Query caches responses in the Redux store (`packagesApi.reducer`)
- The cache lives for the session; we also clear cache on page unload via `lib/cacheCleanup.ts`
- Manual retry is supported via the `refetch()` function exposed by the hook

### Environment Configuration

Create `.env.local` at the project root:

```env
NEXT_PUBLIC_PACKAGES_API=https://<your-mockapi>.mockapi.io/api/v1/
```

Ensure that `GET /lista-de-paquetes` returns an array or one of the accepted shapes.

### UI Flow Summary

1. User clicks “Ver paquetes” → UI opens the modal
2. Modal mounts and enables the query (unless already cached)
3. Loading state shows skeletons
4. On success, cards render name, price and description
5. Pagination controls update query args and persist preferences
6. On error, an Alert allows retry via `refetch()`
