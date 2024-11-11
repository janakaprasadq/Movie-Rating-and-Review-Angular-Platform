import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ViewAllMoviesComponent } from './Movie/view-all-movies/view-all-movies.component';
import { AddMovieComponent } from './Movie/add-movie/add-movie.component';
import { FindMovieComponent } from './Movie/find-movie/find-movie.component';
import { UpdateMovieComponent } from './Movie/update-movie/update-movie.component';
import { AddActorComponent } from './Actor/add-actor/add-actor.component';
import { AddGenreComponent } from './Genre/add-genre/add-genre.component';
import { ViewAllActorsComponent } from './Actor/view-all-actors/view-all-actors.component';
import { ViewAllGenresComponent } from './Genre/view-all-genres/view-all-genres.component';
import { UpdateActorComponent } from './Actor/update-actor/update-actor.component';
import { UpdateGenreComponent } from './Genre/update-genre/update-genre.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'view-all-movies', pathMatch: 'full' },
      { path: 'view-all-movies', component: ViewAllMoviesComponent },
      { path: 'add-movie', component: AddMovieComponent },
      { path: 'update-movie', component: UpdateMovieComponent },

      { path: 'view-all-actors', component: ViewAllActorsComponent },
      { path: 'add-actor', component: AddActorComponent },
      { path: 'update-actor', component: UpdateActorComponent },

      { path: 'add-genre', component: AddGenreComponent },
      { path: 'view-all-genre', component: ViewAllGenresComponent },
      { path: 'update-genre', component: UpdateGenreComponent },

      { path: 'find-movie', component: FindMovieComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
