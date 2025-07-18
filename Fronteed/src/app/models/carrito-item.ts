import { Producto } from './productos';

export interface CarritoItem {
  id: number;
  productoId: number;
  cantidad: number;
  producto?: Producto;
}