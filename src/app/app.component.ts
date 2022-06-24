import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppConfig} from './domain/appconfig';
import {AppConfigService} from './service/app-config.service';
import {JsonService} from './service/jsonservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private configService: AppConfigService) {
  }

  config: AppConfig;

  public subscription: Subscription;


  public newsActive: boolean;

  ngOnInit() {
    this.config = {theme: 'saga-blue', dark: false} as AppConfig;

    this.subscription = this.configService.configUpdate$.subscribe(config => {
      const linkElement = document.getElementById('theme-link');
      this.replaceLink(linkElement, config.theme);
      this.config = config;
    });
  }

  replaceLink(linkElement, theme) {
    const id = linkElement.getAttribute('id');
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement.setAttribute('href', linkElement.getAttribute('href').replace(this.config.theme, theme));
    cloneLinkElement.setAttribute('id', id + '-clone');

    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove();
      cloneLinkElement.setAttribute('id', id);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
