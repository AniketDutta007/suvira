import { SearchIcon } from "lucide-react";

export default function SearchBar({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className="w-full max-h-full flex items-center border rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-primary transition">
			{
				<span className="mr-2 text-gray-500">
					<SearchIcon size={18} />
				</span>
			}
			<input
				className="flex-1 bg-inherit focus:outline-none"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Search"
			/>
		</div>
	);
}
