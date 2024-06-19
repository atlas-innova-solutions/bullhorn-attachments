import { Component } from '@angular/core';
import { CoreModulesUrl } from '../../../shared/utils/page-navigation-url';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-configuaration',
  templateUrl: './admin-configuaration.component.html',
  styleUrl: './admin-configuaration.component.scss'
})
export class AdminConfiguarationComponent {


  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  gotoViewDynamicFields() {
    this.router.navigate([CoreModulesUrl.Admin + '/' + CoreModulesUrl.SetDynamicFieldsValue]);
  }

  routeToCustomFields(){
    this.router.navigate([CoreModulesUrl.Admin + '/' + CoreModulesUrl.CustomerSpecificFieldConfig]);
  }
}
