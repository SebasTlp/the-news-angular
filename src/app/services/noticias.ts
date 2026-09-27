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
  private favKey: string = 'favoritos_news';

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.jsonUrl);
  }

  getFavoritosIds(): number[] {
    const data: string | null = localStorage.getItem(this.favKey);
    return data ? JSON.parse(data) : [];
  }

  guardarFavorito(id: number): boolean {
    const favs: number[] = this.getFavoritosIds();
    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem(this.favKey, JSON.stringify(favs));
      return true;
    }
    return false;
  }
}