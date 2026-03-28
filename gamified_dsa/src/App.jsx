import { useCallback, useState } from "react";
import Game from "./Game";
import UI from "./UI";
import HomePage from "./components/HomePage";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [sceneRef, setSceneRef] = useState(null);
  const [score, setScore] = useState(0);

  const handleEncounter = useCallback((zoneId) => {
    setActiveZoneId(zoneId);
  }, []);

  const handleSceneReady = useCallback((scene) => {
    setSceneRef(scene);
  }, []);

  const handleAnswerSubmit = useCallback(
    ({ zoneId, isCorrect }) => {
      if (sceneRef) {
        sceneRef.markZoneSolved(zoneId, isCorrect);
      }
    },
    [sceneRef]
  );

  const handleCloseUI = useCallback(() => {
    if (sceneRef) {
      sceneRef.resumeGame();
    }
    setActiveZoneId(null);
  }, [sceneRef]);

  if (!gameStarted) {
    return <HomePage onStart={() => setGameStarted(true)} />;
  }

  return (
    <div className="relative">
      <Game
        onEncounter={handleEncounter}
        onSceneReady={handleSceneReady}
        onScoreUpdate={setScore}
      />

      <div className="fixed left-4 top-4 z-40 rounded-2xl bg-white/90 px-4 py-3 shadow-xl">
        <p className="font-semibold text-slate-900">Score: {score}</p>
      </div>

      <button
        onClick={() => setGameStarted(false)}
        className="fixed right-4 top-4 z-40 rounded-xl bg-white/90 px-4 py-2 font-medium text-slate-900 shadow-lg hover:bg-white"
      >
        Back Home
      </button>

      {activeZoneId && (
        <UI
          zoneId={activeZoneId}
          onSubmit={handleAnswerSubmit}
          onClose={handleCloseUI}
        />
      )}
    </div>
  );
}

export default App;