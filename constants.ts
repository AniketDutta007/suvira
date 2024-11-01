enum QuerySearchCriteria {
    All = "All",
    Name = "Name",
    Email = "Email",
    Phone = "Phone",
    Company = "Company",
    Query = "Query",
}
enum QueryStatusFilterCriteria {
    All = "All",
    Open = "Open",
    Closed = "Closed",
}
enum QuerySortCriteria {
    Name = "Name",
    Latest = "Latest",
}
export { QuerySearchCriteria, QueryStatusFilterCriteria, QuerySortCriteria };