import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private url = 'http://localhost:3000/carrito';
  carritoActualizado = new Subject<void>();

  constructor(private http: HttpClient) {}

  obtenerItems(): Observable<any> {
    return this.http.get(this.url);
  }

  agregarItem(productoId: number, cantidad: number): Observable<any> {
    return this.http.post(this.url, { productoId, cantidad }).pipe(
      tap(() => this.carritoActualizado.next())
    );
  }

  eliminarItem(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      tap(() => this.carritoActualizado.next())
    );
  }

  actualizarCantidad(id: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.url}/${id}`, { cantidad }).pipe(
      tap(() => this.carritoActualizado.next())
    );
  }

  vaciarCarrito(): Observable<any> {
    return this.http.delete(this.url).pipe(
      tap(() => this.carritoActualizado.next())
    );
  }
}