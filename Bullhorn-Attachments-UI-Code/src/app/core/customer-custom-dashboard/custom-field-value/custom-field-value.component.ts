import { Component, Input } from '@angular/core';
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
import { IFusionCustomerIdAccount, IProject } from '../../../shared/models/static-models/interface/i-business-dropdown.model';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-custom-field-value',
    templateUrl: './custom-field-value.component.html',
    styleUrl: './custom-field-value.component.scss'
})
export class CustomFieldValueComponent {
    readonly errorMessages = ErrorMessages;

    isError: boolean = false;
    messages!: Message[];

    form: any = FormGroup;

    clientaccountList: IFusionCustomerIdAccount[] = [];
    projectsList: IProject[] = [];

    originalCustomFieldResponse!: IDynamicFieldsResponse;
    updatedCustomFieldResponse!: IDynamicFieldsResponse;

    customFieldFieldData: any;

    selectedCustomerDropdown: any;
    selectedCustomerDropdownId: any;

    selectedProjectDropdown: any;
    selectedProjectDropdownId: any;

    csfId: any;

    projectDisabled: boolean = true;

    entityId!: string;
    @Input()
    public get placementId(): string {
        return this.entityId;
    }
    public set placementId(data: string) {
        this.entityId = data;
        this.fetchCustomFields();
    }

    constructor(
        private setupDataService: SetupDataService,
        private dataService: SetupDataService,
        private mapperService: MapperService,
        private alertServce: AlertService
    ) {}

    ngOnInit() {
        StaticData.subscribe((res: StaticApiRes) => {
            this.clientaccountList = this.mapperService.map(FusionCustomerIdAccount, res.fusionCustomerIdAccount);
            this.projectsList = this.mapperService.map(Project, res.projects);
        });
        this.initializeForm();
    }

    initializeForm() {
        this.form = new FormGroup({});
    }

    onCustomerNameSelect() {
        this.isError =  false;
        this.selectedProjectDropdownId = null;
        this.csfId = null;
        this.projectDisabled = false;

        if(this.customFieldFieldData && this.customFieldFieldData.length > 0) {
            this.customFieldFieldData = [];
            this.form = new FormGroup({});
        }
    }

    onProjectNameSelected() {

        if(this.customFieldFieldData && this.customFieldFieldData.length > 0) {
            this.customFieldFieldData = [];
            this.form = new FormGroup({});
        }

        this.fetchCSFId();
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

        const selectedCustomer: any = this.clientaccountList.find(x => {return x.id == this.selectedCustomerDropdownId});
        const selectedProject: any = this.projectsList.find(x => {return x.projectId == this.selectedProjectDropdownId});

        let fieldData: any = this.updatedCustomFieldResponse.data?.customField.fieldData;

        let currentUser: any = sessionStorage.getItem('currentUser');
        currentUser = JSON.parse(currentUser);

        let fieldDataArray: any = [];
        let finalObject: any = {
            placementId: this.entityId,
            fusionCustomerId: this.selectedCustomerDropdownId,
            appUserId: currentUser?.appUserId,
            projectId: this.selectedProjectDropdownId,
            projectName: selectedProject?.projectName,
            customerName: selectedCustomer?.name,
            csfId: this.csfId,
            description: this.updatedCustomFieldResponse.data?.description,
            status: this.updatedCustomFieldResponse.data?.status,
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
                        this.alertServce.errorAlert('Invalid customer! Please select correct Fusion Customer Name (Account) for the given Placement ID: ' + this.entityId, 'add');
                    } else {
                        this.alertServce.successAlert('Data saved successfully', 'add');
                    }
                }
            },
            (err: Error) => {
                this.alertServce.errorAlert('Invalid data! Please select correct Fusion Customer Name (Account) for the given Placement ID: ' + this.entityId, 'add');
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

        return validator && validator.required && (control?.value || control?.value == '0');
    }

    onFormChange(formControlName: any) {
        console.log(this.form.controls[formControlName].value);
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
        console.log('See Input text', data);
    }

    fetchCustomFields() {
        this.setupDataService.customFieldValueGet(this.entityId).subscribe((res: IDynamicFieldsResponse) => {
            this.selectedCustomerDropdownId = res.data?.fusionCustomerId;
            this.selectedProjectDropdownId = res.data?.projectId;
            this.csfId = res.data?.csfId;

            if (res.data?.fusionCustomerId) {
                this.projectDisabled = false;
            }

            if (res.data?.fusionCustomerId && res.data?.projectId && res.data.csfId) {
                this.originalCustomFieldResponse = res;
                this.updatedCustomFieldResponse = JSON.parse(JSON.stringify(res));

                const customFields: any = res.data?.customField.fieldData;
                this.customFieldFieldData = res.data?.customField.fieldData;

                if (customFields && customFields.length > 0) {
                    this.customFieldFieldData.sort((a: any, b: any) => {
                        return a['sequenceNumber'] < b['sequenceNumber'] ? -1 : 1;
                    });
                    this.createForm(customFields);
                }

                setTimeout(() => {
                    this.prepareFormData(res.data?.customField.fieldData);
                }, 1500);
            }
        });
    }

    prepareFormData(formData: any) {
        if (formData) {
            formData.forEach((item: any) => {
                this.form.controls[item.fieldName].setValue(item.fieldValues);
            });
        }
    }

    buildCSFRequestObject() {
        const payload = {
            fusionCustomerId: this.selectedCustomerDropdownId ? this.selectedCustomerDropdownId : 0,
            projectId: this.selectedProjectDropdownId ? this.selectedProjectDropdownId : 0,
            csfId: this.csfId
        };

        return payload;
    }

    fetchCSFId() {
        this.dataService.getCSFId(this.selectedProjectDropdownId).subscribe((res: any) => {
            this.csfId = res.data?.csfId;
            if (!this.csfId) {
                this.isError = true;
                this.messages = [{ severity: 'error', detail: 'CSF ID is not available for the selected Project' }];
            } else {
                this.getCSFFieldsData();
            }
        });

        return this.csfId;
    }

    getCSFFieldsData() {
        const payload = this.buildCSFRequestObject();
        this.dataService.customFieldGet(payload).subscribe((res: IDynamicFieldsResponse) => {
            if (res.data?.fusionCustomerId && res.data?.projectId && res.data.csfId) {
                this.originalCustomFieldResponse = res;
                this.updatedCustomFieldResponse = JSON.parse(JSON.stringify(res));

                const customFields: any = res.data?.customField.fieldData;
                this.customFieldFieldData = res.data?.customField.fieldData;

                if (customFields && customFields.length > 0) {
                    this.customFieldFieldData.sort((a: any, b: any) => {
                        return a['sequenceNumber'] < b['sequenceNumber'] ? -1 : 1;
                    });
                    this.createForm(customFields);
                }

                setTimeout(() => {
                    this.prepareFormData(res.data?.customField.fieldData);
                }, 1500);
            }
        });
    }
}
