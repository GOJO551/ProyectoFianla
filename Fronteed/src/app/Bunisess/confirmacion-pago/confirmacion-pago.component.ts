import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacion-pago.component.html',
  styleUrls: ['./confirmacion-pago.component.css']
})
export class ConfirmacionPagoComponent implements OnInit {
  pedido: any[] = [];
  total: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('pedidoTemporal');
    this.pedido = data ? JSON.parse(data) : [];

    this.total = this.pedido.reduce((acc: number, item: any) => {
      return acc + (item.precio || 0) * (item.cantidad || 0);
    }, 0);
  }

  volverAlInicio(): void {
    this.router.navigate(['/app']);
  }
}