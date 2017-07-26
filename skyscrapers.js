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
	constructor(x, buildingRow) {
		this.height = getRandomInt(60,300);
		this.width = 80;
		this.x = x;
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

	update() {
		this.x -= 4;
		if (this.x < -80) { this.x = ctxwidth }
		for (var i = 0; i < this.windowGrid.length; i++) {
			for (var j = 0; j < this.windowGrid[i].length; j++) {
				this.windowGrid[i][j].x = this.x + 5 + j * 8;
				if (Math.random() < .0005) {this.windowGrid[i][j].isLit ^= true}
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

class Backdrop {
	render(ctx) {
		let skygrad = ctx.createLinearGradient(0, 0, 0, ctxheight);
		skygrad.addColorStop(1, '#30cfd0');
		skygrad.addColorStop(0, '#330867');

		ctx.fillStyle = skygrad;

		ctx.fillRect(0, 0, ctxwidth, ctxheight - 40);

		ctx.fillStyle = '#222';
		ctx.fillRect(0, ctxheight - 40, ctxwidth, 40);
	}
}

class Scene {
	constructor(origin = 0) {
		this.buildingGrid = [];
		this.origin = origin;
	
		for (var buildingRow = 0; buildingRow < 3; buildingRow ++) {
			this.buildingGrid[buildingRow] = [];
			for (let i = this.origin; i < ctxwidth / 85; i++) {
				this.buildingGrid[buildingRow][i] = 
				Math.random() > 0.2 ?
				new Building(i * 85 - buildingRow * 10, buildingRow) : null;
			}
		}

		this.backdrop = new Backdrop();
	}

	update() {
		for (var buildingRow of this.buildingGrid) {
			for (var building of buildingRow) {
				if (building) { building.update(); }
			}
		}
	}

	render(ctx) {
		this.backdrop.render(ctx);

		for (var buildingRow of this.buildingGrid) {
			for (var building of buildingRow) {
				if (building) { building.render(ctx); }
			}
		}

		this.img = new Image();
		this.img.src = canvas.toDataURL('image/png');
	}

}

class World {
	constructor() {
		this.loop = this.loop.bind(this);
		this.scene = new Scene();
		this.nextscene = new Scene(ctxwidth);
	}

	startLoop(ctx) {
		this.offset = ctxwidth;
		requestAnimationFrame(this.loop);
	}

	loop() {
		ctx.clearRect(0, 0, ctxwidth, ctxheight);
		
		if (this.offset <= 0) { 
			this.scene = this.nextscene;
			this.nextscene = new Scene(ctxwidth);	
			this.offset = ctxwidth; }

//		ctx.drawImage(this.img, this.offset - ctxwidth, 0, ctxwidth, ctxheight);
//		ctx.drawImage(this.img, this.offset, 0, ctxwidth, ctxheight);

		this.nextscene.render(ctx);
		this.scene.render(ctx);

		this.scene.update();
		this.nextscene.update();

		this.offset -= 1;

		requestAnimationFrame(this.loop);
	}
}

function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		
		return Math.floor(Math.random() * (max-min)) + min;
}

function draw() {
	ctx.clearRect(0, 0, ctxwidth, ctxheight);
	
	var world = new World();
	world.startLoop(ctx);
}
