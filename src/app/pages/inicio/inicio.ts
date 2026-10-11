import { Component } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  destacados: Alojamiento[] = [];
  cargando = true;
  hayError = false;

  constructor(private alojamientoService: AlojamientoService) {
    this.alojamientoService.obtenerAlojamientos().subscribe({
      next: (lista) => {
        // Copio la lista con [...lista] porque sort cambia el arreglo original
        const ordenados = [...lista].sort((a, b) => b.calificacion - a.calificacion);
        this.destacados = ordenados.slice(0, 3);
        this.cargando = false;
      },
      error: () => {
        this.hayError = true;
        this.cargando = false;
      },
    });
  }
}
