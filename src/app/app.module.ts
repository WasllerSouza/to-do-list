import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AppConfigComponent} from "./form/app-config/app-config.component";
import {PatientComponent} from "./form/patient/patient.component";
import {AppConfigService} from "./service/app-config.service";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import { AppTopbarComponent } from './form/app-topbar/app-topbar.component';
import { AppFooterComponent } from './form/app-footer/app-footer.component';
import {TooltipModule} from "primeng/tooltip";
import {JsonService} from "./service/jsonservice";
import { AppMainComponent } from './form/app-main/app-main.component';
import { AppMenuComponent } from './form/app-menu/app-menu.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import { AppLoginComponent } from './form/app-login/app-login.component';
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {AvatarModule} from "primeng/avatar";

@NgModule({
  declarations: [
    AppComponent,
    AppConfigComponent,
    PatientComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppMainComponent,
    AppMenuComponent,
    AppLoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputSwitchModule,
    TooltipModule,
    AutoCompleteModule,
    InputTextModule,
    CheckboxModule,
    RippleModule,
    AvatarModule,

  ],
  providers: [
    AppConfigService,
    JsonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
