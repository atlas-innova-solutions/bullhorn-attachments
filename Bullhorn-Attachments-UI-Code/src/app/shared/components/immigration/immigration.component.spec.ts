import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationComponent } from './immigration.component';

describe('ImmigrationComponent', () => {
    let component: ImmigrationComponent;
    let fixture: ComponentFixture<ImmigrationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImmigrationComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ImmigrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
