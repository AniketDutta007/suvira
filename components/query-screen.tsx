import axios from "axios";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { DetailDialog } from "./detail-dialog";
import { FilterForm } from "./filter-form";
import InfiniteScroll from "./infinite-scroll";
import SearchBar from "./search-bar";
import SortSelect from "./sort-select";
import { BaseData } from "@/types";

export default function QueryScreen<
	TFilterCriteria,
	TData extends BaseData,
	TSortCriteria extends string | string
>({
	queryUrl,
	filterView,
	dataGrid,
	detailView,
	loadingCard,
	data,
	setData,
	defaultFilterCriteria,
	filterCriteria,
	resetFilterCriteria,
	defaultSortCriteria,
	sortCriterias,
	selectedData,
}: {
	queryUrl: string;
	filterView: ReactNode;
	dataGrid: (data: TData[]) => ReactNode[];
	detailView: ReactNode;
	loadingCard: ReactNode;
	data: TData[];
	setData: React.Dispatch<React.SetStateAction<TData[]>>;
	defaultFilterCriteria: TFilterCriteria;
	filterCriteria: TFilterCriteria;
	resetFilterCriteria: () => void;
	defaultSortCriteria: TSortCriteria;
	sortCriterias: TSortCriteria[];
	selectedData: TData | null;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [sortCriteria, setSortCriteria] =
		useState<TSortCriteria>(defaultSortCriteria);
	const [pageCount, setPageCount] = useState<number>(1);
	const [isDetailDialogOpen, setIsDetailDialogOpen] =
		useState<boolean>(false);
	// fetch data when component mounts - initial fetch
	useEffect(() => {
		fetchData(search, filterCriteria, sortCriteria, pageCount);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// fetch data when search or sortCriteria changes
	useEffect(() => {
		fetchData(search, filterCriteria, sortCriteria, pageCount, false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, sortCriteria]);
	// open detail dialog when openDetailDialog changes
	useEffect(() => {
		if (selectedData) setIsDetailDialogOpen(true);
		else setIsDetailDialogOpen(false);
	}, [selectedData]);
	// fetch data from the server
	async function fetchData(
		search: string,
		criteria: TFilterCriteria,
		sortCriteria: TSortCriteria,
		pageCount: number,
		loadingFlag: boolean = true
	) {
		try {
			if (loadingFlag) setLoading(true);
			const response = await axios.get(queryUrl, {
				params: {
					search,
					...criteria,
					sort: sortCriteria,
					page: pageCount,
				},
			});
			if (response.data.success) {
				setData(response.data.data as TData[]);
			} else {
				console.error(response.data.error);
			}
		} catch (error) {
			console.error(error);
		} finally {
			if (loadingFlag) setLoading(false);
		}
	}
	// fetch more data when user scrolls to the bottom
	async function fetchMoreData() {
		const nextPage = pageCount + 1;
		try {
			setPageCount(nextPage);
			setLoading(true);
			const response = await axios.get(queryUrl, {
				params: {
					search,
					...filterCriteria,
					sort: sortCriteria,
					page: nextPage,
					paginate: true,
				},
			});
			if (response.data.success) {
				setData((prev: TData[]) => {
					const map = new Map(prev.map((post) => [post.id, post]));
					const newPosts = (response.data.data as TData[]).filter(
						(post) => !map.has(post.id)
					);
					return prev.concat(newPosts);
				});
			} else {
				console.error(response.data.error);
				setPageCount(nextPage - 1);
			}
		} catch (error) {
			console.error(error);
			setPageCount(nextPage - 1);
		} finally {
			setLoading(false);
		}
	}
	// apply filter criteria
	function applyFilterCriteria(criteria: TFilterCriteria) {
		fetchData(search, criteria, sortCriteria, pageCount);
		setIsDetailDialogOpen(false);
	}
	// reset filter criteria
	function _resetFilterCriteria() {
		resetFilterCriteria();
		fetchData(search, defaultFilterCriteria, sortCriteria, pageCount);
		setIsDetailDialogOpen(false);
	}
	return (
		<>
			<div className="w-full flex-1 overflow-hidden flex flex-col gap-3 p-4 box-border">
				<div className="flex gap-3 items-center justify-between">
					<div className="sm:grow w-full sm:max-w-[500px] flex items-center gap-2">
						<SearchBar value={search} onChange={setSearch} />
					</div>
					<div className="w-fit flex justify-center items-center sm:items-center gap-2">
						<FilterForm
							criteria={filterCriteria}
							applyFilterCriteria={applyFilterCriteria}
							resetFilterCriteria={_resetFilterCriteria}
						>
							{filterView}
						</FilterForm>
						<SortSelect
							selectedCriteria={sortCriteria}
							onChange={(criteria) =>
								setSortCriteria(criteria as TSortCriteria)
							}
							criterias={sortCriterias}
						/>
					</div>
				</div>
				<div className="w-full flex-auto overflow-hidden rounded-xl bg-muted/50 p-2 md:p-5 box-border">
					{!loading && data.length === 0 ? (
						<div className="flex items-center justify-center h-full">
							<h1 className="text-2xl text-secondary-foreground font-bold">
								No Data Found
							</h1>
						</div>
					) : (
						<div
							className="max-h-full w-full flex flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden gap-1 md:gap-3 remove-scrollbar"
							key="data-container"
						>
							{!loading && data.length > 0 && (
								<>
									{dataGrid(data)}
									<InfiniteScroll
										loadMore={fetchMoreData}
										hasMore={true}
									/>
								</>
							)}
							{loading &&
								Array.from({ length: 9 }).map((_, index) =>
									React.cloneElement(
										loadingCard as ReactElement,
										{ key: index }
									)
								)}
						</div>
					)}
				</div>
			</div>
			<DetailDialog
				title={"Detail Dialog"}
				isOpen={isDetailDialogOpen}
				onOpenChange={setIsDetailDialogOpen}
				content={detailView}
			/>
		</>
	);
}
