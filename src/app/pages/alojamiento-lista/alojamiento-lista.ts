import {ChangeDetectorRef, Component } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-alojamiento-lista',
  standalone: false,
  styleUrl: './alojamiento-lista.css',
  templateUrl: './alojamiento-lista.html',
})
export class AlojamientoLista {
  alojamientos: Alojamiento[] = [];
  ciudades: string[] = [];
  tipos: string[] = [];

  cargando = true;
  hayError = false;


  ciudad = '';
  tipo = '';
  huespedes: number | null = null;
  precioMaximo: number | null = null;

  constructor(
    private alojamientoService: AlojamientoService,
    private cdr: ChangeDetectorRef
  ) {
    this.alojamientoService.obtenerAlojamientos().subscribe({
      next: lista => {
        this.alojamientos = lista;
        this.ciudades = [...new Set(lista.map(a => a.ciudad))].sort();
        this.tipos = [...new Set(lista.map(a => a.tipo))].sort();
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

  get alojamientosFiltrados(): Alojamiento[] {
    return this.alojamientos.filter(a => {
      const coincideCiudad = this.ciudad === '' || a.ciudad === this.ciudad;
      const coincideTipo = this.tipo === '' || a.tipo === this.tipo;
      const coincideHuespedes = !this.huespedes || a.capacidad >= this.huespedes;
      const coincidePrecio = !this.precioMaximo || a.precioNoche <= this.precioMaximo;
      return coincideCiudad && coincideTipo && coincideHuespedes && coincidePrecio;
    });
  }

  limpiarFiltros() {
    this.ciudad = '';
    this.tipo = '';
    this.huespedes = null;
    this.precioMaximo = null;
  }
}
