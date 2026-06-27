import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialMascotaComponent } from './pages/historial-mascota/historial-mascota.component';
import { ListaHistorialComponent } from './pages/lista-historial/lista-historial.component';

@NgModule({
  declarations: [HistorialMascotaComponent, ListaHistorialComponent],
  imports: [SharedModule, HistorialRoutingModule],
})
export class HistorialModule {}
