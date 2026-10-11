import { Component, Input } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento.model';

@Component({
  selector: 'app-alojamiento-card',
  standalone: false,
  styleUrl: './alojamiento-card.css',
  templateUrl: './alojamiento-card.html',
})
export class AlojamientoCard {
  @Input() alojamiento!: Alojamiento;
}
