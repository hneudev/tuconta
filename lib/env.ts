export const getPackagesApiUrl = (): string => {
	return process.env.NEXT_PUBLIC_PACKAGES_API ?? "https://68a12f346f8c17b8f5d94aca.mockapi.io/api/v1/";
};
