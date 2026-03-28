import { useState, useCallback, useEffect } from "react";

import WorldScene from "./components/WorldScene";
import BattleScene from "./components/BattleScene";
import BossScene from "./components/BossScene";
import LearningScene from "./components/LearningScene";
import TitleScreen from "./components/TitleScreen";
import WinScreen from "./components/WinScreen";
import HUD from "./components/HUD";
import Toast from "./components/Toast";
import LevelUpOverlay from "./components/LevelUpOverlay";

import { REGIONS } from "./game/constants";
import { EventBus } from "./game/EventBus";

export default function App() {
const [scene, setScene] = useState("title");
const [toast, setToast] = useState(null);
const [levelUpInfo, setLevelUpInfo] = useState(null);

const [player, setPlayer] = useState({
level:1,
xp:0,
unlockedRegions:["arrays"]
});

const addXP = useCallback((amount)=>{
setPlayer(prev=>{
  let newXp = prev.xp + amount;
  let newLevel = prev.level;
  let unlocked = [...prev.unlockedRegions];
  let newRegion = null;

  while(newXp >= newLevel * 100) {
    newXp -= (newLevel * 100);
    newLevel += 1;
  }

  if (newLevel>=2 && !unlocked.includes("loops")) {
    unlocked.push("loops");
    newRegion = "Loop Caves";
  }
  if (newLevel>=3 && !unlocked.includes("functions")) {
    unlocked.push("functions");
    newRegion = "Function Temple";
  }

  if (newLevel > prev.level || newRegion) {
    setLevelUpInfo({ level: newLevel, region: newRegion });
  }

  return {...prev, xp: newXp, level: newLevel, unlockedRegions: unlocked};
});
},[]);

const handleWin = ()=>{
const xp = player.level * 10;
addXP(xp);
setToast(`+${xp} XP`);
setScene("world");
window.dispatchEvent(new CustomEvent('phaser-resume'));
};

const handleLose = ()=>{
setToast("Wrong! Study more");
setScene("learn");
window.dispatchEvent(new CustomEvent('phaser-resume'));
};

const handleBossWin = () => {
    const xp = player.level * 50;
    addXP(xp);
    setScene("win");
    window.dispatchEvent(new CustomEvent('phaser-resume'));
};

const handleRestart = () => {
    window.location.reload();
};

useEffect(() => {
  const onNpcTrigger = () => setScene('npc');
  const onTriggerBattle = () => setScene('battle');
  const onBossTrigger = () => setScene('boss');
  const onShowToast = (msg) => setToast(msg);

  EventBus.on('npc-trigger', onNpcTrigger);
  EventBus.on('trigger-battle', onTriggerBattle);
  EventBus.on('boss-trigger', onBossTrigger);
  EventBus.on('show-toast', onShowToast);

  return () => {
    EventBus.off('npc-trigger', onNpcTrigger);
    EventBus.off('trigger-battle', onTriggerBattle);
    EventBus.off('boss-trigger', onBossTrigger);
    EventBus.off('show-toast', onShowToast);
  }
}, []);

const region = REGIONS.find(r=>r.id===player.unlockedRegions[player.unlockedRegions.length-1]) || REGIONS[0];

// Provide transparent background so we can see the Phaser game underneath
return (
<div style={{width:"100vw",height:"100vh",background:"transparent", pointerEvents: "none"}}>
{scene !== "title" && (
<>
<WorldScene
player={player}
onBattle={()=>setScene("battle")}
onLearn={()=>setScene("learn")}
/> <HUD player={player} region={region}/>
</>
)}


  {scene==="title" && <TitleScreen onStart={()=>setScene("world")} />}

  {scene==="battle" && (
    <BattleScene
      player={player}
      onWin={handleWin}
      onLose={handleLose}
      onClose={()=>setScene("world")}
    />
  )}

  {scene==="boss" && (
    <BossScene
      player={player}
      onWin={handleBossWin}
      onClose={()=>setScene("world")}
    />
  )}

  {scene==="win" && (
    <WinScreen
      player={player}
      onRestart={handleRestart}
    />
  )}

  {scene==="npc" && (
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:100}}>
      <div style={{background:"#111",padding:"32px",borderRadius:"12px",border:"2px solid #333",color:"#fff",textAlign:"center"}}>
        <h2 style={{color:"#4ade80",marginBottom:"16px"}}>Old Wise Knight</h2>
        <p style={{marginBottom:"24px"}}>Hero! Answer questions to prove you're ready for the forest.</p>
        <button onClick={()=>{setScene("world"); window.dispatchEvent(new CustomEvent('phaser-resume'));}} style={{padding:"8px 24px",background:"#4ade80",color:"#000",border:"none",borderRadius:"6px",fontWeight:"bold",cursor:"pointer"}}>
          Continue
        </button>
      </div>
    </div>
  )}

  {scene==="learn" && (
    <LearningScene
      player={player}
      onBack={()=>setScene("world")}
    />
  )}

  {levelUpInfo && (
    <LevelUpOverlay
      player={player}
      newRegion={levelUpInfo.region}
      onClose={()=>setLevelUpInfo(null)}
    />
  )}

  {toast && <Toast msg={toast} onDone={()=>setToast(null)} />}
</div>


);
}
