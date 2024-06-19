import { ProxyUrlObj } from './../utils/proxy-urls.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CAFEnvironmentConfigurationModel } from '../models/caf-environment-configuration-model.model';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class CafEnvironmentConfigurationService {
    private cafEnviromentConfigurationModel!: CAFEnvironmentConfigurationModel;

    // cafEnviromentConfigurationModel: any;

    constructor(private http: HttpClient) {}

    getEnvServerConfigDetails() {
        this.getServerConfigDetails().subscribe(
            (data: any) => {
                let proxyServiceObj = {};
                if (data.json()) {
                    proxyServiceObj = data.json();
                }
            },
            (err: any) => {
                alert('It seems might be network issue.Please refresh application.');
            }
        );
    }
    getServerConfigDetails(): any {
        // let proxyServerName=(location.pathname && location.pathname!="/login")?location.pathname:"https://oci-sitcapportal.acsicorp.com/CAFPortal/";
        //  http://192.168.200.191:8780/CAFPortal/
        // https://oci-sitcapportal.acsicorp.com/CAFPortal/
        //  https://10.118.70.65:9347/CAFPortal/
        return this.http.get('https://ol-npsitsetupportalftr.innovasolutions.com:32000/SETUP/proxyurl');
        // return this.http.get("https://qacapportal.acsicorp.com:9143/CAFPortal/proxyurl").pipe(retry(2));
        //  return this.http.get(proxyServerName+"proxyurl");
        //.pipe(retry(2));
    }

    setDataIntoServiceObjs(proxyServiceObj: any) {
        this.cafEnviromentConfigurationModel = new CAFEnvironmentConfigurationModel(
            proxyServiceObj['bhOdsServices'],
            proxyServiceObj['staticServices'],
            proxyServiceObj['readServices'],
            proxyServiceObj['updateSerivices'],
            proxyServiceObj['domainURL'],
            proxyServiceObj['authServices'],
            proxyServiceObj['odsCoreServices'],
            proxyServiceObj['effectiveDatesServices'],
            proxyServiceObj['workerSearchServices'],
            proxyServiceObj['timeSetupServices'],
            proxyServiceObj['appStaticProperties'],
            proxyServiceObj['uiErrorMessages'],
            proxyServiceObj['setupApis']
        );

        return this.cafEnviromentConfigurationModel;
    }
    // new method for proxy url

    getServerConfig() {
        return this.http.get<any>("https://ol-npsitsetupportalftr.innovasolutions.com:32000/SETUP/proxyurl");
    }
}
