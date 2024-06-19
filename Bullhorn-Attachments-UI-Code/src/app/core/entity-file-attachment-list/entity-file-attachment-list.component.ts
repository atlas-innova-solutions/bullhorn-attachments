import { Component, OnInit } from '@angular/core';
import { SetupDataService } from './../../shared/services/data-service/setup-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';

@Component({
  selector: 'app-entity-file-attachment-list',
  templateUrl: './entity-file-attachment-list.component.html',
  styleUrl: './entity-file-attachment-list.component.scss'
})
export class EntityFileAttachmentListComponent  implements OnInit {
  candidateAttachmentList:any=[];
  entityFileAttachmentLists:any=[];
  sourceId:any='';
  entityId:any='';
  entityTypeId:any='';
  candidateId:any='';

  dataTableCount!: number;
  totalRecords: number | undefined;
  loading: boolean = false;

  cols: any = [
    { field: 'bhFileId', header: 'File Id' },
    { field: 'bhFileName', header: 'File Name' },
    { field: 'bhType', header: 'File Type' },
    { field: 'bhDistribution', header: 'Distribution' },
    { field: 'fileSize', header: 'File Size' },
    { field: 'bhDateAdded', header: 'Date Added' }
  ];

  //changes for access 
  userId: any;
  constructor( private SetupDataService: SetupDataService,
    private router: Router,
    private routeparam: ActivatedRoute,
    private sharedService: SharedService
  ){
    

  }
  ngOnInit(): void {
    debugger;
     this.routeparam.queryParams.subscribe((param: any)=>{
       if(param) {
         this.candidateId = param?.candidateId;
         this.entityTypeId = param?.entityId;
         this.sourceId = param?.sourceTypeId;
         this.userId=param?.userId;
       }
     })   

    const userPermissionsData: any = localStorage.getItem(LocalStorageVariables.userPermission);
    const entityTypes = JSON.parse(userPermissionsData);
    this.userId = entityTypes.userId;
    

    this.SetupDataService.getCandidateFileAttachmentList(this.sourceId,this.entityTypeId,this.candidateId,this.userId).subscribe((res:any) =>{
          
      if (res) {
              this.entityFileAttachmentLists = res.candidates; 
             console.log('this is the source id responseccccccccc', this.entityFileAttachmentLists);  
           } 
           else {
            console.log('Something is wrong');
           }
       })  
  }
  
  saveDownloadHistory(data: any) {
    debugger;
    const param =   {
      "userId": this.userId,
      "fileId": data?.bhFileId,
      "fileName": data?.bhFileName,
      "fileType": data?.bhType,
      "downloadTime": data?.downloadTime,
      "candidateId" : data?.candidateId
     
  }
    this.SetupDataService.addDownloadHistory(param).subscribe((res)=>{
      console.log('Data saved successfully');

    },err=>{
      console.log('Error while saving the download history');
    })
  }


}
