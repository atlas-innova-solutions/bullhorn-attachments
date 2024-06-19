export interface IFieldData {
    displayName: string | null;
    fieldName: string | null;
    fieldType: string | null;
    mandatory: string | null;
    fieldOptions: any[];
    customUserName:string|null;
    fieldValues: string | null;
    editable: string | null;
    category: string | null;
    defaultValue: string | null;
}

export interface IFieldOptions {
    uiFieldName: string | null;
    appFieldName: string | null;
    optionOne: string | null
}
