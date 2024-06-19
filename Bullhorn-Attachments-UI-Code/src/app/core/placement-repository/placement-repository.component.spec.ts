import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementRepositoryComponent } from './placement-repository.component';

describe('PlacementrepoComponent', () => {
    let component: PlacementRepositoryComponent;
    let fixture: ComponentFixture<PlacementRepositoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlacementRepositoryComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PlacementRepositoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
