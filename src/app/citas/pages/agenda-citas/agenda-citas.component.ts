import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Cita, EstadoCita } from '../../../shared/models/cita.model';
import { Mascota } from '../../../shared/models/mascota.model';
import { CitasService } from '../../services/citas.service';
import { MascotasService } from '../../../mascotas/services/mascotas.service';

interface CitaVista extends Cita {
  mascotaNombre: string;
}

@Component({
  selector: 'app-agenda-citas',
  templateUrl: './agenda-citas.component.html',
})
export class AgendaCitasComponent implements OnInit {
  citas$!: Observable<CitaVista[]>;
  filtro: EstadoCita | 'todas' = 'todas';

  constructor(private svc: CitasService, private mascotas: MascotasService) {}

  ngOnInit(): void {
    this.citas$ = combineLatest([
      this.svc.getCitas(),
      this.mascotas.getMascotas(),
    ]).pipe(
      map(([citas, mascotas]: [Cita[], Mascota[]]) =>
        citas.map((c) => ({
          ...c,
          mascotaNombre: mascotas.find((m) => m.id === c.mascotaId)?.nombre ?? '—',
        })),
      ),
    );
  }

  cambiarEstado(c: Cita, estado: EstadoCita): void {
    this.svc.cambiarEstado(c.id, estado);
  }

  eliminar(c: Cita): void {
    if (confirm('¿Eliminar la cita?')) this.svc.eliminar(c.id);
  }

  visible(c: CitaVista): boolean {
    return this.filtro === 'todas' || c.estado === this.filtro;
  }
}
