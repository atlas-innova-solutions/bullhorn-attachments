import { Component, Input } from '@angular/core';
import { PlacementReviewDataModel } from '../../../../shared/models/review/placement-review-data.model';
import { AttributePermission } from '../../../../shared/models/user-role-attributes/attribute-permission.model';
import { Feature } from '../../../../shared/models/user-role-attributes/feature.model';
import { SetupUserRole, Role } from '../../../../shared/models/user-role-attributes/role.model';
import { LocalStorageVariables } from '../../../../shared/utils/local-storage-variable';

@Component({
  selector: 'app-pay-bill-approver',
  templateUrl: './pay-bill-approver.component.html',
  styleUrl: './pay-bill-approver.component.scss'
})
export class PayBillApproverComponent {
  allReviewData!: PlacementReviewDataModel | undefined
  @Input()
  public set reviewData(data: PlacementReviewDataModel) {
    if (data) {
        this.allReviewData = data;
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
