class Window {
	constructor(x, y) {
		this.width = 6;
		this.height = 6;
		this.x = x;
	   	this.y = y;	

		this.isLit = Math.random() > 0.5;
	}

	render(ctx) {
		if (this.isLit) {
			ctx.fillStyle = 'yellow';
			ctx.fillRect(this.x, this.y, 6, 6);
		}
	}

}

class Building {
	constructor(x, buildingRow)  {
		this.height = getRandomInt(60,300);
		this.width = 80;
		this.x = x + buildingRow * 10;
		this.row = buildingRow;

		this.y = ctxheight - 30 - this.height + 5 * this.row;

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
		let buildingColors = ['silver','grey','black'];
		ctx.fillStyle = buildingColors[this.row];
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
	var skygrad = ctx.createLinearGradient(0, 0, 0, ctxheight);
	skygrad.addColorStop(1, '#30cfd0');
	skygrad.addColorStop(0, '#330867');

	ctx.fillStyle = skygrad;

	ctx.fillRect(0, 0, ctxwidth, ctxheight - 40);

	ctx.fillStyle = '#222';
	ctx.fillRect(0, ctxheight - 40, ctxwidth, 40);

	var buildingGrid = [];
	
	for (var buildingRow = 0; buildingRow < 3; buildingRow ++) {
		buildingGrid[buildingRow] = [];
		for (let i = 0; i < ctxwidth / 85; i++) {
			buildingGrid[buildingRow][i] = 
				Math.random() > 0.2 ?
				new Building(15 + i * 85, buildingRow) : null;
		}
	}

	
	for (var buildingRow of buildingGrid) {
		for (var building of buildingRow) {
			if (building) { building.render(ctx); }
		}
	}
}
