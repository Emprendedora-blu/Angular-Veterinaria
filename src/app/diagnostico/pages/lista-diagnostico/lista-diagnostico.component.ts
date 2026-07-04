import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../../../shared/models/mascota.model';
import { MascotasService } from '../../../mascotas/services/mascotas.service';

@Component({
  selector: 'app-lista-diagnostico',
  templateUrl: './lista-diagnostico.component.html',
})
export class ListaDiagnosticoComponent implements OnInit {
  mascotas$!: Observable<Mascota[]>;
  constructor(private mascotas: MascotasService) {}
  ngOnInit(): void { this.mascotas$ = this.mascotas.getMascotas(); }
}
