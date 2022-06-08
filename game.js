const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1366;
canvas.height = 768;

var playerImage = new Image();
playerImage.src = "./source/player.png";
/*
	regen: min: 1 max: 3
	spd: min: 3 max: 5.5
	atkspd: min: 4 max: 6
*/
var player = new Player({
	src: playerImage, 
	status: {
		atk:{enable: true, attacking: false, dmg: 0, spd: 6},
		hp: {
			current: 10,
			initial: 10,
			regenerate: 0
		}, 
		mp: {
			current: 10,
			initial: 10,
			regenerate: 3
		}, 
		spd: 3,
		luck: false
	}
});

function animate() {
	window.setTimeout(() => window.requestAnimationFrame(animate), 10);
	if (!pause) {
 		ctx.drawImage(mapImage, map.x, map.y);
		player.draw();
	}
}

animate();

window.addEventListener("keydown", (e) => {
	let key = e.key.toLowerCase();
	switch(key) {
		case "w": 
		case "a":
		case "s":
		case "d": 
			control.movement[key].pressing = true; 
			break;
		case "e":
			toggle_inventory();
		break;
	}
});

window.addEventListener("keyup", (e) => {
	let key = e.key.toLowerCase();
	switch(key) {
		case "w": 
		case "a":
		case "s":
		case "d": 
			control.movement[key].pressing = false; 
		break;
	}
});

window.addEventListener("mousedown", () => {
	if (event.which == 1 && !pause) player.status.atk.enable = false;
});