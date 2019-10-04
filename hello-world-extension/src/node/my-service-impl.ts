import { injectable, inject } from 'inversify';
import { MyService } from '../common';
import { DefaultWorkspaceServer } from '@theia/workspace/lib/node';


@injectable()
export class MyServiceImpl implements MyService {

    constructor(@inject(DefaultWorkspaceServer) private readonly workspaceServer: DefaultWorkspaceServer) {}

    async getEnvVariables(): Promise<Readonly<{ [key:string]: string | undefined }>> {
        return process.env;
    }

    async getSettingValue(): Promise<string> {
        let rootPath = await this.workspaceServer.getMostRecentlyUsedWorkspace();
        return new Promise(function(resole, reject) {
            const url = require('url');
            const configPath = url.fileURLToPath(rootPath + '/.setting-test/setting-test.json');
            const config = require(configPath);
            resole(config.test);
        });
    }
}