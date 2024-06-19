import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SaveDynamicFieldsValueComponent } from "./save-dynamic-fields-value.component";

const routes: Routes = [{
    path: '', component: SaveDynamicFieldsValueComponent,
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
  export class SaveDynamicFieldsValueRoutingModule { }
  