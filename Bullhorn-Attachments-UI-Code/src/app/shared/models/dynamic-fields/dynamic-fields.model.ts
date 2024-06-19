import { IFieldData } from "./custom-field.model";

export interface IDynamicFields {
    customerName: any,
    fusionCustomerId: number | null,
    appUserId: string | null,
    projectId: number | null,
    projectName: string | null,
    csfId: string | null,
    description: string | null,
    status: string | null
  
    customField: {
        fieldData: IFieldData | null
    }
}