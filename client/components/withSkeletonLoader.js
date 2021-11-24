import { useProducts } from "../lib/hooks/useProducts";

function useIsLoading() {
	const { isLoading } = useProducts();

	return isLoading;
}

export function WithSkeletonLoader({children, skeletonLoader}) {
	const isLoading = useIsLoading();

	if (isLoading && skeletonLoader) {
		return <>{skeletonLoader}</>;
	}

	return <>{children}</>;
}