import { injectable } from 'inversify';
import { MyService } from '../common';

@injectable()
export class MyServiceImpl implements MyService {

    async getEnvVariables(): Promise<Readonly<{ [key:string]: string | undefined }>> {
        return process.env;
    }

}