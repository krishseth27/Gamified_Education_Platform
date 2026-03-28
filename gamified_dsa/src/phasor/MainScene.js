import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor(onEncounter, onScoreUpdate) {
    super("MainScene");
    this.onEncounter = onEncounter;
    this.onScoreUpdate = onScoreUpdate;
    this.activeZoneId = null;
    this.solvedZones = new Set();
    this.score = 0;
  }

  create() {
    this.add.text(20, 20, "Use WASD to move", {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.player = this.physics.add.image(100, 100, null)
      .setDisplaySize(40, 40)
      .setTint(0x22c55e);

    this.player.setCollideWorldBounds(true);

    this.keys = this.input.keyboard.addKeys({
      w: "W",
      a: "A",
      s: "S",
      d: "D",
    });

    this.createQuestionZones();

    this.resumeHandler = () => {
      this.scene.resume();
    };

    window.addEventListener("resumeGame", this.resumeHandler);
  }

  createQuestionZones() {
    this.questionZones = [
  { id: "zone-1", label: "Arrays", x: 250, y: 120, width: 100, height: 80, color: 0x3b82f6 },
  { id: "zone-2", label: "Strings", x: 450, y: 120, width: 100, height: 80, color: 0x3b82f6 },
  { id: "zone-3", label: "Linked List", x: 250, y: 260, width: 120, height: 80, color: 0xf59e0b },
  { id: "zone-4", label: "Stack", x: 450, y: 260, width: 100, height: 80, color: 0xf59e0b },
  { id: "zone-5", label: "Trees", x: 250, y: 400, width: 100, height: 80, color: 0xef4444 },
  { id: "zone-6", label: "Graphs", x: 450, y: 400, width: 100, height: 80, color: 0xef4444 },
];

    this.questionZones.forEach((zone) => {
      const rect = this.add.rectangle(
        zone.x,
        zone.y,
        zone.width,
        zone.height,
        zone.color,
        0.25
      );

      zone.text = this.add.text(zone.x, zone.y, zone.label, {
  fontSize: "14px",
  color: "#ffffff",
  fontStyle: "bold",
}).setOrigin(0.5);

      zone.rect = rect;
    });
  }

  update() {
    const speed = 200;
    this.player.body.setVelocity(0);

    if (this.keys.a.isDown) this.player.body.setVelocityX(-speed);
    if (this.keys.d.isDown) this.player.body.setVelocityX(speed);
    if (this.keys.w.isDown) this.player.body.setVelocityY(-speed);
    if (this.keys.s.isDown) this.player.body.setVelocityY(speed);

    this.checkZoneEncounter();
  }

  checkZoneEncounter() {
    const playerBounds = this.player.getBounds();

    for (const zone of this.questionZones) {
      const zoneBounds = new Phaser.Geom.Rectangle(
        zone.x - zone.width / 2,
        zone.y - zone.height / 2,
        zone.width,
        zone.height
      );

      const isInside = Phaser.Geom.Intersects.RectangleToRectangle(
        playerBounds,
        zoneBounds
      );

      if (isInside && !this.solvedZones.has(zone.id) && this.activeZoneId !== zone.id) {
        this.activeZoneId = zone.id;
        this.scene.pause();

        if (this.onEncounter) {
          this.onEncounter(zone.id);
        }
        return;
      }
    }

    const stillInsideActive = this.questionZones.some((zone) => {
      if (zone.id !== this.activeZoneId) return false;

      const zoneBounds = new Phaser.Geom.Rectangle(
        zone.x - zone.width / 2,
        zone.y - zone.height / 2,
        zone.width,
        zone.height
      );

      return Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        zoneBounds
      );
    });

    if (!stillInsideActive) {
      this.activeZoneId = null;
    }
  }

  markZoneSolved(zoneId, wasCorrect) {
  if (wasCorrect) {
    this.solvedZones.add(zoneId);
    this.score += 10;

    const solvedZone = this.questionZones.find((z) => z.id === zoneId);
    if (solvedZone?.rect) {
      solvedZone.rect.setFillStyle(0x22c55e, 0.35);
    }

    if (this.onScoreUpdate) {
      this.onScoreUpdate(this.score);
    }
  }

  this.activeZoneId = null;
  this.resumeGame();
}

  resumeGame() {
  this.scene.resume();
  this.input.keyboard.resetKeys();

  if (this.game.canvas) {
    this.game.canvas.focus();
  }
}

  shutdown() {
    window.removeEventListener("resumeGame", this.resumeHandler);
  }
}