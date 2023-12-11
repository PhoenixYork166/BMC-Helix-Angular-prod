import { EventEmitter } from '@angular/core';
import { IBreadcrumbItem } from './breadcrumb-bar.interface';
import * as i0 from "@angular/core";
export declare class RxBreadcrumbBarComponent {
    items: IBreadcrumbItem[];
    selectedItem: EventEmitter<IBreadcrumbItem>;
    onSelectItem(item: IBreadcrumbItem): void;
    trackByFn(index: number, item: IBreadcrumbItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBreadcrumbBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxBreadcrumbBarComponent, "rx-breadcrumb-bar", never, { "items": "items"; }, { "selectedItem": "selectedItem"; }, never, never>;
}
