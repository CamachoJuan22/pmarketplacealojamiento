import { Component,EventEmitter, Input, Output } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento.model';
import { Cotizacion } from '../../models/cotizacion.model';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-reserva-form',
  standalone: false,
  styleUrl: './reserva-form.css',
  templateUrl: './reserva-form.html',
})
export class ReservaForm { @Input() alojamiento!: Alojamiento;
  @Input() cotizacion!: Cotizacion;
  @Output() reservaCreada = new EventEmitter<Reserva>();

  nombre = '';
  correo = '';
  enviado = false;


  constructor(private reservaService: ReservaService) {}

  confirmar(formulario: NgForm) {
    this.enviado = true;


    if (formulario.invalid) {
      return;
    }

    const reserva = this.reservaService.crearReserva(
      this.alojamiento, this.cotizacion, this.nombre, this.correo
    );
    this.reservaCreada.emit(reserva);
  }}
