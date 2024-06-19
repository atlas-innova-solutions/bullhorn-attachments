import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCMIdentifiersComponent } from './hcm-identifiers.component';

describe('HCMIdentifiersComponent', () => {
  let component: HCMIdentifiersComponent;
  let fixture: ComponentFixture<HCMIdentifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HCMIdentifiersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HCMIdentifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
