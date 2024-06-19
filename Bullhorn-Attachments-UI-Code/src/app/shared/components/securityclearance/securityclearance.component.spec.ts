import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityclearanceComponent } from './securityclearance.component';

describe('SecurityclearanceComponent', () => {
    let component: SecurityclearanceComponent;
    let fixture: ComponentFixture<SecurityclearanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SecurityclearanceComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SecurityclearanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
