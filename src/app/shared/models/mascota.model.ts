export type Especie = 'perro' | 'gato' | 'ave' | 'roedor' | 'otro';
export type Sexo = 'macho' | 'hembra';

export interface Mascota {
  id: string;
  duenoId: string;
  nombre: string;
  especie: Especie;
  raza: string;
  sexo: Sexo;
  fechaNacimiento: string; // ISO
  peso?: number;
  notas?: string;
}
