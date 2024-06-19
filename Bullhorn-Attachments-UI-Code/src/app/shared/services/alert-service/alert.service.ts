import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private messageService: MessageService) {}

    successAlert(msg: any, data?: any) {
        console.log(data);
        let x: any = {
            severity: 'success',
            summary: 'Success',
            detail: msg
        };
        if (data) {
            x['key'] = data;
        }
        this.messageService.add(x);
    }
    errorAlert(msg: any, data?: any) {
        let x: any = {
            severity: 'error',
            summary: 'Error',
            detail: msg
        };
        if (data) {
            x['key'] = data;
        }
        this.messageService.add(x);
    }
    showInfo(msg: any) {
        this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: msg
        });
    }

    showWarn(msg: any) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warn',
            detail: msg
        });
    }
    close() {
        this.messageService.clear();
    }
}
