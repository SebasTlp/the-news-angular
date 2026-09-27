import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class FavoritosComponent implements OnInit {
  private noticiasService: NoticiasService = inject(NoticiasService);
  favoritos: Noticia[] = [];

  ngOnInit(): void {
    const ids: number[] = this.noticiasService.getFavoritosIds();
    this.noticiasService.getNoticias().subscribe((data: Noticia[]) => {
      this.favoritos = data.filter((n: Noticia) => ids.includes(n.id));
    });
  }
}