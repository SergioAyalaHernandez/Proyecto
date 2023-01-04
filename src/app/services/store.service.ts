import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]); //<= esto mas lo de la linea 14, es para transmitir
                                                              //información a quien esté usando este servicio
                                                              //es decir, si hay cambios, los transmite

  myCart$ = this.myCart.asObservable();
  constructor() { }

  addProduct(product:Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart); // acá carga esa transmisión a myCart de lo que esté en el myShop....
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }
  getTotal(){
    return this.myShoppingCart.reduce((sum,item) => sum + item.price,0);
  }
}
