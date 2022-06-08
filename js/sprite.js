let mp_text = document.querySelectorAll(".mp-text");

var mapImage = new Image();
mapImage.src = "./source/map.png";

var map = {
	x: -280,
	y: -290,
	width: 6400, 
	height: 5120,
};

var control = {
	movement: {
		"w": {pressing: false, word: "w"},
		"a": {pressing: false, word: "a"},
		"s": {pressing: false, word: "s"},
		"d": {pressing: false, word: "d"},
	},
	"e": {pressed: false, word: "e"}
};

var key_pressing = [];

var pause = false;

var tl = gsap.timeline();

class Player {
	constructor({src, status}) {
		this.image = {
			src: src, 
			frame: 5, 
			tile_size: 64
		};
		this.position = {
			current: {
				x: canvas.width / 2 - this.image.src.width / 2,
				y: canvas.height / 2
			},
			initial: {
				x: canvas.width / 2 - this.image.src.width / 2,
				y: canvas.height / 2
			}
		}; 
		this.status = status;
		this.total_frame = 0;
		this.animation = 0;
		this.tile_size = this.image.tile_size;
		this.direction = 0;
		this.isAtk = 0;
		this.mpRegenCounter = 0;
		this.hpRegenCounter = 0;
	}
	move_up() {
		if (this.position.current.y > this.position.initial.y) this.position.current.y -= this.status.spd;
		else if (map.y < 0) map.y += this.status.spd;
		else if (this.position.current.y > 0) this.position.current.y -= this.status.spd;
		this.direction = 1 + this.isAtk;
	}
	move_down() {
		if (this.position.current.y < this.position.initial.y) this.position.current.y += this.status.spd;
		else if (map.y > canvas.height - map.height) map.y -= this.status.spd;
		else if (this.position.current.y + this.tile_size < canvas.height * 0.9 - 8) this.position.current.y += this.status.spd;
		this.direction = 0 + this.isAtk;
	}
	move_left() {
		if (this.position.current.x > this.position.initial.x) this.position.current.x -= this.status.spd;
		else if (map.x < 0) map.x += this.status.spd;
		else if (this.position.current.x > 0) this.position.current.x -= this.status.spd;
		this.direction = 3 + this.isAtk;
	}
	move_right() {
		if (this.position.current.x < this.position.initial.x) this.position.current.x += this.status.spd;
		else if (map.x > canvas.width - map.height) map.x -= this.status.spd;
		else if (this.position.current.x + this.tile_size < canvas.width) this.position.current.x += this.status.spd;
		this.direction = 2 + this.isAtk;
	}
	move(control) {
		if (!this.status.atk.enable && this.status.mp.current > 0) return;
		for (var key in control.movement) {
			if (control.movement[key].pressing && !key_pressing.includes(control.movement[key].word))
				key_pressing.push(control.movement[key].word);
			else if (key_pressing.includes(control.movement[key].word) && !control.movement[key].pressing)
				key_pressing.splice(control.movement[key].word, 1);
		}
		if (key_pressing.length == 0 && this.status.atk.enable) this.direction = 0;
		switch(key_pressing[key_pressing.length - 1]) {
			case "w": 
				this.move_up();
			break;
			case "a":
				this.move_left();
			break;
			case "s":
				this.move_down();
			break;
			case "d": 
				this.move_right();
			break;
		}
	}
	attack() {
		if (this.status.atk.enable) return;
		if (!this.status.atk.attacking && this.status.mp.current > 0) {
			this.status.mp.current--;
			mp_text[0].innerHTML = `MP: ${this.status.mp.current} / ${this.status.mp.initial}`;
			this.mpRegenCounter = 1;
			tl.to(".mp", {width: `${this.status.mp.current / this.status.mp.initial * 100}%`, duration: .5});
			this.status.atk.attacking = true;
			this.total_frame = 1;
			this.isAtk = 4;
			this.direction += this.isAtk;
		}
		else if (this.animation == this.image.frame - 1) {
			this.status.atk.enable = true;
			this.status.atk.attacking = false;
			this.isAtk = 0;
		}
	}
	regenerate() {
		let mp_text = document.querySelectorAll(".mp-text");
		if (this.status.atk.enable) this.mpRegenCounter++;
		if (this.mpRegenCounter % (100 - (this.status.mp.regenerate * 15)) == 0 && this.status.mp.current < this.status.mp.initial) {
			this.status.mp.current++;
			tl.to(".mp", {width: `${this.status.mp.current / this.status.mp.initial * 100}%`, duration: .5});
			mp_text[0].innerHTML = `MP: ${this.status.mp.current} / ${this.status.mp.initial}`;
		}
	}
	draw() {
		this.attack();
		this.move(control);
		this.regenerate();
		var tile_size = this.image.src.width / this.image.frame;
		this.total_frame++;
		this.animation = (this.status.atk.enable) ? Math.floor((this.total_frame / (15 - this.status.spd)) % this.image.frame) : 
			Math.floor((this.total_frame / (40 - this.status.atk.spd * 5)) % this.image.frame);
		ctx.drawImage(this.image.src, this.animation * tile_size, this.direction * this.tile_size, tile_size, tile_size, 
			this.position.current.x, this.position.current.y, tile_size, tile_size);
	}
}

function toggle_inventory() {
	let inv = document.querySelector("#inventory");
	let hotbar = document.querySelector("#hotbar");
	pause = !pause;
	if (pause) {
		tl.fromTo(inv, {y: "-10%", opacity: 0}, {y: "0%", opacity: 1, duration: .5});
		tl.fromTo(hotbar, {y: "0%", opacity: 1}, {y: "10%", opacity: 0, duration: .5}, "<");
	}
	else {
		tl.fromTo(hotbar, {y: "10%", opacity: 0}, {y: "0%", opacity: 1, duration: .5});
		tl.fromTo(inv, {y: "0%", opacity: 1}, {y: "-10%", opacity: 0, duration: .5}, "<");
	}
}

var class_select = {
	knight: {
	},
	archer: {
	},
	assasin: {
	},
	wizard: {
	}
};