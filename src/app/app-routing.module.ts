import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'mascotas', pathMatch: 'full' },
  {
    path: 'mascotas',
    loadChildren: () =>
      import('./mascotas/mascotas.module').then((m) => m.MascotasModule),
  },
  {
    path: 'citas',
    loadChildren: () =>
      import('./citas/citas.module').then((m) => m.CitasModule),
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./historial/historial.module').then((m) => m.HistorialModule),
  },
  {
    path: 'diagnostico',
    loadChildren: () =>
      import('./diagnostico/diagnostico.module').then((m) => m.DiagnosticoModule),
  },
  { path: '**', redirectTo: 'mascotas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
