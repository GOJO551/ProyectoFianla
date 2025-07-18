import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/productos';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private url = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }
  eliminarProducto(id: number): Observable<any> {
  return this.http.delete(`http://localhost:3000/productos/${id}`);
}
}