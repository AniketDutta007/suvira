import { Query as _Query, JobPost as _Post } from "@prisma/client";
import { QueryStatusFilterCriteria, StatusFilterCriteria } from "@/constants";

interface BaseData {
    id: string;
}

// type Query = _Query & BaseData;

interface Query extends _Query, BaseData { }

// type Post = Omit<_Post, "_count"> & {
//     applicationCount: number;
// } & BaseData;

interface Post extends Omit<_Post, "_count">, BaseData {
    applicationCount: number;
}

interface QueryFilterCriteria {
    status: QueryStatusFilterCriteria;
}

interface PostFilterCriteria {
    status: StatusFilterCriteria;
}


export {
    BaseData,
    Query,
    Post,
    QueryFilterCriteria,
    PostFilterCriteria
};