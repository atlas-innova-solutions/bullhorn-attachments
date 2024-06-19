import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ViewDynamicFieldsComponent } from "./view-dynamic-fields.component";

const routes: Routes = [{
    path: '', component: ViewDynamicFieldsComponent,
    data: {
      breadcrumb: null,
      icon: ''
    }
  }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ViewDynamicFieldsRoutingModule { }
  