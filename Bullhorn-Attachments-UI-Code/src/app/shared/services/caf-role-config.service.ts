import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { caf_rolesConfig } from '../utils/lable-text-constant';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CafRoleConfigService {
    // readonly appRoles:any =  caf_rolesConfig;

    private servicesServer = environment.envServer;
    private appRoles: any = {};
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get(this.servicesServer + '/services/caf/v5/cases');
    }

    /**
     * Function: readAppRolesFromExternally()
     * Desc: load the caf roles from an external json file.
     */
    readAppRolesFromExternally() {
        let tmp = caf_rolesConfig['roles'];
        tmp.forEach((element: { roleId: any; workflows: any }) => {
            let roleId = element.roleId;
            this.appRoles[roleId] = element.workflows;
        });
    }

    getAppRoles() {
        return this.appRoles;
    }

    /**
     * Function: getNavigationFlowByRole()
     * Desc: This function will be invoke after login sucess from login page, which it will return the
     *          next page navigation url.
     * @param roleId
     */
    getNavigationFlowByRole(roleId: string | number) {
        let navigationFlowList = [];
        navigationFlowList = this.appRoles[roleId];
        return navigationFlowList[0].navigationUrl;
    }

    /**
     * Function: getActionsList
     * @param roleId
     * @param screen
     */
    getActionsListByRoleandScreen(roleId: string | number, screen: any) {
        let navigationFlowList = [];
        let actionsList: any;
        navigationFlowList = this.appRoles[roleId];
        navigationFlowList.forEach((element: { navigationUrl: any }) => {
            if (element.navigationUrl == screen) {
                actionsList = element;
            }
        });

        return actionsList;
    }

    /**
     * Function:getWorkFlowByRoleandScreen()
     * Desc: This function will be invoke from every individual component. It will return
     *       workflow of a particular role and based on screen.
     * @param roleId
     * @param screen ex:home,list
     */
    getWorkFlowByRoleandScreen(roleId: string | number, screen: any) {
        let navigationFlowList = [];
        let workFlow: any;
        navigationFlowList = this.appRoles[roleId];
        navigationFlowList.forEach((element: { navigationUrl: any; screen: any }) => {
            if (element.navigationUrl == screen || element.screen == screen) {
                workFlow = element;
            }
        });

        return workFlow;
    }
}
