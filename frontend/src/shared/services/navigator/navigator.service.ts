import {Injectable, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class NavigatorService {
    protected queryParams:any = {};

    constructor(@Inject(ActivatedRoute) protected route:ActivatedRoute,
                @Inject(Router) protected router:Router) {
        this.route.queryParams.subscribe((queryParams) => {
            Object.keys(queryParams).forEach((key) => {
                this.queryParams[key] = queryParams[key];
            });
        });
    }

    setQueryParam(name:string, value:any) {
        this.queryParams[name] = value;
        this.navigate([], {queryParams: this.queryParams});
    }

    unsetQueryParam(name:string) {
        delete this.queryParams[name];
        this.navigate([], {queryParams: this.queryParams});
    }

    navigate(route:any = [], extras:any = {}) {
        return new Promise((resolve, reject) => {
            this.router.navigate(route, extras);
            resolve();
        });
    }
}
