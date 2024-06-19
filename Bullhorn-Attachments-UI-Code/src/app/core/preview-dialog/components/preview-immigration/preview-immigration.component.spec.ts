import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewImmigrationComponent } from './preview-immigration.component';

describe('PreviewImmigrationComponent', () => {
  let component: PreviewImmigrationComponent;
  let fixture: ComponentFixture<PreviewImmigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewImmigrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewImmigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
