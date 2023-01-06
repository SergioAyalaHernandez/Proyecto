import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {ProductsService} from '../../services/products.service';
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit = 10;
  offset = 0;
  products: Product[] = [];
  constructor(
    private stroreService: StoreService,
    private productServise: ProductsService
  ) { }

  ngOnInit(): void {
    this.productServise.getProductsByPage(10,0)
      .subscribe(data => {
        console.log(data);
        this.products = data;
        this.offset += this.limit;
      });
  }

  onLoadMore(){
   this.productServise.getProductsByPage(this.limit,this.offset)
  .subscribe(data => {
   this.products = this.products.concat(data);
  this.offset += this.limit;
  });
  }
}
