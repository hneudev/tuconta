"use client";

import { useEffect } from "react";
import { setupCacheCleanup } from "@/lib/cacheCleanup";

/**
 * Component that sets up cache cleanup when user leaves the site
 * This component doesn't render anything, it just sets up event listeners
 */
export default function CacheCleanup() {
	useEffect(() => {
		setupCacheCleanup();
	}, []);

	// This component doesn't render anything
	return null;
}
