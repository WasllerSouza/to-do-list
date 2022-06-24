import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLoginComponent} from "./form/app-login/app-login.component";
import {AppMainComponent} from "./form/app-main/app-main.component";

const routes: Routes = [
  { path: '', component: AppLoginComponent },
  { path: 'main', component: AppMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
