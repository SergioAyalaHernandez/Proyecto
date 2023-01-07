import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayaoutComponent} from "./components/layaout/layaout.component";
import {HomeComponent} from "./pages/home/home.component";
import {CategoryComponent} from "./pages/category/category.component";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";

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
        path: 'category/:id',
        component: CategoryComponent
      },

      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
