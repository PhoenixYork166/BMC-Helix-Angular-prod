import { Observable } from 'rxjs';
import { RuntimeViewModelApi } from '../../../runtime-view-model-api.class';
import { RuntimeLayoutOutlet } from '../../../layout';
export interface IChildComponentData<T = any> {
    config: Observable<T>;
    guid: string;
    runtimeViewModelApi: RuntimeViewModelApi;
    factory: any;
    outlets: RuntimeLayoutOutlet[];
}
