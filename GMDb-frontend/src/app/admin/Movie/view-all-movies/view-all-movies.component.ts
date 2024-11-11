// view-all-movies.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../Movie';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-all-movies',
  standalone: true,
  templateUrl: './view-all-movies.component.html',
  styleUrls: ['./view-all-movies.component.scss'],
  imports: [CommonModule, MatCardModule],
})
export class ViewAllMoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe(
      (data) => {
        this.movies = data;
        console.log('Fetched movies: ', this.movies[10].actors);
      },
      (error) => {
        console.error('Error fetching movies: ', error);
      }
    );
  }
}
