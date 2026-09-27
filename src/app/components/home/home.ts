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
      this.noticiasDestacadas = data.filter((n: Noticia) => n.destacada);
    });
  }

  agregarAFavoritos(id: number): void {
    const agregado: boolean = this.noticiasService.guardarFavorito(id);
    if (agregado) {
      alert('¡Noticia guardada en Favoritos!');
    } else {
      alert('Esta noticia ya está en tu colección.');
    }
  }
}