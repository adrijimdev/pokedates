import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwipeComponent } from './components/swipe/swipe.component';
import { LikesComponent } from './components/likes/likes.component';

const routes: Routes = [
  { path: 'swipe', component: SwipeComponent },
  { path: 'likes', component: LikesComponent },
  { path: '', redirectTo: '/swipe', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/swipe' }, // Ruta para manejar rutas no válidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
