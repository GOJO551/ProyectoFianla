export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen: string;
  stock: number;
  oferta?: number;
  categoriaId: {
    id: number;
    nombre: string;
  };
}