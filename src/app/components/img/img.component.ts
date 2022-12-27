import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {


  @Input() img: string = 'valor inicial';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/mario.jpeg';
  constructor() {
    //before render
    // no correr cosas asincronas, esto se corre una vez, cuando se cree el componente o el número de veces en la
    //que se llama el componente
    console.log('constructor','imgValue =>', this.img);
  }

  ngOnChanges(){
    // antes del render y durante
    //objetivo, actualizar los cambios en los inputs -- corre muchas veces o cuando se actualicen los input
    console.log('OnChanges','imgValue =>', this.img);
  }

  ngOnInit(): void {
    // antes del render
    // acá si se ponen cosas asincronas, fetch, promesas, llamadas a apis
    // corre una sola vez
    // cambios de los inputs, debe ser en onChanges, no en el onInit
    console.log('OnInit','imgValue =>', this.img);
  }

  ngAfterViewInit() {
    //corre después del render
    // cuando se tienen hijos
    //
    console.log('AfterInit','imgValue =>', this.img);
  }
  ngOnDestroy() {
    //cuando se vaya a eliminar el componente
    //cuando se deja de ver el componente
    // ejmplo en los if
    console.log('OnDestroy')
  }

  imgError(){
    this.img = this.imageDefault;
  }
  imgLoaded(){
    console.log("si cargo mi prro!");
    this.loaded.emit(this.img);
  }

}
