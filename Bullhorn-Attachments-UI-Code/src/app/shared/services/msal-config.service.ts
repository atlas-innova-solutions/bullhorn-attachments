declare function onLoad(getMsalConfig: any, isTokenrefreshReq: any): any;
import { Injectable } from '@angular/core';
import { LocalStorageVariables } from '../utils/local-storage-variable';
@Injectable({
    providedIn: 'root'
})
export class LoadMsalConfigService {
    msalConfigs: any = {};
    msalVoltConfigs: any = {};
    constructor() {}

    getMsalConfig(appConfig: any) {
        this.msalConfigs = {
            msalConfig: {
                auth: {
                    clientId: appConfig.clientIdInnova,
                    authority: appConfig.authorityInnova
                },
                cache: {
                    cacheLocation: appConfig.cacheLocation,
                    storeAuthStateInCookie: appConfig.storeAuthStateInCookie
                }
            },
            graphConfig: {
                graphMeEndpoint: appConfig.graphMeEndpoint
            },
            requestObj: {
                scopes: this.converStringIntoArray(appConfig.scopes)
            },
            requestObjForApi: {
                scopes: this.converStringIntoArray(appConfig.backendScopesInnova)
            }
        };
        sessionStorage.setItem(LocalStorageVariables.MsalConfigData, JSON.stringify(this.msalConfigs));
        return this.msalConfigs;
    }
    getMsalVoltConfig(appConfig: any) {
        this.msalVoltConfigs = {
            msalConfig: {
                auth: {
                    clientId: appConfig.clientIdVolt,
                    authority: appConfig.authorityVolt
                },
                cache: {
                    cacheLocation: appConfig.cacheLocation,
                    storeAuthStateInCookie: appConfig.storeAuthStateInCookie
                }
            },
            graphConfig: {
                graphMeEndpoint: appConfig.graphMeEndpoint
            },
            requestObj: {
                scopes: this.converStringIntoArray(appConfig.scopes)
            },
            requestObjForApi: {
                scopes: this.converStringIntoArray(appConfig.backendScopesVolt)
            }
        };
        sessionStorage.setItem(LocalStorageVariables.MsalConfigVoltData, JSON.stringify(this.msalVoltConfigs));
        return this.msalVoltConfigs;
    }

    getInnovaConfig() {
        return this.msalConfigs;
    }
    getVoltConfig() {
        return this.msalVoltConfigs;
    }

    loadMsalConfigurations(config: any) {
        onLoad(config, false);
        const msalConfigData = JSON.stringify(config);
        sessionStorage.setItem('savedMsalConfig', msalConfigData);
    }

    converStringIntoArray(arrayString: any) {
        arrayString = arrayString.replace(/'/g, '"');
        const parsedArray = JSON.parse(arrayString);
        return parsedArray;
    }
}
