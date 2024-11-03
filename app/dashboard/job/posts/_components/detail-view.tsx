import { Post } from "@/types";

export default function PostDetailView({ post }: { post: Post }) {
	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.description}</p>
			<p>{post.location}</p>
			<p>{post.role}</p>
			<p>{post.salary}</p>
			<p>{post.applicationCount}</p>
		</div>
	);
}
