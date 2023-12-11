export var ImageAlignment;
(function (ImageAlignment) {
    ImageAlignment["Left"] = "left";
    ImageAlignment["Center"] = "center";
    ImageAlignment["Right"] = "right";
})(ImageAlignment || (ImageAlignment = {}));
export const RX_IMAGE_ALIGNMENT_OPTIONS = [
    {
        id: ImageAlignment.Left,
        name: 'Left'
    },
    {
        id: ImageAlignment.Center,
        name: 'Center'
    },
    {
        id: ImageAlignment.Right,
        name: 'Right'
    }
];
export const RX_IMAGE_ALIGNMENT_STYLES = {
    [ImageAlignment.Left]: 'justify-content-start',
    [ImageAlignment.Center]: 'justify-content-center',
    [ImageAlignment.Right]: 'justify-content-end'
};
//# sourceMappingURL=image.types.js.map