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
    price:0,
    image:'',
    title:'',
    description:'',
    categoty:''
  };
  @Output() addedProduct = new EventEmitter<Product>();// acá se puede enviar el product cómo objeto completo

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(){
    this.addedProduct.emit(this.product);// acá se llama al output que envía la info al padre, en este caso se envía el objeto product completo
  }

}
