import { IDynamicFields } from "./dynamic-fields.model";

export interface IDynamicFieldsResponse {
    responseCode: number | null,
    message: string | null,
    data: IDynamicFields | null,
    totalRecordsCount: number | null
}
