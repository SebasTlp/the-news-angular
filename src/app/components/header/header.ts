import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  private noticiasService = inject(NoticiasService);
  private router = inject(Router);

  termino: string = '';

  ngOnInit(): void {
    // Sincroniza el input si el término cambia externamente
    this.noticiasService.busqueda$.subscribe(term => {
      this.termino = term;
    });
  }

  onModelChange(nuevoTexto: string): void {
    this.noticiasService.setTerminoBusqueda(nuevoTexto);
    if (this.router.url !== '/noticias' && nuevoTexto.trim() !== '') {
      this.router.navigate(['/noticias']);
    }
  }

  onBuscar(): void {
    this.noticiasService.setTerminoBusqueda(this.termino);
    if (this.router.url !== '/noticias') {
      this.router.navigate(['/noticias']);
    }
  }
}