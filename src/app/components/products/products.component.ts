import { Component, OnInit } from '@angular/core';
import {CreateProductDTO, Product, UpdateProductDto} from "../../models/product.model";
import {StoreService} from '../../services/store.service';
import {ProductsService} from '../../services/products.service';

import SwiperCore from 'swiper';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total =0;
  products: Product[] = [];

  showProductDetail = false;
  productChosen: Product = {
    id:'',
    title:'',
    price:0,
    images:[],
    description:'',
    category:{
      id:'',
      name:''
    }
  }
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

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    console.log('id del producto ' + id);
    this.productServise.getProduct(id).subscribe(data =>{
      console.log(data);
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct(){
    const product: CreateProductDTO = {

      title:'Producto Sergio',
      price:544,
      images:[''],
      description:'Bla platzi',
      categoryId:1

    }
    this.productServise.create(product).subscribe(
      data => {
        this.products.unshift(data);
      });
  }

  updateProduct(){
    const change: UpdateProductDto = {

      title:'nuevo titulo',
      price:888,
      images:[''],
      description:'actualizado',
      categoryId:1
    }
    const id = this.productChosen.id;
    this.productServise.update(id,change).subscribe(
      data => {
         const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
         this.products[productIndex] = data;
      });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productServise.delete(id).subscribe(() =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

}
