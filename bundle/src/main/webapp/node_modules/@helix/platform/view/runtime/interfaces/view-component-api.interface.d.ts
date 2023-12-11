import { Observable } from 'rxjs';
export interface IViewComponentSave {
    save: (closeViewAfterSave?: boolean) => Observable<never>;
}
export interface IViewComponentIsDirty {
    isDirty: () => boolean | Observable<boolean>;
}
export interface IViewComponentIsValid {
    isValid: () => boolean;
}
export interface IViewComponentRefresh {
    refresh: () => Observable<never>;
}
export interface IViewComponentSetProperty {
    setProperty: (propertyPath: string, value: any) => void | Observable<never>;
}
