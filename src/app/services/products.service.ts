import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {CreateProductDTO, Product, UpdateProductDto} from "../models/product.model";
import {catchError, pipe, retry, map, zip} from "rxjs";
import {throwError} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiUrl,{params})
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return{
          ...item,
          taxes: 0.19 * item.price
        }
      }))
    );
  }
  getProduct(id: String){
    return this.http.get<Product>(this.apiUrl+'/'+id).pipe(
      catchError((error: HttpErrorResponse) =>{
        if (error.status === HttpStatusCode.Conflict){
          return throwError('Algo salió mal con el server');
        }
        if (error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas autorizado para esta solicitud');
        }
        return throwError('Ups algo salió mal...');
      })
    );
  }

  create(data: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, dto: any){
    return this.http.put<Product>(this.apiUrl+'/'+id, dto);
  }

  delete(id: string,){
    return this.http.delete<boolean>(this.apiUrl+'/'+id);
  }

  getProductsByPage(limit: number, offset:number){
    return this.http.get<Product[]>(this.apiUrl,{
      params: {limit, offset}
    });
  }
  fetchReadAndUpdate(id: string, dto: UpdateProductDto){
   return zip( // esta es para hacer todo en paralelo
      this.getProduct(id),
      this.update(id, dto));
  }

}
