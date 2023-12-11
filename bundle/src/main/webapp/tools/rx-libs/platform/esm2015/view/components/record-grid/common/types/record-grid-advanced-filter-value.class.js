import { isNil } from 'lodash';
import { AdvancedFilterDataTypesConfigsService } from '@bmc-ux/adapt-angular';
export class RxRecordGridAdvancedFilterValue {
    constructor(value, namedOptions = []) {
        this.namedOptions = [];
        this.filterValue = value;
        if (Array.isArray(namedOptions)) {
            this.namedOptions = namedOptions;
        }
    }
    get length() {
        return ((Array.isArray(this.filterValue) ? this.filterValue.length : isNil(this.filterValue) ? 0 : 1) +
            this.namedOptions.length);
    }
    static isEmpty(item) {
        return item instanceof RxRecordGridAdvancedFilterValue && !item.length;
    }
    static isEmptyWithRange(item) {
        return (item instanceof RxRecordGridAdvancedFilterValue &&
            !item.namedOptions.length &&
            AdvancedFilterDataTypesConfigsService.isEmptyOnEmptyValues(item.filterValue));
    }
}
//# sourceMappingURL=record-grid-advanced-filter-value.class.js.map