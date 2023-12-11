/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @description Represents the version of Angular
 *
 * @publicApi
 */
export class Version {
    constructor(full) {
        this.full = full;
        this.major = full.split('.')[0];
        this.minor = full.split('.')[1];
        this.patch = full.split('.').slice(2).join('.');
    }
}

/**
 * @publicApi
 */
export const ADAPT_CSS_VERSION = new Version('0.0.0-ADAPT-VERSION-PLACEHOLDER');
