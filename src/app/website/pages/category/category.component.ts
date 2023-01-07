import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../models/product.model";
import {switchMap} from "rxjs";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products : Product[] = [];
  categoryId: string | null = null;
  prodcutId: string | null = null;
  limit = 10;
  offset = 0;
  constructor(
    private route: ActivatedRoute,
    private productsServece: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params =>{
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsServece.getByCategory(this.categoryId, this.limit,this.offset)
          }
          return [];
      })
    ).subscribe(data =>{
      this.products = data;
    });
    this.route.queryParamMap.subscribe(params => {
      this.prodcutId = params.get('../product');
      console.log(this.prodcutId);
    });
  }

}
