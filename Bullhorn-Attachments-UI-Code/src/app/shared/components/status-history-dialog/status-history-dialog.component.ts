import { Component, Input } from '@angular/core';
import { DynamicDialogConfig,  } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-status-history-dialog',
  templateUrl: './status-history-dialog.component.html',
  styleUrl: './status-history-dialog.component.scss'
})
export class StatusHistoryDialogComponent {
  
  data: any;

  constructor(private config: DynamicDialogConfig) {}

  cols: any

  ngOnInit() {
    
    this.data = {
      statusData: this.config.data.statusData
    };

    this.cols = this.config.data.cols;
  }
 }
