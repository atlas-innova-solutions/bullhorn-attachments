import { RouterModule, Routes } from "@angular/router";
import { DynamicFieldsComponent } from "./dynamic-fields.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{
    path: '', component: DynamicFieldsComponent,
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
  export class DynamicFieldsRoutingModule { }
  