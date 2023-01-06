import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {ProductsService} from '../../services/products.service';
import {Product} from "../../models/product.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit = 10;
  offset = 0;
  products: Product[] = [];
  prodcutId: string | null = null;
  constructor(
    private stroreService: StoreService,
    private productServise: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productServise.getProductsByPage(10,0)
      .subscribe(data => {
        console.log(data);
        this.products = data;
        this.offset += this.limit;
      });
    this.route.queryParamMap.subscribe(params => {
      this.prodcutId = params.get('product');
      console.log(this.prodcutId);
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
