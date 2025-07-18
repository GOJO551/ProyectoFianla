import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private url = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }
  
}