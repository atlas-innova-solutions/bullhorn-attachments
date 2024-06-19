import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';
import { DateFormatService } from '../../../../shared/services/date-format/date-format-service';
import { AttributePermission } from '../../../../shared/models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../../shared/models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../../shared/models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../../shared/utils/local-storage-variable';

@Component({
    selector: 'app-employment',
    templateUrl: './employment.component.html',
    styleUrl: './employment.component.scss'
})
export class EmploymentComponent {
    constructor(private dateFormatService: DateFormatService) {}
    allReviewData: PlacementReviewDataModel | undefined;
    @Input()
    public set reviewData(data: PlacementReviewDataModel) {
        if (data) {
            this.allReviewData = data;
            if (this.allReviewData.assignment) {
                if (this.allReviewData.assignment.emplStartDate) this.allReviewData.assignment.emplStartDate = this.dateFormatService.convert_mmddyyyy_hypen_to_mmddyyyy_slash(this.allReviewData.assignment.emplStartDate);
            }
        }
    }

    allRoleAttributes!: SetupUserRole;
    role!: Role | undefined;
    feature: Feature | null | undefined;

    @Input()
    public set roleAttributes(data: SetupUserRole) {
        if (data && data.roles && data.roles.length > 0) {
            this.allRoleAttributes = data;
            const selectedRole = JSON.parse(sessionStorage.getItem(LocalStorageVariables.appUserRole) || '{}');
            if (selectedRole) {
                this.role = data.roles.find((r) => r.roleId == selectedRole.roleId);
                const features = this.role?.features;
                if (features && features.length > 0) {
                    this.feature = features?.find((f) => f.featureName == 'Placement-Preview');
                }
            }
        }
    }

    isFormControlFieldDisplay(attributeName: string): boolean {
        const attributes = this.feature?.attributePermissions;
        let isDisplay: boolean = false;

        if (attributes && attributes.length > 0) {
            const attribute = attributes.find((attr: AttributePermission) => attr.attributeName === attributeName);

            if (attribute) {
                isDisplay = attribute.display;
                return isDisplay;
            }
        }

        return isDisplay;
    }
}
