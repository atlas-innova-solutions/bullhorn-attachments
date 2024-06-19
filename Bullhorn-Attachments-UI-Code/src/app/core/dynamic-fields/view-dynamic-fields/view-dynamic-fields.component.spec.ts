import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDynamicFieldsComponent } from './view-dynamic-fields.component';

describe('ViewDynamicFieldsComponent', () => {
  let component: ViewDynamicFieldsComponent;
  let fixture: ComponentFixture<ViewDynamicFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDynamicFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDynamicFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
