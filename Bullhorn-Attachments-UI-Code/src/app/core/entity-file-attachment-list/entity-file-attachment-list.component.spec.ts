import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFileAttachmentListComponent } from './entity-file-attachment-list.component';

describe('EntityFileAttachmentListComponent', () => {
  let component: EntityFileAttachmentListComponent;
  let fixture: ComponentFixture<EntityFileAttachmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityFileAttachmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityFileAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
