export default function TitleScreen({ onStart }) {
return (
<div style={{
position:"absolute",inset:0,
background:"#0a0a0a",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
zIndex:100
}}>
<h1 style={{color:"#ff4500", fontFamily:"var(--heading)", fontSize: "4rem", marginBottom: "0.2em", textShadow:"0 0 20px rgba(255, 69, 0, 0.6)"}}>FLAMEROAR <span role="img" aria-label="fire">🔥</span></h1> 
<p style={{color:"#e5e5e5", fontFamily:"var(--sans)", fontSize: "1.2rem", marginBottom: "2em"}}>DSA Learning that feels like slaying dragons</p>
<button onClick={onStart} style={{
    fontFamily: "var(--heading)",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    background: "#ff4500",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 0 15px 5px rgba(255, 69, 0, 0.5)",
    transition: "all 0.2s ease"
}}
onMouseOver={e => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 0 25px 8px rgba(255, 69, 0, 0.7)";
}}
onMouseOut={e => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 0 15px 5px rgba(255, 69, 0, 0.5)";
}}
>Start Your Journey</button> </div>
);
}
