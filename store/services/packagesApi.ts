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

export const packagesApi = createApi({
	reducerPath: "packagesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: getPackagesApiUrl(),
	}),
	endpoints: (builder) => ({
		getPackages: builder.query<PackagesResponse, { page: number; limit: number }>({
			query: ({ page, limit }) => {
				const url = new URL("/lista-de-paquetes", getPackagesApiUrl());
				url.searchParams.append("page", page.toString());
				url.searchParams.append("limit", limit.toString());

				return {
					url: url.pathname + url.search,
					headers: { "content-type": "application/json" },
					method: "GET",
				};
			},
			transformResponse: (response: Package[]) => ({
				data: response || [],
				total: response?.length || 0,
			}),
		}),
	}),
});

export const { useGetPackagesQuery, useLazyGetPackagesQuery } = packagesApi;
