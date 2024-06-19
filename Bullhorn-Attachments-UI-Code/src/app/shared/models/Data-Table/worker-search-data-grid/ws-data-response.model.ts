import { WorkerSeachDataTableFilter } from "./ws-data-tbl-filter.model";

export interface WorkerSearchDataResponse {
    responseCode: number;
    message: string;
    data: WorkerSeachDataTableFilter;
    totalRecordsCount: number;
}