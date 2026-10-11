import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Alojamiento } from '../../models/alojamiento.model';
import { Resena } from '../../models/resena.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-alojamiento-detalle',
  standalone: false,
  styleUrl: './alojamiento-detalle.css',
  templateUrl: './alojamiento-detalle.html',
})
export class AlojamientoDetalle {
  alojamiento: Alojamiento | null = null;
  resenas: Resena[] = [];
  imagenSeleccionada = '';

  cargando = true;
  hayError = false;
  noEncontrado = false;

  constructor(
    private route: ActivatedRoute,
    private alojamientoService: AlojamientoService,
    private cdr: ChangeDetectorRef
  ) {

    this.route.paramMap.subscribe(params => {
      this.cargar(Number(params.get('id')));
    });
  }

  cargar(id: number) {
    this.cargando = true;
    this.hayError = false;
    this.noEncontrado = false;
    this.alojamiento = null;


    forkJoin({
      alojamiento: this.alojamientoService.obtenerAlojamientoPorId(id),
      resenas: this.alojamientoService.obtenerResenasPorAlojamiento(id)
    }).subscribe({
      next: datos => {
        if (!datos.alojamiento) {
          this.noEncontrado = true;
        } else {
          this.alojamiento = datos.alojamiento;
          this.resenas = datos.resenas;
          this.imagenSeleccionada = datos.alojamiento.imagenPrincipal;
        }
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.hayError = true;
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  seleccionarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }
}
