"use client";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/search-bar";
import SortSelect from "@/components/sort-select";
import {
	QueryStatusFilterCriteria as StatusFilter,
	QuerySortCriteria as SortCriteria,
} from "@/constants";

import { $Enums, type Query } from "@prisma/client";
import QueryCard from "./_components/query-card";
import { Skeleton } from "@/components/ui/skeleton";

import axios from "axios";
import InfiniteScroll from "@/components/infinite-scroll";
import QueryStatusFilter from "./_components/query-status-filter";
import { DetailDialog } from "@/components/detail-dialog";
import { CheckIcon, ClockIcon, Mail, Phone } from "lucide-react";

export default function Queries() {
	const observerElem = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<StatusFilter>(
		StatusFilter.All
	);
	const [sortCriteria, setSortCriteria] = useState<SortCriteria>(
		SortCriteria.Latest
	);
	const [queries, setQueries] = useState<Query[]>([]);
	const [pageCount, setPageCount] = useState<number>(1);
	const [isDetailDialogOpen, setIsDetailDialogOpen] =
		useState<boolean>(false);
	const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
	// fetch queries when component mounts - initial fetch
	useEffect(() => {
		fetchQueries(search, statusFilter, sortCriteria, pageCount);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// fetch queries when search or sortCriteria changes
	useEffect(() => {
		fetchQueries(search, statusFilter, sortCriteria, pageCount, false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, statusFilter, sortCriteria]);
	// fetch queries from the server
	async function fetchQueries(
		search: string,
		status: StatusFilter,
		sortCriteria: SortCriteria,
		pageCount: number,
		loadingFlag: boolean = true
	) {
		try {
			if (loadingFlag) setLoading(true);
			const response = await axios.get("/api/query", {
				params: {
					search,
					status,
					sort: sortCriteria,
					page: pageCount,
				},
			});
			if (response.data.success) {
				setQueries(response.data.data as Query[]);
			} else {
				console.error(response.data.error);
			}
		} catch (error) {
			console.error(error);
		} finally {
			if (loadingFlag) setLoading(false);
		}
	}
	// fetch more queries when user scrolls to the bottom
	async function fetchMoreQueries() {
		const nextPage = pageCount + 1;
		try {
			setPageCount(nextPage);
			setLoading(true);
			const response = await axios.get("/api/query", {
				params: {
					search,
					sort: sortCriteria,
					page: nextPage,
					paginate: true,
				},
			});
			if (response.data.success) {
				setQueries((prev) => {
					const map = new Map(prev.map((query) => [query.id, query]));
					const newQueries = (response.data.data as Query[]).filter(
						(query) => !map.has(query.id)
					);
					return prev.concat(newQueries);
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
	// toggle query status
	async function toggleQueryStatus(queryId: string) {
		try {
			setQueries((prev) =>
				prev.map((query) => {
					if (query.id === queryId) {
						return {
							...query,
							status:
								query.status === $Enums.QueryStatus.OPEN
									? $Enums.QueryStatus.CLOSED
									: $Enums.QueryStatus.OPEN,
						};
					}
					return query;
				})
			);
			const response = await axios.get(`/api/query/${queryId}/status`);
			if (!response.data.success) {
				setQueries((prev) =>
					prev.map((query) => {
						if (query.id === queryId) {
							return {
								...query,
								status:
									query.status === $Enums.QueryStatus.OPEN
										? $Enums.QueryStatus.CLOSED
										: $Enums.QueryStatus.OPEN,
							};
						}
						return query;
					})
				);
			}
		} catch (error) {
			console.error(error);
			setQueries((prev) =>
				prev.map((query) => {
					if (query.id === queryId) {
						return {
							...query,
							status:
								query.status === $Enums.QueryStatus.OPEN
									? $Enums.QueryStatus.CLOSED
									: $Enums.QueryStatus.OPEN,
						};
					}
					return query;
				})
			);
		}
	}
	// remove query
	async function removeQuery(queryId: string) {
		const prevState = queries;
		try {
			const updatedQueries = queries.filter(
				(query) => query.id !== queryId
			);
			setQueries(updatedQueries);
			const response = await axios.delete(`/api/query/${queryId}`);
			if (!response.data.success) {
				setQueries((current) => {
					const map = new Map(
						current.map((query) => [query.id, query])
					);
					const restoredQueries = prevState
						.map((query) =>
							query.id === queryId ? query : map.get(query.id)
						)
						.filter((query) => query !== undefined);
					return restoredQueries as Query[];
				});
			}
		} catch (error) {
			console.error(error);
			setQueries((current) => {
				const map = new Map(current.map((query) => [query.id, query]));
				const restoredQueries = prevState
					.map((query) =>
						query.id === queryId ? query : map.get(query.id)
					)
					.filter((query) => query !== undefined);
				return restoredQueries as Query[];
			});
		}
	}
	// open query detail dialog
	function openQueryDetailDialog(queryId: string) {
		setIsDetailDialogOpen(true);
		const query = queries.find((query) => query.id === queryId);
		setSelectedQuery(query || null);
	}
	return (
		<>
			<div className="w-full flex-1 overflow-hidden flex flex-col gap-3 p-4 box-border">
				<div className="flex gap-3 items-center justify-between">
					<div className="sm:grow w-full sm:max-w-[500px] flex items-center gap-2">
						<SearchBar value={search} onChange={setSearch} />
					</div>
					<div className="w-fit flex justify-center items-center sm:items-center gap-2">
						<QueryStatusFilter
							filter={statusFilter}
							setFilter={setStatusFilter}
						/>
						<SortSelect
							selectedCriteria={sortCriteria}
							onChange={(criteria) =>
								setSortCriteria(criteria as SortCriteria)
							}
							criterias={SortCriteria}
						/>
					</div>
				</div>
				<div className="w-full flex-auto overflow-hidden rounded-xl bg-muted/50 p-2 md:p-5 box-border">
					{!loading && queries.length === 0 ? (
						<div className="flex items-center justify-center h-full">
							<h1 className="text-2xl text-secondary-foreground font-bold">
								No Queries Found
							</h1>
						</div>
					) : (
						<div
							className="max-h-full w-full flex flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden gap-1 md:gap-3 remove-scrollbar"
							key={1}
						>
							{!loading && queries.length > 0 && (
								<>
									{queries.map((query) => (
										<div
											className="flex-[0_0_100%] max-w-[100%] sm:flex-[0_0_48%] sm:max-w-[48%] lg:flex-[0_0_32%] lg:max-w-[32%] p-2"
											key={query.id}
										>
											<QueryCard
												key={query.id}
												query={query}
												toggleStatus={toggleQueryStatus}
												removeQuery={removeQuery}
												openQueryDialog={
													openQueryDetailDialog
												}
											/>
										</div>
									))}
									<InfiniteScroll
										loadMore={fetchMoreQueries}
										hasMore={true}
									/>
								</>
							)}
							{loading &&
								Array.from({ length: 9 }).map((_, index) => (
									<Skeleton
										key={index}
										className="flex-[0_0_100%] max-w-[100%] md:flex-[0_0_48%] md:max-w-[48%] lg:flex-[0_0_32%] lg:max-w-[32%] p-2 h-[250px] flex flex-col"
									/>
								))}
						</div>
					)}
					<div
						ref={observerElem}
						className="flex-[0_0_100%] max-w-[100%] md:flex-[0_0_48%] md:max-w-[48%] lg:flex-[0_0_32%] lg:max-w-[32%] p-2 h-[250px] flex flex-col"
					></div>
				</div>
			</div>
			<DetailDialog
				title={"Query Detail"}
				isOpen={isDetailDialogOpen}
				onOpenChange={setIsDetailDialogOpen}
				content={
					<div className="flex flex-col gap-2">
						<div className="flex-1 flex flex-col justify-start items-start">
							<span className="text-sm font-semibold text-muted-foreground">
								Name
							</span>
							<span className="text-md">
								{selectedQuery?.name}
							</span>
						</div>
						<div className="flex flex-col justify-start items-start">
							<span className="text-sm font-semibold text-muted-foreground">
								Company
							</span>
							<span className="text-md">
								{selectedQuery?.company}
							</span>
						</div>
						<div className="w-full flex flex-col justify-start items-start">
							<div className="w-full flex justify-between items-center gap-3">
								<span className="text-sm font-semibold text-muted-foreground">
									How can we help you?
								</span>
								{selectedQuery?.status ==
								$Enums.QueryStatus.OPEN ? (
									<ClockIcon
										size={18}
										className="text-green-500"
									/>
								) : (
									<CheckIcon
										size={18}
										className="text-red-500"
									/>
								)}
							</div>
							<span className="text-md">
								{selectedQuery?.query}
							</span>
						</div>
						<div className="flex justify-start items-center gap-3">
							<Mail
								size={18}
								className="cursor-pointer text-blue-500"
								onClick={() => {}}
							/>
							{selectedQuery?.email}
						</div>
						<div className="flex justify-start items-center gap-3">
							<Phone
								size={18}
								className="cursor-pointer text-blue-500"
								onClick={() => {}}
							/>
							{selectedQuery?.phone}
						</div>
					</div>
				}
			/>
		</>
	);
}
