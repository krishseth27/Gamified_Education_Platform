export default function WinScreen({ player, onRestart }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#050505",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 100, fontFamily: "var(--sans)"
    }}>
      <h1 style={{ color: "#ffd700", fontSize: "4rem", marginBottom: "1rem", textShadow: "0 0 20px #ffd700", fontFamily:"var(--heading)" }}>
        BOSS DEFEATED!
      </h1>
      <h2 style={{ color: "#4ade80", fontSize: "2rem", marginBottom: "2rem" }}>
        Congratulations, Hero!
      </h2>
      
      <div style={{
        background: "#111", padding: "32px", borderRadius: "12px", border: "2px solid #333",
        color: "#fff", textAlign: "center", marginBottom: "32px", minWidth: "300px"
      }}>
        <h3 style={{ color: "#a7f3d0", marginBottom: "16px", fontSize:"1.2rem"}}>Final Journey Stats</h3>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>Level Reached: <span style={{color:"#4ade80", fontWeight:"bold"}}>{player.level}</span></p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>Total XP: <span style={{color:"#4ade80", fontWeight:"bold"}}>{player.xp}</span></p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>Class Rank: <span style={{color:"#c084fc", fontWeight:"bold"}}>Array Knight Master</span></p>
      </div>

      <button onClick={onRestart} style={{
        padding: "16px 36px", fontSize: "1.2rem", background: "#4ade80",
        color: "#000", border: "none", borderRadius: "8px", cursor: "pointer",
        fontWeight: "bold", boxShadow: "0 0 15px rgba(74, 222, 128, 0.4)",
        transition: "all 0.2s"
      }}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Play Again
      </button>
    </div>
  );
}
