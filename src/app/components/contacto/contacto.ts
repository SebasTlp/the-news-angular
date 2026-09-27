import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactoComponent {
  nombre: string = '';
  correo: string = '';
  asunto: string = '';
  mensaje: string = '';
  mensajeEnviado: boolean = false;

  enviarFormulario(): void {
    if (this.nombre && this.correo && this.asunto && this.mensaje) {
      this.mensajeEnviado = true;
      this.nombre = '';
      this.correo = '';
      this.asunto = '';
      this.mensaje = '';
    }
  }
}