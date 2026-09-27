import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private http: HttpClient = inject(HttpClient);
  private jsonUrl: string = 'data/noticias.json';
  private favKey: string = 'favoritos_news_ids_v2';

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.jsonUrl);
  }

  getFavoritosIds(): number[] {
    const data = localStorage.getItem(this.favKey);
    if (!data) {
      // Inicializar con las noticias 1 y 2 por defecto
      const iniciales = [1, 2];
      localStorage.setItem(this.favKey, JSON.stringify(iniciales));
      return iniciales;
    }
    try {
      return JSON.parse(data).map((id: any) => Number(id));
    } catch {
      return [1, 2];
    }
  }

  toggleFavorito(id: number): boolean {
    const idNum = Number(id);
    let favs = this.getFavoritosIds();
    const index = favs.indexOf(idNum);
    let agregado = false;

    if (index > -1) {
      favs.splice(index, 1);
    } else {
      favs.push(idNum);
      agregado = true;
    }

    localStorage.setItem(this.favKey, JSON.stringify(favs));
    return agregado;
  }

  esFavorito(id: number): boolean {
    return this.getFavoritosIds().includes(Number(id));
  }
}