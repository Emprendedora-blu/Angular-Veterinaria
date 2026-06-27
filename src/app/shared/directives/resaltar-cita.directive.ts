import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

/*
Resalta visualmente una cita si la fecha ocurre dentro de las próximas N horas.
Uso: <tr [appResaltarCita]="cita.fecha" [umbralHoras]="24">
 */
@Directive({ selector: '[appResaltarCita]' })
export class ResaltarCitaDirective implements OnChanges {
  @Input('appResaltarCita') fecha!: string | Date;
  @Input() umbralHoras = 24;

  constructor(private el: ElementRef<HTMLElement>, private r: Renderer2) {}

  ngOnChanges(): void {
    const host = this.el.nativeElement;
    this.r.removeClass(host, 'table-warning');
    this.r.removeClass(host, 'fw-semibold');
    if (!this.fecha) return;
    const ms = new Date(this.fecha).getTime() - Date.now();
    const horas = ms / 36e5;
    if (horas >= 0 && horas <= this.umbralHoras) {
      this.r.addClass(host, 'table-warning');
      this.r.addClass(host, 'fw-semibold');
      this.r.setAttribute(host, 'title', 'Cita próxima');
    }
  }
}
