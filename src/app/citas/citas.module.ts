import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CitasRoutingModule } from './citas-routing.module';
import { AgendaCitasComponent } from './pages/agenda-citas/agenda-citas.component';
import { FormCitaComponent } from './pages/form-cita/form-cita.component';

@NgModule({
  declarations: [AgendaCitasComponent, FormCitaComponent],
  imports: [SharedModule, CitasRoutingModule],
})
export class CitasModule {}
