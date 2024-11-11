import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllGenresComponent } from './view-all-genres.component';

describe('ViewAllGenresComponent', () => {
  let component: ViewAllGenresComponent;
  let fixture: ComponentFixture<ViewAllGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllGenresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
