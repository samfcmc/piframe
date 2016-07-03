import {Component} from '@angular/core';
import {Tile} from '../tile'

@Component({
	templateUrl : 'tiles/frame/frame.tile.html' ,
	selector: 'frame'
})
class Frame {
	 
	 click(event: UIEvent) {
		 console.log(event);
	 }
}

export const FrameTile: Tile = {
	config: {
		sizex: 1,
		sizey: 1
	},
	component: Frame
}