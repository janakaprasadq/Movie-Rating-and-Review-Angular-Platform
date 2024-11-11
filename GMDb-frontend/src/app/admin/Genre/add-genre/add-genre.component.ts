import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GenreService } from '../../services/genre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-genre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './add-genre.component.html',
  styleUrl: './add-genre.component.scss',
})
export class AddGenreComponent {
  genreForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private genreService: GenreService,
    private router: Router
  ) {
    this.genreForm = this.fb.group({
      genre: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.genreForm.valid) {
      const genreData = this.genreForm.value;
      console.log('New Genre:', genreData);

      this.genreService.addGenre(genreData).subscribe(
        (response) => {
          console.log('Genre successfully added:', response);
          this.genreForm.reset();
          this.router.navigate(['/admin/view-all-genre']);
        },
        (error) => {
          console.error('Error adding genre:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
