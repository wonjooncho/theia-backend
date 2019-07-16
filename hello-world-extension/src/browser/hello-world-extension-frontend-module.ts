import { ContainerModule } from 'inversify';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { MyService, MyServicePath } from '../common';
import { HelloWorldExtensionCommandContribution, HelloWorldExtensionMenuContribution } from './hello-world-extension-contribution';

export default new ContainerModule(bind => {
    bind(CommandContribution).to(HelloWorldExtensionCommandContribution);
    bind(MenuContribution).to(HelloWorldExtensionMenuContribution);
    bind(MyService).toDynamicValue(context => WebSocketConnectionProvider.createProxy(context.container, MyServicePath)).inSingletonScope();
});