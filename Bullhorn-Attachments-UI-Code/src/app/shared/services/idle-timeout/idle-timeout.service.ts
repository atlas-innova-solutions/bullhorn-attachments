import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TimerMessage } from '../../utils/error-messages.constant';
import { LocalStorageVariables } from '../../utils/local-storage-variable';
import { CoreModulesUrl } from '../../utils/page-navigation-url';
import { SharedService } from '../shared-service/shared.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { SetupDataService } from '../data-service/setup-data.service';

@Injectable({
    providedIn: 'root'
})
export class IdleTimeoutService {
    idleState = TimerMessage.NotStarted;
    timedOut = false;
    lastPing?: Date;
    currentUser: any;

    constructor(
        private idle: Idle,
        private keepalive: Keepalive,
        private router: Router,
        private setupDataService: SetupDataService,
        private sharedGlobalService: SharedService
    ) {
        this.idleTimeLogOut();
    }
    idleTimeLogOut(elementRef?: ElementRef) {
        console.log(TimerMessage.IAmStarted);
        this.idle.setIdle(1800);
        this.idle.setTimeout(20);
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.idle.onIdleEnd.subscribe(() => {
            this.idleState = TimerMessage.NoLongerIdle;
            console.log(this.idleState);
            this.reset();
        });

        this.idle.onTimeout.subscribe(() => {
            this.sharedGlobalService.setIdleTimeFlgService(false);
            this.idleState = TimerMessage.TimeOut;
            this.currentUser = JSON.parse(sessionStorage.getItem(LocalStorageVariables.currentUser) || '{}');
            this.setupDataService.logout(this.currentUser.appUserName).subscribe((response: any) => {
              sessionStorage.removeItem(LocalStorageVariables.currentUser);
              localStorage.clear();
            });
            this.timedOut = true;
            this.router.navigate([CoreModulesUrl.Login]);
        });

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = TimerMessage.YouHaveGoneIdle;
            this.sharedGlobalService.setIdleTimeFlgService(true);
        });
        this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = TimerMessage.TimeOutAlert(countdown);
            console.log(this.idleState);
        });
        this.keepalive.interval(5);

        this.keepalive.onPing.subscribe(() => (this.lastPing = new Date()));
    }

    idleWatch() {
        this.idle.watch();
        this.timedOut = false;
    }
    idleStop() {
        this.idle.stop();
    }
    reset() {
        this.idle.watch();
        this.timedOut = false;
    }
    cancelTimer(casesTimer: any, workerSearchtimer: any) {
        clearTimeout(casesTimer);
        clearInterval(casesTimer);

        clearTimeout(workerSearchtimer);
        clearInterval(workerSearchtimer);
    }
}
