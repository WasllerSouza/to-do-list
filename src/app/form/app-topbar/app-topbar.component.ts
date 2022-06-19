import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from '../../service/app-config.service';
import { JsonService } from '../../service/jsonservice';
import { AppConfig } from '../../domain/appconfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss'],
  animations: [
    trigger('overlayMenuAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'scaleY(0.8)'}),
        animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' })),
      ]),
      transition(':leave', [
        animate('.1s linear', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppTopbarComponent implements OnInit, OnDestroy {

  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('topbarMenu') topbarMenu?: ElementRef;

  @ViewChild('containerElement') containerElement?: ElementRef;

  activeMenuIndex?: number | null;

  outsideClickListener: any;

  config?: AppConfig;

  subscription?: Subscription;

  logoMap = {
    'bootstrap4-light-blue': 'bootstrap4-light-blue.svg',
    'bootstrap4-light-purple': 'bootstrap4-light-purple.svg',
    'bootstrap4-dark-blue': 'bootstrap4-dark-blue.svg',
    'bootstrap4-dark-purple': 'bootstrap4-dark-purple.svg',
    'md-light-indigo': 'md-light-indigo.svg',
    'md-light-deeppurple': 'md-light-deeppurple.svg',
    'md-dark-indigo': 'md-dark-indigo.svg',
    'md-dark-deeppurple': 'md-dark-deeppurple.svg',
    'mdc-light-indigo': 'md-light-indigo.svg',
    'mdc-light-deeppurple': 'md-light-deeppurple.svg',
    'mdc-dark-indigo': 'md-dark-indigo.svg',
    'mdc-dark-deeppurple': 'md-dark-deeppurple.svg',
    'lara-light-indigo': 'lara-light-indigo.png',
    'lara-light-purple': 'lara-light-purple.png',
    'lara-light-blue': 'lara-light-blue.png',
    'lara-light-teal': 'lara-light-teal.png',
    'lara-dark-indigo': 'lara-dark-indigo.png',
    'lara-dark-purple': 'lara-dark-purple.png',
    'lara-dark-blue': 'lara-dark-blue.png',
    'lara-dark-teal': 'lara-dark-teal.png',
    'saga-blue': 'saga-blue.png',
    'saga-green': 'saga-green.png',
    'saga-orange': 'saga-orange.png',
    'saga-purple': 'saga-purple.png',
    'vela-blue': 'vela-blue.png',
    'vela-green': 'vela-green.png',
    'vela-orange': 'vela-orange.png',
    'vela-purple': 'vela-purple.png',
    'arya-blue': 'arya-blue.png',
    'arya-green': 'arya-green.png',
    'arya-orange': 'arya-orange.png',
    'arya-purple': 'arya-purple.png',
    'nova': 'nova.png',
    'nova-alt': 'nova-alt.png',
    'nova-accent': 'nova-accent.png',
    'nova-vue': 'nova-vue.png',
    'luna-blue': 'luna-blue.png',
    'luna-green': 'luna-green.png',
    'luna-pink': 'luna-pink.png',
    'luna-amber': 'luna-amber.png',
    'rhea': 'rhea.png',
    'fluent-light': 'fluent-light.png',
    'soho-light': 'soho-light.png',
    'soho-dark': 'soho-dark.png',
    'viva-light': 'viva-light.svg',
    'viva-dark': 'viva-dark.svg',
    'mira': 'mira.jpg',
    'nano': 'nano.jpg',
    'tailwind-light': 'tailwind-light.png'
  };

  versions?: any[];

  scrollListener: any;

  constructor(private router: Router, private configService: AppConfigService, private JsonService: JsonService) {}

  ngOnInit() {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe((config: any) => this.config = config);
    this.JsonService.getVersions().then(data => this.versions = data);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeMenuIndex = null;
      }
    });

    this.bindScrollListener();
  }

  bindScrollListener() {
    if (!this.scrollListener) {
      this.scrollListener = () => {
        if (window.scrollY > 0) {
          this.containerElement?.nativeElement.classList.add('layout-topbar-sticky');
        } else {
          this.containerElement?.nativeElement.classList.remove('layout-topbar-sticky');
        }
      }
    }

    window.addEventListener('scroll', this.scrollListener);
  }

  onMenuButtonClick(event: Event) {
    this.menuButtonClick.emit();
    event.preventDefault();
  }

  changeTheme(event: Event, theme: string, dark: boolean) {
    this.configService.updateConfig({...this.config, ...{theme, dark}} as AppConfig);
    this.activeMenuIndex = null;
    event.preventDefault();
  }

  bindOutsideClickListener() {
    if (!this.outsideClickListener) {
      this.outsideClickListener = (event: any) => {
        if (this.isOutsideTopbarMenuClicked(event)) {
          this.activeMenuIndex =  null;
        }
      };

      document.addEventListener('click', this.outsideClickListener);
    }
  }

  unbindOutsideClickListener() {
    if (this.outsideClickListener) {
      document.removeEventListener('click', this.outsideClickListener);
      this.outsideClickListener = null;
    }
  }

  unbindScrollListener() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
  }

  toggleMenu(event: Event, index: number) {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
    event.preventDefault();
  }

  isOutsideTopbarMenuClicked(event: any): boolean {
    return !(this.topbarMenu?.nativeElement.isSameNode(event.target) || this.topbarMenu?.nativeElement.contains(event.target));
  }

  onOverlayMenuEnter(event: AnimationEvent) {
    switch(event.toState) {
      case 'visible':
        this.bindOutsideClickListener();
        break;

      case 'void':
        this.unbindOutsideClickListener();
        break;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.unbindScrollListener();
  }
}
