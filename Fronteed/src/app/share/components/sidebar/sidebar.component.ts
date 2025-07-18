import { Component, OnInit, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarService } from '../../../services/sidebar';
import { LogoutService } from '../../../services/logout.service';
import { Router } from '@angular/router';
import { CategoriaService, Categoria } from '../../../services/categoria.service';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  rol: string = 'cliente';
  categorias: Categoria[] = [];
  isVisible = false;
  mostrarCategorias: boolean = false;
  saliendo: boolean = false;

  constructor(
    private sidebarService: SidebarService,
    private logoutService: LogoutService,
    private router: Router,
    private categoriaService: CategoriaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.sidebarService.sidebarVisible$.subscribe((visible: boolean) => {
      this.isVisible = visible;
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.rol = usuario?.rol || 'cliente';
    }

    this.categoriaService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
      },
      error: (err: any) => {
        console.error('Error al obtener categorías', err);
      }
    });
  }

  toggleCategorias(): void {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  cerrarSesion(): void {
    this.saliendo = true;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
    }

    this.logoutService.logout().subscribe({
      next: (res: any) => {
        console.log(res.mensaje);
        setTimeout(() => {
          this.saliendo = false;
          this.router.navigate(['']);
        }, 1500);
      },
      error: (err: any) => {
        console.error('Error al cerrar sesión', err);
        this.saliendo = false;
      }
    });
  }
}