import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getPackagesApiUrl } from "@/lib/env";

export interface Package {
	id: string;
	name: string;
	price: string;
	description: string;
	movements?: string;
	buttonText?: string;
}

export interface PackagesResponse {
	data: Package[];
	total: number;
}

/**
 * Parses various API response formats to extract packages data
 * Handles different response structures from different API endpoints
 * @param response - The raw API response
 * @returns Normalized packages response with data array and total count
 */
export function parsePackagesResponse(response: any) {
	try {
		let data: Package[] = [];

		// Handle null/undefined response
		if (!response) {
			return { data: [], total: 100 };
		}

		// Handle different response formats
		if (Array.isArray(response)) {
			// Direct array response
			data = response as Package[];
		} else if (Array.isArray(response.data)) {
			// Response with data property containing array
			data = response.data as Package[];
		} else if (Array.isArray(response.items)) {
			// Response with items property containing array
			data = response.items as Package[];
		} else if (Array.isArray(response.result)) {
			// Response with result property containing array
			data = response.result as Package[];
		} else if (typeof response === "object" && response !== null) {
			// Try to find first array property in object response
			for (const key of Object.keys(response)) {
				if (Array.isArray((response as any)[key])) {
					data = (response as any)[key] as Package[];
					break;
				}
			}
		}

		// Ensure we always return an array
		if (!Array.isArray(data)) data = [];

		return { data, total: 100 };
	} catch (err) {
		console.warn("[packagesApi] parsePackagesResponse failed, returning empty list", err, response);
		return { data: [], total: 100 };
	}
}

// RTK Query API for packages management
export const packagesApi = createApi({
	reducerPath: "packagesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: getPackagesApiUrl(),
	}),
	endpoints: (builder) => ({
		// Query to fetch packages with pagination support
		getPackages: builder.query<PackagesResponse, { page: number; limit: number }>({
			query: ({ page, limit }) => {
				// Build URL with pagination parameters
				const url = new URL("/lista-de-paquetes", getPackagesApiUrl());
				url.searchParams.append("page", page.toString());
				url.searchParams.append("limit", limit.toString());

				return {
					url: url.pathname + url.search,
					headers: { "content-type": "application/json" },
					method: "GET",
				};
			},
			// Transform response to handle different API formats
			transformResponse: (response: any) => {
				return parsePackagesResponse(response);
			},
		}),
	}),
});

export const { useGetPackagesQuery, useLazyGetPackagesQuery } = packagesApi;
