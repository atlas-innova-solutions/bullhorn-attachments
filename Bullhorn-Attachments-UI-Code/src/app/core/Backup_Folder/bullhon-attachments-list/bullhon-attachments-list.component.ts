import { Component, OnInit, input} from '@angular/core';
import { SetupDataService } from '../../../shared/services/data-service/setup-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig,  } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-bullhon-attachments-list',
  templateUrl: './bullhon-attachments-list.component.html',
  styleUrl: './bullhon-attachments-list.component.scss'
})
export class BullhonAttachmentsListComponent implements OnInit{
  candidateList :any=[];
  sourceId:any= '';
  cols: any=[
  {field: 'bhCandidateId', header: 'Candidate Id'},
  {field: 'bhFirstName', header: 'First Name'},
  {field: 'bhLastName', header: 'Last Name'},
  {field: 'bhEmployeeType', header: 'Employee Type'},
  {field: 'bhEmail', header: 'Email'},
  {field: 'bhMobile', header:'Mobile'},
  {field: 'attachment', header:'Attachment'}
]
  constructor( private SetupDataService: SetupDataService,
    private router: Router,
    private routeparam: ActivatedRoute
  ){
    

  }

  ngOnInit(): void { 
    // this.routeparam.queryParams.subscribe((param: any)=>{
    //   if(param) {
    //     console.log('param is', param)
    //     this.sourceId = param.sourceId;
    //     this.SetupDataService.getAttachmentLIst(this.sourceId).subscribe((res: any) => {
    //       console.log('this is the source id response', res);
    //       if(res && res.length){
    //         this.candidateList = res;
    //       }
    //     },err => {
    //       console.log('unable to get the source id');
    //     })
    //   }
    // })  
  }

  
  candidateAttachment(event: any){
    console.log("this is event"+event);
    this.router.navigate(['home/candidate-attachment-List'],{ queryParams:{data :JSON.stringify(event)}});
  }

}
