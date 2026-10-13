import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  tiempoLectura: string;
  resumen: string;
  contenido: string;
  imagen: string;
  destacada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private http = inject(HttpClient);
  private jsonUrl = 'data/noticias.json';
  private storageKey = 'the_news_favorites_v1';

  private favoritosSubject = new BehaviorSubject<number[]>(this.obtenerFavoritosGuardados());
  public favoritos$ = this.favoritosSubject.asObservable();

  private busquedaSubject = new BehaviorSubject<string>('');
  public busqueda$ = this.busquedaSubject.asObservable();

  private noticiasDatos: Noticia[] = [
    {
      id: 1,
      titulo: 'La nueva red de parques que conectará cinco barrios',
      categoria: 'Ciudad',
      tiempoLectura: '6 min',
      resumen: 'Un corredor verde recuperará 18 hectáreas y sumará rutas seguras para caminar y pedalear.',
      contenido: 'A primera hora, el lote todavía parece una frontera...',
      imagen: 'https://picsum.photos/id/1015/800/500',
      destacada: true
    },
    {
      id: 2,
      titulo: 'La energía solar llega a los mercados de barrio',
      categoria: 'Innovación',
      tiempoLectura: '6 min',
      resumen: 'Comerciantes reducen costos mientras modernizan la cadena de frío de sus negocios.',
      contenido: 'Paneles solares instalados en las cubiertas...',
      imagen: 'https://picsum.photos/id/1060/800/500',
      destacada: true
    },
    {
      id: 3,
      titulo: 'Las bibliotecas nocturnas abren una nueva conversación',
      categoria: 'Cultura',
      tiempoLectura: '5 min',
      resumen: 'Lecturas, música y talleres extienden la vida cultural de la ciudad hasta medianoche.',
      contenido: 'El programa de extensión horaria...',
      imagen: 'https://picsum.photos/id/1070/800/500',
      destacada: true
    },
    {
      id: 4,
      titulo: 'El río vuelve a ser parte de la vida cotidiana',
      categoria: 'Medio Ambiente',
      tiempoLectura: '7 min',
      resumen: 'La recuperación de sus orillas transforma la movilidad y reúne a tres comunidades.',
      contenido: 'Proyectos de bioingeniería...',
      imagen: 'https://picsum.photos/id/1043/800/500',
      destacada: false
    },
    {
      id: 5,
      titulo: 'Calles tranquilas para volver a caminar el barrio',
      categoria: 'Ciudad',
      tiempoLectura: '5 min',
      resumen: 'Nuevas rutas peatonales acercan escuelas, comercios y estaciones de transporte público.',
      contenido: 'La pacificación del tráfico...',
      imagen: 'https://picsum.photos/id/1076/800/500',
      destacada: false
    },
    {
      id: 6,
      titulo: 'Cocinas comunitarias que también cuidan la salud',
      categoria: 'Bienestar',
      tiempoLectura: '4 min',
      resumen: 'Una red vecinal combina alimentación, escucha y prevención para acompañar a las familias.',
      contenido: 'Talleres de nutrición...',
      imagen: 'https://picsum.photos/id/1080/800/500',
      destacada: false
    }
  ];

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.jsonUrl).pipe(
      catchError(() => of(this.noticiasDatos))
    );
  }

  setTerminoBusqueda(termino: string): void {
    this.busquedaSubject.next(termino);
  }

  private obtenerFavoritosGuardados(): number[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [1, 2, 3];
  }

  toggleFavorito(id: number): boolean {
    const actuales = [...this.favoritosSubject.value];
    const index = actuales.indexOf(id);
    let agregado = false;

    if (index > -1) {
      actuales.splice(index, 1);
    } else {
      actuales.push(id);
      agregado = true;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(actuales));
    this.favoritosSubject.next(actuales);
    return agregado;
  }

  esFavorito(id: number): boolean {
    return this.favoritosSubject.value.includes(id);
  }
}