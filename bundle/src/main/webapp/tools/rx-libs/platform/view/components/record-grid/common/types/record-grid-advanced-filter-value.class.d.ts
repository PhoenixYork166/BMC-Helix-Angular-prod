export declare class RxRecordGridAdvancedFilterValue<T = any> {
    constructor(value?: T, namedOptions?: string[]);
    get length(): number;
    namedOptions: string[];
    filterValue: T;
    title: string;
    static isEmpty(item: RxRecordGridAdvancedFilterValue | any): boolean;
    static isEmptyWithRange(item: RxRecordGridAdvancedFilterValue | any): boolean;
}
