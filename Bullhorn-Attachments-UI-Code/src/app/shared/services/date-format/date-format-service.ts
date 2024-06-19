import { Injectable } from '@angular/core';
//import moment from 'moment';
import moment from 'moment-timezone';


@Injectable({
    providedIn: 'root'
})
export class DateFormatService {
    /* 
        Use this function to format the utc date string as per user system timezone. 
    */
    getCurrentDateTimeByUTC(utcDateString: string): string {
 
        if (!utcDateString) {
            return '';
        }
       
        return moment.utc(utcDateString).local().format('MM/DD/YYYY HH:mm:ss');
    }

    /* 
         Use this function to format the date string from (DD-MM-YYYY) to (MM/DD/YYYY)
         Below Format will be used for displaying the date format across the application (MM/DD/YYYY)
    */
    convert_ddmmyyyy_hypen_to_mmddyyyy_slash(date: string): string {
        if (!date) {
            return '';
        }
        return moment(date, 'DD-MM-YYYY').format('MM/DD/YYYY');
    }

        /* 
         Use this function to format the date string from (MM-DD-YYYY) to (MM/DD/YYYY)
         Below Format will be used for displaying the date format across the application (MM/DD/YYYY)
    */
         convert_mmddyyyy_hypen_to_mmddyyyy_slash(date: string): string {
            if (!date) {
                return '';
            }
            return moment(date, 'MM-DD-YYYY').format('MM/DD/YYYY');
        }

    /* 
        Use this function to convert the date with (MM-DD-YYYY) into (DD/MM/YYYY) format
    */
    convert_mmddyyyy_hyphen_to_ddmmyyyy_slash(date: string): string {
        if (!date) {
            return '';
        }
        return moment(date, 'MM-DD-YYYY').format('DD/MM/YYYY');
    }

        /* 
        Use this function to convert the date with (MM-DD-YYYY) into (MM/DD/YYYY) format
    */
        convert_mmddyyyy_hyphen_to_mmddyyyy_slash(date: string): string {
            if (!date) {
                return '';
            }
            return moment(date, 'MM-DD-YYYY').format('MM/DD/YYYY');
        }

    /* 
        Use this function to convert the date string into (MM/DD/YYYY) format
    */
    convert_to_mmddyyyy(date: string): string {
        if (!date) {
            return '';
        }
        return moment(date).format('MM/DD/YYYY');
    }
    
    convert_to_yyyymmdd(date: Date): string {
        if (!date) {
            return '';
        }
        return moment(date).format('YYYY-MM-DD');
    }
    /* 
        Use this function to convert the date string into (MM-DD-YYYY) format
    */
    convert_to_mmddyyyy_with_hyphen(date: string): string {
        if (!date) {
            return '';
        }
        return moment(date).format('MM-DD-YYYY');
    }

    /* 
        Use this function to convert the date string into (DD-MM-YYYY) format
    */
    convert_to_ddmmyyyy_with_hyphen(date: string): string {
        if (!date) {
            return '';
        }
        return moment(date).format('DD-MM-YYYY');
    }

    /* 
        Use this function to convert the date string into (DD/MM/YYYY) format
    */
    convert_to_ddmmyyyy_with_slash(date: string): string {
        if (!date) {
            return '';
        }
        return moment(date).format('DD/MM/YYYY');
    }

    /* 
        Use this function to convert the date string into (MM/DD/YYYY HH:mm:ss) format
    */
    convert_to_mmddyyyy_hhmmss(date: string): string {
        if (!date) {
            return '';
        }
        return moment(date).format('MM/DD/YYYY HH:mm:ss');
    }

    getLocalTimeZone(){
        const sone =  moment.tz.guess();
        const timezone = moment.tz(sone).zoneAbbr();
        return timezone;
    }

    checkStartDateGreaterThanEndDate(startDate: string, endDate: string): boolean {
        const start = moment(startDate);
        const end = moment(endDate);

        return !(start > end);
    }
}
