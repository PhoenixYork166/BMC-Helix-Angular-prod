import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class RxCurrentUserService {
    constructor() {
        this.userSubject$ = new BehaviorSubject(null);
        this.user$ = this.userSubject$.asObservable().pipe(shareReplay(1));
    }
    getPreferredLocale() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.preferredLocale) !== null && _b !== void 0 ? _b : '';
    }
    getPreferredUserLocale() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.preferredUserLocale) !== null && _b !== void 0 ? _b : '';
    }
    getName() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.loginName) !== null && _b !== void 0 ? _b : '';
    }
    set(user) {
        this.userSubject$.next(user);
    }
    get() {
        return this.userSubject$.getValue();
    }
    isBusinessAnalyst() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.isBusinessAnalyst) !== null && _b !== void 0 ? _b : false;
    }
    isAdministrator() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.isAdministrator) !== null && _b !== void 0 ? _b : false;
    }
    getEditableBundles() {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.editableBundles) || [];
    }
    isSupportStaff() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.supportStaff) !== null && _b !== void 0 ? _b : false;
    }
    isAvailableForAssignment() {
        var _a, _b;
        return (_b = (_a = this.get()) === null || _a === void 0 ? void 0 : _a.assignmentAvailable) !== null && _b !== void 0 ? _b : false;
    }
    setAssignmentAvailability(assignmentAvailable) {
        const user = this.get();
        if (user) {
            user.assignmentAvailable = assignmentAvailable;
        }
    }
}
RxCurrentUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCurrentUserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxCurrentUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCurrentUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCurrentUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=current-user.service.js.map