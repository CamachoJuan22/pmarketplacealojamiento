import { Component } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
@Component({
  selector: 'app-mis-reservas',
  standalone: false,
  styleUrl: './mis-reservas.css',
  templateUrl: './mis-reservas.html',
})
export class MisReservas {  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {
    this.reservas = this.reservaService.obtenerReservas();
  }


  formatearFecha(texto: string): string {
    const partes = texto.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }


  claseEstado(estado: string): string {
    return estado === 'CONFIRMADA' ? 'text-bg-success' : 'text-bg-danger';
  }
}
