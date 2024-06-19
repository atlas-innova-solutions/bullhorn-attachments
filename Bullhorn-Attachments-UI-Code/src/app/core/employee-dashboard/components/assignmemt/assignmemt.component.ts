import { Component, Input } from '@angular/core';
import { assignment_information } from '../../../../shared/utils/lable-text-constant';
import { SetupDataService } from '../../../../shared/services/data-service/setup-data.service';
import { AssignmentInformationTable } from '../../../../shared/models/Data-Table/worker-search-data-grid/assignment-information-tbl.model';
import { PreviewDialogComponent } from '../../../preview-dialog/components/preview-dialog/preview-dialog.component';
import { SharedDialogService } from '../../../../shared/services/dialog-service/shared-dialog.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { CoreModulesUrl } from '../../../../shared/utils/page-navigation-url';
import { Employment } from '../../../../shared/models/review/employment-data.model';
import { AllowedAction } from '../../../../shared/models/user-role-attributes/allowed-action.model';
import { Feature } from '../../../../shared/models/user-role-attributes/feature.model';
import { SetupUserRole } from '../../../../shared/models/user-role-attributes/role.model';
import { SharedService } from '../../../../shared/services/shared-service/shared.service';
import { LocalStorageVariables } from '../../../../shared/utils/local-storage-variable';

@Component({
    selector: 'app-assignmemt',
    templateUrl: './assignmemt.component.html',
    styleUrl: './assignmemt.component.scss'
})
export class AssignmemtComponent {
    cols!: any[];
    assignmentInfo!: AssignmentInformationTable[];
    employmentInfo: Employment | undefined;
    refs: DynamicDialogRef | undefined;
    @Input()
    public set assignmentInformation(data: AssignmentInformationTable[]) {
        if (data) {
            this.assignmentInfo = data;
        }
    }
    @Input()
    public set employmentInformation(data: any) {
        if (data) {
            this.employmentInfo = data;
        }
    }
    @Input() personId: any;

    roleAttributes!: SetupUserRole;
    feature!: Feature | undefined | null;
    actions!: AllowedAction[] | undefined | null;

    constructor(
        private SetupDataService: SetupDataService,
        private dialogService: SharedDialogService,
        private route: Router,
        private sharedService: SharedService
    ) {}

    ngOnInit() {
        this.cols = assignment_information;

        this.sharedService.roleAttributes.subscribe((data) => {
            this.roleAttributes = data;
        });

        if (this.roleAttributes && this.roleAttributes.roles && this.roleAttributes.roles.length > 0) {
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                const role = this.roleAttributes.roles.find((r) => r.roleId == selectedRole.roleId);
                const features = role?.features;
                if (features && features.length > 0) {
                    this.feature = features.find((f) => f.featureName == 'Employee-Assignments');
                    if (this.feature) {
                        this.actions = this.feature.allowedActions;
                    }
                }
            }
        }

        console.log('Role Attributes', this.roleAttributes.roles);
    }

    isActionAvailable(actionName: string): boolean {
        if (this.actions && this.actions.length > 0) {
            const action = this.actions.find((act: AllowedAction) => act.actionName === actionName);

            if (action) {
                return action.displayAction;
            }
        }

        return false;
    }

    openPreviewDialog(data: any) {
        console.log(data);
        this.refs = this.dialogService.openDialog({
            component: PreviewDialogComponent,
            config: {
                data: {
                    statusData: data
                },
                header: 'Assignment Preview',
                width: '95%',
                height: '70rem'
            }
        });
    }

    openFusionAsgmtPreview(data: boolean, rowData: any) {
        if (data == true) {
            this.openPreviewDialog(rowData);
        }
    }
    openChangeRequest(rowData: any, asgmtData: any): void {
        this.route.navigate([CoreModulesUrl.WorkerSearch + '/' + CoreModulesUrl.EmploymentDashboard + '/' + CoreModulesUrl.ChangeRequest], {
            queryParams: { rowData: JSON.stringify(rowData), employmentInfo: JSON.stringify(this.employmentInfo), asgmtData: asgmtData, personId: this.personId }
        });
    }
}
