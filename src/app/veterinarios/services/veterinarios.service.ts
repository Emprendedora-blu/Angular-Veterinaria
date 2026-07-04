import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Veterinario } from '../../shared/models/veterinario.model';

const VETERINARIOS: Veterinario[] = [
  {
    id: 'v1',
    nombre: 'Dr. Jorge Ramírez',
    especialidad: 'Medicina general',
    dias: 'Lun - Vie',
    horaInicio: '8:00 AM',
    horaFin: '1:00 PM',
  },
  {
    id: 'v2',
    nombre: 'Dra. Mariela Torres',
    especialidad: 'Cirugía',
    dias: 'Lun - Vie',
    horaInicio: '3:00 PM',
    horaFin: '8:00 PM',
  },
];

@Injectable({ providedIn: 'root' })
export class VeterinariosService {
  private veterinarios$ = new BehaviorSubject<Veterinario[]>(VETERINARIOS);

  getVeterinarios(): Observable<Veterinario[]> {
    return this.veterinarios$.asObservable();
  }

  getVeterinario(id: string): Veterinario | undefined {
    return this.veterinarios$.value.find((v) => v.id === id);
  }
}
