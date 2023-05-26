window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("canvas");
let c = gameCanvas.getContext("2d");
gameCanvas.height = SCREENHEIGHT / 1.2;
gameCanvas.width = SCREENWIDTH / 1.2;
gameCanvas.style.position = "absolute";
gameCanvas.style.left = (SCREENWIDTH - gameCanvas.width) / 2 + "px";
gameCanvas.style.top = (SCREENHEIGHT - gameCanvas.height) / 2 + "px";
let frame = 0;

class Player {
  constructor() {
    this.playerX = gameCanvas.width / 2;
    this.playerY = gameCanvas.height / 2;
    this.playerWidth = 100;
    this.playerHeight = 100;
    this.dx = 8;
    this.dy = 5;
    this.gravitation = 0.7;
    this.PlayerhastighetY = 0;
    this.hp = 100;
    this.xp = 0;
    this.dubbelthopp = true;
    // ska fixa
    this.platform = null; // den plattform spelaren står på

    this.directions = {
      left: false,
      right: false,
      up: false,
      down: false,
    };
  }

  //<<<<<<-----------------------XP-tidsintervall--------------------------->>>>
  //<---------------------------------------------------------------------->
  tidsintervall_startas() {
    this.xpInterval = setInterval(() => {
      this.xp += 1;
    }, 1000); // xp ökas med 1 vid varje sekund
  }

  tidsintervall_slutas() {
    //Skall användas när spelaren dör
    clearInterval(this.xpInterval);
    this.xpInterval = null;
  }

  rita(frame) {
    c.drawImage(
      runs[frame],
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight
    );
  }
  updatera() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.directions.left = true;
          // springer åt vänster
          break;
        case "d":
          this.directions.right = true;
          // springer åt höger
          break;
        case "w":
          if (
            this.playerY === gameCanvas.height - this.playerHeight ||
            this.onPlatform
          ) {
            this.PlayerhastighetY = -20;
            this.dubbelthopp = true;
          } else if (this.dubbelthopp) {
            this.PlayerhastighetY = -20;
            this.dubbelthopp = false;
          }
          this.directions.up = true;
          // hoppar uppåt
          // och sedan faller ned
          break;
        case "s":
          this.directions.down = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
          this.directions.left = false;
          break;
        case "d":
          this.directions.right = false;
          break;
        case "w":
          this.directions.up = false;
          break;
        case "s":
          this.directions.down = false;
          break;
        default:
          break;
      }
    });

    // Om spelaren befinner sig på canvas höjd då ska den dö---------->>>>
    if (this.playerY + this.playerHeight >= gameCanvas.height) {
      this.hp = 0;
      this.tidsintervall_slutas();
      console.log("Du dog");
      return; // Avsluta updatera()-metoden
    }
    // <<<------------gränser---------->>>>
    if (
      this.directions.right &&
      this.playerX < gameCanvas.width - this.playerWidth
    ) {
      if (this.playerX + this.dx > gameCanvas.width - this.playerWidth) {
        this.playerX = gameCanvas.width - this.playerWidth;
      } else {
        this.playerX += this.dx;
      }
    }
    if (this.directions.left && this.playerX > 0) {
      if (this.playerX - this.dx < 0) {
        this.playerX = 0;
      } else {
        this.playerX -= this.dx;
      }
    }
    if (this.directions.up && this.onPlatform) {
      this.PlayerhastighetY = -8;
    }

    this.PlayerhastighetY += this.gravitation;
    this.playerY += this.PlayerhastighetY;

    if (this.playerY > gameCanvas.height - this.playerHeight) {
      this.playerY = gameCanvas.height - this.playerHeight;
    }

    if (
      this.directions.down &&
      this.playerY < gameCanvas.height - this.playerHeight
    ) {
      this.playerY += this.dy;
    }

    if (this.platform) {
      if (
        this.playerX + this.playerWidth > this.platform.x &&
        this.playerX < this.platform.x + this.platform.width &&
        this.playerY + this.playerHeight > this.platform.y &&
        this.playerY < this.platform.y + this.platform.height
      ) {
        // Spelaren befinner sig på plattformen
        this.playerY = this.platform.y - this.playerHeight;
        this.PlayerhastighetY = 0;
        this.platform = true;
        this.dubbelthopp = true;
      } else {
        // Spelaren befinner sig inte på plattformen
        this.platform = null;
      }
    }
  }
}
const player = new Player();
// -------------------Players frames----------------------
setInterval(() => {
  frame += 1;
  if (frame > 7) {
    frame = 0;
  }
}, 120);

window.onload = function () {
  let start = document.getElementById("start");
  let ramla = document.getElementById("ramla_inte");
  let musik = document.getElementById("musik");
  let svårighetsgradDisplay = document.getElementById("svårighetsgradvisare");
  // let svårighetsgrad = document.getElementsById("menu");
  let speletkörs = false;

  // <<<--------------------Jump-up------------------------->>>
  let up1 = new Image();
  up1.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_up/j_up_1.png";
  let up2 = new Image();
  up2.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_up/j_up_2.png";
  let up3 = new Image();
  up3.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_up/j_up_3.png";
  jump_up = [up1, up2, up3];

  // <<<--------------------Jump-down------------------------->>>
  let down1 = new Image();
  down1.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_down/j_down_1.png";
  let down2 = new Image();
  down2.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_down/j_down_2.png";
  let down3 = new Image();
  down3.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_down/j_down_3.png";
  jump_down = [down1, down2, down3];

  // <<<------------------Run----------------->>>>>>
  let run1 = new Image();
  run1.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_1.png";
  let run2 = new Image();
  run2.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_2.png";
  let run3 = new Image();
  run3.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_3.png";
  let run4 = new Image();
  run4.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_4.png";
  let run5 = new Image();
  run5.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_5.png";
  let run6 = new Image();
  run6.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_6.png";
  let run7 = new Image();
  run7.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_7.png";
  let run8 = new Image();
  run8.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_8.png";
  runs = [run1, run2, run3, run4, run5, run6, run7, run8];

  start.addEventListener("click", () => {
    if (!speletkörs) {
      if (this.hp <= 0) {
        player.tidsintervall_slutas();
      } else {
        player.tidsintervall_startas();
      }
      start.style.display = "none";
      ramla.style.display = "none";
      svårighetsgradDisplay.style.display = "none";

      speletkörs = true;
      musik.play();
      animate();
    }
  });
};



class Background {
  constructor(src, fart) {
    this.image = new Image();
    this.image.src = src;
    this.x = 0;
    this.y = 0;
    this.width = gameCanvas.width;
    this.height = gameCanvas.height;
    this.fart = fart - 1;
  }

  draw() {
    this.x -= this.fart;
    if (this.x < -this.width) {
      this.x = 0;
    }
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
    c.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
const background = new Background("game assets/bakgrund/layers/w.png", 1);
const background2 = new Background("game assets/bakgrund/layers/w1.png", 2);
const background3 = new Background("game assets/bakgrund/layers/w2.png", 3);
const background4 = new Background("game assets/bakgrund/layers/w3.png", 4);
const background5 = new Background("game assets/bakgrund/layers/w3.png", 6);

function XP(player) {
  c.fillStyle = "white";
  c.font = "20px Arial";
  c.fillText("Poäng: " + player.xp, 10, 30);
}

function HP(player) {
  c.fillStyle = "white";
  c.font = "20px Arial";
  c.fillText("HP: " + player.hp, 10, 60);
}
function skärmen_visas_efter_spelaren_dör(player) {
  let gameOverScreen = document.getElementById(
    "Skärmen_som_visas_när_Player_dör"
  );
  gameOverScreen.classList.remove("hidden");

  let xpDisplay = document.getElementById("xpDisplay");
  xpDisplay.textContent = "Tjänat poäng: " + player.xp;

  let fortsättButton = document.getElementById("fortsättknapp");
  fortsättButton.addEventListener("click", () => {
    gameOverScreen.classList.add("hidden");
    speletkörs = false;
    location.reload(); //Magisk funktion för att återställa hela spelet
  });
}

function animate() {
  requestAnimationFrame(animate);
  background.draw();
  background2.draw();
  background3.draw();
  background4.draw();
  player.rita(frame);
  player.updatera();
  platform.update();
  platform2.update();
  platform3.update();
  platform4.update();
  XP(player);
  HP(player);
  if (player.hp === 0) {
    skärmen_visas_efter_spelaren_dör(player);
    return;
  }
}
