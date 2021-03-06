class Boundary {
	constructor({x, y, width, height}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	check_collision(playerX, playerY, playerTile) {
		return this.x + this.width > playerX && 
			playerX + playerTile > this.x && 
			playerY + playerTile > this.y && 
			this.y + this.height > playerY;
	}
}

function create_boundary() {
	for (let i = 0; i < boundary.length; i += 100) {
	    temp.push(boundary.slice(i, i + 100));
	}
	for(let y = 0; y < temp.length; y++) {
      	for (let x = 0; x < temp[y].length; x++) {
      		// top left
	   		if (temp[y][x] == 12) boundary_coord.push([x * 64 + map.x + 15, y * 64 + map.y + 35, 20, 64]);
	   		// top
	   		if (temp[y][x] == 13) boundary_coord.push([x * 64 + map.x, y * 64 + map.y + 35, 64, 5]);
	   		// top right
	   		if (temp[y][x] == 14) boundary_coord.push([x * 64 + map.x + 25, y * 64 + map.y + 35, 20, 64]);
	   		// left
	   		if (temp[y][x] == 17) boundary_coord.push([x * 64 + map.x + 15, y * 64 + map.y, 20, 60]);
	   		// bottom
	   		if (temp[y][x] == 23) boundary_coord.push([x * 64 + map.x, y * 64 + map.y + 10, 64, 5]);
	   		// rock
	   		if (temp[y][x] == 126) boundary_coord.push([x * 64 + map.x + 20, y * 64 + map.y + 10, 20, 20]);
	   		// tree
	   		if (temp[y][x] == 123) boundary_coord.push([x * 64 + map.x + 10, y * 64 + map.y, 25, 25]);
	   		// house
	   		if (temp[y][x] == 503) boundary_coord.push([x * 64 + map.x + 15, y * 64 + map.y, 30, 30]);
	   		// water
	   		if (temp[y][x] == 111) boundary_coord.push([x * 64 + map.x + 10, y * 64 + map.y, 40, 40]);
	   		// boat
	   		if (temp[y][x] == 932) boundary_coord.push([x * 64 + map.x + 10, y * 64 + map.y, 40, 40]);
	   		// right
	   		if (temp[y][x] == 19) boundary_coord.push([x * 64 + map.x + 25, y * 64 + map.y, 20, 74]);
	   		// bottom right
	   		if (temp[y][x] == 24) boundary_coord.push([x * 64 + map.x + 25, y * 64 + map.y - 55, 20, 70]);
	   		// bottom left
	   		if (temp[y][x] == 22) boundary_coord.push([x * 64 + map.x + 15, y * 64 + map.y - 54, 20, 70]);
		}
	}
	boundary_coord.forEach(coord => boundaries.push(new Boundary ({x: coord[0], y: coord[1], width: coord[2], height: coord[3]})));
	console.log(boundary_coord);
}

create_boundary();

function if_collide(playerX, playerY, playerTile) {
	for (let i = 0; i < boundaries.length; i++) {
		if (boundaries[i].check_collision(playerX, playerY, playerTile)) return true;
	}
	for (let i = 0; i < NPCs.length; i++) {
		if (NPCs[i].check_collision(playerX, playerY, playerTile)) {
            // show hint
            return true;
        }
	}
}

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
				y: canvas.height / 2 - this.image.src.height / 2
			},
			initial: {
				x: canvas.width / 2 - this.image.src.width / 2,
				y: canvas.height / 2 - this.image.src.height / 2
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
		document.querySelectorAll(".mp-text")[0].innerHTML = `MP: ${this.status.mp.current} / ${this.status.mp.initial}`;
		document.querySelectorAll(".hp-text")[0].innerHTML = `HP: ${this.status.hp.current} / ${this.status.hp.initial}`;
		status_info[0].innerHTML = `?????????: ${this.status.atk.dmg}`;
		status_info[1].innerHTML = `????????????: ${this.status.atk.spd}`;
		status_info[2].innerHTML = `HP??????: ${this.status.hp.regenerate}`;
		status_info[3].innerHTML = `MP??????: ${this.status.mp.regenerate}`;
		status_info[4].innerHTML = `????????????: ${this.status.spd}`;
		status_info[5].innerHTML = `??????: ${this.status.luck}`;
	}
	move_up() {
		this.direction = 1 + this.isAtk;
		if (if_collide(this.position.current.x, this.position.current.y - this.status.spd, this.image.tile_size)) return;
		if (this.position.current.y > this.position.initial.y) this.position.current.y -= this.status.spd;
		else if (map.y < 0) {
			map.y += this.status.spd;
			boundaries.forEach(boundary => boundary.y += this.status.spd);
			NPCs.forEach(npc => npc.y += this.status.spd);
		}
		else if (this.position.current.y > 0) this.position.current.y -= this.status.spd;
	}
	move_down() {
		this.direction = 0 + this.isAtk;
		if (if_collide(this.position.current.x, this.position.current.y + this.status.spd, this.image.tile_size)) return;
		if (this.position.current.y < this.position.initial.y) this.position.current.y += this.status.spd;
		else if (map.y > canvas.height - map.height) {
			map.y -= this.status.spd;
			boundaries.forEach(boundary => boundary.y -= this.status.spd);
			NPCs.forEach(npc => npc.y -= this.status.spd);
		}
		else if (this.position.current.y + this.tile_size < canvas.height * 0.9 - 8) this.position.current.y += this.status.spd;
	}
	move_left() {
		this.direction = 3 + this.isAtk;
		if (if_collide(this.position.current.x - this.status.spd, this.position.current.y, this.image.tile_size)) return;
		if (this.position.current.x > this.position.initial.x) this.position.current.x -= this.status.spd;
		else if (map.x < 0) {
			map.x += this.status.spd;
			boundaries.forEach(boundary => boundary.x += this.status.spd);
			NPCs.forEach(npc => npc.x += this.status.spd);
		}
		else if (this.position.current.x > 0) this.position.current.x -= this.status.spd;
	}
	move_right() {
		this.direction = 2 + this.isAtk;
		if (if_collide(this.position.current.x + this.status.spd, this.position.current.y, this.image.tile_size)) return;
		if (this.position.current.x < this.position.initial.x) this.position.current.x += this.status.spd;
		else if (map.x > canvas.width - map.height) {
			map.x -= this.status.spd;
			boundaries.forEach(boundary => boundary.x -= this.status.spd);
			NPCs.forEach(npc => npc.x -= this.status.spd);
		}
		else if (this.position.current.x + this.tile_size < canvas.width) this.position.current.x += this.status.spd;
	}
	move(control) {
		if (this.status.atk.attacking) return;
		for (var key in control.movement) {
			if (control.movement[key].pressing && !key_pressing.includes(control.movement[key].word))
				key_pressing.push(control.movement[key].word);
			else if (key_pressing.includes(control.movement[key].word) && !control.movement[key].pressing)
				key_pressing.splice(control.movement[key].word, 1);
		}
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
			this.direction -= this.isAtk;
			this.isAtk = 0;
		}
	}
	regenerate() {
		if (this.status.atk.enable || this.status.mp.current == 0) this.mpRegenCounter++;
		if (this.mpRegenCounter % (100 - (this.status.mp.regenerate * 15)) == 0 && this.status.mp.current < this.status.mp.initial) {
			this.status.mp.current++;
			tl.to(".mp", {width: `${this.status.mp.current / this.status.mp.initial * 100}%`, duration: .5});
			mp_text[0].innerHTML = `MP: ${this.status.mp.current} / ${this.status.mp.initial}`;
		}
	}
	draw() {
		var tile_size = this.image.src.width / this.image.frame;
		this.total_frame++;
		this.animation = (this.status.atk.enable) ? Math.floor((this.total_frame / (15 - this.status.spd)) % this.image.frame) : 
			Math.floor((this.total_frame / (40 - this.status.atk.spd * 5)) % this.image.frame);
		ctx.drawImage(this.image.src, this.animation * tile_size, this.direction * this.tile_size, tile_size, tile_size, 
			this.position.current.x, this.position.current.y, 64, 64);
		this.regenerate();
		ctx.drawImage(foregroundImage, map.x, map.y);
		this.move(control);
		this.attack();
	}
}

class Knight extends Player {
	constructor({src, status}) {
		super({src, status});
	}
	normal() {

	}
	buff() {

	}
	enchant() {

	}
	impact() {

	}
	smite() {

	}
	spin() {

	}
}

class Archer extends Player {
	constructor({src, status}) {
		super({src, status});
	}
	normal() {

	}
	multi() {

	}
	rapid() {

	}
	charge() {

	}
	dynamite() {

	}
	bait() {

	}
}

class Assasin extends Player {
	constructor({src, status}) {
		super({src, status});
	}
	normal() {

	}
	charge() {

	}
	duplicate() {

	}
	shadow() {

	}
	sacrifice() {
		
	}
}

class Wizard extends Player {
	constructor({src, status}) {
		super({src, status});
	}
	normal() {

	}

	fireball() {
	}

	storm() {

	}
	invincible() {

	}
	freeze() {

	}
}