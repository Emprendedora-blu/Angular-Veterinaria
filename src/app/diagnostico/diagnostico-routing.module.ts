import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticoMascotaComponent } from './pages/diagnostico-mascota/diagnostico-mascota.component';
import { ListaDiagnosticoComponent } from './pages/lista-diagnostico/lista-diagnostico.component';

const routes: Routes = [
  { path: '', component: ListaDiagnosticoComponent },
  { path: ':mascotaId', component: DiagnosticoMascotaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticoRoutingModule {}
