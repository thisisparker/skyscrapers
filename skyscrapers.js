class Window {
	constructor(x, y) {
		this.width = 6;
		this.height = 6;
		this.x = x;
	   	this.y = y;	

		this.isLit = Math.random() > 0.5;
	}

	render(ctx) {
		ctx.fillStyle = 'yellow';
		if (this.isLit) {
			ctx.fillRect(this.x, this.y, 6, 6);
		} else {
			ctx.strokeRect(this.x, this.y, 6, 6);
		}
	}

}

class Building {
	constructor(x)  {
		this.height = getRandomInt(60,300);
		this.width = 80;
		this.x = x;
		this.y = ctxheight - 40 - this.height;
		var windowRows = Math.floor(this.height / 8) - 1;
		var windowCols = Math.floor(this.width/ 8) - 1;
		this.windowGrid = [];
		for (var i = 0; i < windowRows; i++) {
			this.windowGrid[i] = [];
			for (var j = 0; j < windowCols; j++) {
				this.windowGrid[i][j] = 
					new Window(this.x + 5 + j * 8, this.y +	5 + i * 8);
			}
		}
	}

	render(ctx) {
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, this.y, this.width, this.height);

		for (var windowRow of this.windowGrid) {
			for (var win of windowRow) {
				win.render(ctx);
			}
		}
	}
}

function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		
		return Math.floor(Math.random() * (max-min)) + min;
}

function draw() {
					
	if (!canvas.getContext) {
		return;
	}


	var skygrad = ctx.createLinearGradient(0, 0, 0, ctxheight);
	skygrad.addColorStop(1, '#30cfd0');
	skygrad.addColorStop(0, '#330867');

	ctx.fillStyle = skygrad;

	ctx.fillRect(0, 0, ctxwidth, ctxheight - 40);

	ctx.fillStyle = '#222';
	ctx.fillRect(0, ctxheight - 40, ctxwidth, 40);

	var building = new Building(50);

	building.render(ctx);
//	var rows = 3;
//
//	for (var row = 0; row < rows; row++){
//		var colorarray = ['silver','gray','black'];
//
//		for (var i = 5; i < ctxwidth; i += 85) {
//			var buildheight = getRandomInt(60, 300);
//			var buildx = i + row * 10;
//			ctx.fillStyle = colorarray[row];
//
//			if (Math.random() > 0.2) {
//
//				ctx.fillRect(buildx, 
//						ctxheight - buildheight - 30 + row * 5, 
//						80,	buildheight);
//
//				// Paint on the windows
//
//				A
//					}
//					}
//				}
//			}
//		}
//	}
}
