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
      resumen: 'Resumen rápido de la nueva historia añadida desde la mesa de trabajo.',
      contenido: 'Contenido redactado desde el panel de administración.',
      imagen: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop',
      destacada: false
    };
    this.noticias.unshift(nueva);
  }
}