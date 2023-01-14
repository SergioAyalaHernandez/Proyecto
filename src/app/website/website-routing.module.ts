import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayaoutComponent} from "./components/layaout/layaout.component";
import {HomeComponent} from "./pages/home/home.component";

import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {tr} from "date-fns/locale";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AuthGuard} from "../guards/auth.guard";
import {RegisterComponent} from "./pages/register/register.component";
import {ExitGuard} from "../guards/exit.guard";

const routes: Routes = [
  {
    path:'',
    component: LayaoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'category',
        loadChildren:() => import('./pages/category/category.module').then(m=> m.CategoryModule),
        data:{
         preload: true
        }
      },

      {
        path: 'product/:id',
        component: ProductDetailComponent

      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      {
        path: 'register',
        canDeactivate: [ExitGuard],
        component: RegisterComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
