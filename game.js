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

gameBody.onclick = function (event) {
  if (event.target.classList.contains("zombie-image")) {
    let zombie = event.target;
    destroyZombie(zombie);
  }
};

function generateZombies() {
  let num = generateRandomNum(1, 7);

  zombie = document.createElement("img");
  zombie.src = `./assets/zombie-${num}.png`;
  zombie.className = "zombie-image";
  zombie.id = `zombie${zombieId}`;

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
  generateZombies();
}

let timerInterval = setInterval(timer, 1000);

function timer() {
  if (time <= 0) {
    clearInterval(timerInterval);
    location.href = "./win.html";
  } else {
    time--;
    timerElem.innerText = `${time}`;
    if (zombie.getBoundingClientRect().top < 0) {
      lives--;
      let remainingLife = lives * ((window.innerWidth * 25) / 100);
      livesElem.style.width = `${remainingLife}px`;
      destroyZombie(zombie);
      if (lives <= 0) {
        clearInterval(timerInterval);
        location.href = "./game-over.html";
      }
    }
  }
}
