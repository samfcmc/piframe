import {Component} from '@angular/core';
import {Dashboard} from './dashboard/dashboard.component';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import {ROUTES} from './app.routes';

@Component({
    selector: 'app',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [Dashboard, ROUTER_DIRECTIVES]
})
@Routes(ROUTES)
export class AppComponent { 
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }
}