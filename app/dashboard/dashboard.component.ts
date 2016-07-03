import {Component, DynamicComponentLoader, Injector, Input} from '@angular/core';
import {NgGrid, NgGridItem} from 'angular2-grid';
import {Test} from '../test/test';
import {GRID} from '../grid/grid';
import {Tile} from '../tiles/tile';

@Component({
	selector: 'dashboard',
	templateUrl: 'dashboard/dashboard.html',
	directives: [NgGrid, NgGridItem]
})
export class Dashboard {

	private loader: DynamicComponentLoader;
	private injector: Injector;
	private grid: Array<Tile>;

	constructor(loader: DynamicComponentLoader, injector: Injector) {
		this.loader = loader;
		this.injector = injector;
		this.grid = GRID;
	}

	ngOnInit() {
		for(var i = 0; i < this.grid.length; i++) {
			var selector: string = '.tile-content-' + i;
			var tile = this.grid[i];
			this.loader.loadAsRoot(tile.component, selector, this.injector);	
		}
	}

}