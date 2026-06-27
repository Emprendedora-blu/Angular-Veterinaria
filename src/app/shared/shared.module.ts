import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EstadoCitaPipe } from './pipes/estado-cita.pipe';
import { EdadMascotaPipe } from './pipes/edad-mascota.pipe';
import { ResaltarCitaDirective } from './directives/resaltar-cita.directive';

@NgModule({
  declarations: [EstadoCitaPipe, EdadMascotaPipe, ResaltarCitaDirective],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    EstadoCitaPipe,
    EdadMascotaPipe,
    ResaltarCitaDirective,
  ],
})
export class SharedModule {}
