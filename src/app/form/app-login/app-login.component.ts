import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  constructor(private _router: Router) {
  }

  user = {
    uuid: '',
    name: '',
    email: '',
    title: '',
    picture: '',
    online: false,
    password: ''
  }

  checked: boolean;

  ngOnInit(): void {
  }

  login(): boolean {
    return this.user.email.indexOf('@ifg.edu.br') > -1 && this.user.password === '12345';
  }

  isLoggedIn() {
    if (this.login()) {
      const user = this.getFakeLocalUser();
      user.name = this.user.email
        .replace("@mindify.com.br", "")
        .replace(/[0-9.-_]/g, " ")
        .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      user.email = this.user.email;
      this.user = user;
      this.setCookie("username", JSON.stringify(user), 30);
      this._router.navigate(['main']).then();
    }
  }

  public getFakeLocalUser() {
    return {
      uuid: '',
      name: 'Wasller Souza',
      email: 'wasller@ifg.edu.br',
      title: 'Estudante',
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjY5QnpaT3-4LAQ1FYnzH1XmGvD3Pxd-8kWg&usqp=CAU',
      online: true,
      password: ''
    };
  }

  setCookie(cname, cvaluename, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvaluename + ";" + expires + ";path=/";
  }

  forgot(): void {
    this._router.navigate(['forgot-email']).then();
  }


}
