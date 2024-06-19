import { IDynamicFieldsValue } from "./dynamic-field-value.model";

export interface IDynamicFieldsValueResponse {

responseCode: number | null,
message: string | null,
data: IDynamicFieldsValue | null,
totalRecordsCount: number | null
}