import { Component } from '@angular/core';
import { Product } from './models/product.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
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

  onLoaded(img: string){
    console.log("log padre prro!", img);
  }
}
