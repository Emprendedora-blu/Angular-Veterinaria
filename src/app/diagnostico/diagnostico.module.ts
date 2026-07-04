import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DiagnosticoRoutingModule } from './diagnostico-routing.module';
import { DiagnosticoMascotaComponent } from './pages/diagnostico-mascota/diagnostico-mascota.component';
import { ListaDiagnosticoComponent } from './pages/lista-diagnostico/lista-diagnostico.component';

@NgModule({
  declarations: [DiagnosticoMascotaComponent, ListaDiagnosticoComponent],
  imports: [SharedModule, DiagnosticoRoutingModule],
})
export class DiagnosticoModule {}
