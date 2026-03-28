export default function HUD({ player, region }) {
const xpPct = Math.min((player.xp / (player.level * 100)) * 100, 100);

return (
<div style={{
position:"absolute",top:8,left:8,right:8,display:"flex",
justifyContent:"space-between",zIndex:40, fontFamily:"var(--sans)",
pointerEvents: "none"
}}>
<div style={{
  display:"flex", flexDirection:"column", background:"rgba(0, 0, 0, 0.7)",
  padding:"12px 16px", borderRadius:"8px", border:"1px solid #4ade80",
  boxShadow:"0 0 10px rgba(74, 222, 128, 0.5)", gap:"4px"
}}>
<div style={{color:"#4ade80", fontWeight:"bold", textShadow:"0 0 5px rgba(74, 222, 128, 0.8)"}}>
Level {player.level}</div>
<div style={{
  width:"150px", height:"8px", background:"#1a1a1a", 
  borderRadius:"4px", overflow:"hidden", border:"1px solid #4ade80"
}}>
  <div style={{width:`${xpPct}%`, height:"100%", background:"#4ade80", transition:"width 0.3s ease", boxShadow:"0 0 8px #4ade80"}} />
</div>
<div style={{color:"#a7f3d0", fontSize:"0.85rem"}}>
Focus Energy: 100/100</div>
</div>
<div style={{
  display:"flex", flexDirection:"column", background:"rgba(0, 0, 0, 0.7)",
  padding:"12px 16px", borderRadius:"8px", border:"1px solid #c084fc",
  boxShadow:"0 0 10px rgba(192, 132, 252, 0.5)", gap:"4px", alignItems:"flex-end"
}}>
<div style={{color:"#c084fc", fontWeight:"bold", textShadow:"0 0 5px rgba(192, 132, 252, 0.8)"}}>Class: Array Knight</div>
<div style={{color:"#e9d5ff", fontSize:"0.9rem"}}>{region?.name || "Unknown"}</div>
</div> </div>
);
}
