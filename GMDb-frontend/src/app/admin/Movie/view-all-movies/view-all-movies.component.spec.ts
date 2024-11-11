import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMoviesComponent } from './view-all-movies.component';

describe('ViewAllMoviesComponent', () => {
  let component: ViewAllMoviesComponent;
  let fixture: ComponentFixture<ViewAllMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
