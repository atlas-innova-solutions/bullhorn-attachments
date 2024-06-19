import { Component } from '@angular/core';
import { SetupDataService } from '../../../shared/services/data-service/setup-data.service';
import { IDynamicFieldsResponse } from '../../../shared/models/dynamic-fields/dynamic-fields-get.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFieldOptions } from '../../../shared/models/dynamic-fields/custom-field.model';
import { ErrorMessages } from '../../../shared/utils/error-messages.constant';
import { StaticData } from '../../../shared/services/load-static-data.service';
import { StaticApiRes } from '../../../shared/utils/static-initial-api';
import { MapperService } from '../../../shared/services/auto-mapper/mapper-service';
import { FusionCustomerIdAccount, Project } from '../../../shared/models/static-models/business-model/business-dropdown.modes';
import { AlertService } from '../../../shared/services/alert-service/alert.service';
import { Message } from 'primeng/api';
import { IFusionCustomerIdAccount, IProject } from '../../../shared/models/static-models/interface/i-business-dropdown.model';

@Component({
    selector: 'app-save-dynamic-fields-value',
    templateUrl: './save-dynamic-fields-value.component.html',
    styleUrl: './save-dynamic-fields-value.component.scss'
})
export class SaveDynamicFieldsValueComponent {
    readonly errorMessages = ErrorMessages;
    form: any = FormGroup;

    ClientaccountList: IFusionCustomerIdAccount[] = [];
    projectsList: IProject[] = [];
    originalCustomFieldResponse!: IDynamicFieldsResponse;
    updatedCustomFieldResponse!: IDynamicFieldsResponse;

    customFieldFieldData: any;

    selectedDropdown: any;
    selectedDropdownId: any;
    selectedProject: any;

    placementId!: number;
    selectedProjectName: any;
    requestObject: any;
    CSFId: any;
    selectedCustomer: any;
    projectDisabled: boolean = true;
    description: any;
    CSFStatus: boolean = true;
    isError: boolean = false;
    messages!: Message[];

    constructor(
        private setupDataService: SetupDataService,
        private dataService: SetupDataService,
        private mapperService: MapperService,
        private alertServce: AlertService
    ) {}

    ngOnInit() {
        StaticData.subscribe((res: StaticApiRes) => {
            this.ClientaccountList = this.mapperService.map(FusionCustomerIdAccount, res.fusionCustomerIdAccount);
            this.projectsList = this.mapperService.map(Project, res.projects);
        });

        this.initializeForm();
    }

    initializeForm() {
        this.form = new FormGroup({});
    }

    // onCustomerNameSelect() {

    //     this.dataService.customFieldGet(this.selectedDropdownId).subscribe((res: IDynamicFieldsResponse) => {
    //         this.originalCustomFieldResponse = res;
    //         this.updatedCustomFieldResponse = JSON.parse(JSON.stringify(res));

    //         const customFields: any = res.data?.customField.fieldData;
    //         this.customFieldFieldData = res.data?.customField.fieldData;

    //         if (customFields && customFields.length > 0) {
    //             this.customFieldFieldData.sort((a: any, b: any) => {
    //                 return a['sequenceNumber'] < b['sequenceNumber'] ? -1 : 1;
    //             });
    //             this.createForm(customFields);
    //         }
    //     });
    // }

    onCustomerNameSelect(selectedValue: any) {
        this.isError = false;
        this.selectedProjectName = null;
        this.CSFId = null;
        this.selectedCustomer = selectedValue;
        this.projectDisabled = false;
        if (this.customFieldFieldData && this.customFieldFieldData.length > 0) {
            this.customFieldFieldData = [];
        }
    }

    onProjectNameSelected(data: any) {
        this.selectedProject = data;
        this.fetchCSFId(this.selectedProject);
    }

    getCSFFieldsData() {
        this.buildCSFRequestObject();
        this.dataService.customFieldGet(this.requestObject).subscribe((res: IDynamicFieldsResponse) => {
            this.originalCustomFieldResponse = res;
            this.updatedCustomFieldResponse = JSON.parse(JSON.stringify(res));

            const customFields: any = res.data?.customField.fieldData;
            this.customFieldFieldData = res.data?.customField.fieldData;
            // this.CSFId = res.data?.csfId;
            this.CSFStatus = res.data?.status == 'N' ? false : true;
            this.description = res.data?.description;

            if (customFields && customFields.length > 0) {
                this.customFieldFieldData.sort((a: any, b: any) => {
                    return a['sequenceNumber'] < b['sequenceNumber'] ? -1 : 1;
                });
                this.createForm(customFields);
            }
        });
    }

    fetchCSFId(data: any) {
        this.dataService.getCSFId(data.value).subscribe((res: any) => {
            this.CSFId = res.data?.csfId;
            if (!this.CSFId) {
                this.isError = true;
                this.messages = [{ severity: 'error', detail: 'CSF ID is not available for the selected Project' }];
            } else {
                this.getCSFFieldsData();
            }
        });

        return this.CSFId;
    }

    buildCSFRequestObject() {
        this.requestObject = {
            fusionCustomerId: this.selectedCustomer.value ? this.selectedCustomer.value : 0,
            projectId: this.selectedProject.value ? this.selectedProject.value : 0,
            csfId: this.CSFId
        };

        return this.requestObject;
    }

    createForm(customFields: any): void {
        customFields.forEach((field: any) => {
            this.form.addControl(
                field.fieldName,
                new FormControl(
                    {
                        value:
                            field.editable && field.editable == true
                                ? field.fieldValues
                                    ? field.fieldValues
                                    : ''
                                : field.editable && field.editable == false
                                  ? field.defaultValue
                                      ? field.defaultValue
                                      : ''
                                  : field.fieldValues
                                    ? field.fieldValues
                                    : '',
                        // disabled: field.editable && field.editable == true ? false : field.editable && field.editable == false ? true : false
                        disabled: field.editable == false ? true : false
                    },
                    field.mandatory ? [Validators.required] : null
                )
            );
        });
    }

    saveDynamicFields() {
        if (!this.validateAllFormFields()) {
            return;
        }

        const selectedCustomer: any = this.ClientaccountList.find((x) => {
            return x.id == this.selectedCustomer.value;
        });
        const selectedProject: any = this.projectsList.find((x) => {
            return x.projectId == this.selectedProject.value;
        });

        let currentUser: any = sessionStorage.getItem('currentUser');
        currentUser = JSON.parse(currentUser);
        let fieldData: any = this.updatedCustomFieldResponse.data?.customField.fieldData;
        let fieldDataArray: any = [];
        let finalObject: any = {
            appUserId: currentUser.appUserId,
            placementId: <number>this.placementId,
            projectId: this.selectedProject.value,
            projectName: selectedProject?.projectName,
            fusionCustomerId: this.selectedCustomer.value,
            customerName: selectedCustomer?.name,
            csfId: this.CSFId,
            description: this.description,
            status: this.CSFStatus == true ? 'Y' : 'N',
            customField: {
                fieldData: null
            }
        };

        fieldData.forEach((item: any) => {
            let fieldValue: any = this.form.controls[item.fieldName].value;
            let fieldOptions: any[] = [];
            let fieldData: any = {
                displayName: item.displayName,
                fieldName: item.fieldName,
                sequenceNumber: item.sequenceNumber,
                defaultValue: item.defaultValue,
                fieldType: item.fieldType,
                mandatory: item.mandatory,
                editable: item.editable,
                fieldValues: fieldValue,
                fieldOptions: null
            };

            if (item.fieldOptions && item.fieldOptions.length > 0) {
                item.fieldOptions.forEach((option: any) => {
                    let fieldOption: IFieldOptions = {
                        appFieldName: option.appFieldName,
                        uiFieldName: option.uiFieldName,
                        optionOne: null
                    };
                    if (option.appFieldName === fieldValue) {
                        fieldOption.optionOne = 'true';
                    }

                    fieldOptions.push(fieldOption);
                });

                fieldData.fieldOptions = fieldOptions;
            }

            fieldDataArray.push(fieldData);
        });

        finalObject.customField.fieldData = fieldDataArray;

        this.setupDataService.customFieldValueSave(finalObject).subscribe(
            (res: any) => {
                if (res) {
                    if (res.responseCode == 1001 || res.responseCode == 1009) {
                        this.alertServce.errorAlert('Invalid customer! Please select correct Fusion Customer Name (Account) for the given Placement ID: ' + this.placementId, 'add');
                    } else {
                        this.alertServce.successAlert('Data saved successfully', 'add');
                    }
                }
            },
            (err: Error) => {
                this.alertServce.errorAlert('Invalid data! Please select correct Fusion Customer Name (Account) for the given Placement ID: ' + this.placementId, 'add');
            }
        );
    }

    validateAllFormFields() {
        var fieldsControls = this.form.controls;
        let isValid: boolean = true;
        for (let field in fieldsControls) {
            this.displayFieldCss(field);
            const control = this.form.get(field);

            if (control?.disabled == false) {
                control?.markAsTouched({ onlySelf: true });
                if (!this.isRequiredValidationPassed(control)) {
                    isValid = false;
                }
            } else if (control?.disabled == true && !this.isRequiredValidationPassed(control)) {
                control?.markAsTouched({ onlySelf: true });
                isValid = false;
            } else {
                isValid = true;
            }

            if (!isValid) {
                break;
            }
        }

        if (!isValid) {
            for (let field in fieldsControls) {
                this.displayFieldCss(field);
                const control = this.form.get(field);
                if (control?.disabled == false) {
                    control?.markAsTouched({ onlySelf: true });
                } else if (control?.disabled == true && !this.isRequiredValidationPassed(control)) {
                    control?.markAsTouched({ onlySelf: true });
                }
            }
        }

        return isValid;
    }

    isRequiredValidationPassed(control: any) {
        const validator = control && control?.validator ? control.validator({} as AbstractControl) : null;
        if (!validator) {
            return true;
        }

        return validator && validator.required && control?.value;
    }

    onFormChange(formControlName: any) {
        // console.log(this.form.controls[formControlName].value);
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isValid(field),
            'has-feedback': this.isValid(field)
        };
    }

    isValid(field: string) {
        return !this.form.get(field)?.valid && this.form.get(field)?.touched;
    }

    onInputText(data: any) {
        // console.log('See Input text', data);
    }
}
