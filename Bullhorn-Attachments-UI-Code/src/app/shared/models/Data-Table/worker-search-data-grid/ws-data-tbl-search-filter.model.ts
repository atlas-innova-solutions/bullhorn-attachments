import { WorkerSeachDataTableFilter } from "./ws-data-tbl-filter.model";
import { WorkerSearchDataTableSearch } from "./ws-data-tbl-search.model";

export interface WorkerSearchDataTableSearchFilter {
    workerFilterParam: WorkerSeachDataTableFilter;
    workerSearchParam: WorkerSearchDataTableSearch;
}