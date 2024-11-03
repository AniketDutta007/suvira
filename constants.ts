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
enum JobPostSearchCriteria {
    All = "All",
    Title = "Title",
    Location = "Location",
    Role = "Role",
    Salary = "Salary",
    Status = "Status",
}
enum StatusFilterCriteria {
    All = "All",
    Active = "Active",
    Inactive = "Inactive",
}
enum JobPostSortCriteria {
    Title = "Title",
    Salary = "Salary",
    Latest = "Latest",
    NoOfApplicants = "No Of Applicants",
}
export { QuerySearchCriteria, QueryStatusFilterCriteria, QuerySortCriteria, JobPostSearchCriteria, StatusFilterCriteria, JobPostSortCriteria };