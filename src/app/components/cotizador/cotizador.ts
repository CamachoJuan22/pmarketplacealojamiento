import { Component, Input } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento.model';
import { Cotizacion } from '../../models/cotizacion.model';
import { CotizacionService } from '../../services/cotizacion.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-cotizador',
  standalone: false,
  styleUrl: './cotizador.css',
  templateUrl: './cotizador.html',
})
export class Cotizador {
  @Input() alojamiento!: Alojamiento;

  llegada = '';
  salida = '';
  huespedes: number | null = null;

  errores: string[] = [];
  cotizacion: Cotizacion | null = null;
  reservando = false;
  reservaConfirmada: Reserva | null = null;

  hoy: string;

  constructor(private cotizacionService: CotizacionService) {
    this.hoy = this.cotizacionService.hoy();
  }

  cotizar() {
    this.reservaConfirmada = null;
    this.errores = this.cotizacionService.validar(
      this.alojamiento, this.llegada, this.salida, this.huespedes
    );


    if (this.errores.length === 0 && this.huespedes) {
      this.cotizacion = this.cotizacionService.cotizar(
        this.alojamiento, this.llegada, this.salida, this.huespedes
      );
    } else {
      this.cotizacion = null;
    }
    this.reservando = false;
  }


  limpiarCotizacion() {
    this.cotizacion = null;
    this.errores = [];
    this.reservando = false;
    this.cotizacion = null;
  }

  reservar() {
    this.reservando = true;
    }

    alReservar(reserva: Reserva){
      this.reservaConfirmada = reserva;
      this.cotizacion = null;
      this.reservando = false;
    }
  }
