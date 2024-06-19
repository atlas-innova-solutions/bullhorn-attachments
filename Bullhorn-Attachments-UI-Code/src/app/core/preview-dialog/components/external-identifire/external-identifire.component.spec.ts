import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalIdentifireComponent } from './external-identifire.component';

describe('ExternalIdentifireComponent', () => {
  let component: ExternalIdentifireComponent;
  let fixture: ComponentFixture<ExternalIdentifireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalIdentifireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalIdentifireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
