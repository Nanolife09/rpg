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

function show_info(element, style) {
	document.querySelectorAll("#info > *").forEach(e => e.style.display = "none");
	document.querySelector(element).style.display = style;
}