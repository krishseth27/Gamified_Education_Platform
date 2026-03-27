export default function TitleScreen({ onStart }) {
return (
<div style={{
position:"absolute",inset:0,
background:"#000d00",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
zIndex:100
}}>
<h1 style={{color:"#4ade80"}}>LEARNQUEST</h1> <button onClick={onStart}>Start Game</button> </div>
);
}
