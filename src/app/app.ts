import { Component, signal } from '@angular/core';
import { AlojamientoService } from './services/alojamiento.service';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pmarketplacealojamiento');
  constructor(private alojamientoService: AlojamientoService) {
    this.alojamientoService.obtenerAlojamientos().subscribe(lista => {
      console.log('Alojamientos activos:', lista);
    });
  }
}
