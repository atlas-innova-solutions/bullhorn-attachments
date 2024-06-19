import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmItentifireComponent } from './hcm-itentifire.component';

describe('HcmItentifireComponent', () => {
  let component: HcmItentifireComponent;
  let fixture: ComponentFixture<HcmItentifireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HcmItentifireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HcmItentifireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
