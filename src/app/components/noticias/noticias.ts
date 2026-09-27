import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css'
})
export class NoticiasComponent implements OnInit {
  private noticiasService: NoticiasService = inject(NoticiasService);
  noticias: Noticia[] = [];

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((data: Noticia[]) => {
      this.noticias = data;
    });
  }

  agregarAFavoritos(id: number): void {
    const agregado: boolean = this.noticiasService.guardarFavorito(id);
    if (agregado) {
      alert('¡Noticia guardada en Favoritos!');
    } else {
      alert('Esta noticia ya está en tus favoritos.');
    }
  }
}