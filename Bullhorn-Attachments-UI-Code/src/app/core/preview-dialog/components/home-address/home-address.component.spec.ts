import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddressComponent } from './home-address.component';

describe('HomeAddressComponent', () => {
  let component: HomeAddressComponent;
  let fixture: ComponentFixture<HomeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
