import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {switchMap} from 'rxjs/operators'
import {zip} from 'rxjs'
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
  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter;

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
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  today = new Date();

  date = new Date(2021,1,21);
  constructor(
    private stroreService: StoreService,
    private productServise: ProductsService
  ) {
    this.myShoppingCart = this.stroreService.getShoppingCart();
  }

  onAddToShoppingCar(product: Product){

    this.stroreService.addProduct(product);
    this.total = this.stroreService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  ngOnInit(): void {}

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    console.log('id del producto ' + id);
    this.productServise.getProduct(id).subscribe(data =>{
      console.log(data);
      this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail = 'success';
    },errorMessage => {
      window.alert(errorMessage);
      console.error(errorMessage);
      this.statusDetail = 'error';
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

 // loadMore(){
   // this.productServise.getProductsByPage(this.limit,this.offset)
     // .subscribe(data => {
       // this.products = this.products.concat(data);
        //this.offset += this.limit;
      //});
  //}

  onLoadMore(){
    this.loadMore.emit();
  }

  readAndUpdate(id: string){
    this.productServise.getProduct(id).pipe(
      switchMap((product) => //con esta es apra hacer algo dependiente de otro
        this.productServise.update(product.id, {title: 'change'}))
    ).subscribe(
      data =>{
        console.log(data);
       });
   this.productServise.fetchReadAndUpdate(id, {title: 'change'})
     .subscribe(response =>{
        const product = response[0];
        const read = response[1];
      })
  }

}
