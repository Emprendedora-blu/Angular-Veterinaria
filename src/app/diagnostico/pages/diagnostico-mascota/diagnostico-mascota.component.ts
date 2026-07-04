import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HistorialService } from '../../../historial/services/historial.service';
import { MascotasService } from '../../../mascotas/services/mascotas.service';
import { VeterinariosService } from '../../../veterinarios/services/veterinarios.service';
import { Mascota } from '../../../shared/models/mascota.model';
import { Veterinario } from '../../../shared/models/veterinario.model';

@Component({
  selector: 'app-diagnostico-mascota',
  templateUrl: './diagnostico-mascota.component.html',
})
export class DiagnosticoMascotaComponent implements OnInit {
  mascotaId!: string;
  mascota?: Mascota;
  form!: FormGroup;
  guardado = false;
  veterinarios$!: Observable<Veterinario[]>;

  constructor(
    private route: ActivatedRoute,
    private svc: HistorialService,
    private mascotas: MascotasService,
    private veterinarios: VeterinariosService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.mascotaId = this.route.snapshot.paramMap.get('mascotaId')!;
    this.mascota = this.mascotas.getMascota(this.mascotaId);
    this.veterinarios$ = this.veterinarios.getVeterinarios();
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
    this.guardado = true;
  }
}
