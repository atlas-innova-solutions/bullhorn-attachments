import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayChangeComponent } from './pay-change.component';

describe('PayChangeComponent', () => {
  let component: PayChangeComponent;
  let fixture: ComponentFixture<PayChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
