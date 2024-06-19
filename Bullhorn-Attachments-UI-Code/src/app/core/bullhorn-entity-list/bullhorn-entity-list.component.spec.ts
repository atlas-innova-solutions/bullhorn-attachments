import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullhornEntityListComponent } from './bullhorn-entity-list.component';

describe('BullhornEntityListComponent', () => {
  let component: BullhornEntityListComponent;
  let fixture: ComponentFixture<BullhornEntityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BullhornEntityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BullhornEntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
