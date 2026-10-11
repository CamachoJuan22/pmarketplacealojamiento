import { Injectable } from '@angular/core';

import { Alojamiento } from '../models/alojamiento.model';
import { Cotizacion } from '../models/cotizacion.model';

@Injectable({ providedIn: 'root' })
export class CotizacionService {


  private aFecha(texto: string): Date {
    const partes = texto.split('-');
    return new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  }


  hoy(): string {
    const ahora = new Date();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    return `${ahora.getFullYear()}-${mes}-${dia}`;
  }

  calcularNoches(llegada: string, salida: string): number {
    const msPorDia = 1000 * 60 * 60 * 24;
    const diferencia = this.aFecha(salida).getTime() - this.aFecha(llegada).getTime();
    return Math.round(diferencia / msPorDia);
  }


  validar(alojamiento: Alojamiento, llegada: string, salida: string, huespedes: number | null): string[] {
    const errores: string[] = [];

    if (alojamiento.precioNoche <= 0) {
      errores.push('El precio por noche del alojamiento no es válido.');
    }

    if (!llegada) {
      errores.push('Debes elegir la fecha de llegada.');
    }
    if (!salida) {
      errores.push('Debes elegir la fecha de salida.');
    }


    if (llegada && llegada < this.hoy()) {
      errores.push('La fecha de llegada no puede ser anterior a hoy.');
    }
    if (llegada && salida && salida <= llegada) {
      errores.push('La fecha de salida debe ser posterior a la de llegada.');
    }

    if (!huespedes || huespedes < 1 || !Number.isInteger(huespedes)) {
      errores.push('El número de huéspedes debe ser un entero mayor que cero.');
    } else if (huespedes > alojamiento.capacidad) {
      errores.push(`Este alojamiento admite máximo ${alojamiento.capacidad} huéspedes.`);
    }

    return errores;
  }


  cotizar(alojamiento: Alojamiento, llegada: string, salida: string, huespedes: number): Cotizacion {
    const noches = this.calcularNoches(llegada, salida);
    const subtotal = noches * alojamiento.precioNoche;
    const tarifaLimpieza = alojamiento.tarifaLimpieza;
    const tarifaServicio = Math.round(subtotal * 0.10);
    const total = subtotal + tarifaLimpieza + tarifaServicio;

    return {
      alojamientoId: alojamiento.id,
      fechaLlegada: llegada,
      fechaSalida: salida,
      huespedes: huespedes,
      noches: noches,
      precioNoche: alojamiento.precioNoche,
      subtotal: subtotal,
      tarifaLimpieza: tarifaLimpieza,
      tarifaServicio: tarifaServicio,
      total: total
    };
  }
}
