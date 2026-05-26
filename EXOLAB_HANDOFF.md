# ExoLab.llc — Website Update Handoff
**Date:** 2026-05-25  
**Owner:** Greg Klassen (gsklass)  
**Claude Code task:** Integrate the Phase/Timeline plan into the existing exolab.llc site and add a countdown timer component.

---

## 1. Context & Background

ExoLab (exolab.llc) is Greg Klassen's independent R&D project. Greg is a retired CEO and DSP engineer living with advanced SCA3 (spinocerebellar ataxia type 3). ExoLab's mission is to build Layer 1/2 exoskeleton control systems — terrain and intent detection — on top of commercial hardware, tuned specifically for ataxic gait profiles.

Greg attended the Robotics Summit & Expo in Boston (late May 2026) and is actively establishing himself in the exoskeleton research community. The north-star goal is:

> **Walk with an exoskeleton often — not as a rare event — by December 31, 2027.**

The site currently exists at `https://exolab.llc`. This handoff adds:
1. A **Roadmap / Timeline** section cohesively integrated with existing content
2. A **live countdown timer** to 12/31/2027 (in minutes, not just days)

---

## 2. Two Tracks — Hold These Separately

The roadmap spans two parallel tracks that inform each other but have distinct timelines and success metrics:

| Track | Name | Goal |
|---|---|---|
| **A** | Personal Ambulatory | Walk often by 12/31/2027 using a commercial exoskeleton |
| **B** | ExoLab R&D | Build Layer 1/2 intent-detection control for ataxic gait; publish/contribute to open source |

All five phases below apply to both tracks. Phase milestones should be labeled (A), (B), or (A+B) accordingly.

---

## 3. Five-Phase Roadmap Content

### Phase I — Evaluate *(in progress, May–Aug 2026)*

**Objective:** Map the full landscape before committing money or direction.

**Key activities:**
- Inventory all commercial exoskeleton devices relevant to lower-limb neurological conditions
- Assess each device's MMI (man-machine interface / exo-interface layer) and what programmable access exists
- Explore all funding angles: Medicare/insurance coverage (current SCI-only limitation), VC, government grants (NIH SBIR/STTR, NSF, DARPA, National Ataxia Foundation)
- Identify where the biggest R&D contribution gap is: Layer 1 (low-level bioelectric intent detection), Layer 2 (mid-level control: step initiation, weight shift, terrain response), or Layer 3 (hardware mechanics — likely solved)
- Begin establishing community presence: conferences (IROS 2026, Pittsburgh), OpenExo GitHub, NAF network, Shirley Ryan AbilityLab

**Key questions to answer:**
- What is the MMI for each candidate device — what can I get to programmatically?
- Is the Layer 1 problem solved for ataxic gait, or does SCA3-specific gait evaluation need to be built?
- Who are the domain experts to connect with?
- What is the right role: pure developer, investor, or hybrid?
- Medical device route vs. consumer/research route?

**Device candidates to evaluate:**

| Device | Maker | MMI/Control Notes | SCA3 Fit |
|---|---|---|---|
| ReWalk 7 | Lifeward | Wrist + tilt sensor; cloud-connected; stairs/curbs | Requires reliable lean mechanics |
| Ekso Indego Personal | Ekso Bionics | Hip pressure / center of pressure; modular | Moderate — passive initiation |
| HAL (Hybrid Assistive Limb) | Cyberdyne | Surface EMG bioelectric intent detection | Best theoretical fit for ataxic gait |
| OpenExo | NAU / U Michigan (open source) | Fully programmable; Teensy 4.1 + Arduino Nano 33 BLE | R&D platform — Layer 1/2 dev target |

---

### Phase II — Answer & Plan *(Aug–Dec 2026)*

**Objective:** Convert Phase I questions into decisions and a funded go-forward plan.

**Deliverables:**
- Clinical evaluation at a certified exoskeleton training center (target: Sheltering Arms in Richmond, VA or Johns Hopkins affiliate) — establishes candidacy record and potentially unlocks research protocol access
- Device access strategy decided: clinical research protocol (preferred, lowers cost) vs. personal purchase (~$100K–$200K out-of-pocket)
- Funding strategy committed: grant proposal(s) submitted, VC conversation map built
- ExoLab Layer 1/2 R&D scope defined: which gait parameters to instrument, which control architecture to prototype
- Development environment stood up: OpenExo repo forked, Teensy dev board acquired, Azure Kinect or equivalent sensor for gait capture

**Note on the clinical gap:** Current FDA-approved exoskeletons are indicated for SCI (spinal cord injury), not cerebellar ataxia. SCA3 is an off-label use. The clinical path — positioning work as research — is the most efficient route to device access while also generating publishable data.

---

### Phase III — Implementation *(Q1–Q2 2027)*

**Objective:** Acquire device and begin instrumented walking.

**Track A milestones:**
- Exoskeleton acquired (ReWalk 7 or HAL, based on Phase II evaluation)
- Certified companion/caregiver trained
- First assisted walk session completed
- Home environment adapted for device use

**Track B milestones:**
- OpenExo development environment operational (Crostini/Linux)
- Initial gait capture sessions completed using sensor suite
- SCA3 gait signature dataset begun (step width, hip adduction angles, trunk sway)
- First Layer 1/2 control prototype running in simulation

---

### Phase IV — Iteration *(Q2–Q4 2027)*

**Objective:** Refine. Walk better. Build smarter.

**The engineering loop:**
1. Instrument → 2. Walk → 3. Capture data → 4. Refine control parameters → 5. Back to 1

**Track A focus:** Increasing frequency of walking sessions, improving gait quality, reducing fall risk.

**Track B focus:** Publishing first findings (even informally via OpenExo community), testing Layer 1/2 prototype on actual device, seeking clinical collaborators.

---

### Phase V — Practice, Walk & Dance *(Dec 2027 and beyond)*

**Objective:** Walking is routine. R&D has produced something shareable.

> The goal isn't to walk once. It's to walk to the mailbox. Walk at Doug and Anto's next gathering. Dance at a grandkid's birthday. Walk because it's Tuesday.

Track B at this stage: ExoLab has a publishable control system contribution and an established position in the SCA3/exoskeleton intersection. The memoir chapter writes itself.

---

## 4. Countdown Timer Spec

Add a prominent countdown timer component to the site. Requirements:

- **Target date:** `December 31, 2027, 23:59:59` (local time or UTC — pick one, be consistent)
- **Display format:** Minutes remaining (primary large display), with days/hours/seconds as secondary
- **Label:** "Minutes to walk by"  or "Time to walk often" — something personal, not generic
- **Style:** Should feel like a mission clock, not a birthday counter. Consider monospace digits.
- **Placement:** Hero section or just below it, before the roadmap
- **Behavior:** Updates every second via `setInterval`
- **Fallback:** If date has passed, show "We're walking. 🦾"

**Calculation reference:**
```javascript
const target = new Date('2027-12-31T23:59:59');
const now = new Date();
const totalMinutes = Math.floor((target - now) / 60000);
```

---

## 5. Integration Notes

### Tone & Voice
The site should reflect Greg's voice: technically precise, personally honest, mission-driven without being maudlin. The SCA3 context is present but not dominant — ExoLab is about building something, not about suffering.

### Existing Site Structure (assumed — verify before editing)
- Hero / mission statement
- About / Greg's background (DSP engineer, retired CEO, SCA3)
- ExoLab concept (Layer 1/2/3 framework)
- *(insert: Countdown + Roadmap)*
- Contact / collaborate

### Files to create/modify
- `index.html` (or equivalent) — add countdown + roadmap section
- If site uses a CMS or static site generator, adapt accordingly
- The roadmap HTML block is provided as a standalone component in `exolab_roadmap_section.html`

### Layer Architecture (for existing content context)
The three-layer model Greg uses:
- **Layer 3** — Hardware mechanics (solved by commercial vendors)
- **Layer 2** — Mid-level control: step initiation, weight shift, terrain response (partially solved for SCI; unsolved for ataxic gait)
- **Layer 1** — Low-level intent detection from bioelectric/biomechanical signals (Greg's DSP focus; HAL's surface EMG approach is closest)

---

## 6. Key People & Resources

| Name / Resource | Relevance |
|---|---|
| Prof. Zach Lerner, NAU | OpenExo PI — primary academic contact |
| Shirley Ryan AbilityLab | Lifeward's clinical partner; certified exo training center |
| Johns Hopkins (existing relationship via DBS program) | Potential clinical evaluation site |
| National Ataxia Foundation | Grant funding + research network |
| IROS 2026, Pittsburgh | Next major target conference |
| OpenExo GitHub (naubiom/OpenExo) | Primary R&D development platform |
| Azure Kinect SCA3 gait paper (Jan 2026, ScienceDirect) | Step width as SCA3 diagnostic biomarker — Layer 1 data source |
| Cure Rare Disease / BioMarin | SCA3 therapeutic pipeline — context for clinical timing |

---

## 7. Greg's Dev Environment (for Claude Code context)

- **Machine:** ARM64 Acer Chromebook CB514-2H (AUE June 2031)
- **Dev env:** Linux (Crostini) with Python/FastAPI apps running as systemd user services
- **GitHub:** username `gsklass`, email `kl@ssen.org`
- **Phone:** Samsung Galaxy (Android) — voice-to-text primary input method
- **Input constraints:** SCA3 affects typing; voice-first workflow preferred; be tolerant of speech-to-text artifacts in future commits/comments

---

## 8. What Claude Code Should Do

1. **Fetch and parse** the existing `exolab.llc` site (view source or clone repo if available)
2. **Identify insertion point** for countdown + roadmap — likely after hero/mission, before any contact section
3. **Insert countdown component** per spec in section 4
4. **Insert roadmap section** using the HTML from `exolab_roadmap_section.html`
5. **Ensure visual coherence** with existing site styles — adopt existing font/color variables; do not override global styles
6. **Test countdown math** — confirm minutes calculation is correct at current date
7. **Deploy or provide diff** for Greg's review

---

*Handoff prepared: 2026-05-25. Source: ExoLab planning session with Claude.*
