import { useState, useEffect } from "react";
import { SAMPLE_QUESTIONS } from "../game/questions";
import { REGIONS } from "../game/constants";

const Scanlines = () => (

  <div style={{
    position:"absolute",inset:0,pointerEvents:"none",zIndex:50,
    background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
  }}/>
);

export default function BattleScene({ player, onWin, onLose, onClose }) {
const [q, setQ] = useState(null);
const [selected, setSelected] = useState(null);
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(true);
const [typeText, setTypeText] = useState("");

const region = player.unlockedRegions[player.unlockedRegions.length - 1] || "arrays";
const pool = SAMPLE_QUESTIONS[region] || SAMPLE_QUESTIONS.arrays;

useEffect(() => {
setLoading(true);


setTimeout(() => {
  const question = pool[Math.floor(Math.random() * pool.length)];
  setQ(question);
  setLoading(false);

  let i = 0;
  const interval = setInterval(() => {
    setTypeText(question.q.slice(0, i));
    i++;
    if (i > question.q.length) clearInterval(interval);
  }, 20);

  return () => clearInterval(interval);
}, 600);


}, []);

const choose = (idx) => {
if (result) return;


setSelected(idx);

if (idx === q.ans) {
  setResult("correct");
  setTimeout(() => onWin(), 1500);
} else {
  setResult("wrong");
  setTimeout(() => onLose(), 1800);
}


};

return (
<div style={{
position:"absolute",inset:0,background:"#000d00",
display:"flex",flexDirection:"column",
alignItems:"center",justifyContent:"center",
zIndex:60,
}}> <Scanlines/>


  {/* Header */}
  <div style={{color:"#4ade80",marginBottom:20,fontSize:14}}>
    ⚔ BATTLE ⚔
  </div>

  {/* Enemy */}
  <div style={{fontSize:50,marginBottom:10}}>
    {region==="arrays"?"🌲":region==="loops"?"🌀":"⚗️"}
  </div>

  <div style={{color:"#86efac",marginBottom:20}}>
    {REGIONS.find(r=>r.id===region)?.name}
  </div>

  {/* Question Box */}
  <div style={{
    width:"min(500px,90%)",
    background:"#001a00",
    border:"2px solid #4ade80",
    padding:20
  }}>
    {loading ? (
      <div style={{color:"#4ade80"}}>Loading...</div>
    ) : (
      <>
        <div style={{color:"#e2e8f0",marginBottom:20}}>
          {typeText}
        </div>

        {q.options.map((opt,i)=> {
          let style = {
            display:"block",
            width:"100%",
            marginBottom:10,
            padding:10,
            cursor:"pointer",
            border:"1px solid #374151",
            background:"#002200",
            color:"#9ca3af"
          };

          if (selected === i) {
            if (i === q.ans) {
              style.background = "#003d2d";
              style.color = "#4ade80";
            } else {
              style.background = "#3d0000";
              style.color = "#f87171";
            }
          }

          return (
            <button key={i} onClick={()=>choose(i)} style={style}>
              {opt}
            </button>
          );
        })}

        {result && (
          <div style={{
            marginTop:10,
            color: result==="correct" ? "#4ade80" : "#f87171"
          }}>
            {result==="correct" ? "Correct!" : "Wrong!"}
            <div style={{marginTop:6,fontSize:12}}>
              {q.explanation}
            </div>
          </div>
        )}
      </>
    )}
  </div>

  {/* Escape */}
  <button onClick={onClose} style={{
    marginTop:15,
    color:"#6b7280",
    background:"transparent",
    border:"1px solid #374151"
  }}>
    Run
  </button>
</div>

);
}
