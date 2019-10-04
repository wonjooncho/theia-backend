import { injectable, inject } from 'inversify';
import { MyService } from '../common';
import { DefaultWorkspaceServer } from '@theia/workspace/lib/node';
import * as fs from 'fs-extra';
import * as url from 'url';


@injectable()
export class MyServiceImpl implements MyService {

    constructor(@inject(DefaultWorkspaceServer) private readonly workspaceServer: DefaultWorkspaceServer) {}

    async getEnvVariables(): Promise<Readonly<{ [key:string]: string | undefined }>> {
        return process.env;
    }

    async getSettingValue(): Promise<Readonly<{ [key:string]: string | undefined }>> {
        let rootPath = await this.workspaceServer.getMostRecentlyUsedWorkspace();
        //const url = require('url');
        const configPath = url.fileURLToPath(rootPath + '/.setting-test/setting-test.json');
        
        const config = await fs.readJson(configPath);
        return config.test;
        
        /*return new Promise(async function(resole, reject) {
            const url = require('url');
            const configPath = url.fileURLToPath(rootPath + '/.setting-test/setting-test.json');
            // const config = require(configPath);
            // const config = fs.readJSONSync(configPath);
            // resole(config.test);
            
            const config = await fs.readJson(configPath);
            resole(config.test);
        });*/
    }
}