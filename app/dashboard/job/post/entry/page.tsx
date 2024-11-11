"use client";
import Editor from "@/components/editor/advanced-editor";
import { defaultValue } from "@/components/editor/default-value";
import EntryScreen from "@/components/dashboard/entry-screen";
import { JSONContent } from "novel";
import { useState } from "react";

export default function NewPostEntryScreen() {
	const [content, setContent] = useState<JSONContent>(defaultValue);
	async function handleSubmit() {
		// do something
		console.log(content);
	}
	return (
		<EntryScreen title="New Post" onSubmit={handleSubmit}>
			{/* {Array.from({ length: 32 }).map((_, index) => (
				<div key={index} className="w-full flex-1 box-border">
					<label className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<input
						type="text"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
					/>
				</div>
			))} */}
			<div className="w-full h-full col-span-12 flex justify-center items-center border rounded-xl">
				<Editor
					initialValue={content}
					onChange={setContent}
					className="p-4 max-w-[900px] w-full mx-auto"
				/>
			</div>
		</EntryScreen>
	);
}
