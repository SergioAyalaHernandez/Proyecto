import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      id:'1',
      name: 'prodct 1',
      image: './assets/images/mario.jpeg',
      price: 100
    },
    {
      id:'2',
      name: 'prodct 1',
      image: './assets/images/mario.jpeg',
      price: 100
    },
    {
      id:'3',
      name: 'prodct 1',
      image: './assets/images/mario.jpeg',
      price: 100
    },{
      id:'4',
      name: 'prodct 1',
      image: './assets/images/mario.jpeg',
      price: 100
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
