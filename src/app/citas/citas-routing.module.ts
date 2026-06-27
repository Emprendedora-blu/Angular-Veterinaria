import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaCitasComponent } from './pages/agenda-citas/agenda-citas.component';
import { FormCitaComponent } from './pages/form-cita/form-cita.component';

const routes: Routes = [
  { path: '', component: AgendaCitasComponent },
  { path: 'nueva', component: FormCitaComponent },
  { path: ':id/editar', component: FormCitaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRoutingModule {}
