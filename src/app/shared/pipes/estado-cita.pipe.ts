import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../models/cita.model';

@Pipe({ name: 'estadoCita' })
export class EstadoCitaPipe implements PipeTransform {
  private readonly etiquetas: Record<EstadoCita, { texto: string; clase: string }> = {
    pendiente:   { texto: 'Pendiente',   clase: 'bg-warning text-dark' },
    confirmada:  { texto: 'Confirmada',  clase: 'bg-info text-dark' },
    atendida:    { texto: 'Atendida',    clase: 'bg-success' },
    cancelada:   { texto: 'Cancelada',   clase: 'bg-danger' },
  };

  transform(estado: EstadoCita, modo: 'texto' | 'badge' = 'badge'): string {
    const meta = this.etiquetas[estado];
    if (!meta) return estado;
    if (modo === 'texto') return meta.texto;
    return `<span class="badge ${meta.clase}">${meta.texto}</span>`;
  }
}
