import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion.html',
  styleUrl: './gestion.css'
})
export class GestionComponent implements OnInit {
  private noticiasService: NoticiasService = inject(NoticiasService);

  noticias: Noticia[] = [];
  filtroTexto: string = '';
  noticiaAEliminar: Noticia | null = null;

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticiasService.getNoticias().subscribe((data: Noticia[]) => {
      this.noticias = data;
    });
  }

  get noticiasFiltradas(): Noticia[] {
    if (!this.filtroTexto.trim()) {
      return this.noticias;
    }
    return this.noticias.filter(n =>
      n.titulo.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
  }

  prepararEliminar(noticia: Noticia): void {
    this.noticiaAEliminar = noticia;
  }

  cancelarEliminar(): void {
    this.noticiaAEliminar = null;
  }

  confirmarEliminar(): void {
    if (this.noticiaAEliminar) {
      this.noticias = this.noticias.filter(n => n.id !== this.noticiaAEliminar?.id);
      this.noticiaAEliminar = null;
    }
  }

  crearNoticiaDemo(): void {
    const nueva: Noticia = {
      id: Date.now(),
      titulo: 'Nueva publicación editorial de prueba',
      categoria: 'Ciudad',
      tiempoLectura: '3 min',
      resumen: 'Resumen rápido de la nueva historia añadida desde el panel de administración.',
      contenido: 'Contenido redactado directamente desde la mesa de trabajo.',
      imagen: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
      destacada: false
    };
    this.noticias.unshift(nueva);
  }
}