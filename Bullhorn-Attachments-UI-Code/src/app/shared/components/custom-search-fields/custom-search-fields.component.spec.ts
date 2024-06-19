import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchFieldsComponent } from './custom-search-fields.component';

describe('CustomSearchFieldsComponent', () => {
  let component: CustomSearchFieldsComponent;
  let fixture: ComponentFixture<CustomSearchFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSearchFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomSearchFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
