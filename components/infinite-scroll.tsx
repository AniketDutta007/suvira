"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function InfiniteScroll({
	loadMore,
	hasMore,
}: {
	loadMore: () => void;
	hasMore: boolean;
}) {
	const [ref, inView] = useInView({
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView && hasMore) {
			loadMore();
		}
	}, [inView, hasMore, loadMore]);

	return <div ref={ref} />;
}
