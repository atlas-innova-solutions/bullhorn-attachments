import { Component, OnInit, input } from '@angular/core';
import { SetupDataService } from './../../shared/services/data-service/setup-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, } from 'primeng/dynamicdialog';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';
import { Subject } from 'rxjs';
import { candidateColumns, companyColumns, contactColumns, joborderColumns, placementColumns } from '../../shared/utils/entity-columns';
import { QueryParamsModel } from '../../shared/models/change-management.model';



@Component({
  selector: 'app-bullhorn-entity-list',
  templateUrl: './bullhorn-entity-list.component.html',
  styleUrl: './bullhorn-entity-list.component.scss'
})
export class BullhornEntityListComponent implements OnInit {

  onFirstLoad: boolean = false;
  storeEventValue: any;
  limit: any;
  startIndex: any;
  dataTableCount!: number;
  totalRecords: number | undefined;
  loading: boolean = false;
  isSearchThroughFilterInput: boolean = false;
  hideGrid!: boolean;
  size: number = 0;
  private readonly filterSubject: Subject<any> = new Subject<string | undefined>();
  candidateAttachmentList:any=[];
  userId:any='';

  candidateList: any = [];
  sourceId: any = '';
  entityType: any = '';
  pageNumber: number = 1;
  entityId :any = '';
  cols: any = [
    { field: 'bhCandidateId', header: 'Candidate Id' },
    { field: 'bhFirstName', header: 'First Name' },
    { field: 'bhLastName', header: 'Last Name' },
    { field: 'bhEmployeeType', header: 'Employee Type' },
    { field: 'bhEmail', header: 'Email' },
    { field: 'bhMobile', header: 'Mobile' },
    { field: 'attachment', header: 'Attachment' }
  ];
  tabs: { title: string, content: string, id: string }[] = [];

  constructor(private SetupDataService: SetupDataService,
    private router: Router,
    private routeparam: ActivatedRoute,
    private sharedService: SharedService
  ) {


  }

  ngOnInit(): void {
    this.routeparam.queryParams.subscribe((param: any)=>{
      if(param) {
        console.log('param is', param)
        this.sourceId = param.sourceId;
      }
    })
    const userPermissionsData: any = localStorage.getItem(LocalStorageVariables.userPermission);
    const entityTypes = JSON.parse(userPermissionsData);
    this.userId = entityTypes.userId;

    if (entityTypes) {
      this.tabs = entityTypes.entityAccess.map((item: any) => {
        return {
          'title': item?.entityName,
          'content': (item?.entityName).toLowerCase(),
          'id': item?.entityId
        }
      })
      console.log('this is tab data', this.tabs)
      this.entityType = this.tabs[0].content;
      this.entityId = this.tabs[0].id
      // this.getEntityData();
    } else {
      this.sharedService.userPermissionDetails.subscribe((data: any) => {
        if (data && data?.entityAccess && data?.entityAccess.length) {
          this.tabs = data.entityAccess.map((item: any) => {
            return {
              'title': item?.entityName,
              'content': (item?.entityName).toLowerCase(),
              'id': item?.entityId
            }
          })
          console.log('this is tab data', this.tabs)
          this.entityType = this.tabs[0].content
          //this.getEntityData();
        }
      })
    }

   // Tab changes on the basis of access(Should be comment)
    // this.tabs =[
    //   {title:'Candidate', content:'candidate', id:'candidate'},
    //   {title:'Placement', content:'placement', id:'placement'},
    //   {title:'Joborder', content:'joborder', id:'joborder'},
    //   {title:'Company', content:'company', id:'company'},
    //   {title:'Contact', content:'contact', id:'contact'}
    // ];
    // this.entityType = this.tabs[0].content
    // this.getEntityData();
  }

  getEntityData(event?: any) {
    debugger;
    this.getEntityColumnsByEntityType();
    this.candidateList = [];
    this.storeEventValue = event;
    this.limit = event && event.rows ? event.rows : 25;
    let firstEvent: any = event && event.first ? event.first : 0;
    this.startIndex = firstEvent / this.limit;
      const id: any = event?.filters?.bhCandidateId?.value;;
      const firstName: string = event?.filters?.bhFirstName?.value;
      const lastName: string =  event?.filters?.bhLastName?.value;
    this.SetupDataService.getAttachmentLIst(this.entityType, this.startIndex+1, firstName, lastName, id ).subscribe((res: any) => {
      console.log('this is the source id response pageeee', res);
      if (res) {
       this.dataTableCount = res?.totalElements;
       console.log('total rec', this.dataTableCount);
        this.candidateList = res?.content;
      }
    }, err => {
      console.log('unable to get the source id');
      this.dataTableCount = 0;
      this.size = 25;
      this.limit = 25;
      this.startIndex = 0;
    })
  }


  // For attachment fetch
  entityFileAttachmentList(event: any) {
    debugger;
    console.log("this is event" + event);
    this.router.navigate(['home/bullhorn-entity-file-attachment-list'], { queryParams: { candidateId: event.bhCandidateId, entityId: this.entityId, sourceTypeId:this.sourceId, userId:this.userId} }); 
  }

  onTabChange(event: any) {
    this.entityType = this.tabs[event?.index].content;
    this.entityId= this.tabs[event?.index].id;
    console.log('on tab change', this.entityType)
    this.getEntityData();
  }

  getEntityColumnsByEntityType() {
   this.cols = [];
    if (this.entityType == 'candidate') {
      this.cols = candidateColumns;
    } else if (this.entityType == 'placement') {
      this.cols = placementColumns;
    } else if (this.entityType == 'joborder') {
      this.cols = joborderColumns;
    } else if (this.entityType == 'company') {
      this.cols = companyColumns;
    } else if (this.entityType == 'contact') {
      this.cols = contactColumns;
    } else {
      this.cols = [];
    }
  }
  showDialog(){
    debugger;
    console.log("i am herer");
    this.router.navigate(['home/download-file-history'], {queryParams:{userId:this.userId}});
  }
  

}
