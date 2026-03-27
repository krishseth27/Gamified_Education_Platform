export default function HUD({ player, region }) {
const xpPct = Math.min((player.xp % 100) / 100 * 100, 100);

return (
<div style={{
position:"absolute",top:8,left:8,right:8,display:"flex",
justifyContent:"space-between",zIndex:40
}}>
<div style={{color:"#4ade80"}}>
LV {player.level} | XP {player.xp} </div>
<div style={{color:"#86efac"}}>
{region.name} </div> </div>
);
}
