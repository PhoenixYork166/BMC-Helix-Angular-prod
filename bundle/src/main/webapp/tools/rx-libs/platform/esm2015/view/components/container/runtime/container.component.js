import { Component, ElementRef, Renderer2 } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { takeUntil } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/runtime";
export class ContainerComponent extends BaseViewComponent {
    constructor(elementRef, renderer) {
        super();
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.state = {};
        this.api = {
            setProperty: this.setProperty.bind(this)
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        this.config.pipe(takeUntil(this.destroyed$)).subscribe((config) => {
            this.isHidden = Boolean(config.hidden);
            this.state = Object.assign({}, config);
        });
    }
    setProperty(propertyPath, propertyValue) {
        if (propertyPath === 'hidden') {
            this.state.hidden = propertyValue;
            this.notifyPropertyChanged(propertyPath, propertyValue);
        }
        else {
            const componentName = this.renderer.selectRootElement(this.elementRef.nativeElement, true).tagName.toLowerCase();
            return throwError(`${componentName}: property ${propertyPath} is not settable.`);
        }
    }
}
ContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContainerComponent, selector: "rx-container", usesInheritance: true, ngImport: i0, template: "<rx-runtime-view-canvas-outlet [hidden]=\"state.hidden\"></rx-runtime-view-canvas-outlet>\n", styles: [":host{display:block}:host.rx-auto-fill::ng-deep>rx-runtime-view-canvas-outlet>rx-runtime-view-canvas-item-container{display:flex;flex-direction:column;height:100%}\n"], components: [{ type: i1.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-container',
                    templateUrl: './container.component.html',
                    styleUrls: ['./container.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; } });
//# sourceMappingURL=container.component.js.map