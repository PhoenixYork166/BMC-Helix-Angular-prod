import { ExpressionOperator } from '../expression-operator/expression-operator.enum';
export var ExpressionOperatorGroup;
(function (ExpressionOperatorGroup) {
    ExpressionOperatorGroup["All"] = "all";
    ExpressionOperatorGroup["AllServer"] = "allServer";
    ExpressionOperatorGroup["AllClient"] = "allClient";
    ExpressionOperatorGroup["Math"] = "math";
    ExpressionOperatorGroup["MathClient"] = "mathClient";
})(ExpressionOperatorGroup || (ExpressionOperatorGroup = {}));
const allOperatorsMap = new Map(Object.values(ExpressionOperator).map((value) => [
    value,
    {
        displayValue: value === ExpressionOperator.NullExpression ? 'NULL' : value,
        value
    }
]));
const allOperatorRows = [
    [
        allOperatorsMap.get(ExpressionOperator.LeftGrouping),
        allOperatorsMap.get(ExpressionOperator.RightGrouping),
        allOperatorsMap.get(ExpressionOperator.DoubleQuote),
        allOperatorsMap.get(ExpressionOperator.Add),
        allOperatorsMap.get(ExpressionOperator.Subtract),
        allOperatorsMap.get(ExpressionOperator.Multiply),
        allOperatorsMap.get(ExpressionOperator.Divide),
        allOperatorsMap.get(ExpressionOperator.Remainder)
    ],
    [
        allOperatorsMap.get(ExpressionOperator.GreaterThan),
        allOperatorsMap.get(ExpressionOperator.LessThan),
        allOperatorsMap.get(ExpressionOperator.Equal),
        allOperatorsMap.get(ExpressionOperator.NotEqual),
        allOperatorsMap.get(ExpressionOperator.GreaterThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.LessThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.Like)
    ],
    [
        allOperatorsMap.get(ExpressionOperator.And),
        allOperatorsMap.get(ExpressionOperator.Or),
        allOperatorsMap.get(ExpressionOperator.Not),
        allOperatorsMap.get(ExpressionOperator.NullExpression)
    ]
];
const allClientOperatorRows = [
    [...allOperatorRows[0]],
    [
        allOperatorsMap.get(ExpressionOperator.GreaterThan),
        allOperatorsMap.get(ExpressionOperator.LessThan),
        allOperatorsMap.get(ExpressionOperator.Equal),
        allOperatorsMap.get(ExpressionOperator.NotEqual),
        allOperatorsMap.get(ExpressionOperator.GreaterThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.LessThanOrEqual),
        allOperatorsMap.get(ExpressionOperator.Contains)
    ],
    [
        allOperatorsMap.get(ExpressionOperator.And),
        allOperatorsMap.get(ExpressionOperator.Or),
        allOperatorsMap.get(ExpressionOperator.Not),
        allOperatorsMap.get(ExpressionOperator.Null)
    ]
];
const mathOperatorRow = [
    allOperatorsMap.get(ExpressionOperator.LeftGrouping),
    allOperatorsMap.get(ExpressionOperator.RightGrouping),
    allOperatorsMap.get(ExpressionOperator.DoubleQuote),
    allOperatorsMap.get(ExpressionOperator.Add),
    allOperatorsMap.get(ExpressionOperator.Subtract),
    allOperatorsMap.get(ExpressionOperator.Multiply),
    allOperatorsMap.get(ExpressionOperator.Divide),
    allOperatorsMap.get(ExpressionOperator.Remainder)
];
export const ExpressionOperatorRowsByGroup = new Map([
    [ExpressionOperatorGroup.All, allOperatorRows],
    [ExpressionOperatorGroup.AllServer, allOperatorRows],
    [ExpressionOperatorGroup.AllClient, allClientOperatorRows],
    [ExpressionOperatorGroup.Math, [[...mathOperatorRow, allOperatorsMap.get(ExpressionOperator.NullExpression)]]],
    [ExpressionOperatorGroup.MathClient, [[...mathOperatorRow, allOperatorsMap.get(ExpressionOperator.Null)]]]
]);
//# sourceMappingURL=expression-configurator-operator.types.js.map