import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class DetalleComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private noticiasService: NoticiasService = inject(NoticiasService);
  noticia: Noticia | undefined;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.noticiasService.getNoticias().subscribe((data: Noticia[]) => {
        this.noticia = data.find((n: Noticia) => n.id === id);
      });
    }
  }

  guardarFavorito(): void {
    if (this.noticia) {
      const agregado = this.noticiasService.guardarFavorito(this.noticia.id);
      alert(agregado ? '¡Noticia guardada en favoritos!' : 'Esta noticia ya estaba guardada.');
    }
  }
}