import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service'; // Importing MovieService
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Movie } from '../../Movie';
import { Actor } from '../../Actor';
import { GenreService } from '../../services/genre.service';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class AddMovieComponent {
  posterUrl: string = '';
  posterFile!: File;
  uploadPercent: any;

  availableActors: Actor[] = [];
  //availableGenres: any = ['Scientific', 'Comedy'];
  availableGenres: any[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private genreService: GenreService,
    private router: Router,
    private storage: AngularFireStorage,
    private actorService: ActorService
  ) {
    // Initializing the form with required controls and validators
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      poster_url: [''],
      release_date: ['', Validators.required],
      duration_minutes: ['', [Validators.required, Validators.min(1)]],
      trailer_url: ['', Validators.required],
      genres: [[]],
      actors: [[]],
    });
  }

  ngOnInit(): void {
    this.loadActors();
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe(
      (data) => {
        this.availableGenres = data; // Assign data to availableGenres
        //console.log(data);
      },
      (error) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  loadActors(): void {
    this.actorService.getActors().subscribe(
      (data) => {
        this.availableActors = data; // Assign data to availableActors
        //console.log(data);
      },
      (error) => {
        console.error('Error fetching actors:', error);
      }
    );
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      const movieData: Movie = {
        title: this.form.value.title,
        description: this.form.value.description,
        release_date: new Date(this.form.value.release_date),
        duration_minutes: Number(this.form.value.duration_minutes),
        trailer_url: this.form.value.trailer_url,
        genres: this.form.value.genres,
        actors: this.form.value.actors || [],
        poster_url: this.posterUrl,
        created_at: new Date(),
      };
      console.log(movieData);

      // Use the MovieService to send data to the backend API
      this.movieService.addMovie(movieData).subscribe({
        next: (response) => {
          console.log('Movie added successfully!', response);
          this.form.reset();
          this.posterUrl = '';
          this.router.navigate(['/admin/view-all-movies']);
        },
        error: (error) => {
          console.error('Error adding movie: ', error);
        },
      });
    } else {
      console.error('Form is invalid');
      console.log('Form Values:', this.form.value);
      console.log('Form Errors:', this.form.errors);
    }
  }

  // File selection handler method
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Preview the image before upload using FileReader (Optional, for UI purposes)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.posterUrl = e.target.result; // Show the preview
      };
      reader.readAsDataURL(file); // Read the file as a Data URL for preview

      // Start the file upload to Firebase Storage
      this.uploadPosterToFirebase(file);
    }
  }

  // Method to handle the upload of the movie poster to Firebase Storage
  uploadPosterToFirebase(file: File): void {
    const filePath = `posters/${Date.now()}_${file.name}`; // Unique file path based on timestamp and file name
    const fileRef = this.storage.ref(filePath); // Reference to the storage location
    const uploadTask = this.storage.upload(filePath, file); // Upload the file

    // Track upload progress (optional)
    this.uploadPercent = uploadTask.percentageChanges();

    // Listen for changes in the upload task and finalize once complete
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.posterUrl = url; // Store the download URL in a variable
            this.form.patchValue({ poster_url: url }); // Update form with the URL
            console.log('Poster URL:', url); // Log the poster URL for debugging
          });
        })
      )
      .subscribe();
  }
}
