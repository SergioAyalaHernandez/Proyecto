import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {StoreService} from '../../services/store.service';
import {ProductsService} from '../../services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total =0;
  products: Product[] = [];
  today = new Date();

  date = new Date(2021,1,21);
  constructor(
    private stroreService: StoreService,
    private productServise: ProductsService
  ) {
    this.myShoppingCart = this.stroreService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productServise.getAllProducts()
      .subscribe(data => {
        console.log(data);
        this.products = data;
        console.log(this.products);
      });
  }

  onAddToShoppingCar(product: Product){

    this.stroreService.addProduct(product);
    this.total = this.stroreService.getTotal();
  }

}
