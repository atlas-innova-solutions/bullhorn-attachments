import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITSolutionsComponent } from './it-solutions.component';

describe('ITSolutionsComponent', () => {
  let component: ITSolutionsComponent;
  let fixture: ComponentFixture<ITSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ITSolutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ITSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
