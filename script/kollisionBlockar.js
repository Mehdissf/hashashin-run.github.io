class Platform {
  constructor(x, y, avstånd, svårighetsgrad) {
    this.x = x;
    this.y = y;
    this.width = 400;
    this.height = 20;
    this.color = "green";
    this.avstånd = avstånd;
    this.svårighetsgrad = svårighetsgrad;
    this.fart = this.fartnivå();
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.closePath();
  }

  update() {
    this.x -= this.fart;
    if (this.x + this.width < 0) {
      this.x = gameCanvas.width + this.avstånd;
      this.y = Math.floor(
        Math.random() * (gameCanvas.height - this.height - 100) + 200
      );
    }
    this.kollision(player);
    this.draw();
  }

  kollision(player) {
    if (
      // Kollar om spelaren befinner sig på plattformen
      player.playerX + player.playerWidth > this.x &&
      player.playerX < this.x + this.width &&
      player.playerY + player.playerHeight >= this.y &&
      player.playerY < this.y
    ) {
      // Om den gör det då ska den inte ramla
      player.playerY = this.y - player.playerHeight;
      player.PlayerhastighetY = 0;
      player.platform = this;
    } else {
      if (player.platform === this) {
        player.platform = null;
      }
    }
  }

  fartnivå() {
    switch (this.svårighetsgrad) {
      case "lätt":
        return 10;
      case "medel":
        return 25;
      case "svår":
        return 50;
      case "extrem":
        return 90;
      default:
        return "medel";
    }
  }
}

const platform = new Platform(800, 500, 100, "medel");
const platform2 = new Platform(600, 100, 100, "medel");
const platform3 = new Platform(400, 400, 100, "medel");
const platform4 = new Platform(200, 800, 100, "medel");
