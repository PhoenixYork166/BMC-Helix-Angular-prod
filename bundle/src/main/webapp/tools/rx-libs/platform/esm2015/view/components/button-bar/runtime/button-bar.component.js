import { ChangeDetectorRef, Component, ElementRef, NgZone, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { BaseViewComponent, RuntimeViewCanvasItemComponent } from '@helix/platform/view/runtime';
import { get, isEmpty, isUndefined, last, throttle } from 'lodash';
import { merge, Subject, throwError } from 'rxjs';
import { ResizeSensor } from 'css-element-queries';
import { map, takeUntil } from 'rxjs/operators';
import { RxButtonBarService } from '../button-bar.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/runtime";
import * as i2 from "../button-bar.service";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "./components/button-bar-dropdown-item/button-bar-dropdown-item.component";
import * as i5 from "@angular/common";
export class ButtonBarComponent extends BaseViewComponent {
    constructor(elementRef, runtimeCanvasItemComponent, changeDetector, ngZone, rxButtonBarService, renderer) {
        super();
        this.elementRef = elementRef;
        this.runtimeCanvasItemComponent = runtimeCanvasItemComponent;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        this.rxButtonBarService = rxButtonBarService;
        this.renderer = renderer;
        this.api = {
            setProperty: this.setProperty.bind(this)
        };
        this.childLayouts = null;
        this.isDropdownVisible = false;
        this.resize$ = new Subject();
        this.onResizeThrottled = throttle(this.onResize.bind(this), 100);
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        this.config.pipe(takeUntil(this.destroyed$)).subscribe((config) => {
            this.isHidden = Boolean(config.hidden);
            this.alignClass = this.rxButtonBarService.getAlignClass(config.alignment);
        });
        this.childLayouts = get(this.runtimeCanvasItemComponent.getChildren(RX_VIEW_DEFINITION.defaultOutletName), '[0].children');
    }
    ngAfterViewInit() {
        const el = this.renderer.selectRootElement(this.elementRef.nativeElement, true);
        if (!isEmpty(this.childLayouts)) {
            const buttonConfigs = this.childLayouts.map((layout) => layout.config);
            this.ngZone.runOutsideAngular(() => {
                this.resizeSensor = new ResizeSensor(el, (size) => {
                    this.ngZone.run(() => this.resize$.next(size));
                });
            });
            merge(...buttonConfigs, this.resize$)
                .pipe(map((size) => size.width || el.offsetWidth), takeUntil(this.destroyed$))
                .subscribe((width) => this.onResizeThrottled(width));
        }
        this.onResize(el.offsetWidth);
        this.changeDetector.detectChanges();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.resizeSensor) {
            this.resizeSensor.detach();
        }
    }
    onResize(containerWidth) {
        let totalButtonsWidth = 0;
        const toggleButtonOffsetWidth = this.dropdownToggleButton
            ? this.renderer.selectRootElement(this.dropdownToggleButton.nativeElement, true).offsetWidth
            : 0;
        this.buttonItemsQueryList.forEach((item, index) => {
            totalButtonsWidth += this.renderer.selectRootElement(item.nativeElement, true).offsetWidth;
            const containerFitsButton = Math.floor(containerWidth) >= Math.ceil(totalButtonsWidth) + toggleButtonOffsetWidth;
            this.childLayouts[index].showInDropdown = !containerFitsButton;
            if (!isUndefined(this.childLayouts[index - 1]) &&
                this.childLayouts.filter((button) => button.showInDropdown).length < 2) {
                this.childLayouts[index - 1].showInDropdown = !containerFitsButton;
            }
        });
        this.isDropdownVisible = isEmpty(this.childLayouts) ? false : last(this.childLayouts).showInDropdown;
    }
    trackByFn(index, item) {
        return item.guid;
    }
    setProperty(propertyPath, propertyValue) {
        if (propertyPath === 'hidden') {
            this.isHidden = propertyValue;
            this.notifyPropertyChanged(propertyPath, this.isHidden);
        }
        else {
            return throwError(`Button Bar: property ${propertyPath} is not settable.`);
        }
    }
}
ButtonBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarComponent, deps: [{ token: i0.ElementRef }, { token: i1.RuntimeViewCanvasItemComponent }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i2.RxButtonBarService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ButtonBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ButtonBarComponent, selector: "rx-button-bar", viewQueries: [{ propertyName: "dropdownToggleButton", first: true, predicate: ["dropdownToggle"], descendants: true, read: ElementRef }, { propertyName: "buttonItemsQueryList", predicate: ["buttonItems"], descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"button-container\" [ngClass]=\"alignClass\" *ngIf=\"childLayouts && !isHidden\">\n  <div\n    *ngFor=\"let buttonLayout of childLayouts; trackBy: trackByFn\"\n    [ngClass]=\"{ 'nav-item--hidden': buttonLayout.showInDropdown }\"\n  >\n    <rx-runtime-view-canvas-item #buttonItems [layout]=\"buttonLayout\"></rx-runtime-view-canvas-item>\n  </div>\n\n  <div\n    *ngIf=\"isDropdownVisible\"\n    class=\"dropdown\"\n    adaptDropdown\n    [placement]=\"['bottom-right', 'bottom-left', 'bottom', 'top-right', 'top-left', 'top', 'auto']\"\n  >\n    <button\n      class=\"btn btn-secondary rx-toggle\"\n      [attr.id]=\"'rx-' + guid\"\n      type=\"button\"\n      adaptDropdownToggle\n      #dropdownToggle\n    ></button>\n    <div class=\"dropdown-menu\" [attr.aria-labelledby]=\"'rx-' + guid\" adaptDropdownMenu>\n      <ng-container *ngFor=\"let buttonLayout of childLayouts; trackBy: trackByFn\">\n        <rx-button-bar-dropdown-item-component\n          *ngIf=\"buttonLayout.showInDropdown\"\n          [config]=\"buttonLayout.config\"\n          [runtimeViewModelApi]=\"buttonLayout.runtimeViewModelApi\"\n          [guid]=\"buttonLayout.guid\"\n        ></rx-button-bar-dropdown-item-component>\n      </ng-container>\n    </div>\n  </div>\n</div>\n", styles: [":host{display:block}.button-container{display:flex}.button-container.align-center{justify-content:center}.button-container.align-right{justify-content:flex-end}.button-container.align-left{justify-content:flex-start}.button-container rx-runtime-view-canvas-item{display:inline-block}.button-container rx-runtime-view-canvas-item:not(:has(> [hidden])){padding-right:5px}.rx-toggle{padding-left:1px;height:100%}\n"], components: [{ type: i1.RuntimeViewCanvasItemComponent, selector: "rx-runtime-view-canvas-item", inputs: ["layout"] }, { type: i3.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i4.ButtonBarDropdownItemComponent, selector: "rx-button-bar-dropdown-item-component", inputs: ["guid", "config", "runtimeViewModelApi"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i3.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-button-bar',
                    templateUrl: './button-bar.component.html',
                    styleUrls: ['./button-bar.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.RuntimeViewCanvasItemComponent }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i2.RxButtonBarService }, { type: i0.Renderer2 }]; }, propDecorators: { buttonItemsQueryList: [{
                type: ViewChildren,
                args: ['buttonItems', { read: ElementRef }]
            }], dropdownToggleButton: [{
                type: ViewChild,
                args: ['dropdownToggle', { read: ElementRef }]
            }] } });
//# sourceMappingURL=button-bar.component.js.map