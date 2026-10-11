import { Injectable } from '@angular/core';

import { Alojamiento } from '../models/alojamiento.model';
import { Cotizacion } from '../models/cotizacion.model';
import { Reserva } from '../models/reserva.model';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private clave = 'reservas-alojamientos-lr';
  private reservas: Reserva[] = [];

  constructor() {
    this.cargar();
  }

  
  obtenerReservas(): Reserva[] {
    return [...this.reservas];
  }

  crearReserva(
    alojamiento: Alojamiento,
    cotizacion: Cotizacion,
    nombreHuesped: string,
    correo: string
  ): Reserva {
    const reserva: Reserva = {
      id: 'RES-' + Date.now(),
      alojamientoId: alojamiento.id,
      alojamientoNombre: alojamiento.nombre,
      ciudad: alojamiento.ciudad,
      imagen: alojamiento.imagenPrincipal,
      fechaLlegada: cotizacion.fechaLlegada,
      fechaSalida: cotizacion.fechaSalida,
      huespedes: cotizacion.huespedes,
      noches: cotizacion.noches,
      total: cotizacion.total,
      nombreHuesped: nombreHuesped.trim(),
      correo: correo.trim(),
      estado: 'CONFIRMADA'
    };


    this.reservas.unshift(reserva);
    this.guardar();
    return reserva;
  }

  private cargar() {
    try {
      const texto = localStorage.getItem(this.clave);
      this.reservas = texto ? JSON.parse(texto) : [];
    } catch {

      this.reservas = [];
    }
  }

  private guardar() {
    try {
      localStorage.setItem(this.clave, JSON.stringify(this.reservas));
    } catch {
    }
  }
}
