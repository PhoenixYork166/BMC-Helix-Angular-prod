import { Component, Input } from '@angular/core';
import { NEVER } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RxBusyIndicatorComponent {
    constructor() {
        this.defaultSubscription = NEVER.subscribe();
        this.defaultOptions = {
            busy: this.defaultSubscription,
            backdrop: true,
            message: '',
            minDuration: 0,
            delay: 0,
            loaderType: 'section'
        };
        this.config = this.defaultOptions;
    }
    ngOnInit() {
        this.updateConfig();
    }
    ngOnChanges(changes) {
        if (changes.options && !changes.options.firstChange) {
            this.updateConfig();
        }
    }
    ngOnDestroy() {
        this.defaultSubscription.unsubscribe();
    }
    updateConfig() {
        this.config = Object.assign(Object.assign({}, this.defaultOptions), this.options);
    }
}
RxBusyIndicatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxBusyIndicatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: { options: "options" }, usesOnChanges: true, ngImport: i0, template: "<span [ngBusy]=\"config\"></span>\n", directives: [{ type: i1.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-busy-indicator',
                    templateUrl: './busy-indicator.component.html'
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=busy-indicator.component.js.map