import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  token= '';
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
  }


}
