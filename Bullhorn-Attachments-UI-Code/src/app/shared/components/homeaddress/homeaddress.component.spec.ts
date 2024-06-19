import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeaddressComponent } from './homeaddress.component';

describe('HomeaddressComponent', () => {
    let component: HomeaddressComponent;
    let fixture: ComponentFixture<HomeaddressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeaddressComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeaddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
