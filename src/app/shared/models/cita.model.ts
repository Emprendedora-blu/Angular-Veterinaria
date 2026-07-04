export type EstadoCita = 'pendiente' | 'confirmada' | 'atendida' | 'cancelada';

export interface Cita {
  id: string;
  mascotaId: string;
  fecha: string;
  motivo: string;
  veterinario: string;
  estado: EstadoCita;
  notas?: string;
}
