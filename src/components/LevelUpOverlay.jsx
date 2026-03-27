export default function LevelUpOverlay({ player, newRegion, onClose }) {
return (
<div style={{
position:"absolute",inset:0,
background:"rgba(0,0,0,0.8)",
display:"flex",alignItems:"center",justifyContent:"center",
zIndex:80
}}>
<div style={{color:"#4ade80",textAlign:"center"}}> <h1>LEVEL UP!</h1> <p>Level {player.level}</p>
{newRegion && <p>Unlocked: {newRegion}</p>} <button onClick={onClose}>Continue</button> </div> </div>
);
}
