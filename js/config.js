const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1366;
canvas.height = 768;

const mp_text = document.querySelectorAll(".mp-text");
const status_info = document.querySelectorAll("#status-info > *");

const inv = document.querySelector("#inventory");
const hotbar = document.querySelector("#hotbar");
const hotbar_skills = document.querySelectorAll(".skill");

var mapImage = new Image();
mapImage.src = "./source/map.png";

var foregroundImage = new Image();
foregroundImage.src = "./source/foreground.png";

var playerImage = new Image();
playerImage.src = "source/player.png";

var map = {
	x: -270,
	y: -290,
	width: 6400, 
	height: 5120
};

var temp = [];
var boundary_coord = [];
var boundaries = [];

var control = {
	movement: {
		"w": {pressing: false, word: "w"},
		"a": {pressing: false, word: "a"},
		"s": {pressing: false, word: "s"},
		"d": {pressing: false, word: "d"}
	},
	"e": {pressed: false, word: "e"}
};

var key_pressing = [];

var skill_used = false;

var pause = false;

var tl = gsap.timeline();