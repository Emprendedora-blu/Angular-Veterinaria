/**
 * Clase base abstracta — demuestra POO: abstracción + encapsulamiento.
 * Usada como base para Dueno (herencia).
 */
export abstract class Persona {
  protected readonly _id: string;

  constructor(
    id: string,
    public nombre: string,
    public apellido: string,
    public telefono: string,
  ) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`.trim();
  }

  abstract describir(): string;
}
