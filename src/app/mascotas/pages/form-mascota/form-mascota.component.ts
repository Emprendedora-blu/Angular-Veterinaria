import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service';
import { DuenoDTO } from '../../../shared/models/dueno.model';

@Component({
  selector: 'app-form-mascota',
  templateUrl: './form-mascota.component.html',
})
export class FormMascotaComponent implements OnInit {
  form!: FormGroup;
  duenoForm!: FormGroup;
  duenos: DuenoDTO[] = [];
  editandoId?: string;
  crearNuevoDueno = false;

  constructor(
    private fb: FormBuilder,
    private svc: MascotasService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.svc.getDuenos().subscribe((d) => (this.duenos = d));

    this.duenoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{6,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: [''],
    });

    this.form = this.fb.group({
      duenoId: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: ['perro', Validators.required],
      raza: ['', Validators.required],
      sexo: ['macho', Validators.required],
      fechaNacimiento: ['', Validators.required],
      peso: [null, [Validators.min(0)]],
      notas: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const m = this.svc.getMascota(id);
      if (m) {
        this.editandoId = id;
        this.form.patchValue(m);
      }
    }
  }

  get f() { return this.form.controls; }
  get fd() { return this.duenoForm.controls; }

  toggleNuevoDueno(): void {
    this.crearNuevoDueno = !this.crearNuevoDueno;
    if (this.crearNuevoDueno) this.form.get('duenoId')?.clearValidators();
    else this.form.get('duenoId')?.setValidators(Validators.required);
    this.form.get('duenoId')?.updateValueAndValidity();
  }

  submit(): void {
    if (this.crearNuevoDueno) {
      if (this.duenoForm.invalid) { this.duenoForm.markAllAsTouched(); return; }
      const nuevoDueno = this.svc.guardarDueno(this.duenoForm.value);
      this.form.patchValue({ duenoId: nuevoDueno.id });
    }
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.svc.guardarMascota({ id: this.editandoId, ...this.form.value });
    this.router.navigate(['/mascotas']);
  }
}
