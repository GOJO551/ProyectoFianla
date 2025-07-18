import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Usuario } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.getUsuarioSesion().subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('No se pudo cargar el usuario', err);
      }
    });
  }
}