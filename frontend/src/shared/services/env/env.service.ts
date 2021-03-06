import {Injectable} from '@angular/core';
import {env} from '../../../../env';

@Injectable()
export class EnvService {
    protected env:any;

    constructor() {
        this.env = env;
    }

    get(property:string) {
        return this.env.hasOwnProperty(property) ? this.env[property] : null;
    }
}
