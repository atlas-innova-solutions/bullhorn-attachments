import { Component, OnInit } from '@angular/core';
import { SetupDataService } from '../../shared/services/data-service/setup-data.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared-service/shared.service';
import { LocalStorageVariables } from '../../shared/utils/local-storage-variable';


@Component({
  selector: 'app-bullhorn-dashboard',
  templateUrl: './bullhorn-dashboard.component.html',
  styleUrl: './bullhorn-dashboard.component.scss'
})
export class BullhornDashboardComponent implements OnInit {
  sourceIdData: any = [];

  constructor(private SetupDataService: SetupDataService,
    private router: Router, private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getUserPermissions();
  }

  getUserPermissions(): void {
    let sourceIdentifier = [];
    const userPermissionsData: any = localStorage.getItem(LocalStorageVariables.userPermission);
    const sourceSystemsData = JSON.parse(userPermissionsData);
    if (sourceSystemsData) {
      sourceIdentifier = sourceSystemsData.sourceSystems.map((item: any) => {
        return {
          'name': item?.sourceName,
          'id': item?.sourceId
        }
      })
      this.sourceIdData = sourceIdentifier;
      console.log('source system is here', this.sourceIdData)
    } else {
      this.sharedService.userPermissionDetails.subscribe((data: any) => {
        if (data && data?.sourceSystems && data?.sourceSystems.length) {
          sourceIdentifier = data.sourceSystems.map((item: any) => {
            return {
              'name': item?.sourceName,
              'id': item?.sourceId
            }
          })
          this.sourceIdData = sourceIdentifier;
          console.log('source system is here', this.sourceIdData)
        }
      })
    }

  }

  setSourceId(event: any) {
    console.log("this is event" + event);
    this.router.navigate(['home/bullhorn-entity-List'], { queryParams: { sourceId: event.value } });
  }



}

