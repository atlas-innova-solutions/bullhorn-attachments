import { Feature } from "./feature.model";
import { Navigation } from "./naviagtion.model";

export class Role {
    roleId!: number;
    roleName!: string;
    navigations!: Navigation[] | null;
    features!: Feature[] | null;
}

export class SetupUserRole {
    roles!: Role[] | null;
}