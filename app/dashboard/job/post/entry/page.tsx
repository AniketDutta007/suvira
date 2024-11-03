"use client";
import EntryScreen from "@/components/entry-screen";

export default function NewPostEntryPage() {
	async function handleSubmit() {
		// do something
	}
	return (
		<EntryScreen title="New Post" onSubmit={handleSubmit}>
			{Array.from({ length: 32 }).map((_, index) => (
				<div key={index} className="w-full flex-1 box-border">
					<label className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<input
						type="text"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
					/>
				</div>
			))}
		</EntryScreen>
	);
}
