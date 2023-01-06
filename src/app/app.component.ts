import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UsersService} from "./services/users.service";
import {FilesService} from "./services/files.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  token= '';
  imgRta ='';
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
  ) {
  }

  downLoadPdf(){
    this.filesService.getFile('my.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf').subscribe()
  }


  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    console.log("file cargar")
    if(file){
      this.filesService.uploadFile(file).subscribe(
        rta=>{
          this.imgRta = rta.location;
        })
    }
  }

}
