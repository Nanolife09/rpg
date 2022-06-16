class NPC extends Boundary {

    constructor({src, name, x, y, dialogue}) {
        super({
            x: x * 64 + map.x + 16,
            y: y * 64 + map.y + 16,
            width: 32,
            height: 32 // this.size
        });
        this.interacting = false;
        this.name = name;
        this.size = 32
        this.src = src;
        this.dialogue = dialogue;
        this.progress = 0;
        this.interact_buffer = 40;
    }

    draw() {
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, this.y, this.size, this.size);
        let text = `${this.name} (NPC)`
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.font = 'bold 20px serif';
        ctx.textAlign = 'center'
		ctx.fillText(text, this.x + this.size / 2, this.y + this.size / 2);
        ctx.stokeStyle = 'blue';
        ctx.strokeRect(this.x - this.interact_buffer, this.y - this.interact_buffer, this.size + this.interact_buffer * 2, this.size + this.interact_buffer * 2)
    }

	check_interact(playerX, playerY, playerTile) {
		return this.x + this.interact_buffer + this.size > playerX && 
            this.x - this.interact_buffer < playerX + playerTile && 
			this.y + this.interact_buffer + this.size > playerY &&
            this.y - this.interact_buffer < playerY + playerTile;
    }

    interact() {
        this.interacting = true;
        let text = this.dialogue[this.progress++ % this.dialogue.length];
        // console.log(this.dialogue[this.progress++ % this.dialogue.length]);
        show_log();
        write_log(text);
        // log.show(^)
    }
}
