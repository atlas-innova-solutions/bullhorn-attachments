import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ucFirst'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
    transform(str: string): string {
        if (str !== undefined && str !== null) {
            // Uppercase first Character of String
            let splitStr = str.toLowerCase().split(' ');
            for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join(' ');
            /*var ucFistString = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); 
      return ucFistString;*/
        } else {
            return '';
        }
    }
}
