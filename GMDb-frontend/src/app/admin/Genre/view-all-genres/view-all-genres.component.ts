import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-all-genres',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './view-all-genres.component.html',
  styleUrl: './view-all-genres.component.scss',
})
export class ViewAllGenresComponent {
  genres: any[] = [];
  loading: boolean = true;
  displayedColumns: string[] = ['position', 'genre_name'];

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe(
      (data) => {
        this.genres = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching genres:', error);
        this.loading = false;
      }
    );
  }
}
