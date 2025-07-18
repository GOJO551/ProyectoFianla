import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/productos';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent {
  listProductos: Producto[] = [];
  productosPaginados: Producto[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.listProductos = productos;
        this.totalPages = Math.ceil(productos.length / this.itemsPerPage);
        this.actualizarPaginacion();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.toastr.error('No se pudieron cargar los productos');
      }
    });
  }

  actualizarPaginacion(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.productosPaginados = this.listProductos.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.actualizarPaginacion();
  }

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.toastr.success('Producto eliminado correctamente');
        this.obtenerProductos();
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        this.toastr.error('No se pudo eliminar el producto');
      }
    });
  }
}