import { useState, useCallback } from "react";

import WorldScene from "./components/WorldScene";
import BattleScene from "./components/BattleScene";
import LearningScene from "./components/LearningScene";
import TitleScreen from "./components/TitleScreen";
import HUD from "./components/HUD";
import Toast from "./components/Toast";
import LevelUpOverlay from "./components/LevelUpOverlay";

import { REGIONS } from "./game/constants";

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
const xp = prev.xp + amount;
const level = Math.floor(xp/100)+1;


  let unlocked = [...prev.unlockedRegions];
  let newRegion = null;

  if (xp>=100 && !unlocked.includes("loops")) {
    unlocked.push("loops");
    newRegion = "Loop Caves";
  }
  if (xp>=200 && !unlocked.includes("functions")) {
    unlocked.push("functions");
    newRegion = "Function Temple";
  }

  if (level > prev.level || newRegion) {
    setLevelUpInfo({ level, region:newRegion });
  }

  return {...prev, xp, level, unlockedRegions:unlocked};
});


},[]);

const handleWin = ()=>{
const xp = player.level * 10;
addXP(xp);
setToast(`+${xp} XP`);
setScene("world");
};

const handleLose = ()=>{
setToast("Wrong! Study more");
setScene("learn");
};

const region = REGIONS.find(r=>r.id===player.unlockedRegions[player.unlockedRegions.length-1]) || REGIONS[0];

return (
<div style={{width:"100vw",height:"100vh",background:"#000d00"}}>
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
