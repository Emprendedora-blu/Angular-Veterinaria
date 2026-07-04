import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Mascota } from '../../../shared/models/mascota.model';
import { MascotasService } from '../../../mascotas/services/mascotas.service';

@Component({
  selector: 'app-lista-historial',
  templateUrl: './lista-historial.component.html',
})
export class ListaHistorialComponent implements OnInit {
  mascotas$!: Observable<Mascota[]>;
  mascotasFiltradas$!: Observable<Mascota[]>;
  busqueda$ = new BehaviorSubject<string>('');

  constructor(private mascotas: MascotasService) {}

  ngOnInit(): void {
    this.mascotas$ = this.mascotas.getMascotas();
    this.mascotasFiltradas$ = combineLatest([this.mascotas$, this.busqueda$]).pipe(
      map(([mascotas, busqueda]) => {
        const texto = busqueda.trim().toLowerCase();
        if (!texto) return mascotas;
        return mascotas.filter((m) =>
          [m.nombre, m.codigo, m.especie === 'otro' ? m.especieOtra : m.especie, m.raza]
            .filter(Boolean)
            .some((campo) => campo!.toLowerCase().includes(texto)),
        );
      }),
    );
  }

  buscar(texto: string): void {
    this.busqueda$.next(texto);
  }
}
