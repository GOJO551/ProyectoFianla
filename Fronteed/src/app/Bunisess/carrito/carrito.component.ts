import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { ProductoService } from '../../services/producto.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CarritoItem } from '../../models/carrito-item';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnDestroy {
  items: CarritoItem[] = [];
  cargando = false;
  private carritoSub!: Subscription;

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
    this.carritoSub = this.carritoService.carritoActualizado.subscribe(() => {
      this.cargarCarrito();
    });
  }

  ngOnDestroy(): void {
    this.carritoSub.unsubscribe();
  }

  cargarCarrito(): void {
    this.cargando = true;
    this.carritoService.obtenerItems().subscribe({
      next: (items: CarritoItem[]) => {
        this.productoService.getProductos().subscribe({
          next: (productos) => {
            this.items = items.map(item => ({
              ...item,
              producto: productos.find(p => p.id === item.productoId)
            }));
            this.cargando = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.items = [];
            this.cargando = false;
          }
        });
      },
      error: () => {
        this.items = [];
        this.cargando = false;
      }
    });
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => {
      const precio = item.producto?.precio || 0;
      const cantidad = item.cantidad || 0;
      return acc + precio * cantidad;
    }, 0);
  }

  removeItem(item: CarritoItem): void {
    if (this.cargando) return;
    this.cargando = true;
    this.carritoService.eliminarItem(item.id).subscribe({
      next: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  increaseQuantity(item: CarritoItem): void {
    if (this.cargando) return;
    const nuevaCantidad = (item.cantidad || 0) + 1;
    this.cargando = true;
    this.carritoService.actualizarCantidad(item.id, nuevaCantidad).subscribe({
      next: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  decreaseQuantity(item: CarritoItem): void {
    if (this.cargando) return;
    if ((item.cantidad || 0) <= 1) return;
    const nuevaCantidad = item.cantidad - 1;
    this.cargando = true;
    this.carritoService.actualizarCantidad(item.id, nuevaCantidad).subscribe({
      next: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  checkout(): void {
  const productos = this.items.map(item => ({
    nombre: item.producto?.nombre || 'Nombre no disponible',
    precio: item.producto?.precio || 0,
    cantidad: item.cantidad || 0
  }));

  localStorage.setItem('pedidoTemporal', JSON.stringify(productos));
  this.router.navigate(['/app/confirmacion-pago']); 
}
}