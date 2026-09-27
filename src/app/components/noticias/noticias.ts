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
  categoriaSeleccionada: string = 'Todas';
  categorias: string[] = ['Todas', 'Ciudad', 'Innovación', 'Cultura', 'Bienestar', 'Medio Ambiente'];

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe((data: Noticia[]) => {
      this.noticias = data;
    });
  }

  filtrarPorCategoria(cat: string): void {
    this.categoriaSeleccionada = cat;
  }

  get noticiasFiltradas(): Noticia[] {
    if (this.categoriaSeleccionada === 'Todas') {
      return this.noticias;
    }
    return this.noticias.filter(n => n.categoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase());
  }

  agregarAFavoritos(id: number): void {
    const agregado = this.noticiasService.guardarFavorito(id);
    alert(agregado ? '¡Noticia guardada en Favoritos!' : 'Esta noticia ya está en tus favoritos.');
  }
}