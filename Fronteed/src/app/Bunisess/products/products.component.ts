import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/productos';
import { CarritoService } from '../../services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  listProductos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }
  

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.listProductos = productos;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.toastr.error('No se pudieron cargar los productos');
      }
    });
  }
  agregarAlCarrito(producto: Producto): void {
    if (producto.stock <= 0) {
      this.toastr.warning('No hay stock disponible', 'Atención');
      return;
    }

    this.carritoService.agregarItem(producto.id, 1).subscribe({
      next: () => {
        this.toastr.success('Producto agregado al carrito', producto.nombre);
      },
      error: (err) => {
        console.error('Error al agregar al carrito:', err);
        this.toastr.error('No se pudo agregar al carrito');
      }
    });
  }
}