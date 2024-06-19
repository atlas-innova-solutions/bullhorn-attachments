import { Component, OnInit } from '@angular/core';
import { change_history } from '../../utils/lable-text-constant';
import { SetupDataService } from '../../services/data-service/setup-data.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ChangeHistoryData } from '../../models/Data-Table/worker-search-data-grid/change-history-data.model';
import { DateFormatService } from '../../services/date-format/date-format-service';



@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrl: './change-history.component.scss'
})
export class ChangeHistoryComponent implements OnInit{


  data: any;
  ChangeHistoryData:ChangeHistoryData[]=[];
  chnageHistoryCols!: any[];
  caseId!:number;
  atsPlacementId!:number;
  constructor(private config: DynamicDialogConfig,
   private SetupDataService:SetupDataService,
   private dateFormatService: DateFormatService
   ) {}

  cols: any

  ngOnInit() {
    this.caseId=this.config.data.caseId;
    this.atsPlacementId=this.config.data.atsPlacementId;
    this.invokeChangeHistory(this.caseId,this.atsPlacementId);

  }
 
  invokeChangeHistory(caseId: number, atsPlacementId: number): void {
    if (this.chnageHistoryCols === undefined || this.chnageHistoryCols.length === 0) {
        this.chnageHistoryCols = change_history;
    }

    this.SetupDataService.getChangeHistoryByCaseId(caseId,atsPlacementId).subscribe(
        (res: ChangeHistoryData[]) => {
            this.ChangeHistoryData = res?.map((item: ChangeHistoryData) => {
                item.modifiedDate = this.dateFormatService.convert_to_mmddyyyy_hhmmss(item.modifiedDate);
                return item;
            });
        },
        (err: any) => {
            this.ChangeHistoryData = [];
        }
    );
}

}
