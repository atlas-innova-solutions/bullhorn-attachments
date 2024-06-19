import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[TwoDigitDecimalNumber]'
})
export class TwoDigitDecimalNumberDirective {
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
    constructor(private el: ElementRef) {}
    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (this.specialKeys.indexOf(e.key) !== -1) {
            if (e.key == '-') {
                e.preventDefault();
                return;
            }
            return;
        }
        let input = this.el.nativeElement.value;
        const reg = /^\d*(?:[.,]\d{0,1})?$/;
        const position = this.el.nativeElement.selectionStart;
        if (position != null) {
            const regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
            const next: string = [input.slice(0, position), e.key == 'Decimal' ? '.' : e.key, input.slice(position)].join('');
            if (next && !String(next).match(regex)) {
                e.preventDefault();
            }
        } else {
            if (!reg.test(input)) {
                e.preventDefault();
            }
        }
    }
}
