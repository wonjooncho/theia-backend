import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";
import { MyService } from "../common";

export const HelloWorldExtensionCommand = {
    id: 'HelloWorldExtension.command',
    label: "Shows a message"
};

@injectable()
export class HelloWorldExtensionCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(MyService) protected readonly myService: MyService
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldExtensionCommand, {
            execute: async () => {
                //const env = await this.myService.getEnvVariables();
                //this.messageService.info('Environment variables from the server: ' + JSON.stringify(env));
                const setting = await this.myService.getSettingValue();
                this.messageService.info(setting);
            }
        });
    }
}

@injectable()
export class HelloWorldExtensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: HelloWorldExtensionCommand.id,
            label: 'Say Hello'
        });
    }
}