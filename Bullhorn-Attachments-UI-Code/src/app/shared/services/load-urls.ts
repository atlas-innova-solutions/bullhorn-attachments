import { map } from 'rxjs';
import { CafEnvironmentConfigurationService } from './caf-environment-configuration.service';
import { ProxyUrlObj } from '../utils/proxy-urls.constant';
import { LocalStorageVariables } from '../utils/local-storage-variable';
import { LoadMsalConfigService } from './msal-config.service';
export let proxyUrls: ProxyUrlObj;
export function initSynchronousFactory(cafEnvironmentConfigurationService: CafEnvironmentConfigurationService, msalConfigService: LoadMsalConfigService) {
    return () => {
        return cafEnvironmentConfigurationService.getServerConfig().pipe(
            map((res) => {
                localStorage.setItem(LocalStorageVariables.ProxyUrls, JSON.stringify(res));
                setProxyUrls(res);
                msalConfigService.getMsalConfig(proxyUrls.appStaticProperties);
                msalConfigService.getMsalVoltConfig(proxyUrls.appStaticProperties);
                //msalConfigService.loadMsalConfigurations(config, configv);
            })
        );
    };
}

export function setProxyUrls(urls: ProxyUrlObj) {
    proxyUrls = urls;
}
