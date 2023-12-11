(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@helix/platform/shared/api'), require('rxjs/operators'), require('lodash'), require('@angular/common/http'), require('@helix/platform/utils'), require('@helix/platform/association/api'), require('file-saver'), require('bignumber.js'), require('@helix/platform/ui-kit'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@helix/platform/record/api', ['exports', '@angular/core', 'rxjs', '@helix/platform/shared/api', 'rxjs/operators', 'lodash', '@angular/common/http', '@helix/platform/utils', '@helix/platform/association/api', 'file-saver', 'bignumber.js', '@helix/platform/ui-kit', '@ngx-translate/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = global.helix.platform || {}, global.helix.platform.record = global.helix.platform.record || {}, global.helix.platform.record.api = {}), global.ng.core, global.rxjs, global.helix.platform.shared.api, global.rxjs.operators, global.lodash, global.ng.common.http, global.helix.platform.utils, global.helix.platform.association.api, global.fileSaver, global.bigNumber, global.helix.platform["ui-kit"], global.i1$2));
})(this, (function (exports, i0, rxjs, i2, operators, lodash, i1, i3, i1$1, fileSaver, BigNumber, i2$1, i1$2) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);

    // LMA:: This Service is necessary to override the default UploaderService from
    // the Adapt Uploader Component.
    var UploaderService = /** @class */ (function () {
        function UploaderService() {
        }
        UploaderService.prototype.deleteFile = function (file, url) {
            return rxjs.of(null);
        };
        UploaderService.prototype.responseCallback = function (response) { };
        UploaderService.prototype.sendChunk = function (requestBody, uploadAsOneChunk, url) {
            return undefined;
        };
        UploaderService.prototype.sendFile = function (file) {
            return rxjs.of(null);
        };
        return UploaderService;
    }());
    UploaderService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UploaderService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    UploaderService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UploaderService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: UploaderService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var coreFieldIds = {
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
    var specialFieldIds = {
        dataProviderId: 380
    };
    var resourceTypes = {
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
    var resourceTypesByFullName = Object.keys(resourceTypes).reduce(function (currentValue, resourceType) {
        currentValue[resourceTypes[resourceType]] = resourceType;
        return currentValue;
    }, {});
    var validBundleIdRegExpString = '[a-zA-Z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)*(\\.([a-zA-Z0-9_]+|[a-zA-Z0-9_][a-zA-Z0-9_-]*[a-zA-Z0-9_]))';
    var validDefinitionNameRegExpString = "[\n  'A-Z\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A\n\n  'a-z\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A\n\n  '\u00AA\u00BA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\n\n  0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19\n\n   \u00A0\u1680\u2000-\u200A\u202F\u205F\u3000\n\n  \\x2D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D\n\n  _\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F\n  ]*";
    exports.RecordFieldOption = void 0;
    (function (RecordFieldOption) {
        RecordFieldOption["System"] = "SYSTEM";
        RecordFieldOption["Required"] = "REQUIRED";
        RecordFieldOption["Optional"] = "OPTIONAL";
    })(exports.RecordFieldOption || (exports.RecordFieldOption = {}));
    var fieldOptions = {
        system: exports.RecordFieldOption.System,
        required: exports.RecordFieldOption.Required,
        optional: exports.RecordFieldOption.Optional
    };
    var coreDisplayIdField = {
        resourceType: resourceTypes.character,
        name: 'Display ID',
        description: null,
        id: coreFieldIds.displayId,
        fieldOption: exports.RecordFieldOption.System,
        maxLength: 15,
        defaultValue: null,
        anyUserAllowedToSubmit: false,
        allowPermissionsOverlay: false,
        allowOtherPropertiesOverlay: false
    };
    var coreIdField = {
        resourceType: resourceTypes.character,
        name: 'ID',
        description: null,
        id: coreFieldIds.id,
        fieldOption: exports.RecordFieldOption.System,
        maxLength: 128,
        defaultValue: null,
        anyUserAllowedToSubmit: true,
        allowPermissionsOverlay: false,
        allowOtherPropertiesOverlay: false
    };
    var joinFieldMapping = 'com.bmc.arsys.rx.services.record.domain.JoinRecordDefinitionFieldMapping';
    var externalFieldMapping = 'com.bmc.arsys.rx.services.record.domain.ExternalRecordDefinitionFieldMapping';
    var sourceRecordTypes = {
        primary: 'PRIMARY_RECORD_DEFINITION',
        secondary: 'SECONDARY_RECORD_DEFINITION'
    };
    var joinRecordDefinitionCoreFields = lodash.map([coreDisplayIdField, coreIdField], function (coreField) { return lodash.assign({}, coreField, {
        maxLength: 255,
        fieldMapping: {
            resourceType: joinFieldMapping,
            sourceFieldId: coreField.id,
            source: sourceRecordTypes.primary
        }
    }); });
    var maxReservedFieldId = 536870912;
    var RX_RECORD_DEFINITION = {
        coreFieldIds: coreFieldIds,
        specialFieldIds: specialFieldIds,
        alwaysRequiredNonSystemFieldIds: [coreFieldIds.createdBy, coreFieldIds.status, coreFieldIds.description],
        AR_AUDIT_FIELD_IDS: lodash.range(450, 465),
        AR_MAX_RESERVED_FIELD_ID: maxReservedFieldId,
        AR_MIN_CUSTOM_FIELD_ID: maxReservedFieldId + 1,
        AR_CORE_FIELD_IDS: lodash.range(1, 50).concat(lodash.range(71, 100)).concat([coreFieldIds.id, 399]),
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
        fieldOptions: fieldOptions,
        resourceTypes: resourceTypes,
        resourceTypesByFullName: resourceTypesByFullName,
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
        passwordFieldIds: lodash.range(50, 71).concat([102, 123, 143]),
        arCoreFieldIds: lodash.range(1, 50).concat(lodash.range(71, 100)).concat([coreFieldIds.id, 399]),
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
        joinRecordDefinitionCoreFieldIds: lodash.map(joinRecordDefinitionCoreFields, 'id'),
        sourceRecordTypes: sourceRecordTypes,
        joinRecordDefinitionCoreFields: joinRecordDefinitionCoreFields,
        joinFieldMapping: joinFieldMapping,
        externalFieldMapping: externalFieldMapping,
        externalRecordDefinitionCoreFieldIds: [coreFieldIds.displayId, coreFieldIds.id],
        validDefinitionNameRegExpString: validDefinitionNameRegExpString,
        validDefinitionNameRegex: new RegExp('^' + validDefinitionNameRegExpString + '$'),
        validFullDefinitionName: new RegExp('^' + validBundleIdRegExpString + '\\:' + validDefinitionNameRegExpString + '$')
    };

    exports.ArchiveType = void 0;
    (function (ArchiveType) {
        ArchiveType["CopyToArchiveAndDeleteFromSource"] = "COPY_TO_ARCHIVE_AND_DELETE_FROM_SOURCE";
        ArchiveType["DeleteFromSource"] = "DELETE_FROM_SOURCE";
        ArchiveType["None"] = "NONE";
    })(exports.ArchiveType || (exports.ArchiveType = {}));
    exports.AssociationSelectionType = void 0;
    (function (AssociationSelectionType) {
        AssociationSelectionType["FollowParent"] = "FOLLOW_PARENT";
        AssociationSelectionType["Selected"] = "SPECIFIC_ONLY";
        AssociationSelectionType["AllEnforced"] = "ALL_ENFORCED";
        AssociationSelectionType["All"] = "ALL";
    })(exports.AssociationSelectionType || (exports.AssociationSelectionType = {}));

    var RxRecordDefinitionService = /** @class */ (function () {
        function RxRecordDefinitionService(httpClient, rxCommandFactoryService, rxGuidService) {
            this.httpClient = httpClient;
            this.rxCommandFactoryService = rxCommandFactoryService;
            this.rxGuidService = rxGuidService;
            this.renameCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.record.command.RenameRecordDefinitionCommand');
            this.revertCustomizationCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.record.command.RevertRecordDefinitionCommand');
        }
        RxRecordDefinitionService.prototype.get = function (recordDefinitionName, options, skipLocalization) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (skipLocalization === void 0) { skipLocalization = false; }
            return this.httpClient.get(this.getUrl(recordDefinitionName), options).pipe(operators.tap(function (recordDefinition) {
                if (!skipLocalization) {
                    _this.applyLocalization(recordDefinition);
                }
            }));
        };
        RxRecordDefinitionService.prototype.getNew = function () {
            var _this = this;
            var definition = {
                name: '',
                description: null,
                resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                fieldDefinitions: lodash.cloneDeep(RX_RECORD_DEFINITION.coreFields),
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
                    archiveType: exports.ArchiveType.None,
                    description: null,
                    includeAttachments: false,
                    isEnabled: false
                },
                associationsToFollowForArchive: {
                    specificAssociationNames: [],
                    selectionType: exports.AssociationSelectionType.AllEnforced
                },
                enableCognitiveSearch: false,
                indexDefinitions: [],
                scope: i2.RX_BUNDLE.definitionScopeTypes.bundle
            };
            definition.fieldDefinitions.filter(this.isSelectionFieldDefinition).forEach(function (selectionFieldDefinition) {
                selectionFieldDefinition.optionLabelsById = lodash.mapValues(selectionFieldDefinition.optionNamesById, function () { return _this.rxGuidService.generate(); });
            });
            return rxjs.of(definition);
        };
        RxRecordDefinitionService.prototype.create = function (recordDefinition) {
            return this.httpClient.post(this.getUrl(), recordDefinition);
        };
        RxRecordDefinitionService.prototype.update = function (recordDefinition, options) {
            return this.httpClient.put(this.getUrl(recordDefinition.name), recordDefinition, options);
        };
        RxRecordDefinitionService.prototype.delete = function (recordDefinitionName) {
            return this.httpClient.delete(this.getUrl(recordDefinitionName));
        };
        RxRecordDefinitionService.prototype.rename = function (oldRecordDefinitionName, newRecordDefinitionName) {
            return this.renameCommand.execute({
                name: oldRecordDefinitionName,
                newName: newRecordDefinitionName
            });
        };
        RxRecordDefinitionService.prototype.revertCustomization = function (recordDefinitionName) {
            return this.revertCustomizationCommand.execute({ recordDefinitionName: recordDefinitionName });
        };
        RxRecordDefinitionService.prototype.getUrl = function (recordDefinitionName) {
            return recordDefinitionName
                ? "/api/rx/application/record/recorddefinition/" + encodeURIComponent(recordDefinitionName)
                : '/api/rx/application/record/recorddefinition';
        };
        RxRecordDefinitionService.prototype.setOptionsByIdProperty = function (fieldDefinition) {
            fieldDefinition.optionsById = lodash.reduce(fieldDefinition.optionNamesById, function (optionsById, optionName, optionId) {
                optionsById[optionId] = {
                    id: optionId,
                    label: optionName
                };
                return optionsById;
            }, {});
        };
        RxRecordDefinitionService.prototype.buildFieldDefinitionsByIdMap = function (recordDefinition) {
            var _this = this;
            return lodash.reduce(recordDefinition.fieldDefinitions, function (fieldDefinitionsById, fieldDefinition) {
                _this.addFieldDefinitionToMap(fieldDefinition, fieldDefinitionsById, fieldDefinition.id);
                return fieldDefinitionsById;
            }, {});
        };
        RxRecordDefinitionService.prototype.addFieldDefinitionToMap = function (fieldDefinition, fieldDefinitionsById, field) {
            if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType) {
                this.setOptionsByIdProperty(fieldDefinition);
            }
            fieldDefinitionsById[field] = fieldDefinition;
        };
        RxRecordDefinitionService.prototype.setFieldDefinitionsToOptional = function (recordDefinition) {
            recordDefinition.fieldDefinitions.forEach(function (fieldDefinition) {
                if (fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                    fieldDefinition.fieldOption = RX_RECORD_DEFINITION.fieldOptions.optional;
                }
            });
            return recordDefinition;
        };
        RxRecordDefinitionService.prototype.isSelectionFieldDefinition = function (fieldDefinition) {
            return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.resourceType) === RX_RECORD_DEFINITION.resourceTypes.selection;
        };
        RxRecordDefinitionService.prototype.applyLocalization = function (recordDefinition) {
            recordDefinition.fieldDefinitions
                .filter(this.isSelectionFieldDefinition)
                .forEach(function (fieldDefinition) {
                var localizableStringsForField = lodash.get(recordDefinition.localizableStringsByFieldId, fieldDefinition.id);
                fieldDefinition.optionLabelsById = lodash.mapValues(lodash.defaults(fieldDefinition.optionLabelsById, fieldDefinition.optionNamesById), function (stringGuid, optionId) { return lodash.get(localizableStringsForField, stringGuid, fieldDefinition.optionNamesById[optionId]); });
            });
        };
        RxRecordDefinitionService.prototype.isRegularRecord = function (recordDefinition) {
            return recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType;
        };
        RxRecordDefinitionService.prototype.isExternalRecord = function (recordDefinition) {
            return (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
                !this.isCustomRecord(recordDefinition));
        };
        RxRecordDefinitionService.prototype.isJoinRecord = function (recordDefinition) {
            return recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType;
        };
        RxRecordDefinitionService.prototype.isCustomRecord = function (recordDefinition) {
            return (recordDefinition.resourceType === RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType &&
                recordDefinition.type === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom);
        };
        RxRecordDefinitionService.prototype.isAutomaticIndex = function (index) {
            return (index.unique && lodash.size(index.indexFieldIds) === 1 && index.indexFieldIds[0] === RX_RECORD_DEFINITION.coreFieldIds.id);
        };
        return RxRecordDefinitionService;
    }());
    RxRecordDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionService, deps: [{ token: i1__namespace.HttpClient }, { token: i2__namespace.RxCommandFactoryService }, { token: i3__namespace.RxGuidService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: i2__namespace.RxCommandFactoryService }, { type: i3__namespace.RxGuidService }]; } });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var recordDefinitionDataPageQuery$1 = 'com.bmc.arsys.rx.application.record.datapage.RecordDefinitionDataPageQuery';
    var RxRecordDefinitionDataPageService = /** @class */ (function (_super) {
        __extends(RxRecordDefinitionDataPageService, _super);
        function RxRecordDefinitionDataPageService(injector) {
            var _this = _super.call(this, injector, recordDefinitionDataPageQuery$1) || this;
            _this.injector = injector;
            return _this;
        }
        return RxRecordDefinitionDataPageService;
    }(i2.DataPage));
    RxRecordDefinitionDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordDefinitionDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RxRecordDefinitionCacheService = /** @class */ (function () {
        function RxRecordDefinitionCacheService(rxAssociationDefinitionDataPageService, rxAssociationNodeTreeDataPageService, rxRecordDefinitionService) {
            this.rxAssociationDefinitionDataPageService = rxAssociationDefinitionDataPageService;
            this.rxAssociationNodeTreeDataPageService = rxAssociationNodeTreeDataPageService;
            this.rxRecordDefinitionService = rxRecordDefinitionService;
            this.consumers = new Set();
            this.recordDefinitions = new Map();
            this.recordAssociationDefinitions = new Map();
            this.recordAssociationTrees = new Map();
        }
        RxRecordDefinitionCacheService.prototype.getRecordAssociationDefinitions = function (recordDefinitionNames) {
            var _this = this;
            recordDefinitionNames = lodash.castArray(recordDefinitionNames);
            var requestedAssociationDefinitions = [];
            recordDefinitionNames.forEach(function (recordDefinitionName) {
                if (!_this.recordAssociationDefinitions.has(recordDefinitionName)) {
                    var recordAssociationDefinition$ = _this.rxAssociationDefinitionDataPageService
                        .getRecordAssociationDefinitions(recordDefinitionName)
                        .pipe(operators.map(function (result) { return lodash.fromPairs([[recordDefinitionName, result[0].data]]); }), operators.shareReplay(1));
                    _this.recordAssociationDefinitions.set(recordDefinitionName, recordAssociationDefinition$);
                }
                requestedAssociationDefinitions.push(_this.recordAssociationDefinitions.get(recordDefinitionName));
            });
            return rxjs.forkJoin(requestedAssociationDefinitions).pipe(operators.map(function (recordAssociationDefinitionData) {
                return lodash.assign.apply(void 0, __spreadArray([{}], __read(recordAssociationDefinitionData)));
            }));
        };
        RxRecordDefinitionCacheService.prototype.getRecordAssociationTree = function (recordDefinitionName) {
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
                    .pipe(operators.map(function (dataPage) { return dataPage.data; }), operators.shareReplay(1)));
            }
            return this.recordAssociationTrees.get(recordDefinitionName);
        };
        RxRecordDefinitionCacheService.prototype.getRecordAssociationTrees = function (recordDefinitionNames) {
            var _this = this;
            return rxjs.forkJoin(recordDefinitionNames.map(function (recordDefinitionName) { return _this.getRecordAssociationTree(recordDefinitionName); }));
        };
        RxRecordDefinitionCacheService.prototype.getRecordDefinition = function (recordDefinitionName, options) {
            if (!this.recordDefinitions.has(recordDefinitionName)) {
                var recordDefinition$ = this.rxRecordDefinitionService.get(recordDefinitionName, options).pipe(operators.shareReplay(1));
                this.recordDefinitions.set(recordDefinitionName, recordDefinition$);
            }
            return this.recordDefinitions.get(recordDefinitionName);
        };
        RxRecordDefinitionCacheService.prototype.getRecordDefinitions = function (recordDefinitionNames, options) {
            var _this = this;
            return rxjs.forkJoin(recordDefinitionNames.map(function (recordDefinitionName) { return _this.getRecordDefinition(recordDefinitionName, options); }));
        };
        RxRecordDefinitionCacheService.prototype.registerConsumer = function (consumerDestroy$) {
            var _this = this;
            this.consumers.add(consumerDestroy$);
            consumerDestroy$.subscribe(function () {
                _this.consumers.delete(consumerDestroy$);
                if (lodash.isEmpty(_this.consumers)) {
                    _this.clearCache();
                }
            });
        };
        RxRecordDefinitionCacheService.prototype.clearCache = function () {
            this.recordDefinitions.clear();
            this.recordAssociationDefinitions.clear();
        };
        return RxRecordDefinitionCacheService;
    }());
    RxRecordDefinitionCacheService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionCacheService, deps: [{ token: i1__namespace$1.RxAssociationDefinitionDataPageService }, { token: i1__namespace$1.RxAssociationNodeTreeDataPageService }, { token: RxRecordDefinitionService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordDefinitionCacheService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionCacheService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionCacheService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.RxAssociationDefinitionDataPageService }, { type: i1__namespace$1.RxAssociationNodeTreeDataPageService }, { type: RxRecordDefinitionService }]; } });

    var recordDefinitionDataPageQuery = 'com.bmc.arsys.rx.application.record.datapage.RecordDefinitionInheritanceDataPageQuery';
    var RxRecordDefinitionInheritanceDataPageService = /** @class */ (function (_super) {
        __extends(RxRecordDefinitionInheritanceDataPageService, _super);
        function RxRecordDefinitionInheritanceDataPageService(injector) {
            var _this = _super.call(this, injector, recordDefinitionDataPageQuery) || this;
            _this.injector = injector;
            return _this;
        }
        return RxRecordDefinitionInheritanceDataPageService;
    }(i2.DataPage));
    RxRecordDefinitionInheritanceDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionInheritanceDataPageService, deps: [{ token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordDefinitionInheritanceDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionInheritanceDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionInheritanceDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }]; } });

    var RecordInstanceValidation = /** @class */ (function () {
        function RecordInstanceValidation() {
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
        RecordInstanceValidation.prototype.validate = function (recordInstance, recordDefinition) {
            var _this = this;
            this.fieldDefinitions = recordDefinition.fieldDefinitions;
            this.fieldInstances = recordInstance.fieldInstances;
            var errors = Object.keys(this.fieldInstances).reduce(function (result, fieldId) {
                var fieldErrors = _this.validateFieldInstance(_this.fieldInstances[fieldId], _this.fieldInstances[fieldId].value);
                if (fieldErrors) {
                    result[fieldId] = fieldErrors;
                }
                return result;
            }, {});
            return lodash.isEmpty(errors) ? null : errors;
        };
        RecordInstanceValidation.prototype.validateSingleField = function (fieldId, value) {
            return this.validateFieldInstance(this.fieldInstances[fieldId], value);
        };
        RecordInstanceValidation.prototype.validateFieldInstance = function (fieldInstance, value) {
            var _this = this;
            var errors = {};
            if (fieldInstance) {
                var fieldValidators = this.getValidatorsForFieldInstance(fieldInstance);
                var fieldDefinition_1 = this.getFieldDefinition(fieldInstance.id);
                errors = fieldValidators.reduce(function (result, validator) {
                    var validatorResponse = validator.call(_this, value, fieldDefinition_1);
                    if (validatorResponse) {
                        result = Object.assign(Object.assign({}, result), validatorResponse);
                    }
                    return result;
                }, {});
            }
            return errors;
        };
        RecordInstanceValidation.prototype.getValidatorsForFieldInstance = function (fieldInstance) {
            var validators = [];
            if (fieldInstance) {
                var fieldDefinition = this.getFieldDefinition(fieldInstance.id);
                var fieldType = fieldDefinition.resourceType;
                if (fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                    validators.push(this.isRequired);
                }
                if (this.fieldValidatorsByType[fieldType]) {
                    validators.push.apply(validators, __spreadArray([], __read(this.fieldValidatorsByType[fieldType])));
                }
            }
            return validators;
        };
        RecordInstanceValidation.prototype.getFieldDefinition = function (fieldId) {
            return this.fieldDefinitions.find(function (definition) { return definition.id === fieldId; });
        };
        RecordInstanceValidation.prototype.isRequired = function (value) {
            if (lodash.isNil(value) || value === '') {
                return { required: 'Value is required' };
            }
            else {
                return null;
            }
        };
        RecordInstanceValidation.prototype.isNaNValidator = function (value) {
            return lodash.isNaN(value) ? { nan: "Value cannot be NaN" } : null;
        };
        RecordInstanceValidation.prototype.minValidator = function (value, fieldDefinition) {
            var minError = { min: "Minimum value is " + fieldDefinition.minValue };
            if (BigNumber__default["default"].isBigNumber(value) || lodash.isFinite(value) || this.isFiniteNumberString(value)) {
                return new BigNumber__default["default"](value).isLessThan(fieldDefinition.minValue) ? minError : null;
            }
            else {
                return null;
            }
        };
        RecordInstanceValidation.prototype.maxValidator = function (value, fieldDefinition) {
            var maxError = { max: "Maximum value is " + fieldDefinition.maxValue };
            if (BigNumber__default["default"].isBigNumber(value) || lodash.isFinite(value) || this.isFiniteNumberString(value)) {
                return new BigNumber__default["default"](value).isGreaterThan(fieldDefinition.maxValue) ? maxError : null;
            }
            else {
                return null;
            }
        };
        RecordInstanceValidation.prototype.isFiniteNumberString = function (value) {
            return lodash.isString(value) && value.trim() !== '' && lodash.isFinite(Number(value));
        };
        return RecordInstanceValidation;
    }());

    var RecordInstance = /** @class */ (function () {
        function RecordInstance(recordDefinition, recordInstance, injector) {
            this.recordDefinition = recordDefinition;
            this.injector = injector;
            this.fieldValueChangedSubject = new rxjs.Subject();
            this.validation$ = new rxjs.BehaviorSubject(null);
            this.fieldValueChanged$ = this.fieldValueChangedSubject.asObservable();
            this.rxLogService = this.injector.get(i2.RxLogService);
            this.rxLocalizationService = this.injector.get(i2.RxLocalizationService);
            this.rxStringService = this.injector.get(i3.RxStringService);
            this.rxNumberUtilsService = this.injector.get(i3.RxNumberUtilsService);
            this.validationService = new RecordInstanceValidation();
            this.prepareRecordInstance(recordInstance);
            this.originalData = lodash.cloneDeep(recordInstance);
            Object.assign(this, recordInstance);
            this.validate();
        }
        RecordInstance.prototype.prepareRecordInstance = function (recordInstance) {
            var _this = this;
            // convert numeric field instance values from string to BigNumber instance
            this.recordDefinition.fieldDefinitions
                .filter(function (fieldDefinition) { return lodash.includes([
                RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                RX_RECORD_DEFINITION.dataTypes.real.resourceType
            ], fieldDefinition.resourceType); })
                .forEach(function (fieldDefinition) {
                var fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
                if (fieldInstance && fieldInstance.value) {
                    fieldInstance.value = new BigNumber__default["default"](fieldInstance.value);
                }
            });
            // update decimal field definition min and max numbers based on the precision
            this.recordDefinition.fieldDefinitions
                .filter(function (fieldDefinition) { return fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.decimal.resourceType; })
                .forEach(function (fieldDefinition) {
                // According to the backend side, min and max number must be based on the precision. E.g when:
                // - precision is 1, safe number will be 1e27 - 0.1 = 99999999999999999999999999.9
                // - precision is 3, safe number will be 1e25 - 0.001 = 999999999999999999999999.999
                var base = new BigNumber__default["default"](0.1).pow(fieldDefinition.precision);
                var safeRangeNumber = new BigNumber__default["default"](1e28).multipliedBy(base).minus(base);
                fieldDefinition.maxValue = new BigNumber__default["default"](fieldDefinition.maxValue);
                fieldDefinition.minValue = new BigNumber__default["default"](fieldDefinition.minValue);
                if (fieldDefinition.maxValue.isGreaterThanOrEqualTo(safeRangeNumber)) {
                    fieldDefinition.maxValue = safeRangeNumber;
                }
                if (fieldDefinition.minValue.isLessThanOrEqualTo(safeRangeNumber.negated())) {
                    fieldDefinition.minValue = safeRangeNumber.negated();
                }
            });
            // convert boolean and selection field instance values from string to number
            this.recordDefinition.fieldDefinitions
                .filter(function (fieldDefinition) { return lodash.includes([RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, RX_RECORD_DEFINITION.dataTypes.selection.resourceType], fieldDefinition.resourceType); })
                .forEach(function (fieldDefinition) {
                var fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
                if (fieldInstance && fieldInstance.value) {
                    fieldInstance.value = lodash.toNumber(fieldInstance.value);
                }
            });
            // add default value for localized character field component
            this.recordDefinition.fieldDefinitions
                .filter(function (fieldDefinition) { return RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType === fieldDefinition.resourceType; })
                .forEach(function (fieldDefinition) {
                var fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
                var currentLocaleCode = _this.rxLocalizationService.currentLocale;
                var defaultLocaleCode = 'en-US';
                if (fieldInstance && !fieldInstance.value && fieldInstance.valueByLocale) {
                    fieldInstance.value =
                        fieldInstance.valueByLocale[currentLocaleCode] || fieldInstance.valueByLocale[defaultLocaleCode];
                }
            });
            // set placeholder value for password fields
            RX_RECORD_DEFINITION.passwordFieldIds.forEach(function (passwordFieldId) {
                var passwordFieldInstance = recordInstance.fieldInstances[passwordFieldId];
                if (passwordFieldInstance) {
                    passwordFieldInstance.value = '********';
                }
            });
        };
        RecordInstance.prototype.getFieldValue = function (fieldId, associatedRecordPath) {
            var fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
            return lodash.get(fieldInstance, 'value', null);
        };
        RecordInstance.prototype.setFieldValue = function (fieldId, value, associatedRecordPath) {
            var recordInstance = this.getRecordInstance(associatedRecordPath);
            var fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
            var fieldDefinition = lodash.find(recordInstance.recordDefinition.fieldDefinitions, { id: fieldId });
            var newValue = lodash.isUndefined(value) ? null : value;
            if (fieldInstance) {
                switch (fieldDefinition.resourceType) {
                    case RX_RECORD_DEFINITION.dataTypes.character.resourceType:
                    case RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType:
                        if (!lodash.isNull(newValue)) {
                            if (!lodash.isString(newValue)) {
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
                        if (!lodash.isNull(newValue)) {
                            if (this.rxNumberUtilsService.isFiniteOrNumberString(newValue)) {
                                newValue = new BigNumber__default["default"](value);
                            }
                            else {
                                this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                                newValue = lodash.isNaN(value) ? value : null;
                            }
                        }
                        break;
                    case RX_RECORD_DEFINITION.dataTypes.selection.resourceType:
                    case RX_RECORD_DEFINITION.dataTypes.boolean.resourceType:
                        if (!lodash.isNull(newValue)) {
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
                            lodash.set(fieldInstance, 'file', value);
                        }
                        else {
                            if (!lodash.isNull(newValue)) {
                                this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                            }
                            newValue = null;
                            delete fieldInstance.file;
                        }
                        break;
                }
                lodash.set(fieldInstance, 'value', newValue);
                this.validate();
                recordInstance.fieldValueChangedSubject.next({
                    fieldId: fieldId,
                    value: fieldInstance.value
                });
            }
        };
        RecordInstance.prototype.getFieldProp = function (fieldId, prop, associatedRecordPath) {
            var fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
            return lodash.get(fieldInstance, prop);
        };
        RecordInstance.prototype.setFieldProp = function (fieldId, prop, value, associatedRecordPath) {
            var fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
            lodash.set(fieldInstance, prop, value);
        };
        RecordInstance.prototype.getFieldInstance = function (fieldId, associatedRecordPath) {
            if (associatedRecordPath) {
                return lodash.get(this.getRecordInstance(associatedRecordPath), ['fieldInstances', fieldId]);
            }
            else {
                return this.fieldInstances[fieldId];
            }
        };
        RecordInstance.prototype.getRecordInstance = function (associatedRecordPath) {
            return associatedRecordPath ? lodash.get(this, __spreadArray(['associationInstances'], __read(associatedRecordPath))) : this;
        };
        RecordInstance.prototype.isFieldValueChanged = function (fieldId, newValue, associatedRecordPath) {
            var fieldDefinition = lodash.find(this.getRecordInstance(associatedRecordPath).recordDefinition.fieldDefinitions, {
                id: fieldId
            });
            var value = this.getFieldValue(fieldId, associatedRecordPath);
            switch (fieldDefinition.resourceType) {
                case RX_RECORD_DEFINITION.dataTypes.attachment.resourceType:
                    return value !== (newValue instanceof File ? newValue.name : newValue);
                case RX_RECORD_DEFINITION.dataTypes.integer.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.real.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.decimal.resourceType:
                    return !new BigNumber__default["default"](value).eq(newValue);
                default:
                    return value !== newValue;
            }
        };
        RecordInstance.prototype.revertFieldInstances = function () {
            this.fieldInstances = lodash.cloneDeep(this.originalData.fieldInstances);
            this.validate();
            lodash.forEach(this.getExtensionRecords(), function (recordInstance) { return recordInstance.revertFieldInstances(); });
        };
        RecordInstance.prototype.reset = function () {
            Object.assign(this, lodash.cloneDeep(this.originalData));
            this.associationInstances = null;
            this.validate();
        };
        RecordInstance.prototype.getOriginalRecordInstance = function () {
            return new RecordInstance(this.recordDefinition, this.originalData, this.injector);
        };
        RecordInstance.prototype.validate = function () {
            var errors = this.validationService.validate(this, this.recordDefinition);
            this.validation$.next(errors);
        };
        RecordInstance.prototype.validateSingleField = function (fieldId, value, associatedRecordPath) {
            var result = {};
            if (associatedRecordPath) {
                var associatedRecordInstance = this.getRecordInstance(associatedRecordPath);
                if (associatedRecordInstance) {
                    result = associatedRecordInstance.validationService.validateSingleField(fieldId, value);
                }
            }
            else {
                result = this.validationService.validateSingleField(fieldId, value);
            }
            return result;
        };
        RecordInstance.prototype.getExtensionRecords = function () {
            return lodash.reduce(this.associationInstances, function (result, value, key) {
                lodash.forEach(value, function (associationRecords, nodeSide) {
                    result.push.apply(result, __spreadArray([], __read(associationRecords.extensions)));
                });
                return result;
            }, []);
        };
        RecordInstance.prototype.isDeletedOrPendingAssociations = function () {
            return lodash.some(this.associationInstances, function (value) {
                return lodash.some(value, function (associationRecords, nodeSide) {
                    return Boolean(associationRecords.deleted.length || associationRecords.pending.length);
                });
            });
        };
        RecordInstance.prototype.logIncorrectFieldValueWarning = function (value, fieldDefinition) {
            var fieldTypeName = lodash.find(RX_RECORD_DEFINITION.dataTypes, {
                resourceType: fieldDefinition.resourceType
            }).displayName;
            this.rxLogService.warning(value + " cannot be assigned to " + fieldTypeName + " field.");
        };
        RecordInstance.prototype.prepareForBulkEdit = function () {
            lodash.forEach(this.fieldInstances, function (fieldInstance) {
                fieldInstance.value = null;
                if (fieldInstance.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance) {
                    lodash.forOwn(fieldInstance.valueByLocale, function (value, key) {
                        fieldInstance.valueByLocale[key] = null;
                    });
                }
            });
            this.originalData.fieldInstances = lodash.cloneDeep(this.fieldInstances);
            this.validate();
        };
        return RecordInstance;
    }());

    var RX_RECORD_INSTANCE = {
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

    var RxRecordInstanceDataPageService = /** @class */ (function (_super) {
        __extends(RxRecordInstanceDataPageService, _super);
        function RxRecordInstanceDataPageService(injector, rxLogService) {
            var _this = _super.call(this, injector, RX_RECORD_INSTANCE.dataPageQuery) || this;
            _this.injector = injector;
            _this.rxLogService = rxLogService;
            return _this;
        }
        RxRecordInstanceDataPageService.prototype.get = function (dataPageRequestConfiguration) {
            if (dataPageRequestConfiguration === void 0) { dataPageRequestConfiguration = {}; }
            this.rxLogService.warning('RxRecordInstanceDataPageService: The get() method is deprecated. Use post() instead.');
            return _super.prototype.get.call(this, dataPageRequestConfiguration);
        };
        return RxRecordInstanceDataPageService;
    }(i2.DataPage));
    RxRecordInstanceDataPageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceDataPageService, deps: [{ token: i0__namespace.Injector }, { token: i2__namespace.RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordInstanceDataPageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceDataPageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceDataPageService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Injector }, { type: i2__namespace.RxLogService }]; } });

    var RxRecordInstanceUtilsService = /** @class */ (function () {
        function RxRecordInstanceUtilsService(rxRecordInstanceDataPageService, rxLogService) {
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
            this.rxLogService = rxLogService;
            this.displayFieldsCache = {};
        }
        RxRecordInstanceUtilsService.prototype.convertFromDataPageRowToPlainRecordInstance = function (dataPageRow) {
            return {
                id: dataPageRow[RX_RECORD_DEFINITION.coreFieldIds.id],
                fieldInstances: lodash.transform(dataPageRow, function (result, value, key) {
                    result[key] = {
                        id: lodash.toNumber(key),
                        value: value
                    };
                }, {})
            };
        };
        RxRecordInstanceUtilsService.prototype.escapeTextWildcards = function (value) {
            // escape double quotes with double quotes, e.g. replace "textInQuotes" with ""textInQuotes""
            // escape wildcards with backslash, e.g. replace `search%And_` with `search\%And\_`
            return value.replace(/"/g, '""').replace(/[%_]/g, '\\$&');
        };
        RxRecordInstanceUtilsService.prototype.isFieldValueEqual = function (value, other) {
            if (value instanceof BigNumber__default["default"] || other instanceof BigNumber__default["default"]) {
                return new BigNumber__default["default"](value).eq(new BigNumber__default["default"](other));
            }
            else {
                return lodash.isEqual(value, other);
            }
        };
        RxRecordInstanceUtilsService.prototype.isNoRecordFoundError = function (error) {
            return error instanceof i1.HttpErrorResponse && lodash.get(error, 'error[0].messageNumber') === 302;
        };
        RxRecordInstanceUtilsService.prototype.getFieldValues = function (recordDefinitionName, recordInstanceIds, fieldIds) {
            var _this = this;
            var queryExpression = lodash.map(recordInstanceIds, function (recordInstanceId) { return "'" + RX_RECORD_DEFINITION.coreFieldIds.id + "'=\"" + recordInstanceId + "\""; }).join(' OR ');
            var params = {
                recorddefinition: recordDefinitionName,
                propertySelection: fieldIds.join(','),
                queryExpression: queryExpression,
                pageSize: -1,
                startIndex: 0
            };
            var serializedParams = JSON.stringify(params);
            if (this.displayFieldsCache[serializedParams]) {
                return rxjs.of(this.displayFieldsCache[serializedParams]);
            }
            return this.rxRecordInstanceDataPageService.post({ params: params }).pipe(operators.shareReplay(1), operators.map(function (result) {
                _this.displayFieldsCache[serializedParams] = result.data;
                return result.data;
            }));
        };
        // This method parses content-disposition header and returns decoded file name, for example:
        // 'attachment; filename*=UTF-8\'\'foo+bar.jpg' will become 'foo bar.jpg'
        // Additional notes:
        // 1. returns empty string if failed to parse content-disposition
        // 2. '+'  symbols will be replaced with '%20' which will then be evaluated to spaces after decoding
        RxRecordInstanceUtilsService.prototype.tryParseContentDisposition = function (contentDisposition) {
            try {
                var fileName = contentDisposition.match(/(?:attachment; filename\*=UTF-8'')(.*)/)[1];
                fileName = fileName.replace(/\+/g, '%20');
                return decodeURIComponent(fileName);
            }
            catch (e) {
                this.rxLogService.warning("Cannot parse content-disposition response header: " + contentDisposition);
                return '';
            }
        };
        return RxRecordInstanceUtilsService;
    }());
    RxRecordInstanceUtilsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceUtilsService, deps: [{ token: RxRecordInstanceDataPageService }, { token: i2__namespace.RxLogService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordInstanceUtilsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceUtilsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceUtilsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxRecordInstanceDataPageService }, { type: i2__namespace.RxLogService }]; } });

    var RxRecordInstanceService = /** @class */ (function () {
        function RxRecordInstanceService(httpClient, rxRecordDefinitionCacheService, rxRecordInstanceUtilsService, injector, ngZone) {
            this.httpClient = httpClient;
            this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
            this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
            this.injector = injector;
            this.ngZone = ngZone;
            this.path = '/api/rx/application/record/recordinstance';
        }
        RxRecordInstanceService.prototype.get = function (recordDefinitionName, recordInstanceId) {
            return this.getRecordInstance(recordDefinitionName, recordInstanceId);
        };
        RxRecordInstanceService.prototype.getNew = function (recordDefinitionName) {
            return this.getRecordInstance(recordDefinitionName, '0');
        };
        RxRecordInstanceService.prototype.getEmpty = function (recordDefinitionName) {
            return this.getNew(recordDefinitionName).pipe(operators.tap(function (recordInstance) { return recordInstance.prepareForBulkEdit(); }));
        };
        RxRecordInstanceService.prototype.save = function (recordInstance, options) {
            return this.httpClient.put(this.path + "/" + encodeURIComponent(recordInstance.recordDefinitionName) + "/" + encodeURIComponent(recordInstance.id), this.prepareRecordInstance(recordInstance), options);
        };
        RxRecordInstanceService.prototype.delete = function (recordDefinitionName, recordInstanceId) {
            return this.httpClient.delete(this.path + "/" + encodeURIComponent(recordDefinitionName) + "/" + encodeURIComponent(recordInstanceId));
        };
        RxRecordInstanceService.prototype.prepareAttachments = function (fieldInstances, isAssociation) {
            if (isAssociation === void 0) { isAssociation = false; }
            var attachedFiles = lodash.filter(fieldInstances, function (fieldInstance) { return Boolean(fieldInstance.file); }).map(function (attachment) {
                var keyPrefix = isAssociation ? fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id].value + "/" : '';
                return {
                    key: "" + keyPrefix + attachment.id,
                    file: attachment.file
                };
            });
            this.cleanAttachmentFiles(fieldInstances);
            return attachedFiles;
        };
        // There should not be any files in record instance JSON so we are cleaning it
        RxRecordInstanceService.prototype.cleanAttachmentFiles = function (fieldInstances) {
            lodash.filter(fieldInstances, function (fieldInstance) { return lodash.has(fieldInstance, 'file'); }).forEach(function (fieldInstanceWithFile) {
                if (fieldInstanceWithFile.file) {
                    delete fieldInstances[fieldInstanceWithFile.id];
                }
                else {
                    delete fieldInstances[fieldInstanceWithFile.id].file;
                }
            });
        };
        RxRecordInstanceService.prototype.create = function (recordInstance) {
            return this.httpClient
                .post(this.path, this.prepareRecordInstance(recordInstance), {
                observe: 'response',
                responseType: 'text'
            })
                .pipe(operators.map(function (res) {
                var result = {};
                var locationHeader = res.headers.get('location');
                if (locationHeader) {
                    result = {
                        id: locationHeader.substr(locationHeader.lastIndexOf('/') + 1),
                        url: locationHeader
                    };
                }
                return result;
            }));
        };
        RxRecordInstanceService.prototype.getRecordInstance = function (recordDefinitionName, recordInstanceId) {
            var _this = this;
            return rxjs.forkJoin([
                this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName),
                this.getRecordInstanceData(recordDefinitionName, recordInstanceId)
            ]).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), recordDefinition = _b[0], recordInstanceData = _b[1];
                return new RecordInstance(recordDefinition, recordInstanceData, _this.injector);
            }));
        };
        RxRecordInstanceService.prototype.getRecordInstanceData = function (recordDefinitionName, recordInstanceId) {
            return this.httpClient.get(this.path + "/" + encodeURIComponent(recordDefinitionName) + "/" + encodeURIComponent(recordInstanceId));
        };
        RxRecordInstanceService.prototype.prepareRecordInstance = function (recordInstance) {
            var _this = this;
            var modifiedFieldInstances = {};
            var recordInstanceFormData = new FormData();
            Object.keys(recordInstance.originalData.fieldInstances).forEach(function (fieldIdKey) {
                var fieldId = Number(fieldIdKey);
                var fieldInstance = recordInstance.fieldInstances[fieldId];
                var originalFieldInstance = recordInstance.originalData.fieldInstances[fieldId];
                if (lodash.isString(fieldInstance.value)) {
                    fieldInstance.value = lodash.trim(fieldInstance.value);
                }
                if (lodash.isUndefined(originalFieldInstance) ||
                    (fieldInstance.value === null && originalFieldInstance.value !== null) ||
                    (fieldInstance.value !== null && originalFieldInstance.value === null) ||
                    (fieldInstance.value !== null &&
                        originalFieldInstance.value !== null &&
                        !(lodash.isNumber(fieldInstance.value) || BigNumber__default["default"].isBigNumber(fieldInstance.value)) &&
                        String(fieldInstance.value) !== originalFieldInstance.value) ||
                    ((lodash.isNumber(fieldInstance.value) || BigNumber__default["default"].isBigNumber(fieldInstance.value)) &&
                        !new BigNumber__default["default"](fieldInstance.value).isEqualTo(originalFieldInstance.value)) ||
                    (fieldId === RX_RECORD_DEFINITION.coreFieldIds.modifiedDate && fieldInstance.value !== null) ||
                    (fieldInstance.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance &&
                        !lodash.isEqual(originalFieldInstance.valueByLocale, fieldInstance.valueByLocale))) {
                    modifiedFieldInstances[fieldId] = fieldInstance;
                }
            });
            var preparedRecordInstance = {
                id: recordInstance.id,
                resourceType: recordInstance.resourceType,
                displayId: recordInstance.displayId,
                recordDefinitionName: recordInstance.recordDefinitionName,
                permittedGroupsBySecurityLabels: recordInstance.permittedGroupsBySecurityLabels,
                permittedUsersBySecurityLabels: recordInstance.permittedUsersBySecurityLabels,
                permittedRolesBySecurityLabels: recordInstance.permittedRolesBySecurityLabels,
                fieldInstances: modifiedFieldInstances
            };
            var attachedFiles = this.prepareAttachments(preparedRecordInstance.fieldInstances);
            var associationInstances = this.prepareAssociationInstancesForSaving(recordInstance.associationInstances);
            // We have to use FormData if we have attachments or associated data
            if (!lodash.isEmpty(attachedFiles) || !lodash.isEmpty(associationInstances)) {
                recordInstanceFormData.append('recordInstance', JSON.stringify(preparedRecordInstance));
                if (!lodash.isEmpty(associationInstances)) {
                    lodash.filter(associationInstances, 'recordInstances').forEach(function (associationConfig) {
                        lodash.forEach(associationConfig.recordInstances, function (instance) {
                            attachedFiles = attachedFiles.concat(_this.prepareAttachments(instance.fieldInstances, true));
                        });
                    });
                    recordInstanceFormData.append('associationOperations', JSON.stringify(associationInstances));
                }
                attachedFiles.forEach(function (attachment) {
                    recordInstanceFormData.append(attachment.key, attachment.file, attachment.file.name);
                });
                return recordInstanceFormData;
            }
            else {
                return preparedRecordInstance;
            }
        };
        RxRecordInstanceService.prototype.getAttachmentDownloadUrl = function (recordDefinitionName, fieldId, recordInstanceId) {
            return RX_RECORD_DEFINITION.recordInstanceAttachment + "/" + encodeURIComponent(recordDefinitionName) + "/" + encodeURIComponent(recordInstanceId) + "/" + fieldId;
        };
        RxRecordInstanceService.prototype.downloadAttachment = function (recordDefinitionName, fieldId, recordInstanceId, fileName) {
            var _this = this;
            this.httpClient
                .get(this.getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId), { responseType: 'blob' })
                .subscribe(function (fileStream) {
                if (fileStream) {
                    var file_1 = new Blob([fileStream], {
                        type: fileStream.type
                    });
                    _this.ngZone.runOutsideAngular(function () {
                        fileSaver.saveAs(file_1, fileName);
                    });
                }
            });
        };
        RxRecordInstanceService.prototype.getAttachment = function (recordDefinitionName, fieldId, recordInstanceId) {
            return this.httpClient
                .get(this.getAttachmentDownloadUrl(recordDefinitionName, fieldId, recordInstanceId), { responseType: 'blob' })
                .pipe(operators.map(function (fileStream) {
                return new Blob([fileStream], {
                    type: fileStream.type
                });
            }));
        };
        RxRecordInstanceService.prototype.prepareAssociationInstancesForSaving = function (associationInstances) {
            var _this = this;
            var associationPayload = lodash.transform(associationInstances, function (result, associationInstance, associationDefinitionName) {
                lodash.forEach(associationInstance, function (associationGroups, key) {
                    var nodeSide = key.split(':')[0];
                    var newAssociations = lodash.remove(associationGroups.pending, 'isNewInstance');
                    if (!lodash.isEmpty(associationGroups.pending)) {
                        lodash.values(lodash.groupBy(associationGroups.pending, function (instance) { return JSON.stringify(instance.rolesConfig); })).forEach(function (instancesGroup) {
                            result.push(lodash.assign({
                                associationDefinitionName: associationDefinitionName,
                                recordInstanceIds: lodash.map(instancesGroup, 'id'),
                                nodeSide: nodeSide,
                                resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.associate
                            }, instancesGroup[0].rolesConfig));
                        });
                    }
                    if (!lodash.isEmpty(newAssociations)) {
                        lodash.values(lodash.groupBy(newAssociations, function (instance) { return JSON.stringify(instance.rolesConfig); })).forEach(function (instancesGroup) {
                            result.push(lodash.assign({
                                associationDefinitionName: associationDefinitionName,
                                recordInstances: lodash.map(newAssociations, function (newAssociation) { return lodash.pick(newAssociation, ['fieldInstances', 'recordDefinitionName']); }),
                                nodeSide: nodeSide,
                                resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.createAndAssociate
                            }, instancesGroup[0].rolesConfig));
                        });
                    }
                    if (!lodash.isEmpty(associationGroups.deleted)) {
                        result.push({
                            associationDefinitionName: associationDefinitionName,
                            recordInstanceIds: lodash.map(associationGroups.deleted, 'id'),
                            nodeSide: nodeSide,
                            resourceType: RX_RECORD_INSTANCE.association.operationResourceTypes.disassociate
                        });
                    }
                    if (!lodash.isEmpty(associationGroups.extensions)) {
                        var extensionRecordInstance = associationGroups.extensions[0];
                        result.push({
                            associationDefinitionName: associationDefinitionName,
                            recordInstances: [_this.prepareAssociatedRecordInstanceForSaving(extensionRecordInstance)],
                            nodeSide: nodeSide,
                            resourceType: extensionRecordInstance.isNewInstance
                                ? RX_RECORD_INSTANCE.association.operationResourceTypes.createAndAssociate
                                : RX_RECORD_INSTANCE.association.operationResourceTypes.update
                        });
                    }
                });
            }, []);
            return lodash.sortBy(associationPayload, function (associationData) {
                // DISASSOCIATE operations must be at the beginning
                return associationData.operation === 'ASSOCIATE';
            });
        };
        RxRecordInstanceService.prototype.prepareAssociatedRecordInstanceForSaving = function (recordInstance) {
            var recordInstanceClone = this.prepareRecordInstance(recordInstance);
            recordInstanceClone.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id] =
                recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id];
            // todo ychubar fix typings
            delete recordInstanceClone.isNewInstance;
            return recordInstanceClone;
        };
        RxRecordInstanceService.prototype.createInstanceFromDataPageRow = function (dataPageRow, recordDefinition) {
            var plainRecordInstance = this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance(dataPageRow);
            plainRecordInstance.recordDefinitionName = recordDefinition.name;
            lodash.forEach(plainRecordInstance.fieldInstances, function (fieldInstance, fieldId) {
                var fieldDefinition = lodash.find(recordDefinition.fieldDefinitions, { id: Number(fieldId) }) || {};
                if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedCharacter) {
                    fieldInstance.resourceType = RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance;
                }
                // normalize record instance fields
                if (!lodash.isNull(fieldInstance.value)) {
                    if (lodash.isNumber(fieldInstance.value) &&
                        lodash.includes([RX_RECORD_DEFINITION.resourceTypes.boolean, RX_RECORD_DEFINITION.resourceTypes.selection], fieldDefinition.resourceType)) {
                        fieldInstance.value = String(fieldInstance.value);
                    }
                }
            });
            return new RecordInstance(recordDefinition, plainRecordInstance, this.injector);
        };
        return RxRecordInstanceService;
    }());
    RxRecordInstanceService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceService, deps: [{ token: i1__namespace.HttpClient }, { token: RxRecordDefinitionCacheService }, { token: RxRecordInstanceUtilsService }, { token: i0__namespace.Injector }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordInstanceService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.HttpClient }, { type: RxRecordDefinitionCacheService }, { type: RxRecordInstanceUtilsService }, { type: i0__namespace.Injector }, { type: i0__namespace.NgZone }]; } });

    var RxRecordInstanceUpdateService = /** @class */ (function () {
        function RxRecordInstanceUpdateService(rxRecordInstanceService, rxUtilityModalsService) {
            this.rxRecordInstanceService = rxRecordInstanceService;
            this.rxUtilityModalsService = rxUtilityModalsService;
        }
        RxRecordInstanceUpdateService.prototype.execute = function (recordInstance) {
            var _this = this;
            return this.rxRecordInstanceService
                .save(recordInstance)
                .pipe(operators.catchError(function (error) { return _this.handleModifiedInstanceError(error, recordInstance); }));
        };
        RxRecordInstanceUpdateService.prototype.handleModifiedInstanceError = function (error, recordInstance) {
            var _this = this;
            if (error.status === i2.RX_ERROR_HANDLING.optimisticLockErrorHttpStatus) {
                return rxjs.from(this.rxUtilityModalsService.confirmExternalChange(error.error[0].messageText)).pipe(operators.switchMap(function (isConfirmed) {
                    if (isConfirmed) {
                        return _this.rxRecordInstanceService.save(recordInstance, {
                            headers: {
                                'Override-Optimistic-Lock': 'true'
                            }
                        });
                    }
                    else {
                        return rxjs.throwError(error);
                    }
                }));
            }
            else {
                return rxjs.throwError(error);
            }
        };
        return RxRecordInstanceUpdateService;
    }());
    RxRecordInstanceUpdateService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceUpdateService, deps: [{ token: RxRecordInstanceService }, { token: i2__namespace$1.RxUtilityModalsService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxRecordInstanceUpdateService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceUpdateService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordInstanceUpdateService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxRecordInstanceService }, { type: i2__namespace$1.RxUtilityModalsService }]; } });

    var RxFieldDefinitionService = /** @class */ (function () {
        function RxFieldDefinitionService(rxOverlayService) {
            this.rxOverlayService = rxOverlayService;
        }
        RxFieldDefinitionService.prototype.isSystemField = function (fieldDefinition) {
            return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.fieldOption) === RX_RECORD_DEFINITION.fieldOptions.system;
        };
        RxFieldDefinitionService.prototype.isRequiredField = function (fieldDefinition) {
            return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.fieldOption) === RX_RECORD_DEFINITION.fieldOptions.required;
        };
        RxFieldDefinitionService.prototype.isPassword = function (fieldDefinition) {
            return lodash.includes(RX_RECORD_DEFINITION.passwordFieldIds, fieldDefinition.id);
        };
        RxFieldDefinitionService.prototype.isSecured = function (fieldDefinition) {
            return fieldDefinition.shouldPersistHashed || fieldDefinition.shouldPersistEncrypted;
        };
        RxFieldDefinitionService.prototype.isReadOnly = function (fieldDefinition) {
            return this.isSystemField(fieldDefinition) || this.isInheritedField(fieldDefinition);
        };
        RxFieldDefinitionService.prototype.isInheritedField = function (fieldDefinition) {
            return fieldDefinition.hasOwnProperty('isInherited') && fieldDefinition.isInherited;
        };
        RxFieldDefinitionService.prototype.isPropertiesCustomizationEnabled = function (fieldDefinition) {
            return (this.isTransient(fieldDefinition) ||
                this.rxOverlayService.isCustomizationEnabled('allowOtherPropertiesOverlay', fieldDefinition));
        };
        RxFieldDefinitionService.prototype.isTransient = function (fieldDefinition) {
            return lodash.isUndefined(fieldDefinition.lastUpdateTime);
        };
        RxFieldDefinitionService.prototype.isOverlayMode = function (fieldDefinition) {
            var overlayGroupId = fieldDefinition.overlayGroupId;
            var overlayDescriptor = fieldDefinition.overlayDescriptor || { parentOverlayGroupId: null };
            return (this.rxOverlayService.getOverlayOperation(overlayGroupId, overlayDescriptor.parentOverlayGroupId) !==
                i2.RX_OVERLAY.operationTypes.createdInThisOverlayGroup);
        };
        // Is field ID in a range reserved by BMC
        RxFieldDefinitionService.prototype.isReservedField = function (fieldDefinition, skipValidate) {
            if (skipValidate === void 0) { skipValidate = false; }
            // if (isNumber(fieldDefinition.id)) {
            if (!skipValidate) {
                return this.isExternalRecordField(fieldDefinition)
                    ? lodash.includes(RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds, fieldDefinition.id)
                    : fieldDefinition.id <= RX_RECORD_DEFINITION.AR_MAX_RESERVED_FIELD_ID;
            }
            else {
                return false;
            }
        };
        RxFieldDefinitionService.prototype.isPermissionsCustomizationEnabled = function (fieldDefinition) {
            return (this.isTransient(fieldDefinition) ||
                this.rxOverlayService.isCustomizationEnabled('allowPermissionsOverlay', fieldDefinition));
        };
        RxFieldDefinitionService.prototype.isSortable = function (fieldDefinition) {
            // Records cannot be sorted by a field with unlimited length (maxLength = 0), or by a field longer than 1000 characters.
            // This applies to character and localized character fields.
            // Sorting is allowed for fields with unspecified length.
            return (!lodash.isNumber(fieldDefinition.maxLength) ||
                lodash.inRange(fieldDefinition.maxLength, 1, RX_RECORD_DEFINITION.sortableCharacterFieldMaxLength + 1));
        };
        RxFieldDefinitionService.prototype.isSearchable = function (fieldDefinition, recordDefinition) {
            return (lodash.includes([RX_RECORD_DEFINITION.dataTypes.character.resourceType, RX_RECORD_DEFINITION.dataTypes.attachment.resourceType], fieldDefinition.resourceType) &&
                !this.isPassword(fieldDefinition) &&
                !this.isSecured(fieldDefinition) &&
                !this.isReadOnly(fieldDefinition) &&
                this.isPropertiesCustomizationEnabled(fieldDefinition));
        };
        RxFieldDefinitionService.prototype.isJoinedField = function (fieldDefinition) {
            return this.isJoinRecordField(fieldDefinition) && !this.isCoreField(fieldDefinition);
        };
        RxFieldDefinitionService.prototype.isCoreField = function (fieldDefinition) {
            var coreFieldIds = RX_RECORD_DEFINITION.arCoreFieldIds;
            if (this.isJoinRecordField(fieldDefinition)) {
                coreFieldIds = RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds;
            }
            else if (this.isExternalRecordField(fieldDefinition)) {
                coreFieldIds = RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds;
            }
            return lodash.includes(coreFieldIds, fieldDefinition.id);
        };
        RxFieldDefinitionService.prototype.isExternalRecordField = function (fieldDefinition) {
            return lodash.get(fieldDefinition, 'fieldMapping.resourceType') === RX_RECORD_DEFINITION.externalFieldMapping;
        };
        RxFieldDefinitionService.prototype.canBeAssociatedDisplayField = function (fieldDefinition) {
            return ((this.isReservedField(fieldDefinition) || !this.isTransient(fieldDefinition)) &&
                (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character ||
                    fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedCharacter) &&
                RX_RECORD_DEFINITION.coreFieldIds.id !== fieldDefinition.id);
        };
        RxFieldDefinitionService.prototype.isJoinRecordField = function (fieldDefinition) {
            return lodash.get(fieldDefinition, 'fieldMapping.resourceType') === RX_RECORD_DEFINITION.joinFieldMapping;
        };
        RxFieldDefinitionService.prototype.isDataProviderIdField = function (fieldDefinition, recordDefinition) {
            var isCustomRecordDefinition = (recordDefinition === null || recordDefinition === void 0 ? void 0 : recordDefinition.type) === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom;
            return isCustomRecordDefinition && fieldDefinition.id === RX_RECORD_DEFINITION.specialFieldIds.dataProviderId;
        };
        RxFieldDefinitionService.prototype.isFieldInUserOverlay = function (fieldDefinition) {
            return (!fieldDefinition.lastUpdateTime ||
                this.rxOverlayService.getUserDefaultOverlayGroupId() === fieldDefinition.overlayGroupId);
        };
        return RxFieldDefinitionService;
    }());
    RxFieldDefinitionService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionService, deps: [{ token: i2__namespace.RxOverlayService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxFieldDefinitionService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxFieldDefinitionService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: i2__namespace.RxOverlayService }]; } });

    var RxLocaleService = /** @class */ (function () {
        function RxLocaleService(rxRecordInstanceDataPageService) {
            this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        }
        RxLocaleService.prototype.getLocales = function () {
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
                    .pipe(operators.shareReplay(1));
            }
            return this.locales;
        };
        return RxLocaleService;
    }());
    RxLocaleService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocaleService, deps: [{ token: RxRecordInstanceDataPageService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RxLocaleService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocaleService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxLocaleService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: RxRecordInstanceDataPageService }]; } });

    var RxRecordDefinitionResourceTypePipe = /** @class */ (function () {
        function RxRecordDefinitionResourceTypePipe() {
        }
        RxRecordDefinitionResourceTypePipe.prototype.transform = function (value) {
            var _a;
            var resourceType = RX_RECORD_DEFINITION.resourceTypesByFullName[value];
            return ((_a = RX_RECORD_DEFINITION.dataTypes[resourceType]) === null || _a === void 0 ? void 0 : _a.displayName) || '';
        };
        return RxRecordDefinitionResourceTypePipe;
    }());
    RxRecordDefinitionResourceTypePipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionResourceTypePipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxRecordDefinitionResourceTypePipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionResourceTypePipe, name: "rxRecordDefinitionResourceType" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionResourceTypePipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxRecordDefinitionResourceType'
                    }]
            }] });

    var RxRecordDefinitionResourceTypePipeModule = /** @class */ (function () {
        function RxRecordDefinitionResourceTypePipeModule() {
        }
        return RxRecordDefinitionResourceTypePipeModule;
    }());
    RxRecordDefinitionResourceTypePipeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionResourceTypePipeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxRecordDefinitionResourceTypePipeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionResourceTypePipeModule, declarations: [RxRecordDefinitionResourceTypePipe], exports: [RxRecordDefinitionResourceTypePipe] });
    RxRecordDefinitionResourceTypePipeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionResourceTypePipeModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionResourceTypePipeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxRecordDefinitionResourceTypePipe],
                        exports: [RxRecordDefinitionResourceTypePipe]
                    }]
            }] });

    var RxRecordDefinitionFieldOptionPipe = /** @class */ (function () {
        function RxRecordDefinitionFieldOptionPipe(translateService) {
            this.translateService = translateService;
        }
        RxRecordDefinitionFieldOptionPipe.prototype.transform = function (value) {
            var fieldOption;
            if (value === RX_RECORD_DEFINITION.fieldOptions.required) {
                fieldOption = this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label');
            }
            else if (value === RX_RECORD_DEFINITION.fieldOptions.optional) {
                fieldOption = this.translateService.instant('com.bmc.arsys.rx.client.common.no.label');
            }
            else if (value === RX_RECORD_DEFINITION.fieldOptions.system) {
                fieldOption = this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label') + " (" + this.translateService.instant('com.bmc.arsys.rx.client.field-definition.type.system.label') + ")";
            }
            return fieldOption;
        };
        return RxRecordDefinitionFieldOptionPipe;
    }());
    RxRecordDefinitionFieldOptionPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionFieldOptionPipe, deps: [{ token: i1__namespace$2.TranslateService }], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    RxRecordDefinitionFieldOptionPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionFieldOptionPipe, name: "rxRecordDefinitionFieldOption" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionFieldOptionPipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'rxRecordDefinitionFieldOption'
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$2.TranslateService }]; } });

    var RxRecordDefinitionFieldOptionPipeModule = /** @class */ (function () {
        function RxRecordDefinitionFieldOptionPipeModule() {
        }
        return RxRecordDefinitionFieldOptionPipeModule;
    }());
    RxRecordDefinitionFieldOptionPipeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionFieldOptionPipeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    RxRecordDefinitionFieldOptionPipeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionFieldOptionPipeModule, declarations: [RxRecordDefinitionFieldOptionPipe], exports: [RxRecordDefinitionFieldOptionPipe] });
    RxRecordDefinitionFieldOptionPipeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionFieldOptionPipeModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0__namespace, type: RxRecordDefinitionFieldOptionPipeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [RxRecordDefinitionFieldOptionPipe],
                        exports: [RxRecordDefinitionFieldOptionPipe]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RX_RECORD_DEFINITION = RX_RECORD_DEFINITION;
    exports.RX_RECORD_INSTANCE = RX_RECORD_INSTANCE;
    exports.RecordInstance = RecordInstance;
    exports.RxFieldDefinitionService = RxFieldDefinitionService;
    exports.RxLocaleService = RxLocaleService;
    exports.RxRecordDefinitionCacheService = RxRecordDefinitionCacheService;
    exports.RxRecordDefinitionDataPageService = RxRecordDefinitionDataPageService;
    exports.RxRecordDefinitionFieldOptionPipe = RxRecordDefinitionFieldOptionPipe;
    exports.RxRecordDefinitionFieldOptionPipeModule = RxRecordDefinitionFieldOptionPipeModule;
    exports.RxRecordDefinitionInheritanceDataPageService = RxRecordDefinitionInheritanceDataPageService;
    exports.RxRecordDefinitionResourceTypePipe = RxRecordDefinitionResourceTypePipe;
    exports.RxRecordDefinitionResourceTypePipeModule = RxRecordDefinitionResourceTypePipeModule;
    exports.RxRecordDefinitionService = RxRecordDefinitionService;
    exports.RxRecordInstanceDataPageService = RxRecordInstanceDataPageService;
    exports.RxRecordInstanceService = RxRecordInstanceService;
    exports.RxRecordInstanceUpdateService = RxRecordInstanceUpdateService;
    exports.RxRecordInstanceUtilsService = RxRecordInstanceUtilsService;
    exports.UploaderService = UploaderService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform-record-api.umd.js.map
