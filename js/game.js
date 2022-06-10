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
			current: 20,
			initial: 20,
			regenerate: 3
		}, 
		spd: 10,
		luck: 0
	}
});

function animate() {
	window.setTimeout(() => window.requestAnimationFrame(animate), 10);
	if (!pause) {
 		ctx.drawImage(mapImage, map.x, map.y);
		//boundaries.forEach(boundary => boundary.draw());
		player.draw();
	}
}

animate();

window.addEventListener("keydown", (e) => {
	e.preventDefault();
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
			control[key].pressed = true; 
			break;
		case " ":
			if (!pause) player.status.atk.enable = false;
			break;
		case "1": case "2": case "3": case "4": case "5":
			use_hotbar(key);
		break;
		default:
			break;
	}
});

window.addEventListener("keyup", (e) => {
	e.preventDefault();
	let key = e.key.toLowerCase();
	switch(key) {
		case "w":  case "a": case "s": case "d": 
			control.movement[key].pressing = false; 
		break;
		case "e":
			control[key].pressed = false; 
		break;
	}
});

window.onclick = () => {if (!pause) player.status.atk.enable = false};