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
  private noticiasService = inject(NoticiasService);
  
  noticias: Noticia[] = [];
  cargando: boolean = false; // Inicia en false para evitar bloqueos
  categoriaSeleccionada: string = 'Todas';
  terminoBusqueda: string = '';
  categorias: string[] = ['Todas', 'Ciudad', 'Innovación', 'Cultura', 'Bienestar', 'Medio Ambiente'];

  toastMensaje: string | null = null;

  ngOnInit(): void {
    this.cargarDatos();
    this.noticiasService.busqueda$.subscribe(term => {
      this.terminoBusqueda = term;
    });
  }

  cargarDatos(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (data) => {
        this.noticias = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  filtrarPorCategoria(cat: string): void {
    this.categoriaSeleccionada = cat;
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.noticiasService.setTerminoBusqueda('');
  }

  limpiarTodo(): void {
    this.categoriaSeleccionada = 'Todas';
    this.limpiarBusqueda();
  }

  get noticiasFiltradas(): Noticia[] {
    return this.noticias.filter(n => {
      const coincideCat = (this.categoriaSeleccionada === 'Todas') || 
                          (n.categoria.trim().toLowerCase() === this.categoriaSeleccionada.trim().toLowerCase());
      const coincideTexto = !this.terminoBusqueda || 
                            n.titulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
                            n.resumen.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
      return coincideCat && coincideTexto;
    });
  }

  toggleFavorito(id: number): void {
    const agregado = this.noticiasService.toggleFavorito(id);
    this.mostrarToast(agregado ? '🔖 Noticia agregada a Favoritos' : '🗑️ Noticia eliminada de Favoritos');
  }

  mostrarToast(mensaje: string): void {
    this.toastMensaje = mensaje;
    setTimeout(() => {
      this.toastMensaje = null;
    }, 3000);
  }

  esFavorito(id: number): boolean {
    return this.noticiasService.esFavorito(id);
  }

  onImgError(event: any): void {
    event.target.src = 'https://picsum.photos/id/1015/800/500';
  }
}