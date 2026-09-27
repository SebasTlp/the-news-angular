import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Noticia } from '../../services/noticias';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class FavoritosComponent implements OnInit {
  // Lista fija e ilustrativa que jamás se borrará al cambiar de pestaña
  favoritos: Noticia[] = [
    {
      id: 1,
      titulo: 'La nueva red de parques que conectará cinco barrios',
      categoria: 'Ciudad',
      tiempoLectura: '6 min',
      resumen: 'Un corredor verde recuperará 18 hectáreas y sumará rutas seguras para caminar y pedalear.',
      contenido: 'A primera hora, el lote todavía parece una frontera...',
      imagen: 'https://picsum.photos/id/1015/800/500',
      destacada: true
    },
    {
      id: 2,
      titulo: 'La energía solar llega a los mercados de barrio',
      categoria: 'Innovación',
      tiempoLectura: '6 min',
      resumen: 'Comerciantes reducen costos mientras modernizan la cadena de frío de sus negocios.',
      contenido: 'Paneles solares instalados en las cubiertas...',
      imagen: 'https://picsum.photos/id/1060/800/500',
      destacada: true
    },
    {
      id: 3,
      titulo: 'Las bibliotecas nocturnas abren una nueva conversación',
      categoria: 'Cultura',
      tiempoLectura: '5 min',
      resumen: 'Lecturas, música y talleres extienden la vida cultural de la ciudad hasta medianoche.',
      contenido: 'El programa de extensión horaria ha transformado...',
      imagen: 'https://picsum.photos/id/1070/800/500',
      destacada: true
    }
  ];

  ngOnInit(): void {
    // Garantiza la carga inmediata de los 3 elementos
  }

  quitarFavorito(index: number): void {
    this.favoritos.splice(index, 1);
  }
}