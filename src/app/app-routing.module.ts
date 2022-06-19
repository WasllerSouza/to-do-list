import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppMainComponent} from "./form/app-main/app-main.component";

const routes: Routes = [
  { path: '', component: AppMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
