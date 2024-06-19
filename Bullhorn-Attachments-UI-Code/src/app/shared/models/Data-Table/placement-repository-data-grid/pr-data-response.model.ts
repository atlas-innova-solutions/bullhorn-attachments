import { PlacementRepositoryDataTableFilter } from "./pr-data-tbl-filter.model";

export interface PlacementRepositoryDataResponse {
    responseCode: number | null;
    message: string;
    data: PlacementRepositoryDataTableFilter;
    totalRecordsCount: number;
}
