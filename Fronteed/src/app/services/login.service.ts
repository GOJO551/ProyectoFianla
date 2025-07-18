import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Usuario {
  id: number;
  email: string;
  password: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => users.length ? users[0] : null)
    );
  }
}