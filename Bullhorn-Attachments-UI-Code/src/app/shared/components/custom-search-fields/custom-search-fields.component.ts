import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDynamicFieldsResponse } from '../../models/dynamic-fields/dynamic-fields-get.model';
import { SetupDataService } from '../../services/data-service/setup-data.service';
import { ErrorMessages } from '../../utils/error-messages.constant';
import { PlacementReviewDataModel } from '../../models/review/placement-review-data.model';

@Component({
  selector: 'app-custom-search-fields',
  templateUrl: './custom-search-fields.component.html',
  styleUrl: './custom-search-fields.component.scss'
})
export class CustomSearchFieldsComponent {
  readonly errorMessages = ErrorMessages;
  form!: FormGroup;
  formGroup: FormGroup | undefined;
  showFields: any;
  fusionCustomerId: any;
  placementId: any;
  getFields: any;
  copyGetFields: any;
  appFieldNames: any;
  customFieldFieldData: any;
  checked: boolean = false;
  allReviewData!: PlacementReviewDataModel;
  CSFStatus: boolean = true;

  @Input()
  public get reviewData(): PlacementReviewDataModel {
      return this.allReviewData;
  }
  public set reviewData(data: PlacementReviewDataModel) {
      if (data && Object.keys(data).length) {
          this.allReviewData = data;
          this.fetchCustomFields();
        //   this.prepareSectionData(this.allReviewData);
      }
  }

  constructor(
      private formBuilder: FormBuilder,
      private setupDataService: SetupDataService
  ) {}

  ngOnInit() {
      this.fusionCustomerId = 1;
      this.form = new FormGroup({});
  }

  createForm(): void {
      let formGroup: any = {};

      this.customFieldFieldData.forEach((field: any) => {
        this.form.addControl(field.fieldName, 
            formGroup[field.fieldName] =  new FormControl({
                value: field.fieldValues, disabled: true//field.fieldValue
            },
                field.mandatory ? [Validators.required] : null) 
            );
      });
  }

  addValidators(field: any) {
    if(field.mandatory){
        return Validators.required;
    }
    else{
        return null;
    }
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

  readFieldData() {}

  bindFieldData() {}

  fetchCustomFields() {
    this.showFields = this.setupDataService.customFieldValueGet(this.allReviewData.placementId).subscribe((res: IDynamicFieldsResponse) => {
        this.getFields = res.data;
        if ((res.responseCode = 1001)) {
        }
        this.copyGetFields = res.data?.customField.fieldData;
        this.customFieldFieldData = res.data?.customField.fieldData;
        this.appFieldNames = res.data?.customField.fieldData?.fieldOptions;
        this.CSFStatus = res.data?.status == "N" ? false : true;

        if(this.customFieldFieldData && this.customFieldFieldData.length > 0) {
            this.createForm();
        }
    });
  }

  get fieldsData(): FormArray {
      return this.form.get('fieldsData') as FormArray;
  }
}
