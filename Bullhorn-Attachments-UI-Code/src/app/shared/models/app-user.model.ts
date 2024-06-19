import { AppUserRole } from './app-user-role.model';

export class AppUser {
    activeInd!: string;
    appUserId!: number;
    email!: string;
    firstName!: string;
    hrId!: string;
    intEmpId!: number;
    lastName!: string;
    ldapId!: string;
    middleName!: string;
    appUserRoleModel!: AppUserRole;
    isSuperUser!: boolean;
}
