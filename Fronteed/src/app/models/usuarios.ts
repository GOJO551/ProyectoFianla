export interface Usuario {
  id: number;
  email: string;
  password: string;
  nombre: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  rol?: string;
}