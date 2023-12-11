import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AdaptTranslateService } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { findKey, some } from 'lodash';
import moment from 'moment-es6';
import { of } from 'rxjs';
import { filter, map, mapTo, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { RxCurrentUserService } from '../user/current-user.service';
import { RX_DEFAULT_STRINGS } from './localization.types';
import { RxRssoDebugService } from '../dev/rsso-debug.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@ngx-translate/core";
import * as i3 from "../user/current-user.service";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "../dev/rsso-debug.service";
const SUPPORTED_LOCALES = {
    de: { adapt: 'de-de' },
    en: { adapt: 'en-us' },
    es: { adapt: 'es-es' },
    fr: { adapt: 'fr-fr' },
    it: { adapt: 'it-it' },
    ja: { adapt: 'ja-jp' },
    ko: { adapt: 'ko-kr' },
    nl: { adapt: 'nl-nl' },
    pt: { adapt: 'pt-br' },
    ru: { adapt: 'ru-ru' },
    sv: { adapt: 'sv-se' },
    da: { adapt: 'da-dk' },
    no: { moment: 'nb', angular: 'nb', adapt: 'no-no', similar: ['nb', 'nn'] },
    'zh-Hans': { moment: 'zh-CN', adapt: 'zh-cn', similar: ['zh-CN'] }
};
const LOGIN_LOCALE = 'login';
const DEFAULT_LOCALE = 'en';
export class RxLocalizationService {
    constructor(httpClient, translateService, rxCurrentUserService, adaptTranslateService, rxRssoDebugService, document, defaultStrings) {
        this.httpClient = httpClient;
        this.translateService = translateService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.adaptTranslateService = adaptTranslateService;
        this.rxRssoDebugService = rxRssoDebugService;
        this.document = document;
        this.defaultStrings = defaultStrings;
        this.currentLocale = DEFAULT_LOCALE;
        this.angularLocale = DEFAULT_LOCALE;
        this.onTranslationsLoaded$ = this.translateService.onLangChange.pipe(shareReplay(1));
        this.loginLocalizedStrings$ = this.getLocalizedStringsForLoginPage().pipe(shareReplay(1));
        this.preferredLocale$ = this.rxCurrentUserService.user$.pipe(filter(Boolean), take(1), map(() => this.rxCurrentUserService.getPreferredLocale() || this.rxCurrentUserService.getPreferredUserLocale()), switchMap((preferredLocale) => preferredLocale
            ? of(preferredLocale)
            : this.loginLocalizedStrings$.pipe(map((response) => Object.keys(response.body)[0]))), map((locale) => this.normalizeLocale(locale)), shareReplay(1));
    }
    getDefaultApplicationStrings() {
        return this.defaultStrings;
    }
    setDefaultApplicationStrings(defaultApplicationStrings) {
        this.defaultStrings = Object.assign(Object.assign({}, this.defaultStrings), defaultApplicationStrings);
    }
    initLoginTranslations() {
        return this.loginLocalizedStrings$.pipe(map((response) => response.body), tap((payload) => {
            const localeKey = Object.keys(payload)[0];
            this.setLocale(this.normalizeLocale(localeKey));
            this.translateService.setTranslation(LOGIN_LOCALE, payload[localeKey], true);
        }), switchMap(() => this.translateService.use(LOGIN_LOCALE)));
    }
    initTranslations(useDefault = false) {
        return (useDefault ? of(DEFAULT_LOCALE) : this.preferredLocale$).pipe(switchMap((locale) => this.translateService.use(locale).pipe(mapTo(locale))), tap((locale) => {
            this.setLocale(locale);
            const adaptLocale = this.getCurrentLocaleDescriptor().adapt;
            Object.assign(this.adaptTranslateService.languages[adaptLocale], {
                'adapt.rx.error.min': this.translateService.instant('com.bmc.arsys.rx.client.error.min'),
                'adapt.rx.error.max': this.translateService.instant('com.bmc.arsys.rx.client.error.max'),
                'adapt.rx.error.required': this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message'),
                'adapt.select.emptyStateDescription': ''
            });
        }));
    }
    setLocale(locale) {
        this.currentLocale = locale;
        this.setDocumentLang(this.currentLocale);
        const descriptor = this.getCurrentLocaleDescriptor();
        this.adaptTranslateService.useLanguage(descriptor.adapt);
        moment.locale(descriptor.moment);
        this.angularLocale = descriptor.angular;
    }
    getCurrentLocaleDescriptor() {
        const locale = findKey(SUPPORTED_LOCALES, (localeInfo, key) => {
            const language = this.currentLocale.split('-')[0];
            return (key === this.currentLocale ||
                key === language ||
                some(localeInfo.similar, (item) => item === this.currentLocale || item === language));
        });
        return {
            angular: locale ? SUPPORTED_LOCALES[locale].angular || locale : DEFAULT_LOCALE,
            moment: (SUPPORTED_LOCALES[locale] && SUPPORTED_LOCALES[locale].moment) || this.currentLocale,
            adapt: (SUPPORTED_LOCALES[locale] && SUPPORTED_LOCALES[locale].adapt) || SUPPORTED_LOCALES[DEFAULT_LOCALE].adapt
        };
    }
    getLocalizedStringsForLoginPage() {
        // When debugging on an RSSO environment, this (/api/rx/application/logincontent/login.json) call fails
        // repeatedly with a http 401 error,so we have bypassed it. This call is only useful for the Innovation
        // Studio login page which is not accessed in RSSO environment.
        return this.rxRssoDebugService.isRssoDebugEnabled()
            ? of()
            : this.httpClient.get('/api/rx/application/logincontent/login.json', {
                observe: 'response'
            });
    }
    setDocumentLang(lang) {
        this.document.documentElement.setAttribute('lang', lang);
    }
    // Safari returns the web browser locale information Region in lowercase
    // en-us instead of en-US which causes issues with localized field.
    normalizeLocale(locale) {
        const localeInformation = locale.split('-');
        if (localeInformation.length > 1) {
            localeInformation[1] = localeInformation[1].toUpperCase();
        }
        return localeInformation.join('-');
    }
}
RxLocalizationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationService, deps: [{ token: i1.HttpClient }, { token: i2.TranslateService }, { token: i3.RxCurrentUserService }, { token: i4.AdaptTranslateService }, { token: i5.RxRssoDebugService }, { token: DOCUMENT }, { token: RX_DEFAULT_STRINGS }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocalizationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.TranslateService }, { type: i3.RxCurrentUserService }, { type: i4.AdaptTranslateService }, { type: i5.RxRssoDebugService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [RX_DEFAULT_STRINGS]
                }] }]; } });
//# sourceMappingURL=localization.service.js.map