var shown = false;
class GUI {
	constructor(args) {
		this.container = document.createElement("div");
		this.container.
		this.title = args.title;
	}
	toggle() {
		if (shown) {
			shown = true;
			this.container.style.display = "flex";
		}
	}
}

class Inventory extends GUI {
	constructor() {
	}
}