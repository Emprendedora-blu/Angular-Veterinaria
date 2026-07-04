import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitasService } from '../../services/citas.service';
import { MascotasService } from '../../../mascotas/services/mascotas.service';
import { VeterinariosService } from '../../../veterinarios/services/veterinarios.service';
import { Mascota } from '../../../shared/models/mascota.model';
import { Veterinario } from '../../../shared/models/veterinario.model';

@Component({
  selector: 'app-form-cita',
  templateUrl: './form-cita.component.html',
})
export class FormCitaComponent implements OnInit {
  form!: FormGroup;
  mascotas$!: Observable<Mascota[]>;
  veterinarios$!: Observable<Veterinario[]>;
  editandoId?: string;

  fechaDate = '';
  fechaHora = '8';
  fechaMinuto = '00';
  fechaAmPm = 'AM';

  constructor(
    private fb: FormBuilder,
    private svc: CitasService,
    private mascotas: MascotasService,
    private veterinarios: VeterinariosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.mascotas$ = this.mascotas.getMascotas();
    this.veterinarios$ = this.veterinarios.getVeterinarios();

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
        if (c.fecha) {
          const d = new Date(c.fecha);
          this.fechaDate = c.fecha.split('T')[0];
          let h = d.getHours();
          this.fechaAmPm = h >= 12 ? 'PM' : 'AM';
          if (h > 12) h -= 12;
          if (h === 0) h = 12;
          this.fechaHora = h.toString();
          this.fechaMinuto = d.getMinutes().toString().padStart(2, '0');
        }
      }
    }
  }

  get f() { return this.form.controls; }

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  actualizarFecha(): void {
    if (!this.fechaDate) {
      this.form.get('fecha')?.setValue('');
      return;
    }
    let h = parseInt(this.fechaHora, 10);
    if (this.fechaAmPm === 'PM' && h !== 12) h += 12;
    if (this.fechaAmPm === 'AM' && h === 12) h = 0;
    const hStr = h.toString().padStart(2, '0');
    this.form.get('fecha')?.setValue(`${this.fechaDate}T${hStr}:${this.fechaMinuto}`);
    this.form.get('fecha')?.markAsTouched();
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
    const dia = fecha.getDay();
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
