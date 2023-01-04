import { Component, OnInit } from '@angular/core';
import { StoreService} from '../../services/store.service';
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token ='';
  profile: User | null = null;
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  createUser(){
    this.usersService.create({
      name: 'Sergio',
      email: 'sergio@mail.com',
      password: '123'
    }).subscribe(rta=>{
      console.log('Esta es la respuesta ',rta);
    });
  }
  login(){
    this.authService.login('sergio@mail.com','123').subscribe(rta=>{
      console.log(rta.access_token);
      this.token = rta.access_token;
      this.getProfile();
    });
  }

  getProfile(){
    this.authService.profile(this.token).subscribe(profile =>{
      this.profile = profile;
    });
  }

}
