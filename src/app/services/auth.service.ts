import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders ,HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {CreateUserDTO, User} from "../models/user.model";
import {Auth} from "../models/auth.model";
import {TokenService} from "./token.service";
import {switchMap, tap} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL+'api/auth';
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }
  login(email: string, password: string){
    return this.http.post<Auth>(this.apiUrl+'/login',{email, password}).pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }
  create(dto: CreateUserDTO){
    return this.http.post(this.apiUrl, dto);
  }
  getProfile(){

    //headers.set('Authorization','Bearer '+ token)
    return this.http.get<User>(this.apiUrl+'/profile',{

        }
      );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile()),
      )
  }

}
