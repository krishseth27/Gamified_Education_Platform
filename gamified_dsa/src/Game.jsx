import { useEffect, useRef } from "react";
import Phaser from "phaser";
import MainScene from "./phasor/MainScene";

export default function Game({ onEncounter, onSceneReady, onScoreUpdate }) {
  const gameRef = useRef(null);

  useEffect(() => {
    const scene = new MainScene(onEncounter, onScoreUpdate);

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      backgroundColor: "#0f172a",
      scene: [scene],
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: "100%",
        height: "100%",
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);

    setTimeout(() => {
      if (game.canvas) {
        game.canvas.setAttribute("tabindex", "0");
        game.canvas.focus();
      }
    }, 100);

    if (onSceneReady) {
      onSceneReady(scene);
    }

    return () => {
      game.destroy(true);
    };
  }, [onEncounter, onSceneReady, onScoreUpdate]);

  return <div ref={gameRef} className="w-screen h-screen overflow-hidden" />;
}