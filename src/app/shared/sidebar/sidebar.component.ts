import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  get historial(){
    return this.gifsService.historial
  }

  constructor(private gifsService: GifsService) { }

//Buscar con los nombres que están cargados en el sideBar
//Hace una petición apartir de los resultados guardados en el sideBar
  buscar(termino: string){
    this.gifsService.buscarGifs(termino)

  }


  ngOnInit(): void {
  }

}
