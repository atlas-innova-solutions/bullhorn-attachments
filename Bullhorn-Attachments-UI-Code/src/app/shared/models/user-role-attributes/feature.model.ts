import { AllowedAction } from "./allowed-action.model";
import { AttributePermission } from "./attribute-permission.model";
import { Section } from "./section.model";

export class Feature {
    featureName!: string;
    isFeatureAccessible!: boolean;
    allowedActions!: AllowedAction[] | null;
    sections!: Section[] | undefined | null;
    attributePermissions!: AttributePermission[] | null;
}