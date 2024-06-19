import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliveryComponent } from './project-delivery.component';

describe('ProjectDeliveryComponent', () => {
  let component: ProjectDeliveryComponent;
  let fixture: ComponentFixture<ProjectDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
