import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsfComponent } from './csf.component';

describe('CsfComponent', () => {
  let component: CsfComponent;
  let fixture: ComponentFixture<CsfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CsfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
