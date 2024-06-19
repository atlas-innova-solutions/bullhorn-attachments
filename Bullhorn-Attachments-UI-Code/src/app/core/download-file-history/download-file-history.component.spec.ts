import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFileHistoryComponent } from './download-file-history.component';

describe('DownloadFileHistoryComponent', () => {
  let component: DownloadFileHistoryComponent;
  let fixture: ComponentFixture<DownloadFileHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadFileHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadFileHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
