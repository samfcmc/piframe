import {Component} from '@angular/core';
import {Dashboard} from './dashboard/dashboard';

@Component({
    selector: 'my-app',
    template: '<dashboard></dashboard>',
    directives: [Dashboard] 
})
export class AppComponent { 

}