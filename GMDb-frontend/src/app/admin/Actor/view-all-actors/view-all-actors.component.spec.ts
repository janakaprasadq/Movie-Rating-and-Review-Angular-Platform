import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllActorsComponent } from './view-all-actors.component';

describe('ViewAllActorsComponent', () => {
  let component: ViewAllActorsComponent;
  let fixture: ComponentFixture<ViewAllActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllActorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
