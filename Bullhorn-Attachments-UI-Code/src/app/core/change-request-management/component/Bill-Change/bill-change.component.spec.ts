import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillChangeComponent } from './bill-change.component';

describe('BillChangeComponent', () => {
  let component: BillChangeComponent;
  let fixture: ComponentFixture<BillChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
