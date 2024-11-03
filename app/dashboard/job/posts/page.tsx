"use client";

import QueryScreen from "@/components/query-screen";
import { useState } from "react";
import {
	StatusFilterCriteria,
	JobPostSortCriteria as SortCriteria,
} from "@/constants";
import PostCard from "./_components/post-card";
import { Post, PostFilterCriteria as FilterCriteria } from "@/types";
import PostFilterForm from "./_components/filter-form";
import PostDetailView from "./_components/detail-view";
import LoadingCard from "./_components/loading-card";

const initialCriteria: FilterCriteria = {
	status: StatusFilterCriteria.All,
};

export default function Posts() {
	const [filterCriteria, setFilterCriteria] =
		useState<FilterCriteria>(initialCriteria);
	const [posts, setPosts] = useState<Post[]>([]);
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	function resetFilterCriteria() {
		setFilterCriteria(initialCriteria);
	}

	function dataGridFn(data: Post[]) {
		return data.map((post) => (
			<PostCard
				key={post.id}
				post={post}
				removePost={() => {}}
				openPostDialog={() => {
					setSelectedPost(post);
				}}
			/>
		));
	}
	return (
		<QueryScreen<FilterCriteria, Post, SortCriteria>
			queryUrl="/api/job/post"
			filterView={
				<PostFilterForm
					criteria={filterCriteria}
					setCriteria={setFilterCriteria}
				/>
			}
			dataGrid={dataGridFn}
			detailView={selectedPost && <PostDetailView post={selectedPost} />}
			loadingCard={<LoadingCard />}
			data={posts}
			setData={setPosts}
			defaultFilterCriteria={initialCriteria}
			filterCriteria={filterCriteria}
			resetFilterCriteria={resetFilterCriteria}
			defaultSortCriteria={SortCriteria.Latest}
			sortCriterias={Object.values(SortCriteria)}
			selectedData={selectedPost}
		/>
	);
}
