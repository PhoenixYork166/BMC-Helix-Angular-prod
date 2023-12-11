import { RX_APPLICATION } from './application.constant';
import { isEqual } from 'lodash';
// Customize shouldReuseRoute, use default implementation for other methods.
export class ShellRouteReuseStrategy {
    shouldReuseRoute(current, next) {
        var _a, _b, _c, _d, _e, _f;
        if (((_a = next.data) === null || _a === void 0 ? void 0 : _a.routeReuseStrategy) === RX_APPLICATION.routeReuseStrategies.checkParentParams &&
            current.parent &&
            current.parent.routeConfig === ((_b = next.parent) === null || _b === void 0 ? void 0 : _b.routeConfig)) {
            return isEqual(next.parent.params, current.parent.params);
        }
        else {
            return (current.routeConfig === next.routeConfig ||
                (((_d = (_c = current.routeConfig) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.routerGroup) &&
                    current.routeConfig.data.routerGroup === ((_f = (_e = next.routeConfig) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.routerGroup)));
        }
    }
    shouldAttach(route) {
        return false;
    }
    shouldDetach(route) {
        return false;
    }
    retrieve(route) {
        return null;
    }
    store(route, handle) { }
}
//# sourceMappingURL=shell-route-reuse-strategy.class.js.map