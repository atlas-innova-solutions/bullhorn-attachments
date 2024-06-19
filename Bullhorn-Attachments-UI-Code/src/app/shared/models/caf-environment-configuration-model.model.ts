export class CAFEnvironmentConfigurationModel {
    private bhOdsServices: any;
    private staticServices: any;
    private readServices: any;
    private updateSerivices: any;
    private domainURL: any;
    private authServices: any;
    private odsCoreServices: any;
    private effectiveDatesServices: any;
    private workerSearchServices: any;
    private timeSetupServices: any;
    private appStaticProperties: any;
    private uierrormsgs: any;
    private setupApis: any;
    constructor(
        bhOdsServices: any,
        staticServices: any,
        readServices: any,
        updateSerivices: any,
        domainURL: any,
        authServices: any,
        odsCoreServices: any,
        effectiveDatesServices: any,
        workerSearchServices: any,
        timeSetupServices: any,
        appStaticProperties: any,
        uierrormsgs: any,
        setupApis: any
    ) {
        this.bhOdsServices = bhOdsServices;
        this.staticServices = staticServices;
        this.readServices = readServices;
        this.updateSerivices = updateSerivices;
        this.domainURL = domainURL;
        this.authServices = authServices;
        this.odsCoreServices = odsCoreServices;
        this.effectiveDatesServices = effectiveDatesServices;
        this.workerSearchServices = workerSearchServices;
        this.timeSetupServices = timeSetupServices;
        this.appStaticProperties = appStaticProperties;
        this.uierrormsgs = uierrormsgs;
        this.setupApis = setupApis;
    }
    getBhOdsServices(): any {
        return this.bhOdsServices;
    }

    getStaticServices(): any {
        return this.staticServices;
    }
    getReadServices(): any {
        return this.readServices;
    }
    getUpdateSerivices(): any {
        return this.updateSerivices;
    }

    getDomainURL(): any {
        return this.domainURL;
    }

    getAuthServices(): any {
        return this.authServices;
    }

    getOdsCoreServices(): any {
        return this.odsCoreServices;
    }

    getEffectiveDatesServices(): any {
        return this.effectiveDatesServices;
    }

    getWorkerSearchServices(): any {
        return this.workerSearchServices;
    }

    getTimeSetupServices(): any {
        return this.timeSetupServices;
    }

    getAppStaticProperties(): any {
        return this.appStaticProperties;
    }

    getUIerrormsgs(): any {
        return this.uierrormsgs;
    }
    getSetupApis(): any {
        return this.setupApis;
    }
}
