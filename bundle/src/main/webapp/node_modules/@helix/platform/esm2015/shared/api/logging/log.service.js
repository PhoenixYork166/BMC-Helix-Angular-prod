import { Injectable } from '@angular/core';
import { includes, intersection } from 'lodash';
import moment from 'moment-es6';
import { RxCurrentUserService } from '../user/current-user.service';
import { RX_LOG, LogCategory } from './log.types';
import * as i0 from "@angular/core";
import * as i1 from "../user/current-user.service";
const sessionLogCategoriesKey = 'RX_LOG_CATEGORIES';
// tslint:disable:no-console
export class RxLogService {
    constructor(rxCurrentUserService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.serverCategories = '';
        this.shouldLogEverything = false;
        try {
            const storedCategories = sessionStorage.getItem(sessionLogCategoriesKey);
            this.categories = storedCategories ? JSON.parse(storedCategories) : [];
        }
        catch (e) {
            this.categories = [];
        }
        this.configure(this.categories);
    }
    get logCategories() {
        return this.categories || [];
    }
    get serverLogCategories() {
        return this.serverCategories;
    }
    configure(categories) {
        this.shouldLogEverything = includes(categories, LogCategory.All);
        this.serverCategories = this.shouldLogEverything
            ? RX_LOG.serverLogCategories.join(',')
            : intersection(categories, RX_LOG.serverLogCategories).join(',');
        this.categories = this.shouldLogEverything ? [LogCategory.All] : categories;
        this.categories.length
            ? sessionStorage.setItem(sessionLogCategoriesKey, JSON.stringify(this.categories))
            : sessionStorage.removeItem(sessionLogCategoriesKey);
    }
    error(message) {
        console.error(this.prepareLogMessage(message, 'E'));
    }
    warning(message) {
        console.warn(this.prepareLogMessage(message, 'W'));
    }
    info(message) {
        if (this.shouldLogEverything || includes(this.logCategories, LogCategory.Cli)) {
            console.info(this.prepareLogMessage(message, 'I'));
        }
    }
    debug(message) {
        if (this.shouldLogEverything || includes(this.logCategories, LogCategory.Cli)) {
            console.debug(this.prepareLogMessage(message, 'D'));
        }
    }
    log(message) {
        if (this.logCategories.length) {
            console.log(message);
        }
    }
    // tslint:disable:no-trailing-whitespace
    prepareLogMessage(text, type) {
        const currentUser = this.rxCurrentUserService.get();
        return (`<CLI${type}> ` +
            '<TID: 0000000000> ' +
            '<RPC ID: 0000000000> ' +
            '<Queue:           > ' +
            `<USER: ${currentUser ? currentUser.loginName : ''}                                        > ` +
            '<Tenant-ID:                                             > ' +
            `<Overlay-Group: ${currentUser ? currentUser.defaultOverlayGroupId : ''}         > ` +
            `/* ${moment().format('ddd MMM DD YYYY HH:mm:ss.SSSS')} */ ${text}`);
    }
}
RxLogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLogService, deps: [{ token: i1.RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCurrentUserService }]; } });
//# sourceMappingURL=log.service.js.map