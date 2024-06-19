// import { Component, OnInit } from '@angular/core';
// import { SetupDataService } from '../../../shared/services/data-service/setup-data.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-bullhon-attachments-dashboard',
//   templateUrl: './bullhon-attachments-dashboard.component.html',
//   styleUrl: './bullhon-attachments-dashboard.component.scss'
// })
// export class BullhonAttachmentsDashboardComponent implements OnInit {
//   sourceIdData :any=[];

//   constructor( private SetupDataService: SetupDataService,
//     private router: Router
//   ){
    

//   }

//   ngOnInit(): void {
//     const sourceIdentifier = [
//       {
//         name: 'Innova',
//         id: 1
//       },
//       {
//         name: 'Bullhorn',
//         id: 2
//       },
//       {
//         name: 'Volt',
//         id: 3
//       }
//     ]
//     this.sourceIdData = sourceIdentifier;
//     this.SetupDataService.getBHSourceId().subscribe((res: any) => {
//       console.log('this is the source id response', res);

//     },err => {
//       console.log('unable to get the source id');
//     })
//   }

//   setSourceId(event:any){
//     console.log("this is event"+event);
//     this.router.navigate(['home/bullhorn-dashboard-List'],{ queryParams:{sourceId :event.value}});
//   }
  

// }
