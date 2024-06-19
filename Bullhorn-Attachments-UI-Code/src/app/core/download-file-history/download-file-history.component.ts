import { Component,OnInit } from '@angular/core';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import { SetupDataService } from './../../shared/services/data-service/setup-data.service';

@Component({
  selector: 'app-download-file-history',
  templateUrl: './download-file-history.component.html',
  styleUrl: './download-file-history.component.scss'
})
export class DownloadFileHistoryComponent {
  userId:any='';
  dataTableCount!: number;
  totalRecords: number | undefined;
  loading: boolean = false;
  downloadedHistory:any[]=[];

  cols: any = [
    { field: 'userId', header: 'User Id' },
    { field: 'fileId', header: 'File Id' },
    { field: 'fileName', header: 'File Name' },
    { field: 'fileType', header: 'File Type' },
    {field: 'candidateId', header: 'Candidate Id'},
    { field: 'downloadTime', header: 'Download Time' }
  ];


  constructor( private SetupDataService: SetupDataService,
    private router: Router,
    private routeparam: ActivatedRoute,
    private sharedService: SharedService
  ){
    

  }

 ngOnInit(): void{

  this.routeparam.queryParams.subscribe((param: any)=>{
    if(param) {
      console.log('param is', param)
      this.userId = param.userId;
    }
  })

  const userPermissionsData: any = localStorage.getItem(LocalStorageVariables.userPermission);
  const entityTypes = JSON.parse(userPermissionsData);
  this.userId = entityTypes.userId;
  
  this.SetupDataService.getDownloadFileHistory(this.userId).subscribe((res:any) =>{
    debugger;
        
    if (res) {
      this.downloadedHistory = res;            
           console.log('this is the source id responseccccccccc', res);  
         } 
         else {
          console.log('Something is wrong');
         }
     })
 }

}
