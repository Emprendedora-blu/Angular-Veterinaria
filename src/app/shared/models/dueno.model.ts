import { Persona } from './persona.model';

/** Herencia + polimorfismo sobre Persona */
export class Dueno extends Persona {
  constructor(
    id: string,
    nombre: string,
    apellido: string,
    telefono: string,
    public email: string,
    public direccion: string = '',
  ) {
    super(id, nombre, apellido, telefono);
  }

  override describir(): string {
    return `Dueño: ${this.nombreCompleto} (${this.email})`;
  }
}

export interface DuenoDTO {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion?: string;
}
