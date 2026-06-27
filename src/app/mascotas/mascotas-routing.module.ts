import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './pages/lista-mascotas/lista-mascotas.component';
import { FormMascotaComponent } from './pages/form-mascota/form-mascota.component';

const routes: Routes = [
  { path: '', component: ListaMascotasComponent },
  { path: 'nueva', component: FormMascotaComponent },
  { path: ':id/editar', component: FormMascotaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotasRoutingModule {}
