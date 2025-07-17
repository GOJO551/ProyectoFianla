import { Component } from '@angular/core';
import { CarrouselComponent } from '../../Bunisess/component/carrousel/carrousel.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarrouselComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  categorias = [
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1067/1067244.png', // Figura de anime icon
      titulo: 'Figuras de Colección',
      color: 'text-pink-600',
      descripcion: 'Las mejores figuras oficiales para tu colección otaku.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/2913/2913469.png', // Manga icon
      titulo: 'Mangas y Novelas',
      color: 'text-purple-600',
      descripcion: 'Explora mangas y novelas ligeras de tus series favoritas.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/6131/6131570.png', // Cosplay icon
      titulo: 'Cosplay y Accesorios',
      color: 'text-blue-600',
      descripcion: 'Disfraces y accesorios para convertirte en tu personaje preferido.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1965/1965381.png', // Película/Anime icon
      titulo: 'DVDs y Blu-rays',
      color: 'text-indigo-600',
      descripcion: 'Colecciona tus series y películas de anime en alta calidad.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', // Accesorios kawaii icon
      titulo: 'Accesorios Kawaii',
      color: 'text-pink-400',
      descripcion: 'Llaveros, stickers y más para expresar tu estilo anime.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Juegos icon
      titulo: 'Juegos y Merchandising',
      color: 'text-green-600',
      descripcion: 'Videojuegos y productos oficiales para fans de todo tipo.'
    }
  ];
}
