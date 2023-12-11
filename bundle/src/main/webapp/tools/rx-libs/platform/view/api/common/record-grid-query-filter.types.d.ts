export declare enum RecordGridFilterDataLogic {
    And = "and",
    Or = "or"
}
export declare enum RecordGridFilterOperator {
    Eq = "eq",
    Gte = "gte",
    Lte = "lte",
    Like = "like",
    Ne = "ne",
    Lt = "lt",
    Gt = "gt",
    In = "in"
}
export interface IRecordGridFilterColumnValue<TValue = any | IRecordGridNamedFilterOption> {
    [field: string]: TValue;
}
export declare const RecordGridNamedFilterOptionKey = "namedFilterOption";
export interface IRecordGridNamedFilterOption {
    [RecordGridNamedFilterOptionKey]: string;
}
export interface IRecordGridFilterOperator {
    /** RecordGridFilterOperator: 'gte', 'eq', etc. In predefined filter presets it has guid for component definition */
    [operator: string]: IRecordGridFilterColumnValue | string;
}
export declare type IRecordGridFilterDataOrOperator = IRecordGridFilterOperator | IRecordGridFilterData;
/**
 * Filter example:
 *
 * {
 *   "and": [
 *     {
 *       "or": [
 *         {
 *           "eq": {
 *             "textField1": "foo"
 *           }
 *         },
 *         {
 *           "eq": {
 *             "textField1": "bar"
 *           }
 *         }
 *       ]
 *     },
 *     {
 *       "and": [
 *         {
 *           "gte": {
 *             "numberField2": -1e+26
 *           }
 *         },
 *         {
 *           "lte": {
 *             "numberField2": 1e+26
 *           }
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export interface IRecordGridFilterData {
    [RecordGridFilterDataLogic.And]?: IRecordGridFilterDataOrOperator[];
    [RecordGridFilterDataLogic.Or]?: IRecordGridFilterDataOrOperator[];
}
