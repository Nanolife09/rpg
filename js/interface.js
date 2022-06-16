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
	tl.to(hotbar_skills[number - 1], {y: "-20%", duration: .3});
	tl.to(hotbar_skills[number - 1], {y: "0%", durtation: .3, onCompete: () => skill_used = false});
}

function show_log() {
    log.style.display = "flex";
}

function hide_log() {
    log.style.display = "none";
}

function write_log(text) {
    log.innerText = text;
}

function show_hint(text) {
    hint.innerText = text;
}

function clear_hint() {
    hint.innerText = "";
}