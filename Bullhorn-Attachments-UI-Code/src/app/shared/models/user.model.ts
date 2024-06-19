export interface UserModel {
    activeInd: string;
    appUserId: number;
    email: string;
    firstName: string;
    hrId: string;
    intEmpId: number;
    lastName: string;
    ldapId: string;
    middleName: string;
    appUserRoleModel: UserRoleModel;
}

export interface UserRoleModel {
    appRoleId: number;
    appRoleName: string;
    defaultRole: string;
}
