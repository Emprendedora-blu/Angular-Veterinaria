export type Especie = 'perro' | 'gato' | 'ave' | 'roedor' | 'otro';
export type Sexo = 'macho' | 'hembra';

export interface Mascota {
  id: string;
  codigo: string;
  duenoId: string;
  nombre: string;
  especie: Especie;
  especieOtra?: string;
  raza: string;
  sexo: Sexo;
  fechaNacimiento: string; // ISO
  peso?: number;
  pesoUnidad?: 'kg' | 'g';
  notas?: string;
}
