import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  //Este resultado se debe mandar al html de este componente
  get resultados(){
    return this.gifServices.resultados
  }

  //Inyectando la data de la api que está en Service
  constructor(private gifServices: GifsService) { }

  ngOnInit(): void {
  }

}
