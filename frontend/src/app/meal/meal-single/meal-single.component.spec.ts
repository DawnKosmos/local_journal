import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSingleComponent } from './meal-single.component';

describe('MealSingleComponent', () => {
  let component: MealSingleComponent;
  let fixture: ComponentFixture<MealSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
