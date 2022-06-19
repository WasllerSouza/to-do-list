import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from '../../service/app-config.service';
import { AppConfig } from '../../domain/appconfig';
import { Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from '../../app.component';

declare let gtag: Function;

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {
  menuActive: boolean;

  newsActive: boolean = true;

  config: AppConfig;

  news_key = 'primenews';
  checked: boolean;
  theme: string = "lara-light-blue";

  public subscription: Subscription;

  constructor(private router: Router, private configService: AppConfigService, private primengConfig: PrimeNGConfig, public app: AppComponent) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-93461466-1',
          {
            'page_path': '/primeng' + event.urlAfterRedirects
          }
        );

        this.hideMenu();
      }
    });
  }

  onMenuButtonClick() {
    this.menuActive = true;
    this.addClass(document.body, 'blocked-scroll');
  }

  onMaskClick() {
    this.hideMenu();
  }

  hideMenu() {
    this.menuActive = false;
    this.removeClass(document.body, 'blocked-scroll');
  }

  addClass(element: any, className: string) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }

  removeClass(element: any, className: string) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  hideNews() {
    this.newsActive = false;
    const now = new Date();
    const item = {
      value: false,
      expiry: now.getTime() + 604800000,
    }
    localStorage.setItem(this.news_key, JSON.stringify(item));
  }

  isDarkTheme(theme) {
    return theme.indexOf('dark') !== -1 || theme.indexOf('vela') !== -1 || theme.indexOf('arya') !== -1 || theme.indexOf('luna') !== -1;
  }

  applyScale(scale: number) {
    document.documentElement.style.fontSize = scale + 'px';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

