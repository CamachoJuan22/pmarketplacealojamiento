import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

import { Alojamiento } from '../models/alojamiento.model';
import { Resena } from '../models/resena.model';
import { MarketplaceData } from '../models/marketplace-data.model';

@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  private url = 'assets/data/marketplace-data.json';
  private datos$: Observable<MarketplaceData>;

  constructor(private http: HttpClient) {
    // shareReplay(1) guarda la respuesta para no pedir el JSON varias veces
    this.datos$ = this.http.get<MarketplaceData>(this.url).pipe(shareReplay(1));
  }
//solo alojamientos activos

  obtenerAlojamientos(): Observable<Alojamiento[]> {
    return this.datos$.pipe(
      map(datos => datos.alojamientos.filter(a => a.activo))
    );
  }

  // busca entre los activos y asi no se abre un inactivo con su URL
  obtenerAlojamientoPorId(id: number): Observable<Alojamiento | undefined> {
    return this.obtenerAlojamientos().pipe(
      map(lista => lista.find(a => a.id === id))
    );
  }

  obtenerResenasPorAlojamiento(alojamientoId: number): Observable<Resena[]> {
    return this.datos$.pipe(
      map(datos => datos.resenas.filter(r => r.alojamientoId === alojamientoId))
    );
  }
}
