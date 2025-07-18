import { Routes } from '@angular/router';
import { AdminGuard } from './guard/adminGuard';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./Bunisess/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./Bunisess/registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./inicio/inicio/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./share/components/layaout/layaout.component').then((m) => m.LayaoutComponent),
    children: [

      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./Bunisess/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./Bunisess/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('./Bunisess/carrito/carrito.component').then((m) => m.CarritoComponent),
      },

      {
        path: 'misProductos',
        loadComponent: () =>
          import('./Bunisess/mis-productos/mis-productos.component').then((m) => m.MisProductosComponent),
        canActivate: [AdminGuard]
      },
    
      {
  path: 'proveedores',
  loadComponent: () =>
    import('./Bunisess/prov/prov').then((m) => m.Prov)
},
{
  path: 'confirmacion-pago',
  loadComponent: () =>
    import('./Bunisess/confirmacion-pago/confirmacion-pago.component').then(m => m.ConfirmacionPagoComponent)
}



    ],
  },

  {
    path: '**',
    redirectTo: 'inicio',
  },
]
