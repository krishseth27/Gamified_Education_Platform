import { useState, useEffect } from "react";
import { SAMPLE_QUESTIONS } from "../game/questions";
import { REGIONS } from "../game/constants";
import { EventBus } from "../game/EventBus";

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
  EventBus.emit('answer-correct');
  setTimeout(() => onWin(), 1500);
} else {
  setResult("wrong");
  EventBus.emit('answer-wrong');
  setTimeout(() => onLose(), 1800);
}


};

return (
<div style={{
position:"absolute",inset:0,background:"rgba(0,0,0,0.8)",
display:"flex",flexDirection:"column",
alignItems:"center",justifyContent:"center",
zIndex:60, fontFamily:"var(--sans)",
backdropFilter:"blur(4px)"
}}> <Scanlines/>


  {/* Header */}
  <div style={{color:"var(--accent)",marginBottom:20,fontSize:"1.5rem",fontFamily:"var(--heading)",fontWeight:"bold"}}>
    ⚔ BATTLE ⚔
  </div>

  {/* Enemy */}
  <div style={{fontSize:50,marginBottom:10}}>
    {region==="arrays"?"🌲":region==="loops"?"🕷":"🐉"}
  </div>

  <div style={{color:"var(--text-h)",marginBottom:20,fontSize:"1.2rem"}}>
    {REGIONS.find(r=>r.id===region)?.name}
  </div>

  {/* Question Box */}
  <div style={{
    width:"min(500px,90%)",
    background:"#111",
    border:"2px solid #333",
    borderRadius:"12px",
    boxShadow:"0 0 20px rgba(0,0,0,0.8)",
    padding:"24px",
    position:"relative",
    zIndex:70
  }}>
    {loading ? (
      <div style={{color:"#4ade80",textAlign:"center",fontWeight:"bold"}}>Loading Enemy...</div>
    ) : (
      <>
        <div style={{color:"#fff",marginBottom:20,fontSize:"1.1rem",lineHeight:"1.5"}}>
          {typeText}
        </div>

        {q.options.map((opt,i)=> {
          let style = {
            display:"block",
            width:"100%",
            marginBottom:10,
            padding:12,
            cursor:"pointer",
            border:"1px solid #444",
            borderRadius:"6px",
            background:"#222",
            color:"#ddd",
            transition:"all 0.2s",
            fontFamily:"var(--sans)",
            fontSize:"1rem",
            textAlign:"left"
          };

          if (selected === i) {
            if (i === q.ans) {
              style.background = "#rgba(74, 222, 128, 0.2)";
              style.color = "#4ade80";
              style.borderColor = "#4ade80";
            } else {
              style.background = "rgba(225, 29, 72, 0.2)";
              style.color = "#e11d48";
              style.borderColor = "#fda4af";
            }
          }

          return (
            <button key={i} onClick={()=>choose(i)} style={style}
              onMouseOver={e => {if(selected===null) e.currentTarget.style.borderColor="#666"}}
              onMouseOut={e => {if(selected===null) e.currentTarget.style.borderColor="#444"}}
            >
              {opt}
            </button>
          );
        })}

        {result && (
          <div style={{
            marginTop:16, padding:"12px", borderRadius:"6px",
            background: result==="correct" ? "rgba(74, 222, 128, 0.1)" : "rgba(225, 29, 72, 0.1)",
            color: result==="correct" ? "#4ade80" : "#e11d48",
            border: `1px solid ${result==="correct" ? "#4ade80" : "#fda4af"}`
          }}>
            <div style={{fontWeight:"bold",marginBottom:"4px"}}>
              {result==="correct" ? "CORRECT!" : "Try again"}
            </div>
            <div style={{fontSize:"0.9rem"}}>
              {q.explanation}
            </div>
          </div>
        )}
      </>
    )}
  </div>

  {/* Escape */}
  <button onClick={onClose} style={{
    marginTop:24,
    color:"#aaa",
    background:"#222",
    border:"1px solid #444",
    padding:"8px 24px",
    borderRadius:"6px",
    cursor:"pointer",
    fontFamily:"var(--sans)",
    position:"relative",
    zIndex:70
  }}
  onMouseOver={e => e.currentTarget.style.background="#333"}
  onMouseOut={e => e.currentTarget.style.background="#222"}
  >
    Run Away
  </button>
</div>

);
}
