# FlameRoar 🔥⚔️

**The RPG where learning DSA feels like slaying dragons.**
 
**Game Engine**: Phaser.js + Google Gemini AI

---

## 🎯 What is Flameroar?

Flameroar turns boring “read theory → solve questions → forget” learning into a full **RPG adventure**.

**Core Philosophy**  
**Progress in the game = Progress in knowledge.**  
You literally cannot move forward unless you understand the concept.

No more passive learning. Every step, every battle, every boss gives you real dopamine while you master Data Structures & Algorithms.

---

## ✨ Prototype Features (Implemented in 2 Days)

- Top-down pixel RPG map (Arrays Forest with 7 clear zones)
- Player movement + dynamic speed system
- Custom hero creation & live stats panel
- Concept Learning Zone (Arrays topic)
- Random Question Encounters with full dopamine explosion
- **PvAI Battles** (Mortal Kombat style health bars) — AI bots act as **gatekeepers**. They auto-challenge you and you **cannot go forward** without defeating them.
- Progressive Leveling (`Current Level × 100` XP required)
- Boss Room at the end of the region
- Confetti, particles, combo system, victory poses, XP fly-ins
- Basic collision, triggers, and profile stats

---

## 🗺️ Map Design – Arrays Forest

The prototype contains **one complete hand-crafted map** with clear progression:

1. **🟢 Spawn Area (Start Village)** – Safe zone with 2–3 houses + NPC  
2. **🟡 Training Path (Learning Zone)** – Straight road for Arrays concept  
3. **🟢 Forest (Main Gameplay)** – Zig-zag path with trees → random encounters & PvAI gatekeepers  
4. **🔵 Mid Checkpoint** – Campfire + NPC hint area  
5. **⚫ Dungeon Entry** – Narrow gate with dark theme shift  
6. **🔴 Dungeon Path** – Tight maze-style corridors  
7. **🔥 Boss Room** – Big open area with boss in the center

---

## 📋 Full Feature Breakdown (Future-Ready Design)

### 1. Player Avatar & Core Stats
- Custom Hero Creation (Array Knight / Recursion Mage / Graph Assassin / Pointer Paladin)
- Live Stats Panel: Level, Focus Energy, Player Speed (up to 3.0x), Streak Counter, Mastery %
- Dopamine: “SPEED BOOST!” screen-wide effect when speed hits 2.0x

### 2. World Map & Exploration
- Fog of Knowledge (areas unlock only after learning)
- Dynamic Player Speed based on mastery
- Random Encounters every 8–12 seconds (Question or Knowledge Nugget)
- Exploration Bonus every 5 steps without a question

### 3. Concept Learning Zone
- 3-Phase Teaching (Story → Interactive Visual → Micro-Quiz)
- Must pass to unlock gate + happy dance + explosion

### 4. Question Encounters – Heart of Dopamine
- Instant visual explosion, confetti, “CORRECT!” text, XP fly-in, ka-ching sound
- Combo system (3-streak → fire trail, 7-streak → Legendary Combo)
- Wrong answer → gentle teleport back to exact sub-topic

### 5. PvAI Battles (Gatekeeper System)
- AI opponents auto-summon while moving
- Health bars (exactly like Mortal Kombat)
- Same question for both players
- First to answer correctly + fastest wins the round
- 3 rounds = match
- **You cannot proceed forward** until you defeat the AI gatekeeper
- Win → massive “VICTORY!” + 150–300 XP + loot

### 6. Boss Battles
- 3–5 questions in a row with dramatic arena
- Phases + time pressure
- Massive dopamine on win (region lights up, slow-motion replay, Victory Rush)

### 7. Progressive Leveling
- XP to next level = `Current Level × 100`
- Questions automatically get harder as you level up

### 8. AI Systems
- Dynamic Question Generator (Gemini)
- Adaptive Difficulty Engine
- 3-level Smart Hint System

### 9. NPC System
- Personal guides scattered across the map
- Short helpful dialogues + free Focus Energy

### 10. Reward & Loot System
- Hint Potion, Speed Token, Topic Revealer, Hint Revealer, XP Multiplier Crystal, Luck Charm
- Loot drops from PvAI wins, bosses, and nuggets

### 11. Extra Dopamine Features
- Daily Quest Board
- Streak Flame + Inferno Mode
- Profile with badges (e.g. “AI Slayer”)
- Knowledge Chest after 100% mastery

---

## 🛠️ Tech Stack

- **Game Engine**: Phaser 3
- **Build Tool**: Vite
- **AI**: Google Gemini 1.5 Flash
- **Map Editor**: Tiled
- **Deployment**: Vercel

---

## 🚀 How to Run Locally

```bash
git clone <your-repo-link> flameroar
cd flameroar
npm install

# Add your Gemini key
cp .env.example .env
# Put your key in VITE_GEMINI_API_KEY

npm run dev
