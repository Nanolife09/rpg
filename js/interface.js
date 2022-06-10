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

function toggle_inventory() {
	if (control["e"].pressed) return;
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

function show_info(element, style) {
	document.querySelectorAll("#info > *").forEach(e => e.style.display = "none");
	document.querySelector(element).style.display = style;
	tl.from(element, {opacity: 0, y: "-5%"});
}

function use_hotbar(number) {
	if (hotbar_skills[number - 1].classList.contains("selected") || skill_used) return;
	skill_used = true;
	if (document.querySelectorAll(".selected").length != 0) {
		tl.to(".selected", {y: "0%", duration: .1, onComplete: () => {
			document.querySelector(".selected").classList.remove("selected");
			hotbar_skills[number - 1].classList.add("selected");
			tl.to(".selected", {y: "-20%", duration: .1, onComplete: () => skill_used = false});
		}});
	}
	else {
		hotbar_skills[number - 1].classList.add("selected");
		tl.to(".selected", {y: "-20%", duration: .1, onComplete: () => skill_used = false});
	}
}