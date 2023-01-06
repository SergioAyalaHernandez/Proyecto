import { Component, OnInit } from '@angular/core';
import { StoreService} from '../../services/store.service';
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/category.model";

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
  categories: Category[] = [];
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }
  login(){
    this.authService.loginAndGet('sergio@mail.com','123').subscribe(user=>{
      this.profile = user;
    });
  }

  getAllCategories(){
    this.categoriesService.getAll().subscribe(data =>{
      this.categories = data;
    })
  }

}
