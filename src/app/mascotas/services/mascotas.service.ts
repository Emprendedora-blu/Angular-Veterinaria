import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mascota } from '../../shared/models/mascota.model';
import { Dueno, DuenoDTO } from '../../shared/models/dueno.model';
import { StorageService } from '../../shared/services/storage.service';

const KEY_MASCOTAS = 'vet.mascotas';
const KEY_DUENOS = 'vet.duenos';

@Injectable({ providedIn: 'root' })
export class MascotasService {
  private mascotas$ = new BehaviorSubject<Mascota[]>([]);
  private duenos$ = new BehaviorSubject<DuenoDTO[]>([]);

  constructor(private storage: StorageService) {
    this.mascotas$.next(this.storage.get<Mascota[]>(KEY_MASCOTAS, []));
    this.duenos$.next(this.storage.get<DuenoDTO[]>(KEY_DUENOS, []));
  }

  // --- Mascotas ---
  getMascotas(): Observable<Mascota[]> {
    return this.mascotas$.asObservable();
  }

  getMascota(id: string): Mascota | undefined {
    return this.mascotas$.value.find((m) => m.id === id);
  }

  guardarMascota(data: Omit<Mascota, 'id'> & { id?: string }): Mascota {
    const lista = [...this.mascotas$.value];
    if (data.id) {
      const idx = lista.findIndex((m) => m.id === data.id);
      if (idx >= 0) lista[idx] = data as Mascota;
    } else {
      lista.push({ ...data, id: this.storage.uid() });
    }
    this.mascotas$.next(lista);
    this.storage.set(KEY_MASCOTAS, lista);
    return lista[lista.length - 1];
  }

  eliminarMascota(id: string): void {
    const lista = this.mascotas$.value.filter((m) => m.id !== id);
    this.mascotas$.next(lista);
    this.storage.set(KEY_MASCOTAS, lista);
  }

  // --- Dueños ---
  getDuenos(): Observable<DuenoDTO[]> {
    return this.duenos$.asObservable();
  }

  getDueno(id: string): Dueno | undefined {
    const d = this.duenos$.value.find((x) => x.id === id);
    return d ? new Dueno(d.id, d.nombre, d.apellido, d.telefono, d.email, d.direccion) : undefined;
  }

  guardarDueno(data: Omit<DuenoDTO, 'id'> & { id?: string }): DuenoDTO {
    const lista = [...this.duenos$.value];
    let resultado: DuenoDTO;
    if (data.id) {
      const idx = lista.findIndex((d) => d.id === data.id);
      resultado = { ...(data as DuenoDTO) };
      if (idx >= 0) lista[idx] = resultado;
    } else {
      resultado = { ...data, id: this.storage.uid() };
      lista.push(resultado);
    }
    this.duenos$.next(lista);
    this.storage.set(KEY_DUENOS, lista);
    return resultado;
  }
}
