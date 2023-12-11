import { every, includes, map, size } from 'lodash';
const expressionFunctions = [
    {
        name: 'SAME',
        category: 'Array',
        description: 'Returns true if all values in array are the same, else false.',
        parameters: [
            {
                name: 'array',
                description: 'The array to inspect.'
            }
        ]
    },
    {
        name: 'INCLUDES',
        category: 'Array',
        description: 'Returns true if value is found in array, else false.',
        parameters: [
            {
                name: 'array',
                description: 'The array to inspect.'
            },
            {
                name: 'value',
                description: 'The value to search for.'
            }
        ]
    },
    {
        name: 'SIZE',
        category: 'Array',
        description: 'Gets the size of array.',
        parameters: [
            {
                name: 'array',
                description: 'The array to inspect.'
            }
        ]
    }
];
export const RX_EXPRESSION_FUNCTIONS = expressionFunctions.map((descriptor) => {
    const params = map(descriptor.parameters, 'name').join(', ');
    return Object.assign(Object.assign({}, descriptor), { signature: `${descriptor.name}(${params})` });
});
export const RX_SUPPORTED_FUNCTION = {
    SAME: (collection) => every(collection, (value) => value === collection[0]),
    INCLUDES: (collection, value) => includes(collection, value),
    SIZE: (collection) => size(collection)
};
//# sourceMappingURL=expression-functions.constant.js.map