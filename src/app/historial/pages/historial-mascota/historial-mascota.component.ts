import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistorialService } from '../../services/historial.service';
import { MascotasService } from '../../../mascotas/services/mascotas.service';
import { EntradaHistorial } from '../../../shared/models/historial.model';
import { Mascota } from '../../../shared/models/mascota.model';

@Component({
  selector: 'app-historial-mascota',
  templateUrl: './historial-mascota.component.html',
})
export class HistorialMascotaComponent implements OnInit {
  mascotaId!: string;
  mascota?: Mascota;
  entradas: EntradaHistorial[] = [];

  constructor(
    private route: ActivatedRoute,
    private svc: HistorialService,
    private mascotas: MascotasService,
  ) {}

  ngOnInit(): void {
    this.mascotaId = this.route.snapshot.paramMap.get('mascotaId')!;
    this.mascota = this.mascotas.getMascota(this.mascotaId);
    this.cargar();
  }

  eliminar(e: EntradaHistorial): void {
    if (confirm('¿Eliminar entrada?')) {
      this.svc.eliminar(e.id);
      this.cargar();
    }
  }

  private cargar(): void {
    this.entradas = this.svc.getPorMascota(this.mascotaId);
  }
}
