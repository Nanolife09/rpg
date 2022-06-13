/*
	regen: min: 1 max: 3
	spd: min: 3 max: 5.5
	atkspd: min: 4 max: 6
*/
var player = new Knight({
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

var NPCs = [
    new NPC({
        src: "source/npc/mushroom.png",
        name: "Forba",
        x: 15,
        y: 5,
        dialogue: ["hi", "hello", "how are you"],
    })
];

function animate() {
	window.setTimeout(() => window.requestAnimationFrame(animate), 10);
	if (!pause) {
 		ctx.drawImage(mapImage, map.x, map.y);
<<<<<<< Updated upstream
		// boundaries.forEach(boundary => boundary.draw());
        NPCs.forEach(NPC => NPC.draw());
=======
<<<<<<< HEAD
		boundaries.forEach(boundary => boundary.draw());
=======
		// boundaries.forEach(boundary => boundary.draw());
        NPCs.forEach(NPC => NPC.draw());
>>>>>>> da2cca8bcdb06c1d0841a675d51417ecf00b361d
>>>>>>> Stashed changes
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
		case "f":
            for (let i in NPCs) {
                let npc = NPCs[i];
                if (npc.check_interact(
                    player.position.current.x,
                    player.position.current.y,
                    player.image.tile_size)
                ) {
                    npc.interact();
                    break; // only interact with one NPC at a time
                }
                else 
                    console.log('nope')
            }
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
		case "f":
            control[key].pressed = false;
            break;
		break;
	}
});

window.onclick = () => {if (!pause) player.status.atk.enable = false};