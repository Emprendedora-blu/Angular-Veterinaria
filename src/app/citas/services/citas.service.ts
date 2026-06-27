import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cita } from '../../shared/models/cita.model';
import { StorageService } from '../../shared/services/storage.service';

const KEY = 'vet.citas';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private citas$ = new BehaviorSubject<Cita[]>([]);

  constructor(private storage: StorageService) {
    this.citas$.next(this.storage.get<Cita[]>(KEY, []));
  }

  getCitas(): Observable<Cita[]> {
    return this.citas$.asObservable();
  }

  getCita(id: string): Cita | undefined {
    return this.citas$.value.find((c) => c.id === id);
  }

  getPorMascota(mascotaId: string): Cita[] {
    return this.citas$.value.filter((c) => c.mascotaId === mascotaId);
  }

  guardar(data: Omit<Cita, 'id'> & { id?: string }): Cita {
    const lista = [...this.citas$.value];
    let resultado: Cita;
    if (data.id) {
      const idx = lista.findIndex((c) => c.id === data.id);
      resultado = { ...(data as Cita) };
      if (idx >= 0) lista[idx] = resultado;
    } else {
      resultado = { ...data, id: this.storage.uid() };
      lista.push(resultado);
    }
    this.persist(lista);
    return resultado;
  }

  cambiarEstado(id: string, estado: Cita['estado']): void {
    const lista = this.citas$.value.map((c) =>
      c.id === id ? { ...c, estado } : c,
    );
    this.persist(lista);
  }

  eliminar(id: string): void {
    this.persist(this.citas$.value.filter((c) => c.id !== id));
  }

  private persist(lista: Cita[]): void {
    lista.sort((a, b) => a.fecha.localeCompare(b.fecha));
    this.citas$.next(lista);
    this.storage.set(KEY, lista);
  }
}
