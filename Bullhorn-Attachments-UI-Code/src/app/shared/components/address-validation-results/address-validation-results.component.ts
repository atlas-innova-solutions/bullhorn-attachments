import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-address-validation-results',
  templateUrl: './address-validation-results.component.html',
  styleUrl: './address-validation-results.component.scss'
})
export class AddressValidationResultsComponent {
  display: boolean = true;
  scroll: boolean = true;
  @Input() enterdData: any;
  @Output() selecEnteredAddress = new EventEmitter<boolean>();
  @Output() selectGoogleAddress = new EventEmitter<number>();
  @Output() closePopUpValue = new EventEmitter<boolean>();
  googledata: any[] = [];
  arrlength: any;
  googlDataShowing!: number;

  constructor() {}

  @Input()
  get googleData(): any {
    return this.googledata;
  }
  set googleData(data: any) {
    this.googledata = data;
    if (data && this.googledata) {
      this.arrlength = this.googledata.length;
    }
  }

  closePopup() {
    this.closePopUpValue.emit(false);
  }

  selectenteraddress(ele: boolean) {
    this.selecEnteredAddress.emit(ele);
    this.display = false;
  }
  selectgoogleaddress(ele: number) {
    this.selectGoogleAddress.emit(ele);
    this.display = false;
  }
}
