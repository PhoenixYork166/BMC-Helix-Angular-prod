import { RX_VIEW_DEFINITION } from '../domain/view-definition.constant';
export var ViewLayoutRole;
(function (ViewLayoutRole) {
    ViewLayoutRole["Header"] = "header";
    ViewLayoutRole["Content"] = "content";
    ViewLayoutRole["Footer"] = "footer";
})(ViewLayoutRole || (ViewLayoutRole = {}));
export var LayoutTypes;
(function (LayoutTypes) {
    LayoutTypes["Flexible"] = "Flexible";
    LayoutTypes["Fixed"] = "Fixed";
})(LayoutTypes || (LayoutTypes = {}));
const defaultHeaderOutlet = {
    name: ViewLayoutRole.Header,
    height: 60,
    columns: [getEmptyColumn()]
};
const defaultFooterOutlet = {
    name: ViewLayoutRole.Footer,
    height: 60,
    columns: [getEmptyColumn()]
};
export const RX_VIEW_LAYOUTS = [
    {
        id: 1,
        label: 'Header and 1 Column',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet()]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 2,
        label: 'Header and 2 Columns (50/50)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(6, 6)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 3,
        label: 'Header and 2 Columns (60/40)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(7, 5)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 4,
        label: 'Header and 2 Columns (40/60)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(5, 7)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 16,
        label: 'Header and 2 Columns (70/30)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(8, 4)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 5,
        label: 'Container',
        layout: {
            outlets: [getContentOutlet()]
        },
        layoutType: LayoutTypes.Flexible
    },
    {
        id: 6,
        label: '2 Columns (50/50)',
        layout: {
            outlets: [getContentOutlet(6, 6)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 7,
        label: '2 Columns (60/40)',
        layout: {
            outlets: [getContentOutlet(7, 5)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 8,
        label: '2 Columns (40/60)',
        layout: {
            outlets: [getContentOutlet(5, 7)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 14,
        label: '2 Columns (70/30)',
        layout: {
            outlets: [getContentOutlet(8, 4)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 9,
        label: '3 Equal Columns',
        layout: {
            outlets: [getContentOutlet(4, 4, 4)]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 10,
        label: 'Header, Footer and 1 Column',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 11,
        label: 'Header, Footer and 2 Columns (50/50)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(6, 6), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 12,
        label: 'Header, Footer and 2 Columns (60/40)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(7, 5), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 13,
        label: 'Header, Footer and 2 Columns (40/60)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(5, 7), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    },
    {
        id: 15,
        label: 'Header, Footer and 2 Columns (70/30)',
        layout: {
            outlets: [defaultHeaderOutlet, getContentOutlet(8, 4), defaultFooterOutlet]
        },
        layoutType: LayoutTypes.Fixed
    }
].map((layout) => {
    layout.checksum = getLayoutChecksum(layout.layout);
    return layout;
});
export function getLayoutChecksum(layout) {
    const contentOutlet = layout.outlets.find((outlet) => outlet.name === RX_VIEW_DEFINITION.defaultOutletName);
    let checksum = layout.outlets.find((outlet) => outlet.name === ViewLayoutRole.Header) ? 'h' : '';
    checksum += layout.outlets.find((outlet) => outlet.name === ViewLayoutRole.Footer) ? 'f' : '';
    contentOutlet.columns.forEach((column) => (checksum += `c${column.span || 12}`));
    return checksum;
}
function getContentOutlet(...columnSpan) {
    return {
        name: RX_VIEW_DEFINITION.defaultOutletName,
        columns: columnSpan.length ? columnSpan.map((span) => getEmptyColumn({ span })) : [getEmptyColumn()]
    };
}
function getEmptyColumn(props) {
    return Object.assign({ children: [] }, props);
}
//# sourceMappingURL=view-layout.types.js.map