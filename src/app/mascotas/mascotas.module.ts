import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormMascotaComponent } from './pages/form-mascota/form-mascota.component';

@NgModule({
  declarations: [ListaMascotasComponent, FormMascotaComponent],
  imports: [SharedModule, MascotasRoutingModule],
})
export class MascotasModule {}
