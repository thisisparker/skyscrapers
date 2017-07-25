function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		
		return Math.floor(Math.random() * (max-min)) + min;
}

function draw() {
	var canvas = document.getElementById('window-view');
					
	if (!canvas.getContext) {
		return;
	}

	var ctx = canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	ctxheight = ctx.canvas.height;
	ctxwidth = ctx.canvas.width;

	var skygrad = ctx.createLinearGradient(0, 0, 0, ctxheight);
	skygrad.addColorStop(1, '#30cfd0');
	skygrad.addColorStop(0, '#330867');

	ctx.fillStyle = skygrad;

	ctx.fillRect(0, 0, ctxwidth, ctxheight - 40);

	ctx.fillStyle = '#222';
	ctx.fillRect(0, ctxheight - 40, ctxwidth, 40);

	var rows = 3;

	for (var row = 0; row < rows; row++){
		var colorarray = ['silver','gray','black'];

		for (var i = 5; i < ctxwidth; i += 85) {
			var buildheight = getRandomInt(60, 300);
			var buildx = i + row * 10;
			ctx.fillStyle = colorarray[row];

			if (Math.random() > 0.2) {

				ctx.fillRect(buildx, 
						ctxheight - buildheight - 30 + row * 5, 
						80,	buildheight);

				// Paint on the windows

				var windowrows = Math.floor(buildheight / 8) - 1;

				for (var j = 0; j < windowrows; j++) {
					for (var k = 5; k < 70; k += 8) {
						if (Math.random() > 0.5) {
							ctx.fillStyle = 'yellow';
							ctx.fillRect(buildx + k,
								ctxheight - 30 - buildheight + 8 * j + 4 +
								row * 5,
								6, 6);
						}
					}
				}
			}
		}
	}
}



