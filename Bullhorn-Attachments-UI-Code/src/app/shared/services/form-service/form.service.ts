import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor() {}
    /**
     * Marks all controls in a form group as disabled
     * @param formGroup - The form group to touch
     */
    markFormGroupPristine(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsPristine();
            if (control.controls) {
                this.markFormGroupPristine(control);
            }
        });
    }
    markFormGroupTouched(formGroup: FormGroup) {
        if (formGroup) {
            (<any>Object).entries(formGroup.controls).forEach(([key, control]: any) => {
                if (!control.value && control.status != 'DISABLED') {
                    control.markAsTouched();
                }
                if (control.controls) {
                    this.markFormGroupTouched(control);
                }
            });
        }
    }
    markFormGroupDisabled(formGroup: FormGroup, exclusions?: any[]) {
        (<any>Object).entries(formGroup.controls).forEach(([key, control]: any) => {
            if (!exclusions?.includes(key)) {
                control.disable();
                if (control.controls) {
                    this.markFormGroupDisabled(control);
                }
            }
        });
    }
    markFormGroupEnabled(formGroup: FormGroup, exclusions?: any[]) {
        (<any>Object).entries(formGroup.controls).forEach(([key, control]: any) => {
            if (!exclusions?.includes(key)) {
                control.enable();
                if (control.controls) {
                    this.markFormGroupEnabled(control);
                }
            }
        });
    }
    validateForm(formGroup: FormGroup) {
        let returnVal = true;
        if (formGroup && formGroup.status == 'DISABLED') {
            returnVal = true;
        } else if (formGroup && !formGroup.valid) {
            returnVal = false;
        }

        return returnVal;
    }
}
