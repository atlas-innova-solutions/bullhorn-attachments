import { environment } from '../../../environments/environment';

export const loginDetails: any = {
    project: 'setup',
    setup: {
        pagetitle: 'Setup Portal',
        imagename: 'logo-innova.png',
        url: environment.envServer + '/services/caf/v5/cases'
    },
    volt: {
        pagetitle: 'Volt',
        imagename: 'logo-volt.png'
    }
};
