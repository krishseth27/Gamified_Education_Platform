import { useState } from "react";
import { LESSONS } from "../game/lessons";
import { REGIONS } from "../game/constants";

const Scanlines = () => (

  <div style={{
    position:"absolute",inset:0,pointerEvents:"none",zIndex:50,
    background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
  }}/>
);

export default function LearningScene({ player, onBack }) {
const [activeRegion, setActiveRegion] = useState(
player.unlockedRegions[player.unlockedRegions.length-1] || "arrays"
);

const lesson = LESSONS[activeRegion];

return (
<div style={{
position:"absolute",inset:0,background:"#000d00",
zIndex:60,display:"flex"
}}> <Scanlines/>


  {/* Sidebar */}
  <div style={{width:200,background:"#001a00",padding:10}}>
    {REGIONS.map(r => {
      const locked = !player.unlockedRegions.includes(r.id);
      return (
        <button
          key={r.id}
          disabled={locked}
          onClick={()=>setActiveRegion(r.id)}
          style={{
            display:"block",
            width:"100%",
            marginBottom:8,
            padding:8,
            color: locked ? "#555" : "#4ade80",
            background:"#002200",
            border:"1px solid #374151"
          }}
        >
          {r.name}
        </button>
      );
    })}
  </div>

  {/* Content */}
  <div style={{flex:1,padding:20}}>
    <h2 style={{color:"#4ade80"}}>{lesson.title}</h2>

    {lesson.sections.map((sec,i)=>(
      <div key={i} style={{marginBottom:20}}>
        <h4 style={{color:"#86efac"}}>{sec.heading}</h4>
        <p style={{color:"#9ca3af"}}>{sec.body}</p>

        <pre style={{
          background:"#000",
          padding:10,
          color:"#4ade80"
        }}>
          {sec.code}
        </pre>
      </div>
    ))}

    <button onClick={onBack} style={{marginTop:10}}>
      Back
    </button>
  </div>
</div>


);
}
