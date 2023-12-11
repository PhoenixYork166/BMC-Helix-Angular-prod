import * as i0 from '@angular/core';
import { Injectable, Pipe, NgModule } from '@angular/core';
import { of, forkJoin, Subject, BehaviorSubject, from, throwError } from 'rxjs';
import * as i1 from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import * as i2 from '@helix/platform/shared/api';
import { RX_BUNDLE, DataPage, RxLogService, RxLocalizationService, RX_ERROR_HANDLING, RX_OVERLAY } from '@helix/platform/shared/api';
import { tap, map as map$1, shareReplay, catchError, switchMap } from 'rxjs/operators';
import { map, assign, range, cloneDeep, mapValues, reduce, get, defaults, size, castArray, fromPairs, isEmpty, isNil, isNaN, isFinite as isFinite$1, isString, includes, toNumber, find, isUndefined, set, isNull, forEach, some, forOwn, transform, isEqual, filter, has, trim, isNumber, remove, values, groupBy, pick, sortBy, inRange } from 'lodash';
import * as i3 from '@helix/platform/utils';
import { RxStringService, RxNumberUtilsService } from '@helix/platform/utils';
import * as i1$1 from '@helix/platform/association/api';
import { saveAs } from 'file-saver';
import BigNumber from 'bignumber.js';
import * as i2$1 from '@helix/platform/ui-kit';
import * as i1$2 from '@ngx-translate/core';

// LMA:: This Service is necessary to override the default UploaderService from
// the Adapt Uploader Component.
class UploaderService {
    deleteFile(file, url) {
        return of(null);
    }
    responseCallback(response) { }
    sendChunk(requestBody, uploadAsOneChunk, url) {
        return undefined;
    }
    sendFile(file) {
        return of(null);
    }
}
UploaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UploaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const coreFieldIds = {
    displayId: 1,
    createdBy: 2,
    createdDate: 3,
    assignee: 4,
    modifiedBy: 5,
    modifiedDate: 6,
    status: 7,
    description: 8,
    notifierListening: 16,
    id: 379
};
const specialFieldIds = {
    dataProviderId: 380
};
const resourceTypes = {
    character: 'com.bmc.arsys.rx.standardlib.record.CharacterFieldDefinition',
    localizedCharacter: 'com.bmc.arsys.rx.standardlib.record.LocalizedCharacterFieldDefinition',
    dateTime: 'com.bmc.arsys.rx.standardlib.record.DateTimeFieldDefinition',
    selection: 'com.bmc.arsys.rx.standardlib.record.SelectionFieldDefinition',
    integer: 'com.bmc.arsys.rx.standardlib.record.IntegerFieldDefinition',
    decimal: 'com.bmc.arsys.rx.standardlib.record.DecimalFieldDefinition',
    real: 'com.bmc.arsys.rx.standardlib.record.RealFieldDefinition',
    timeOnly: 'com.bmc.arsys.rx.standardlib.record.TimeOnlyFieldDefinition',
    dateOnly: 'com.bmc.arsys.rx.standardlib.record.DateOnlyFieldDefinition',
    attachment: 'com.bmc.arsys.rx.standardlib.record.AttachmentFieldDefinition',
    boolean: 'com.bmc.arsys.rx.standardlib.record.BooleanFieldDefinition',
    recordInstance: 'com.bmc.arsys.rx.services.process.domain.record.RecordInstanceFieldDefinition',
    object: 'com.bmc.arsys.rx.services.process.domain.record.ObjectFieldDefinition',
    recordInstanceProcessVariable: 'com.bmc.arsys.rx.services.record.domain.RecordInstance',
    localizedFieldInstance: 'com.bmc.arsys.rx.services.record.domain.LocalizedFieldInstance',
    list: 'com.bmc.arsys.rx.standardlib.record.ListFieldDefinition'
};
const resourceTypesByFullName = Object.keys(resourceTypes).reduce((currentValue, resourceType) => {
    currentValue[resourceTypes[resourceType]] = resourceType;
    return currentValue;
}, {});
const validBundleIdRegExpString = '[a-zA-Z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)*(\\.([a-zA-Z0-9_]+|[a-zA-Z0-9_][a-zA-Z0-9_-]*[a-zA-Z0-9_]))';
const validDefinitionNameRegExpString = `[
  'A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A

  'a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A

  '\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC

  0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19

  \x20\xA0\u1680\u2000-\u200A\u202F\u205F\u3000

  \\x2D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D

  \x5F\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F
  ]*`;
var RecordFieldOption;
(function (RecordFieldOption) {
    RecordFieldOption["System"] = "SYSTEM";
    RecordFieldOption["Required"] = "REQUIRED";
    RecordFieldOption["Optional"] = "OPTIONAL";
})(RecordFieldOption || (RecordFieldOption = {}));
const fieldOptions = {
    system: RecordFieldOption.System,
    required: RecordFieldOption.Required,
    optional: RecordFieldOption.Optional
};
const coreDisplayIdField = {
    resourceType: resourceTypes.character,
    name: 'Display ID',
    description: null,
    id: coreFieldIds.displayId,
    fieldOption: RecordFieldOption.System,
    maxLength: 15,
    defaultValue: null,
    anyUserAllowedToSubmit: false,
    allowPermissionsOverlay: false,
    allowOtherPropertiesOverlay: false
};
const coreIdField = {
    resourceType: resourceTypes.character,
    name: 'ID',
    description: null,
    id: coreFieldIds.id,
    fieldOption: RecordFieldOption.System,
    maxLength: 128,
    defaultValue: null,
    anyUserAllowedToSubmit: true,
    allowPermissionsOverlay: false,
    allowOtherPropertiesOverlay: false
};
const joinFieldMapping = 'com.bmc.arsys.rx.services.record.domain.JoinRecordDefinitionFieldMapping';
const externalFieldMapping = 'com.bmc.arsys.rx.services.record.domain.ExternalRecordDefinitionFieldMapping';
const sourceRecordTypes = {
    primary: 'PRIMARY_RECORD_DEFINITION',
    secondary: 'SECONDARY_RECORD_DEFINITION'
};
const joinRecordDefinitionCoreFields = map([coreDisplayIdField, coreIdField], (coreField) => assign({}, coreField, {
    maxLength: 255,
    fieldMapping: {
        resourceType: joinFieldMapping,
        sourceFieldId: coreField.id,
        source: sourceRecordTypes.primary
    }
}));
const maxReservedFieldId = 536870912;
const RX_RECORD_DEFINITION = {
    coreFieldIds,
    specialFieldIds,
    alwaysRequiredNonSystemFieldIds: [coreFieldIds.createdBy, coreFieldIds.status, coreFieldIds.description],
    AR_AUDIT_FIELD_IDS: range(450, 465),
    AR_MAX_RESERVED_FIELD_ID: maxReservedFieldId,
    AR_MIN_CUSTOM_FIELD_ID: maxReservedFieldId + 1,
    AR_CORE_FIELD_IDS: range(1, 50).concat(range(71, 100)).concat([coreFieldIds.id, 399]),
    keyFieldIds: [coreFieldIds.displayId, coreFieldIds.id],
    coreFields: [
        coreDisplayIdField,
        {
            resourceType: resourceTypes.character,
            name: 'Created By',
            description: null,
            id: coreFieldIds.createdBy,
            fieldOption: fieldOptions.required,
            maxLength: 254,
            defaultValue: '$USER$',
            anyUserAllowedToSubmit: true,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        {
            resourceType: resourceTypes.dateTime,
            name: 'Created Date',
            description: null,
            id: coreFieldIds.createdDate,
            fieldOption: fieldOptions.system,
            defaultValue: null,
            anyUserAllowedToSubmit: false,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        {
            resourceType: resourceTypes.character,
            name: 'Assignee',
            description: null,
            id: coreFieldIds.assignee,
            fieldOption: fieldOptions.optional,
            maxLength: 254,
            defaultValue: null,
            anyUserAllowedToSubmit: false,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        {
            resourceType: resourceTypes.character,
            name: 'Modified By',
            description: null,
            id: coreFieldIds.modifiedBy,
            fieldOption: fieldOptions.system,
            maxLength: 254,
            defaultValue: null,
            anyUserAllowedToSubmit: false,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        {
            resourceType: resourceTypes.dateTime,
            name: 'Modified Date',
            description: null,
            id: coreFieldIds.modifiedDate,
            fieldOption: fieldOptions.system,
            defaultValue: null,
            anyUserAllowedToSubmit: false,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        {
            resourceType: resourceTypes.selection,
            name: 'Status',
            description: null,
            id: coreFieldIds.status,
            fieldOption: fieldOptions.required,
            optionNamesById: {
                0: 'New',
                1: 'Assigned',
                2: 'Fixed',
                3: 'Rejected',
                4: 'Closed'
            },
            displayType: null,
            defaultValue: 0,
            anyUserAllowedToSubmit: false,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        {
            resourceType: resourceTypes.character,
            name: 'Description',
            description: null,
            id: coreFieldIds.description,
            fieldOption: fieldOptions.required,
            maxLength: 254,
            defaultValue: null,
            anyUserAllowedToSubmit: true,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        {
            resourceType: resourceTypes.selection,
            name: 'Notifier Listening',
            description: null,
            id: coreFieldIds.notifierListening,
            fieldOption: fieldOptions.system,
            optionNamesById: {
                0: 'Not Listening',
                1: 'Listening'
            },
            displayType: null,
            defaultValue: 0,
            anyUserAllowedToSubmit: false,
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false
        },
        coreIdField
    ],
    sortableCharacterFieldMaxLength: 4000,
    fieldOptions,
    resourceTypes,
    resourceTypesByFullName,
    dataTypes: {
        character: {
            displayName: 'Text',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.character.label',
            resourceType: resourceTypes.character,
            shortName: 'Character'
        },
        localizedCharacter: {
            displayName: 'Localized text',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.localized-character.label',
            resourceType: resourceTypes.localizedCharacter,
            shortName: 'LocalizedCharacter'
        },
        integer: {
            displayName: 'Integer',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.integer.label',
            resourceType: resourceTypes.integer,
            shortName: 'Integer'
        },
        dateTime: {
            displayName: 'Date/Time',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.date-time.label',
            resourceType: resourceTypes.dateTime,
            shortName: 'DateTime'
        },
        selection: {
            displayName: 'Selection',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.selection.label',
            resourceType: resourceTypes.selection,
            shortName: 'Selection'
        },
        decimal: {
            displayName: 'Decimal',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.decimal.label',
            resourceType: resourceTypes.decimal,
            shortName: 'Decimal'
        },
        real: {
            displayName: 'Floating',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.real.label',
            resourceType: resourceTypes.real,
            shortName: 'Real'
        },
        timeOnly: {
            displayName: 'Time',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.time-only.label',
            resourceType: resourceTypes.timeOnly,
            shortName: 'TimeOnly'
        },
        dateOnly: {
            displayName: 'Date',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.date-only.label',
            resourceType: resourceTypes.dateOnly,
            shortName: 'DateOnly'
        },
        attachment: {
            displayName: 'Attachment',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.attachment.label',
            resourceType: resourceTypes.attachment,
            shortName: 'Attachment'
        },
        boolean: {
            displayName: 'Boolean',
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.boolean.label',
            resourceType: resourceTypes.boolean,
            shortName: 'Boolean',
            options: [
                {
                    value: '',
                    content: ''
                },
                {
                    value: '1',
                    content: 'True'
                },
                {
                    value: '0',
                    content: 'False'
                }
            ]
        },
        recordInstance: {
            displayName: 'Record',
            resourceType: resourceTypes.recordInstance,
            skipDefaultValue: true
        },
        object: {
            displayName: 'Object',
            resourceType: resourceTypes.object,
            skipDefaultValue: true
        }
    },
    recordDefinitionTypes: {
        regular: {
            recordDefinitionType: 'com.bmc.arsys.rx.services.record.domain.RegularRecordDefinition',
            displayName: 'Regular'
        },
        join: {
            recordDefinitionType: 'com.bmc.arsys.rx.services.record.domain.JoinRecordDefinition',
            displayName: 'Join'
        },
        external: {
            recordDefinitionType: 'com.bmc.arsys.rx.services.record.domain.ExternalRecordDefinition',
            displayName: 'External'
        }
    },
    externalRecordDefinitionDataSourceTypes: {
        webApi: 'Web Api'
    },
    externalRecordDefinitionTypes: {
        custom: 'Custom'
    },
    passwordFieldIds: range(50, 71).concat([102, 123, 143]),
    arCoreFieldIds: range(1, 50).concat(range(71, 100)).concat([coreFieldIds.id, 399]),
    recordInstanceAttachment: '/api/rx/application/record/attachment',
    supportedSystemLocales: {
        recordDefinitionName: 'Supported System Locales',
        nameFieldId: 56100,
        codeFieldId: 56101
    },
    fieldPermissionTypes: {
        view: 'VIEW',
        change: 'CHANGE'
    },
    groupIds: {
        assigneeGroup: 7
    },
    securityLabelIds: {
        assigneeGroup: 112
    },
    joinTypes: {
        inner: {
            value: 'INNER',
            displayName: 'Inner join'
        },
        outer: {
            value: 'OUTER',
            displayName: 'Outer join'
        }
    },
    joinRecordDefinitionCoreFieldIds: map(joinRecordDefinitionCoreFields, 'id'),
    sourceRecordTypes,
    joinRecordDefinitionCoreFields,
    joinFieldMapping,
    externalFieldMapping,
    externalRecordDefinitionCoreFieldIds: [coreFieldIds.displayId, coreFieldIds.id],
    validDefinitionNameRegExpString: validDefinitionNameRegExpString,
    validDefinitionNameRegex: new RegExp('^' + validDefinitionNameRegExpString + '$'),
    validFullDefinitionName: new RegExp('^' + validBundleIdRegExpString + '\\:' + validDefinitionNameRegExpString + '$')
};

var ArchiveType;
(function (ArchiveType) {
    ArchiveType["CopyToArchiveAndDeleteFromSource"] = "COPY_TO_ARCHIVE_AND_DELETE_FROM_SOURCE";
    ArchiveType["DeleteFromSource"] = "DELETE_FROM_SOURCE";
    ArchiveType["None"] = "NONE";
})(ArchiveType || (ArchiveType = {}));
var AssociationSelectionType;
(function (AssociationSelectionType) {
    AssociationSelectionType["FollowParent"] = "FOLLOW_PARENT";
    AssociationSelectionType["Selected"] = "SPECIFIC_ONLY";
    AssociationSelectionType["AllEnforced"] = "ALL_ENFORCED";
    AssociationSelectionType["All"] = "ALL";
})(AssociationSelectionType || (AssociationSelectionType = {}));

class RxRecordDefinitionService {
    constructor(httpClient, rxCommandFactoryService, rxGuidService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxGuidService = rxGuidService;
        this.renameCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.record.command.RenameRecordDefinitionCommand');
        this.revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.record.command.RevertRecordDefinitionCommand');
    }
    get(recordDefinitionName, options = {}, skipLocalization = false) {
        return this.httpClient.get(this.getUrl(recordDefinitionName), options).pipe(tap((recordDefinition) => {
            if (!skipLocalization) {
                this.applyLocalization(recordDefinition);
            }
        }));
    }
    getNew() {
        const definition = {
            name: '',
            description: null,
            resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
            fieldDefinitions: cloneDeep(RX_RECORD_DEFINITION.coreFields),
            allowPermissionsOverlay: false,
            allowOtherPropertiesOverlay: false,
            allowNonAdminToDeleteRecordInstances: false,
            allowIndexesOverlay: false,
            allowFieldsOverlay: false,
            archiveDescriptor: {
                ageQualifierFieldId: RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                ageQualifierInDays: 365,
                archiveDataCriteria: null,
                archiveRecordDefinitionName: null,
                archiveType: ArchiveType.None,
                description: null,
                includeAttachments: false,
                isEnabled: false
            },
            associationsToFollowForArchive: {
                specificAssociationNames: [],
                selectionType: AssociationSelectionType.AllEnforced
            },
            enableCognitiveSearch: false,
            indexDefinitions: [],
            scope: RX_BUNDLE.definitionScopeTypes.bundle
        };
        definition.fieldDefinitions.filter(this.isSelectionFieldDefinition).forEach((selectionFieldDefinition) => {
            selectionFieldDefinition.optionLabelsById = mapValues(selectionFieldDefinition.optionNamesById, () => this.rxGuidService.generate());
        });
        return of(definition);
    }
    create(recordDefinition) {
        return this.httpClient.post(this.getUrl(), recordDefinition);
    }
    update(recordDefinition, options) {
        return this.httpClient.put(this.getUrl(recordDefinition.name), recordDefinition, options);
    }
    delete(recordDefinitionName) {
        return this.httpClient.delete(this.getUrl(recordDefinitionName));
    }
    rename(oldRecordDefinitionName, newRecordDefinitionName) {
        return this.renameCommand.execute({
            name: oldRecordDefinitionName,
            newName: newRecordDefinitionName
        });
    }
    revertCustomization(recordDefinitionName) {
        return this.revertCustomizationCommand.execute({ recordDefinitionName });
    }
    getUrl(recordDefinitionName) {
        return recordDefinitionName
            ? `/api/rx/application/record/recorddefinition/${encodeURIComponent(recordDefinitionName)}`
            : '/api/rx/application/record/recorddefinition';
    }
    setOptionsByIdProperty(fieldDefinition) {
        fieldDefinition.optionsById = reduce(fieldDefinition.optionNamesById, (optionsById, optionName, optionId) => {
            optionsById[optionId] = {
                id: optionId,
                label: optionName
            };
            return optionsById;
        }, {});
    }
    buildFieldDefinitionsByIdMap(recordDefinition) {
        return reduce(recordDefinition.fieldDefinitions, (fieldDefinitionsById, fieldDefinition) => {
            this.addFieldDefinitionToMap(fieldDefinition, fieldDefinitionsById, fieldDefinition.id);
            return fieldDefinitionsById;
        }, {});
    }
    addFieldDefinitionToMap(fieldDefinition, fieldDefinitionsById, field) {
        if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
            this.setOptionsByIdProperty(fieldDefinition);
        }
        fieldDefinitionsById[field] = fieldDefinition;
    }
    setFieldDefinitionsToOptional(recordDefinition) {
        recordDefinition.fieldDefinitions.forEach((fieldDefinition) => {
            if (fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                fieldDefinition.fieldOption = RX_RECORD_DEFINITION.fieldOptions.optional;
            }
        });
        return recordDefinition;
    }
    isSelectionFieldDefinition(fieldDefinition) {
        return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.resourceType) === RX_RECORD_DEFINITION.resourceTypes.selection;
    }
    applyLocalization(recordDefinition) {
        recordDefinition.fieldDefinitions
            .filter(this.isSelectionFieldDefinition)
            .forEach((fieldDefinition) => {
            const localizableStringsForField = get(recordDefinition.localizableStringsByFieldId, fieldDefinition.id);
            fieldDefinition.optionLabelsById = mapValues(defaults(fieldDefinition.optionLabelsById, fieldDefinition.optionNamesById), (stringGuid, optionId) => get(localizableStringsForField, stringGuid, fieldDefinition.optionNamesById[optionId]));
        });
    }
    isRegularRecord(recordDefinition) {
        return recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType;
    }
    isExternalRecord(recordDefinition) {
        return (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
            !this.isCustomRecord(recordDefinition));
    }
    isJoinRecord(recordDefinition) {
        return recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType;
    }
    isCustomRecord(recordDefinition) {
        return (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
            recordDefinition.type === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom);
    }
    isAutomaticIndex(index) {
        return (index.unique && size(index.indexFieldIds) === 1 && index.indexFieldIds[0] === RX_RECORD_DEFINITION.coreFieldIds.id);
    }
}
RxRecordDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }, { token: i3.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }, { type: i3.RxGuidService }]; } });

const recordDefinitionDataPageQuery$1 = 'com.bmc.arsys.rx.application.record.datapage.RecordDefinitionDataPageQuery';
class RxRecordDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, recordDefinitionDataPageQuery$1);
        this.injector = injector;
    }
}
RxRecordDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxRecordDefinitionCacheService {
    constructor(rxAssociationDefinitionDataPageService, rxAssociationNodeTreeDataPageService, rxRecordDefinitionService) {
        this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
        this.rxAssociationNodeTreeDataPageService = rxAssociationNodeTreeDataPageService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.consumers = new Set();
        this.recordDefinitions = new Map();
        this.recordAssociationDefinitions = new Map();
        this.recordAssociationTrees = new Map();
    }
    getRecordAssociationDefinitions(recordDefinitionNames) {
        recordDefinitionNames = castArray(recordDefinitionNames);
        const requestedAssociationDefinitions = [];
        recordDefinitionNames.forEach((recordDefinitionName) => {
            if (!this.recordAssociationDefinitions.has(recordDefinitionName)) {
                const recordAssociationDefinition$ = this.rxAssociationDefinitionDataPageService
                    .getRecordAssociationDefinitions(recordDefinitionName)
                    .pipe(map$1((result) => fromPairs([[recordDefinitionName, result[0].data]])), shareReplay(1));
                this.recordAssociationDefinitions.set(recordDefinitionName, recordAssociationDefinition$);
            }
            requestedAssociationDefinitions.push(this.recordAssociationDefinitions.get(recordDefinitionName));
        });
        return forkJoin(requestedAssociationDefinitions).pipe(map$1((recordAssociationDefinitionData) => {
            return assign({}, ...recordAssociationDefinitionData);
        }));
    }
    getRecordAssociationTree(recordDefinitionName) {
        if (!this.recordAssociationTrees.has(recordDefinitionName)) {
            this.recordAssociationTrees.set(recordDefinitionName, this.rxAssociationNodeTreeDataPageService
                .get({
                params: {
                    startIndex: 0,
                    pageSize: -1,
                    depth: 2,
                    recorddefinition: recordDefinitionName
                }
            })
                .pipe(map$1((dataPage) => dataPage.data), shareReplay(1)));
        }
        return this.recordAssociationTrees.get(recordDefinitionName);
    }
    getRecordAssociationTrees(recordDefinitionNames) {
        return forkJoin(recordDefinitionNames.map((recordDefinitionName) => this.getRecordAssociationTree(recordDefinitionName)));
    }
    getRecordDefinition(recordDefinitionName, options) {
        if (!this.recordDefinitions.has(recordDefinitionName)) {
            const recordDefinition$ = this.rxRecordDefinitionService.get(recordDefinitionName, options).pipe(shareReplay(1));
            this.recordDefinitions.set(recordDefinitionName, recordDefinition$);
        }
        return this.recordDefinitions.get(recordDefinitionName);
    }
    getRecordDefinitions(recordDefinitionNames, options) {
        return forkJoin(recordDefinitionNames.map((recordDefinitionName) => this.getRecordDefinition(recordDefinitionName, options)));
    }
    registerConsumer(consumerDestroy$) {
        this.consumers.add(consumerDestroy$);
        consumerDestroy$.subscribe(() => {
            this.consumers.delete(consumerDestroy$);
            if (isEmpty(this.consumers)) {
                this.clearCache();
            }
        });
    }
    clearCache() {
        this.recordDefinitions.clear();
        this.recordAssociationDefinitions.clear();
    }
}
RxRecordDefinitionCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionCacheService, deps: [{ token: i1$1.RxAssociationDefinitionDataPageService }, { token: i1$1.RxAssociationNodeTreeDataPageService }, { token: RxRecordDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RxAssociationDefinitionDataPageService }, { type: i1$1.RxAssociationNodeTreeDataPageService }, { type: RxRecordDefinitionService }]; } });

const recordDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.record.datapage.RecordDefinitionInheritanceDataPageQuery';
class RxRecordDefinitionInheritanceDataPageService extends DataPage {
    constructor(injector) {
        super(injector, recordDefinitionDataPageQuery);
        this.injector = injector;
    }
}
RxRecordDefinitionInheritanceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionInheritanceDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordDefinitionInheritanceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionInheritanceDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionInheritanceDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RecordInstanceValidation {
    constructor() {
        this.fieldValidatorsByType = {
            'com.bmc.arsys.rx.standardlib.record.CharacterFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.IntegerFieldDefinition': [
                this.minValidator,
                this.maxValidator,
                this.isNaNValidator
            ],
            'com.bmc.arsys.rx.standardlib.record.DateTimeFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.SelectionFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.DecimalFieldDefinition': [
                this.minValidator,
                this.maxValidator,
                this.isNaNValidator
            ],
            'com.bmc.arsys.rx.standardlib.record.RealFieldDefinition': [
                this.minValidator,
                this.maxValidator,
                this.isNaNValidator
            ],
            'com.bmc.arsys.rx.standardlib.record.TimeOnlyFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.DateOnlyFieldDefinition': null
        };
    }
    validate(recordInstance, recordDefinition) {
        this.fieldDefinitions = recordDefinition.fieldDefinitions;
        this.fieldInstances = recordInstance.fieldInstances;
        const errors = Object.keys(this.fieldInstances).reduce((result, fieldId) => {
            const fieldErrors = this.validateFieldInstance(this.fieldInstances[fieldId], this.fieldInstances[fieldId].value);
            if (fieldErrors) {
                result[fieldId] = fieldErrors;
            }
            return result;
        }, {});
        return isEmpty(errors) ? null : errors;
    }
    validateSingleField(fieldId, value) {
        return this.validateFieldInstance(this.fieldInstances[fieldId], value);
    }
    validateFieldInstance(fieldInstance, value) {
        let errors = {};
        if (fieldInstance) {
            const fieldValidators = this.getValidatorsForFieldInstance(fieldInstance);
            const fieldDefinition = this.getFieldDefinition(fieldInstance.id);
            errors = fieldValidators.reduce((result, validator) => {
                const validatorResponse = validator.call(this, value, fieldDefinition);
                if (validatorResponse) {
                    result = Object.assign(Object.assign({}, result), validatorResponse);
                }
                return result;
            }, {});
        }
        return errors;
    }
    getValidatorsForFieldInstance(fieldInstance) {
        const validators = [];
        if (fieldInstance) {
            const fieldDefinition = this.getFieldDefinition(fieldInstance.id);
            const fieldType = fieldDefinition.resourceType;
            if (fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                validators.push(this.isRequired);
            }
            if (this.fieldValidatorsByType[fieldType]) {
                validators.push(...this.fieldValidatorsByType[fieldType]);
            }
        }
        return validators;
    }
    getFieldDefinition(fieldId) {
        return this.fieldDefinitions.find((definition) => definition.id === fieldId);
    }
    isRequired(value) {
        if (isNil(value) || value === '') {
            return { required: 'Value is required' };
        }
        else {
            return null;
        }
    }
    isNaNValidator(value) {
        return isNaN(value) ? { nan: `Value cannot be NaN` } : null;
    }
    minValidator(value, fieldDefinition) {
        const minError = { min: `Minimum value is ${fieldDefinition.minValue}` };
        if (BigNumber.isBigNumber(value) || isFinite$1(value) || this.isFiniteNumberString(value)) {
            return new BigNumber(value).isLessThan(fieldDefinition.minValue) ? minError : null;
        }
        else {
            return null;
        }
    }
    maxValidator(value, fieldDefinition) {
        const maxError = { max: `Maximum value is ${fieldDefinition.maxValue}` };
        if (BigNumber.isBigNumber(value) || isFinite$1(value) || this.isFiniteNumberString(value)) {
            return new BigNumber(value).isGreaterThan(fieldDefinition.maxValue) ? maxError : null;
        }
        else {
            return null;
        }
    }
    isFiniteNumberString(value) {
        return isString(value) && value.trim() !== '' && isFinite$1(Number(value));
    }
}

class RecordInstance {
    constructor(recordDefinition, recordInstance, injector) {
        this.recordDefinition = recordDefinition;
        this.injector = injector;
        this.fieldValueChangedSubject = new Subject();
        this.validation$ = new BehaviorSubject(null);
        this.fieldValueChanged$ = this.fieldValueChangedSubject.asObservable();
        this.rxLogService = this.injector.get(RxLogService);
        this.rxLocalizationService = this.injector.get(RxLocalizationService);
        this.rxStringService = this.injector.get(RxStringService);
        this.rxNumberUtilsService = this.injector.get(RxNumberUtilsService);
        this.validationService = new RecordInstanceValidation();
        this.prepareRecordInstance(recordInstance);
        this.originalData = cloneDeep(recordInstance);
        Object.assign(this, recordInstance);
        this.validate();
    }
    prepareRecordInstance(recordInstance) {
        // convert numeric field instance values from string to BigNumber instance
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => includes([
            RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
            RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
            RX_RECORD_DEFINITION.dataTypes.real.resourceType
        ], fieldDefinition.resourceType))
            .forEach((fieldDefinition) => {
            const fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
            if (fieldInstance && fieldInstance.value) {
                fieldInstance.value = new BigNumber(fieldInstance.value);
            }
        });
        // update decimal field definition min and max numbers based on the precision
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.decimal.resourceType)
            .forEach((fieldDefinition) => {
            // According to the backend side, min and max number must be based on the precision. E.g when:
            // - precision is 1, safe number will be 1e27 - 0.1 = 99999999999999999999999999.9
            // - precision is 3, safe number will be 1e25 - 0.001 = 999999999999999999999999.999
            const base = new BigNumber(0.1).pow(fieldDefinition.precision);
            const safeRangeNumber = new BigNumber(1e28).multipliedBy(base).minus(base);
            fieldDefinition.maxValue = new BigNumber(fieldDefinition.maxValue);
            fieldDefinition.minValue = new BigNumber(fieldDefinition.minValue);
            if (fieldDefinition.maxValue.isGreaterThanOrEqualTo(safeRangeNumber)) {
                fieldDefinition.maxValue = safeRangeNumber;
            }
            if (fieldDefinition.minValue.isLessThanOrEqualTo(safeRangeNumber.negated())) {
                fieldDefinition.minValue = safeRangeNumber.negated();
            }
        });
        // convert boolean and selection field instance values from string to number
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => includes([RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, RX_RECORD_DEFINITION.dataTypes.selection.resourceType], fieldDefinition.resourceType))
            .forEach((fieldDefinition) => {
            const fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
            if (fieldInstance && fieldInstance.value) {
                fieldInstance.value = toNumber(fieldInstance.value);
            }
        });
        // add default value for localized character field component
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType === fieldDefinition.resourceType)
            .forEach((fieldDefinition) => {
            const fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
            const currentLocaleCode = this.rxLocalizationService.currentLocale;
            const defaultLocaleCode = 'en-US';
            if (fieldInstance && !fieldInstance.value && fieldInstance.valueByLocale) {
                fieldInstance.value =
                    fieldInstance.valueByLocale[currentLocaleCode] || fieldInstance.valueByLocale[defaultLocaleCode];
            }
        });
        // set placeholder value for password fields
        RX_RECORD_DEFINITION.passwordFieldIds.forEach((passwordFieldId) => {
            const passwordFieldInstance = recordInstance.fieldInstances[passwordFieldId];
            if (passwordFieldInstance) {
                passwordFieldInstance.value = '********';
            }
        });
    }
    getFieldValue(fieldId, associatedRecordPath) {
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        return get(fieldInstance, 'value', null);
    }
    setFieldValue(fieldId, value, associatedRecordPath) {
        const recordInstance = this.getRecordInstance(associatedRecordPath);
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        const fieldDefinition = find(recordInstance.recordDefinition.fieldDefinitions, { id: fieldId });
        let newValue = isUndefined(value) ? null : value;
        if (fieldInstance) {
            switch (fieldDefinition.resourceType) {
                case RX_RECORD_DEFINITION.dataTypes.character.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType:
                    if (!isNull(newValue)) {
                        if (!isString(newValue)) {
                            newValue = String(newValue);
                        }
                        else if (this.rxStringService.isEmptySafe(newValue)) {
                            newValue = null;
                        }
                    }
                    break;
                case RX_RECORD_DEFINITION.dataTypes.integer.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.real.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.decimal.resourceType:
                    if (!isNull(newValue)) {
                        if (this.rxNumberUtilsService.isFiniteOrNumberString(newValue)) {
                            newValue = new BigNumber(value);
                        }
                        else {
                            this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                            newValue = isNaN(value) ? value : null;
                        }
                    }
                    break;
                case RX_RECORD_DEFINITION.dataTypes.selection.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.boolean.resourceType:
                    if (!isNull(newValue)) {
                        if (!this.rxStringService.isEmptySafe(newValue) && isFinite(Number(newValue))) {
                            newValue = Number(newValue);
                        }
                        else {
                            this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                            newValue = null;
                        }
                    }
                    break;
                case RX_RECORD_DEFINITION.dataTypes.attachment.resourceType:
                    if (value instanceof File) {
                        newValue = value.name;
                        set(fieldInstance, 'file', value);
                    }
                    else {
                        if (!isNull(newValue)) {
                            this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                        }
                        newValue = null;
                        delete fieldInstance.file;
                    }
                    break;
            }
            set(fieldInstance, 'value', newValue);
            this.validate();
            recordInstance.fieldValueChangedSubject.next({
                fieldId,
                value: fieldInstance.value
            });
        }
    }
    getFieldProp(fieldId, prop, associatedRecordPath) {
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        return get(fieldInstance, prop);
    }
    setFieldProp(fieldId, prop, value, associatedRecordPath) {
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        set(fieldInstance, prop, value);
    }
    getFieldInstance(fieldId, associatedRecordPath) {
        if (associatedRecordPath) {
            return get(this.getRecordInstance(associatedRecordPath), ['fieldInstances', fieldId]);
        }
        else {
            return this.fieldInstances[fieldId];
        }
    }
    getRecordInstance(associatedRecordPath) {
        return associatedRecordPath ? get(this, ['associationInstances', ...associatedRecordPath]) : this;
    }
    isFieldValueChanged(fieldId, newValue, associatedRecordPath) {
        const fieldDefinition = find(this.getRecordInstance(associatedRecordPath).recordDefinition.fieldDefinitions, {
            id: fieldId
        });
        const value = this.getFieldValue(fieldId, associatedRecordPath);
        switch (fieldDefinition.resourceType) {
            case RX_RECORD_DEFINITION.dataTypes.attachment.resourceType:
                return value !== (newValue instanceof File ? newValue.name : newValue);
            case RX_RECORD_DEFINITION.dataTypes.integer.resourceType:
            case RX_RECORD_DEFINITION.dataTypes.real.resourceType:
            case RX_RECORD_DEFINITION.dataTypes.decimal.resourceType:
                return !new BigNumber(value).eq(newValue);
            default:
                return value !== newValue;
        }
    }
    revertFieldInstances() {
        this.fieldInstances = cloneDeep(this.originalData.fieldInstances);
        this.validate();
        forEach(this.getExtensionRecords(), (recordInstance) => recordInstance.revertFieldInstances());
    }
    reset() {
        Object.assign(this, cloneDeep(this.originalData));
        this.associationInstances = null;
        this.validate();
    }
    getOriginalRecordInstance() {
        return new RecordInstance(this.recordDefinition, this.originalData, this.injector);
    }
    validate() {
        const errors = this.validationService.validate(this, this.recordDefinition);
        this.validation$.next(errors);
    }
    validateSingleField(fieldId, value, associatedRecordPath) {
        let result = {};
        if (associatedRecordPath) {
            const associatedRecordInstance = this.getRecordInstance(associatedRecordPath);
            if (associatedRecordInstance) {
                result = associatedRecordInstance.validationService.validateSingleField(fieldId, value);
            }
        }
        else {
            result = this.validationService.validateSingleField(fieldId, value);
        }
        return result;
    }
    getExtensionRecords() {
        return reduce(this.associationInstances, (result, value, key) => {
            forEach(value, (associationRecords, nodeSide) => {
                result.push(...associationRecords.extensions);
            });
            return result;
        }, []);
    }
    isDeletedOrPendingAssociations() {
        return some(this.associationInstances, (value) => {
            return some(value, (associationRecords, nodeSide) => {
                return Boolean(associationRecords.deleted.length || associationRecords.pending.length);
            });
        });
    }
    logIncorrectFieldValueWarning(value, fieldDefinition) {
        const fieldTypeName = find(RX_RECORD_DEFINITION.dataTypes, {
            resourceType: fieldDefinition.resourceType
        }).displayName;
        this.rxLogService.warning(`${value} cannot be assigned to ${fieldTypeName} field.`);
    }
    prepareForBulkEdit() {
        forEach(this.fieldInstances, (fieldInstance) => {
            fieldInstance.value = null;
            if (fieldInstance.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance) {
                forOwn(fieldInstance.valueByLocale, (value, key) => {
                    fieldInstance.valueByLocale[key] = null;
                });
            }
        });
        this.originalData.fieldInstances = cloneDeep(this.fieldInstances);
        this.validate();
    }
}

const RX_RECORD_INSTANCE = {
    association: {
        operationResourceTypes: {
            associate: 'com.bmc.arsys.rx.services.association.domain.AssociateOperation',
            disassociate: 'com.bmc.arsys.rx.services.association.domain.DisassociateOperation',
            createAndAssociate: 'com.bmc.arsys.rx.services.association.domain.CreateAndAssociateOperation',
            update: 'com.bmc.arsys.rx.services.association.domain.UpdateOperation'
        }
    },
    dataPageQuery: 'com.bmc.arsys.rx.application.record.datapage.RecordInstanceDataPageQuery'
};

class RxRecordInstanceDataPageService extends DataPage {
    constructor(injector, rxLogService) {
        super(injector, RX_RECORD_INSTANCE.dataPageQuery);
        this.injector = injector;
        this.rxLogService = rxLogService;
    }
    get(dataPageRequestConfiguration = {}) {
        this.rxLogService.warning('RxRecordInstanceDataPageService: The get() method is deprecated. Use post() instead.');
        return super.get(dataPageRequestConfiguration);
    }
}
RxRecordInstanceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceDataPageService, deps: [{ token: i0.Injector }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i2.RxLogService }]; } });

class RxRecordInstanceUtilsService {
    constructor(rxRecordInstanceDataPageService, rxLogService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxLogService = rxLogService;
        this.displayFieldsCache = {};
    }
    convertFromDataPageRowToPlainRecordInstance(dataPageRow) {
        return {
            id: dataPageRow[RX_RECORD_DEFINITION.coreFieldIds.id],
            fieldInstances: transform(dataPageRow, (result, value, key) => {
                result[key] = {
                    id: toNumber(key),
                    value: value
                };
            }, {})
        };
    }
    escapeTextWildcards(value) {
        // escape double quotes with double quotes, e.g. replace "textInQuotes" with ""textInQuotes""
        // escape wildcards with backslash, e.g. replace `search%And_` with `search\%And\_`
        return value.replace(/"/g, '""').replace(/[%_]/g, '\\$&');
    }
    isFieldValueEqual(value, other) {
        if (value instanceof BigNumber || other instanceof BigNumber) {
            return new BigNumber(value).eq(new BigNumber(other));
        }
        else {
            return isEqual(value, other);
        }
    }
    isNoRecordFoundError(error) {
        return error instanceof HttpErrorResponse && get(error, 'error[0].messageNumber') === 302;
    }
    getFieldValues(recordDefinitionName, recordInstanceIds, fieldIds) {
        const queryExpression = map(recordInstanceIds, (recordInstanceId) => `'${RX_RECORD_DEFINITION.coreFieldIds.id}'="${recordInstanceId}"`).join(' OR ');
        const params = {
            recorddefinition: recordDefinitionName,
            propertySelection: fieldIds.join(','),
            queryExpression,
            pageSize: -1,
            startIndex: 0
        };
        const serializedParams = JSON.stringify(params);
        if (this.displayFieldsCache[serializedParams]) {
            return of(this.displayFieldsCache[serializedParams]);
        }
        return this.rxRecordInstanceDataPageService.post({ params }).pipe(shareReplay(1), map$1((result) => {
            this.displayFieldsCache[serializedParams] = result.data;
            return result.data;
        }));
    }
    // This method parses content-disposition header and returns decoded file name, for example:
    // 'attachment; filename*=UTF-8\'\'foo+bar.jpg' will become 'foo bar.jpg'
    // Additional notes:
    // 1. returns empty string if failed to parse content-disposition
    // 2. '+'  symbols will be replaced with '%20' which will then be evaluated to spaces after decoding
    tryParseContentDisposition(contentDisposition) {
        try {
            let fileName = contentDisposition.match(/(?:attachment; filename\*=UTF-8'')(.*)/)[1];
            fileName = fileName.replace(/\+/g, '%20');
            return decodeURIComponent(fileName);
        }
        catch (e) {
            this.rxLogService.warning(`Cannot parse content-disposition response header: ${contentDisposition}`);
            return '';
        }
    }
}
RxRecordInstanceUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUtilsService, deps: [{ token: RxRecordInstanceDataPageService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxRecordInstanceDataPageService }, { type: i2.RxLogService }]; } });

class RxRecordInstanceService {
    constructor(httpClient, rxRecordDefinitionCacheService, rxRecordInstanceUtilsService, injector, ngZone) {
        this.httpClient = httpClient;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.injector = injector;
        this.ngZone = ngZone;
        this.path = '/api/rx/application/record/recordinstance';
    }
    get(recordDefinitionName, recordInstanceId) {
        return this.getRecordInstance(recordDefinitionName, recordInstanceId);
    }
    getNew(recordDefinitionName) {
        return this.getRecordInstance(recordDefinitionName, '0');
    }
    getEmpty(recordDefinitionName) {
        return this.getNew(recordDefinitionName).pipe(tap((recordInstance) => recordInstance.prepareForBulkEdit()));
    }
    save(recordInstance, options) {
        return this.httpClient.put(`${this.path}/${encodeURIComponent(recordInstance.recordDefinitionName)}/${encodeURIComponent(recordInstance.id)}`, this.prepareRecordInstance(recordInstance), options);
    }
    delete(recordDefinitionName, recordInstanceId) {
        return this.httpClient.delete(`${this.path}/${encodeURIComponent(recordDefinitionName)}/${encodeURIComponent(recordInstanceId)}`);
    }
    prepareAttachments(fieldInstances, isAssociation = false) {
        const attachedFiles = filter(fieldInstances, (fieldInstance) => Boolean(fieldInstance.file)).map((attachment) => {
            const keyPrefix = isAssociation ? `${fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id].value}/` : '';
            return {
                key: `${keyPrefix}${attachment.id}`,
                file: attachment.file
            };
        });
        this.cleanAttachmentFiles(fieldInstances);
        return attachedFiles;
    }
    // There should not be any files in record instance JSON so we are cleaning it
    cleanAttachmentFiles(fieldInstances) {
        filter(fieldInstances, (fieldInstance) => has(fieldInstance, 'file')).forEach((fieldInstanceWithFile) => {
            if (fieldInstanceWithFile.file) {
                delete fieldInstances[fieldInstanceWithFile.id];
            }
            else {
                delete fieldInstances[fieldInstanceWithFile.id].file;
            }
        });
    }
    create(recordInstance) {
        return this.httpClient
            .post(this.path, this.prepareRecordInstance(recordInstance), {
            observe: 'response',
            responseType: 'text'
        })
            .pipe(map$1((res) => {
            let result = {};
            const locationHeader = res.headers.get('location');
            if (locationHeader) {
                result = {
                    id: locationHeader.substr(locationHeader.lastIndexOf('/') + 1),
                    url: locationHeader
                };
            }
            return result;
        }));
    }
    getRecordInstance(recordDefinitionName, recordInstanceId) {
        return forkJoin([
            this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName),
            this.getRecordInstanceData(recordDefinitionName, recordInstanceId)
        ]).pipe(map$1(([recordDefinition, recordInstanceData]) => new RecordInstance(recordDefinition, recordInstanceData, this.injector)));
    }
    getRecordInstanceData(recordDefinitionName, recordInstanceId) {
        return this.httpClient.get(`${this.path}/${encodeURIComponent(recordDefinitionName)}/${encodeURIComponent(recordInstanceId)}`);
    }
    prepareRecordInstance(recordInstance) {
        const modifiedFieldInstances = {};
        const recordInstanceFormData = new FormData();
        Object.keys(recordInstance.originalData.fieldInstances).forEach((fieldIdKey) => {
            const fieldId = Number(fieldIdKey);
            const fieldInstance = recordInstance.fieldInstances[fieldId];
            const originalFieldInstance = recordInstance.originalData.fieldInstances[fieldId];
            if (isString(fieldInstance.value)) {
                fieldInstance.value = trim(fieldInstance.value);
            }
            if (isUndefined(originalFieldInstance) ||
                (fieldInstance.value === null && originalFieldInstance.value !== null) ||
                (fieldInstance.value !== null && originalFieldInstance.value === null) ||
                (fieldInstance.value !== null &&
                    originalFieldInstance.value !== null &&
                    !(isNumber(fieldInstance.value) || BigNumber.isBigNumber(fieldInstance.value)) &&
                    String(fieldInstance.value) !== originalFieldInstance.value) ||
                ((isNumber(fieldInstance.value) || BigNumber.isBigNumber(fieldInstance.value)) &&
                    !new BigNumber(fieldInstance.value).isEqualTo(originalFieldInstance.value)) ||
                (fieldId === RX_RECORD_DEFINITION.coreFieldIds.modifiedDate && fieldInstance.value !== null) ||
                (fieldInstance.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance &&
                    !isEqual(originalFieldInstance.valueByLocale, fieldInstance.valueByLocale))) {
                modifiedFieldInstances[fieldId] = fieldInstance;
            }
        });
        const preparedRecordInstance = {
            id: recordInstance.id,
            resourceType: recordInstance.resourceType,
            displayId: recordInstance.displayId,
            recordDefinitionName: recordInstance.recordDefinitionName,
            permittedGroupsBySecurityLabels: recordInstance.permittedGroupsBySecurityLabels,
            permittedUsersBySecurityLabels: recordInstance.permittedUsersBySecurityLabels,
            permittedRolesBySecurityLabels: recordInstance.permittedRolesBySecurityLabels,
            fieldInstances: modifiedFieldInstances
        };
        let attachedFiles = this.prepareAttachments(preparedRecordInstance.fieldInstances);
        const associationInstances = this.prepareAssociationInstancesForSaving(recordInstance.associationInstances);
        // We have to use FormData if we have attachments or associated data
        if (!isEmpty(attachedFiles) || !isEmpty(associationInstances)) {
            recordInstanceFormData.append('recordInstance', JSON.stringify(preparedRecordInstance));
            if (!isEmpty(associationInstances)) {
                filter(associationInstances, 'recordInstances').forEach((associationConfig) => {
                    forEach(associationConfig.recordInstances, (instance) => {
                        attachedFiles = attachedFiles.concat(this.prepareAttachments(instance.fieldInstances, true));
                    });
                });
                recordInstanceFormData.append('associationOperations', JSON.stringify(associationInstances));
            }
            attachedFiles.forEach((attachment) => {
                recordInstanceFormData.append(attachment.key, attachment.file, attachment.file.name);
            });
            return recordInstanceFormData;
        }
        else {
            return preparedRecordInstance;
        }
    }
    getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId) {
        return `${RX_RECORD_DEFINITION.recordInstanceAttachment}/${encodeURIComponent(recordDefinitionName)}/${encodeURIComponent(recordInstanceId)}/${fieldId}`;
    }
    downloadAttachment(recordDefinitionName, fieldId, recordInstanceId, fileName) {
        this.httpClient
            .get(this.getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId), { responseType: 'blob' })
            .subscribe((fileStream) => {
            if (fileStream) {
                const file = new Blob([fileStream], {
                    type: fileStream.type
                });
                this.ngZone.runOutsideAngular(() => {
                    saveAs(file, fileName);
                });
            }
        });
    }
    getAttachment(recordDefinitionName, fieldId, recordInstanceId) {
        return this.httpClient
            .get(this.getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId), { responseType: 'blob' })
            .pipe(map$1((fileStream) => {
            return new Blob([fileStream], {
                type: fileStream.type
            });
        }));
    }
    prepareAssociationInstancesForSaving(associationInstances) {
        const associationPayload = transform(associationInstances, (result, associationInstance, associationDefinitionName) => {
            forEach(associationInstance, (associationGroups, key) => {
                const nodeSide = key.split(':')[0];
                const newAssociations = remove(associationGroups.pending, 'isNewInstance');
                if (!isEmpty(associationGroups.pending)) {
                    values(groupBy(associationGroups.pending, (instance) => JSON.stringify(instance.rolesConfig))).forEach((instancesGroup) => {
                        result.push(assign({
                            associationDefinitionName: associationDefinitionName,
                            recordInstanceIds: map(instancesGroup, 'id'),
                            nodeSide,
                            resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.associate
                        }, instancesGroup[0].rolesConfig));
                    });
                }
                if (!isEmpty(newAssociations)) {
                    values(groupBy(newAssociations, (instance) => JSON.stringify(instance.rolesConfig))).forEach((instancesGroup) => {
                        result.push(assign({
                            associationDefinitionName: associationDefinitionName,
                            recordInstances: map(newAssociations, (newAssociation) => pick(newAssociation, ['fieldInstances', 'recordDefinitionName'])),
                            nodeSide,
                            resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.createAndAssociate
                        }, instancesGroup[0].rolesConfig));
                    });
                }
                if (!isEmpty(associationGroups.deleted)) {
                    result.push({
                        associationDefinitionName: associationDefinitionName,
                        recordInstanceIds: map(associationGroups.deleted, 'id'),
                        nodeSide,
                        resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.disassociate
                    });
                }
                if (!isEmpty(associationGroups.extensions)) {
                    const extensionRecordInstance = associationGroups.extensions[0];
                    result.push({
                        associationDefinitionName: associationDefinitionName,
                        recordInstances: [this.prepareAssociatedRecordInstanceForSaving(extensionRecordInstance)],
                        nodeSide,
                        resourceType: extensionRecordInstance.isNewInstance
                            ? RX_RECORD_INSTANCE.association.operationResourceTypes.createAndAssociate
                            : RX_RECORD_INSTANCE.association.operationResourceTypes.update
                    });
                }
            });
        }, []);
        return sortBy(associationPayload, (associationData) => {
            // DISASSOCIATE operations must be at the beginning
            return associationData.operation === 'ASSOCIATE';
        });
    }
    prepareAssociatedRecordInstanceForSaving(recordInstance) {
        const recordInstanceClone = this.prepareRecordInstance(recordInstance);
        recordInstanceClone.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id] =
            recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id];
        // todo ychubar fix typings
        delete recordInstanceClone.isNewInstance;
        return recordInstanceClone;
    }
    createInstanceFromDataPageRow(dataPageRow, recordDefinition) {
        const plainRecordInstance = this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance(dataPageRow);
        plainRecordInstance.recordDefinitionName = recordDefinition.name;
        forEach(plainRecordInstance.fieldInstances, (fieldInstance, fieldId) => {
            const fieldDefinition = find(recordDefinition.fieldDefinitions, { id: Number(fieldId) }) || {};
            if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedCharacter) {
                fieldInstance.resourceType = RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance;
            }
            // normalize record instance fields
            if (!isNull(fieldInstance.value)) {
                if (isNumber(fieldInstance.value) &&
                    includes([RX_RECORD_DEFINITION.resourceTypes.boolean, RX_RECORD_DEFINITION.resourceTypes.selection], fieldDefinition.resourceType)) {
                    fieldInstance.value = String(fieldInstance.value);
                }
            }
        });
        return new RecordInstance(recordDefinition, plainRecordInstance, this.injector);
    }
}
RxRecordInstanceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceService, deps: [{ token: i1.HttpClient }, { token: RxRecordDefinitionCacheService }, { token: RxRecordInstanceUtilsService }, { token: i0.Injector }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: RxRecordDefinitionCacheService }, { type: RxRecordInstanceUtilsService }, { type: i0.Injector }, { type: i0.NgZone }]; } });

class RxRecordInstanceUpdateService {
    constructor(rxRecordInstanceService, rxUtilityModalsService) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxUtilityModalsService = rxUtilityModalsService;
    }
    execute(recordInstance) {
        return this.rxRecordInstanceService
            .save(recordInstance)
            .pipe(catchError((error) => this.handleModifiedInstanceError(error, recordInstance)));
    }
    handleModifiedInstanceError(error, recordInstance) {
        if (error.status === RX_ERROR_HANDLING.optimisticLockErrorHttpStatus) {
            return from(this.rxUtilityModalsService.confirmExternalChange(error.error[0].messageText)).pipe(switchMap((isConfirmed) => {
                if (isConfirmed) {
                    return this.rxRecordInstanceService.save(recordInstance, {
                        headers: {
                            'Override-Optimistic-Lock': 'true'
                        }
                    });
                }
                else {
                    return throwError(error);
                }
            }));
        }
        else {
            return throwError(error);
        }
    }
}
RxRecordInstanceUpdateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUpdateService, deps: [{ token: RxRecordInstanceService }, { token: i2$1.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceUpdateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUpdateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUpdateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxRecordInstanceService }, { type: i2$1.RxUtilityModalsService }]; } });

class RxFieldDefinitionService {
    constructor(rxOverlayService) {
        this.rxOverlayService = rxOverlayService;
    }
    isSystemField(fieldDefinition) {
        return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.fieldOption) === RX_RECORD_DEFINITION.fieldOptions.system;
    }
    isRequiredField(fieldDefinition) {
        return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.fieldOption) === RX_RECORD_DEFINITION.fieldOptions.required;
    }
    isPassword(fieldDefinition) {
        return includes(RX_RECORD_DEFINITION.passwordFieldIds, fieldDefinition.id);
    }
    isSecured(fieldDefinition) {
        return fieldDefinition.shouldPersistHashed || fieldDefinition.shouldPersistEncrypted;
    }
    isReadOnly(fieldDefinition) {
        return this.isSystemField(fieldDefinition) || this.isInheritedField(fieldDefinition);
    }
    isInheritedField(fieldDefinition) {
        return fieldDefinition.hasOwnProperty('isInherited') && fieldDefinition.isInherited;
    }
    isPropertiesCustomizationEnabled(fieldDefinition) {
        return (this.isTransient(fieldDefinition) ||
            this.rxOverlayService.isCustomizationEnabled('allowOtherPropertiesOverlay', fieldDefinition));
    }
    isTransient(fieldDefinition) {
        return isUndefined(fieldDefinition.lastUpdateTime);
    }
    isOverlayMode(fieldDefinition) {
        const overlayGroupId = fieldDefinition.overlayGroupId;
        const overlayDescriptor = fieldDefinition.overlayDescriptor || { parentOverlayGroupId: null };
        return (this.rxOverlayService.getOverlayOperation(overlayGroupId, overlayDescriptor.parentOverlayGroupId) !==
            RX_OVERLAY.operationTypes.createdInThisOverlayGroup);
    }
    // Is field ID in a range reserved by BMC
    isReservedField(fieldDefinition, skipValidate = false) {
        // if (isNumber(fieldDefinition.id)) {
        if (!skipValidate) {
            return this.isExternalRecordField(fieldDefinition)
                ? includes(RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds, fieldDefinition.id)
                : fieldDefinition.id <= RX_RECORD_DEFINITION.AR_MAX_RESERVED_FIELD_ID;
        }
        else {
            return false;
        }
    }
    isPermissionsCustomizationEnabled(fieldDefinition) {
        return (this.isTransient(fieldDefinition) ||
            this.rxOverlayService.isCustomizationEnabled('allowPermissionsOverlay', fieldDefinition));
    }
    isSortable(fieldDefinition) {
        // Records cannot be sorted by a field with unlimited length (maxLength = 0), or by a field longer than 1000 characters.
        // This applies to character and localized character fields.
        // Sorting is allowed for fields with unspecified length.
        return (!isNumber(fieldDefinition.maxLength) ||
            inRange(fieldDefinition.maxLength, 1, RX_RECORD_DEFINITION.sortableCharacterFieldMaxLength + 1));
    }
    isSearchable(fieldDefinition, recordDefinition) {
        return (includes([RX_RECORD_DEFINITION.dataTypes.character.resourceType, RX_RECORD_DEFINITION.dataTypes.attachment.resourceType], fieldDefinition.resourceType) &&
            !this.isPassword(fieldDefinition) &&
            !this.isSecured(fieldDefinition) &&
            !this.isReadOnly(fieldDefinition) &&
            this.isPropertiesCustomizationEnabled(fieldDefinition));
    }
    isJoinedField(fieldDefinition) {
        return this.isJoinRecordField(fieldDefinition) && !this.isCoreField(fieldDefinition);
    }
    isCoreField(fieldDefinition) {
        let coreFieldIds = RX_RECORD_DEFINITION.arCoreFieldIds;
        if (this.isJoinRecordField(fieldDefinition)) {
            coreFieldIds = RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds;
        }
        else if (this.isExternalRecordField(fieldDefinition)) {
            coreFieldIds = RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds;
        }
        return includes(coreFieldIds, fieldDefinition.id);
    }
    isExternalRecordField(fieldDefinition) {
        return get(fieldDefinition, 'fieldMapping.resourceType') === RX_RECORD_DEFINITION.externalFieldMapping;
    }
    canBeAssociatedDisplayField(fieldDefinition) {
        return ((this.isReservedField(fieldDefinition) || !this.isTransient(fieldDefinition)) &&
            (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character ||
                fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedCharacter) &&
            RX_RECORD_DEFINITION.coreFieldIds.id !== fieldDefinition.id);
    }
    isJoinRecordField(fieldDefinition) {
        return get(fieldDefinition, 'fieldMapping.resourceType') === RX_RECORD_DEFINITION.joinFieldMapping;
    }
    isDataProviderIdField(fieldDefinition, recordDefinition) {
        const isCustomRecordDefinition = (recordDefinition === null || recordDefinition === void 0 ? void 0 : recordDefinition.type) === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom;
        return isCustomRecordDefinition && fieldDefinition.id === RX_RECORD_DEFINITION.specialFieldIds.dataProviderId;
    }
    isFieldInUserOverlay(fieldDefinition) {
        return (!fieldDefinition.lastUpdateTime ||
            this.rxOverlayService.getUserDefaultOverlayGroupId() === fieldDefinition.overlayGroupId);
    }
}
RxFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionService, deps: [{ token: i2.RxOverlayService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i2.RxOverlayService }]; } });

class RxLocaleService {
    constructor(rxRecordInstanceDataPageService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
    }
    getLocales() {
        if (!this.locales) {
            this.locales = this.rxRecordInstanceDataPageService
                .post({
                params: {
                    recorddefinition: RX_RECORD_DEFINITION.supportedSystemLocales.recordDefinitionName,
                    propertySelection: [
                        RX_RECORD_DEFINITION.supportedSystemLocales.nameFieldId,
                        RX_RECORD_DEFINITION.supportedSystemLocales.codeFieldId
                    ].join(','),
                    sortBy: RX_RECORD_DEFINITION.supportedSystemLocales.nameFieldId
                }
            })
                .pipe(shareReplay(1));
        }
        return this.locales;
    }
}
RxLocaleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocaleService, deps: [{ token: RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLocaleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocaleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocaleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxRecordInstanceDataPageService }]; } });

class RxRecordDefinitionResourceTypePipe {
    transform(value) {
        var _a;
        const resourceType = RX_RECORD_DEFINITION.resourceTypesByFullName[value];
        return ((_a = RX_RECORD_DEFINITION.dataTypes[resourceType]) === null || _a === void 0 ? void 0 : _a.displayName) || '';
    }
}
RxRecordDefinitionResourceTypePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
RxRecordDefinitionResourceTypePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipe, name: "rxRecordDefinitionResourceType" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxRecordDefinitionResourceType'
                }]
        }] });

class RxRecordDefinitionResourceTypePipeModule {
}
RxRecordDefinitionResourceTypePipeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxRecordDefinitionResourceTypePipeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipeModule, declarations: [RxRecordDefinitionResourceTypePipe], exports: [RxRecordDefinitionResourceTypePipe] });
RxRecordDefinitionResourceTypePipeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipeModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionResourceTypePipeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxRecordDefinitionResourceTypePipe],
                    exports: [RxRecordDefinitionResourceTypePipe]
                }]
        }] });

class RxRecordDefinitionFieldOptionPipe {
    constructor(translateService) {
        this.translateService = translateService;
    }
    transform(value) {
        let fieldOption;
        if (value === RX_RECORD_DEFINITION.fieldOptions.required) {
            fieldOption = this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label');
        }
        else if (value === RX_RECORD_DEFINITION.fieldOptions.optional) {
            fieldOption = this.translateService.instant('com.bmc.arsys.rx.client.common.no.label');
        }
        else if (value === RX_RECORD_DEFINITION.fieldOptions.system) {
            fieldOption = `${this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label')} (${this.translateService.instant('com.bmc.arsys.rx.client.field-definition.type.system.label')})`;
        }
        return fieldOption;
    }
}
RxRecordDefinitionFieldOptionPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipe, deps: [{ token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxRecordDefinitionFieldOptionPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipe, name: "rxRecordDefinitionFieldOption" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxRecordDefinitionFieldOption'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.TranslateService }]; } });

class RxRecordDefinitionFieldOptionPipeModule {
}
RxRecordDefinitionFieldOptionPipeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxRecordDefinitionFieldOptionPipeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipeModule, declarations: [RxRecordDefinitionFieldOptionPipe], exports: [RxRecordDefinitionFieldOptionPipe] });
RxRecordDefinitionFieldOptionPipeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipeModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordDefinitionFieldOptionPipeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxRecordDefinitionFieldOptionPipe],
                    exports: [RxRecordDefinitionFieldOptionPipe]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ArchiveType, AssociationSelectionType, RX_RECORD_DEFINITION, RX_RECORD_INSTANCE, RecordFieldOption, RecordInstance, RxFieldDefinitionService, RxLocaleService, RxRecordDefinitionCacheService, RxRecordDefinitionDataPageService, RxRecordDefinitionFieldOptionPipe, RxRecordDefinitionFieldOptionPipeModule, RxRecordDefinitionInheritanceDataPageService, RxRecordDefinitionResourceTypePipe, RxRecordDefinitionResourceTypePipeModule, RxRecordDefinitionService, RxRecordInstanceDataPageService, RxRecordInstanceService, RxRecordInstanceUpdateService, RxRecordInstanceUtilsService, UploaderService };
//# sourceMappingURL=helix-platform-record-api.js.map
