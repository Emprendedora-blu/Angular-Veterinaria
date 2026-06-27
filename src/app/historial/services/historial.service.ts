import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntradaHistorial } from '../../shared/models/historial.model';
import { StorageService } from '../../shared/services/storage.service';

const KEY = 'vet.historial';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private entradas$ = new BehaviorSubject<EntradaHistorial[]>([]);

  constructor(private storage: StorageService) {
    this.entradas$.next(this.storage.get<EntradaHistorial[]>(KEY, []));
  }

  getTodas(): Observable<EntradaHistorial[]> {
    return this.entradas$.asObservable();
  }

  getPorMascota(mascotaId: string): EntradaHistorial[] {
    return this.entradas$.value
      .filter((e) => e.mascotaId === mascotaId)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  agregar(data: Omit<EntradaHistorial, 'id'>): EntradaHistorial {
    const nueva: EntradaHistorial = { ...data, id: this.storage.uid() };
    const lista = [...this.entradas$.value, nueva];
    this.entradas$.next(lista);
    this.storage.set(KEY, lista);
    return nueva;
  }

  eliminar(id: string): void {
    const lista = this.entradas$.value.filter((e) => e.id !== id);
    this.entradas$.next(lista);
    this.storage.set(KEY, lista);
  }
}
