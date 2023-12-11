import { ContainerRowWrap } from './container.types';
import { RxViewComponentType } from '@helix/platform/view/api';
export const RX_CONTAINER = {
    type: RxViewComponentType.Container,
    maxColumnSpan: 12,
    rowWrapOptions: {
        xs: {
            id: ContainerRowWrap.Xs,
            name: 'Extra Small (No wrapping)'
        },
        sm: {
            id: ContainerRowWrap.Sm,
            name: 'Small (576 px)'
        },
        md: {
            id: ContainerRowWrap.Md,
            name: 'Medium (768 px)'
        },
        lg: {
            id: ContainerRowWrap.Lg,
            name: 'Large (992 px)'
        },
        xl: {
            id: ContainerRowWrap.Xl,
            name: 'Extra Large (1200 px)'
        },
        xxl: {
            id: ContainerRowWrap.Xxl,
            name: 'Extra Extra Large (1600 px)'
        }
    }
};
//# sourceMappingURL=container.constant.js.map