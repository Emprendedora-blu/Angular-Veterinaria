export type EstadoCita = 'pendiente' | 'confirmada' | 'atendida' | 'cancelada';

export interface Cita {
  id: string;
  mascotaId: string;
  fecha: string; // ISO datetime
  motivo: string;
  veterinario: string;
  estado: EstadoCita;
  notas?: string;
}
