import { RX_VIEW_DEFINITION } from '../domain/view-definition.constant';
import { reduce } from 'lodash';
import { getLayoutChecksum, RX_VIEW_LAYOUTS } from './view-layout.types';
// @dynamic
export class RxViewLayout {
    static getViewLayoutForDefaultOutlet(children) {
        return {
            outlets: [this.getOutlet(RX_VIEW_DEFINITION.defaultOutletName, children)]
        };
    }
    static getEmptyViewLayoutForOutletNames(list) {
        return {
            outlets: list.map(({ name }) => this.getOutlet(name))
        };
    }
    static getEmptyViewLayoutForOutlets(outlets) {
        return {
            outlets: outlets.map((outlet) => {
                return Object.assign(Object.assign({}, outlet), { columns: outlet.columns.map((column) => (Object.assign(Object.assign({}, column), { children: [] }))) });
            })
        };
    }
    static getOutlet(name = RX_VIEW_DEFINITION.defaultOutletName, children = []) {
        return {
            name,
            columns: [
                {
                    children
                }
            ]
        };
    }
    static getViewLayoutChildGuids(layout, outletName) {
        return reduce(layout.outlets, (guids, outlet) => {
            if (!outletName || outletName === outlet.name) {
                outlet.columns.forEach((column) => {
                    guids.push(...column.children);
                });
            }
            return guids;
        }, []);
    }
    static hasChild(layout, guid) {
        return Boolean(layout.outlets.find((outlet) => this.outletHasChild(outlet, guid)));
    }
    static outletHasChild(outlet, guid) {
        return Boolean(outlet.columns.find((column) => column.children.includes(guid)));
    }
    static getViewLayoutTemplate(layoutTemplate) {
        const layoutItem = RX_VIEW_LAYOUTS.find((item) => item.id === layoutTemplate) ||
            RX_VIEW_LAYOUTS.find((item) => item.id === RX_VIEW_DEFINITION.defaultLayoutTemplateId);
        return layoutItem.layout;
    }
    static getLayoutName(layout) {
        const checksum = getLayoutChecksum(layout);
        const layoutTemplate = RX_VIEW_LAYOUTS.find((item) => item.checksum === checksum);
        return layoutTemplate ? layoutTemplate.label : '';
    }
    static removeChildFromLayout(layout, guidToRemove) {
        return {
            outlets: layout.outlets.map((outlet) => (Object.assign(Object.assign({}, outlet), { columns: outlet.columns.map((column) => (Object.assign(Object.assign({}, column), { children: column.children.filter((childGuid) => childGuid !== guidToRemove) }))) })))
        };
    }
}
//# sourceMappingURL=view-layout.class.js.map