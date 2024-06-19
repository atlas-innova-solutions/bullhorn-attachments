import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementReviewComponent } from './placement-review.component';

describe('PlacementReviewComponent', () => {
    let component: PlacementReviewComponent;
    let fixture: ComponentFixture<PlacementReviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlacementReviewComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PlacementReviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
