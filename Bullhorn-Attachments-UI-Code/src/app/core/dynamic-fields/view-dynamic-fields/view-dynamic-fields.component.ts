import { Component } from '@angular/core';
import { SetupDataService } from '../../../shared/services/data-service/setup-data.service';
import { IDynamicFieldsResponse } from '../../../shared/models/dynamic-fields/dynamic-fields-get.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-dynamic-fields',
  templateUrl: './view-dynamic-fields.component.html',
  styleUrl: './view-dynamic-fields.component.scss'
})
export class ViewDynamicFieldsComponent {
  form!: FormGroup;
  formGroup: FormGroup | undefined;
  showFields: any;
  fusionCustomerId: any;
  getFields: any;
  copyGetFields: any;
  appFieldNames: any;
  customFieldFieldData: any;
  checked: boolean = false;

  constructor(private setupDataService: SetupDataService) { }

  ngOnInit() {
    this.fusionCustomerId = 3; 
    this.showFields = this.setupDataService.customFieldGet(this.fusionCustomerId).subscribe((res: IDynamicFieldsResponse) => {
      this.getFields = res.data;
      this.copyGetFields = res.data?.customField.fieldData;
      this.customFieldFieldData = res.data?.customField.fieldData;
      this.appFieldNames = res.data?.customField.fieldData?.fieldOptions;   
      this.form = new FormGroup({});
      this.customFieldFieldData.forEach((data: any, index: number) => {
        this.form.addControl('displayName'+index, new FormControl(data.displayName));
        this.form.addControl('fieldName'+index, new FormControl(data.fieldName));
        this.form.addControl('fieldType'+index, new FormControl(data.fieldType));
        this.form.addControl('mandatory'+index, new FormControl(data.mandatory));
      });
    });
  }

   

  readFieldData() {}

  bindFieldData() {}

  get fieldsData(): FormArray {
    return this.form.get('fieldsData') as FormArray;
  }
}
