import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class SharedDialogService {

  constructor(private dialogService: DialogService) { }

  openDialog({ component, config }: { component: Type<any>; config: DynamicDialogConfig; }) {
    return this.dialogService.open(component, config);
  }
}
