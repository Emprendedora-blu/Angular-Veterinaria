import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialMascotaComponent } from './pages/historial-mascota/historial-mascota.component';
import { ListaHistorialComponent } from './pages/lista-historial/lista-historial.component';

const routes: Routes = [
  { path: '', component: ListaHistorialComponent },
  { path: ':mascotaId', component: HistorialMascotaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialRoutingModule {}
