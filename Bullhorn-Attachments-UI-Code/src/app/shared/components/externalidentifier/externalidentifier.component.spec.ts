import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalidentifierComponent } from './externalidentifier.component';

describe('ExternalidentifierComponent', () => {
    let component: ExternalidentifierComponent;
    let fixture: ComponentFixture<ExternalidentifierComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExternalidentifierComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ExternalidentifierComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
