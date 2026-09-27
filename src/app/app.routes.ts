import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { NoticiasComponent } from './components/noticias/noticias';
import { DetalleComponent } from './components/detalle/detalle';
import { FavoritosComponent } from './components/favoritos/favoritos';
import { ContactoComponent } from './components/contacto/contacto';
import { GestionComponent } from './components/gestion/gestion';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'gestion', component: GestionComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '' }
];