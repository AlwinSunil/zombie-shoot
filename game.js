// Variables
let timerElem = document.getElementById("timer");
let livesElem = document.getElementById("max-lives");
let gameBody = document.getElementById("game-body");
let lives = 4;
let time = 60;
let zombie;
let zombieId = 0;

// Generate random number
function generateRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Audio functionality
let backgroundMusic = new Audio("./assets/bgm.mp3");
backgroundMusic.play();
backgroundMusic.loop = true;

gameBody.onclick = function () {
  let shotgunMusic = new Audio("./assets/shotgun.wav");
  shotgunMusic.pause();
  shotgunMusic.currentTime = 0;
  shotgunMusic.play();
};

function generateZombies() {
  let num = generateRandomNum(1, 7);

  zombie = document.createElement("img");
  zombie.src = `./assets/zombie-${num}.png`;
  zombie.className = "zombie-image";
  zombie.id = `zombie${zombieId}`;

  zombie.onclick = () => destroyZombie(zombie);

  let second = generateRandomNum(2, 6);
  zombie.style.animationDuration = `${second}s`;

  let viewwidth = generateRandomNum(20, 80);
  zombie.style.transform = `translateX(${viewwidth}vw)`;

  gameBody.appendChild(zombie);

  zombieId++;
}

generateZombies();

function destroyZombie(zombie) {
  zombie.remove();
}

function zombieEscape(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    lives--;
    let remainingLife = lives * ((window.innerWidth * 25) / 100);
    livesElem.style.width = `${remainingLife}px`;
    if (lives <= 0) {
      clearInterval(timerInterval);
      location.href = "./game-over.html";
    } else {
      destroyZombie(zombie);
      generateZombies();
    }
  }
}

let timerInterval = setInterval(timer, 1000);

function timer() {
  if (time < 0) {
    clearInterval(timerInterval);
    location.href = "./win.html";
  } else {
    time--;
    timerElem.innerText = `${time}`;
  }
}

setInterval(() => zombieEscape(zombie), 50);
