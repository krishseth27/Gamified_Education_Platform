import { useState, useEffect } from "react";
import { SAMPLE_QUESTIONS } from "../game/questions";
import { EventBus } from "../game/EventBus";

export default function BossScene({ player, onWin, onClose }) {
  const [bossMaxHp] = useState(3);
  const [bossHp, setBossHp] = useState(3);
  const [q, setQ] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback if data not present
  const pool = SAMPLE_QUESTIONS.arrays || [
      {q: "What is an array?", options: ["Data Structure", "Food"], ans: 0, explanation: "An array stores items."}
  ];

  useEffect(() => {
    const loadQuestion = () => {
      setLoading(true);
      setResult(null);
      setSelected(null);
      setTimeout(() => {
        setQ(pool[Math.floor(Math.random() * pool.length)]);
        setLoading(false);
      }, 600);
    };

    loadQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerNextAttack = () => {
    setLoading(true);
    setResult(null);
    setSelected(null);
    setTimeout(() => {
      setQ(pool[Math.floor(Math.random() * pool.length)]);
      setLoading(false);
    }, 600);
  }

  const choose = (idx) => {
    if (result) return;

    setSelected(idx);

    if (idx === q.ans) {
      setResult("correct");
      EventBus.emit('answer-correct');
      setTimeout(() => {
        const newHp = bossHp - 1;
        setBossHp(newHp);
        if (newHp <= 0) {
          onWin(); // trigger full win screen
        } else {
          triggerNextAttack(); // Load next attack
        }
      }, 1500);
    } else {
      setResult("wrong");
      EventBus.emit('answer-wrong');
      setTimeout(() => {
        // Punish player but keep going
        triggerNextAttack();
      }, 1800);
    }
  };

  const hpPct = (bossHp / bossMaxHp) * 100;

  return (
    <div style={{
      position:"absolute",inset:0,background:"rgba(20,0,0,0.9)",
      display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      zIndex:60, fontFamily:"var(--sans)",
      backdropFilter:"blur(4px)"
    }}>
      {/* Header */}
      <div style={{color:"#ff4444",marginBottom:20,fontSize:"2rem",fontFamily:"var(--heading)",fontWeight:"bold", textShadow:"0 0 10px red"}}>
        BOSS BATTLE!
      </div>

      {/* Enemy */}
      <div style={{fontSize:80,marginBottom:10, animation:"bounce 2s infinite"}}>
        🐉
      </div>

      {/* Boss Health Bar */}
      <div style={{width:"300px", marginBottom: "20px", display:"flex", flexDirection:"column", alignItems:"center"}}>
         <span style={{color:"#fff", fontWeight:"bold", marginBottom:"5px"}}>Dragon HP</span>
         <div style={{width:"100%", height:"12px", background:"#333", borderRadius:"6px", overflow:"hidden", border:"1px solid #111"}}>
            <div style={{width:`${hpPct}%`, height:"100%", background:"#ff4444", transition:"width 0.4s ease"}} />
         </div>
      </div>

      {/* Question Box */}
      <div style={{
        width:"min(550px,90%)",
        background:"#111",
        border:"2px solid #550000",
        borderRadius:"12px",
        boxShadow:"0 0 30px rgba(255,0,0,0.4)",
        padding:"24px",
        position:"relative",
        zIndex:70
      }}>
        {loading ? (
          <div style={{color:"#ff4444",textAlign:"center",fontWeight:"bold"}}>Boss Preparing Attack...</div>
        ) : (
          <>
            <div style={{color:"#fff",marginBottom:20,fontSize:"1.1rem",lineHeight:"1.5"}}>
              {q.q}
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
                  style.background = "rgba(74, 222, 128, 0.2)";
                  style.color = "#4ade80";
                  style.borderColor = "#4ade80";
                } else {
                  style.background = "rgba(225, 29, 72, 0.4)";
                  style.color = "#ff4444";
                  style.borderColor = "#ff4444";
                }
              }

              return (
                <button key={i} onClick={()=>choose(i)} style={style}
                  onMouseOver={e => {if(selected===null) e.currentTarget.style.borderColor="#ff6666"}}
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
                color: result==="correct" ? "#4ade80" : "#ff4444",
                border: `1px solid ${result==="correct" ? "#4ade80" : "#ff4444"}`
              }}>
                <div style={{fontWeight:"bold",marginBottom:"4px"}}>
                  {result==="correct" ? "Direct Hit!" : "Ouch! Your Focus Dropped!"}
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
        color:"#ffaaaa",
        background:"transparent",
        border:"1px solid #550000",
        padding:"8px 24px",
        borderRadius:"6px",
        cursor:"pointer",
        fontFamily:"var(--sans)",
      }}
      onMouseOver={e => e.currentTarget.style.background="rgba(255,0,0,0.1)"}
      onMouseOut={e => e.currentTarget.style.background="transparent"}
      >
        Run Away
      </button>
    </div>
  );
}
