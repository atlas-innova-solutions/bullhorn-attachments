import { Component, ViewChild } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LangTranslateService } from '../../../../shared/services/Lang-translate-service/lang-translate.service';
import { SetupDataService } from '../../../../shared/services/data-service/setup-data.service';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';
import { SharedService } from '../../../../shared/services/shared-service/shared.service';
import { Feature } from '../../../../shared/models/user-role-attributes/feature.model';
import { SetupUserRole } from '../../../../shared/models/user-role-attributes/role.model';
import { Section } from '../../../../shared/models/user-role-attributes/section.model';
import { LocalStorageVariables } from '../../../../shared/utils/local-storage-variable';

@Component({
    selector: 'app-preview-dialog',
    templateUrl: './preview-dialog.component.html',
    styleUrl: './preview-dialog.component.scss'
})
export class PreviewDialogComponent {
    index: number = 0;
    caseId!: number;
    workerSearch: string = '';

    roleAttributes!: SetupUserRole;
    feature!: Feature | undefined | null;
    sections!: Section[] | undefined | null;

    constructor(
        private configData: DynamicDialogConfig,
        private translateService: LangTranslateService,
        private setupDataService: SetupDataService,
        private sharedService: SharedService
    ) {
        this.caseId = this.configData?.data?.statusData;
        this.workerSearch = this.configData?.data?.workerSearch;
    }
    reviewData!: PlacementReviewDataModel;

    ngOnInit(): void {
        const selectedLang = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'English';
        this.translateService.changeLanguage(selectedLang);
        this.workerSearch ? this.fetchWorkerSearchPreviewData() : this.fetchPlacementReviewData();

        this.sharedService.roleAttributes.subscribe((data) => {
            this.roleAttributes = data;
        });

        if (this.roleAttributes && this.roleAttributes.roles && this.roleAttributes.roles.length > 0) {
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                const role = this.roleAttributes.roles.find((r) => r.roleId == selectedRole.roleId);
                const features = role?.features;
                if (features && features.length > 0) {
                    this.feature = features.find((f) => f.featureName == 'Placement-Preview');
                    if (this.feature) {
                        this.sections = this.feature.sections;
                    }
                }
            }
        }
    }

    isSectionAvailable(sectionName: string): boolean {
        if (this.sections && this.sections.length > 0) {
            const section = this.sections.find((sec: Section) => sec.sectionName === sectionName);

            if (section) {
                return section.display;
            }
        }

        return false;
    }

    public fetchPlacementReviewData() {
        this.setupDataService.getPlacementDetails(this.caseId).subscribe(
            (res: PlacementReviewDataModel) => {
                this.reviewData = res;
            },
            (err: any) => {
                console.log('error_Details: ', err);
            }
        );
    }

    public fetchWorkerSearchPreviewData() {
        this.setupDataService.getWorkerSearchPreviewDetails(this.caseId).subscribe(
            (res: PlacementReviewDataModel) => {
                this.reviewData = res;
                console.log(res);
            },
            (err: any) => {
                console.log('error_Details: ', err);
            }
        );
    }
}
