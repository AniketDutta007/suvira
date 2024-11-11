"use client";

import QueryScreen from "@/components/dashboard/query-screen";
import { useEffect, useState } from "react";
import {
	QueryStatusFilterCriteria as StatusFilterCriteria,
	QuerySortCriteria as SortCriteria,
} from "@/constants";
import QueryCard from "./_components/query-card";
import { Query, QueryFilterCriteria as FilterCriteria } from "@/types";
import QueryFilterForm from "./_components/filter-form";
import QueryDetailView from "./_components/detail-view";
import axios from "axios";
import { $Enums } from "@prisma/client";
import LoadingCard from "./_components/loading-card";

const initialCriteria: FilterCriteria = {
	status: StatusFilterCriteria.All,
};

export default function Queries() {
	const [filterCriteria, setFilterCriteria] =
		useState<FilterCriteria>(initialCriteria);
	const [queries, setQueries] = useState<Query[]>([]);
	const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

	useEffect(() => {
		console.log(queries);
	}, [queries]);

	function resetFilterCriteria() {
		setFilterCriteria(initialCriteria);
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

	function dataGridFn(data: Query[]) {
		return data.map((query) => (
			<QueryCard
				key={query.id}
				query={query}
				toggleStatus={toggleQueryStatus}
				removeQuery={removeQuery}
				openQueryDialog={() => {
					setSelectedQuery(query);
				}}
			/>
		));
	}

	return (
		<QueryScreen<FilterCriteria, Query, SortCriteria>
			queryUrl="/api/query"
			filterView={
				<QueryFilterForm
					criteria={filterCriteria}
					setCriteria={setFilterCriteria}
				/>
			}
			dataGrid={dataGridFn}
			detailView={
				selectedQuery && <QueryDetailView query={selectedQuery} />
			}
			loadingCard={<LoadingCard />}
			data={queries}
			setData={setQueries}
			defaultFilterCriteria={initialCriteria}
			filterCriteria={filterCriteria}
			resetFilterCriteria={resetFilterCriteria}
			defaultSortCriteria={SortCriteria.Latest}
			sortCriterias={Object.values(SortCriteria)}
			selectedData={selectedQuery}
		/>
	);
}
