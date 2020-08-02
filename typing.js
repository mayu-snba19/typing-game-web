const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var score = 0; //スコア
//タイピングに使う文字
var letters = [
	"cluster",
	"reaction",
	"illuminate",
	"friend",
	"Japan",
	"beauty",
	"wonderful",
	"cake",
	"chocolate",
	"piano",
	"cookie",
	"juice",
	"apple",
	"banana",
	"pizza",
	"UFO",
	"spaghetti",
	"pasta",
	"curry",
	"India",
	"parfait",
	"marriage",
	"pretty",
	"Snoopy",
	"lovery",
	"peanuts",
	"baseball",
	"rugby",
	"bicycle",
	"Pokemon",
	"shopping",
	"gateway",
	"LINE",
	"escape",
	"traveler",
	"pretender",
	"happy",
	"star",
	"Java",
];
var letter = letters[Math.floor(Math.random() * letters.length)]; //現在の文字列
var letter2 = ""; //文字色を変えるための文字列
var now = 0; //現在の文字位置
var time = 1800; //時間
var mistake = 0; //ミスタイプ数
var cnt = 0; //連続タイプ(10ごとに0になる)
var error = false;
var errorCount = 0;
var texttf = false;
var texttfCount = 0;
var replay = false;
var start = true;
var frameCount = 0;
ctx.font = 'bold 60px "Courier","monospace"';
ctx.textAlign = "center";
var backMusic = new Audio();
backMusic.src = "./data/back.mp3";
backMusic.loop = true;
backMusic.volume = 0.2;
var playSound = false;

var endneko = document.getElementById("endneko");
var fish = document.getElementById("sakana");
var cat = document.getElementById("cat");

function backMusicPlay() {
	if (playSound == false) {
		backMusic.play();
		playSound = true;
		var msg = '<i class="fas fa-volume-up fa-2x icon"></i>';
		document.getElementById("iconAnime").innerHTML = msg;
	} else {
		backMusic.pause();
		playSound = false;
		var msg = '<i class="fas fa-volume-mute fa-2x icon"></i>';
		document.getElementById("iconAnime").innerHTML = msg;
	}
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (start) {
		ctx.fillStyle = "white";
		ctx.font = 'bold 50px "Courier","monospace"';
		ctx.fillText("タイピングゲーム", 450, 250);
		ctx.fillRect(350, 300, 200, 40);
		ctx.fillStyle = "black";
		ctx.font = 'bold 20px "Courier","monospace"';
		ctx.fillText("start!", 450, 325);
		cat.style.visibility = "hidden";
		document.onmousedown = function (event) {
			if (
				event.clientX >= 350 &&
				event.clientX <= 550 &&
				event.clientY >= 300 &&
				event.clientY <= 350
			) {
				start = false;
				replay = true;
				ctx.font = 'bold 60px "Courier","monospace"';
			}
		};
	} else if (replay) {
		ctx.drawImage(cat, frameCount * 5 - 100, 400);
		if (error) {
			if (errorCount == 0) {
				var nekosound = new Audio("./data/nekosound.mp3");
				nekosound.volume = 0.2;
				if (playSound == true) nekosound.play();
			}
			fish.style.visibility = "visible";
			errorCount++;
			if (errorCount >= 50) {
				error = false;
				errorCount = 0;
			}
		} else {
			fish.style.visibility = "hidden";
		}
		if (frameCount >= 180) {
			letter = letters[Math.floor(Math.random() * letters.length)];
			now = 0;
			frameCount = 0;
		}
		ctx.fillStyle = "white";
		ctx.font = 'bold 60px "Courier","monospace"';
		ctx.fillText(letter, 450, 230);
		letter2 = "";
		for (var i = 0; i < now; i++) {
			letter2 += " ";
		}
		letter2 += letter.charAt(now);
		for (var i = now + 1; i < letter.length; i++) {
			letter2 += " ";
		}
		ctx.fillStyle = "red";
		ctx.font = 'bold 60px "Courier","monospace"';
		ctx.fillText(letter2, 450, 230);
		if (time <= 0) {
			ctx.fillStyle = "white";
			ctx.font = 'bold 50px "Courier","monospace"';
			ctx.fillText(
				"SCORE: " + score + " ミスタイプ数: " + mistake,
				450,
				200
			);
			replay = false;
		}
		ctx.fillStyle = "#8dd9a3";
		ctx.fillRect(0, 0, time / 2, 20);
		time--;
		if (texttf) {
			ctx.fillStyle = "red";
			ctx.font = 'bold 50px "Courier","monospace"';
			ctx.fillText("PLUS", 800, 80);
			texttfCount++;
			if (texttfCount >= 50) {
				texttfCount = 0;
				texttf = false;
			}
		}
	} else {
		ctx.fillStyle = "white";
		ctx.font = 'bold 50px "Courier","monospace"';
		ctx.fillText("SCORE:" + score + "  ミスタイプ数:" + mistake, 450, 200);
		ctx.fillRect(550, 300, 200, 40);
		ctx.fillStyle = "black";
		ctx.font = 'bold 20px "Courier","monospace"';
		ctx.fillText("retry", 650, 325);
		cat.style.visibility = "hidden";
		fish.style.visibility = "hidden";
		endneko.style.visibility = "visible";

		//リスタート
		document.onmousedown = function (event) {
			if (
				event.clientX >= 550 &&
				event.clientX <= 750 &&
				event.clientY >= 300 &&
				event.clientY <= 350
			) {
				replay = true;
				letter = letters[Math.floor(Math.random() * letters.length)];
				letter2 = "";
				now = 0;
				time = 1800;
				mistake = 0;
				cnt = 0;
				error = false;
				errorCount = 0;
				texttf = false;
				texttfCount = 0;
				score = 0;
				frameCount = 0;
				ctx.font = 'bold 60px "Courier","monospace"';
				endneko.style.visibility = "hidden";
			}
		};
	}
	frameCount++;
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

document.addEventListener("keydown", (event) => {
	var key = event.key;
	if (replay) {
		//もし正解していたら
		if (key == letter.charAt(now)) {
			score++;
			now++;
			cnt++;
			if (now == letter.length) {
				letter = letters[Math.floor(Math.random() * letters.length)];
				now = 0;
				frameCount = 0;
				if (cnt >= 10) {
					cnt = 0;
					time += 50;
					texttf = true;
					var money = new Audio("./data/money.mp3");
					money.volume = 0.2;
					if (playSound == true) money.play();
				}
			}
			letter2 = "";
			for (var i = 0; i < now; i++) {
				letter2 += " ";
			}
			letter2 += letter.charAt(now);
			for (var i = now; i < letter.length; i++) {
				letter2 += " ";
			}
			ctx.fillStyle = "red";
			ctx.font = 'bold 60px "Courier","monospace"';
			ctx.fillText(letter2, 450, 230);
		} else if (key == "Shift") {
			cnt++;
		} else {
			mistake++;
			cnt = 0;
			error = true;
		}
	}
});
