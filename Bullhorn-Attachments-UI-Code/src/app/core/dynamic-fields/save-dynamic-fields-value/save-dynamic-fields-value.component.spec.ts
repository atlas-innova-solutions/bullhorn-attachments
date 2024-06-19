import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDynamicFieldsValueComponent } from './save-dynamic-fields-value.component';

describe('SaveDynamicFieldsValueComponent', () => {
  let component: SaveDynamicFieldsValueComponent;
  let fixture: ComponentFixture<SaveDynamicFieldsValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveDynamicFieldsValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveDynamicFieldsValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
