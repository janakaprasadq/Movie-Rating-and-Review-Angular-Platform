import { Component, OnInit } from '@angular/core';
import { Actor } from '../../Actor';
import { ActorService } from '../../services/actor.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-all-actors',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './view-all-actors.component.html',
  styleUrl: './view-all-actors.component.scss',
})
export class ViewAllActorsComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'name',
    'birth_date',
    'nationality',
    'biography',
  ];
  actors: Actor[] = [];

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    this.actorService.getActors().subscribe((data) => {
      this.actors = data;
      console.log('First actor data:', this.actors[0].birth_date);
    });
  }
}
