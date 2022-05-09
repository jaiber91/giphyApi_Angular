import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'wxKOBkt2brbVYuocbpiMq4r1rJgeSrXL'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  //Para almacenas la data de la api
  //Gif es una interface importada
  public resultados: Gif[] = []
  get historial(){

      return [...this._historial]
  }

  //Llamando el modulo para hacer las peticiones http
  constructor(private http: HttpClient){
    //Leyendo la data  desde el LocalStorage
    //Parse: es para convertir todo el objeto en string
    //!: es para que TS confie y no marque errror
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }

    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!)
    }
  };

  buscarGifs(query: string){
    query = query.trim().toLowerCase()//Para poner todo en minusculas

    if (!this._historial.includes(query)) {//condición para que no se repita el mismo valor
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)//Mostrar solo diez miniCards en el sidebar

      //grabando en el localStorage
      localStorage.setItem("historial", JSON.stringify(this._historial))
    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

        console.log(params.toString);


    //haciendo la petición a la api
    //El GifsResponse es una interface importada desde gifs/interface
    this.http.get <GifsResponse> (`${this.serviceUrl}/search`, {params})
        .subscribe((response ) =>{
          console.log(response.data);
          this.resultados = response.data;

          //Grabando los resultados en el localStorage
          localStorage.setItem("resultados", JSON.stringify(this.resultados))

        })

    console.log(this._historial);

  }


}
