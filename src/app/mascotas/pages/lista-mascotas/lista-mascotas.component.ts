import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../../../shared/models/mascota.model';
import { DuenoDTO } from '../../../shared/models/dueno.model';
import { MascotasService } from '../../services/mascotas.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
})
export class ListaMascotasComponent implements OnInit {
  mascotas$!: Observable<Mascota[]>;
  duenos: DuenoDTO[] = [];

  constructor(private svc: MascotasService) {}

  ngOnInit(): void {
    this.mascotas$ = this.svc.getMascotas();
    this.svc.getDuenos().subscribe((d) => (this.duenos = d));
  }

  nombreDueno(duenoId: string): string {
    const d = this.duenos.find((x) => x.id === duenoId);
    return d ? `${d.nombre} ${d.apellido}` : '—';
  }

  eliminar(m: Mascota): void {
    if (confirm(`¿Eliminar a ${m.nombre}?`)) this.svc.eliminarMascota(m.id);
  }
}
