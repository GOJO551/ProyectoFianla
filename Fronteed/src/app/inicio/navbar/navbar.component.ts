import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cargando = false;
  mensajeCarga = '';
  usuario: any = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('usuario');
      this.usuario = data ? JSON.parse(data) : null;
    }
  }

  navegarConCarga(ruta: string, mensaje: string = 'Cargando...') {
    this.cargando = true;
    this.mensajeCarga = mensaje;

    setTimeout(() => {
      this.cargando = false;
      this.router.navigate([ruta]);
    }, 1500);
  }

  cerrarSesion(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
    }
    this.usuario = null;
    this.router.navigate(['/login']);
  }
}