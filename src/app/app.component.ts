import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UsersService} from "./services/users.service";
import {FilesService} from "./services/files.service";
import {TokenService} from "./services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  token= '';
  imgRta ='';
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(){
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile().subscribe();
    }
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

  createUser(){
    this.usersService.create({
      name: 'sergio',
      email: 'sergio@mail.com',
      password: '123',
      role:'customer'
    }).subscribe(rta =>{
      console.log(rta);
    })
  }

}
