import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Actor } from '../../Actor';
import { ActorService } from '../../services/actor.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { url } from 'inspector';

@Component({
  selector: 'app-add-actor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './add-actor.component.html',
  styleUrl: './add-actor.component.scss',
})
export class AddActorComponent {
  imgUrl: string = '';
  uploadPercent: any;
  actorForm: FormGroup;

  countries: string[] = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'India',
  ]; // Example countries

  imageFile!: File;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private actorService: ActorService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    // Initializing the form with controls and validators
    this.actorForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationality: ['', Validators.required],
      biography: ['', [Validators.required, Validators.minLength(10)]],
      image: [''],
    });
  }

  // Form submission handler
  onSubmit(): void {
    if (this.actorForm.valid) {
      // Convert the date to the required string format (YYYY-MM-DD)
      const formattedBirthDate = this.actorForm.value.birthDate
        ? new Date(this.actorForm.value.birthDate).toISOString().split('T')[0]
        : '';
      console.log(formattedBirthDate);

      const actorData: Actor = {
        name: this.actorForm.value.name,
        biography: this.actorForm.value.biography,
        birth_date: formattedBirthDate,
        nationality: this.actorForm.value.nationality,
        image_url: this.imgUrl,
      };

      console.log('Actor data:', this.actorForm.value);

      this.actorService.addActor(actorData).subscribe({
        next: (response) => {
          console.log('Actor added successfully', response);
          this.actorForm.reset();
          this.imgUrl = '';
          this.router.navigate(['/admin/view-all-actors']);
        },
        error: (error) => {
          console.log('Error adding actor: ', error);
        },
      });
    } else {
      console.error('Form is invalid');
      console.log('Form Values:', this.actorForm.value);
      console.log('Form Errors:', this.actorForm.errors);
    }
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      this.uploadImageToFirebase(file);
    }
  }

  uploadImageToFirebase(file: File): void {
    const filePath = `actors/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    this.uploadPercent = uploadTask.percentageChanges();

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imgUrl = url;
            this.actorForm.patchValue({ image: url });
            console.log('Image url: ', url);
          });
        })
      )
      .subscribe();
  }
}
