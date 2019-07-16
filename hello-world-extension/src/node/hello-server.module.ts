import { ContainerModule } from 'inversify';
import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core/lib/common';
import { MyService, MyServicePath } from '../common';
import { MyServiceImpl } from './my-service-impl';

export default new ContainerModule(bind => {
    bind(MyServiceImpl).toSelf().inSingletonScope();
    bind(MyService).toService(MyServiceImpl);
    bind(ConnectionHandler).toDynamicValue(context => new JsonRpcConnectionHandler(MyServicePath, () => context.container.get(MyService))).inSingletonScope();
});