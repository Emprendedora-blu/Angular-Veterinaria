import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'edadMascota' })
export class EdadMascotaPipe implements PipeTransform {
  transform(fechaNacimiento: string | Date): string {
    if (!fechaNacimiento) return '—';
    const nacimiento = new Date(fechaNacimiento);
    const ahora = new Date();
    let anios = ahora.getFullYear() - nacimiento.getFullYear();
    let meses = ahora.getMonth() - nacimiento.getMonth();
    if (meses < 0) {
      anios--;
      meses += 12;
    }
    if (anios <= 0) return `${meses} mes${meses === 1 ? '' : 'es'}`;
    return `${anios} año${anios === 1 ? '' : 's'}${meses ? ` y ${meses} m` : ''}`;
  }
}
