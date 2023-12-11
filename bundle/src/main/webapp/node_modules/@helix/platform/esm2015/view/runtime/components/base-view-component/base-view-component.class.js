import { Directive, EventEmitter, HostBinding, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { VIEW_COMPONENT_DEFAULT_EVENT_NAME } from '../../event-manager/view-component-event-manager.constant';
import { pluck, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
// tslint:disable-next-line:directive-class-suffix
export class BaseViewComponent {
    constructor() {
        this.customCssClasses = '';
        this.autoFill = new EventEmitter();
        this.autoScroll = new EventEmitter();
        this.hidden = new EventEmitter();
        this.isComponentHidden = false;
        this.destroyed$ = new ReplaySubject(1);
        this.propertyChanged = new EventEmitter();
    }
    get isHidden() {
        return this.isComponentHidden;
    }
    set isHidden(value) {
        this.hidden.emit(value);
        this.isComponentHidden = Boolean(value);
    }
    ngOnInit() {
        this.config.pipe(pluck('styles'), takeUntil(this.destroyed$)).subscribe((styles) => {
            this.customCssClasses = styles || '';
            this.autoFill.emit(this.customCssClasses.includes('rx-auto-fill'));
            this.autoScroll.emit(this.customCssClasses.includes('rx-auto-scroll'));
        });
    }
    notifyPropertyChanged(propertyName, newValue, oldValue) {
        this.propertyChanged.next({
            guid: this.guid,
            propertyName,
            newValue,
            oldValue
        });
    }
    triggerViewActions(guid = this.guid, viewActionTriggerEventName = VIEW_COMPONENT_DEFAULT_EVENT_NAME) {
        return this.runtimeViewModelApi.triggerViewActions(guid, viewActionTriggerEventName);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
BaseViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BaseViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BaseViewComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: BaseViewComponent, outputs: { autoFill: "autoFill", autoScroll: "autoScroll", hidden: "hidden" }, host: { properties: { "attr.rx-view-component-id": "this.guid", "class": "this.customCssClasses", "hidden": "this.isHidden" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BaseViewComponent, decorators: [{
            type: Directive
        }], propDecorators: { guid: [{
                type: HostBinding,
                args: ['attr.rx-view-component-id']
            }], customCssClasses: [{
                type: HostBinding,
                args: ['class']
            }], autoFill: [{
                type: Output
            }], autoScroll: [{
                type: Output
            }], hidden: [{
                type: Output
            }], isHidden: [{
                type: HostBinding,
                args: ['hidden']
            }] } });
//# sourceMappingURL=base-view-component.class.js.map