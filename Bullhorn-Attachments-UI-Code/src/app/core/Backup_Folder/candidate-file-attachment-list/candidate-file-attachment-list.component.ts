import { Component, OnInit } from '@angular/core';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-file-attachment-list',
  templateUrl: './candidate-file-attachment-list.component.html',
  styleUrl: './candidate-file-attachment-list.component.scss'
})
export class CandidateFileAttachmentListComponent implements OnInit {
  candidateAttachmentList:any=[];
  sourceId:any=2;
  entity:any='candidate';
  entityType:any=2606395;
  constructor( private SetupDataService: SetupDataService,
    private router: Router,
    private routeparam: ActivatedRoute
  ){
    

  }
  ngOnInit(): void {
    this.routeparam.queryParams.subscribe((param: any)=>{
      debugger;
      if(param) {
        console.log('param is', JSON.parse(param?.data));
        const candidateData = JSON.parse(param?.data);
        this.entityType = candidateData?.bhCandidateId;
        this.candidateAttachmentList = candidateData?.candidatesList;
      }
    })
  }

// getAttachmentList(entity: any ,entityType: any, sourceId: any) {
//   this.SetupDataService.getCandidateAttachmentList(this.entity,this.entityType,this.sourceId).subscribe((res: any) => {
//     console.log('this is the source id response', res);
//     if(res && res.length){
//       this.candidateAttachmentList = res;

//     }
//   },err => {
//     console.log('unable to get the source id');
//   })
// }
  

}
