import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitasService } from '../../services/citas.service';
import { MascotasService } from '../../../mascotas/services/mascotas.service';
import { Mascota } from '../../../shared/models/mascota.model';

@Component({
  selector: 'app-form-cita',
  templateUrl: './form-cita.component.html',
})
export class FormCitaComponent implements OnInit {
  form!: FormGroup;
  mascotas$!: Observable<Mascota[]>;
  editandoId?: string;

  constructor(
    private fb: FormBuilder,
    private svc: CitasService,
    private mascotas: MascotasService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.mascotas$ = this.mascotas.getMascotas();

    this.form = this.fb.group({
      mascotaId: ['', Validators.required],
      fecha: ['', [Validators.required, this.futuraValidator, this.horarioLaboralValidator]],
      motivo: ['', [Validators.required, Validators.minLength(3)]],
      veterinario: ['', Validators.required],
      estado: ['pendiente', Validators.required],
      notas: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const c = this.svc.getCita(id);
      if (c) {
        this.editandoId = id;
        this.form.patchValue(c);
      }
    }
  }

  get f() { return this.form.controls; }

  get minFecha(): string {
    return new Date().toISOString().slice(0, 16);
  }

  private readonly futuraValidator = (control: { value: string }) => {
    if (!control.value) return null;
    return new Date(control.value).getTime() >= Date.now() - 60_000
      ? null
      : { pasada: true };
  };

  private readonly horarioLaboralValidator = (control: { value: string }) => {
    if (!control.value) return null;
    const fecha = new Date(control.value);
    const dia = fecha.getDay(); // 0=Dom, 1=Lun ... 6=Sáb
    const hora = fecha.getHours();
    if (dia === 0 || dia === 6) return { fueraDia: true };
    if (hora < 8 || hora >= 20) return { fueraHorario: true };
    return null;
  };

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.svc.guardar({ id: this.editandoId, ...this.form.value });
    this.router.navigate(['/citas']);
  }
}
