import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDynamicFields } from '../../shared/models/dynamic-fields/dynamic-fields.model';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { ClientModel } from '../../shared/models/static-search-filters.model';
import { Company } from '../../shared/models/shared-component.model';
import { StaticData } from '../../shared/services/load-static-data.service';
import { StaticApiRes } from '../../shared/utils/static-initial-api';
import { FusionCustomerIdAccount, GetCategory, GetCustomUser, Project } from '../../shared/models/static-models/business-model/business-dropdown.modes';
import { MapperService } from '../../shared/services/auto-mapper/mapper-service';
import { IDynamicFieldsResponse } from '../../shared/models/dynamic-fields/dynamic-fields-get.model';
import { ErrorMessages } from '../../shared/utils/error-messages.constant';
import { IFieldData, IFieldOptions } from '../../shared/models/dynamic-fields/custom-field.model';
import { AlertService } from '../../shared/services/alert-service/alert.service';
import { Message, MessageService } from 'primeng/api';
import { CSF_Dropdown } from '../../shared/utils/lable-text-constant';


@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrl: './dynamic-fields.component.scss'
})
export class DynamicFieldsComponent implements OnInit {
  customFieldsForm!: FormGroup;
  dynamicTypeSelector!: FormControl;
  customerName!: FormControl;
  fusionCustomerId!: any;
  appUserId!: FormControl;
  dispalyName!: FormControl;
  fieldName!: FormControl;
  fieldType!: FormControl;
  mandatory!: FormControl;
  appFieldName!: FormControl;
  editable!: FormControl;
  ClientaccountList: FusionCustomerIdAccount[] = [];
  customFieldFieldData: any;
  fieldTypes!: any;
  checked: boolean = false;
  form: any;
  isFieldSelected: boolean = false;
  finalObject!: IDynamicFields;
  fieldsDataMain: IDynamicFields | undefined;
  clientaccountStatus: ClientModel[] = [];
  customForm: any = FormGroup;
  fieldData!: FormArray;
  appUserList: any[] = [];
  appUserListCopy: any[] = [];
  getCategoryList: any[] = [];
  projectsList: Project[] = [];
  clientaccountName: any;
  isCustomerNameSelected: boolean = false;
  isCustomerDropDownSelected: boolean = false;
  showFields: any;
  selectedDropdown: any;
  getFields: IDynamicFields | null | undefined;
  copyGetFields: any;
  selectedDropdownId: any;
  customSubForm: any = FormGroup;
  fieldSubData!: FormArray;
  readonly errorMessages = ErrorMessages;
  formGroup: FormGroup | undefined;
  appFieldNames: any;
  isAddbuttonClicked: boolean = false;
  maxItemSelected: boolean = false;
  isEditable: boolean = true;
  projectDisabled: boolean = true;
  CSFId: any;
  description: any;
  selectedCustomer: any;
  CSFStatus: boolean = true;


  selectedFusionCustomer: any;
  selectedProject: any;
  selectedProjectName: any;
  requestObject: any;    
  isError: boolean = false;
  messages!: Message[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: SetupDataService,
    private mapperService: MapperService,
    private alertServce: AlertService
  ) { }

  ngOnInit() {
    this.customForm = this.formBuilder.group({
      fieldData: this.formBuilder.array([])
    });
    if (this.isEditable == true) {
      this.fieldTypes = CSF_Dropdown;
    } else {
      this.fieldTypes = [CSF_Dropdown[0]];
    }


    StaticData.subscribe((res: StaticApiRes) => {
      this.appUserList = this.mapperService.map(GetCustomUser, res.getCustomUser);
      this.ClientaccountList = this.mapperService.map(FusionCustomerIdAccount, res.fusionCustomerIdAccount);
      this.getCategoryList = this.mapperService.map(GetCategory, res.getCategory);
      this.projectsList = this.mapperService.map(Project, res.projects);
    });
    
    this.customSubForm = this.formBuilder.group({
      fieldSubData: this.formBuilder.array([])
    });
    // this.initializeForm()
  }

  onSequenceNumbEnter(data: any, seqIndex: any) {
    const sequenceNumber = data.controls[seqIndex].value.sequenceNumber;
    let isSequenceEnteredElsewhere: boolean = false;
    const formArrayData: any = this.customForm.get("fieldData").controls;
    const isSelected = formArrayData.find((options: any, index: any) => {
      return index !== seqIndex && options.get("sequenceNumber").value == sequenceNumber;
    });
    if (isSelected) {
      isSequenceEnteredElsewhere = true;
    }
    if (isSequenceEnteredElsewhere) {
      this.alertServce.errorAlert("Entered 'Display Sequence' is already entered in another custom field.", 'add');
      data.controls[seqIndex].get('sequenceNumber').setValue('');
    }
      }

  onDropdownChange(selectedValue: any, dropdownIndex: number) {
    const selectedUserName = selectedValue.controls[dropdownIndex].value.customUserName;
    let isValueSelectedElsewhere: boolean = false;
    const formArrayData: any = this.customForm.get("fieldData").controls;
    const isSelected = formArrayData.find((options: any, index: any) => {
      return index !== dropdownIndex && options.get("customUserName").value == selectedUserName;
    });
    // console.log("fieldData", this.customForm.get("fieldData"))
    if (isSelected) {
      isValueSelectedElsewhere = true;
      // return;
    }

    if (isValueSelectedElsewhere) {
      this.alertServce.errorAlert("Selected 'System Label Name' is already selected in another dropdown.", 'add');
      selectedValue.controls[dropdownIndex].get('customUserName').setValue('');
    }
    else {
      this.appUserListCopy.push(selectedUserName);
    }
  }
  getViewDynamicDetails() {
    this.showFields = this.dataService.customFieldGet(this.requestObject).subscribe((res: IDynamicFieldsResponse) => {
      this.getFields = res.data;
      this.copyGetFields = res.data?.customField.fieldData;
      this.customFieldFieldData = res.data?.customField.fieldData;
      this.appFieldNames = res.data?.customField.fieldData?.fieldOptions;
      this.CSFId = res.data?.csfId;
      this.CSFStatus = res.data?.status == 'Y' ? true : false;
      this.description = res.data?.description;
    });
  }
  // initializeForm() {
  //   this.showFields = this.dataService.customFieldGet(this.requestObject).subscribe((res: IDynamicFieldsResponse) => {
  //     this.getFields = res.data;
  //     this.copyGetFields = res.data?.customField.fieldData;
  //     this.customFieldFieldData = res.data?.customField.fieldData;
  //     this.appFieldNames = res.data?.customField.fieldData?.fieldOptions;
  //   });
  // }
  createItem() {
    return this.formBuilder.group({
      displayName: ["", Validators.required],
      fieldName: [""],
      sequenceNumber: ["", Validators.required],
      fieldType: ["", Validators.required],
      userList: [""],
      mandatory: [false],
      customUserName: ["", Validators.required],
      fieldOptions: new FormArray([]),
      editable: [true],
      defaultValue: [""],
      category: ["", Validators.required]
    });
  }

  onEditableChange(event: any, item: any, index: any) {
    this.editable = event.checked;
    this.isEditable = event.checked;

    if (event?.checked == false) {
      this.customForm.get('defaultValue')?.setValidators(Validators.required);
      this.removeOptions(item);
    }

    this.customForm?.updateValueAndValidity();
    return event

  }
  createFormWithExistingItem(noFields: boolean) {
    this.isAddbuttonClicked = true;
    this.appUserListCopy = [];
    this.fieldData = (this.customForm.get('fieldData') as FormArray);

    if (this.customFieldFieldData && this.customFieldFieldData.length > 0) {
      this.customFieldFieldData.forEach((item: any, index: any) => {
        const existingFieldData: any = this.formBuilder.group({
          displayName: [item?.displayName, Validators.required],
          fieldName: [item?.fieldName],
          sequenceNumber: [item?.sequenceNumber, Validators.required],
          fieldType: [item?.fieldType, Validators.required],
          userList: [item?.userList],
          mandatory: [item?.mandatory],
          editable: [item?.editable],
          defaultValue: [item?.defaultValue],
          category: [item?.category],
          customUserName: [item.customUserName, Validators.required],
          fieldOptions: new FormArray([
          ])
        });
        if (item?.editable == true) {
          existingFieldData.get('defaultValue')?.setValidators(null);
          this.customForm.get('defaultValue')?.setValidators(null);
          this.fieldTypes = CSF_Dropdown;
        } else {
          this.fieldTypes = [CSF_Dropdown[0]];
          existingFieldData.get('defaultValue')?.setValidators(Validators.required);
          this.customForm.get('defaultValue')?.setValidators(Validators.required);
        }

        this.isEditable = item?.editable ? true : false;
        this.customForm?.updateValueAndValidity();

        if (item.fieldOptions && item.fieldOptions.length > 0) {
          item.fieldOptions.forEach((data: any) => {
            const existingFormGroup: any = this.formBuilder.group({
              appFieldName: [data.appFieldName, Validators.required],
              uiFieldName: data.uiFieldName,
              optionOne: data.optionOne
            })
            existingFieldData.controls.fieldOptions.push(existingFormGroup);

          });
        }
        this.appUserListCopy = [item.customUserName];
        this.fieldData.push(existingFieldData);
      })
    }
  }

  getSubItem(item: any, index: any) {
    return item.get("fieldOptions").controls;
  }

  onKeyPress(evt: KeyboardEvent) {
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 49 || ASCIICode > 57))
      return false;
    return true;
  }
  createSubItem() {
    return this.formBuilder.group({
      appFieldName: "",
      uiFieldName: "",
      optionOne: ""
    });
  }
  createExisitngSubItem(item: any) {
    if (item && item.fieldOptions && item.fieldOptions.length > 0) {
      return item.fieldOptions.map((data: any) => {
        return this.formBuilder.group({
          appFieldName: [data.appFieldName, Validators.required],
          uiFieldName: data.uiFieldName,
          optionOne: data.optionOne
        })
      });
    }
  }
  pushItem() {
    return this.formBuilder.group({
      optionOne: ["", Validators.required],
    });
  }
  addItem(event: any, index?: any): void {
    this.isAddbuttonClicked = true;
    if (this.fieldData.length <= this.appUserList.length - 1) {
      // this.fieldData = (this.customForm.get('fieldData') as FormArray);
      // first == true ? this.fieldData.push(this.createItem()) : this.fieldData.push(this.createItem());
      const formArray: any = (this.customForm.get('fieldData') as FormArray);
      if(this.fieldData.length == 0) {
        formArray.controls.splice(index, 0, this.createItem());
      }
      else {
        formArray.controls.splice(index + 1, 0, this.createItem());
      }
      this.fieldData = formArray;
      this.fieldData.length == this.appUserList.length ? this.maxItemSelected = true : this.maxItemSelected = false;
    }
    else {
      this.maxItemSelected = false;
    }
  }
  removeRow(index: number) {
    this.maxItemSelected = false;
    (<FormArray>this.customForm.get("fieldData")).removeAt(index);
  }
  addSubItem(item: any, itemindex: any) {
    return this.customForm.get('fieldData').controls[itemindex].get("fieldOptions").controls.push(this.createSubItem());
  }
  addExistingSubItems(item: any, itemindex: any) {
    return item.get("fieldOptions").controls.push(this.createExisitngSubItem(item));
  }
  removeSubRow(item: any, index: number) {
    return item.get("fieldOptions").controls.splice(index, 1)
  }
  fieldTypeSelected(data: any, item: any, index: any) {
    if (data.value == 'dropdown') {
      if (item.get("fieldOptions").controls && item.get("fieldOptions").controls.length > 0) {
        this.removeOptions(item);
      }
      this.isFieldSelected = true;
      this.addSubItem(item, index);
    }
    else if (data.value == 'checkbox') {
      if (item.get("fieldOptions").controls && item.get("fieldOptions").controls.length > 0) {
        this.removeOptions(item);
      }
      this.isFieldSelected = true;
      this.addSubItem(item, index);
    }
    else {
      if (item.get("fieldOptions").controls && item.get("fieldOptions").controls.length > 0) {
        this.removeOptions(item);
      }
      // console.log('Selected Dropdown Data:', data);
      this.isFieldSelected = false;
    }
  }

  onCustomerNameSelect(selectedValue: any) {
    this.selectedProjectName = null;
    this.CSFId = null;
    this.selectedCustomer = selectedValue;
    this.projectDisabled = false;
    if(this.customFieldFieldData && this.customFieldFieldData.length > 0) {
      this.customFieldFieldData = [];
      (<FormArray>this.customForm.get("fieldData")).clear();
    }
  }

  onProjectNameSelected(selectedValue: any) {
    this.removeGroup();
    this.isCustomerDropDownSelected = true;
    this.selectedProject = selectedValue;
    this.isError = false;
    this.fetchCSFId(this.selectedProject); 
  }

  getCSFFieldsData() {
    this.buildCSFRequestObject();
    const customerName = this.ClientaccountList.find(x => x.id === this.selectedProject)?.name;
    this.showFields = this.dataService.customFieldGet(this.requestObject).subscribe((res: IDynamicFieldsResponse) => {
      this.getFields = res.data;
      this.copyGetFields = res.data?.customField.fieldData;
      this.customFieldFieldData = res.data?.customField.fieldData;
      this.CSFId == res.data?.csfId;
      this.CSFStatus = res.data?.status == "N" ? false : true;
      this.description = res.data?.description;

      this.selectedDropdown = customerName
      this.selectedDropdownId = this.selectedProject;
      if (this.getFields !== null) {
        this.isCustomerNameSelected == true
        this.createFormWithExistingItem(false);
      }
      else {
        this.isCustomerNameSelected == true;
        this.createFormWithExistingItem(true);
      }
    });
  }

  fetchCSFId(data: any) {
    this.dataService.getCSFId(data.value).subscribe((res: any) => {
      this.CSFId = res.data?.csfId;
      if(!this.CSFId) {
        this.isError = true;
        this.messages = [{ severity: 'error', detail: 'CSF ID is not available for the selected Project' }];
      }
      else {
        this.getCSFFieldsData();
      }
    });

    return this.CSFId;
  }

  buildCSFRequestObject() {
    this.requestObject = {
      "fusionCustomerId": this.selectedCustomer.value,
      "projectId": this.selectedProject.value,
      "csfId": this.CSFId
    };

    return this.requestObject;
  }

  selectedSystemlabel(data: any) {
    this.appUserList.splice(data.originalEvent.explicitOriginalTarget.ariaPosInSet - 1, 1)
  }

  displayFieldCss(field: string, index: any) {
    return {
      'has-error': this.isFieldValid(field, index),
      'has-feedback': this.isFieldValid(field, index)
    };
  }
  get fieldsData(): FormArray {
    return this.form.get('fieldsData') as FormArray;
  }

  isFieldValid(field: string, index: number) {
    const form = this.customForm.get("fieldData").controls[index]
    return !form.get(field).valid && form.get(field).touched;
  }


  saveDynamicFields() {
    let currentUser: any = sessionStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const isFormValid = this.validateAllFormFields();
    const fieldDataValue: any = []

    if (!isFormValid) {
      return
    }

    const selectedCustomer: any = this.ClientaccountList.find(x => {return x.id == this.selectedCustomer.value});
    const selectedProject: any = this.projectsList.find(x => {return x.projectId == this.selectedProject.value});

    this.finalObject = {
      "customerName": selectedCustomer?.name,
      "fusionCustomerId": this.selectedCustomer.value,
      "appUserId": currentUser.appUserId,
      "projectId": this.selectedProject.value,
      "projectName": selectedProject?.projectName,
      "csfId": this.CSFId,
      "description": this.description,
      "status": this.CSFStatus == true ? 'Y' : 'N',
      "customField": {
        "fieldData": null
      }
    }
    this.customForm.get('fieldData').controls.forEach((item: any, index: any) => {
      const seqNumber = item.controls['sequenceNumber'].value ? item.controls['sequenceNumber'].value : index + 1;
      const obj: any = {
        "displayName": item.controls['displayName'].value,
        "fieldName": item.controls['displayName'].value.replace(/[^a-zA-Z0-9]/g, "").replace(" ", "").toLowerCase() + index + seqNumber,
        "sequenceNumber": item.controls['sequenceNumber'].value,
        "fieldType": item.controls['fieldType'].value,
        "mandatory": item.controls['mandatory'].value,
        "customUserName": item.controls['customUserName'].value,
        "editable": item.controls['editable'].value,
        "category": item.controls['category'].value,
        "defaultValue": (this.isEditable == false) ? item.controls['defaultValue'].value : null,
        "fieldValues": null,
        "fieldOptions": []
      }
      if (item.get('fieldOptions') && item.get('fieldOptions').controls && item.get('fieldOptions').controls.length > 0) {
        item.controls['fieldOptions'].controls.forEach((fieldOptionData: any) => {
          const options: any = {
            "appFieldName": fieldOptionData.controls['appFieldName'].value,
            "uiFieldName": fieldOptionData.controls['uiFieldName'].value,
            "optionOne": null
          }
          obj.fieldOptions.push(options)
        })
      }
      // console.log("item", item)
      fieldDataValue.push(obj)
    })
    this.finalObject.customField.fieldData = fieldDataValue

    this.dataService.customFieldSave(this.finalObject).subscribe((res: any) => {
      if (res) {
        this.alertServce.successAlert('Data saved successfully', 'add');
        this.getViewDynamicDetails()
      }

    },
      (err: any) => {
        // console.log('Some Error', err);
        this.alertServce.errorAlert('Data was not saved');
      }
    );
  }

  removeGroup() {
    this.customForm.get("fieldData").clear();
  }
  removeOptions(item: any) {
    item.get("fieldOptions").clear();
  }

  onSubmit() {
    this.saveDynamicFields();
  }

  validateAllFormFields() {
    var fieldsControls = this.customForm.get("fieldData").controls;
    let isValid: boolean = true;
    // let index:number=0
    for (let [index, field] of fieldsControls.entries()) {
      if (!isValid) {
        break
      }
      const allFormFields = Object.keys(field.controls)
      allFormFields.forEach((item: any) => {
        if (!isValid) {
          return
        }
        this.displayFieldCss(item, index);
        const control = field.get(item)
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
      })
    }

    if (!isValid) {
      for (let [formindex, field] of fieldsControls.entries()) {
        const allFormFields = Object.keys(field.controls)
        allFormFields.forEach((item: any) => {
          this.displayFieldCss(item, formindex);
          const control = field.get(item)
          if (control?.disabled == false) {
            control?.markAsTouched({ onlySelf: true });
          } else if (control?.disabled == true && !this.isRequiredValidationPassed(control)) {
            control?.markAsTouched({ onlySelf: true });
          }

        })

      }
    }

    return isValid;
  }

  isRequiredValidationPassed(control: any) {
    const validator = (control && control?.validator) ? control.validator({} as AbstractControl) : null;
    if (!validator) {
      return true;
    }

    return validator && validator.required && control?.value;

  }
  isAllowEdit(item: any): boolean {
    return item.get("editable").value
  }
  onDropdownClicked(item: any) {
    if (item.get("editable").value == true) {
      this.fieldTypes = CSF_Dropdown;
    }
    else {
      this.fieldTypes = [CSF_Dropdown[0]];
    }
  }

  displayMainAddButton() {
    if((this.fieldData && this.fieldData.length == 0) || (!this.fieldData)) {
      // console.log('this.fieldData', this.fieldData);
      return true;
    } 
    return false;   
  }
}