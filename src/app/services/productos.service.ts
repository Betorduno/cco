import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }
  findAllProductos(): Observable<any>{ 
    return this.http.get<any>('api/productos')
  }

  createProducto(data: object): Observable<any> {
    return this.http.post<any>('api/producto', data)
  }

  updateProducto(data: any): Observable<any> {
    
    return this.http.put<any>(`api/producto/${data.id}`, data)
  }

  deleteProducto(id: string):Observable<any> {
    return this.http.delete<any>(`api/producto/${id}`)
  }
}
