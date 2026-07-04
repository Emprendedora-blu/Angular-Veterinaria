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

  guardarMascota(data: Omit<Mascota, 'id' | 'codigo'> & { id?: string }): Mascota {
    const lista = [...this.mascotas$.value];
    let resultado: Mascota;
    if (data.id) {
      const idx = lista.findIndex((m) => m.id === data.id);
      resultado = { ...lista[idx], ...data } as Mascota;
      if (!resultado.codigo) resultado.codigo = this.generarCodigo();
      if (idx >= 0) lista[idx] = resultado;
    } else {
      resultado = { ...data, id: this.storage.uid(), codigo: this.generarCodigo() };
      lista.push(resultado);
    }
    this.mascotas$.next(lista);
    this.storage.set(KEY_MASCOTAS, lista);
    return resultado;
  }

  private generarCodigo(): string {
    const numeros = this.mascotas$.value
      .map((m) => parseInt(m.codigo?.split('-')[1] ?? '', 10))
      .filter((n) => !isNaN(n));
    const siguiente = (numeros.length ? Math.max(...numeros) : 0) + 1;
    return `M-${siguiente.toString().padStart(4, '0')}`;
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
