import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id:'',
    title:'',
    price:0,
    images:[],
    description:'',
    category:{
      id:'',
      name:''
    }
  };
  @Output() addedProduct = new EventEmitter<Product>();// acá se puede enviar el product cómo objeto completo
  @Output() showProduct = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    console.log("Algo");
  }

  onAddToCart(){
    this.addedProduct.emit(this.product);// acá se llama al output que envía la info al padre, en este caso se envía el objeto product completo
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }

}
