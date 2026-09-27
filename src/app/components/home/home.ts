import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private noticiasService: NoticiasService = inject(NoticiasService);
  noticiasDestacadas: Noticia[] = [];

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((data: Noticia[]) => {
      this.noticiasDestacadas = data.slice(0, 3);
    });
  }

  agregarAFavoritos(id: number): void {
    const esFavorito = this.noticiasService.toggleFavorito(id);
    alert(esFavorito ? '¡Noticia guardada en favoritos!' : 'Noticia eliminada de favoritos.');
  }

  esFavorito(id: number): boolean {
    return this.noticiasService.esFavorito(id);
  }
}