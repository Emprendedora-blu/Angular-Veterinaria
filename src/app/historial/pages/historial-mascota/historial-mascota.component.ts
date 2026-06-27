import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private svc: HistorialService,
    private mascotas: MascotasService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.mascotaId = this.route.snapshot.paramMap.get('mascotaId')!;
    this.mascota = this.mascotas.getMascota(this.mascotaId);
    this.cargar();
    this.form = this.fb.group({
      fecha: [new Date().toISOString().slice(0, 10), Validators.required],
      diagnostico: ['', [Validators.required, Validators.minLength(3)]],
      tratamiento: ['', Validators.required],
      veterinario: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  agregar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.svc.agregar({ mascotaId: this.mascotaId, ...this.form.value });
    this.form.reset({ fecha: new Date().toISOString().slice(0, 10) });
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
